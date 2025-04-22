import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';

const Signup = () => {
  const {checkUserStatus} = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    latitude: '',
    longitude: '',
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
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/create`, formData, {withCredentials: true})
    .then(res => {
      checkUserStatus();
      navigate('/');
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200 lg:pt-18 md:pt-17 pt-16 px-2 sm:px-4 lg:px-6">
      <div className="max-w-md w-full space-y-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center md:text-3xl sm:text-[25px] text-[20px] font-extrabold text-red-800">
            Create your MealZaar account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to explore healthy meal plans
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmission}>
          <div className="space-y-4">
            {/* Full Name and Phone Number Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email and Password Row */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Full Address */}
            <div>
              <label htmlFor="address" className="sr-only">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Latitude and Longitude Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="sr-only">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  required
                  className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="longitude" className="sr-only">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  required
                  className="shadow-xl relative block w-full px-3 py-2 placeholder-gray-500 outline-none hover:placeholder:text-red-700 sm:text-sm transition-colors duration-200"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="outline-none cursor-pointer relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-white hover:text-red-600 border hover:border-red-600 transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-red-600 hover:bg-red-600 hover:text-white text-sm font-medium rounded-md text-red-600 bg-white focus:outline-none transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
