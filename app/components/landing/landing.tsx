'use client'

import { Layout } from './layout'

import ScrollAnimatedBackground from "./scroll-animation/scroll-animation";
import HeroSection from "@/sections/hero/hero";
import AboutUs from "@/sections/about-us/about-us";
import AboutApacha from "@/sections/about-apacha/about-apacha";
import ContactUs from "@/sections/contact-us/contact-us";
import OurServices from "@/sections/our-services/our-services";

export default function Landing() {
  return (
    <Layout>
      <HeroSection />
      <ScrollAnimatedBackground imageSrc="/background-mid-section.png" imageAlt="background-mid-section">
          <OurServices />
          <AboutUs />
          <AboutApacha />
      </ScrollAnimatedBackground>
    </Layout>
  )
}