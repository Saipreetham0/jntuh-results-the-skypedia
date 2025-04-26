// "use client";

// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// interface AnnouncementBarProps {
//   message?: string;
//   link?: string;
//   bgColor?: string;
//   textColor?: string;
//   isDismissible?: boolean;
//   duration?: number | null;
// }

// const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
//   message = "🎉 Special announcement! Use code 'WELCOME10' for 10% off",
//   link = "#",
//   bgColor = "bg-indigo-600",
//   textColor = "text-white",
//   isDismissible = true,
//   duration = null, // Time in ms before auto-dismiss, null for no auto-dismiss
// }) => {
//   const [isVisible, setIsVisible] = useState<boolean>(true);

//   // Handle auto-dismiss if duration is provided
//   useEffect(() => {
//     if (duration && isVisible) {
//       const timer = setTimeout(() => {
//         setIsVisible(false);
//       }, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, isVisible]);

//   if (!isVisible) return null;

//   return (
//     <div className={`${bgColor} ${textColor} py-2 px-4 relative`}>
//       <div className="max-w-7xl mx-auto flex items-center justify-center text-sm font-medium">
//         {link ? (
//           <a
//             href={link}
//             className="flex-1 text-center inline-flex items-center justify-center hover:underline"
//           >
//             {message}
//           </a>
//         ) : (
//           <span className="flex-1 text-center">{message}</span>
//         )}

//         {isDismissible && (
//           <button
//             onClick={() => setIsVisible(false)}
//             className="p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
//             aria-label="Dismiss"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementBar;


"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  message?: string;
  link?: string;
  bgColor?: string;
  textColor?: string;
  isDismissible?: boolean;
  duration?: number | null;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "🎉 New features: Check your Backlogs and Consolidated Results now!",
  link = "/results",
  bgColor = "bg-green-600",
  textColor = "text-white",
  isDismissible = true,
  duration = null, // Time in ms before auto-dismiss, null for no auto-dismiss
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Handle auto-dismiss if duration is provided
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${bgColor} ${textColor} py-2 px-4 relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center text-sm font-medium">
        {link ? (
          <a
            href={link}
            className="flex-1 text-center inline-flex items-center justify-center hover:underline"
          >
            {message}
          </a>
        ) : (
          <span className="flex-1 text-center">{message}</span>
        )}

        {isDismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;