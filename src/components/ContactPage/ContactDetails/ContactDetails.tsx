"use client";

import React from "react";

import dynamic from "next/dynamic";
import { Building2, Calendar, Mail, MapPin, Phone } from "lucide-react";

import Button from "@/components/Common/Button/Button";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const PopupModal = dynamic(
  () => import("react-calendly").then((module) => module.PopupModal),
  { ssr: false }
);

// Placeholder contact details — replace with Xvintec's real office address,
// phone number, and email before publishing.
const findUsDetails = [
  { icon: Building2, label: "Office address", value: "[Office address]" },
  { icon: Phone, label: "Phone / WhatsApp", value: "[Phone number]" },
  { icon: Mail, label: "Email us", value: "[Email address]" },
];

const ContactDetails = ({ rootElementRef }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div
      className={`space-y-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      ref={sectionRef}
    >
      <div className="bg-white py-8 px-6 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2">
          <MapPin size={22} className="text-[#0325E1]" />
          <H2Heading>Find us</H2Heading>
        </div>
        <ul className="mt-5 space-y-5">
          {findUsDetails.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <detail.icon
                size={18}
                className="mt-0.5 shrink-0 text-[#0325E1]"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-p-grey">
                  {detail.label}
                </p>
                <p className="text-p-black font-medium mt-0.5">
                  {detail.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white py-8 px-6 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar size={22} className="text-[#0325E1]" />
          <H2Heading>Business hours</H2Heading>
        </div>
        <ul className="mt-5 space-y-3">
          <li className="flex items-center justify-between text-p-grey font-normal">
            <span>Monday – Friday</span>
            <span className="font-medium text-p-black">
              [Business hours]
            </span>
          </li>
          <li className="flex items-center justify-between text-p-grey font-normal">
            <span>Saturday &amp; Sunday</span>
            <span className="font-medium text-p-black">
              [Business hours]
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-white py-8 px-6 rounded-2xl border border-gray-100">
        <H2Heading>Book a free consultation</H2Heading>
        <p className="text-p-grey font-normal mt-3">
          A dedicated session with a member of our team. Completely free, no
          obligation.
        </p>

        <PopupModal
          url="https://calendly.com/xvintec-web/30min?hide_gdpr_banner=1"
          rootElement={rootElementRef?.current}
          onModalClose={() => setIsPopupOpen(false)}
          open={isPopupOpen}
        />

        <Button
          className="mt-5 w-full"
          onClick={() => setIsPopupOpen(true)}
        >
          Book my free session
        </Button>
      </div>
    </div>
  );
};

export default ContactDetails;
