import { useEffect } from 'react'; // Importing useEffect hook from React
import { useContext } from 'react'; // Importing useContext hook from React
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext from context
import { useState } from 'react'; // Importing useState hook from React
import Title from '../components/Title'; // Importing Title component
import { assets } from '../assets/assets'; // Importing assets
import CartTotal from '../components/CartTotal'; // Importing CartTotal component
import { toast } from 'react-toastify'; // Importing toast for notifications

const Cart = () => {
	const { products, currency, cartItems, updateQuantity, navigate, token } =
		useContext(ShopContext); // Destructuring values from ShopContext
	const [cartData, setCartData] = useState([]); // State to hold cart data

	// Function to handle payment navigation
	const proceedToPayment = () => {
		if (token) {
			navigate('/place-order'); // Navigate to place-order if token exists
		} else {
			toast.error('Please login to proceed to payment'); // Show error if not logged in
			navigate('/login'); // Navigate to login page
		}
	};

	// useEffect hook to update cart data when cartItems or products change
	useEffect(() => {
		if (products.length > 0) {
			const tempData = [];
			// Update to use new cart structure
			Object.entries(cartItems).forEach(([itemId, quantity]) => {
				if (quantity > 0) {
					tempData.push({
						_id: itemId,
						quantity:
							typeof quantity === 'number'
								? quantity
								: typeof quantity === 'object'
								? Object.values(quantity)[0] || 0
								: 0,
					});
				}
			});
			setCartData(tempData); // Set the updated cart data
		}
	}, [cartItems, products]);

	// Component to display when cart is empty
	const EmptyCart = () => (
		<div className="flex flex-col items-center justify-center py-20">
			<h2 className="text-2xl font-medium text-gray-600 mb-4">
				Your Cart is Empty
			</h2>
			<p className="text-gray-500 mb-8">
				Looks like you haven't added anything to your cart yet
			</p>
			<button
				onClick={() => navigate('/collection')}
				className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
			>
				SHOP NOW
			</button>
		</div>
	);

	return (
		<div className="border-t pt-14">
			<div className="text-2xl mb-3">
				<Title text1={'YOUR'} text2={'CART'} /> {/* Title component */}
			</div>

			{cartData.length === 0 ? (
				<EmptyCart /> // Show EmptyCart component if cart is empty
			) : (
				<>
					<div className="">
						{cartData.map((item, index) => {
							const productData = products.find(
								(product) => product._id === item._id
							); // Find product data by ID
							if (!productData) return null;

							return (
								<div
									key={index}
									className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
								>
									<div className="flex items-start gap-6">
										<img
											className="w-16 sm:w-20"
											src={productData.image[0]}
											alt=""
										/>{' '}
										{/* Product image */}
										<div>
											<p className="text-xs sm:text-lg font-medium">
												{productData.name}
											</p>{' '}
											{/* Product name */}
											<div className="flex items-center gap-5 mt-2">
												<p>
													{currency}
													{productData.price}
												</p>{' '}
												{/* Product price */}
											</div>
										</div>
									</div>
									<input
										onChange={(e) => {
											const value = e.target.value;
											if (value !== '' && value !== '0') {
												updateQuantity(item._id, Number(value)); // Update quantity
											}
										}}
										className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
										type="number"
										min={1}
										value={item.quantity}
									/>
									<img
										onClick={() => updateQuantity(item._id, 0)}
										className="w-4 mr-4 sm:w-5 cursor-pointer"
										src={assets.bin_icon}
										alt=""
									/>
								</div>
							);
						})}
					</div>

					<div className="flex justify-end my-20">
						<div className="w-full sm:w-[450px]">
							<CartTotal /> {/* CartTotal component */}
							<div className="w-full text-end">
								<button
									onClick={proceedToPayment}
									className="bg-black text-white text-sm my-8 px-8 py-3"
								>
									PROCEED TO PAYMENT
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
