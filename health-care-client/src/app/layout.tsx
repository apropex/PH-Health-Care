import getUser from "@/helper/getUser";
import { getCookie } from "@/hooks/getCookie";
import { iChildren } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import { UserProvider } from "@/Providers/UserProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PH-Health-Care",
  description: "A doctor and patient consultation website",
};

export default async function RootLayout({ children }: Readonly<iChildren>) {
  let initialUser: iUser | null = null;

  const { success, user } = await getUser(await getCookie());
  if (success) initialUser = user;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider initialUser={initialUser}>{children}</UserProvider>
      </body>
    </html>
  );
}
