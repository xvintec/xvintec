import LegalPage from "@/components/LegalPage/LegalPage";

const CookiePolicyPage = () => {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="Xvintec uses cookies and similar technologies to improve your browsing experience and help us understand how our website is used."
      dateLabel="Effective Date: 21 July 2026"
      sections={[
        {
          title: "What Are Cookies?",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They allow websites to remember your preferences and improve functionality.",
          ],
        },
        {
          title: "Cookies We Use",
          paragraphs: [],
        },
        {
          title: "Essential Cookies",
          paragraphs: ["Required for the website to function correctly."],
        },
        {
          title: "Analytics Cookies",
          paragraphs: [
            "Help us understand how visitors use our website so we can improve performance and user experience.",
          ],
        },
        {
          title: "Marketing Cookies",
          paragraphs: [
            "May be used by advertising platforms such as LinkedIn, Google, or Meta to measure the effectiveness of our campaigns and improve relevant advertising.",
          ],
        },
        {
          title: "Managing Cookies",
          paragraphs: [
            "Most web browsers allow you to control or disable cookies through their settings. Please note that disabling certain cookies may affect website functionality.",
          ],
        },
        {
          title: "Changes to This Policy",
          paragraphs: [
            "We may update this Cookie Policy periodically. Any changes will be published on this page.",
          ],
        },
        {
          title: "Contact",
          paragraphs: [
            "If you have any questions regarding our use of cookies, please contact us via the contact information provided on our website.",
          ],
        },
      ]}
    />
  );
};

export default CookiePolicyPage;
