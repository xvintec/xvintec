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
  bgColor?: "btn-primary" | "btn-secondary" | "btn-outline-light";
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
}

export interface StackedMenuProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onLinkClick?: () => void;
  lightMode?: boolean;
  navHeight?: number;
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
