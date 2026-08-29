import { ServicesData } from "@/data/ServicesData";

import IndividualService from "./IndividualService";

// A static export needs every service page enumerated up front.
export function generateStaticParams() {
  return ServicesData.map((service: any) => ({ services: service.link }));
}

const Page = async ({
  params,
}: {
  params: Promise<{ services: string }>;
}) => {
  const { services } = await params;
  const selectedService =
    ServicesData.find((item: any) => item.link === services) ?? null;

  return <>{selectedService && <IndividualService data={selectedService} />}</>;
};

export default Page;
