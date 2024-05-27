import { User } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

export const useCreateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();
	const createMyUserRequest = async (user: CreateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`Failed to Create User`);
		}
	};

	const {
		mutateAsync: createUser,
		isLoading,
		isError,
		isSuccess,
	} = useMutation(createMyUserRequest);

	return {
		createUser,
		isError,
		isLoading,
		isSuccess,
	};
};

type UpdateUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};
export const useUpdateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateMyUserRequest = async (formData: UpdateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error("Failed to Update");
		}
		return response.json();
	};

	const {
		isError,
		isLoading,
		isSuccess,
		mutateAsync: updateUser,
		reset,
		error,
	} = useMutation(updateMyUserRequest);

	if (isSuccess) {
		toast.success("User Profile Updated");
	}

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return {
		updateUser,
		isError,
		isSuccess,
		isLoading,
	};
};

export const useGetMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyUserRequest = async (): Promise<User> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/v1/my/user`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to Fetch User!");
		}
		const data = response.json();
		return data;
	};

	const {
		data: currentUser,
		isLoading,
		error,
	} = useQuery("fetchCurrentUser", getMyUserRequest);

	if (error) {
		toast.error(error.toString())
	}

	return {
		currentUser,
		isLoading,
	}
};
