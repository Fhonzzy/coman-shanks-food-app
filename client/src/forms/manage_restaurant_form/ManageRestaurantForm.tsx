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

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
	const form = useForm<restaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: "", price: 0 }],
		},
	});

	const onSubmit = (formDataJson: restaurantFormData) => {};

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
			</form>
			{
				isLoading ? <LoadingBtn /> : <Button type="submit">Save</Button>
			}
		</Form>
	);
};

export default ManageRestaurantForm;
