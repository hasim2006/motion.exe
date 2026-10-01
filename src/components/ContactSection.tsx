"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, AlertCircle } from "lucide-react";

// Security Sanitization to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", botField: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Bot honeypot check
    if (formData.botField) {
      // Quietly ignore bot submissions
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanMessage = sanitizeInput(formData.message);

    // Form input validation
    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Please enter a valid full name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setErrorMessage("Message inquiry must be at least 10 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="relative w-full py-28 px-4 md:px-8 overflow-hidden border-t border-black/10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 rounded-full border border-[#FF6000]/30 bg-orange-50 px-4 py-1.5 backdrop-blur-md mb-4">
            <Mail className="h-4 w-4 text-[#FF6000] animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6000] font-bold">
              DISTRIBUTION & PARTNERSHIPS
            </span>
          </div>

          <h2 id="contact-heading" className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-black">
            GET IN <span className="text-[#FF6000]">TOUCH</span>
          </h2>
          <p className="mt-3 font-sans text-sm md:text-base text-zinc-600 font-medium max-w-lg">
            Inquire for global wholesale allocation, DAO collaborations, or press opportunities.
          </p>
        </div>

        <div className="glass-card-light rounded-3xl p-8 md:p-12 relative border border-black/10 shadow-lg bg-white">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-12"
              role="alert"
            >
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6000] mb-6">
                <CheckCircle2 className="h-10 w-10 animate-bounce" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-bold text-black uppercase mb-2">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-sans text-sm text-zinc-600 max-w-md mb-6 font-medium">
                Thank you for connecting with Hydroflow. Our protocol team will respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", message: "", botField: "" });
                  setErrorMessage("");
                }}
                className="font-mono text-xs uppercase text-[#FF6000] font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-[#FF6000]"
              >
                [ SEND ANOTHER INQUIRY ]
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Security Honeypot Bot Field (Hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="botField"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botField}
                  onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-600 border border-red-200" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    maxLength={100}
                    aria-label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="peer w-full rounded-2xl border border-black/10 bg-zinc-50 px-4 pt-6 pb-2 font-sans text-sm text-black placeholder-transparent focus:border-[#FF6000] focus:bg-white focus:outline-none transition-all font-medium"
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#FF6000] font-semibold"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    maxLength={120}
                    aria-label="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer w-full rounded-2xl border border-black/10 bg-zinc-50 px-4 pt-6 pb-2 font-sans text-sm text-black placeholder-transparent focus:border-[#FF6000] focus:bg-white focus:outline-none transition-all font-medium"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#FF6000] font-semibold"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  id="message"
                  required
                  maxLength={1000}
                  aria-label="Your Inquiry or Allocation Request"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="peer w-full rounded-2xl border border-black/10 bg-zinc-50 px-4 pt-6 pb-2 font-sans text-sm text-black placeholder-transparent focus:border-[#FF6000] focus:bg-white focus:outline-none transition-all resize-none font-medium"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#FF6000] font-semibold"
                >
                  Your Inquiry / Allocation Request
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                aria-label="Transmit Inquiry Form"
                data-cursor-text="TRANSMIT"
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#FF6000] hover:bg-[#e05400] py-4 font-display text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                {loading ? (
                  <span className="font-mono text-xs uppercase animate-pulse">
                    TRANSMITTING DATA...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>TRANSMIT INQUIRY</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
