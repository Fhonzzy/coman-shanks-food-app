import { useSearchRestaurant } from "@/api/Restaurant";
import PaginationSelector from "@/components/custom/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/custom/SearchBar";
import SearchResultCard from "@/components/custom/SearchResultCard";
import SearchResultInfo from "@/components/custom/SearchResultInfo";
import CuisineFilter from "@/components/custom/CuisineFilter";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SortOptionDropdown from "@/components/custom/SortOptionDropdown";

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: "",
		page: 1,
		selectedCuisines: [],
		sortOption: "bestMatch",
	});

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const { city } = useParams();
	const { results, isLoading } = useSearchRestaurant(searchState, city);

	const setSortOption = (sortOption: string) => {
		setSearchState((prev) => {
			return {
				...prev,
				sortOption,
				page: 1,
			};
		});
	};

	const setSelectedCuisines = (selectedCuisines: string[]) => {
		setSearchState((prev) => {
			return {
				...prev,
				selectedCuisines,
				page: 1,
			};
		});
	};

	const setPage = (page: number) => {
		setSearchState((prev) => {
			return {
				...prev,
				page,
			};
		});
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prev) => ({
			...prev,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prev) => ({
			...prev,
			searchQuery: "",
			page: 1,
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
			<div id="cuisines-list" className="">
				<CuisineFilter
					onChange={setSelectedCuisines}
					selectedCuisines={searchState.selectedCuisines}
					isExpanded={isExpanded}
					onExpandedClick={() =>
						setIsExpanded((prevIsExpanded) => !prevIsExpanded)
					}
				/>
			</div>
			<div id="main-content" className="flex flex-col gap-5">
				<SearchBar
					onSubmit={setSearchQuery}
					placeHolder="Search by Cuisine or Restaurant name"
					onReset={resetSearch}
					searchQuery={searchState.searchQuery}
				/>
				<div className="flex justify-between flex-col gap-3 lg:flex-row">
					<SearchResultInfo total={results.pagination.total} city={city} />
					<SortOptionDropdown
						onChange={(value) => setSortOption(value)}
						sortOption={searchState.sortOption}
					/>
				</div>
				{results.data.map((restaurant) => {
					return <SearchResultCard restaurant={restaurant} />;
				})}
				<PaginationSelector
					page={results.pagination.page}
					pages={results.pagination.pages}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
