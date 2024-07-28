import { Link } from 'react-router-dom';
import PICTURES from '../assets/pictures.js';
import SignUpForm from '../components/SignUp/SignUpForm.jsx';
import { useUserStoreSelectors } from '../stores/user-store.js';
// import { handleSignUp } from '../utilities/supabase-apiCalls.js';

const EmailSignUp = () => {
  const userEmail = useUserStoreSelectors.use.userEmail();
  const updateUserEmail = useUserStoreSelectors.use.updateUserEmail();
  const userFullName = useUserStoreSelectors.use.userFullName();
  const updateUserFullName = useUserStoreSelectors.use.updateUserFullName();
  const username = useUserStoreSelectors.use.username();
  const updateUsername = useUserStoreSelectors.use.updateUsername();
  const userPassword = useUserStoreSelectors.use.userPassword();
  const updateUserPassword = useUserStoreSelectors.use.updateUserPassword();
  const showPassword = useUserStoreSelectors.use.showPassword();
  const updateShowPassword = useUserStoreSelectors.use.updateShowPassword();

  return (
    <div id='emailSignUp-container' className='mt-1 min-h-screen scale-90'>
      {/* Logo and Email log in container */}
      <div className='relative -top-6 mx-auto flex w-[350px] flex-col justify-start gap-4 border p-5'>
        {/* Instagram logo */}
        <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
        {/* Email sign up form */}
        <SignUpForm
          userEmail={userEmail}
          updateUserEmail={updateUserEmail}
          userFullName={userFullName}
          updateUserFullName={updateUserFullName}
          username={username}
          updateUsername={updateUsername}
          userPassword={userPassword}
          updateUserPassword={updateUserPassword}
          showPassword={showPassword}
          updateShowPassword={updateShowPassword}
        />
      </div>
      {/* Log in */}
      <div className='mx-auto my-4 w-[350px] border p-5 text-center'>
        <p>
          Have an account?{' '}
          <Link to='/emailSignUp' className='text-blue-500'>
            Log in
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
};

export default EmailSignUp;
