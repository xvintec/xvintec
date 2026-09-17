"use client";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const trustedPartners = [
  { name: "3CX", image: "/partners/logos/3cx.png" },
  { name: "Aruba Networks", image: "/partners/logos/aruba-networks.svg" },
  { name: "AWS", image: "/partners/logos/aws.svg" },
  { name: "Bitdefender", image: "/partners/logos/bitdefender.svg" },
  { name: "Cisco", image: "/partners/logos/cisco.svg" },
  { name: "Cloudflare", image: "/partners/logos/cloudflare.svg" },
  { name: "CrowdStrike", image: "/partners/logos/crowdstrike.svg" },
  { name: "Dell", image: "/partners/logos/dell.svg" },
  { name: "DigitalOcean", image: "/partners/logos/digitalocean.svg" },
  { name: "Fortinet", image: "/partners/logos/fortinet.svg" },
  { name: "Lenovo", image: "/partners/logos/lenovo.svg" },
  { name: "Microsoft", image: "/partners/logos/microsoft.svg" },
  { name: "Sophos", image: "/partners/logos/sophos.svg" },
  { name: "Ubiquiti", image: "/partners/logos/ubiquiti.png" },
  { name: "Veeam", image: "/partners/logos/veeam.svg" },
  { name: "Zoho", image: "/partners/logos/zoho.svg" },
];

const TrustedByEnterprises = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Technology We Work With
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Enterprise platforms. Proven technologies. Solutions built around
          your business.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {trustedPartners.map((partner, index) => (
          <div
            key={index}
            className={`flex h-24 w-[calc(50%-8px)] items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(16.666%-14px)] ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            <Image
              src={partner.image}
              alt={partner.name}
              width={120}
              height={40}
              className="m-auto h-auto max-h-10 w-auto max-w-full grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedByEnterprises;
