import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import AboutSection from '../sections/AboutSection';

export default function AboutPage() {
    return (
        <PageTransitionWrapper title="About">
            <AboutSection />
        </PageTransitionWrapper>
    );
}
