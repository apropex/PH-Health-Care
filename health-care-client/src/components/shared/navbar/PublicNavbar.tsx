//

import Link from "next/link";
import { MobileMenuLinks } from "./MobileMenuLinks";
import ProfileMenu from "./ProfileMenu";
import PublicNavLinks from "./PublicNavLinks";

export default function PublicNavbar() {
  return (
    <header className="w-full sticky top-4 px-4 z-50">
      <nav className="sticky top-0 w-full max-w-5xl mx-auto flex items-center justify-between bg-secondary/5 backdrop-blur rounded-full p-3 border">
        {/* Left Side */}
        <div>
          <Link
            href={"/"}
            className="text-base sm:text-xl font-bold text-primary whitespace-nowrap"
          >
            PH-Health-Care
          </Link>
        </div>

        {/* Middle */}
        <div className="hidden md:block">
          <PublicNavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ProfileMenu />

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <MobileMenuLinks />
          </div>
        </div>
      </nav>
    </header>
  );
}
