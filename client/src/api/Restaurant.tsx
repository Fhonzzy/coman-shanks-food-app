import { RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (city?: string) => {
	const initiateSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/search/${city}`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Unable to get Resaurant");
		}

		return response.json();
	};

	const { data: results, isLoading } = useQuery(
		["searchRestaurants"],
		initiateSearchRequest,
		{ enabled: !!city }
	);

	return {
		results,
		isLoading,
	};
};
