import localFont from "next/font/local";

export const geograph = localFont({
  src: [
    {
      path: "./font/test-geograph-vf-roman.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./font/test-geograph-vf-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-app",
  display: "swap",
});
