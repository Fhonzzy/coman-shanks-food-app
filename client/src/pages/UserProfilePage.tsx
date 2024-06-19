import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user_profile_form/UserProfileForm";

const UserProfilePage = () => {
	const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
	const { currentUser, isLoading: isGetLoading } = useGetMyUser();

	if (isGetLoading)
		return (
			<div className="flex items-center justify-center text-lg">
				<span>Loading...</span>
			</div>
		);

	if (!currentUser) {
		return <span>Unable to load user profile</span>;
	}

	return (
		<UserProfileForm
			currentUser={currentUser}
			onSave={updateUser}
			isLoading={isUpdateLoading}
		/>
	);
};

export default UserProfilePage;
