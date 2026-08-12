import React from "react";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: { label: string; href: string }[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  dateLabel?: string;
  sections: LegalSection[];
};

const LegalPage = ({ title, intro, dateLabel, sections }: LegalPageProps) => {
  return (
    <main className="pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="fl-container">
        <header className="max-w-4xl border-b border-[#D9D9D9] pb-10 md:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[#005CC7]">
            Xvintec policies
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight text-[#111111] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-[#414141]">
            {intro}
          </p>
          <p className="mt-8 text-sm font-light text-[#686868]">
            {dateLabel ?? "Last updated: July 23, 2026"}
          </p>
        </header>

        <div className="max-w-4xl pt-10 md:pt-14">
          {sections.map((section) => (
            <section key={section.title} className="mb-10 last:mb-0 md:mb-14">
              <h2 className="mb-4 text-2xl font-medium text-[#111111] md:text-3xl">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 text-base font-light leading-8 text-[#414141] last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-base font-light leading-8 text-[#414141]">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.links?.map((link) => (
                <p
                  key={link.href}
                  className="mb-2 text-base font-light leading-8 text-[#414141] last:mb-0"
                >
                  <a
                    href={link.href}
                    className="text-[#005CC7] underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;
