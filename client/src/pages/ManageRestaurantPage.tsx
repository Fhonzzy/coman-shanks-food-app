import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage_restaurant_form/ManageRestaurantForm";

function ManageRestaurantPage() {
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { currentUserRestaurant } = useGetMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();

	const isAbleToEdit = !!currentUserRestaurant;

	return (
		<ManageRestaurantForm
			onSave={isAbleToEdit ? updateRestaurant : createRestaurant}
			currentUserRestaurant={currentUserRestaurant}
			isLoading={isCreateLoading || isUpdateLoading}
		/>
	);
}

export default ManageRestaurantPage;
