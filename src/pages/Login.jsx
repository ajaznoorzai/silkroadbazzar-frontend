import { useContext, useEffect, useState } from 'react'; // Importing necessary hooks from React
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext from context
import axios from 'axios'; // Importing axios for HTTP requests
import { toast } from 'react-toastify'; // Importing toast for notifications
import { ArrowRight } from 'lucide-react'; // Importing ArrowRight icon

const Login = () => {
	const [currentState, setCurrentState] = useState('Login'); // State to manage current form state (Login/Sign up)
	const { token, setToken, navigate, backendUrl } = useContext(ShopContext); // Destructuring values from ShopContext

	const [name, setName] = useState(''); // State to hold name
	const [password, setPassword] = useState(''); // State to hold password
	const [email, setEmail] = useState(''); // State to hold email

	// Function to handle form submission
	const onSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			if (currentState === 'Sign up') {
				const response = await axios.post(backendUrl + '/api/user/register', {
					name,
					email,
					password,
				}); // Register user

				if (response.data.success) {
					setToken(response.data.token); // Set token
					localStorage.setItem('token', response.data.token); // Save token to local storage
					toast.success('Account created successfully!'); // Show success message
				} else {
					toast.error(response.data.message); // Show error message
				}
			} else {
				const response = await axios.post(backendUrl + '/api/user/login', {
					email,
					password,
				}); // Login user

				if (response.data.success) {
					setToken(response.data.token); // Set token
					localStorage.setItem('token', response.data.token); // Save token to local storage
					toast.success('Welcome back!'); // Show success message
				} else {
					toast.error(response.data.message); // Show error message
				}
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message); // Show error message
		}
	};

	useEffect(() => {
		if (token) {
			navigate('/'); // Navigate to home if token exists
		}
	}, [token]);

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						{currentState === 'Login' ? 'Welcome Back!' : 'Create Account'}{' '}
						{/* Form title */}
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						{currentState === 'Login'
							? 'Sign in to access fresh produce'
							: 'Join us for farm-fresh vegetables & fruits'}{' '}
						{/* Form subtitle */}
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
					<div className="rounded-md shadow-sm space-y-4">
						{currentState === 'Sign up' && (
							<div>
								<label htmlFor="name" className="sr-only">
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
									placeholder="Full Name"
								/>
							</div>
						)}
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							{currentState === 'Login' ? (
								<button
									type="button"
									onClick={() => setCurrentState('Sign up')}
									className="font-medium text-primary hover:text-primary-dark"
								>
									Create new account
								</button>
							) : (
								<button
									type="button"
									onClick={() => setCurrentState('Login')}
									className="font-medium text-primary hover:text-primary-dark"
								>
									Already have an account?
								</button>
							)}
						</div>
						{currentState === 'Login' && (
							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-primary hover:text-primary-dark"
								>
									Forgot password?
								</a>
							</div>
						)}
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<ArrowRight className="h-5 w-5 text-white" aria-hidden="true" />
							</span>
							{currentState === 'Login' ? 'Sign in' : 'Create Account'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
