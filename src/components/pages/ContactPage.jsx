import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import ContactSection from '../sections/ContactSection';

export default function ContactPage() {
    return (
        <div className="bg-transparent min-h-screen">
            <PageTransitionWrapper title="Contact" isContact={true}>
                <ContactSection />
            </PageTransitionWrapper>
        </div>
    );
}
