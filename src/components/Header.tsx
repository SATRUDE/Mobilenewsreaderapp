import { Search, Menu, RefreshCw, Archive, Heart, Rss, Users, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { useState } from "react";

type ViewType = "main" | "archive" | "favorites";

interface HeaderProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  onSync: () => void;
  isSyncing: boolean;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

export function Header({ onSearchChange, searchValue, onSync, isSyncing, onNavigate, currentView }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (item: string) => {
    setIsMenuOpen(false);
    
    switch (item) {
      case 'Archive':
        onNavigate('archive');
        break;
      case 'Favorites':
        onNavigate('favorites');
        break;
      case 'Feeds':
        onNavigate('main');
        break;
      case 'Sync All Feeds':
        onSync();
        break;
      default:
        console.log(`${item} clicked`);
        // Handle other menu items as needed
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Access main navigation options including feeds, following, emails, sync, and logout
              </SheetDescription>
              <div className="space-y-2 mt-8">
                <Button
                  onClick={() => handleMenuItemClick('Feeds')}
                  variant="ghost"
                  className={`w-full justify-start h-11 px-3 hover:bg-accent ${currentView === 'main' ? 'bg-accent' : ''}`}
                >
                  <Rss className="w-4 h-4 mr-2" />
                  Feeds
                </Button>
                
                <Button
                  onClick={() => handleMenuItemClick('Archive')}
                  variant="ghost"
                  className={`w-full justify-start h-11 px-3 hover:bg-accent ${currentView === 'archive' ? 'bg-accent' : ''}`}
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                
                <Button
                  onClick={() => handleMenuItemClick('Favorites')}
                  variant="ghost"
                  className={`w-full justify-start h-11 px-3 hover:bg-accent ${currentView === 'favorites' ? 'bg-accent' : ''}`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </Button>
                
                <div className="border-t border-border pt-2 mt-4">
                  <Button
                    onClick={() => handleMenuItemClick('Following')}
                    variant="ghost"
                    className="w-full justify-start h-11 px-3 hover:bg-accent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Following
                  </Button>
                  
                  <Button
                    onClick={() => handleMenuItemClick('Incoming Emails')}
                    variant="ghost"
                    className="w-full justify-start h-11 px-3 hover:bg-accent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Incoming Emails
                  </Button>
                  
                  <Button
                    onClick={() => handleMenuItemClick('Sync All Feeds')}
                    variant="ghost"
                    className="w-full justify-start h-11 px-3 hover:bg-accent"
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                    Sync All Feeds
                  </Button>
                </div>
                
                <div className="border-t border-border pt-2 mt-4">
                  <Button
                    onClick={() => handleMenuItemClick('Logout')}
                    variant="ghost"
                    className="w-full justify-start h-11 px-3 hover:bg-accent text-destructive hover:text-destructive"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl tracking-tight font-serif">NewsReader</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-0" 
            onClick={onSync}
            disabled={isSyncing}
          >
            <RefreshCw className={`h-6 w-6 ${isSyncing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-input-background border-0"
          />
        </div>
      </div>
    </header>
  );
}