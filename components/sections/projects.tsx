"use client"

import { ExternalLink, Github } from "lucide-react"
import { Button } from "../ui/button"

const Projects = () => {
  const projects = [
    {
      title: "StreamSphere",
      description:
        "A modern video streaming platform with real-time recommendations powered by NLP. Features include OAuth authentication, video uploads to AWS S3, and intelligent categorization.",
      tech: ["Angular", "Node.js", "MongoDB", "AWS S3", "Google OAuth", "NLP"],
      image: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Todlify",
      description:
        "A full-stack task management application with email reminders. Features smart task categorization, recurring tasks, and integration with Gmail for seamless workflow.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Nodemailer", "JWT Auth"],
      image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
  ]

  return (
    <section id="projects" className="py-16 md:py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`group relative bg-background rounded-lg border border-border overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${idx * 250}ms` }}
              >
                {/* Project Preview */}
                <div className={`h-32 sm:h-48 ${project.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-blue-500/20 transition-all hover:scale-110 duration-200"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-blue-500/10 bg-transparent text-xs sm:text-sm flex-1 sm:flex-none hover:scale-105 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-blue-500/10 bg-transparent text-xs sm:text-sm flex-1 sm:flex-none hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
