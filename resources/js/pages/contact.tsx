import * as React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const contact = {
  phone: "(021) 22978900",
  email: "info@kristalin.co.id",
  location: "ESQ Leadership Centre - 165 Tower",
  address: "Menara 165 Lantai 21 A~C, Jl. TB Simatupang No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560"
};

export default function ContactPage() {
  const [alert, setAlert] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setTimeout(() => {
      setAlert({ type: 'success', message: 'Your inquiry has been submitted!' });
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex flex-col min-h-[calc(100vh-64px)]">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left: White Info Section */}
          <div className="w-full md:w-2/3 bg-white flex flex-col justify-center px-6 md:px-16 py-12 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 text-left"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-1">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Contact</span>{' '}
                <span className="text-gray-800">Us</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-black/90 font-medium mb-7 mt-0 text-left"
            >
              Find out more information about Kristalin Eka Lestari
            </motion.p>
            <div className="flex flex-col md:items-end w-full">
              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-2xl"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <AnimatePresence>
                  {alert && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-6 px-4 py-3 rounded-lg text-center font-semibold text-base shadow transition-all duration-300
                        ${alert.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}
                    >
                      {alert.message}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base text-gray-900 font-semibold">Full Name *</Label>
                    <Input id="name" name="name" type="text" required placeholder="Insert Name" className="bg-white mt-2 text-gray-900 placeholder:text-gray-500" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base text-gray-900 font-semibold">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="Insert Email" className="bg-white mt-2 text-gray-900 placeholder:text-gray-500" />
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="subject" className="text-base text-gray-900 font-semibold">Subject *</Label>
                  <select id="subject" name="subject" required className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300">
                    <option value="">Select Subject</option>
                    <option value="General">General</option>
                    <option value="Partnership">Partnership</option>
                    <option value="CSR">CSR</option>
                    <option value="Career">Career</option>
                  </select>
                </div>
                <div className="mt-6">
                  <Label htmlFor="attachment" className="text-base text-gray-900 font-semibold">Attachment</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                      className="block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                    />
                    {fileName && <span className="text-xs text-gray-700">{fileName}</span>}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Max. file 10MB (PDF, JPG, PPT)</div>
                </div>
                <div className="mt-6">
                  <Label htmlFor="inquiry" className="text-base text-gray-900 font-semibold">Inquiry *</Label>
                  <textarea id="inquiry" name="inquiry" required placeholder="Write your question here" rows={5} className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300" />
                </div>
                {/* Simulasi captcha */}
                <div className="mt-6 flex items-center">
                  <input type="checkbox" id="captcha" required className="mr-2" />
                  <label htmlFor="captcha" className="text-sm text-gray-900 font-medium">I'm not a robot</label>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-10 h-12 text-base font-bold bg-yellow-400 hover:bg-yellow-500 text-black rounded-md shadow transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? <span className="animate-pulse">Submitting...</span> : 'Submit Inquiry'}
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
          {/* Right: Image Panel */}
          <div className="w-full md:w-1/3 relative bg-black h-72 md:h-auto flex-shrink-0 overflow-hidden">
            <img 
              src="/menara165-sore.webp"
              alt="Menara 165"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Contact Info Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-700 tracking-[0.25em] mb-4">
              GET IN TOUCH
            </h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-12"></div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-800">
              Do Not Hesitate To Contact Us
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 0.7, 
                    ease: "easeInOut",
                    rotate: { duration: 0.7 }
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  transition: { duration: 0.4 }
                }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Phone</h4>
              <span className="text-gray-700 text-lg">{contact.phone}</span>
            </motion.div>

            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 0.7, 
                    ease: "easeInOut",
                    rotate: { duration: 0.7 }
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  transition: { duration: 0.4 }
                }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Email</h4>
              <a href={`mailto:${contact.email}`} className="text-yellow-600 hover:text-yellow-700 transition-colors text-lg">
                {contact.email}
              </a>
            </motion.div>

            {/* Address */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    duration: 0.7, 
                    ease: "easeInOut",
                    rotate: { duration: 0.7 }
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  transition: { duration: 0.4 }
                }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                  </svg>
                </div>
              </motion.div>
              <h4 className="text-2xl font-normal text-gray-800 mb-4">Address</h4>
              <div className="text-gray-700">
                <div className="font-semibold text-yellow-700 mb-2">{contact.location}</div>
                <div className="text-sm leading-relaxed">
                  {contact.address}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <Footer />  
    </div>
  );
} 