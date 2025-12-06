"use client";

import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-zinc-300 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  1. Information Collection
                </h2>
                <p>
                  We collect information that you provide directly to us when
                  you use our job analysis tools. This may include your job
                  title, industry sector, and specific skills. We also collect
                  non-personal usage data through Google Analytics to improve
                  our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  2. Use of Information
                </h2>
                <p>
                  The data we collect is used solely for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                  <li>
                    To provide and generate personalized AI risk assessments;
                  </li>
                  <li>To improve the accuracy of our AI models;</li>
                  <li>To analyze usage trends and optimize user experience;</li>
                  <li>
                    To communicate with you regarding updates or service
                    changes.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  3. Data Security
                </h2>
                <p>
                  We implement standard industry security measures to protect
                  your data. However, no method of transmission over the
                  Internet is 100% secure. While we strive to use commercially
                  acceptable means to protect your personal information, we
                  cannot guarantee its absolute security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  4. Third-Party Services
                </h2>
                <p>
                  We may employ third-party companies and individuals to
                  facilitate our Service (e.g., Vercel for hosting, Google
                  Analytics). These third parties have access to your personal
                  information only to perform these tasks on our behalf and are
                  obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  5. Cookies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track the
                  activity on our Service and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  6. Compliance
                </h2>
                <p>
                  This policy complies with the General Data Protection
                  Regulation (GDPR) for users in the European Economic Area. You
                  have the right to access, rectify, or erase your personal data
                  at any time by contacting us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">
                  7. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  through the portfolio links provided in the footer.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
