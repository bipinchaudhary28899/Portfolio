gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, TextPlugin);

const isWideScreen = window.innerWidth > 912;

if (isWideScreen) {
  // Horizontal skills scroll
  gsap.to(".horizontal-wrapper", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top top",
      end: () => `+=${window.innerWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // Experience panel horizontal scroll
  gsap.to(".exp-panel-container-wrapper", {
    xPercent: -66.67,
    ease: "none",
    scrollTrigger: {
      trigger: ".exp-horizontal-wrapper",
      start: "top top",
      end: () => `+=${window.innerWidth * 2}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // Scroll direction rotation for strolling image
  let lastScroll = 0;
  ScrollTrigger.create({
    trigger: ".skills-section",
    start: "top top",
    end: "+=100%",
    scrub: true,
    onUpdate: (self) => {
      const currentScroll = self.scroll();
      gsap.to("#strollingImage", {
        rotateY: currentScroll > lastScroll ? 0 : 180,
        duration: 0.3,
        ease: "power2.out"
      });
      lastScroll = currentScroll;
    }
  });

  // Zoom content effect
  gsap.to(".zoom-content", {
    scale: 2.4,
    scrollTrigger: {
      trigger: ".zoom-section",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });

  // Panel pinning + h1 move
  ScrollTrigger.create({
    trigger: "#panel1",
    start: "top top",
    pin: true,
    scrub: true,
    pinSpacing: false
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".panel2",
      start: "top 52%",
      end: "+=35%",
      scrub: true,
    }
  }).to("#panel1 h1", {
    y: -280,
    ease: "none"
  });

  // Panel3 pin
  ScrollTrigger.create({
    trigger: ".panel3",
    start: "top top",
    scrub: true,
    pin: true,
    pinSpacing: false
  });
}
// Typed text animation
const phrases = [
  { text: "Full Stack Developer", color: "#3b82f6" },
  { text: "Gamer", color: "#ef4444" },
  { text: "Learner", color: "#10b981" },
  { text: "Simple Guy !!", color: "#f59e0b" }
];

const typedText = document.getElementById("typed-text");
let phraseIndex = 0, charIndex = 0, deleting = false;

function type() {
  const { text, color } = phrases[phraseIndex];
  typedText.style.color = color;

  if (!deleting) {
    typedText.textContent = text.slice(0, charIndex++);
    if (charIndex > text.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typedText.textContent = text.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 50 : 100);
}
type();

// Skill hover random color
document.querySelectorAll(".skill").forEach(skill => {
  skill.addEventListener("mouseenter", () => {
    skill.style.color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  });
  skill.addEventListener("mouseleave", () => {
    skill.style.color = "";
  });
});

// Shared 'U' bounce
gsap.to(".shared-u", {
  y: -80,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  duration: 1
});

// Scramble Text (Work Experience Heading)
const originalText = "Here’s where I turned coffee into code.";
const scrambledText = "Work Experience!";

const scrambleTL = gsap.timeline({ repeat: -1, repeatDelay: 3 });

document.querySelector("#exp-heading h1").textContent = originalText;

scrambleTL
  .to("#exp-heading h1", {
    delay: 3,
    scrambleText: {
      text: scrambledText,
      chars: "upperAndLowerCase",
      revealDelay: 0.5,
      speed: 0.8
    },
    fontSize: isWideScreen? "5rem":"4rem",
    duration: 2,
    ease: "none"
  })
  .to("#exp-heading h1", {
    delay: 3,
    scrambleText: {
      text: originalText,
      chars: "upperAndLowerCase",
      revealDelay: 0.5,
      speed: 0.8
    },
    fontSize: "3rem",
    duration: 2,
    ease: "none"
  });

// Coffee text fade-up
gsap.to("#coffee_text span", {
  opacity: 1,
  y: 0,
  ease: "power2.out",
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#casual",
    start: "top 30%",
    end: "top top",
    scrub: true
  }
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // Desktop only
  "(min-width: 769px)": function () {
    gsap.to(".heading-mask-section", {
      backgroundPosition: "100% -200%",
      ease: "none",
      scrollTrigger: {
        trigger: ".heading-mask-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  },

  // Mobile fallback
  "(max-width: 768px)": function () {
    gsap.to(".shared-u", {
      y: -40,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.2
    });
  }
});

ScrollTrigger.matchMedia({
  // Desktop
  "(min-width: 768px)": function() {
    gsap.to(".text-content", {
      text: "I build cool stuff on the web — front to back, pixels to APIs.",
      scrollTrigger: {
        trigger: ".panel2",
        start: "top 50%", // trigger earlier for smoother feel
        end: "top top",     // more scroll distance
        scrub: true,
        pinSpacing: false
      },
      ease: "none"
    });
  },

  // Mobile
  "(max-width: 767px)": function() {
    // On mobile, don't scrub — just trigger once
    gsap.to(".text-content", {
      text: "I build cool stuff on the web — front to back, pixels to APIs.",
      scrollTrigger: {
        trigger: ".panel2",
        start: "top 80%",
        once: true // run only once
      },
      duration: 2
    });
  }
});