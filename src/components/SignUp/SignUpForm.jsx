/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp, getProfile } from '../../utilities/supabase-apiCalls';
import { useUserStoreSelectors } from '../../stores/user-store';

const SignUpForm = () => {
  const user = useUserStoreSelectors.use.user();
  const updateUser = useUserStoreSelectors.use.updateUser();
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

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    if (user) {
      alert('You already signed up');
      return;
    } else {
      console.log('Calling handleSignUp...');

      try {
        const newUser = await handleSignUp(
          userEmail,
          userPassword,
          userFullName,
          username,
        );
        // Update user state and inform the user
        if (newUser) {
          updateUser(newUser);
          alert(' Sign up successfully!');

          // const updatedProfile = await getProfile(newUser);
          // console.log('Updated Profile:', updatedProfile);
        }
      } catch (error) {
        alert('An error occurred during sign up. Please try again.');
        console.error(
          'Error during sign up or profile update process in SignUpForm:',
          error,
        );
      }
    }
  };

  return (
    <div className='flex flex-col justify-start gap-4'>
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
        {/* Show password icon */}
        <div
          onClick={() => updateShowPassword(!showPassword)}
          className='rounded-r-md bg-zinc-900 pr-2'
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
        onClick={handleSignUpClick}
        colorScheme='blue'
        size='md'
        fontWeight={600}
      >
        Sign up
      </Button>
    </div>
  );
};

export default SignUpForm;
