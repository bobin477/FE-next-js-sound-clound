
import AppHeader from "@/components/header/AppHeader";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader />
            {children}
            <Footer />
        </>

    );
}
