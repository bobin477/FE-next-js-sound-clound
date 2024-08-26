import ThemeRegistry from '@/components/theme-registry/theme.registry';
import AppHeader from "@/components/header/AppHeader";
import Footer from '@/components/footer/Footer';
import NextAuthWrapper from './lib/next.auth.wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <NextAuthWrapper>
                        <AppHeader />
                        {children}
                        <Footer />
                    </NextAuthWrapper>


                </ThemeRegistry>
            </body>
        </html>
    );
}
