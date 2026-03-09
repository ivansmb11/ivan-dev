<script setup>
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import PortfolioSection from '@/components/PortfolioSection.vue'
import CareerSection from '@/components/CareerSection.vue'
import AchievementsSection from '@/components/AchievementsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import TechTicker from '@/components/TechTicker.vue'
</script>

<template>
  <main>
    <HeroSection />
    <TechTicker />
    <AboutSection />
    <CareerSection />
    <PortfolioSection />
    <AchievementsSection />
    <ContactSection />
    <FooterSection />
  </main>
</template>
