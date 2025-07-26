'use client'

import { useEffect } from 'react'

export function useSkillsAnimations() {
  useEffect(() => {
    // Simple animation controller
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0')
          entry.target.classList.add('opacity-100')
        }
      })
    }, { threshold: 0.1 })
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-scale-up')
    animatedElements.forEach(el => {
      observer.observe(el)
    })

    // Cleanup
    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el)
      })
    }
  }, [])
}
