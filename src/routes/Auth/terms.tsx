"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/Auth/terms")({
  component: Terms,
});

export default function Terms() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      heroImage="/headerphoto.jpg"
      heroAlt="Fashion hero"
    >
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold text-center mb-3">Terms &amp; Conditions</h1>

        <p>
          Welcome to <strong>Style-Spectrum</strong>! These Terms and Conditions
          describe the rules and regulations for using our website and services.
          By accessing this website you accept these Terms and Conditions in
          full. If you disagree with any part of these terms, please do not use
          our services.
        </p>
        <br />
        <h2 className="text-xl font-bold">1. Introduction</h2>
        <p>
          This website is operated by <strong>Style-Spectrum</strong>.
          Throughout the site, terms like “we”, “us”, and “our” refer to{" "}
          <strong>Style-Spectrum</strong>. By using this site you agree to
          comply with these Terms and Conditions.
        </p>
        <br />

        <h2 className="text-xl font-bold">2. Products &amp; Availability</h2>
        <p>
          We sell fashion items such as clothes, shoes, accessories, and related
          products. All product details, prices, and availability are subject to
          change without notice. We reserve the right to discontinue any product
          at any time.
        </p>
        <br />

        <h2 className="text-xl font-bold">3. Accounts</h2>
        <p>
          Some features require an account. You are responsible for keeping your
          login information secure. You must notify us immediately if you
          suspect unauthorized use of your account.
        </p>
        <br />

        <h2 className="text-xl font-bold">4. Orders and Payments</h2>
        <p>
          By placing an order, you make an offer to purchase a product subject
          to these Terms. Payments must be completed before orders are
          processed. We may refuse or cancel orders at our discretion.
        </p>
        <br />

        <h2 className="text-xl font-bold">5. Shipping &amp; Delivery</h2>
        <p>
          Delivery times vary by location and shipping option. We are not
          responsible for delays caused by carriers. Shipping costs will be
          shown at checkout.
        </p>
        <br />

        <h2 className="text-xl font-bold">6. Returns &amp; Refunds</h2>
        <p>
          Eligible returns are accepted within <strong>[X] days</strong> of
          delivery. Items must be unused and in original condition with proof of
          purchase. Refunds will be processed to the original payment method
          within a few business days once the return is accepted.
        </p>
        <br />

        <h2 className="text-xl font-bold">7. User Responsibilities</h2>
        <p>
          You agree not to misuse our website (e.g., hacking, spreading malware,
          or exploiting vulnerabilities). Use products lawfully and follow all
          provided product instructions.
        </p>
        <br />

        <h2 className="text-xl font-bold">8. Intellectual Property</h2>
        <p>
          All content on this website (images, text, logos, designs) is the
          property of <strong>Style-Spectrum</strong> unless otherwise noted.
          You may not copy or reuse our content without written permission.
        </p>
        <br />

        <h2 className="text-xl font-bold">9. Limitation of Liability</h2>
        <p>
          We will not be liable for any indirect or consequential loss arising
          from use of our website or products. Our maximum liability will not
          exceed the total price paid for the order in question.
        </p>
        <br />

        <h2 className="text-xl font-bold">10. Changes to Terms</h2>
        <p>
          We may update these Terms &amp; Conditions occasionally. Continued use
          of the site after changes means you accept the new terms.
        </p>
        <br />

        <h2 className="text-xl font-bold">11. Contact</h2>
        <p>
          If you have questions about these Terms &amp; Conditions, please
          contact us at:
        </p>
        <ul>
          <li className="mt-2 ">
            Email: <strong>support@stylespectrum.com</strong>
          </li>
          <li className="mt-2 ">
            Phone: <strong>+123 456 7890</strong>
          </li>
        </ul>
        <br />

        <div className="mt-6">
          <Link to="/" className="text-blue-600 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
