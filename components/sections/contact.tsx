"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-card/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-left duration-700">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-500/30 duration-200 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-500/30 duration-200 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-500/30 duration-200 resize-none text-sm sm:text-base"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-105 duration-300 text-sm sm:text-base"
              >
                Send Message
              </Button>

              {submitted && (
                <p className="text-center text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium animate-in fade-in duration-300">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
            </form>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in-right duration-700">
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold">Other Ways to Connect</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Feel free to reach out through any of these channels. I'm always happy to connect with fellow
                  developers and professionals.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    description: "bipin@example.com",
                    href: "mailto:bipin@example.com",
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    description: "Connect on LinkedIn",
                    href: "https://linkedin.com",
                  },
                  {
                    icon: Github,
                    title: "GitHub",
                    description: "View my repositories",
                    href: "https://github.com",
                  },
                ].map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-blue-500/50 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 transition-all hover:scale-105 hover:-translate-y-1 duration-300 group"
                  >
                    <contact.icon className="w-5 h-5 text-blue-500 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{contact.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-4 pt-8">
                {[
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Github, href: "https://github.com" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-blue-500/20 transition-all hover:scale-125 hover:-translate-y-1 duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
