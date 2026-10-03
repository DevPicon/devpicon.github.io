'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContentCardProps {
  type: 'video' | 'podcast' | 'blog';
  title: string;
  description: string;
  image?: string;
  url: string;
  date?: string;
}

export default function ContentCard({
  type,
  title,
  description,
  image,
  url,
  date,
}: ContentCardProps) {
  const t = useTranslations('home.latestContent');
  const labels = {
    video: t('video'),
    podcast: t('podcast'),
    blog: t('blog'),
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={'content-card content-card-' + type}
    >
      <div className="content-card-meta">
        <span className="content-card-type">{labels[type]}</span>
        <ExternalLink size={16} aria-hidden="true" />
      </div>

      {image && (
        <div className="content-card-image-wrap">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 680px) 90vw, (max-width: 1000px) 45vw, 24vw"
            unoptimized
            className="content-card-image"
          />
        </div>
      )}

      <h3 className="content-card-title">{title}</h3>
      <p className="content-card-description">{description}</p>
      {date && <p className="content-card-date">{date}</p>}
    </a>
  );
}
