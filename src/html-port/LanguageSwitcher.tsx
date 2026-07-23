"use client";

import { useEffect, useRef, useState } from "react";

export type LangCode = "en" | "es" | "fr";

export const languages: {
  code: LangCode;
  short: string;
  label: string;
  flag: string;
}[] = [
  { code: "en", short: "EN", label: "English", flag: "🇬🇧" },
  { code: "es", short: "ES", label: "Español", flag: "🇪🇸" },
  { code: "fr", short: "FR", label: "Français", flag: "🇫🇷" },
];

const STORAGE_KEY = "mx-lang";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void;
      };
    };
  }
}

function readSavedLang(): LangCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved === "en" || saved === "es" || saved === "fr") return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

function setTranslateCookie(lang: LangCode) {
  const value = lang === "en" ? "" : `/en/${lang}`;
  const expires = lang === "en" ? "Thu, 01 Jan 1970 00:00:00 GMT" : undefined;
  const base = `googtrans=${value};path=/`;
  document.cookie = expires ? `${base};expires=${expires}` : base;
  // Also clear domain variants Google may set
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
}

function applyGoogleCombo(lang: LangCode) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return false;
  if (select.value !== lang) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  }
  return true;
}

/** Hidden Google Translate host — mount once in layout */
export function GoogleTranslateHost() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Restore preferred language after widget mounts
      const lang = readSavedLang();
      if (lang !== "en") {
        window.setTimeout(() => applyGoogleCombo(lang), 400);
      }
    };

    if (document.getElementById("google-translate-script")) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div id="google_translate_element" className="mx-gtranslate" aria-hidden="true" />
  );
}

type Props = {
  className?: string;
  /** Show in mobile drawer */
  compact?: boolean;
};

export function LanguageSwitcher({ className = "", compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(readSavedLang());
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  const selectLang = (code: LangCode) => {
    setLang(code);
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = code;
    setTranslateCookie(code);

    const applied = applyGoogleCombo(code);
    if (!applied || code === "en") {
      // English reset / widget not ready — reload for clean state
      window.setTimeout(() => window.location.reload(), 60);
      return;
    }
  };

  return (
    <div
      ref={rootRef}
      className={`mx-lang ${open ? "open" : ""} ${compact ? "mx-lang--compact" : ""} ${className}`}
    >
      <button
        type="button"
        className="caption"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="mx-lang__flag" aria-hidden="true">
          {current.flag}
        </span>
        <span className="mx-lang__code">{current.short}</span>
        <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`} />
      </button>

      {open ? (
        <div className="list" role="listbox" aria-label="Languages">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={item.code === lang}
              className={`item ${item.code === lang ? "is-active" : ""}`}
              onClick={() => selectLang(item.code)}
            >
              <span className="mx-lang__flag" aria-hidden="true">
                {item.flag}
              </span>
              <span className="mx-lang__meta">
                <strong>{item.short}</strong>
                <em>{item.label}</em>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
