import { ReactNode } from "react";

export interface ImageType {
  url: string;
  alt: string;
}

export interface LinkType {
  title: string;
  url: string;
}

export interface CompanyLogoType {
  image: ImageType;
  link: string;
  size?: "small" | "large" | undefined;
  className?: string;
  imageClassName?: string;
}

export interface ButtonProps {
  children: ReactNode;
  bgColor?: "btn-primary" | "btn-secondary";
  className?: string;
  onClick?: () => void;
}

export interface StackedMenuProps {
  isDark?: boolean;
  scrolled?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

export interface HeaderProps {
  roundedImage?: true | false | boolean;
  title: string;
  subtitle: string;
  buttonText?: string;
  contentMaxwidth?: string;
  className?: string;
  theme?: "LIGHT" | "DARK" | undefined;
  onClick?: () => void;
  rootElementRef: any;
}

export interface TrustedByOverProps {
  theme?: "LIGHT" | "DARK" | undefined;
}

export interface IndividualHeaderProps {
  title: string;
  subTitle: string;
  description: string;
  bannerImage: string;
  rootElementRef: any;
}
