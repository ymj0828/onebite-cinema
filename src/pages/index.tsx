import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";

export default function Home() {}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

