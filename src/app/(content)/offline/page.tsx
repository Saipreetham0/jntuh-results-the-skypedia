import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline | The Skypedia',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
        <p className="text-gray-600 dark:text-gray-400">Please check your internet connection</p>
      </div>
    </div>
  );
}
