import { CheckoutSessionRequest } from "@/types/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const usecreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/v1/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkoutSessionRequest)
        })
        if(!response.ok) {
            throw new Error("Unable to create checkout session")
        }
        return response.json()
    }

    const {mutateAsync: createCheckoutSession,
        isLoading, error, reset
    } = useMutation(createCheckoutSessionRequest)

    if(error) {
        toast.error(error.toString())
        reset()
    }

    return {
        createCheckoutSession,
        isLoading
    }
}