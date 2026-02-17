/**
 * Author Data Configuration
 * 
 * Centralized author information for blog posts and articles.
 * Update this file with your actual credentials and social links.
 */

export interface Author {
    name: string;
    role: string;
    bio: string;
    photo: string;
    credentials: string[];
    social: {
        linkedin?: string;
        twitter?: string;
        email?: string;
        website?: string;
    };
}

/**
 * Primary Author: Koyyala Sai Preetham
 * Founder of JNTUH Results - TheSkypedia
 */
export const saiPreetham: Author = {
    name: "Koyyala Sai Preetham",
    role: "Founder & Lead Developer",
    bio: "JNTUH alumnus passionate about helping students navigate academic challenges. Built the JNTUH Results platform serving 50,000+ students annually with instant result checking, accurate CGPA calculations, and comprehensive academic resources.",
    photo: "/images/authors/sai-preetham.jpg", // Add your photo here
    credentials: [
        "B.Tech in Computer Science, JNTUH",
        "Full-stack Developer & Founder of TheSkypedia",
        "Creator of JNTUH Results Platform (2020-present)",
        "Helped 50,000+ students track academic performance",
        "Expert in CGPA calculations and JNTUH result systems"
    ],
    social: {
        linkedin: "https://linkedin.com/in/koyyalasaipreetham", // Update with your LinkedIn
        twitter: "https://twitter.com/theskypedia",
        email: "info@theskypedia.com",
        website: "https://theskypedia.com"
    }
};

/**
 * Generic Team Author (for articles without specific author)
 */
export const theSkypediaTeam: Author = {
    name: "TheSkypedia Team",
    role: "Education Platform",
    bio: "Dedicated team of JNTUH alumni and educators committed to simplifying academic processes for students since 2020.",
    photo: "/images/authors/team-logo.png",
    credentials: [
        "Trusted by 50,000+ JNTUH students",
        "5+ years of academic guidance experience",
        "Official JNTUH data verification"
    ],
    social: {
        twitter: "https://twitter.com/theskypedia",
        email: "info@theskypedia.com",
        website: "https://theskypedia.com"
    }
};

/**
 * Default author (used when no specific author is provided)
 */
export const defaultAuthor = saiPreetham;

/**
 * Get author by name
 */
export function getAuthorByName(name: string): Author {
    const authors: Record<string, Author> = {
        'sai-preetham': saiPreetham,
        'team': theSkypediaTeam,
    };

    return authors[name] || defaultAuthor;
}

/**
 * Export all authors
 */
export const authors = {
    saiPreetham,
    theSkypediaTeam,
    defaultAuthor,
};
