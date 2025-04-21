import { useContext, useState, useEffect } from 'react'; // Import necessary hooks from React
import Title from '../components/Title'; // Import Title component
import CartTotal from '../components/CartTotal'; // Import CartTotal component
import { assets } from '../assets/assets'; // Import assets
import { ShopContext } from '../context/ShopContext'; // Import ShopContext
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify'; // Import toast for displaying notifications

const PlaceOrder = () => {
	const [method, setMethod] = useState('cod'); // State to store payment method
	const [savedAddresses, setSavedAddresses] = useState([]); // State to store saved addresses
	const [showAddressForm, setShowAddressForm] = useState(false); // State to toggle address form
	const [selectedAddress, setSelectedAddress] = useState(null); // State to store selected address
	const [isLoading, setIsLoading] = useState(true); // State to manage loading state
	const {
		navigate,
		backendUrl,
		token,
		cartItems,
		setCartItem,
		getCartAmount,
		delivery_fee,
		products,
		getCartItems,
	} = useContext(ShopContext); // Destructure values from ShopContext
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country: '',
		phone: '',
	}); // State to store form data

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				setIsLoading(true); // Set loading state to true
				const { data } = await axios.get(`${backendUrl}/api/address/get`, {
					headers: { token }, // Include token in the request headers
				});
				if (data.success) {
					setSavedAddresses(data.addresses); // Set fetched addresses to state
				} else {
					toast.error(data.message || 'Failed to fetch addresses'); // Display error message
				}
			} catch (error) {
				console.log(error); // Log any errors
				toast.error('Failed to fetch saved addresses'); // Display error message
			} finally {
				setIsLoading(false); // Set loading state to false
			}
		};
		fetchAddresses(); // Call fetchAddresses function
	}, [backendUrl, token]); // Dependency array with backendUrl and token

	const saveNewAddress = async () => {
		try {
			// Validate form data before sending
			if (
				!formData.firstName ||
				!formData.lastName ||
				!formData.street ||
				!formData.city ||
				!formData.state ||
				!formData.zipcode ||
				!formData.country ||
				!formData.phone
			) {
				toast.error('Please fill all required fields'); // Display error message
				return;
			}

			// Make a POST request to save the new address
			const { data } = await axios.post(
				`${backendUrl}/api/address/save`,
				{
					address: formData,
					userId: token, // Add userId to the request body
				},
				{
					headers: { token }, // Include token in the request headers
				}
			);

			if (data.success) {
				setSavedAddresses(data.addresses); // Update saved addresses
				setShowAddressForm(false); // Hide address form
				setSelectedAddress(formData); // Select the newly added address
				toast.success('Address saved successfully'); // Display success message
			} else {
				toast.error(data.message || 'Failed to save address'); // Display error message
			}
		} catch (error) {
			console.log(error); // Log any errors
			toast.error(error.response?.data?.message || 'Failed to save address'); // Display error message
		}
	};

	const onChangeHandler = (event) => {
		const name = event.target.name; // Get the name of the input field
		const value = event.target.value; // Get the value of the input field
		setFormData((data) => ({ ...data, [name]: value })); // Update form data state
	};

	const initPay = (order) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key ID
			amount: order.amount, // Order amount
			currency: order.currency, // Order currency
			name: 'Order Payment', // Payment name
			description: 'Order Payment', // Payment description
			order_id: order.id, // Order ID
			receipt: order.receipt, // Order receipt
			handler: async (response) => {
				try {
					const verifyData = {
						...response,
						userId: token, // Add userId to the verification data
					};
					const { data } = await axios.post(
						backendUrl + '/api/order/verifyRazorpay',
						verifyData,
						{ headers: { token } }
					); // Verify payment
					if (data.success) {
						navigate('/orders'); // Navigate to orders page
						setCartItem({}); // Clear the cart
					}
				} catch (error) {
					console.log(error); // Log any errors
					toast.error(error.message); // Display error message
				}
			},
		};
		const rzp = new window.Razorpay(options); // Initialize Razorpay
		rzp.open(); // Open Razorpay payment window
	};

	const handleMethodChange = (newMethod) => {
		if (newMethod !== 'stripe') {
			// Disable Stripe payment method
			setMethod(newMethod); // Set the selected payment method
		}
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault(); // Prevent default form submission
		if (!selectedAddress && !showAddressForm) {
			toast.error('Please select an address or add a new one'); // Display error message
			return;
		}

		try {
			const items = getCartItems(); // Get formatted cart items

			let orderData = {
				address: showAddressForm ? formData : selectedAddress, // Use form data if address form is shown, otherwise use selected address
				items: items, // Order items
				amount: getCartAmount() + delivery_fee, // Order amount including delivery fee
			};

			switch (method) {
				// API Calls for COD
				case 'cod': {
					const response = await axios.post(
						backendUrl + '/api/order/place',
						orderData,
						{ headers: { token } }
					); // Place order with COD
					console.log(response.data.success);
					if (response.data.success) {
						setCartItem({}); // Clear the cart
						navigate('/orders'); // Navigate to orders page
					} else {
						toast.error(response.data.message); // Display error message
					}
					break;
				}

				case 'stripe': {
					const responseStripe = await axios.post(
						backendUrl + '/api/order/stripe',
						orderData,
						{ headers: { token } }
					); // Place order with Stripe
					if (responseStripe.data.success) {
						const { session_url } = responseStripe.data; // Get session URL
						window.location.replace(session_url); // Redirect to Stripe payment page
					} else {
						toast.error(responseStripe.data.message); // Display error message
					}
					break;
				}

				case 'razorpay': {
					const responseRazorpay = await axios.post(
						backendUrl + '/api/order/razorpay',
						orderData,
						{ headers: { token } }
					); // Place order with Razorpay
					if (responseRazorpay.data.success) {
						initPay(responseRazorpay.data.order); // Initialize Razorpay payment
					}
					break;
				}

				default:
					break;
			}
		} catch (error) {
			console.log(error); // Log any errors
			toast.error(error.message); // Display error message
		}
	};

	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
		>
			{/*------------------left side------------------*/}
			<div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
				<div className="text-xl sm:text-2xl my-3 ">
					<Title text1={'DELIVERY'} text2={'INFORMATION'} />
				</div>

				{/* Loading State */}
				{isLoading ? (
					<div className="text-center py-4">Loading saved addresses...</div>
				) : (
					<>
						{/* Saved Addresses Section */}
						{savedAddresses.length > 0 && !showAddressForm && (
							<div className="flex flex-col gap-3">
								<h3 className="font-medium">Saved Addresses</h3>
								{savedAddresses.map((address, index) => (
									<div
										key={index}
										onClick={() => setSelectedAddress(address)}
										className={`border p-3 rounded cursor-pointer ${
											selectedAddress === address
												? 'border-green-500'
												: 'border-gray-300'
										}`}
									>
										<p>
											{address.firstName} {address.lastName}
										</p>
										<p>{address.street}</p>
										<p>
											{address.city}, {address.state} {address.zipcode}
										</p>
										<p>{address.country}</p>
									</div>
								))}
							</div>
						)}

						{/* Add New Address Button */}
						<button
							type="button"
							onClick={() => setShowAddressForm(!showAddressForm)}
							className="text-black  underline"
						>
							{showAddressForm ? 'Back to saved addresses' : 'Add New Address'}
						</button>

						{/* Address Form */}
						{showAddressForm && (
							<>
								<div className="flex gap-3">
									<input
										required
										onChange={onChangeHandler}
										name="firstName"
										value={formData.firstName}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="text"
										placeholder="First name"
									/>
									<input
										required
										onChange={onChangeHandler}
										name="lastName"
										value={formData.lastName}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="text"
										placeholder="Last name"
									/>
								</div>
								<input
									required
									onChange={onChangeHandler}
									name="email"
									value={formData.email}
									className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
									type="email"
									placeholder="E-mail Address"
								/>
								<input
									required
									onChange={onChangeHandler}
									name="street"
									value={formData.street}
									className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
									type="text"
									placeholder="Street"
								/>
								<div className="flex gap-3">
									<input
										required
										onChange={onChangeHandler}
										name="city"
										value={formData.city}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="text"
										placeholder="City"
									/>
									<input
										required
										onChange={onChangeHandler}
										name="state"
										value={formData.state}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="text"
										placeholder="State"
									/>
								</div>
								<div className="flex gap-3">
									<input
										required
										onChange={onChangeHandler}
										name="zipcode"
										value={formData.zipcode}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="number"
										placeholder="Area PIN-CODE"
									/>
									<input
										required
										onChange={onChangeHandler}
										name="country"
										value={formData.country}
										className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
										type="text"
										placeholder="Country"
									/>
								</div>
								<input
									required
									onChange={onChangeHandler}
									name="phone"
									value={formData.phone}
									className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
									type="number"
									placeholder="Mobile Number"
								/>
								<button
									type="button"
									onClick={saveNewAddress}
									className="bg-black text-white px-4 py-2 rounded"
								>
									Save Address
								</button>
							</>
						)}
					</>
				)}
			</div>
			{/*-------------------right side---------------------- */}
			<div className="mt-8">
				<div className="mt-8 min-w-80">
					<CartTotal />
				</div>
				<div className="mt-12">
					<Title text1={'PAYMENT'} text2={'METHOD'} />
					{/*------------------payment--------------------*/}
					<div className="flex gap-3 flex-col lg:flex-row">
						{/* Razorpay payment */}
						<div
							onClick={() => handleMethodChange('razorpay')}
							className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-500 transition-colors"
						>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === 'razorpay' ? 'bg-green-500' : ''
								}`}
							></p>
							<img
								className="h-5 mx-4"
								src={assets.razorpay_logo}
								alt="Razorpay"
							/>
						</div>

						{/* COD payment */}
						<div
							onClick={() => handleMethodChange('cod')}
							className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-500 transition-colors"
						>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === 'cod' ? 'bg-green-500' : ''
								}`}
							></p>
							<p className="text-gray-500 text-sm font-medium mx-4">
								CASH ON DELIVERY
							</p>
						</div>

						{/* Stripe payment (disabled) */}
						<div className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed opacity-50 bg-gray-50">
							<p className="min-w-3.5 h-3.5 border rounded-full"></p>
							<div className="flex items-center gap-2">
								<img
									className="h-5 mx-4 grayscale"
									src={assets.stripe_logo}
									alt="Stripe (Currently Unavailable)"
								/>
								<span className="text-xs text-gray-500">(Coming Soon)</span>
							</div>
						</div>
					</div>
					<div className="w-full text-end mt-8">
						<button
							type="submit"
							className="bg-black text-white px-16 py-3 text-sm"
						>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder; // Export the PlaceOrder component
