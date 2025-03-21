import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
}

export default function SEOHead({
  title = 'Soulevity Learning - Transform Your Learning Journey',
  description = 'Discover expert-led courses, join vibrant communities, and stay updated with cutting-edge research in one place with Soulevity Learning.',
  keywords = 'learning, education, courses, online learning, professional development, e-learning, skills development',
  ogImage = '/images/soulevity-og.png',
  canonicalUrl = 'https://soulevity.org',
  ogType = 'website',
}: SEOHeadProps) {
  const siteTitle = title.includes('Soulevity') ? title : `${title} | Soulevity Learning`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Soulevity Learning" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#000000" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
    </Helmet>
  );
} 