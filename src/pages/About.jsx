import Title from '../components/Title'; // Importing the Title component
import NewsLetterBox from '../components/NewsLetterBox'; // Importing the NewsLetterBox component

const About = () => {
	// Cloudinary optimization parameters
	const cloudinaryBaseUrl =
		'https://res.cloudinary.com/dyj3rywju/image/upload/'; // Base URL for Cloudinary images
	const optimizationParams = [
		'f_auto', // Automatically select the best format
		'q_auto', // Automatically select the best quality
		'w_450', // Set the width to 450 pixels
		'dpr_auto', // Automatically adjust the device pixel ratio
		'c_fill', // Fill the image to the specified dimensions
		'g_center', // Center the image
	].join(','); // Join the parameters with commas

	const aboutImageUrl = `${cloudinaryBaseUrl}${optimizationParams}/v1740632706/about_aom5tc.avif`; // Construct the full image URL

	return (
		<div>
			<div className="text-2xl text-center pt-8 border-t">
				<Title text1={'ABOUT'} text2={'US'} />{' '}
				{/* Render the Title component with text "ABOUT US" */}
			</div>

			<div className="my-10 flex flex-col md:flex-row gap-16">
				<img
					src={aboutImageUrl} // Image URL
					className="w-full md:max-w-[450px] rounded-2xl" // CSS classes for styling
					alt="Organic farming" // Alt text for the image
					loading="eager" // Load the image eagerly
					width="450" // Set the width attribute
					height="338" // Set the height attribute
					fetchPriority="high" // Set the fetch priority to high
					sizes="(max-width: 768px) 100vw, 450px" // Set the sizes attribute for responsive images
				/>
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p>
						Welcome to FreshDel, your trusted source for farm-fresh vegetables
						and fruits! We&apos;re more than just an online grocery store –
						we&apos;re your direct connection to local farmers and fresh,
						organic produce. At FreshDel, our mission is to make healthy eating
						accessible by delivering nature&apos;s best directly to your
						doorstep.
					</p>{' '}
					{/* Paragraph about FreshDel */}
					<p>
						We carefully select each fruit and vegetable, partnering with local
						farmers who share our commitment to sustainable and organic farming
						practices. Every item in your basket is handpicked at peak ripeness,
						ensuring you receive the freshest, most nutritious produce possible.
					</p>{' '}
					{/* Paragraph about their selection process */}
					<b className="text-gray-800">Our Mission</b>{' '}
					{/* Bold text for "Our Mission" */}
					<p>
						At FreshDel, we&apos;re committed to revolutionizing how you access
						fresh produce. We believe everyone deserves access to farm-fresh
						fruits and vegetables without compromising on quality or
						convenience. By connecting consumers directly with local farmers,
						we&apos;re creating a sustainable food system that benefits both our
						customers and our agricultural community.
					</p>{' '}
					{/* Paragraph about their mission */}
				</div>
			</div>

			<div className="text-xl py-4">
				<Title text1={'WHY'} text2={'CHOOSE US'} />{' '}
				{/* Render the Title component with text "WHY CHOOSE US" */}
			</div>
			<div className="flex flex-col md:flex-row text-sm mb-20">
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50">
					<b>Farm Fresh Quality</b> {/* Bold text for "Farm Fresh Quality" */}
					<p className="text-gray-600">
						We partner with local farmers to bring you the freshest seasonal
						produce. Our fruits and vegetables are harvested at peak ripeness
						and delivered straight to your door, ensuring maximum freshness and
						nutritional value.
					</p>{' '}
					{/* Paragraph about farm fresh quality */}
				</div>

				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50">
					<b>Same Day Delivery</b> {/* Bold text for "Same Day Delivery" */}
					<p className="text-gray-600">
						Order before noon for same-day delivery! Our efficient delivery
						system ensures your fresh produce arrives at your doorstep within
						hours of harvest, maintaining its farm-fresh quality.
					</p>{' '}
					{/* Paragraph about same day delivery */}
				</div>

				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 hover:bg-gray-50">
					<b>100% Organic & Natural</b>{' '}
					{/* Bold text for "100% Organic & Natural" */}
					<p className="text-gray-600">
						We guarantee that all our produce is 100% organic and naturally
						grown. No pesticides, no artificial ripening – just pure, natural
						goodness from the farm to your table.
					</p>
				</div>
			</div>

			<NewsLetterBox />
		</div>
	);
};

export default About;
