/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { handleSignUp } from '../../utilities/supabase-apiCalls';
import { useUserAuthStoreSelector } from '../../stores/userAuth-store';
import { useUserProfileStoreSelector } from '../../stores/userProfile-store';

const SignUpForm = () => {
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
  const sessionData = useUserAuthStoreSelector.use.sessionData();

  const navigate = useNavigate();
  // TODOs:
  // Create a way to stop the user from opening this page early on when this page is going to mount.
  // Do this by checking if there is user or session, i don't know yet. I can do both with an or(||).

  useEffect(() => {
    if (sessionData) {
      navigate('/');
    }
  }, [sessionData, navigate]);

  const handleSignUpClick = async (event) => {
    event.preventDefault();

    try {
      console.log('Calling handleSignUp...');
      const { user, error } = await handleSignUp(
        userEmail,
        userPassword,
        userFullName,
        username,
      );

      if (error) {
        if (error === 'Username already taken. Please choose another one.') {
          alert(error);
        } else if (error.includes('User already registered')) {
          alert('An account with this email already exists. Please log in.');
          navigate('/login');
        } else {
          alert('An error occurred during sign up. Please try again.');
          console.error('Error during sign up:', error);
        }
      } else if (user) {
        // Update user state and inform the user
        alert(' Sign up successfully!');
        navigate('/');

        // Clear form fields
        updateUserEmail('');
        updateUserPassword('');
        updateUserFullName('');
        updateUsername('');
      }
    } catch (error) {
      console.error('Unhandled error during sign up:', error);
      alert('An unexpected error occurred. Please try again.');
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
