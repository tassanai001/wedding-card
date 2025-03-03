import "./globals.css";

export const metadata = {
  title: "Num & Art Wedding Invitation",
  description: "Wedding invitation for Num and Art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
