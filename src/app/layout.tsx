import "./globals.css";
import MouseEffect from "@/components/layout/MouseEffect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MouseEffect />
        {children}
      </body>
    </html>
  );
}
