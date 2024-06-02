import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

function DetailsSection() {
	const { control } = useFormContext();
	return (
		<div className="space-y-2">
			<div>
				<h2 className="text-2xl font-bold">Details</h2>
			</div>
			<FormDescription>Enter the details about your restaurant</FormDescription>
			<FormField
				control={control}
				name="restaurantName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input {...field} className="bg-white" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex gap-4">
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} className="bg-white" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="country"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input {...field} className="bg-white" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={control}
				name="deliveryPrice"
				render={({ field }) => (
					<FormItem className="max-w-[25%]">
						<FormLabel>Delivery Price (₦)</FormLabel>
						<FormControl>
							<Input {...field} className="bg-white" placeholder="500" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="estimatedDeliveryTime"
				render={({ field }) => (
					<FormItem className="max-w-[25%]">
						<FormLabel>Estimated Delivery Time (mins)</FormLabel>
						<FormControl>
							<Input {...field} className="bg-white" placeholder="20" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}

export default DetailsSection;