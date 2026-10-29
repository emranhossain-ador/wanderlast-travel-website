import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      <div className="mx-auto grid h-[78px] max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 lg:px-12">
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={
                link.active
                  ? "text-[15px] font-medium text-brand"
                  : "text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="col-start-2 flex items-center" aria-label="Wanderlast home">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-[22px] w-auto"
          />
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-7">
          <Link
            href="/profile"
            className="hidden items-center gap-2 text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand sm:flex"
          >
            <User className="size-4" strokeWidth={1.75} aria-hidden />
            Profile
          </Link>
          <Link
            href="/signin"
            className="hidden text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand sm:block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-[15px] font-medium text-neutral-900 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
