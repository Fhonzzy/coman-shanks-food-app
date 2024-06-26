import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
	searchState: SearchState,
	city?: string
) => {
	const initiateSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const params = new URLSearchParams();
		params.set("searchQuery", searchState.searchQuery);
		params.set("page", searchState.page.toString());
		params.set("selectedCuisines", searchState.selectedCuisines.join(","));
		params.set("sortOption", searchState.sortOption);

		const response = await fetch(
			`${API_BASE_URL}/api/v1/restaurant/search/${city}?${params.toString()}`,
			{
				method: "GET",
			}
		);

		if (!response.ok) throw new Error("Unable to get Resaurant");

		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		["searchRestaurants", searchState],
		initiateSearchRequest,
		{ enabled: !!city }
	);

	return {
		results,
		isLoading,
	};
};

export const useGetRestaurant = (restaurantId?: string) => {
	const getRestaurant = async (): Promise<Restaurant> => {
		const response = await fetch(
			`${API_BASE_URL}/api/v1/restaurant/${restaurantId}`
		);

		if (!response.ok) {
			throw new Error("Failed to get restaurant")
		}

		return response.json();
	};

	const { data: restaurant, isLoading } = useQuery(
		"fetchRestaurant",
		getRestaurant,
		{
			enabled: !!restaurantId,
		}
	);

	return {
		restaurant,
		isLoading,
	};
};
