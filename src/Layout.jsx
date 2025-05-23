import { Outlet } from 'react-router-dom';
import {Header} from './components/index.js';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout; 