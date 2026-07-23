import type { Metadata } from "next";
import { BlogAdvanced } from "@/html-port/BlogAdvanced";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <SubBannerAdvanced
        title="News & Articles"
        description="Practical guidance for immunity, skincare, supplements, and everyday wellness."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
        image="/assets/images/news-and-articles-img1.jpg"
      />
      <BlogAdvanced />
      <CtaAdvanced />
    </>
  );
}
