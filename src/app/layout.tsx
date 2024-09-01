import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/app/lib/next.auth.wrapper';
import { ToastProvider } from '@/utils/toast/useToast';
import { TrackContextProvider } from './lib/trackWraper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <NextAuthWrapper>
                        <ToastProvider>
                            <TrackContextProvider>
                                {children}
                            </TrackContextProvider>
                        </ToastProvider>
                    </NextAuthWrapper>
                </ThemeRegistry>
            </body>
        </html>
    );
}
