import CustomButton from "@/components/buttons/CustomButton";
import { Card, CardContent } from "@/components/ui/card";
import { ContactIcon, HomeIcon, LogInIcon } from "lucide-react";
import Link from "next/link";

// Unauthorized / 401 page — responsive and polished using Tailwind + shadcn/ui
export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Visual / Branding */}
        <section className="relative order-2 lg:order-1">
          <div
            className="absolute -top-10 -left-10 w-48 h-48 rounded-2xl bg-linear-to-tr from-indigo-600/30 to-cyan-400/20 blur-3xl transform rotate-12"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -right-8 w-64 h-64 rounded-3xl bg-linear-to-tr from-rose-500/20 to-yellow-400/10 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-center">
            <Card className="bg-white/5 border border-white/6 shadow-2xl rounded-3xl p-6 md:p-10 backdrop-blur-sm">
              <CardContent>
                <div className="flex flex-col gap-6 md:gap-8 items-start md:items-center text-left md:text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-rose-400/10 to-indigo-400/10 border border-white/6 text-amber-500">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 9v4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17h.01"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        Unauthorized
                      </h1>
                      <p className="text-sm text-slate-300 mt-1">
                        You don&apos;t have permission to view this resource.
                      </p>
                    </div>
                  </div>

                  <p className="max-w-xl text-slate-300">
                    It looks like you tried to access a page that requires additional
                    privileges or authentication. If you believe this is an error, you can
                    request access from the site administrator or sign in with an account
                    that has the proper permissions.
                  </p>

                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                    <Link href="/login" className="flex-1">
                      <CustomButton icon={LogInIcon} className="w-full">
                        Login
                      </CustomButton>
                    </Link>

                    <Link href="/" className="flex-1">
                      <CustomButton icon={HomeIcon} variant="outline" className="w-full">
                        Go Home
                      </CustomButton>
                    </Link>

                    <a href="mailto:security@example.com" className="flex-1">
                      <CustomButton
                        icon={ContactIcon}
                        variant="outline"
                        className="w-full"
                      >
                        Contact to Support
                      </CustomButton>
                    </a>
                  </div>

                  <div className="w-full border-t border-white/6 pt-4 text-xs text-slate-400 flex flex-col sm:flex-row gap-2 justify-between items-center">
                    <span>
                      Attempted path:{" "}
                      <code className="bg-white/3 px-2 py-0.5 rounded text-xs">
                        /admin/dashboard
                      </code>
                    </span>
                    <span>
                      Ref:{" "}
                      <span className="font-medium">
                        Session expired or insufficient scope
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Right: Illustration & small helper cards */}
        <aside className="order-1 lg:order-2 flex flex-col gap-6">
          <div className="rounded-2xl p-6 md:p-8 bg-linear-to-b from-white/3 to-white/2 border border-white/4 shadow-lg backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 21h8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Why am I seeing this?</h2>
                <p className="mt-1 text-sm text-slate-300 max-w-md">
                  Common reasons: your session expired, you signed in with an account
                  without required roles, or you&apos;re trying to reach a protected area.
                  Use the buttons to sign in or contact support.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-white/3 border border-white/6">
              <h3 className="text-sm font-medium">Request access</h3>
              <p className="text-xs mt-2 text-slate-300">
                Send a request to the admin with details about why you need access and the
                resources you need.
              </p>
              <div className="mt-3">
                <a href="/request-access" className="text-sm underline">
                  Request access →
                </a>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-white/3 border border-white/6">
              <h3 className="text-sm font-medium">Troubleshooting</h3>
              <ul className="mt-2 text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Sign out and sign back in</li>
                <li>Clear site cookies</li>
                <li>Contact your team admin</li>
              </ul>
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-400">
            © {new Date().getFullYear()} Your Company —{" "}
            <a href="/status" className="underline">
              System status
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
