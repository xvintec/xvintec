"use client";

import { type ReactNode, useId, useState } from "react";

import { Plus } from "lucide-react";

type FaqItem = { question: string; answer: ReactNode };

// Native <details> snaps open and shut, so this animates the panel height with
// a grid-rows 0fr -> 1fr transition instead. Answers stay in the DOM (and in
// the server HTML) when collapsed, so they are still indexed.
const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="divide-y divide-[#E5E5E5] rounded-2xl border border-[#E5E5E5] bg-white">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-4 p-6 text-left text-lg font-medium text-[#111111]"
            >
              {item.question}
              <Plus
                size={20}
                aria-hidden
                className={`mt-1 shrink-0 text-[#005CC7] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : ""}`}
              />
            </button>

            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
