import { useUserAuth } from '../context/UserAuthContext';
import { red1, red2, white1, black1 } from '../utils/colors.js';

const Header = () => {
  const user  = useUserAuth();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-800 to-red-900 shadow-md text-white`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div 
            className={`text-${red1} text-2xl font-bold cursor-pointer hover:text-${red2} transition-colors duration-200`}
          >
            MealZaar
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                className={`px-4 py-2 rounded-md bg-${red1} text-${white1} hover:bg-${red2} transition-colors duration-200`}
              >
                Profile
              </button>
            ) : (
              <button
                className={`px-4 py-2 rounded-md bg-${red1} text-${white1} hover:bg-${red2} transition-colors duration-200`}
              >
                Login
              </button>
            )}
          </div>
        </div>
    </header>
  );
};

export default Header; 