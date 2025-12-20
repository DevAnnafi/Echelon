"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cookie Policy</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for various purposes, including:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website, allowing us to improve performance</li>
              <li><strong>Analytics Cookies:</strong> Track user behavior and engagement to help us improve our services</li>
              <li><strong>Preference Cookies:</strong> Remember your preferences and settings (such as theme selection)</li>
              <li><strong>Marketing Cookies:</strong> Used to track advertising effectiveness and user interests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Session Cookies</h3>
                <p>These cookies expire when you close your browser. They are used for authentication and maintaining your session.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Persistent Cookies</h3>
                <p>These cookies remain on your device for a set period. They help us remember your preferences and login information.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">First-Party Cookies</h3>
                <p>Set by Echelon directly to improve your experience and functionality.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              We may allow third-party service providers (such as analytics providers and advertising partners) to place cookies on your device. These third parties have their own privacy policies and cookie practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Cookie Management</h2>
            <p className="mb-4">You can control cookies through your browser settings. Most browsers allow you to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>View what cookies are set on your device</li>
              <li>Delete cookies individually or all at once</li>
              <li>Block certain websites from setting cookies</li>
              <li>Set your browser to ask for consent before setting cookies</li>
            </ul>
            <p className="mt-4 text-sm italic">
              Note: Disabling cookies may affect the functionality of our website and your user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Cookie Consent</h2>
            <p>
              When you first visit Echelon, we will request your consent to use non-essential cookies. You can update your cookie preferences at any time through your account settings or by clearing your browser cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Do Not Track</h2>
            <p>
              Some browsers include a "Do Not Track" feature. Currently, there is no industry standard for recognizing DNT signals. Echelon does not respond to DNT browser signals, but you can use other tools to control data collection and use as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Data Retention</h2>
            <p>
              We retain cookie data for as long as necessary to achieve the purposes outlined in this policy. Persistent cookies are typically retained for up to two years, unless you manually delete them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. International Users</h2>
            <p>
              If you are located in the European Union or other jurisdictions with cookie consent laws, we will request your explicit consent before setting non-essential cookies. You can withdraw consent at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you by updating the "Last updated" date of this policy.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions?</h2>
            <p>
              If you have questions about our Cookie Policy or our use of cookies, please contact us at{' '}
              <a href="mailto:islamannafi@gmail.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                islamannafi@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}