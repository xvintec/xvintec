import React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  isDark?: boolean;
  isOpen: boolean;
  scrolled: boolean;
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
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul
      className={`flex flex-row gap-16 ${props.className} ${props.isServiceMobileMenuOpen ? "hidden" : "block"}`}
    >
      {props.links.map((link, index) => (
        <Link
          key={index}
          className={`${props.isDark == true ? `${props.scrolled || props.isOpen ? "text-h1-black" : "text-white"}` : "text-h1-black"} transition-colors lg:hover:text-blue-600 ${props.linkClassNames} border-[#CDD9E0] border-b-[1px] md:border-0 ${pathname == link.link ? " font-semibold" : "font-normal"}`}
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
