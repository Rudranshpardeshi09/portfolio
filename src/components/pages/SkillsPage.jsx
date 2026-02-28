import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import SkillsSection from '../sections/SkillsSection';

export default function SkillsPage() {
    return (
        <div className="bg-transparent min-h-screen">
            <PageTransitionWrapper title="Skills">
                <SkillsSection />
            </PageTransitionWrapper>
        </div>
    );
}
