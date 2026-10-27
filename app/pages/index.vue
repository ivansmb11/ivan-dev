<script setup>
import HeroSection from '@/components/HeroSection.vue'
import TrustedSection from '@/components/TrustedSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import TechTicker from '@/components/TechTicker.vue'
import CareerSection from '@/components/CareerSection.vue'
import PortfolioSection from '@/components/PortfolioSection.vue'
import AchievementsSection from '@/components/AchievementsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div>
    <main id="main" tabindex="-1" class="outline-none">
      <HeroSection />
      <TrustedSection />
      <AboutSection />
      <TechTicker />
      <CareerSection />
      <PortfolioSection />
      <AchievementsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>
