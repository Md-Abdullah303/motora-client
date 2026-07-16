import { Car, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Safety", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  marketplace: [
    { label: "Browse Cars", href: "#" },
    { label: "Sell Your Car", href: "#" },
    { label: "Dealer Login", href: "#" },
    { label: "Mobile App", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-[#00D2FF]" />
              <span className="text-xl font-bold tracking-widest text-white">
                MOTO<span className="text-[#00D2FF]">RA</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
              The AI-powered car marketplace that learns your preferences and
              finds your perfect match. Smart search, instant matches, zero
              hassle.
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                123 Innovation Drive, San Francisco, CA 94105
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                hello@motora.ai
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Marketplace
            </h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Motora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-[#00D2FF]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-[#00D2FF]"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-[#00D2FF]"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
