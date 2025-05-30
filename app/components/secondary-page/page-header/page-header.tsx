import React from 'react'
import Image from 'next/image'

interface PageHeaderProps {
  title: string
  description: string
  imageSrc: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative h-64 md:h-96">
      <Image
        src={imageSrc}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-50"
      />
      <div className="px-6 absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-[16px] md:text-xl text-center max-w-4xl px-4">{description}</p>
      </div>
    </div>
  )
}

export default PageHeader