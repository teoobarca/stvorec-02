"use client";

import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            
            <div className="space-y-8 text-text leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using willaireplace.you ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                  These terms apply to all visitors, users, and others who access the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">2. Use License</h2>
                <p>
                  Permission is granted to temporarily view the materials (information or software) on willaireplace.you for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose, or for any public display;</li>
                  <li>Attempt to decompile or reverse engineer any software contained on willaireplace.you;</li>
                  <li>Remove any copyright or other proprietary notations from the materials; or</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">3. Disclaimer of Accuracy</h2>
                <p>
                  The specific AI impact analysis and job market predictions provided by this Service are for informational and entertainment purposes only. 
                  While we utilize advanced data modeling and current market trends, the future of work is inherently unpredictable. 
                  We do not guarantee the accuracy, completeness, or usefulness of any information on the Service. 
                  Any reliance you place on such information is strictly at your own risk.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">4. User Contributions</h2>
                <p>
                  Users may post content, data, or feedback. By posting content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.
                  You retain any and all of your rights to any content you submit, post or display on or through the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">5. Limitations of Liability</h2>
                <p>
                  In no event shall willaireplace.you or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on willaireplace.you, even if willaireplace.you has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">6. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl text-white font-semibold">7. Contact Us</h2>
       <p>
  If you have any questions about these Terms, please contact us through the portfolio links provided in the footer.
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
