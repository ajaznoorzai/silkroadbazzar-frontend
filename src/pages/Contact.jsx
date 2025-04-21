import Title from '../components/Title'; // Import Title component
import NewsLetterBox from '../components/NewsLetterBox'; // Import NewsLetterBox component
import { MapPin, Phone, Mail, Clock } from 'lucide-react'; // Import icons from lucide-react

const Contact = () => {
	// Cloudinary optimization parameters
	const cloudinaryBaseUrl =
		'https://res.cloudinary.com/dyj3rywju/image/upload/';
	const optimizationParams = [
		'f_auto', // Automatic format selection
		'q_auto', // Automatic quality selection
		'w_480', // Set width to 480 pixels
		'dpr_auto', // Automatic device pixel ratio
		'c_fill', // Fill mode for cropping
		'g_center', // Center gravity for cropping
	].join(',');

	const contactImageUrl = `${cloudinaryBaseUrl}${optimizationParams}/v1740632698/contact_yxihtg.avif`; // Construct the optimized image URL

	return (
		<div>
			<div className="text-center text-2xl pt-10 border-t">
				<Title text1={'CONTACT'} text2={'US'} />{' '}
				{/* Render the Title component with text */}
			</div>
			<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
				<img
					src={contactImageUrl} // Set the source of the image
					className="w-full md:max-w-[480px] rounded-2xl"
					alt="Fresh produce delivery"
					loading="eager" // Set loading priority
					width="480" // Set width attribute
					height="360" // Set height attribute
					fetchPriority="high" // Set fetch priority
					sizes="(max-width: 768px) 100vw, 480px" // Set sizes attribute for responsive images
				/>
				<div className="flex flex-col justify-center items-start gap-8">
					<div>
						<p className="font-semibold text-xl text-gray-800 mb-4">
							Get In Touch
						</p>
						<p className="text-gray-600 max-w-md">
							Have questions about our products or delivery? We&apos;re here to
							help you get the freshest produce for your family.
						</p>
					</div>

					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-3 text-gray-600">
							<MapPin className="text-primary" size={20} />{' '}
							{/* Render MapPin icon */}
							<p>
								123 Fresh Market Lane
								<br />
								Garden District, Green City 12345
							</p>
						</div>

						<div className="flex items-center gap-3 text-gray-600">
							<Phone className="text-primary" size={20} />{' '}
							{/* Render Phone icon */}
							<p>+1 (555) 123-4567</p>
						</div>

						<div className="flex items-center gap-3 text-gray-600">
							<Mail className="text-primary" size={20} />{' '}
							{/* Render Mail icon */}
							<p>support@FreshDel.com</p>
						</div>

						<div className="flex items-center gap-3 text-gray-600">
							<Clock className="text-primary" size={20} />{' '}
							{/* Render Clock icon */}
							<p>
								Mon - Sat: 8:00 AM - 8:00 PM
								<br />
								Sunday: 9:00 AM - 6:00 PM
							</p>
						</div>
					</div>

					<div className="mt-4">
						<p className="font-semibold text-xl text-gray-800 mb-4">
							Join Our Team
						</p>
						<p className="text-gray-600 mb-6">
							Passionate about fresh produce and customer service? We&apos;re
							always looking for dedicated team members!
						</p>
						<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
							View Openings
						</button>
					</div>
				</div>
			</div>
			<NewsLetterBox /> {/* Render the NewsLetterBox component */}
		</div>
	);
};

export default Contact;
