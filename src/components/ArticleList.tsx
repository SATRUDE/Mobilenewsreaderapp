import { ArticleCard } from "./ArticleCard";

interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  content?: string;
}

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
  onArchive: (id: string) => void;
  onFavorite: (id: string) => void;
  onArticleClick: (article: Article) => void;
  archivedArticles: Set<string>;
  favoritedArticles: Set<string>;
}

export function ArticleList({ 
  articles, 
  loading, 
  onArchive, 
  onFavorite, 
  onArticleClick,
  archivedArticles, 
  favoritedArticles 
}: ArticleListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="flex gap-2 mb-2">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            <div className="h-5 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-1"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-24"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-muted-foreground">No articles found. Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article}
          onArchive={onArchive}
          onFavorite={onFavorite}
          onArticleClick={onArticleClick}
          isArchived={archivedArticles.has(article.id)}
          isFavorited={favoritedArticles.has(article.id)}
        />
      ))}
    </div>
  );
}