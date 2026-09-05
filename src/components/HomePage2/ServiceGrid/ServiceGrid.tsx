"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import { CircularCarousel } from "@/components/ui/circular-carousel";

const serviceGridData = [
  {
    title: "Managed IT Services",
    tags: ["24/7 Monitoring", "Proactive Maintenance", "Help Desk"],
    description:
      "End-to-end management of your entire IT infrastructure — proactive monitoring, maintenance, and rapid issue resolution.",
  },
  {
    title: "Cybersecurity & Compliance",
    tags: ["SOC 2 Ready", "PIPEDA Compliant", "Threat Detection"],
    description:
      "SOC 2 audits, PIPEDA compliance, HIPAA readiness, threat detection, and email security tailored for regulated industries and data-sensitive organizations.",
  },
  {
    title: "Cloud & SaaS Integration",
    tags: ["Microsoft 365", "Multi-cloud", "Migration"],
    description:
      "Seamless cloud migrations, Microsoft 365 deployments, and multi-cloud strategy for growth-stage companies.",
  },
  {
    title: "Backup & Business Continuity",
    tags: ["Automated Backup", "99.9% Uptime", "DR Testing"],
    description:
      "Automated backups with 99.9% recovery guarantee. Never lose client data or accounting records again.",
  },
  {
    title: "Network & Infrastructure",
    tags: ["Secure Networks", "Remote Ready", "Scalable"],
    description:
      "Secure, scalable networks built for remote teams, high bandwidth demands, and growth without downtime.",
  },
  {
    title: "Business Apps & Integration",
    tags: ["Accounting Software", "ERP Systems", "API Integration"],
    description:
      "QuickBooks, Sage, Xero, CRM, ERP, and custom automation for businesses across finance, healthcare, retail, and operations.",
  },
  {
    title: "Unified Communications & VoIP",
    tags: ["25% Savings", "Unlimited Minutes", "Video Conference"],
    description:
      "Professional phone systems with 25% cost savings. Unlimited US & Canada minutes, video conferencing, and collaboration tools for distributed teams.",
  },
  {
    title: "IT Strategy & vCIO",
    tags: ["vCIO Services", "Tech Roadmap", "Vendor Mgmt"],
    description:
      "Strategic planning aligned with your growth. Vendor management, roadmapping, and technology decisions that scale.",
  },
  {
    title: "Expert Help Desk",
    tags: ["24/7 Support", "Remote Help", "Fast Response"],
    description:
      "Fast, knowledgeable support for your team—via phone, email, or chat. Avg response time: under 30 minutes.",
  },
  {
    title: "Custom Development",
    tags: ["Custom Code", "API Development", "Workflow Automation"],
    description:
      "Bespoke software solutions, API development, and integration workflows tailored to your specific business needs.",
  },
  {
    title: "AI Solutions as a Service",
    tags: ["Intelligent Automation", "Secure & Compliant", "Custom Integration"],
    description:
      "Put artificial intelligence to work without the guesswork. We design, deploy, and manage practical AI — from intelligent automation and document processing to AI-powered support, analytics, and workflow copilots — tailored to how your firm actually operates.",
  },
];

const serviceCarouselItems = serviceGridData.map((data, index) => ({
  id: String(index),
  title: data.title,
  description: data.description,
  tags: data.tags,
}));

const ServiceGrid = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      className="mb-20 md:mb-28 py-16 md:py-24"
      style={{ background: "var(--hero-gradient)" }}
      ref={sectionRef}
    >
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-16">
          <H1Heading
            className={`text-white ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            What We Do
          </H1Heading>
          <p
            className={`text-gray-400 font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Full-Spectrum IT Management. One partner. Every layer of your
            technology stack — from hardware to cloud to security.
          </p>
        </div>
        <div
          className={isVisible ? "animate-fade-up animate-delay-500" : "opacity-0"}
        >
          <CircularCarousel items={serviceCarouselItems} />
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
