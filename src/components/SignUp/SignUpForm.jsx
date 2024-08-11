/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp } from '../../utilities/supabase-apiCalls';
import { useUserAuthStoreSelector } from '../../stores/userAuth-store';
import { useUserProfileStoreSelector } from '../../stores/userProfile-store';

const SignUpForm = () => {
  const user = useUserAuthStoreSelector.use.user();
  const updateUser = useUserAuthStoreSelector.use.updateUser();
  const userEmail = useUserAuthStoreSelector.use.userEmail();
  const updateUserEmail = useUserAuthStoreSelector.use.updateUserEmail();
  const userFullName = useUserProfileStoreSelector.use.userFullName();
  const updateUserFullName =
    useUserProfileStoreSelector.use.updateUserFullName();
  const username = useUserProfileStoreSelector.use.username();
  const updateUsername = useUserProfileStoreSelector.use.updateUsername();
  const userPassword = useUserAuthStoreSelector.use.userPassword();
  const updateUserPassword = useUserAuthStoreSelector.use.updateUserPassword();
  const showPassword = useUserAuthStoreSelector.use.showPassword();
  const updateShowPassword = useUserAuthStoreSelector.use.updateShowPassword();

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
        id='signUp-email-input'
        type='email'
        value={userEmail}
        onChange={({ target }) => updateUserEmail(target.value)}
        required
        aria-required='true'
        placeholder='Email'
        className='rounded-md bg-zinc-900 p-2 focus:outline-none'
      ></input>
      <input
        id='signUp-fullName-input'
        type='text'
        value={userFullName}
        onChange={({ target }) => updateUserFullName(target.value)}
        required
        aria-required='true'
        placeholder='Full Name'
        className='rounded-md bg-zinc-900 p-2 focus:outline-none'
      ></input>
      <input
        id='signUp-username-input'
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
          id='signUp-password-input'
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
