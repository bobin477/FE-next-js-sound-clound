import ThemeRegistry from '@/components/theme-registry/theme.registry';
import AppHeader from "@/components/header/AppHeader";
import MainSlider from "@/components/main/MainSlider";
import { Container } from "@mui/system";
import Footer from '@/components/footer/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <AppHeader />
                    {children}
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
