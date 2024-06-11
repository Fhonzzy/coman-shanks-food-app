import { Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();		
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		const responseData = await response.json()
		
		if (!response.ok) {
			throw new Error(responseData.msg || "Failed to create Restaurant");
		}

		return responseData
	};

	const {
		mutate: createRestaurant,
		isLoading,
	} = useMutation(createMyRestaurantRequest, {
		onSuccess: () => {
			toast.success("Restaurant Created");
		},
		onError: (error: any) => {
			toast.error(error.message || "Unable to create Restaurant");
		}
	});

	return {
		createRestaurant,
		isLoading,
	};
};

export const useGetMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently()
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if(!response.ok) {
			throw new Error("Failed to Fetch Restaurant!")
		}

		return response.json();
	}

	const {
		data: currentUserRestaurant,
		isLoading,
		error
	} = useQuery("fetchUserRestaurant", getMyRestaurantRequest)

	return {
		currentUserRestaurant,
		isLoading
	}
}