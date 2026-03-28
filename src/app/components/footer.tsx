import { Separator } from "@/components/ui/separator";
import { footerLinks } from "@/lib/data";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="max-w-sm">
            <Logo invert />
            <p className="mt-3 text-sm text-background/60">
              AI systems that replace manual work. Voice agents, workflow
              automation, internal tools. Built for your business, not
              off-the-shelf.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Portal</h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.portal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <Separator className="my-8 bg-background/10" />

        <p className="text-center text-sm text-background/40">
          &copy; {new Date().getFullYear()} Cogenly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
