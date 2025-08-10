export default function Footer() {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Teddy Yiu. All rights reserved.
      </div>
    </footer>
  );
}
