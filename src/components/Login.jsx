import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';

const Login = () => {
  const {checkUserStatus} = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmission = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, formData, {withCredentials: true})
    .then(res => {
      checkUserStatus();
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    //entire page
    <div className="min-h-screen flex items-center justify-center bg-neutral-200 lg:pt-18 md:pt-17 pt-16 px-4 sm:px-6 lg:px-8">
      {/* Only component inside the page */}
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center sm:text-3xl text-[25px] font-extrabold text-red-800">
            Welcome to MealZaar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to continue subscribing meal plans
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmission}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="outline-none cursor-pointer relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-white hover:text-red-600 border hover:border-red-600 transition-colors duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                New to MealZaar?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/signup')}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-red-600 hover:bg-red-600 hover:text-white text-sm font-medium rounded-md text-red-600 bg-white focus:outline-none transition-colors duration-200"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 