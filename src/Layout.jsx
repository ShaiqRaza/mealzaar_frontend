import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout; 