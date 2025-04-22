import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router';


const Header = () => {
  const navigate = useNavigate();
  const {user}  = useUserAuth();

  return (
    <header className={`lg:h-18 md:h-17 h-16 font-bold fixed flex justify-between items-center top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-10 bg-gradient-to-b from-red-800 to-red-900 shadow-red-950 shadow-md text-white`}>
          <div className={`text-2xl`}>Mealzaar</div>

          <div className="flex items-center 2xl:space-x-14 lg:space-x-12 md:space-x-10 sm:space-x-8 space-x-6">
            <button className='hover:text-orange-300 cursor-pointer' onClick={() => navigate('/')}>Home</button>
            <button className='hover:text-orange-300 cursor-pointer' onClick={() => navigate('/about')}>About</button>
            {
                user ? 
                <button className='hover:text-orange-300 cursor-pointer' onClick={() => navigate('/profile')}>Profile</button> : 
                <button className='hover:text-orange-300 cursor-pointer' onClick={() => navigate('/login')}> Login </button>
            }
          </div>
    </header>
  );
};

export default Header; 