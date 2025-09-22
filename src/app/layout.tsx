import "./globals.css";

export const metadata = {
  title: "Travel Landing Page",
  description: "Explore destinations with our travel website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
