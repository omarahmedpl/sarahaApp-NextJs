import "./globals.css";
import "./globals.scss";
import Footer from "./ui/footer/Footer";
import Navbar from "./ui/navbar/Navbar";
import { cairo } from "./utils/fonts";
import { Toaster } from "react-hot-toast";
import SessionManager from "./utils/SessionManager";
import SubFooter from "./ui/SubFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Sarahah</title>
      <body className={`${cairo.className}  antialiased`}>
        <link rel="shortcut icon" href="/Logo.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <SessionManager>
          <Navbar />
          <div className="mt-[60px] pt-5">
            <Toaster position="bottom-center" />
            {children}
          </div>
          <SubFooter />
          <Footer />
        </SessionManager>
      </body>
    </html>
  );
}
