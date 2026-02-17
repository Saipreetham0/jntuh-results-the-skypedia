'use client';

interface VideoEmbedProps {
    videoId: string;
    title: string;
    platform?: 'youtube' | 'vimeo';
    aspectRatio?: '16:9' | '4:3' | '1:1';
    autoplay?: boolean;
    className?: string;
}

/**
 * VideoEmbed Component
 * 
 * Embeds YouTube/Vimeo videos with optimal settings for engagement.
 * 
 * Benefits from monetization blueprint:
 * - Videos increase time on page by 2-5 minutes
 * - 60-80% of users watch embedded videos
 * - Longer sessions = more ad impressions
 * 
 * Revenue Impact: +3-5 ad views per video watch
 * 
 * Best Practices:
 * - Place after explaining a concept
 * - Use as visual alternative to text
 * - Educational/tutorial content performs best
 */
export default function VideoEmbed({
    videoId,
    title,
    platform = 'youtube',
    aspectRatio = '16:9',
    autoplay = false,
    className = '',
}: VideoEmbedProps) {
    const aspectRatios = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
    };

    const embedUrls = {
        youtube: `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`,
        vimeo: `https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`,
    };

    return (
        <div className={`my-8 ${className}`}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div className={`relative ${aspectRatios[aspectRatio]} w-full bg-gray-900`}>
                    <iframe
                        src={embedUrls[platform]}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                </div>

                {/* Video Caption */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        📺 {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * VideoPlaylist - Multiple videos in carousel format
 */
export function VideoPlaylist({
    videos,
    title,
}: {
    videos: Array<{ id: string; title: string; thumbnail?: string }>;
    title: string;
}) {
    return (
        <div className="my-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                    >
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-gray-900">
                            {video.thumbnail ? (
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                            ) : (
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                    }}
                                />
                            )}

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {video.title}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
