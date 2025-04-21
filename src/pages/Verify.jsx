import { useContext, useEffect } from 'react'; // Import necessary hooks from React
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext
import { useSearchParams } from 'react-router-dom'; // Import hook to work with URL search parameters
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify'; // Import toast for displaying notifications

const Verify = () => {
	// Get necessary values from the ShopContext
	const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext);
	const [searchParams, setSearchParams] = useSearchParams(); // Hook to get and set URL search parameters

	// Get query parameters from the URL
	const success = searchParams.get('success'); // Get 'success' parameter from URL
	const orderId = searchParams.get('orderId'); // Get 'orderId' parameter from URL

	// Function to verify payment
	const verifyPayment = async () => {
		try {
			if (!token) {
				// If no token is available, return null
				return null;
			}

			// Make a POST request to verify the payment
			const response = await axios.post(
				backendUrl + '/api/order/verifyStripe',
				{ success, orderId },
				{ headers: { token } } // Include token in the request headers
			);

			if (response.data.success) {
				// If payment verification is successful
				setCartItem({}); // Clear the cart
				navigate('/orders'); // Navigate to the orders page
			} else {
				navigate('/'); // Navigate to the home page if verification fails
			}
		} catch (error) {
			console.log(error); // Log any errors
			toast.error(error.message); // Display error message using toast
		}
	};

	// Verify payment when the component mounts or token changes
	useEffect(() => {
		verifyPayment(); // Call verifyPayment function
	}, [token]); // Dependency array with token

	return <div>{/* Empty div for now */}</div>; // Return an empty div
};

export default Verify; // Export the Verify component
