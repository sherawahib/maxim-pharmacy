"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/assets/video/logo-reveal.mp4";
const FAILSAFE_MS = 25000;

/** Soft nav skip — resets on full page refresh */
let playedThisDocument = false;

export function HomePreloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  const [active] = useState(() => {
    if (typeof window === "undefined") return true;
    if (playedThisDocument) return false;
    playedThisDocument = true;
    return true;
  });
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const [reveal, setReveal] = useState(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setExiting(true);
    document.body.style.overflow = "";
    window.setTimeout(() => setGone(true), 400);
  }, []);

  useEffect(() => {
    if (!active || gone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active, gone]);

  useEffect(() => {
    if (!active || exiting || gone) return;

    const video = videoRef.current;
    if (!video) return;

    let revealed = false;
    const revealVideo = () => {
      if (revealed || finishedRef.current) return;
      revealed = true;
      setReveal(true);
    };

    const failsafe = window.setTimeout(() => finish(), FAILSAFE_MS);

    const onTimeUpdate = () => {
      // Only show once playback has actually advanced (skips frozen frame 0)
      if (video.currentTime >= 0.08) {
        revealVideo();
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    const tryPlay = async () => {
      if (finishedRef.current) return;
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        // Assign src only when starting — avoids SSR/browser painting frame 0 early
        if (!video.src) {
          video.src = VIDEO_SRC;
          video.load();
        }
        await video.play();
      } catch {
        /* failsafe / ended */
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    void tryPlay();

    return () => {
      window.clearTimeout(failsafe);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [active, exiting, gone, finish]);

  if (!active || gone) return null;

  return (
    <div
      className={`mx-preloader ${exiting ? "is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Maxim Pharmacy intro"
    >
      {/* Solid curtain — no logo/image until motion starts */}
      <div className="mx-preloader__curtain" aria-hidden="true" />
      <video
        ref={videoRef}
        className="mx-preloader__video"
        playsInline
        muted
        preload="auto"
        // Inline hide so first paint never shows a static frame (before CSS loads)
        style={{
          opacity: reveal ? 1 : 0,
          visibility: reveal ? "visible" : "hidden",
        }}
        onEnded={finish}
        onError={finish}
      />
    </div>
  );
}
