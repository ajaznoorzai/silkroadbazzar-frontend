import { useEffect, useState, useContext } from 'react'; // Import necessary hooks from React
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext to access global state
import Title from './Title'; // Import the Title component
import ProductItem from './ProductItem'; // Import the ProductItem component

const BestSeller = () => {
	const { products } = useContext(ShopContext); // Destructure products from ShopContext
	const [bestSeller, setBestSeller] = useState([]); // Initialize bestSeller state as an empty array

	useEffect(() => {
		const bestProduct = products.filter((item) => item.bestseller); // Filter products to get only bestsellers
		setBestSeller(bestProduct.slice(0, 5)); // Set bestSeller state with the top 5 bestsellers
	}, [products]); // Dependency array to re-run the effect when products change

	return (
		<div className="my-10">
			<div className="text-center text-3xl py-8">
				<Title text1={'BEST'} text2={'SELLERS'} />{' '}
				{/* Render the Title component with text */}
				<p className="w-3/4 m-auto text-xs sm:text-sm md:test-base text-gray-600">
					These Items Are Selling Faster, Grab Your's Before The Stock Ends...!
				</p>
			</div>

			<div className="grid grid-cols2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
				{bestSeller.map((item, index) => (
					<ProductItem
						key={index}
						id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
					/> // Render ProductItem for each bestseller
				))}
			</div>
		</div>
	);
};

export default BestSeller; // Export the BestSeller component as default
