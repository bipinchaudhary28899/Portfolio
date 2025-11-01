"use client"

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-left duration-700">
              <p>
                I'm a Full Stack Developer with a Master's degree in Computer Science from IIIT Allahabad. I'm
                passionate about building scalable, high-performance web applications that solve real-world problems.
              </p>
              <p>
                With expertise in Angular, React, Node.js, and cloud technologies like AWS, I bridge the gap between
                beautiful user interfaces and robust backend systems. I love exploring new technologies and applying
                them to create innovative solutions.
              </p>
              <p>
                Currently, I'm working on cutting-edge cloud projects at SAP Labs, where I focus on HANA Cloud, Business
                Application Studio, and modern API architectures.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-background rounded-lg border border-border p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 animate-fade-in-right stagger-item-1">
                <h3 className="font-semibold mb-3">Education</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium">M.Tech in Computer Science</p>
                    <p className="text-muted-foreground">IIIT Allahabad</p>
                  </div>
                  <div>
                    <p className="font-medium">B.Tech in Computer Science</p>
                    <p className="text-muted-foreground">BIET Jhansi</p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg border border-border p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-105 transition-all duration-300 animate-fade-in-right stagger-item-2">
                <h3 className="font-semibold mb-3">Key Focus Areas</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Full-stack web development</li>
                  <li>• Cloud architecture & AWS</li>
                  <li>• Performance optimization</li>
                  <li>• Modern UI/UX design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
