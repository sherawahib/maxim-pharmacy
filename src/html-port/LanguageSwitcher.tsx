"use client";

import { useEffect, useRef, useState } from "react";

export type LangCode = "en" | "es" | "fr" | "vi";

export const languages: {
  code: LangCode;
  short: string;
  label: string;
  flagSrc: string;
  flagAlt: string;
}[] = [
  {
    code: "en",
    short: "EN",
    label: "English",
    flagSrc: "https://flagcdn.com/w40/gb.png",
    flagAlt: "United Kingdom",
  },
  {
    code: "es",
    short: "ES",
    label: "Español",
    flagSrc: "https://flagcdn.com/w40/es.png",
    flagAlt: "Spain",
  },
  {
    code: "fr",
    short: "FR",
    label: "Français",
    flagSrc: "https://flagcdn.com/w40/fr.png",
    flagAlt: "France",
  },
  {
    code: "vi",
    short: "VI",
    label: "Tiếng Việt",
    flagSrc: "https://flagcdn.com/w40/vn.png",
    flagAlt: "Vietnam",
  },
];

const STORAGE_KEY = "mx-lang";
const LANG_CODES: LangCode[] = ["en", "es", "fr", "vi"];

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

function isLangCode(value: string | null): value is LangCode {
  return !!value && (LANG_CODES as string[]).includes(value);
}

function readSavedLang(): LangCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLangCode(saved)) return saved;
  } catch {
    /* ignore */
  }

  try {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    const raw = match?.[1] ? decodeURIComponent(match[1]) : "";
    const parts = raw.split("/");
    const cookieLang = parts[parts.length - 1];
    if (isLangCode(cookieLang)) return cookieLang;
  } catch {
    /* ignore */
  }

  return "en";
}

function clearTranslateCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const candidates = [
    "",
    host,
    `.${host}`,
    parts.length > 2 ? `.${parts.slice(-2).join(".")}` : "",
  ].filter(Boolean);

  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=;path=/;${expire}`;
  candidates.forEach((domain) => {
    document.cookie = `googtrans=;path=/;domain=${domain};${expire}`;
  });
}

function setTranslateCookie(lang: LangCode) {
  clearTranslateCookies();
  if (lang === "en") return;

  const value = `/en/${lang}`;
  const host = window.location.hostname;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  if (host.includes(".")) {
    document.cookie = `googtrans=${value};path=/;domain=.${host}`;
  }
}

function applyGoogleCombo(lang: LangCode) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return false;

  const target = lang === "en" ? "" : lang;
  if (select.value !== target && select.value !== lang) {
    // Google uses language codes like "vi", "es", "fr"; English is often ""
    const option = Array.from(select.options).find(
      (o) => o.value === lang || (lang === "en" && o.value === "")
    );
    select.value = option?.value ?? lang;
    select.dispatchEvent(new Event("change"));
  }
  return true;
}

function waitForCombo(lang: LangCode, attempts = 20) {
  let left = attempts;
  const tick = () => {
    if (applyGoogleCombo(lang) || left <= 0) return;
    left -= 1;
    window.setTimeout(tick, 200);
  };
  tick();
}

/** Hidden Google Translate host — mount once in layout */
export function GoogleTranslateHost() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,vi",
          autoDisplay: false,
          multilanguagePage: true,
        },
        "google_translate_element"
      );

      const lang = readSavedLang();
      if (lang !== "en") {
        window.setTimeout(() => waitForCombo(lang), 300);
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      className="mx-gtranslate skiptranslate"
      aria-hidden="true"
    />
  );
}

type Props = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className = "", compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const [busy, setBusy] = useState(false);
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
    if (busy || code === lang) {
      setOpen(false);
      return;
    }

    setBusy(true);
    setLang(code);
    setOpen(false);

    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }

    document.documentElement.lang = code === "en" ? "en" : code;
    setTranslateCookie(code);

    // Reload is the most reliable way for Google Translate + Next.js SPA
    window.setTimeout(() => {
      window.location.reload();
    }, 80);
  };

  return (
    <div
      ref={rootRef}
      className={`mx-lang skiptranslate notranslate ${open ? "open" : ""} ${
        compact ? "mx-lang--compact" : ""
      } ${className}`}
      translate="no"
    >
      <button
        type="button"
        className="caption"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        disabled={busy}
      >
        <img
          className="mx-lang__flag-img"
          src={current.flagSrc}
          alt=""
          width={20}
          height={14}
        />
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
              <img
                className="mx-lang__flag-img"
                src={item.flagSrc}
                alt={item.flagAlt}
                width={20}
                height={14}
              />
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
