import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  lightMode?: boolean;
  isServiceMobileMenuOpen?: boolean;
  links: {
    title: string;
    link: string;
  }[];
  className?: string;
  linkClassNames?: string;
  isMobile?: boolean;
  onLinkClick?: () => void;
};

const Menu = (props: Props) => {
  const pathname = usePathname();

  return (
    <ul
      className={`flex flex-row gap-8 text-sm font-medium ${props.className} ${props.isServiceMobileMenuOpen ? "hidden" : "block"}`}
    >
      {props.links.map((link, index) => (
        <Link
          key={index}
          className={`group relative inline-block ${props.lightMode ? "text-white" : "text-h1-black"} ${props.linkClassNames} border-[#CDD9E0] border-b-[1px] md:border-0 ${pathname == link.link ? " font-semibold" : "font-medium"}`}
          href={link.link}
          onClick={props.onLinkClick}
        >
          <li>
            {link.title}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${props.lightMode ? "bg-white" : "bg-[#0325E1]"}`}
            />
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Menu;
