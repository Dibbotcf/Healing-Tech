import { PageTemplate } from "../components/PageTemplate";

export function Privacy() {
  return (
    <PageTemplate title="Privacy Policy" lastUpdated="February 20, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4">1. Information Collection</h2>
        <p>
          At Healing Technology, your privacy is paramount. As a B2B medical technology distributor, we collect 
          information primarily from businesses, hospitals, clinics, and professional healthcare providers. This 
          includes company names, professional contact details, billing information, and facility licensure data 
          required for regulatory compliance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">2. Use of Information</h2>
        <p>
          We use the collected data exclusively to process orders, facilitate equipment delivery, provide technical 
          support, manage warranty services, and ensure compliance with medical device distribution regulations 
          (such as ISO 9001 and DGDA guidelines).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">3. Data Security Measures</h2>
        <p>
          Healing Technology implements advanced enterprise-grade security protocols to protect all sensitive 
          commercial and operational data. We utilize encrypted servers, secure payment gateways, and strict 
          internal access controls to prevent unauthorized access, disclosure, or modification of your information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">4. No PHI Collection</h2>
        <p>
          We explicitly do not collect, process, or store Protected Health Information (PHI) or direct patient 
          records. Our platform and services are designed for institutional procurement and technical management, 
          not clinical data storage.
        </p>
      </section>
    </PageTemplate>
  );
}
