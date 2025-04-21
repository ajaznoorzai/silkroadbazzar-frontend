import { ArrowRight } from 'lucide-react'; // Import ArrowRight icon from lucide-react
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const Hero = () => {
	// Cloudinary optimization parameters
	const cloudinaryBaseUrl =
		'https://res.cloudinary.com/dyj3rywju/image/upload/';
	const optimizationParams = [
		'f_auto', // Automatic format selection
		'q_auto', // Automatic quality
		'w_800', // Maximum width
		'dpr_auto', // Automatic device pixel ratio
		'c_fill', // Fill mode
		'g_center', // Gravity center
	].join(',');

	const heroImageUrl = `${cloudinaryBaseUrl}${optimizationParams}/v1740632582/hero_new0nv.avif`; // Construct the optimized hero image URL

	const navigate = useNavigate(); // Initialize navigate function

	return (
		<div className="flex flex-col sm:flex-row">
			<section className="pt-24 pb-12 container">
				<div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
					<div className="flex-1 animate-fade-up">
						<span className="bg-secondary text-primary px-4 py-1 rounded-full text-sm font-medium">
							Fresh & Organic
						</span>
						<h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary leading-tight">
							Fresh Vegetables & Fruits Delivered to Your Door
						</h1>
						<p className="mt-6 text-gray-600 text-lg">
							Experience the freshness of nature with our carefully selected
							produce, delivered straight from local farms to your table.
						</p>
						<button
							onClick={() => navigate('/collection')}
							className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
						>
							Shop Now
							<ArrowRight size={20} />
						</button>{' '}
						{/* Button to navigate to the collection page */}
					</div>
					<div
						className="flex-1 relative animate-fade-up"
						style={{ animationDelay: '0.2s' }}
					>
						<img
							src={heroImageUrl}
							alt="Fresh vegetables and fruits"
							className="rounded-2xl shadow-xl"
							loading="eager" // Priority loading for hero image
							width="800"
							height="600"
							fetchPriority="high"
							sizes="(max-width: 768px) 100vw, 800px"
						/>{' '}
						{/* Hero image */}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Hero; // Export the Hero component as default
