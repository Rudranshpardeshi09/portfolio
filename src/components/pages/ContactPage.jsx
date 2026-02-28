import PageTransitionWrapper from '../ui/PageTransitionWrapper';
import ContactSection from '../sections/ContactSection';

export default function ContactPage() {
    return (
        <PageTransitionWrapper title="Contact" isContact={true}>
            <ContactSection />
        </PageTransitionWrapper>
    );
}
