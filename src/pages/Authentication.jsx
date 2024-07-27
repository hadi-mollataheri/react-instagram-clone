import PICTURES from '../assets/pictures';
import LogIn from '../components/LogIn/LogIn';
const Authentication = () => {
  return (
    <div className='flex min-h-screen items-start justify-center gap-5'>
      {/* Instagram sample picture to the left just for big screens */}
      <img
        src={PICTURES.auth}
        alt='instagram sample page'
        className='hidden h-[680px] object-contain sm:block'
      />
      {/* Login form */}
      <LogIn />
    </div>
  );
};

export default Authentication;
