// app/ui/shared/Footer.tsx
import React from "react";
import Link from "next/link"; // Use Link if these should be internal links

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-black py-4 px-4 text-lg text-gray-600">
        <div className="flex gap-4">
          <div className="w-[240px] text-white">
            <h2 className="text-white font-bold text-lg mb-2">About Us</h2>
            <ul>
              <li><Link href="/about/learn-more">Learn More About Us</Link></li> {/* Example using Link */}
              <li><Link href="/about/team">About Our Team</Link></li>
              <li><Link href="/about/technology">Our Technology</Link></li>
            </ul>
          </div>
          <div className="w-[240px] text-white">
            <h2 className="text-white font-bold text-lg mb-2">Support</h2>
            <ul>
              <li><Link href="/support/contact">Contact Us</Link></li>
              <li><Link href="/support/faq">FAQ</Link></li>
              <li><Link href="/support/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="w-[240px] text-white">
            <h2 className="text-white font-bold text-lg mb-2">Legal</h2>
            <ul>
              <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link href="/legal/cookie">Cookie Policy</Link></li>
              <li><Link href="/legal/documents">Legal Documents</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <ul className="flex gap-2 my-4 text-white"> {/* Added text-white here */}
            <li>
              <a
                href="https://www.facebook.com/link-anda" // Replace with your actual links
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-facebook-box-line"></i>
              </a>
            </li>
            <li>
              <a
                 href="https://www.instagram.com/link-anda" // Replace with your actual links
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </li>
            <li>
              <a
                 href="https://www.linkedin.com/company/link-anda" // Replace with your actual links
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-linkedin-box-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <p className="text-center mb-2">Voyage 2025. All rights reserved.</p>
        &#169;
        <p className="text-center">2025 Voyage.</p>
      </div>
    </footer>
  );
};

export default Footer;