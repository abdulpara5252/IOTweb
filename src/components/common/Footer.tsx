import { Cpu, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-background text-card-foreground border-t">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Cpu className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">IOTech</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Revolutionizing the future, one device at a time.
          </p>
        </div>
        <div>
          <h3 className="font-headline text-lg font-medium mb-4">Site Map</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">Product</Link></li>
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg font-medium mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg font-medium mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IOTech. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
