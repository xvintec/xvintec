import LegalPage from "@/components/LegalPage/LegalPage";

const TermsAndConditionsPage = () => {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="Welcome to Xvintec. By accessing or using this website, you agree to the following Terms & Conditions."
      dateLabel="Effective Date: 21 July 2026"
      sections={[
        {
          title: "Website Use",
          paragraphs: [
            "You agree to use this website only for lawful purposes. You must not attempt to gain unauthorised access to our systems, interfere with the operation of the website, or use the website in a way that may harm Xvintec or other users.",
          ],
        },
        {
          title: "Intellectual Property",
          paragraphs: [
            "All content on this website, including text, graphics, logos, images, and branding, is the property of Xvintec unless otherwise stated and may not be copied, reproduced, or distributed without prior written permission.",
          ],
        },
        {
          title: "Services",
          paragraphs: [
            "Information provided on this website is for general informational purposes only and does not constitute a binding agreement or guarantee of service availability. Service offerings, pricing, and specifications may change without notice.",
          ],
        },
        {
          title: "Third-Party Links",
          paragraphs: [
            "Our website may contain links to external websites. Xvintec is not responsible for the content, security, or privacy practices of those websites.",
          ],
        },
        {
          title: "Disclaimer",
          paragraphs: [
            "While we make every effort to keep the information on this website accurate and up to date, we make no warranties regarding its completeness, accuracy, or reliability. Your use of this website is at your own risk.",
          ],
        },
        {
          title: "Limitation of Liability",
          paragraphs: [
            "To the fullest extent permitted by law, Xvintec shall not be liable for any indirect, incidental, or consequential loss arising from the use of this website.",
          ],
        },
        {
          title: "Governing Law",
          paragraphs: [
            "These Terms & Conditions are governed by the laws of the Democratic Socialist Republic of Sri Lanka.",
          ],
        },
        {
          title: "Changes to These Terms",
          paragraphs: [
            "We may revise these Terms & Conditions at any time. Continued use of the website after changes are published constitutes acceptance of the updated terms.",
          ],
        },
        {
          title: "Contact Us",
          paragraphs: [
            "For questions regarding these Terms & Conditions, please contact us through the details provided on our website.",
          ],
        },
      ]}
    />
  );
};

export default TermsAndConditionsPage;
