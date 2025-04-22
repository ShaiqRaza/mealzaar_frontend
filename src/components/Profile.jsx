import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserAuth } from '../context/UserAuthContext';

const Profile = () => {
  const { user } = useUserAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/subscriptions/user/${user.id}`
        );
        setSubscriptions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to fetch subscriptions');
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">Please log in to view your profile</div>
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
    <div className="min-h-screen bg-neutral-100 py-8 px-4 sm:px-6 lg:px-8 lg:pt-22 md:pt-20 pt-18">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-800 mb-8">My Profile</h1>

        {/* User Details Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-3xl text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {user.phone || 'Phone number not provided'}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.address || 'Address not provided'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Subscriptions</h2>
        <div className="space-y-6">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {subscription.plan.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {subscription.kitchen.name} Kitchen
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-600">
                        Rs. {subscription.plan.price}
                      </span>
                      <span className="block text-gray-500">per month</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Meal Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subscription.plan.schedule.map((meal, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">You haven't subscribed to any plans yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 