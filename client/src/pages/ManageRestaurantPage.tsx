import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useGetMyRestaurantOrders,
	useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/custom/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage_restaurant_form/ManageRestaurantForm";

function ManageRestaurantPage() {
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { currentUserRestaurant } = useGetMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();
	const { myRestaurantOrders} = useGetMyRestaurantOrders();

	const isAbleToEdit = !!currentUserRestaurant;

	return (
		<Tabs defaultValue="orders">
			<TabsList>
				<TabsTrigger value="orders">Orders</TabsTrigger>
				<TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
			</TabsList>
			<TabsContent
				value="orders"
				className="space-y-5 bg-gray-50 pg-10 rounded-lg"
			>
				<h2 className="text-2xl font-bold">
					{myRestaurantOrders?.length} active orders
				</h2>
				{myRestaurantOrders?.map((order) => (
					<OrderItemCard order={order} />
				))}
			</TabsContent>
			<TabsContent value="manage-restaurant">
				<ManageRestaurantForm
					onSave={isAbleToEdit ? updateRestaurant : createRestaurant}
					currentUserRestaurant={currentUserRestaurant}
					isLoading={isCreateLoading || isUpdateLoading}
				/>
			</TabsContent>
		</Tabs>
	);
}

export default ManageRestaurantPage;
