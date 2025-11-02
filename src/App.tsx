import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { CategoryNav } from "./components/CategoryNav";
import { DateNav } from "./components/DateNav";
import { ArticleList } from "./components/ArticleList";
import { ArticleReader } from "./components/ArticleReader";
import { Button } from "./components/ui/button";
import { Sparkles, ChevronDown, ChevronUp, CheckCheck, ArrowLeft } from "lucide-react";
import { mockArticles, categories } from "./data/mockArticles";

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

type ViewType = "main" | "archive" | "favorites";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("main");
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [archivedArticles, setArchivedArticles] = useState<Set<string>>(new Set());
  const [favoritedArticles, setFavoritedArticles] = useState<Set<string>>(new Set());
  const [aiSummaries, setAiSummaries] = useState<Map<string, string>>(new Map());
  const [generatingAiSummary, setGeneratingAiSummary] = useState<string | null>(null);
  const [expandedSummaries, setExpandedSummaries] = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleReaderOpen, setIsArticleReaderOpen] = useState(false);

  // Filter articles based on current view, search, category, and selected date
  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    // Filter by current view
    if (currentView === "archive") {
      filtered = filtered.filter(article => archivedArticles.has(article.id));
    } else if (currentView === "favorites") {
      filtered = filtered.filter(article => favoritedArticles.has(article.id));
    } else {
      // Main view - exclude archived articles
      filtered = filtered.filter(article => !archivedArticles.has(article.id));
      
      // Filter by selected date only in main view
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.publishedAt);
        const compareArticleDate = new Date(articleDate);
        const compareSelectedDate = new Date(selectedDate);
        
        compareArticleDate.setHours(0, 0, 0, 0);
        compareSelectedDate.setHours(0, 0, 0, 0);
        
        return compareArticleDate.getTime() === compareSelectedDate.getTime();
      });
    }

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Filter by search term
    if (searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [searchValue, activeCategory, selectedDate, currentView, archivedArticles, favoritedArticles]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchValue(""); // Clear search when changing category
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSearchValue(""); // Clear search when changing date
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSearchValue(""); // Clear search when navigating
    setActiveCategory("All"); // Reset category when navigating
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simulate sync delay - in real app this would fetch from RSS feeds/newsletters
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSyncing(false);
    
    // Here you would normally:
    // - Fetch new articles from RSS feeds
    // - Process email newsletters 
    // - Update the articles state
    // - Show success/error toast notification
  };

  const handleArchive = (articleId: string) => {
    setArchivedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleFavorite = (articleId: string) => {
    setFavoritedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const formatDateForHeading = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const compareDate = new Date(date);
    const compareToday = new Date(today);
    const compareYesterday = new Date(yesterday);
    
    compareDate.setHours(0, 0, 0, 0);
    compareToday.setHours(0, 0, 0, 0);
    compareYesterday.setHours(0, 0, 0, 0);
    
    if (compareDate.getTime() === compareToday.getTime()) {
      return "Today's News";
    } else if (compareDate.getTime() === compareYesterday.getTime()) {
      return "Yesterday's News";
    } else {
      return `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} News`;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "archive":
        return "Archived Articles";
      case "favorites":
        return "Favorite Articles";
      default:
        return activeCategory === "All" ? formatDateForHeading(selectedDate) : `${activeCategory} - ${formatDateForHeading(selectedDate)}`;
    }
  };

  const getDateKey = (date: Date) => {
    return date.toDateString();
  };

  const handleGenerateAiSummary = async () => {
    const dateKey = getDateKey(selectedDate);
    setGeneratingAiSummary(dateKey);

    // Get all articles for the selected date (not just filtered ones)
    const articlesForDate = mockArticles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      const compareArticleDate = new Date(articleDate);
      const compareSelectedDate = new Date(selectedDate);
      
      compareArticleDate.setHours(0, 0, 0, 0);
      compareSelectedDate.setHours(0, 0, 0, 0);
      
      return compareArticleDate.getTime() === compareSelectedDate.getTime();
    });

    // Simulate AI summary generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock summary based on articles
    const categories = [...new Set(articlesForDate.map(a => a.category))];
    const sources = [...new Set(articlesForDate.map(a => a.source))];
    
    const mockSummary = `Today's top stories span ${categories.length} key areas: ${categories.join(', ')}. 

${articlesForDate.length > 0 ? `**Technology & Business:** ${articlesForDate.filter(a => ['Technology', 'Business'].includes(a.category)).map(a => a.title.split(' ').slice(0, 6).join(' ')).slice(0, 2).join(' and ')}.` : ''}

${articlesForDate.filter(a => a.category === 'Politics').length > 0 ? `**Politics:** Major developments include ${articlesForDate.filter(a => a.category === 'Politics')[0]?.title.split(' ').slice(0, 8).join(' ')}.` : ''}

${articlesForDate.filter(a => ['Health', 'Science', 'Environment'].includes(a.category)).length > 0 ? `**Health & Science:** Breakthrough research shows ${articlesForDate.filter(a => ['Health', 'Science', 'Environment'].includes(a.category))[0]?.title.split(' ').slice(0, 6).join(' ')}.` : ''}

Coverage from ${sources.length} sources including ${sources.slice(0, 3).join(', ')}.`;

    setAiSummaries(prev => new Map(prev).set(dateKey, mockSummary));
    setGeneratingAiSummary(null);
  };

  const toggleSummaryExpansion = (dateKey: string) => {
    setExpandedSummaries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dateKey)) {
        newSet.delete(dateKey);
      } else {
        newSet.add(dateKey);
      }
      return newSet;
    });
  };

  const handleMarkAllAsRead = () => {
    // Get all currently visible (filtered) articles that aren't already archived
    const unreadArticles = filteredArticles.filter(article => !archivedArticles.has(article.id));
    
    // Add all unread articles to the archived set
    setArchivedArticles(prev => {
      const newSet = new Set(prev);
      unreadArticles.forEach(article => newSet.add(article.id));
      return newSet;
    });
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleReaderOpen(true);
  };

  const handleCloseArticleReader = () => {
    setIsArticleReaderOpen(false);
    setSelectedArticle(null);
  };

  const currentDateKey = getDateKey(selectedDate);
  const currentSummary = aiSummaries.get(currentDateKey);
  const isGenerating = generatingAiSummary === currentDateKey;
  const isExpanded = expandedSummaries.has(currentDateKey);
  
  // Check if there are any unarchived articles in the current filtered view
  const unreadArticles = filteredArticles.filter(article => !archivedArticles.has(article.id));
  const hasUnreadArticles = unreadArticles.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
        onSync={handleSync}
        isSyncing={isSyncing}
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      
      {currentView === "main" && (
        <>
          <CategoryNav 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <DateNav 
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </>
      )}

      <main className="pb-6">
        <div className="px-0">
          <div className="mb-4 px-4 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {currentView !== "main" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigate("main")}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <h2 className="text-lg font-serif">
                  {getViewTitle()}
                  {isSyncing && currentView === "main" && <span className="text-sm text-muted-foreground ml-2">Syncing...</span>}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredArticles.length} articles
                </span>
                
                {currentView === "main" && hasUnreadArticles && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="h-7 px-3 text-xs font-medium"
                  >
                    <CheckCheck className="w-3 h-3 mr-1" />
                    Mark All Read
                  </Button>
                )}
                
                {currentView === "main" && !currentSummary && !isGenerating && filteredArticles.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateAiSummary}
                    className="h-7 px-3 text-xs font-medium"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Summary
                  </Button>
                )}
              </div>
            </div>

            {/* AI Summary Section - only show in main view */}
            {currentView === "main" && (currentSummary || isGenerating) && (
              <div className="mb-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-serif font-medium">AI Summary</span>
                  </div>
                  {currentSummary && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSummaryExpansion(currentDateKey)}
                      className="h-6 w-6 p-0"
                    >
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
                  )}
                </div>
                
                {isGenerating ? (
                  <div className="text-sm text-muted-foreground">
                    Generating summary of today's articles...
                  </div>
                ) : currentSummary ? (
                  <div className="text-sm text-foreground">
                    {isExpanded ? (
                      <div className="whitespace-pre-line">{currentSummary}</div>
                    ) : (
                      <div>
                        {currentSummary.split('\n')[0]}
                        {currentSummary.length > 100 && <span className="text-muted-foreground ml-2">Click to expand...</span>}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
          
          <ArticleList 
            articles={filteredArticles} 
            loading={loading}
            onArchive={handleArchive}
            onFavorite={handleFavorite}
            onArticleClick={handleArticleClick}
            archivedArticles={archivedArticles}
            favoritedArticles={favoritedArticles}
          />
        </div>
      </main>
      
      <ArticleReader
        article={selectedArticle}
        isOpen={isArticleReaderOpen}
        onClose={handleCloseArticleReader}
        onArchive={handleArchive}
        onFavorite={handleFavorite}
        isArchived={selectedArticle ? archivedArticles.has(selectedArticle.id) : false}
        isFavorited={selectedArticle ? favoritedArticles.has(selectedArticle.id) : false}
      />
    </div>
  );
}