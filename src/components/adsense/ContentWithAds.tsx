"use client";

import React, { useMemo } from 'react';
import InContentAd from '@/components/adsense/InContentAd';
import AD_SLOTS from '@/config/adSlots';

interface ContentWithAdsProps {
    content: string;
}

export default function ContentWithAds({ content }: ContentWithAdsProps) {
    const parts = useMemo(() => {
        // Split the content into roughly two halves based on paragraph endings
        // This looks for </p> and safely splits the HTML string
        const paragraphs = content.split('</p>');

        // If the article is very short, do not inject an ad in the middle
        if (paragraphs.length <= 3) {
            return [content];
        }

        const middleIndex = Math.floor(paragraphs.length / 2);

        // Reconstruct the halves, ensuring </p> is appended back where it was removed
        const firstHalf = paragraphs.slice(0, middleIndex).join('</p>') + '</p>';
        const secondHalf = paragraphs.slice(middleIndex).join('</p>');

        return [firstHalf, secondHalf];
    }, [content]);

    if (parts.length === 1) {
        return <div dangerouslySetInnerHTML={{ __html: parts[0] }} />;
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
            <div className="my-10 border-y border-dashed border-slate-200 dark:border-slate-800 py-6">
                <InContentAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
        </>
    );
}
