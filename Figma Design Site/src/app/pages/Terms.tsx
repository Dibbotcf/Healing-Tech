import { PageTemplate } from "../components/PageTemplate";

export function Terms() {
  return (
    <PageTemplate title="Terms & Conditions" lastUpdated="January 15, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4">1. Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by Healing Technology Ltd. ("Company", "we", "us", or "our"), 
          you agree to be bound by these Terms and Conditions. Our platform serves as a B2B distributor of medical 
          equipment and related technologies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">2. Professional Use Only</h2>
        <p>
          All products, equipment, and services provided by Healing Technology are strictly intended for professional 
          and commercial use by licensed medical facilities, registered healthcare practitioners, and approved 
          organizational entities. We do not sell directly to consumers or unauthorized individuals.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">3. Regulatory Compliance</h2>
        <p>
          Purchasers bear the sole responsibility for ensuring that the acquisition, installation, and operation of 
          any medical devices comply with local, national, and international laws, including DGDA (Directorate General 
          of Drug Administration) guidelines in Bangladesh and other applicable regulatory bodies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">4. Liability Limitation</h2>
        <p>
          Healing Technology acts as a distributor and technology partner. We are not a clinical healthcare provider. 
          Any clinical outcomes, patient diagnoses, or treatment procedures utilizing equipment sourced through our 
          platform remain the strict responsibility of the licensed medical professionals and the purchasing institution.
        </p>
      </section>
    </PageTemplate>
  );
}
