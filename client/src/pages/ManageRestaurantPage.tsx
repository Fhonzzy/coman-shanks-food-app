import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage_restaurant_form/ManageRestaurantForm"

function ManageRestaurantPage() {
  const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant()
  const {currentUserRestaurant} = useGetMyRestaurant()

  return (
    <ManageRestaurantForm onSave={createRestaurant} currentUserRestaurant={currentUserRestaurant} isLoading={isCreateLoading}/>
  )
}

export default ManageRestaurantPage