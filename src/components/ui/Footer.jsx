import DecryptText from '../reactbits/DecryptText';

export default function Footer() {
    return (
        <footer className="relative z-10 px-4 pb-12 pt-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Big Decrypted Text Footer */}
                <div className="text-center opacity-20 hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none">
                    <div className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap overflow-hidden">
                        <DecryptText text="RUDRANSH" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
