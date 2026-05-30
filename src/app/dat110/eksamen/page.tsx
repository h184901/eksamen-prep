import { getExamSummaries } from "@/lib/dat110-vault/loader";
import EksamenListingContent from "@/components/dat110/EksamenListingContent";

export const metadata = {
  title: "Eksamen — DAT110",
};

export default function EksamenPage() {
  return <EksamenListingContent exams={getExamSummaries()} />;
}
