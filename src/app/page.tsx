import HeroSection from '@/components/home/HeroSection';
import MatchingSection from '@/components/home/MatchingSection';
import DatingSpaceSection from '@/components/home/DatingSpaceSection';
import SafetySection from '@/components/home/SafetySection';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <MatchingSection />
            <DatingSpaceSection />
            <SafetySection />
            <Footer />
        </main>
    );
}
