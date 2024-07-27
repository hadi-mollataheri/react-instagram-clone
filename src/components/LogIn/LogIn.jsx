import { Link } from 'react-router-dom';
import LogInForm from './LogInForm.jsx';
import PICTURES from '../../assets/pictures.js';
import { useUserStoreSelectors } from '../../stores/user-store.js';
// import { handleSignUp } from '../../utilities/supabase-apiCalls.js';

function LogIn() {
  // State for email input element
  const userEmail = useUserStoreSelectors.use.userEmail();
  // updateEmailInput is a handler for input that updates the emailInput state
  const updateUserEmail = useUserStoreSelectors.use.updateUserEmail();
  const userPassword = useUserStoreSelectors.use.userPassword();
  // updatePasswordInput is a handler for input that updates the passwordInput state
  const updateUserPassword = useUserStoreSelectors.use.updateUserPassword();
  // State for show password button
  const showPassword = useUserStoreSelectors.use.showPassword();
  const updateShowPassword = useUserStoreSelectors.use.updateShowPassword();

  return (
    <div id='authPage-container' className='scale-90'>
      {/* Logo and Email log in container */}
      <div className='flex w-[350px] flex-col justify-start gap-4 border p-5'>
        {/* Instagram logo */}
        <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
        {/* Email log in form */}
        <LogInForm
          userEmail={userEmail}
          updateUserEmail={updateUserEmail}
          userPassword={userPassword}
          updateUserPassword={updateUserPassword}
          showPassword={showPassword}
          updateShowPassword={updateShowPassword}
        />
        <hr className='my-7 overflow-visible bg-slate-400 text-center after:relative after:-top-[13px] after:bg-black after:px-3 after:content-["OR"]' />
        {/* Google log in */}
        <div className='flex items-center justify-center gap-3'>
          <img
            src={PICTURES.google}
            alt='Google logo'
            className='h-[30px] w-[30px]'
          />
          <Link href='#' className='text-blue-500'>
            Log in with Google
          </Link>
        </div>
      </div>
      {/* Sign up */}
      <div className='my-4 border p-5 text-center'>
        <p>
          Don&apos;t have an account?{' '}
          <Link to='/emailSignUp' className='text-blue-500'>
            Sign up
          </Link>
        </p>
      </div>
      {/* Download app */}
      <p className='pb-4 text-center'>Get the app.</p>
      <div className='flex items-center justify-center gap-1'>
        <img
          src={PICTURES.playStore}
          alt='Google play store'
          className='h-[40px] w-[134px] object-contain'
        />
        <img
          src={PICTURES.microsoft}
          alt='Google play store'
          className='h-[40px] w-[134px] object-contain'
        />
      </div>
    </div>
  );
}

export default LogIn;
