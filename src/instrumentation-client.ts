/**
 * Client-side Instrumentation
 * 
 * Runs before the application's frontend code starts executing.
 * Ideal for global error tracking and setting up analytics.
 */

export function register() {
    if (typeof window !== 'undefined') {
        // Initialized signal for debugging in development
        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 Client instrumentation initialized');
        }

        // Set up global error tracking for professional monitoring
        window.addEventListener('error', (event) => {
            // Logic for reporting client-side errors to your backend or monitoring service
            // e.g., reportToSentry(event.error);

            if (process.env.NODE_ENV === 'development') {
                console.error('Captured Global Error:', event.error);
            }
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            if (process.env.NODE_ENV === 'development') {
                console.warn('Unhandled Promise Rejection:', event.reason);
            }
        });
    }
}
