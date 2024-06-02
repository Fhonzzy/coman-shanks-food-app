import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const UsernameMenu = () => {
	const { user, logout } = useAuth0();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2">
				<CircleUserRound className="text-red-500" />
				{user?.email}
				<ChevronDown className="text-red-500" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link to={"/user-profile"} className="font-bold hover:text-red-500">
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						to={"/manage-restaurant"}
						className="font-bold hover:text-red-500"
					>
						Manage Restaurant
					</Link>
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem>
					<Button
						className="flex flex-1 font-bold bg-red-500"
						onClick={() => logout()}
					>
						Log Out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UsernameMenu;
