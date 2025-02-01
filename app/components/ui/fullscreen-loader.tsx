'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}