"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import Button from "@/components/Common/Button/Button";

const PopupModal = dynamic(
  () => import("react-calendly").then((module) => module.PopupModal),
  { ssr: false }
);

const CalendlyBadge = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[9998]">
      <Button
        onClick={() => setIsPopupOpen(true)}
        showArrow={false}
        className="min-w-fit shadow-lg"
      >
        Book a free consultation
      </Button>

      {mounted && (
        <PopupModal
          url="https://calendly.com/xvintec-web/30min?hide_gdpr_banner=1"
          rootElement={document.body}
          onModalClose={() => setIsPopupOpen(false)}
          open={isPopupOpen}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "#042AE2",
            textColor: "4d5055",
          }}
        />
      )}
    </div>
  );
};

export default CalendlyBadge;
