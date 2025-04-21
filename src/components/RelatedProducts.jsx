import React, { useContext, useEffect, useState } from 'react'; // Import React and necessary hooks
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext to access global state
import Title from './Title'; // Import the Title component
import ProductItem from './ProductItem'; // Import the ProductItem component

const RelatedProducts = ({ category, subCategory }) => {
	// Define the RelatedProducts component with category and subCategory as props
	const { products } = useContext(ShopContext); // Destructure products from ShopContext
	const [related, setRelated] = useState([]); // Initialize related state as an empty array

	useEffect(() => {
		if (products.length > 0) {
			let productsCopy = products.slice(); // Create a copy of products array

			productsCopy = productsCopy.filter((item) => category === item.category); // Filter products by category
			productsCopy = productsCopy.filter(
				(item) => subCategory === item.subCategory
			); // Filter products by subCategory

			setRelated(productsCopy.slice(1, 6)); // Set related state with the top 5 related products
		}
	}, [products]); // Dependency array to re-run the effect when products change

	return (
		<div className="my-24">
			<div className="text-center text-3xl py-2 ">
				<Title text1={'RELATED'} text2={'PRODUCTS'} />{' '}
				{/* Render the Title component with text */}
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
				{related.map((item, index) => (
					<ProductItem
						key={index}
						id={item._id}
						name={item.name}
						price={item.price}
						image={item.image}
					/> // Render ProductItem for each related product
				))}
			</div>
		</div>
	);
};

export default RelatedProducts; // Export the RelatedProducts component as default
