import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateNavProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateNav({ selectedDate, onDateChange }: DateNavProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset time to compare just dates
    const compareDate = new Date(date);
    const compareToday = new Date(today);
    const compareYesterday = new Date(yesterday);
    
    compareDate.setHours(0, 0, 0, 0);
    compareToday.setHours(0, 0, 0, 0);
    compareYesterday.setHours(0, 0, 0, 0);
    
    if (compareDate.getTime() === compareToday.getTime()) {
      return "Today";
    } else if (compareDate.getTime() === compareYesterday.getTime()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const isToday = () => {
    const today = new Date();
    const compareDate = new Date(selectedDate);
    const compareToday = new Date(today);
    
    compareDate.setHours(0, 0, 0, 0);
    compareToday.setHours(0, 0, 0, 0);
    
    return compareDate.getTime() === compareToday.getTime();
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPreviousDay}
        className="h-8 w-8 hover:bg-accent"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="text-center">
        <div className="font-serif font-medium">
          {formatDate(selectedDate)}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatFullDate(selectedDate)}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextDay}
        disabled={isToday()}
        className="h-8 w-8 hover:bg-accent disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}