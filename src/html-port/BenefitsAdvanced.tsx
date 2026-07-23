const benefits = [
  {
    title: "Free Shipping & Returns",
    text: "For all orders over $200",
    icon: "/assets/images/benefits-icon1.png",
    accent: "#1b4f82",
  },
  {
    title: "Secure Payment",
    text: "Ensure Secure Payment",
    icon: "/assets/images/benefits-icon2.png",
    accent: "#c8102e",
  },
  {
    title: "Money Back Guarantee",
    text: "Returning Money in 30 days",
    icon: "/assets/images/benefits-icon3.png",
    accent: "#1b4f82",
  },
  {
    title: "24/7 Customer Support",
    text: "Friendly Customer Support",
    icon: "/assets/images/benefits-icon4.png",
    accent: "#c8102e",
  },
];

export function BenefitsAdvanced({ overlap = false }: { overlap?: boolean }) {
  return (
    <div className="padding-rl float-left w-100">
      <section className={`float-left w-100 mx-benefits${overlap ? " mx-benefits--overlap" : ""}`}>
        <div className="main-container">
          <div className="mx-benefits__shell">
            <ul className="mx-benefits__list list-unstyled mb-0 p-0">
              {benefits.map((item, i) => (
                <li key={item.title} className="mx-benefits__item" style={{ ["--accent" as string]: item.accent }}>
                  <div className="mx-benefits__icon" aria-hidden="true">
                    <span className="mx-benefits__glow" />
                    <span className="mx-benefits__ring" />
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="mx-benefits__copy">
                    <h6>{item.title}</h6>
                    <p>{item.text}</p>
                  </div>
                  {i < benefits.length - 1 ? (
                    <span className="mx-benefits__divider" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
