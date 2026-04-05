import { PageTemplate } from "../components/PageTemplate";

export function Regulatory() {
  return (
    <PageTemplate title="Regulatory Applications" lastUpdated="April 10, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4">1. Medical Device Compliance</h2>
        <p>
          Healing Technology rigorously adhering to national and international regulations governing the importation, 
          distribution, and servicing of medical equipment. We ensure all products within our portfolio are 
          manufactured in accordance with globally recognized standards, including CE Marking and FDA guidelines.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">2. DGDA Certification</h2>
        <p>
          As an authorized medical device distributor in Bangladesh, Healing Technology maintains strict compliance 
          with the Directorate General of Drug Administration (DGDA). We possess the requisite licensure and 
          certifications to legally import, store, and distribute regulated medical technologies within the country.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">3. Quality System Regulation (QSR)</h2>
        <p>
          Our operations align with the principles of Good Distribution Practice (GDP) for medical devices. We 
          maintain comprehensive records, traceability systems, and recall protocols to ensure the safety, efficacy, 
          and quality of all products delivered to our healthcare partners. We actively monitor adverse events and 
          collaborate with manufacturers and regulatory authorities to address any product concerns promptly.
        </p>
      </section>
    </PageTemplate>
  );
}
