import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

export function TransferContent() {
  return (
    <>
      <SubBannerAdvanced
        title="Transfer a Prescription"
        description="Complete our secure form to move your medications to Maxim. Need help? Call +1 123 456 7890."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Transfer Rx" },
        ]}
        image="/assets/images/work-img-modern.jpg"
      />

      <section className="float-left w-100 position-relative fmr-prhar mx-transfer padding-top padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="transfer-wrapper">
                <div className="transfer-card">
                  <div className="transfer-header">
                    <h1>Patient transfer form</h1>
                    <p>
                      Share a few details so we can verify your identity and
                      request your prescriptions from your previous pharmacy.
                    </p>
                  </div>

                  <form>
                    <div className="form-section">
                      <h3>Patient Details</h3>
                      <p>
                        Tell us about you so we can verify who you are with your
                        old pharmacy.
                      </p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>
                            First Name <span className="required">*</span>
                          </label>
                          <input type="text" placeholder="Enter first name" required />
                        </div>
                        <div className="form-group">
                          <label>
                            Last Name <span className="required">*</span>
                          </label>
                          <input type="text" placeholder="Enter last name" required />
                        </div>
                        <div className="form-group">
                          <label>
                            Phone Number <span className="required">*</span>
                          </label>
                          <input type="tel" placeholder="(123) 456-7890" required />
                        </div>
                        <div className="form-group">
                          <label>
                            Birthday <span className="required">*</span>
                          </label>
                          <input type="date" required />
                          <span className="helper-text">
                            Please enter the DOB in MM/DD/YYYY format
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>New Pharmacy Location</h3>
                      <p>Select which of our locations you’d like to use.</p>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>
                            Pharmacy Location <span className="required">*</span>
                          </label>
                          <select required defaultValue="">
                            <option value="" disabled>
                              Select Pharmacy Location
                            </option>
                            <option>Downtown Pharmacy</option>
                            <option>South Florida Pharmacy</option>
                            <option>Miami Lakes Pharmacy</option>
                            <option>West Palm Pharmacy</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Previous Pharmacy Info</h3>
                      <p>
                        Tell us about your old pharmacy so we can transfer your
                        medications.
                      </p>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>
                            Pharmacy Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Previous pharmacy name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Pharmacy Number <span className="required">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="Pharmacy phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Prescriptions</h3>
                      <p>
                        Confirm whether you’d like every active medication
                        transferred.
                      </p>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <div className="checkbox-group">
                            <input type="checkbox" id="allmeds" />
                            <label htmlFor="allmeds">
                              Transfer all of my medications
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Notes for Pharmacy (Optional)</h3>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>
                            Verify your insurance here or in the pharmacy when
                            you get your medication
                          </label>
                          <textarea placeholder="Write notes for the pharmacy..." />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <div className="checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">
                          I agree to the Terms and Conditions and Privacy Policy
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">
                      Submit Transfer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaAdvanced />
    </>
  );
}
