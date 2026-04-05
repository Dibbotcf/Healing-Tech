import { PageTemplate } from "../components/PageTemplate";

export function Cookies() {
  return (
    <PageTemplate title="Cookie Policy" lastUpdated="March 01, 2024">
      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4">1. Introduction</h2>
        <p>
          Healing Technology utilizes cookies and similar tracking technologies to enhance your experience on our 
          B2B platform. This policy explains how we deploy cookies to ensure site functionality, analyze traffic, 
          and personalize content for our institutional clients.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">2. Types of Cookies We Use</h2>
        <p>
          We strictly limit our use to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
          <li><strong>Essential Cookies:</strong> Required for core site operations, such as secure login, cart functionality, and form submissions.</li>
          <li><strong>Performance & Analytics Cookies:</strong> Used to understand how visitors interact with the site, helping us improve navigation and content delivery.</li>
          <li><strong>Functional Cookies:</strong> Enhance user experience by remembering preferences, language settings, and regional configurations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#00355D] mb-4 mt-8">3. Managing Your Preferences</h2>
        <p>
          You have the right to accept or decline non-essential cookies. You can manage your preferences through 
          our on-site cookie banner or by modifying your browser settings. Please note that disabling essential 
          cookies may impact certain functionalities of our procurement and support portals.
        </p>
      </section>
    </PageTemplate>
  );
}
