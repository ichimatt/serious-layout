import type { Metadata } from "next";
import type { ReactNode } from "react";
import { geograph } from "../fonts";
import "../globals.scss";

export const metadata: Metadata = {
  title: "Game",
};

export default function GameRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geograph.variable}>{children}</body>
    </html>
  );
}
