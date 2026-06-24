import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — KG365 LLC" },
      { name: "description", content: "Terms of Use for KG365 LLC renovation and handyman services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="w-full px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2">Terms of Use</h1>
        <p className="mb-10 text-ink-soft">Last updated: June 2026</p>

        <div className="space-y-10 text-ink-soft">
          <div>
            <h2 className="mb-3 text-2xl text-ink">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the KG365 LLC website ("Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site. KG365 LLC reserves the right to update these terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">2. Use of the Site</h2>
            <p>
              You may use the Site for lawful purposes only. You agree not to use the Site in any way that violates applicable federal, state, or local laws or regulations, or that infringes on the rights of others. You may not use the Site to transmit any unsolicited or unauthorized advertising or promotional material.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">3. Services and Estimates</h2>
            <p>
              Information on this Site regarding services, pricing, and timelines is provided for general informational purposes only. Submitting a consultation request does not create a binding contract. All estimates and agreements are finalized in a separate written contract signed by both parties.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">4. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, logos, and graphics — is the property of KG365 LLC or its content suppliers and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without express written permission.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">5. Disclaimer of Warranties</h2>
            <p>
              The Site is provided "as is" without warranties of any kind, either express or implied. KG365 LLC does not warrant that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, KG365 LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site or the services described herein.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">7. Governing Law</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in Philadelphia County, Pennsylvania.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">8. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:kg365llc@gmail.com" className="text-primary hover:underline">
                kg365llc@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:+14453331193" className="text-primary hover:underline">
                (445) 333-1193
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
