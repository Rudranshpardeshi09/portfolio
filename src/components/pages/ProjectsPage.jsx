import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import ProjectsSection from '../sections/ProjectsSection';

export default function ProjectsPage() {
    return (
        <PageTransitionWrapper title="Projects">
            {/* Using min-h-[80vh] because 3D canvas needs height */}
            <div className="min-h-[80vh] relative pt-12">
                <ProjectsSection />
            </div>
        </PageTransitionWrapper>
    );
}
