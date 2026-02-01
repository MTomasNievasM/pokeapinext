import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <LanguageProvider>
          <Header />
    
          <main className="flex-grow container mx-auto p-4 min-h-[80vh]">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}