import { SiteHeader } from "@/html-port/SiteHeader";

export default function NotFound() {
  return (
    <>
      <div className="home_banner_outer float-left w-100 main-box position-relative">
        <SiteHeader />
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 sub-banner-con position-relative d-flex align-items-center justify-content-center br-30">
            <div className="main-container">
              <div className="sub-banner-inner-con text-center">
                <h1>404</h1>
                <p>Page not found</p>
                <a href="/" className="primary_btn d-inline-block text-decoration-none">
                  Back to Home
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
