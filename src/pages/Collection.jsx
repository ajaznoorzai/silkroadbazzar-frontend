import { useContext, useEffect, useState } from 'react'; // Import necessary hooks from React
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext to access global state
import { assets } from '../assets/assets'; // Import assets
import Title from '../components/Title'; // Import Title component
import ProductItem from '../components/ProductItem'; // Import ProductItem component

const Collection = () => {
	const { products, search, showSearch } = useContext(ShopContext); // Destructure products, search, and showSearch from ShopContext
	const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility
	const [filterProducts, setFilterProducts] = useState([]); // State to store filtered products
	const [category, setCategory] = useState([]); // State to store selected categories
	const [subCategory, setSubCategory] = useState([]); // State to store selected subcategories
	const [sortType, setSortType] = useState('relavent'); // State to store selected sort type

	// Function to toggle category selection
	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};

	// Function to toggle subcategory selection
	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};

	// Function to apply filters based on search, category, and subcategory
	const applyFilter = () => {
		let productsCopy = products.slice(); // Create a copy of products

		if (showSearch && search) {
			productsCopy = productsCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				category.includes(item.category)
			);
		}

		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}

		setFilterProducts(productsCopy); // Update filtered products state
	};

	// Function to sort products based on selected sort type
	const sortProduct = () => {
		let fpCopy = filterProducts.slice(); // Create a copy of filtered products

		switch (sortType) {
			case 'low-high':
				setFilterProducts(fpCopy.sort((a, b) => a.price - b.price)); // Sort by price low to high
				break;

			case 'high-low':
				setFilterProducts(fpCopy.sort((a, b) => b.price - a.price)); // Sort by price high to low
				break;

			default:
				applyFilter(); // Default to applying filters
				break;
		}
	};

	// useEffect to apply filters when category, subcategory, search, showSearch, or products change
	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showSearch, products]);

	// useEffect to sort products when sort type changes
	useEffect(() => {
		sortProduct();
	}, [sortType]);

	return (
		<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/* Filter Section */}
			<div className="min-w-60">
				<p
					onClick={() => setShowFilter(!showFilter)}
					className="my-2 text-xl flex items-center cursor-pointer gap-2"
				>
					FILTERS
					<img
						className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
						src={assets.dropdown_icon}
						alt=""
					/>
				</p>
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? '' : 'hidden'
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">CATEGORIES</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Vegetables'}
								onChange={toggleCategory}
							/>{' '}
							Vegetables
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Fruits'}
								onChange={toggleCategory}
							/>{' '}
							Fruits
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Leafy Greens'}
								onChange={toggleCategory}
							/>{' '}
							Leafy Greens
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Herbs'}
								onChange={toggleCategory}
							/>{' '}
							Herbs
						</p>
					</div>
				</div>

				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? '' : 'hidden'
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">TYPE</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Fresh'}
								onChange={toggleSubCategory}
							/>{' '}
							Fresh
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Seasonal'}
								onChange={toggleSubCategory}
							/>{' '}
							Seasonal
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Organic'}
								onChange={toggleSubCategory}
							/>{' '}
							Organic
						</p>
						<p className="flex gap-2">
							<input
								className="w-3"
								type="checkbox"
								value={'Import'}
								onChange={toggleSubCategory}
							/>{' '}
							Import
						</p>
					</div>
				</div>
			</div>

			{/* Products Section */}
			<div className="flex-1">
				<div className="flex justify-between text-base sm:text-2xl mb-4">
					<Title text1={'ALL'} text2={'PRODUCTS'} />
					<select
						onChange={(e) => setSortType(e.target.value)}
						className="border-2 border-gray-300 text-sm px-2"
					>
						<option value="relavent">Sort by: relevant</option>
						<option value="low-high">Sort by: Price low to high</option>
						<option value="high-low">Sort by: Price high to low</option>
					</select>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
					{filterProducts.map((item, index) => (
						<ProductItem
							key={index}
							name={item.name}
							id={item._id}
							price={item.price}
							image={item.image}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Collection;
