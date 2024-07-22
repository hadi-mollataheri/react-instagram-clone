import PICTURES from '../../assets/pictures.js';
import { Button } from '@chakra-ui/react';
import { useAuthStoreSelectors } from '../../stores/authStore.js';
import { Eye, EyeSlash } from '@phosphor-icons/react';
function AuthForm() {
  // State for email input element
  const emailInput = useAuthStoreSelectors.use.emailInput();
  {
    console.log('emailInput:', emailInput);
  }
  // updateEmailInput is a handler for input that updates the emailInput state
  const updateEmailInput = useAuthStoreSelectors.use.updateEmailInput();
  // State for password input element
  const passwordInput = useAuthStoreSelectors.use.passwordInput();
  // updatePasswordInput is a handler for input that updates the passwordInput state
  const updatePasswordInput = useAuthStoreSelectors.use.updatePasswordInput();
  const showPassword = useAuthStoreSelectors.use.showPassword();
  const updateShowPassword = useAuthStoreSelectors.use.updateShowPassword();

  return (
    <div className='scale-90'>
      <div className='flex w-[350px] flex-col justify-start gap-4 border p-5'>
        {/* Instagram logo */}
        <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
        {/* Email log in */}
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
            {showPassword ? <EyeSlash size={30} /> : <Eye size={30} />}
          </button>
        </div>
        <Button colorScheme='blue' size='md' fontWeight={600}>
          Log in
        </Button>
        <hr className='my-7 overflow-visible bg-slate-400 text-center after:relative after:-top-[13px] after:bg-black after:px-3 after:content-["OR"]' />
        {/* Google log in */}
        <div className='flex items-center justify-center gap-3'>
          <img
            src={PICTURES.google}
            alt='Google logo'
            className='h-[30px] w-[30px]'
          />
          <a href='#' className='text-blue-500'>
            Log in with Google
          </a>
        </div>
      </div>
      {/* Sign up */}
      <div className='my-4 border p-5 text-center'>
        <p>
          Don&apos;t have an account?{' '}
          <a href='#' className='text-blue-500'>
            Sign up
          </a>
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
