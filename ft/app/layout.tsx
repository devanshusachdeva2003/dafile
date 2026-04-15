import "./globals.css";
import Navbar from "../component/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

     <html lang="en">
      <body>
        <Navbar />   {/* ✅ Navbar here */}
        {children}
      </body>
</html>
 
  );
}