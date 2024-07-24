import { Link } from 'react-router-dom';
import PICTURES from '../assets/pictures.js';
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp } from '../utilities/supabase-apiCalls.js';
import { useUserStoreSelectors } from '../stores/user-store.js';

const EmailSignUp = () => {
  const userEmail = useUserStoreSelectors.use.userEmail();
  const updateUserEmail = useUserStoreSelectors.use.updateUserEmail();
  const userPassword = useUserStoreSelectors.use.userPassword();
  const updateUserPassword = useUserStoreSelectors.use.updateUserPassword();
  const userFullName = useUserStoreSelectors.use.userFullName();
  const updateUserFullName = useUserStoreSelectors.use.updateUserFullName();
  const username = useUserStoreSelectors.use.username();
  const updateUsername = useUserStoreSelectors.use.updateUsername();
  // State for show password button
  const showPassword = useUserStoreSelectors.use.showPassword();
  const updateShowPassword = useUserStoreSelectors.use.updateShowPassword();

  return (
    <div id='emailSignUp-container' className='mt-1 scale-90'>
      {/* Logo and Email log in container */}
      <div className='mx-auto flex w-[350px] flex-col justify-start gap-4 border p-5'>
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
          <input
            type='text'
            value={userFullName}
            onChange={({ target }) => updateUserFullName(target.value)}
            required
            aria-required='true'
            placeholder='Full Name'
            className='rounded-md bg-zinc-900 p-2 focus:outline-none'
          ></input>
          <input
            type='text'
            value={username}
            onChange={({ target }) => updateUsername(target.value)}
            required
            aria-required='true'
            placeholder='Username'
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
