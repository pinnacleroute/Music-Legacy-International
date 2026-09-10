import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://music-legacy-international.loyal-quail-3361.chatgpt.site'),
  title: 'Music Legacy International — Opportunity Meets Community',
  description: 'Build your network, discover music-industry opportunities, and move your career forward.',
  openGraph: {
    title: 'Music Legacy International — Opportunity Meets Community',
    description: 'Where music, opportunity, and community connect.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Legacy International — Opportunity Meets Community',
    description: 'Where music, opportunity, and community connect.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
