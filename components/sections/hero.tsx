"use client"

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
                Bipin Kumar
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent animate-in fade-in duration-1000 delay-300">
                  Chaudhary
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-2 animate-in fade-in duration-1000 delay-500">
                Full Stack Developer | M.Tech CSE, IIIT Allahabad
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg animate-in fade-in duration-1000 delay-700">
                Building scalable web applications with modern JavaScript, cloud technologies, and a passion for clean
                code.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in duration-1000 delay-1000">
              <Button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Get In Touch
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-transparent hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                View My Work
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-8 animate-in fade-in duration-1000 delay-1200">
              {[
                { href: "https://github.com/bipinchaudhary28899", icon: Github },
                { href: "https://www.linkedin.com/in/bipin-chaudhary-39781b152/", icon: Linkedin },
                { href: "mailto:chaudhary.bipin@zohomail.com", icon: Mail },
              ].map((social, idx) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-3 rounded-full bg-muted hover:bg-accent hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right - Profile Photo */}
          <div className="hidden md:flex items-center justify-center animate-fade-in-right">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-2xl border border-border overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
                <Image
                  src="/bipin.jpeg"
                  alt="Bipin Kumar Chaudhary"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
