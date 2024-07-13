import { Order, Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.msg || "Failed to create Restaurant");
		}

		return responseData;
	};

	const { mutate: createRestaurant, isLoading } = useMutation(
		createMyRestaurantRequest,
		{
			onSuccess: () => {
				toast.success("Restaurant Created");
			},
			onError: (error: any) => {
				toast.error(error.message || "Unable to create Restaurant");
			},
		}
	);

	return {
		createRestaurant,
		isLoading,
	};
};

export const useGetMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to Fetch Restaurant!");
		}

		return response.json();
	};

	const { data: currentUserRestaurant, isLoading } = useQuery(
		"fetchUserRestaurant",
		getMyRestaurantRequest
	);

	return {
		currentUserRestaurant,
		isLoading,
	};
};

export const useUpdateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateRestaurantRequest = async (
		restaurantFormData: FormData
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(responseData.msg || "Failed to update Restaurant");
		}

		return responseData;
	};

	const { mutate: updateRestaurant, isLoading } = useMutation(
		updateRestaurantRequest,
		{
			onSuccess: () => {
				toast.success("Restaurant Updated");
			},
			onError: (err: Error) => {
				toast.error(err.message);
			},
		}
	);

	return {
		updateRestaurant,
		isLoading,
	};
};


export const useGetMyRestaurantOrders = () => {
	const {getAccessTokenSilently} = useAuth0();

	const getMyMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
		const accessToken = await getAccessTokenSilently()
		const response = await fetch(`${API_BASE_URL}/api/v1/my/restaurant/order`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json"
			}
		})
		if(!response.ok) {
			throw new Error("Error fetching Orders")
		}

		return response.json()
	}

	const {data: myRestaurantOrders, isLoading} = useQuery("fetchMyRestaurantOrders", getMyMyRestaurantOrdersRequest)

	return {
		myRestaurantOrders,
		isLoading
	}
}

type UpdateOrderStatusRequest = {
	orderId: string;
	status: string;
  };
  
  export const useUpdateMyRestaurantOrder = () => {
	const { getAccessTokenSilently } = useAuth0();
  
	const updateMyRestaurantOrder = async (
	  updateStatusOrderRequest: UpdateOrderStatusRequest
	) => {
	  const accessToken = await getAccessTokenSilently();
  
	  const response = await fetch(
		`${API_BASE_URL}/api/v1/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
		{
		  method: "PATCH",
		  headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ status: updateStatusOrderRequest.status }),
		}
	  );
  
	  if (!response.ok) {
		throw new Error("Failed to update status");
	  }
  
	  return response.json();
	};
  
	const {
	  mutateAsync: updateRestaurantStatus,
	  isLoading,
	  isError,
	  isSuccess,
	  reset,
	} = useMutation(updateMyRestaurantOrder);
  
	if (isSuccess) {
	  toast.success("Order updated");
	}
  
	if (isError) {
	  toast.error("Unable to update order");
	  reset();
	}
  
	return { updateRestaurantStatus, isLoading };
  };