"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { ServicesData } from "@/data/ServicesData";

import IndividualService from "./IndividualService";

const Page = () => {
  const params = useParams<{ services: string }>();

  const selectedService = useMemo(
    () =>
      ServicesData.find((item: any) => item.link === params.services) ??
      null,
    [params.services]
  );

  return <>{selectedService && <IndividualService data={selectedService} />}</>;
};

export default Page;
