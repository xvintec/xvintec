import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
  scrolled?: boolean;
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
          className={`text-h1-black transition-colors hover:text-[#0325E1] ${props.linkClassNames} border-[#CDD9E0] border-b-[1px] md:border-0 ${pathname == link.link ? " font-semibold" : "font-medium"}`}
          href={link.link}
          onClick={props.onLinkClick}
        >
          <li>{link.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export default Menu;
