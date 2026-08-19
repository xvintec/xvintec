import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { ServicesData } from "@/data/ServicesData";
import { StackedMenuProps } from "@/types/CommonTypes";

const RECT_BUFFER = 12;

const StackedMenu = ({
  isOpen,
  onOpen,
  onClose,
  onLinkClick,
  lightMode,
  navHeight = 80,
}: StackedMenuProps) => {
  const [isHoverValue, setIsHoverValue] = useState<any>(ServicesData[0]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const isInsideRect = (rect: DOMRect | undefined, x: number, y: number) =>
      !!rect &&
      x >= rect.left - RECT_BUFFER &&
      x <= rect.right + RECT_BUFFER &&
      y >= rect.top - RECT_BUFFER &&
      y <= rect.bottom + RECT_BUFFER;

    // The header's own padding plus the panel's offset leave a strip under the
    // trigger that belongs to neither rect. Count it as part of the menu, so
    // travelling down into the panel never trips the close timer.
    const isInsideBridge = (
      trigger: DOMRect | undefined,
      panel: DOMRect | undefined,
      x: number,
      y: number
    ) =>
      !!trigger &&
      !!panel &&
      y >= trigger.bottom &&
      y <= panel.top + RECT_BUFFER &&
      x >= panel.left &&
      x <= panel.right;

    const handleMove = (e: MouseEvent) => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const panelRect = panelRef.current?.getBoundingClientRect();
      const inside =
        isInsideRect(triggerRect, e.clientX, e.clientY) ||
        isInsideRect(panelRect, e.clientX, e.clientY) ||
        isInsideBridge(triggerRect, panelRect, e.clientX, e.clientY);

      if (inside) {
        onOpen?.();
      } else {
        onClose?.();
      }
    };

    const handleWindowLeave = () => onClose?.();

    document.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
    };
  }, [isOpen, onOpen, onClose]);

  return (
    <div className="relative mr-8">
      <button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        onMouseEnter={onOpen}
        className={`group relative flex items-center gap-2 text-sm font-medium ${lightMode ? "text-white" : "text-h1-black"}`}
      >
        <span className="relative">
          Services
          <span
            className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${lightMode ? "bg-white" : "bg-[#0325E1]"}`}
          />
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`fixed left-0 z-10 w-screen justify-center px-4 ${isOpen ? "flex" : "hidden"}`}
        style={{ top: navHeight }}
      >
        <div
          ref={panelRef}
          className="mt-1 w-full max-w-[1200px] grid grid-cols-12 flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-xl ring-1 ring-black/5"
        >
          <Link
            href={"/services"}
            onClick={onLinkClick}
            className="group col-span-3 self-start rounded-xl p-6 transition-shadow duration-200 hover:bg-[#F5FBFF] hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-h1-black">Services</h3>
            <p className="mt-2 text-[#727272] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0325E1]">
              Learn more
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>

          <div className="col-span-6 border-x border-gray-100 p-6">
            <div className="text-[#A2A2A2] text-xs font-semibold tracking-wide uppercase pl-2 pb-2">
              All Services
            </div>
            <div className="grid grid-cols-2">
              {[0, 8].map((start) => (
                <div key={start} className="p-1">
                  {ServicesData.slice(start, start + 8).map((item) => (
                    <Link
                      key={item.title}
                      href={"/services/" + item.link}
                      className="group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-shadow duration-200 hover:bg-[#F5FBFF] hover:shadow-sm"
                      onMouseEnter={() => setIsHoverValue(item)}
                      onClick={onLinkClick}
                    >
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-[#A2A2A2] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0325E1]"
                      />
                      <span className="font-medium text-h1-black group-hover:text-[#0325E1] transition-colors">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <Link
              href={"/services"}
              onClick={onLinkClick}
              className="group mt-2 flex items-center justify-end gap-1 text-sm font-semibold text-[#0325E1]"
            >
              View all Services
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="col-span-3 bg-[#F5FBFF] p-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#0325E1] bg-white rounded-full px-2.5 py-1">
              Overview
            </span>
            <div className="mt-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image
                className="h-28 w-auto object-contain"
                src={`/services/img/banner-updated/${isHoverValue["bannerImage"]}`}
                width={200}
                height={200}
                alt="overview-icon"
              />
            </div>
            <div className="pt-4">
              <p className="min-h-[3rem] text-base font-semibold text-h1-black">
                {isHoverValue["title"]}
              </p>
              <p className="mt-1 min-h-[3.6em] pb-4 text-[#727272] max-lines">
                {isHoverValue["description"]}
              </p>
              <Link
                href={"/services/" + isHoverValue.link}
                onClick={onLinkClick}
                className="group inline-flex items-center gap-1 text-sm font-semibold text-[#0325E1]"
              >
                Learn more
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedMenu;
