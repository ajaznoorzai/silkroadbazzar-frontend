import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	// Define constants for currency and delivery fee
	const currency = '₹';
	const delivery_fee = 10;
	// Get backend URL from environment variables
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	// Define state variables
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItem] = useState({});
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	// Function to add an item to the cart
	const addToCart = async (itemId, quantity = 1) => {
		let cartData = structuredClone(cartItems);

		if (cartData[itemId]) {
			cartData[itemId] += quantity;
		} else {
			cartData[itemId] = quantity;
		}

		setCartItem(cartData);
		toast.success('Item Added to Cart');

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/add',
					{
						itemId,
						quantity,
					},
					{
						headers: { token },
					}
				);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	// Function to get the total count of items in the cart
	const getCartCount = () => {
		let totalCount = 0;
		Object.values(cartItems).forEach((quantity) => {
			if (quantity > 0) {
				totalCount += quantity;
			}
		});
		return totalCount;
	};

	// Function to update the quantity of an item in the cart
	const updateQuantity = async (itemId, quantity) => {
		let cartData = structuredClone(cartItems);
		cartData[itemId] = quantity;
		setCartItem(cartData);

		if (token) {
			try {
				await axios.post(
					backendUrl + '/api/cart/update',
					{
						itemId,
						quantity,
					},
					{
						headers: { token },
					}
				);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	// Function to get the total amount of the cart
	const getCartAmount = () => {
		let totalAmount = 0;
		for (const itemId in cartItems) {
			let itemInfo = products.find((product) => product._id === itemId);
			if (itemInfo && cartItems[itemId] > 0) {
				totalAmount += itemInfo.price * cartItems[itemId];
			}
		}
		return totalAmount;
	};

	// Function to fetch product data from the backend
	const getProductsData = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list');
			if (response.data.success) {
				setProducts(response.data.products);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	// Function to get the user's cart from the backend
	const getUserCart = async (token) => {
		try {
			const response = await axios.post(
				backendUrl + '/api/cart/get',
				{},
				{ headers: { token } }
			);

			if (response.data.success) {
				const normalizedCart = {};
				Object.entries(response.data.cartData).forEach(([key, value]) => {
					normalizedCart[key] =
						typeof value === 'number'
							? value
							: typeof value === 'object'
							? Object.values(value)[0] || 0
							: 0;
				});
				setCartItem(normalizedCart);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	// Function to get the items in the cart
	const getCartItems = () => {
		const items = [];
		for (const itemId in cartItems) {
			const product = products.find((p) => p._id === itemId);
			if (product && cartItems[itemId] > 0) {
				items.push({
					_id: itemId,
					name: product.name,
					price: product.price,
					image: product.image[0],
					quantity: cartItems[itemId],
				});
			}
		}
		return items;
	};

	// Fetch product data when the component mounts
	useEffect(() => {
		getProductsData();
	}, []);

	// Get user cart if token is available
	useEffect(() => {
		if (!token && localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
			getUserCart(localStorage.getItem('token'));
		}
	}, []);

	// Define the value to be provided by the context
	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		addToCart,
		setCartItem,
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate,
		backendUrl,
		setToken,
		token,
		getCartItems,
	};

	// Provide the context value to children components
	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
