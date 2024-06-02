// import { useCreateMyUser } from "@/api/MyUserApi";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};
const Auth0ProviderWithNav = ({ children }: Props) => {
	const navigate = useNavigate();
	const domain = import.meta.env.VITE_AUTH0_DOMAIN;
	const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
	const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

	if (!domain || !clientId || !redirectUri || !audience) {
		throw new Error("Unable to initialise auth");
	}

	const onRedirectCallback = () => {
		// console.log("USER", user);
		navigate("/auth-callback");
	};

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{ redirect_uri: redirectUri, audience }}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithNav;

//https://chatgpt.com/share/30b31258-4526-4c23-a075-cf120b2a3c03