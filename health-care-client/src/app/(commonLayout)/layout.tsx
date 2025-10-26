//

import PublicNavbar from "@/components/shared/navbar/PublicNavbar";
import { iChildren } from "@/interfaces";

export default function CommonLayout({ children }: Readonly<iChildren>) {
  return (
    <div className="relative">
      <PublicNavbar />
      {children}
    </div>
  );
}
