import Link from "next/link";
import { SiteHeader } from "@/html-port/SiteHeader";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description: string;
  crumbs: Crumb[];
  image?: string;
};

export function SubBannerAdvanced({
  title,
  description,
  crumbs,
  image = "/assets/images/sub-banner-bg-img.jpg",
}: Props) {
  return (
    <div className="home_banner_outer float-left w-100 main-box position-relative">
      <SiteHeader />
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 sub-banner-con mx-subbanner position-relative br-30">
          <img
            src={image}
            alt=""
            className="mx-subbanner__photo"
            aria-hidden="true"
          />
          <div className="mx-subbanner__overlay" aria-hidden="true" />
          <div className="mx-subbanner__grid" aria-hidden="true" />

          <div className="main-container position-relative">
            <div className="mx-subbanner__inner text-center">
              <nav className="mx-subbanner__crumbs" aria-label="Breadcrumb">
                <ol>
                  {crumbs.map((c, i) => (
                    <li key={`${c.label}-${i}`}>
                      {c.href ? (
                        <Link href={c.href}>{c.label}</Link>
                      ) : (
                        <span aria-current="page">{c.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
