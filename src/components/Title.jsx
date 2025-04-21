import React from 'react'; // Import React

const Title = ({ text1, text2 }) => {
	// Define the Title component with text1 and text2 as props
	return (
		<div className="inline-flex gap-2 items-center mb-3">
			<p className="text-primary">
				{text1} <span className="text-primary font-medium">{text2}</span>
			</p>{' '}
			{/* Display the title text */}
		</div>
	);
};

export default Title; // Export the Title component as default
