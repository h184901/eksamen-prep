import { getEgb339Course } from "@/lib/egb339-course-loader";
import Egb339CourseNavigation from "./Egb339CourseNavigation";
import { PilotBreadcrumb, PilotEntryNav, PilotSkipLink } from "./PilotNav";

export default function Egb339PilotShell({ children }: { children: React.ReactNode }) {
  return <div className="egb339-pilot">
    <PilotSkipLink />
    <Egb339CourseNavigation weeks={getEgb339Course()} />
    <div id="egb-lesson" tabIndex={-1} className="egb-pilot-content">{children}</div>
  </div>;
}

export { PilotBreadcrumb, PilotEntryNav };
