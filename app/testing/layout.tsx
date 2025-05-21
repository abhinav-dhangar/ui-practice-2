import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "testing",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased font-sans`}>{children}</body>
    </html>
  );
}
