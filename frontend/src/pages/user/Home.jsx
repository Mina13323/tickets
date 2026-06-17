import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StoryIntro from '@/components/home/StoryIntro';
import CategoriesSection from '@/components/home/CategoriesSection';
import TrendingExperiences from '@/components/home/TrendingExperiences';
import LegendaryVenues from '@/components/home/LegendaryVenues';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import ExperienceMap from '@/components/home/ExperienceMap';
import CuratedCollections from '@/components/home/CuratedCollections';
import FeaturedOrganizers from '@/components/home/FeaturedOrganizers';

export default function Home() {
  return (
    <div className="w-full bg-[#0a0a0a] relative">
      <HeroSection />
      <StoryIntro />
      <TrendingExperiences />
      <CuratedCollections />
      <LegendaryVenues />
      <CategoriesSection />
      <FeaturedEvents />
      <FeaturedOrganizers />
      <ExperienceMap />
    </div>
  );
}
