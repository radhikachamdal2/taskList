export const metadata = {
  title: "Task Dashboard",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
      <footer>
        <p>Task Dashboard is only used for demo purposes</p>
      </footer>
    </html>
  );
}
