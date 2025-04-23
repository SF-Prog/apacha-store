'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ScrollAnimatedBackgroundProps {
  children: React.ReactNode
  imageSrc: string
  imageAlt: string
}

const ScrollAnimatedBackground: React.FC<ScrollAnimatedBackgroundProps> = ({ children, imageSrc, imageAlt }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, .7], [0, .7, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])
  const yPosition = useTransform(scrollYProgress, [0, 1], [0, containerHeight * 0.3])

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div
        className="absolute top-[-100px] inset-0 z-0"
        style={{ opacity, scale, y: yPosition }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ScrollAnimatedBackground