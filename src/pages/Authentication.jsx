import PICTURES from '../assets/pictures';
import AuthForm from '../components/AuthForm/AuthForm';
import { Outlet } from 'react-router-dom';
const Authentication = () => {
  return (
    <div className='flex min-h-screen items-start justify-center gap-5 pb-10 pt-1'>
      {/* Instagram sample picture to the left just for big screens */}
      <img
        src={PICTURES.auth}
        alt='instagram sample page'
        className='hidden h-[680px] object-contain sm:block'
      />
      {/* Login form */}
      <AuthForm />
      <Outlet />
    </div>
  );
};

export default Authentication;
