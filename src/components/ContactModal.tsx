import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Send, X } from 'lucide-react';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSTAGRAM_HANDLE = '@arian.freelancer';
const INSTAGRAM_URL = 'https://www.instagram.com/arian.freelancer/';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('Full-Stack Coding');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyHandle = async () => {
    try {
      await navigator.clipboard.writeText(INSTAGRAM_HANDLE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[32px] border border-[#D7E2EA]/25 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2
                  id="contact-modal-title"
                  className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none"
                >
                  Let&apos;s Get Started
                </h2>
                <p className="text-sm text-[#D7E2EA]/65 mt-2">
                  Small to large projects · Coding, Website Design &amp; Automation.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contact dialog"
                className="w-11 h-11 rounded-full border border-[#D7E2EA]/25 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 rounded-2xl border border-[#D7E2EA]/15 bg-[#121316] mb-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wide text-[#D7E2EA] hover:underline truncate"
              >
                Instagram · {INSTAGRAM_HANDLE}
              </a>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-full border border-[#D7E2EA]/25 hover:bg-[#D7E2EA]/10 transition-colors whitespace-nowrap"
                >
                  DM on Instagram
                </a>
                <button
                  type="button"
                  onClick={handleCopyHandle}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-full border border-[#D7E2EA]/25 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Handle
                    </>
                  )}
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#D7E2EA]" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide">
                  Inquiry Sent
                </h3>
                <p className="text-sm text-[#D7E2EA]/70 max-w-sm leading-relaxed">
                  Thanks {name}. Your brief for {scope} has been noted and Arian
                  will follow up at {email} shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-2 rounded-full border-2 border-[#D7E2EA] px-8 py-2.5 text-sm uppercase tracking-widest font-medium hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Your Name
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#121316] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#D7E2EA]"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                    Email Address
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#121316] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#D7E2EA]"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                  Service Focus
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#121316] px-4 py-3 text-sm text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA]"
                  >
                    <option value="Full-Stack Coding">01 · Full-Stack Coding</option>
                    <option value="Website Design">02 · Website Design</option>
                    <option value="Automation">03 · Automation</option>
                    <option value="Small to Large Projects">04 · Small to Large Projects</option>
                    <option value="Tech Management">05 · Tech Management</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
                  Project Brief
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your timeline, aesthetic vision, and deliverables..."
                    className="w-full rounded-xl border border-[#D7E2EA]/20 bg-[#121316] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#D7E2EA] resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-white font-medium uppercase tracking-widest text-sm cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                    outline: '2px solid #FFFFFF',
                    outlineOffset: '-3px',
                  }}
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
