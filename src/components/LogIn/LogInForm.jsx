/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { handleLogIn } from '../../utilities/supabase-apiCalls.js';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useUserAuthStoreSelector } from '../../stores/userAuth-store.js';

const LogInForm = () => {
  const user = useUserAuthStoreSelector.use.user();
  const updateUser = useUserAuthStoreSelector.use.updateUser();
  // State for email input element
  const userEmail = useUserAuthStoreSelector.use.userEmail();
  // updateEmailInput is a handler for input that updates the emailInput state
  const updateUserEmail = useUserAuthStoreSelector.use.updateUserEmail();
  // State for user password input
  const userPassword = useUserAuthStoreSelector.use.userPassword();
  // updatePasswordInput is a handler for input that updates the passwordInput state
  const updateUserPassword = useUserAuthStoreSelector.use.updateUserPassword();
  // State for show password button
  const showPassword = useUserAuthStoreSelector.use.showPassword();
  const updateShowPassword = useUserAuthStoreSelector.use.updateShowPassword();

  const handleSubmit = async (e, userEmail, userPassword) => {
    e.preventDefault();

    console.log('Calling handleLogIn...');
    if (user) {
      alert('You are already logged in!');
      return;
    } else {
      const loggedInUser = await handleLogIn(userEmail, userPassword);
      if (loggedInUser) {
        console.log('User from log-in in LogInForm:', loggedInUser);
        updateUser(loggedInUser);
        alert('Logged In successfully!');
      }
    }
  };

  return (
    <form
      id='logIn'
      name='logIn'
      onSubmit={(e) => handleSubmit(e, userEmail, userPassword)}
      className='flex flex-col justify-start gap-4'
    >
      <input
        id='login-emailInput'
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
          id='login-passwordInput'
          type={showPassword ? 'text' : 'password'}
          value={userPassword}
          onChange={({ target }) => updateUserPassword(target.value)}
          aria-label='Password'
          required
          aria-required='true'
          placeholder='Password'
          className='w-full rounded-l-md bg-zinc-900 p-2 focus:outline-none'
        ></input>
        {/* Show password icon */}
        <div
          onClick={() => updateShowPassword(!showPassword)}
          className='cursor-pointer rounded-r-md bg-zinc-900 pr-2'
        >
          {showPassword ? (
            <span title='Hide password'>
              <EyeSlash size={20} />
            </span>
          ) : (
            <span title='Show password'>
              <Eye size={20} />
            </span>
          )}
        </div>
      </div>
      <Button
        type='submit'
        aria-label='submit'
        colorScheme='blue'
        size='md'
        fontWeight={600}
      >
        Log in
      </Button>
    </form>
  );
};

export default LogInForm;
