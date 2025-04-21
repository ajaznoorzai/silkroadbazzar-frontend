import React, { useContext } from 'react'; // Import React and useContext hook
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext to access global state
import { assets } from '../assets/assets'; // Import assets for icons

const SearchBar = () => {
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopContext); // Destructure state and functions from ShopContext

	return showSearch ? ( // Conditional rendering based on showSearch state
		<div className="border-t border-b bg-gray-50 text-center ">
			<div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 outline-none bg-inherit text-sm"
					type="text"
					placeholder="Search"
				/>{' '}
				{/* Input field for search */}
				<img className="w-4" src={assets.search_icon} alt="" />{' '}
				{/* Search icon */}
			</div>
			<img
				onClick={() => setShowSearch(false)}
				className="inline w-4 cursor-pointer"
				src={assets.cross_icon}
				alt=""
			/>{' '}
			{/* Cross icon to close search bar */}
		</div>
	) : null; // Return null if showSearch is false
};

export default SearchBar; // Export the SearchBar component as default
