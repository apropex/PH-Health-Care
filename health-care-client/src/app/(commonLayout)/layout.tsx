//

import PublicNavbar from "@/components/shared/navbar/PublicNavbar";
import { iChildren } from "@/interfaces";

export default function CommonLayout({ children }: Readonly<iChildren>) {
  return (
    <div>
      <PublicNavbar />
      {children}
    </div>
  );
}
