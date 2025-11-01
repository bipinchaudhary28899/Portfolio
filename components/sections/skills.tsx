"use client"

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Angular", "TypeScript", "Tailwind CSS", "Next.js", "GSAP"],
      color: "blue",
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "CAP", "OData APIs", "RESTful APIs", "Microservices"],
      color: "cyan",
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "SAP HANA", "Redis", "Firebase"],
      color: "purple",
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS S3", "AWS Lambda", "SAP Cloud", "Docker", "CI/CD", "GitHub Actions"],
      color: "green",
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "SAP BAS", "Postman", "VS Code", "Jira", "Linux"],
      color: "orange",
    },
    {
      category: "Other Technologies",
      skills: ["Google OAuth", "NLP", "Socket.io", "GraphQL", "JWT", "Testing"],
      color: "pink",
    },
  ]

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/20",
    purple:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20",
    green:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:border-green-500/50 hover:bg-green-500/20",
    orange:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/20",
    pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/20",
  }

  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">Skills & Technologies</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-4 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-all hover:scale-110 hover:-translate-y-1 duration-200 cursor-default ${colorMap[cat.color]}`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
