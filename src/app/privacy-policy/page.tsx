import LegalPage from "@/components/LegalPage/LegalPage";

const PrivacyPolicyPage = () => {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="At Xvintec, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information."
      dateLabel="Effective Date: 21 July 2026"
      sections={[
        {
          title: "Information We Collect",
          paragraphs: [
            "When you use our website or contact us, we may collect:",
          ],
          items: [
            "Name",
            "Company name",
            "Email address",
            "Phone number",
            "Information you provide through contact or consultation forms",
          ],
        },
        {
          title: "Technical Information",
          paragraphs: [
            "We may also automatically collect technical information such as:",
          ],
          items: [
            "IP address",
            "Browser and device information",
            "Pages visited",
            "Date and time of your visit",
            "Website usage data through cookies and analytics tools",
          ],
        },
        {
          title: "How We Use Your Information",
          paragraphs: ["We use your information to:"],
          items: [
            "Respond to enquiries",
            "Provide quotations and requested services",
            "Schedule consultations",
            "Improve our website and services",
            "Send service updates or marketing communications where permitted",
            "Maintain the security of our website",
          ],
        },
        {
          title: "Cookies and Analytics",
          paragraphs: [
            "Our website may use cookies and analytics tools to improve user experience and understand website performance. These technologies help us analyse traffic and enhance our services.",
          ],
        },
        {
          title: "Third-Party Services",
          paragraphs: [
            "We may use trusted third-party providers to support our business, including website hosting, analytics, customer relationship management systems, email services, and advertising platforms. These providers process information only as necessary to deliver their services.",
          ],
        },
        {
          title: "Data Security",
          paragraphs: [
            "We implement reasonable technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or loss.",
          ],
        },
        {
          title: "Your Rights",
          paragraphs: [
            "You may request access to, correction of, or deletion of your personal information by contacting us using the details below.",
          ],
        },
        {
          title: "Changes to This Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The latest version will always be published on this page with the updated effective date.",
          ],
        },
        {
          title: "Contact Us",
          paragraphs: [
            "If you have any questions about this Privacy Policy or how we handle your information, please contact us.",
            "Xvintec",
          ],
          links: [
            {
              label: "Website: https://www.xvintec.com",
              href: "https://www.xvintec.com",
            },
            {
              label: "Email: support@xvintec.com",
              href: "mailto:support@xvintec.com",
            },
          ],
        },
      ]}
    />
  );
};

export default PrivacyPolicyPage;
