import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Archive, Heart, ExternalLink } from "lucide-react";

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

interface ArticleCardProps {
  article: Article;
  onArchive: (id: string) => void;
  onFavorite: (id: string) => void;
  onArticleClick: (article: Article) => void;
  isArchived: boolean;
  isFavorited: boolean;
}

export function ArticleCard({ article, onArchive, onFavorite, onArticleClick, isArchived, isFavorited }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const formatAddedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const handleArticleClick = () => {
    onArticleClick(article);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card className="p-4 border-0 border-b border-border rounded-none bg-transparent hover:bg-accent/20 transition-colors cursor-pointer">
      <div className="w-full" onClick={handleArticleClick}>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {article.source}
          </span>
        </div>
        
        <h3 className="leading-tight mb-2 line-clamp-3 font-serif">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Added {formatAddedDate(article.publishedAt)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onFavorite(article.id))}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <Heart 
                className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExternalLink}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleButtonClick(e, () => onArchive(article.id))}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <Archive 
                className={`h-4 w-4 ${isArchived ? 'fill-current text-primary' : 'text-muted-foreground'}`} 
              />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}