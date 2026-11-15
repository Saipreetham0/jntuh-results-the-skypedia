import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { SubscriptionForm } from '@/components/features/result-alerts';

export const metadata: Metadata = generateMetadata({
  title: 'Result Alerts - Get Instant Notifications | JNTUH Results',
  description: 'Subscribe to JNTUH result alerts and get instant email notifications when results are declared. Never miss a result declaration again!',
  path: '/result-alerts',
  keywords: ['JNTUH result alerts', 'JNTUH notifications', 'result notification', 'email alerts', 'JNTUH updates'],
});

export default function ResultAlertsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <SubscriptionForm />
    </div>
  );
}
