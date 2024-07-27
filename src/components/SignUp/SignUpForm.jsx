/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const SignUpForm = (props) => {
  const {
    userEmail,
    updateUserEmail,
    userFullName,
    updateUserFullName,
    username,
    updateUsername,
    userPassword,
    updateUserPassword,
    showPassword,
    updateShowPassword,
  } = props;
  return (
    <form className='flex flex-col justify-start gap-4'>
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
      <Button aria-label='submit' colorScheme='blue' size='md' fontWeight={600}>
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
