import { useSearchRestaurant } from "@/api/Restaurant";
import PaginationSelector from "@/components/custom/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/custom/SearchBar";
import SearchResultCard from "@/components/custom/SearchResultCard";
import SearchResultInfo from "@/components/custom/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
	searchQuery: string;
  page: number
};

const SearchPage = () => {
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: "",
    page: 1
	});
	const { city } = useParams();
	const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setPage = (page: number) => {
    setSearchState((prev) => {
      return {
        ...prev,
        page
      }
    })
  }

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prev) => ({
			...prev,
			searchQuery: searchFormData.searchQuery,
      page: 1
		}));
	};

	const resetSearch = () => {
		setSearchState((prev) => ({
			...prev,
			searchQuery: "",
      page: 1
		}));
	};

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (!results?.data || !city) {
		return <span>No result found</span>;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
			<div id="cuisines-list" className="bg-yellow-300">
				Cuisines List
			</div>
			<div id="main-content" className="flex flex-col gap-5">
				<SearchBar
					onSubmit={setSearchQuery}
					placeHolder="Search by Cuisine or Restaurant name"
					onReset={resetSearch}
					searchQuery={searchState.searchQuery}
				/>
				<SearchResultInfo total={results.pagination.total} city={city} />
				{results.data.map((restaurant) => {
					return <SearchResultCard restaurant={restaurant} />;
				})}
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
			</div>
		</div>
	);
};

export default SearchPage;
