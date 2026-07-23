import Link from "next/link";

const steps = [
  {
    title: "Upload Your Prescription",
    blurb: "Snap a photo or upload your doctor's prescription securely.",
    icon: "/assets/images/work-icon1.png",
    step: "01",
  },
  {
    title: "Choose Your Products",
    blurb: "Browse and select the medicines or health products you need.",
    icon: "/assets/images/work-icon2.png",
    step: "02",
  },
  {
    title: "Get It Delivered",
    blurb: "Receive your order at your doorstep — fast, safe, and hassle-free.",
    icon: "/assets/images/work-icon3.png",
    step: "03",
  },
];

export function ProcessAdvanced() {
  return (
    <div className="padding-rl float-left w-100">
      <section className="float-left w-100 position-relative how-it-works-con br-30 mx-process">
        <div className="mx-process__pattern" aria-hidden="true" />

        <div className="mx-process__capsule" aria-hidden="true">
          <img src="/assets/images/capsule-icon.png" alt="" />
        </div>

        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="work-img-con mx-process__media">
                <figure>
                  <img
                    src="/assets/images/work-img-modern.jpg"
                    alt="Modern pharmacy care"
                  />
                </figure>
                <div className="mx-process__float">
                  <strong>Same-day</strong>
                  <span>Local delivery available</span>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6">
              <div className="work-content-con mx-process__content">
                <div className="heading-title-con">
                  <span className="special-text d-inline-block text-lemon">
                    Our Process
                  </span>
                  <h2 className="mb-0 text-white">How it Works</h2>
                  <p className="mx-process__intro">
                    Three simple steps from prescription to your door.
                  </p>
                </div>

                <ol className="mx-process__steps list-unstyled p-0 mb-0">
                  {steps.map((item) => (
                    <li key={item.step} className="mx-process__step">
                      <div className="mx-process__icon">
                        <img src={item.icon} alt="" />
                        <span>{item.step}</span>
                      </div>
                      <div className="sub-info-inner">
                        <h6>{item.title}</h6>
                        <p className="mb-0 sub-p">{item.blurb}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mx-process__actions">
                  <Link
                    href="/shop"
                    className="text-decoration-none primary_btn d-inline-block"
                  >
                    Shop Now
                  </Link>
                  <Link href="/transfer" className="mx-process__ghost">
                    Transfer Rx
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
