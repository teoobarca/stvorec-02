"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* <Navbar /> */}
      
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
              Terms of Service
            </h1>
            
            <div className="space-y-8 text-zinc-400 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">1. Introduction</h2>
                <p>
                  Welcome to willaireplace.you. By accessing our website, you agree to be bound by these Terms of Service.
                  If you do not agree to all the terms and conditions, then you may not access the service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">2. Use of AI Analysis</h2>
                <p>
                  Our services provide estimates and insights regarding the impact of Artificial Intelligence on various professions.
                  These are predictions based on current data and trends, and should not be taken as absolute guarantees of future events.
                  We encourage users to use this information as a tool for career planning rather than definitive advice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">3. User Data & Privacy</h2>
                <p>
                  We respect your privacy. Any data you input into our tools is processed securely. 
                  We do not sell your personal information to third parties. For more details, please refer to our Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">4. Disclaimer</h2>
                <p>
                  The content provided on willaireplace.you is for informational purposes only. 
                  We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">5. Modifications</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. 
                  It is your responsibility to check the Terms periodically for changes.
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
