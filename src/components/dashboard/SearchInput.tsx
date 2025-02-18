
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { SearchResult } from "./types";
import { RefObject } from "react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
  searchResults: SearchResult[];
  handleSearchResultClick: (result: SearchResult) => void;
  searchRef: RefObject<HTMLDivElement>;
}

export const SearchInput = ({
  searchQuery,
  setSearchQuery,
  showSearchResults,
  setShowSearchResults,
  searchResults,
  handleSearchResultClick,
  searchRef
}: SearchInputProps) => {
  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search products and services..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSearchResults(true);
        }}
        onFocus={() => setShowSearchResults(true)}
        className="pl-10 w-full"
      />
      
      {showSearchResults && searchQuery && (
        <div className="absolute mt-2 w-full bg-popover text-popover-foreground shadow-md rounded-md border z-50">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {["project", "service", "product"].map((type) => {
                const resultsOfType = searchResults.filter(r => r.type === type);
                if (resultsOfType.length === 0) return null;

                return (
                  <CommandGroup key={type} heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}>
                    {resultsOfType.map((result) => (
                      <CommandItem
                        key={`${result.type}-${result.id}`}
                        onSelect={() => {
                          console.log("Command item selected:", result);
                          handleSearchResultClick(result);
                        }}
                        className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">{result.title}</div>
                          {result.description && (
                            <div className="text-sm text-muted-foreground">{result.description}</div>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
