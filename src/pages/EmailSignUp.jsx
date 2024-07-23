import { Link } from 'react-router-dom';
import PICTURES from '../assets/pictures.js';
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp } from '../utilities/supabase-apiCalls.js';
import { useAuthStoreSelectors } from '../stores/authStore.js';

const EmailSignUp = () => {
  // State for email input element
  const emailInput = useAuthStoreSelectors.use.emailInput();
  // updateEmailInput is a handler for input that updates the emailInput state
  const updateEmailInput = useAuthStoreSelectors.use.updateEmailInput();
  // State for password input element
  const passwordInput = useAuthStoreSelectors.use.passwordInput();
  // updatePasswordInput is a handler for input that updates the passwordInput state
  const updatePasswordInput = useAuthStoreSelectors.use.updatePasswordInput();
  const showPassword = useAuthStoreSelectors.use.showPassword();
  const updateShowPassword = useAuthStoreSelectors.use.updateShowPassword();

  return (
    <div id='emailSignUp-container' className='scale-90 flex-col'>
      {/* Logo and Email log in container */}
      <div className='mx-auto flex w-[350px] flex-col justify-start gap-4 border p-5'>
        {/* Instagram logo */}
        <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
        {/* Email log in */}
        <form onSubmit={() => {}} className='flex flex-col justify-start gap-4'>
          <input
            type='email'
            value={emailInput}
            onChange={({ target }) => updateEmailInput(target.value)}
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
              value={passwordInput}
              onChange={({ target }) => updatePasswordInput(target.value)}
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
            Sign up
          </Button>
        </form>
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
