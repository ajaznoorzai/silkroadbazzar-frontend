import React, { useContext } from 'react'; // Import React and useContext hook
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext to access global state
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const ProductItem = ({ id, image, name, price }) => {
	// Define the ProductItem component with id, image, name, and price as props
	const { currency } = useContext(ShopContext); // Destructure currency from ShopContext

	return (
		<Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
			{' '}
			{/* Link to the product detail page */}
			<div className="overflow-hidden">
				<img
					className="hover:scale-110 transition ease-in-out"
					src={image[0]}
					alt=""
				/>{' '}
				{/* Product image with hover effect */}
			</div>
			<p className="pt-3 pb-1 text-sm">{name}</p> {/* Product name */}
			<p className="text-sm font-medium">
				{currency}
				{price}
			</p>{' '}
			{/* Product price */}
		</Link>
	);
};

export default ProductItem; // Export the ProductItem component as default
