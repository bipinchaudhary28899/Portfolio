"use client"

import { useState, useEffect } from "react"

export function useScrollspy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds.map((id) => ({
        id,
        element: document.querySelector(id),
      }))

      let currentSection: string | null = null

      sections.forEach(({ id, element }) => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          currentSection = id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds])

  return activeSection
}
