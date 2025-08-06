export function Footer() {
    return (
      <footer className="py-4 px-6 border-t">
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ab Nahid Agency. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  