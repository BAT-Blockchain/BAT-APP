import '@/src/app/styles/globals.css'
import { Providers } from '@/src/app/Providers'
import Navbar from '@/src/components/Navbar'
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}) {
    return (
        <html lang="en">
            <Providers>
                <body>
                    <Navbar>
                    </Navbar>
                    {children}
                </body>
            </Providers>
        </html>
    )
}