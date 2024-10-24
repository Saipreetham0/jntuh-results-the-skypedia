// app/components/GoogleCalendarAuth.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GoogleAuthProps {
  onAuthComplete: (token: string) => void;
}

export function GoogleCalendarAuth({ onAuthComplete }: GoogleAuthProps) {
  const [authStatus, setAuthStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/google/url');
      const { url } = await response.json();

      const popup = window.open(
        url,
        'Google Calendar Authorization',
        'width=500,height=600,menubar=no'
      );

      window.addEventListener('message', async (event) => {
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const { token } = event.data;
          onAuthComplete(token);
          setAuthStatus('Successfully connected to Google Calendar');
          popup?.close();
        }
      });
    } catch (error) {
      setAuthStatus('Failed to connect to Google Calendar');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting...' : 'Connect Google Calendar'}
      </Button>
      {authStatus && (
        <Alert>
          <AlertDescription>{authStatus}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}