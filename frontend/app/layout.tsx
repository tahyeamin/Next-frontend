import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>


        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <b>My Website</b>
        </nav>


        {children}

        <footer style={{ padding: "20px", textAlign: "center", borderTop: "1px solid #ccc" }}>
          <p style={{ margin: 0 }}>&copy; 2025 My Website</p>
        </footer>

      </body>
    </html>
  );
}