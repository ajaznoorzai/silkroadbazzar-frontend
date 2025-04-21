import { useContext, useEffect, useState } from 'react'; // Importing necessary hooks from React
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext from context
import Title from '../components/Title'; // Importing Title component
import axios from 'axios'; // Importing axios for HTTP requests
import { toast } from 'react-toastify'; // Importing toast for notifications

const Orders = () => {
	const { backendUrl, token, currency } = useContext(ShopContext); // Destructuring values from ShopContext
	const [orderData, setorderData] = useState([]); // State to hold order data

	// Function to load order data
	const loadOrderData = async () => {
		try {
			if (!token) {
				return null; // Return if no token
			}

			const response = await axios.post(
				backendUrl + '/api/order/userorders', // API endpoint to fetch user orders
				{}, // Empty object as request body
				{ headers: { token } } // Headers containing the token for authentication
			);
			if (response.data.success) {
				let allOrdersItem = []; // Array to hold all order items
				response.data.orders.map((order) => {
					order.items.map((item) => {
						item['status'] = order.status; // Adding order status to item
						item['payment'] = order.payment; // Adding payment status to item
						item['paymentMethod'] = order.paymentMethod; // Adding payment method to item
						item['date'] = order.date; // Adding order date to item
						allOrdersItem.push(item); // Add order items to allOrdersItem array
					});
				});
				setorderData(allOrdersItem.reverse()); // Set the order data in reverse order
				console.log(allOrdersItem); // Log the order items
			}
		} catch (error) {
			console.log(error); // Log any errors
			toast.error(error.message); // Show error message using toast
		}
	};

	useEffect(() => {
		loadOrderData(); // Load order data on component mount
	}, [token]); // Dependency array containing token

	return (
		<div className="border-t pt-16">
			{' '}
			{/* Container div with top border and padding */}
			<div className="text-2xl">
				{' '}
				{/* Div for title with large text */}
				<Title text1={'MY'} text2={'ORDERS'} />{' '}
				{/* Title component with text "MY ORDERS" */}
			</div>
			<div>
				{orderData.map((item, index) => (
					<div
						key={index} // Unique key for each order item
						className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
					>
						<div className="flex items-start gap-6 text-sm">
							{' '}
							{/* Flex container for order item details */}
							<img className="w-16 sm:w-20" src={item.image} alt="" />{' '}
							{/* Order item image */}
							<div>
								<p className="sm:text-base font-medium">{item.name}</p>{' '}
								{/* Order item name */}
								<div className="flex items-center gap-3 mt-1 text-base text-gray-700">
									<p>
										{currency}
										{item.price}
									</p>{' '}
									{/* Order item price */}
									<p>Quantity: {item.quantity}</p> {/* Order item quantity */}
								</div>
								<p className="mt-1">
									Date:{' '}
									<span className="text-gray-400">
										{new Date(item.date).toDateString()}
									</span>
								</p>{' '}
								{/* Order date */}
								<p className="mt-1">
									Payment:{' '}
									<span className="text-gray-400">{item.paymentMethod}</span>
								</p>{' '}
								{/* Payment method */}
							</div>
						</div>
						<div className="md:w-1/2 flex justify-between">
							{' '}
							{/* Flex container for status and button */}
							<div className="flex items-center gap-2">
								<p className="min-w-2 h-2 rounded-full bg-green-500"></p>{' '}
								{/* Status indicator */}
								<p className="text-sm md:text-base">{item.status}</p>{' '}
								{/* Order status */}
							</div>
							<button
								onClick={loadOrderData} // Reload order data on button click
								className="border px-4 py-2 text-sm font-medium rounded-sm "
							>
								Track Order
							</button>{' '}
							{/* Track order button */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders; // Exporting Orders component
