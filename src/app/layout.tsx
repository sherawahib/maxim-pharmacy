import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/html-port/AppProviders";
import { FloatingCoupons } from "@/html-port/FloatingCoupons";
import { FloatingVaccines } from "@/html-port/FloatingVaccines";
import { GoogleTranslateHost } from "@/html-port/LanguageSwitcher";
import { SiteFooter } from "@/html-port/SiteFooter";
import { TemplateScripts } from "@/components/TemplateScripts";

export const metadata: Metadata = {
  title: {
    default: "Maxim Pharmacy | Trusted Care, Delivered",
    template: "%s | Maxim Pharmacy",
  },
  description:
    "Order prescription and over-the-counter medicines online with confidence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c2340",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/assets/bootstrap/bootstrap.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <link href="/assets/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="/assets/css/owl.theme.default.min.css" rel="stylesheet" />
        <link href="/assets/css/animate.css" rel="stylesheet" />
        <link href="/assets/css/shop.css" rel="stylesheet" />
        <link href="/assets/css/header-advanced.css" rel="stylesheet" />
        <link href="/assets/css/benefits-advanced.css" rel="stylesheet" />
        <link href="/assets/css/banner-advanced.css" rel="stylesheet" />
        <link href="/assets/css/categories-advanced.css" rel="stylesheet" />
        <link href="/assets/css/services-advanced.css" rel="stylesheet" />
        <link href="/assets/css/process-advanced.css" rel="stylesheet" />
        <link href="/assets/css/blog-advanced.css" rel="stylesheet" />
        <link href="/assets/css/footer-advanced.css" rel="stylesheet" />
        <link href="/assets/css/promotions-advanced.css" rel="stylesheet" />
        <link href="/assets/css/testimonials-advanced.css" rel="stylesheet" />
        <link href="/assets/css/cta-advanced.css" rel="stylesheet" />
        <link href="/assets/css/products-advanced.css" rel="stylesheet" />
        <link href="/assets/css/floating-coupons.css" rel="stylesheet" />
        <link href="/assets/css/floating-vaccines.css" rel="stylesheet" />
        <link href="/assets/css/responsive-advanced.css" rel="stylesheet" />
        <link href="/assets/css/subbanner-advanced.css" rel="stylesheet" />
        <link href="/assets/css/inner-pages-advanced.css" rel="stylesheet" />
        <link href="/assets/css/cart-checkout-advanced.css" rel="stylesheet" />
        <link href="/assets/css/product-detail-advanced.css" rel="stylesheet" />
        <link href="/assets/css/preloader-advanced.css" rel="stylesheet" />
        <link href="/assets/css/vaccinations-advanced.css" rel="stylesheet" />
        <link href="/assets/css/vaccine-form-advanced.css" rel="stylesheet" />
      </head>
      <body>
        <a id="button" />
        <GoogleTranslateHost />
        <AppProviders>
          {children}
          <SiteFooter />
          <FloatingVaccines />
          <FloatingCoupons />
        </AppProviders>
        <TemplateScripts />
      </body>
    </html>
  );
}
