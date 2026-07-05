import { Outlet } from 'react-router';
import { AppLayout } from './AppLayout';


const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AppRoot;