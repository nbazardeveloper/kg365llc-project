import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — KG365 LLC" },
      { name: "description", content: "Privacy Policy for KG365 LLC renovation and handyman services." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="w-full px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2">Privacy Policy</h1>
        <p className="mb-10 text-ink-soft">Last updated: June 2026</p>

        <div className="space-y-10 text-ink-soft">
          <div>
            <h2 className="mb-3 text-2xl text-ink">1. Information We Collect</h2>
            <p>
              When you submit a consultation request through our Site, we collect personal information you voluntarily provide, including your name, email address, phone number, and project details. We may also collect non-personal information such as browser type, device type, and pages visited through standard web analytics tools.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">2. How We Use Your Information</h2>
            <p>
              We use the information you provide to respond to your inquiry, schedule consultations, prepare estimates, and communicate about your project. We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">3. Cookies</h2>
            <p>
              Our Site may use cookies — small data files stored on your device — to improve your browsing experience and gather analytics data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Site may not function properly without cookies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">4. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">5. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. We have no control over the content or privacy practices of those sites and encourage you to review their privacy policies separately.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">6. Children's Privacy</h2>
            <p>
              Our Site is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">7. Changes to This Policy</h2>
            <p>
              KG365 LLC reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated date. Your continued use of the Site after any changes constitutes your acceptance of the new policy.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl text-ink">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
