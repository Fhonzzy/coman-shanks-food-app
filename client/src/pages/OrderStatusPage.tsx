import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/custom/OrderStatusDetail";
import OrderStatusHeader from "@/components/custom/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function OrderStatusPage() {
	const { order, isLoading } = useGetMyOrders();

	if (isLoading) {
		return "Loading...";
	}

	if (!order || order.length === 0) {
		return "No Orders Found";
	}

	return (
		<div className="space-y-10">
			{order.map((order) => (
				<div className="space-y-10 bg-gray-50 p-10 rounded-lg">
					<OrderStatusHeader order={order} />
					<div className="grid gap-10 md:grid-cols-2">
						<OrderStatusDetail order={order} />
						<AspectRatio ratio={16 / 5}>
							<img
								src={order.restaurant.imageUrl}
								className="rounded-md object-cover h-full w-full"
							/>
						</AspectRatio>
					</div>
				</div>
			))}
		</div>
	);
}

export default OrderStatusPage;
