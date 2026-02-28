import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import ExperienceSection from '../sections/ExperienceSection';

export default function ExperiencePage() {
    return (
        <div className="bg-transparent min-h-screen">
            <PageTransitionWrapper title="Experience">
                <ExperienceSection />
            </PageTransitionWrapper>
        </div>
    );
}
