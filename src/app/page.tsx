"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

interface CursorPosition {
  x: number;
  y: number;
}

export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState<number>(0);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<"projects" | "contact" | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const roles: string[] = [
    "Fullstack Web Developer",
    "AI-Powered App Builder",
    "System-Level Programmer",
    "Productivity Tool Architect",
    "Streaming & Media Tech Engineer",
    "Tech Entrepreneur in Progress",
    "Creative App Designer",
    "Platform Integrator",
    "Code-First Problem Solver",
  ];

  // Preload animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => 
        prevIndex === roles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('loading');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'parmar2100parmar@gmail.com', // Your email address
          subject: `New message from ${formData.name} - Portfolio Contact Form`
        }),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden relative">
      {/* Optimized Custom cursor */}
      <motion.div 
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y,
          scale: 1.5,
          transition: { 
            type: "spring",
            damping: 1,
            stiffness: 10000,
            mass: 0.0005,
            restDelta: 0.00001,
            restSpeed: 0.00001
          }
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.1, 0],
              transition: {
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5
              }
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HiOutlineSparkles className="mr-2 text-yellow-300" />
            </motion.div>
            <span className="text-sm font-medium">Available for work</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Hi, I'm <motion.span 
              className="text-purple-300"
              animate={{ 
                textShadow: [
                  '0 0 8px rgba(192, 132, 252, 0)',
                  '0 0 12px rgba(192, 132, 252, 0.8)',
                  '0 0 8px rgba(192, 132, 252, 0)'
                ]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity 
              }}
            >
              Aditya Parmar
            </motion.span>
          </motion.h1>

          <div className="h-16 md:h-20 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: '0 0 6px rgba(255,255,255,0.2)'
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl md:text-4xl font-medium text-purple-100"
              >
                {roles[currentRoleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p 
            className="text-lg md:text-xl text-white/80 mt-8 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            I create beautiful, functional digital experiences with modern web technologies.
            Let's build something amazing together.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setActiveSection("projects")}
              className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg flex items-center justify-center gap-2 relative overflow-hidden"
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5 }
              }}
            >
              <span className="relative z-10">View my work</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FiArrowRight className="relative z-10" />
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.button>

            <motion.button
              onClick={() => setActiveSection("contact")}
              className="px-8 py-4 border border-white/30 font-semibold rounded-lg flex items-center justify-center gap-2 relative overflow-hidden"
              whileHover={{ 
                scale: 1.03,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.6 }
              }}
            >
              <span className="relative z-10">Contact me</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0"
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Projects Modal */}
      <AnimatePresence>
        {activeSection === "projects" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white/50 hover:text-white"
                onClick={() => setActiveSection(null)}
              >
                <FiX size={24} />
              </button>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-white">My Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Biz Vision",
                      description: "Professional business management system, MERN project.",
                      tags: ["React", "Node.js", "MongoDB", "MERN Stack"],
                      link: "https://adityaprmr.github.io/BizVision/"
                    },
                    {
                      title: "NewsHive",
                      description: "An innovative MERN stack web application designed to streamline live news reporting and publishing.",
                      tags: ["React", "Tailwind CSS", "Framer Motion", "Axios"],
                      link: "https://adityaprmr.github.io/NewsHive/"
                    },
                    {
                      title: "BookNexus",
                      description: "Online platform for managing, reviewing books.",
                      tags: ["ASP.NET Core", "C#", "SQL Server"],
                      link: "https://booknexus.onrender.com/"
                    },
                    {
                      title: "Emotion Recognition System",
                      description: "Detects human emotions using Image, Audio and Text.",
                      tags: ["Python", "OpenCV", "Deep Learning"],
                      link: "https://github.com/AdityaPrmr/Emotion-Recognition"
                    }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300"
                      >
                        View Project <FiArrowRight className="ml-1" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {activeSection === "contact" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setActiveSection(null);
              setFormStatus('idle');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white/50 hover:text-white"
                onClick={() => {
                  setActiveSection(null);
                  setFormStatus('idle');
                }}
              >
                <FiX size={24} />
              </button>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
                
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/50 border border-green-700 rounded-lg p-6 text-center"
                  >
                    <FiCheck className="mx-auto text-green-400 text-3xl mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-green-200">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center"
                  >
                    <FiAlertCircle className="mx-auto text-red-400 text-3xl mb-3" />
                    <h3 className="text-xl font-semibold text-white mb-2">Error Sending Message</h3>
                    <p className="text-red-200">Please try again later or contact me through social media.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none`}
                      />
                      {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none`}
                      />
                      {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none`}
                      ></textarea>
                      {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={`w-full ${formStatus === 'loading' ? 'bg-purple-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Or connect directly</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FiMail />, url: "mailto:parmar2100parmar@gmail.com" },
                      { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/adityaparmar-/" },
                      { icon: <FiGithub />, url: "https://github.com/AdityaPrmr" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-xl transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links */}
      <motion.div 
        className="fixed left-6 bottom-6 hidden md:flex flex-col gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { icon: <FiGithub />, url: "https://github.com/AdityaPrmr" },
          { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/adityaparmar-/" },
          { icon: <FiMail />, url: "mailto:parmar2100parmar@gmail.com" }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white text-xl transition-colors relative"
            whileHover={{ 
              y: -2,
              scale: 1.1,
              transition: { type: "spring", stiffness: 500 }
            }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed right-6 bottom-6 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span 
          className="text-xs text-white/50 rotate-90"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          SCROLL
        </motion.span>
        <div className="h-16 w-px bg-white/30 overflow-hidden relative">
          <motion.div
            animate={{ 
              y: [0, 16, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-8 w-px bg-gradient-to-b from-white to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}