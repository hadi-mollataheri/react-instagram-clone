import { Link } from 'react-router-dom';
import PICTURES from '../../assets/pictures.js';
import { Button } from '@chakra-ui/react';
import { useUserStoreSelectors } from '../../stores/user-store.js';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp } from '../../utilities/supabase-apiCalls.js';

function AuthForm() {
  // State for email input element
  const userEmail = useUserStoreSelectors.use.userEmail();
  // updateEmailInput is a handler for input that updates the emailInput state
  const updateUserEmail = useUserStoreSelectors.use.updateUserEmail();
  // State for password input element
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
        {/* Email log in */}
        <form onSubmit={() => {}} className='flex flex-col justify-start gap-4'>
          <input
            type='email'
            value={userEmail}
            onChange={({ target }) => updateUserEmail(target.value)}
            required
            aria-required='true'
            placeholder='Email'
            className='rounded-md bg-zinc-900 p-2 focus:outline-none'
          ></input>
          <div
            id='password-field'
            className='flex items-center justify-between rounded-md bg-zinc-900'
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={userPassword}
              onChange={({ target }) => updateUserPassword(target.value)}
              aria-label='Password'
              required
              aria-required='true'
              placeholder='Password'
              className='w-full rounded-l-md bg-zinc-900 p-2 focus:outline-none'
            ></input>
            <button
              onClick={updateShowPassword}
              className='rounded-r-md bg-zinc-900 pr-2'
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            aria-label='submit'
            colorScheme='blue'
            size='md'
            fontWeight={600}
          >
            Log in
          </Button>
        </form>
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

export default AuthForm;
