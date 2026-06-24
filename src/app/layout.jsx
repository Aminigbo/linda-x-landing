import "./globals.css";
import { getSiteUrl } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "LINDA SOMAIRI-STEWART",
    template: "%s | LINDA SOMAIRI-STEWART",
  },
  description:
    "Author of Tamara: The Gender of God, She Who Loved A Lie, and The Square of Lost Sons.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lusitana:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
