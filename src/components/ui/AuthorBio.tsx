import { Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import type { JSX } from 'react';
import ImageOptimized from './ImageOptimized';

interface AuthorBioProps {
    name: string;
    bio: string;
    role?: string;
    photo?: string;
    credentials?: string[];
    social?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
        website?: string;
    };
    compact?: boolean;
}

/**
 * AuthorBio Component
 * 
 * Displays author information for blog posts and articles.
 * Builds trust and authority (E-E-A-T) with credentials and social proof.
 * 
 * @example
 * ```tsx
 * <AuthorBio
 *   name="Dr. Rajesh Kumar"
 *   role="Education Consultant"
 *   bio="10+ years experience in JNTUH academic systems and student counseling."
 *   photo="/images/authors/rajesh.jpg"
 *   credentials={["PhD in Computer Science", "Former JNTUH Faculty"]}
 *   social={{
 *     linkedin: "https://linkedin.com/in/rajesh",
 *     email: "rajesh@theskypedia.com"
 *   }}
 * />
 * ```
 */
export default function AuthorBio({
    name,
    bio,
    role,
    photo,
    credentials,
    social,
    compact = false,
}: AuthorBioProps): JSX.Element {
    if (compact) {
        return (
            <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                {photo && (
                    <ImageOptimized
                        src={photo}
                        alt={name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                            {name}
                        </h4>
                        {role && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                • {role}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {bio}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Author Photo */}
                {photo && (
                    <div className="flex-shrink-0">
                        <ImageOptimized
                            src={photo}
                            alt={name}
                            width={120}
                            height={120}
                            className="rounded-full ring-4 ring-white dark:ring-gray-800"
                        />
                    </div>
                )}

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                    <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {name}
                        </h3>
                        {role && (
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {role}
                            </p>
                        )}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {bio}
                    </p>

                    {/* Credentials */}
                    {credentials && credentials.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                Credentials
                            </h4>
                            <ul className="space-y-1">
                                {credentials.map((credential, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                                    >
                                        <span className="mr-2 text-blue-500">•</span>
                                        {credential}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Social Links */}
                    {social && (
                        <div className="flex flex-wrap gap-3">
                            {social.linkedin && (
                                <a
                                    href={social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={`${name} on LinkedIn`}
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                    LinkedIn
                                </a>
                            )}
                            {social.twitter && (
                                <a
                                    href={social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={`${name} on Twitter`}
                                >
                                    <Twitter className="w-3.5 h-3.5" />
                                    Twitter
                                </a>
                            )}
                            {social.email && (
                                <a
                                    href={`mailto:${social.email}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={`Email ${name}`}
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </a>
                            )}
                            {social.website && (
                                <a
                                    href={social.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={`Visit ${name}'s website`}
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Website
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
