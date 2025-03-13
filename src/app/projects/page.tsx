import Projects from "@/components/projects/Projects";
import { PageSearchParams } from "@/types/globals.types";

const Page = ({ searchParams }: PageSearchParams) => {
  const page = searchParams?.page ?? "1";

  return <Projects page={+page}/>;
};

export default Page;
