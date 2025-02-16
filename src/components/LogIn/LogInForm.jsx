/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { handleLogIn } from '../../utilities/supabase-apiCalls.js';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useUserAuthStoreSelector } from '../../stores/userAuth-store.js';

const LogInForm = () => {
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

  const sessionData = useUserAuthStoreSelector.use.sessionData();
  const updateSessionData = useUserAuthStoreSelector.use.updateSessionData();
  console.log('sessionData from LogInForm: ', sessionData); // TEST
  const navigate = useNavigate();

  useEffect(() => {
    const authTokenKey = 'sb-gylziklaowckktbcufys-auth-token';
    const authToken = localStorage.getItem(authTokenKey);

    if (authToken) {
      updateSessionData(authToken); // Update session data state
    }

    const sessionCheck = () => {
      if (localStorage.getItem(authTokenKey)) {
        localStorage.removeItem(authTokenKey);
        updateSessionData(null);
        window.alert('Session expired. Please log in again.');
        navigate('/logIn');
      }
    };

    // Setup interval for clearing authToken and sessionData
    const interval = setInterval(() => {
      sessionCheck();
    }, 3600000); // 1 hour in milliseconds

    // Clear the interval when the component unmounts
    //BUG: The clearInterval is probably stopping the setInterval when we are on other pages
    return () => clearInterval(interval);
  }, [navigate, updateSessionData]);

  const handleSubmit = async (e, userEmail, userPassword) => {
    e.preventDefault();
    const authTokenKey = 'sb-gylziklaowckktbcufys-auth-token';
    const prevAuthToken = localStorage.getItem(authTokenKey);
    updateSessionData(prevAuthToken);
    if (sessionData) {
      alert('You are already logged in!');
      navigate('/');
    } else {
      try {
        console.log('Calling handleLogIn...');
        const newSession = JSON.stringify(
          await handleLogIn(userEmail, userPassword),
        );
        localStorage.setItem(authTokenKey, newSession); // Update the session data with the new session
        const newAuthToken = localStorage.getItem(authTokenKey);
        // Change the value of sessionData state with newSession(newAuthToken) that it's type is JSON string
        updateSessionData(newAuthToken);
        navigate('//');
      } catch (error) {
        console.error('Error during handleLogIn:', error);
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
