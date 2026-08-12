import { CompanyLogoType, ImageType } from "./CommonTypes";

export interface NavbarType {
  logo: CompanyLogoType;
  title: string;
  menuItems: MenuItemType[];
}

export interface MenuItemType {
  title: string;
  link: string;
  active?: boolean | undefined;
}
