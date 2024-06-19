import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import LoadingBtn from "./LoadingBtn";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import UserProfileForm, {
	UserFormData,
} from "@/forms/user_profile_form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
	onCheckout: (userFormData: UserFormData) => void;
	disabled: boolean;
};

const CheckOutBtn = ({ disabled, onCheckout }: Props) => {
	const {
		isAuthenticated,
		isLoading: isAuthLoading,
		loginWithRedirect,
	} = useAuth0();

	const { pathname } = useLocation();
	const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

	const onLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: pathname,
			},
		});
	};
	if (!isAuthenticated) {
		return (
			<Button className="bg-red-500 flex-1" onClick={onLogin}>
				Log in to check out
			</Button>
		);
	}

	if (isAuthLoading || !currentUser) {
		return <LoadingBtn />;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={disabled} className="bg-red-500 flex-1">
					Go to Check Out
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
				<UserProfileForm
					currentUser={currentUser}
					onSave={onCheckout}
					isLoading={isGetUserLoading}
                    buttonText="Continue To Payment"
                    title="Confirm Details"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CheckOutBtn;
