import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route components from react-router-dom
import Home from './pages/Home'; // Importing Home component
import Collection from './pages/Collection'; // Importing Collection component
import About from './pages/About'; // Importing About component
import Contact from './pages/Contact'; // Importing Contact component
import Product from './pages/Product'; // Importing Product component
import Cart from './pages/Cart'; // Importing Cart component
import Login from './pages/Login'; // Importing Login component
import PlaceOrder from './pages/PlaceOrder'; // Importing PlaceOrder component
import Orders from './pages/Orders'; // Importing Orders component
import NavBar from './components/Navbar'; // Importing NavBar component
import Footer from './components/Footer'; // Importing Footer component
import SearchBar from './components/SearchBar'; // Importing SearchBar component
import { ToastContainer } from 'react-toastify'; // Importing ToastContainer from react-toastify
import Verify from './pages/Verify'; // Importing Verify component

const App = () => {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			{' '}
			{/* Container div with padding */}
			<ToastContainer position="bottom-right" autoClose={2000} />{' '}
			{/* ToastContainer for notifications */}
			<NavBar /> {/* NavBar component */}
			<SearchBar /> {/* SearchBar component */}
			<Routes>
				<Route path="/" element={<Home />} /> {/* Route for Home page */}
				<Route path="/collection" element={<Collection />} />{' '}
				{/* Route for Collection page */}
				<Route path="/about" element={<About />} /> {/* Route for About page */}
				<Route path="/contact" element={<Contact />} />{' '}
				{/* Route for Contact page */}
				<Route path="/product/:productId" element={<Product />} />{' '}
				{/* Route for Product page with productId parameter */}
				<Route path="/cart" element={<Cart />} /> {/* Route for Cart page */}
				<Route path="/login" element={<Login />} /> {/* Route for Login page */}
				<Route path="/place-order" element={<PlaceOrder />} />{' '}
				{/* Route for PlaceOrder page */}
				<Route path="/orders" element={<Orders />} />{' '}
				{/* Route for Orders page */}
				<Route path="/verify" element={<Verify />} />{' '}
				{/* Route for Verify page */}
			</Routes>
			<Footer /> {/* Footer component */}
		</div>
	);
};

export default App; // Exporting App component
