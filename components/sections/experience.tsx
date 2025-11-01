"use client"

const Experience = () => {
  const experiences = [
    {
      company: "SAP Labs India",
      position: "Full Stack Developer",
      period: "Aug 2024 – June 2025",
      description:
        "Architecting and developing cloud-based solutions using SAP HANA Cloud, Business Application Studio, and CAP. Implementing robust OData APIs and improving internal workflow systems.",
      tech: ["SAP HANA Cloud", "BAS", "CAP", "OData APIs", "Node.js"],
    },
    {
      company: "Nagarro",
      position: "Senior Software Engineer",
      period: "May 2021 – Sept 2023",
      description:
        "Led the development of high-performance Angular applications with 2M+ users. Optimized application performance, implemented CI/CD pipelines, and mentored junior developers.",
      tech: ["Angular", "TypeScript", "Performance Optimization", "CI/CD", "Mentoring"],
    },
  ]

  return (
    <section id="experience" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`relative pl-6 sm:pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-all duration-300 group animate-fade-in-left`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-500 rounded-full border-4 border-background group-hover:scale-125 transition-transform duration-300"></div>

                <div className="space-y-3 group-hover:translate-x-2 transition-transform duration-300">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">{exp.position}</h3>
                    <p className="text-blue-500 font-medium text-sm sm:text-base">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{exp.period}</p>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all hover:scale-110 duration-200"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
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

export default Experience
