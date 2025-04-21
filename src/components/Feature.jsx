const Feature = () => {
	return (
		<section className="py-12 ">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							title: 'Fresh from Farm',
							description:
								'Direct from local farmers to ensure maximum freshness',
						},
						{
							title: 'Free Delivery',
							description: 'Free delivery on orders above $50 in your area',
						},
						{
							title: 'Quality Guarantee',
							description: '100% satisfaction guaranteed or your money back',
						},
					].map((feature, index) => (
						<div
							key={index}
							className="p-6 bg-secondary/30 rounded-xl shadow-sm animate-fade-up"
							style={{ animationDelay: `${0.1 * (index + 1)}s` }}
						>
							<h3 className="font-display text-xl font-semibold text-primary">
								{feature.title}
							</h3>
							<p className="mt-2 text-gray-600">{feature.description}</p>{' '}
							{/* Display each feature with title and description */}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Feature; // Export the Feature component as default
