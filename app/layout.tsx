import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
