import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import contentData from "@/data/content.json";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  return `Hace ${Math.floor(diffDays / 30)} meses`;
}

export default function Home() {
  const { video, podcast, blog } = contentData.latestContent;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <Navbar />
      <HeroSection />

      {/* Latest Content Section */}
      <section id="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Último <span className="text-accent-blue">Contenido</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video Card */}
          <ContentCard
            type="video"
            title={video.title}
            description={video.description}
            url={video.url}
            date={formatDate(video.date)}
            image={video.image}
          />

          {/* Podcast Card */}
          <ContentCard
            type="podcast"
            title={podcast.title}
            description={podcast.description}
            url={podcast.url}
            date={formatDate(podcast.date)}
            image={podcast.image}
          />

          {/* Blog Card */}
          <ContentCard
            type="blog"
            title={blog.title}
            description={blog.description}
            url={blog.url}
            date={formatDate(blog.date)}
            image={blog.image}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
