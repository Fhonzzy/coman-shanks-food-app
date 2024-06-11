import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingBtn from "@/components/custom/LoadingBtn";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/types";
import { useEffect } from "react";

const formSchema = z.object({
	restaurantName: z.string({
		required_error: "Restaurant Name is required",
	}),
	city: z.string({
		required_error: "City is required",
	}),
	country: z.string({
		required_error: "Country is required",
	}),
	deliveryPrice: z.coerce.number({
		required_error: "Delivery Prize is required",
		invalid_type_error: "must be a valid number",
	}),
	estimatedDeliveryTime: z.coerce.number({
		required_error: "estimated delivery time is required",
		invalid_type_error: "must be a valid number",
	}),
	cuisines: z.array(z.string()).nonempty({
		message: "Please select at least one item",
	}),
	menuItems: z.array(
		z.object({
			name: z.string().min(1, "Name is required"),
			price: z.coerce.number().min(1, "Price is required"),
		})
	),
	imageFile: z.instanceof(File, { message: "Image is required" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
	currentUserRestaurant?: Restaurant
};

const ManageRestaurantForm = ({ onSave, isLoading, currentUserRestaurant }: Props) => {
	const form = useForm<RestaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: "", price: 0 }],
		},
	});

	useEffect(() => {
		if (!currentUserRestaurant) {
			return;
		}
		
		const deliveryPriceFormat = parseInt((currentUserRestaurant.deliveryPrice / 100).toFixed(2))

		const menuItemsFormat = currentUserRestaurant.menuItems.map((item) => ({
			...item,
			price: parseInt((item.price / 100).toFixed(2))
		}))

		const updatedCurrentUserRestaurant = {
			...currentUserRestaurant,
			deliveryPrice: deliveryPriceFormat,
			menuItems: menuItemsFormat
		}

		form.reset(updatedCurrentUserRestaurant)
	}, [form, currentUserRestaurant])

	const onSubmit = (formDataJson: RestaurantFormData) => {
		const formData = new FormData();

		formData.append("restaurantName", formDataJson.restaurantName);
		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);
		formData.append(
			"deliveryPrice",
			(formDataJson.deliveryPrice * 100).toString()
		);
		formData.append(
			"estimatedDeliveryTime",
			formDataJson.estimatedDeliveryTime.toString()
		);
		formDataJson.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine)
		})
		formDataJson.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name)
			formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
		})
		formData.append('imageFile', formDataJson.imageFile)
		console.log(formData)

		onSave(formData)
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 bg-gray-50 p-10 rounded-lg"
			>
				<DetailsSection />
				<Separator />
				<CuisineSection />
				<Separator />
				<MenuSection />
				<Separator />
				<ImageSection />
				{isLoading ? <LoadingBtn /> : <Button type="submit">Save</Button>}
			</form>
		</Form>
	);
};

export default ManageRestaurantForm;
