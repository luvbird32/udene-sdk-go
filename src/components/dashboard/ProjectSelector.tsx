
import { SearchInput } from "./SearchInput";
import { WelcomeGuide } from "./WelcomeGuide";
import { ProjectSelection } from "./components/ProjectSelection";
import { useSearch } from "./hooks/useSearch";

export const ProjectSelector = () => {
  const {
    searchQuery,
    setSearchQuery,
    showSearchResults,
    setShowSearchResults,
    searchResults,
    handleSearchResultClick,
    searchRef,
  } = useSearch();

  return (
    <div className="space-y-4 mb-6">
      <WelcomeGuide />
      <ProjectSelection />
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        searchResults={searchResults}
        handleSearchResultClick={handleSearchResultClick}
        searchRef={searchRef}
      />
    </div>
  );
};

