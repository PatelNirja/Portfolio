import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, image, keywords }) {
  const defaultTitle = "Portfolio | Full Stack Engineer";
  const defaultDescription = "Professional Portfolio CMS showcasing fullstack web projects, skills, and experience.";
  const defaultImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

  const metaTitle = title ? `${title} | Portfolio` : defaultTitle;
  const metaDesc = description || defaultDescription;
  const metaImg = image || defaultImage;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImg} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImg} />
    </Helmet>
  );
}
