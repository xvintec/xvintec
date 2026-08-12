import { NavbarType } from "@/types/NavbarTypes";

export const NavbarData: NavbarType = {
  logo: {
    image: {
      url: "/logos/xvintec-logo.svg",
      alt: "Logo",
    },
    link: "/",
    size: "small",
  },
  title: "Xvintec",
  menuItems: [
    // {
    //   title: "Services",
    //   link: "/services",
    // },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Careers",
      link: "/careers",
    },
  ],
};
