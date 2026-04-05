import { PageTemplate } from "../components/PageTemplate";

export function Quality() {
  return (
    <PageTemplate title="QA & IT Security Management" lastUpdated="April 05, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4">1. Quality Assurance Systems</h2>
        <p>
          Healing Technology maintains a stringent Quality Management System (QMS) in accordance with the internationally 
          recognized ISO 9001 standard. Our QMS governs our operational procedures, ensuring consistency, reliability, 
          and compliance across procurement, distribution, installation, and after-sales service of all medical equipment.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">2. IT Security Infrastructure</h2>
        <p>
          We employ state-of-the-art IT security protocols to safeguard all commercial, proprietary, and operational data. 
          Our systems are fortified with advanced encryption, robust firewalls, multi-factor authentication, and regular 
          vulnerability assessments to prevent unauthorized access, data breaches, and cyber threats.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">3. Continuous Improvement</h2>
        <p>
          Through ongoing training, regular internal audits, and rigorous vendor assessments, we continuously monitor 
          and refine our quality and security standards. We are committed to fostering a culture of continuous 
          improvement, adapting to evolving industry regulations and technological advancements to deliver uncompromising 
          excellence to our clients.
        </p>
      </section>
    </PageTemplate>
  );
}
