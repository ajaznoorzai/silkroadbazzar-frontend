import Hero from '../components/Hero'; // Importing Hero component
import BestSeller from '../components/BestSeller'; // Importing BestSeller component
import NewsLetterBox from '../components/NewsLetterBox'; // Importing NewsLetterBox component
import Feature from '../components/Feature'; // Importing Feature component

const Home = () => {
	return (
		<div>
			<Hero /> {/* Hero section */}
			<Feature /> {/* Feature section */}
			<BestSeller /> {/* BestSeller section */}
			<NewsLetterBox /> {/* NewsLetterBox section */}
		</div>
	);
};

export default Home;
