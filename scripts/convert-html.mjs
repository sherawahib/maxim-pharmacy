/**
 * Convert static HTML template pages into Next.js JSX page modules.
 */
const fs = require("fs");
const path = require("path");

const SRC = "f:/huiwebsite/v1-html/v1";
const OUT = "f:/huiwebsite/maxim-pharmacy/src/html-port";

fs.mkdirSync(OUT, { recursive: true });

const linkMap = [
  [/href="index(\.html)?"/g, 'href="/"'],
  [/href="about(\.html)?"/g, 'href="/about"'],
  [/href="shop(\.html)?"/g, 'href="/shop"'],
  [/href="services(\.html)?"/g, 'href="/services"'],
  [/href="contact(\.html)?"/g, 'href="/contact"'],
  [/href="blog(\.html)?"/g, 'href="/blog"'],
  [/href="Transfer-a-Prescription\.html"/g, 'href="/transfer"'],
  [/href="team(\.html)?"/g, 'href="/services"'],
  [/href="cart(\.html)?"/g, 'href="/shop"'],
  [/href="single-product(\.html)?"/g, 'href="/shop"'],
  [/href="single-blog(\.html)?"/g, 'href="/blog"'],
  [/href="login(\.html)?"/g, 'href="/contact"'],
  [/href="privacy-policy(\.html)?"/g, 'href="/privacy-policy"'],
  [/src="assets\//g, 'src="/assets/'],
  [/href="assets\//g, 'href="/assets/'],
];

function htmlToJsx(html) {
  let s = html;

  for (const [re, rep] of linkMap) s = s.replace(re, rep);

  // Remove script tags
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Comments OK in JSX as {/* */}
  s = s.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c.replace(/\*\//g, "* /")}*/}`);

  // class -> className
  s = s.replace(/\sclass=/g, " className=");
  s = s.replace(/\sfor=/g, " htmlFor=");

  // boolean attrs
  s = s.replace(/\sallowfullscreen(="")?/gi, " allowFullScreen");
  s = s.replace(/\schecked(="")?/gi, " defaultChecked");
  s = s.replace(/\sselected(="")?/gi, " defaultSelected");
  s = s.replace(/\sdisabled(="")?/gi, " disabled");
  s = s.replace(/\sreadonly(="")?/gi, " readOnly");
  s = s.replace(/\srequired(="")?/gi, " required");
  s = s.replace(/\shidden(="")?/gi, " hidden");
  s = s.replace(/\snomodule(="")?/gi, " noModule");

  // self-closing void elements that aren't closed
  s = s.replace(/<(img|input|br|hr|meta|link|source|area|col|embed|param|track|wbr)([^>]*?)(?<!\/)>/gi, "<$1$2 />");

  // style="a: b; c: d" -> style={{a: 'b', c: 'd'}}
  s = s.replace(/\sstyle="([^"]*)"/g, (_, css) => {
    const obj = css
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const i = p.indexOf(":");
        if (i < 0) return null;
        let k = p.slice(0, i).trim();
        let v = p.slice(i + 1).trim();
        k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        if (/^\d+(\.\d+)?(px|em|rem|%|s|ms)?$/.test(v) && !v.endsWith("%")) {
          // keep as string for safety
        }
        return `${k}: '${v.replace(/'/g, "\\'")}'`;
      })
      .filter(Boolean)
      .join(", ");
    return ` style={{${obj}}}`;
  });

  // Fix orphaned & in text (common entities already fine)
  // tabindex etc already ok

  return s;
}

function extractBetween(html, startMarker, endMarker) {
  const a = html.indexOf(startMarker);
  const b = html.indexOf(endMarker);
  if (a < 0 || b < 0 || b <= a) return null;
  return html.slice(a, b);
}

function extractHeader(html) {
  // header block inside first padding-rl
  const start = html.indexOf('<header class="w-100 float-left header-con');
  const end = html.indexOf("</header>", start);
  if (start < 0 || end < 0) return null;
  return html.slice(start, end + "</header>".length);
}

function extractFooter(html) {
  const start = html.indexOf('<section class="float-left w-100 footer-con');
  const end = html.indexOf("</section>", start);
  if (start < 0 || end < 0) return null;
  // include outer padding wrappers if present - find padding-rl before footer
  const pad = html.lastIndexOf('<div class="padding-rl float-left w-100">', start);
  const after = html.indexOf("</div>", end);
  // simpler: just section
  return html.slice(start, end + "</section>".length);
}

function writeTsx(name, bodyJsx, imports = "") {
  const content = `${imports}export default function Page() {
  return (
    <>
${bodyJsx}
    </>
  );
}
`;
  fs.writeFileSync(path.join(OUT, name), content, "utf8");
  console.log("Wrote", name);
}

// --- Header ---
{
  const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  let header = extractHeader(html);
  header = htmlToJsx(header);
  // Fix nav links for Services/Contact that pointed to shop in original
  header = header
    .replace(
      /<a className="nav-link p-0" href="\/shop">Services<\/a>/,
      '<a className="nav-link p-0" href="/services">Services</a>'
    )
    .replace(
      /<a className="nav-link p-0" href="\/shop">Contact<\/a>/,
      '<a className="nav-link p-0" href="/contact">Contact</a>'
    );

  fs.writeFileSync(
    path.join(OUT, "SiteHeader.tsx"),
    `"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    // mark active nav
    document.querySelectorAll(".navbar-nav .nav-link").forEach((el) => {
      const href = el.getAttribute("href");
      if (!href) return;
      const active =
        href === "/"
          ? pathname === "/"
          : pathname.startsWith(href);
      el.classList.toggle("active", active);
    });
  }, [pathname]);

  return (
    <div className="padding-rl float-left w-100">
${header}
    </div>
  );
}
`,
    "utf8"
  );
  console.log("Wrote SiteHeader.tsx");
}

// --- Footer ---
{
  const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  let footer = extractFooter(html);
  footer = htmlToJsx(footer);
  // Fix footer nav links
  footer = footer
    .replace(/href="\/services">Services/g, 'href="/services">Services')
    .replace(
      /<li><i className="fa-solid fa-arrow-right"><\/i><a href="\/blog"\s*className="text-decoration-none">Contact<\/a><\/li>/,
      '<li><i className="fa-solid fa-arrow-right"></i><a href="/contact" className="text-decoration-none">Contact</a></li>'
    );

  fs.writeFileSync(
    path.join(OUT, "SiteFooter.tsx"),
    `export function SiteFooter() {
  return (
    <>
    <div className="padding-rl float-left w-100">
${footer}
    </div>
    <div className="spacer"></div>
    </>
  );
}
`,
    "utf8"
  );
  console.log("Wrote SiteFooter.tsx");
}

// --- Home: banner + rest ---
{
  const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  // from home_banner_outer through before footer
  const bannerStart = html.indexOf('<div class="home_banner_outer');
  const benefits = html.indexOf("<!-- BENEFITS SECTION -->");
  const footerMark = html.indexOf("<!-- FOOTER SECTION -->");

  // banner includes header - we want banner without header
  // Extract: after header's closing padding-rl, the BANNER SECTION
  const bannerSec = html.indexOf("<!-- BANNER SECTION -->");
  const bannerOuterEnd = html.indexOf("<!-- home banner outer -->", bannerSec);
  // Include closing divs of home_banner_outer
  let homeTop = html.slice(bannerSec, html.indexOf("<!-- BENEFITS SECTION -->"));
  // We need wrapper home_banner_outer with header placeholder - page will compose differently

  let homeBody = html.slice(benefits, footerMark);
  homeBody = htmlToJsx(homeBody);

  // Banner only (inside home_banner_outer after header)
  let banner = html.slice(bannerSec, html.indexOf("<!-- home banner outer -->", bannerSec));
  // include the closing </div> for home_banner_outer - look for structure
  // From BANNER SECTION through end of home_banner_outer div
  const afterBannerComment = html.indexOf("<!-- home banner outer -->", bannerSec);
  // lines 206-207 close sections - take until benefits
  banner = html.slice(bannerSec, benefits);
  banner = htmlToJsx(banner);

  fs.writeFileSync(
    path.join(OUT, "HomeBanner.tsx"),
    `"use client";

import { useEffect } from "react";

export function HomeBanner() {
  useEffect(() => {
    const btn = document.getElementById("uploadBtn");
    const input = document.getElementById("fileInput") as HTMLInputElement | null;
    const name = document.getElementById("fileName");
    if (!btn || !input) return;
    const onClick = () => input.click();
    const onChange = () => {
      if (name) name.textContent = input.files?.[0]?.name || "";
    };
    btn.addEventListener("click", onClick);
    input.addEventListener("change", onChange);
    return () => {
      btn.removeEventListener("click", onClick);
      input.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div className="home_banner_outer float-left w-100 main-box position-relative">
      {/* HEADER injected by layout */}
${banner}
    </div>
  );
}
`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(OUT, "HomeContent.tsx"),
    `export function HomeContent() {
  return (
    <>
${homeBody}
    </>
  );
}
`,
    "utf8"
  );
  console.log("Wrote HomeBanner + HomeContent");
}

function convertInnerPage(file, title, options = {}) {
  const html = fs.readFileSync(path.join(SRC, file), "utf8");
  // From SUB BANNER or main content after header to FOOTER
  let start =
    html.indexOf("<!-- SUB BANNER SECTION -->") >= 0
      ? html.indexOf("<!-- SUB BANNER SECTION -->")
      : html.indexOf('<section class="float-left w-100 position-relative fmr-prhar">');

  // For about, the home_banner_outer wraps header+subbanner. Include subbanner inside outer.
  const footerMark =
    html.indexOf("<!-- FOOTER SECTION -->") >= 0
      ? html.indexOf("<!-- FOOTER SECTION -->")
      : html.lastIndexOf('<section class="float-left w-100 footer-con');

  if (start < 0) start = html.indexOf("</header>") + "</header>".length;

  let body = html.slice(start, footerMark);
  // Remove leftover closing of home_banner_outer issues - keep as is
  body = htmlToJsx(body);

  // Wrap pages that need sub-banner outer
  const needsOuter = file !== "Transfer-a-Prescription.html";
  const wrapped = needsOuter
    ? `<div className="home_banner_outer float-left w-100 main-box position-relative">
      {/* header via layout */}
${body}
    </div>`
    : body;

  fs.writeFileSync(
    path.join(OUT, `${options.outName || title}.tsx`),
    `export function ${options.exportName || title}() {
  return (
    <>
${wrapped}
    </>
  );
}
`,
    "utf8"
  );
  console.log("Wrote", title);
}

convertInnerPage("about.html", "AboutContent", { exportName: "AboutContent", outName: "AboutContent" });
convertInnerPage("shop.html", "ShopContent", { exportName: "ShopContent", outName: "ShopContent" });
convertInnerPage("services.html", "ServicesContent", { exportName: "ServicesContent", outName: "ServicesContent" });
convertInnerPage("contact.html", "ContactContent", { exportName: "ContactContent", outName: "ContactContent" });
convertInnerPage("Transfer-a-Prescription.html", "TransferContent", {
  exportName: "TransferContent",
  outName: "TransferContent",
});

console.log("Done.");
