import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="border-b border-border">
      <ScrollArea className="w-full">
        <div className="flex gap-1 px-4 py-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="whitespace-nowrap px-4 py-2 text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}