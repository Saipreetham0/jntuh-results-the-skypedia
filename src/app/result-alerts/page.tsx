import { Metadata } from 'next';
import { SubscriptionForm } from '@/components/ResultAlerts';

export const metadata: Metadata = {
  title: 'Result Alerts - Get Instant Notifications | JNTUH Results',
  description: 'Subscribe to JNTUH result alerts and get instant email notifications when results are declared. Never miss a result declaration again!',
  keywords: ['JNTUH result alerts', 'JNTUH notifications', 'result notification', 'email alerts', 'JNTUH updates'],
  openGraph: {
    title: 'JNTUH Result Alerts - Never Miss a Result',
    description: 'Get instant notifications when JNTUH results are declared. Subscribe for free!',
    type: 'website',
  }
};

export default function ResultAlertsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <SubscriptionForm />
    </div>
  );
}
