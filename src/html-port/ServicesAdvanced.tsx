"use client";

import Link from "next/link";

const services = [
  {
    title: "Multi-Dose Packaging",
    blurb:
      "Organized, labeled packaging that makes complex medication schedules simple and safe.",
    image: "/assets/images/s1.jpg",
  },
  {
    title: "Durable Medical Equipment",
    blurb:
      "Quality mobility and home-care equipment selected with pharmacist guidance.",
    image: "/assets/images/s2.jpg",
  },
  {
    title: "Non-Sterile Compounding",
    blurb:
      "Custom formulations tailored to your prescription when standard options fall short.",
    image: "/assets/images/s3.jpg",
  },
  {
    title: "Free Delivery*",
    blurb:
      "Discreet, reliable delivery so your care arrives when you need it — hassle-free.",
    image: "/assets/images/s4.jfif",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const num = String((index % services.length) + 1).padStart(2, "0");
  const isClone = index >= services.length;

  return (
    <article
      className="seller-box mx-services__card"
      aria-hidden={isClone ? true : undefined}
    >
      <div className="seller_image_box box1 mx-services__media">
        <span className="mx-services__num">{num}</span>
        <figure className="mb-0">
          <img
            src={service.image}
            alt={isClone ? "" : service.title}
            className="img-fluid"
          />
        </figure>
      </div>
      <div className="seller_box_content mx-services__body">
        <div className="text_wrapper position-relative">
          <h5>{service.title}</h5>
          <p>{service.blurb}</p>
          <Link
            href="/services"
            className="mx-services__link"
            tabIndex={isClone ? -1 : undefined}
          >
            Learn more <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesAdvanced() {
  const loop = [...services, ...services];

  return (
    <div className="padding-rl float-left w-100">
      <section className="position-relative padding-top padding-bottom featured-products-con mx-services">
        <div className="container-fluid">
          <div className="heading-title-con text-center mx-services__head">
            <span className="special-text d-inline-block">What we offer</span>
            <h2 className="mb-0">Our Services</h2>
            <p className="mx-services__sub">
              Professional pharmacy services designed for precision, convenience,
              and peace of mind.
            </p>
          </div>
        </div>

        <div className="mx-services__marquee" aria-label="Services carousel">
          <div className="mx-services__track">
            {loop.map((s, i) => (
              <div className="mx-services__slide" key={`${s.title}-${i}`}>
                <ServiceCard service={s} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="container-fluid">
          <div className="text-center mx-services__cta">
            <Link
              href="/services"
              className="primary_btn d-inline-block text-decoration-none"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
