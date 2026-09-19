import type { CSSProperties, ReactElement } from "react";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_DOMAIN = siteConfig.url.replace(/^https?:\/\//, "");

/** Display family per locale. Readex Pro parses cleanly in Satori; Noto/Amiri hit unsupported GSUB lookups. */
export const OG_FONT_FAMILY: Record<Locale, string> = {
  en: "Plus Jakarta Sans",
  ar: "Readex Pro",
};

/**
 * Load a Google Font as TTF for Satori (next/og). A legacy User-Agent makes
 * Google serve TTF (Satori cannot parse woff2). Cached by Next's fetch cache;
 * returns null when offline so callers can fall back to Satori's bundled sans.
 */
export async function loadGoogleFont(
  family: string,
  text: string,
  weight = 700,
): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0",
        },
        cache: "force-cache",
      },
    ).then((r) => r.text());
    const url = /src: url\((https:[^)]+)\)/.exec(css)?.[1];
    if (!url) return null;
    return await fetch(url, { cache: "force-cache" }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

/**
 * Make text safe for Satori: drop Arabic diacritics (their GSUB lookups are
 * unsupported) and swap typographic punctuation that subset fonts often lack —
 * a missing glyph triggers Satori's dynamic Noto fallback, which fails to parse.
 */
export const ogText = (text: string) =>
  text
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[\u2022\u00B7]/g, "-")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');

/**
 * Satori justifies wrapped RTL lines, leaving wide gaps. Pre-splitting the text
 * into lines (greedy, by character budget) lets each line render unjustified.
 */
export function splitLines(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(/\s+/)) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const ARABIC = /[\u0600-\u06FF]/;
const LATIN = /[A-Za-z]/;
/*
 * Known limitation: Satori measures Arabic words unshaped (sum of isolated
 * glyph widths) but draws them shaped, so RTL word gaps render wider than in a
 * browser. Margins/widths don't move the glyph runs in Next's Satori build, so
 * we accept the spacing; reading order and alignment are correct.
 */

/** Split a line into runs: consecutive Latin-bearing tokens keep LTR order inside an RTL row. */
function runs(line: string): Array<{ latin: boolean; words: string[] }> {
  const out: Array<{ latin: boolean; words: string[] }> = [];
  for (const word of line.split(" ")) {
    const latin = LATIN.test(word) && !ARABIC.test(word.replace(/^[\u0648]/, "")); // "وGoogle" counts as Latin run
    const last = out[out.length - 1];
    if (last?.latin === latin) last.words.push(word);
    else out.push({ latin, words: [word] });
  }
  return out;
}

/**
 * Render text as flex rows of word-spans (one row per line). Satori justifies
 * RTL runs across the container, so we own word order, gaps and measurement.
 */
function Lines({
  text,
  maxChars,
  style,
  rtl,
}: {
  text: string;
  maxChars: number;
  style: CSSProperties & { fontSize: number };
  rtl: boolean;
}): ReactElement {
  const fontSize = style.fontSize;
  const gap = Math.round(fontSize * 0.15);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: rtl ? "flex-end" : "flex-start",
        ...style,
      }}
    >
      {splitLines(text, maxChars).map((line, i) => {
        if (!rtl) {
          return (
            <span key={i} style={{ whiteSpace: "nowrap" }}>
              {line}
            </span>
          );
        }
        return (
          <div key={i} style={{ display: "flex", flexDirection: "row-reverse", gap }}>
            {runs(line).map((run, j) => (
              <div
                key={j}
                style={{ display: "flex", flexDirection: run.latin ? "row" : "row-reverse", gap }}
              >
                {run.words.map((word, k) => (
                  <div key={k} style={{ display: "flex" }}>
                    {word}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/** Try the locale font; if Satori rejects it, retry without a custom font rather than 500 the image. */
export async function renderOg(
  node: ReactElement,
  { locale, text }: { locale: Locale; text: string },
): Promise<ImageResponse> {
  const family = OG_FONT_FAMILY[locale];
  const data = await loadGoogleFont(family, `${ogText(text)} Smart Wafaa ${OG_DOMAIN}`, 700);
  const fonts = data
    ? [{ name: family, data, weight: 700 as const, style: "normal" as const }]
    : undefined;
  try {
    const res = new ImageResponse(node, { ...OG_SIZE, fonts });
    await res.clone().arrayBuffer(); // force rendering now so font-parsing errors surface inside the try
    return res;
  } catch (error) {
    console.warn(`[og] font "${family}" rejected by Satori, rendering without it:`, error);
    return new ImageResponse(node, { ...OG_SIZE });
  }
}

interface OgFrameProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Absolute JPEG/PNG URL for a photo backdrop on the trailing side. */
  photo?: string;
}

/** Shared 1200×630 layout: brand mark, eyebrow, big title, footer domain. */
export function OgFrame({ locale, eyebrow, title, subtitle, photo }: OgFrameProps): ReactElement {
  const rtl = locale === "ar";
  eyebrow = ogText(eyebrow);
  title = ogText(title);
  subtitle = subtitle && ogText(subtitle);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: rtl ? "row-reverse" : "row",
        background: "linear-gradient(135deg, #062e22 0%, #0f4c3a 55%, #166534 100%)",
        color: "#fff",
        fontFamily: OG_FONT_FAMILY[locale],
        direction: rtl ? "rtl" : "ltr",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background: "rgba(74,222,128,0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 560,
          height: 560,
          borderRadius: 9999,
          background: "rgba(212,175,55,0.16)",
          filter: "blur(90px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: rtl ? "flex-end" : "flex-start",
          padding: 64,
          width: photo ? 720 : 1200,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 40 40" width="40" height="40">
              <path
                d="M27.2 11.6c-3.9-3.2-10.2-2.6-12.9 1.1-1.9 2.6-1.1 5.9 1.7 7.5 2.3 1.3 5.1 1.4 7.6 1.8 3.6.6 5.4 2.7 4.6 5.4-1 3.4-5.9 4.7-9.7 3.3"
                stroke="#0F4C3A"
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 18, opacity: 0.85 }}>Smart</span>
            <span style={{ fontSize: 30, fontWeight: 800 }}>Wafaa</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: rtl ? "flex-end" : "flex-start",
          }}
        >
          <Lines
            text={eyebrow}
            maxChars={rtl ? 40 : 60}
            rtl={rtl}
            style={{
              fontSize: 22,
              ...(rtl ? {} : { letterSpacing: 3 }),
              textTransform: rtl ? "none" : "uppercase",
              color: "#f2d774",
              fontWeight: 700,
            }}
          />
          <Lines
            text={title}
            maxChars={photo ? (rtl ? 20 : 26) : rtl ? 24 : 32}
            rtl={rtl}
            style={{
              fontSize: photo ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.08,
              ...(rtl ? {} : { letterSpacing: -1.5 }),
            }}
          />
          {subtitle && (
            <span style={{ fontSize: 26, lineHeight: 1.4, color: "rgba(255,255,255,0.8)" }}>
              {subtitle}
            </span>
          )}
        </div>

        <span style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{OG_DOMAIN}</span>
      </div>

      {photo && (
        <div style={{ display: "flex", width: 480, height: 630, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori */}
          <img
            src={photo}
            alt=""
            width={480}
            height={630}
            style={{ objectFit: "cover", width: 480, height: 630 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: rtl
                ? "linear-gradient(270deg, rgba(6,46,34,0) 40%, #062e22 100%)"
                : "linear-gradient(90deg, #0f4c3a 0%, rgba(15,76,58,0) 40%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
