import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const KitchenDetails = () => {
  const { id } = useParams();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const kitchen = location.state; // Get the kitchen data from navigation state
  const { user } = useUserAuth();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plans/kitchen/${id}`);
        setPlans(response.data);
        setLoading(false);
      } catch (err) {
        console.log("error", err);
        setError('Failed to fetch meal plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, [id]);

  const handleSubscribe = async (planId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setSubscriptionStatus(prev => ({ ...prev, [planId]: 'subscribing' }));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subscribe/${user.id}/${planId}`
      );
      
      if (response.data.success) {
        setSubscriptionStatus(prev => ({ ...prev, [planId]: 'subscribed' }));
        // You can add a success message or redirect to a success page
        alert('Successfully subscribed to the plan!');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setSubscriptionStatus(prev => ({ ...prev, [planId]: 'error' }));
      alert('Failed to subscribe. Please try again.');
    }
  };

  if (!kitchen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">Kitchen data not found</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-red-600 hover:text-red-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Kitchens
        </button>

        {/* Kitchen Details Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={kitchen.profile_image_url}
              alt={kitchen.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                kitchen.status === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {kitchen.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{kitchen.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {kitchen.address}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {kitchen.phone}
                </div>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600">
                  {kitchen.rating > 0 ? kitchen.rating.toFixed(1) : 'No ratings yet'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Plans Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Meal Plans</h2>
        <div className="space-y-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-red-600">Rs. {plan.price}</span>
                    <span className="block text-gray-500">per month</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h4>
                  
                  {plan.schedule.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {plan.schedule.map((meal, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">{meal.name}</span>
                            <span className="text-red-600 font-semibold">Rs. {meal.price}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {meal.day}
                            <span className="mx-2">•</span>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(meal.timing).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No meals scheduled for this plan</p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={subscriptionStatus[plan.id] === 'subscribing'}
                    className={`w-full py-3 px-4 rounded-md font-semibold transition-colors duration-200 ${
                      subscriptionStatus[plan.id] === 'subscribed'
                        ? 'bg-green-600 text-white'
                        : subscriptionStatus[plan.id] === 'subscribing'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {subscriptionStatus[plan.id] === 'subscribed'
                      ? 'Subscribed'
                      : subscriptionStatus[plan.id] === 'subscribing'
                      ? 'Subscribing...'
                      : 'Subscribe to Plan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenDetails; 