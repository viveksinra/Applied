import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Applied View : Authenticated Ratings & Reviews for a better decision.",
  description: "Applied View provides you the original & authenticated Ratings & Reviews for any individual person or any organisation so that you can take a better decisions always. Check it out for FREE!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{fontFamily: "'San Francisco', sans-serif"}}>{children}</body>
    </html>
  );
}
