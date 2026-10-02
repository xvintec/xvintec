"use client";

import React, { useRef } from "react";

import ContactDetails from "@/components/ContactPage/ContactDetails/ContactDetails";
import ContactFAQ from "@/components/ContactPage/ContactFAQ/ContactFAQ";
import ContactForm from "@/components/ContactPage/ContactForm/ContactForm";
import IndividualServiceHeader from "@/components/Header/IndividualServiceHeader";

const ContactUs = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <IndividualServiceHeader
        title="Contact Us"
        subTitle="Let's power up your IT infrastructure"
        description="Our certified experts are ready to help you streamline IT, strengthen security, and scale with confidence. Book a free consultation or send us a message — whichever suits you."
        // Placeholder artwork — swap for a contact-specific image later.
        bannerImage="Consulting.png"
        rootElementRef={rootElementRef}
      />
      {/* Local top padding: the hero above has no bottom margin of its own. */}
      <div className="fl-container pt-20 md:pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ContactDetails rootElementRef={rootElementRef} />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>

      <ContactFAQ />
    </div>
  );
};

export default ContactUs;
