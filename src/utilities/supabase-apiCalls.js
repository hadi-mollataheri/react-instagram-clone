import { createClient } from '@supabase/supabase-js';

const projectUrl = 'https://gylziklaowckktbcufys.supabase.co';
/*
**DISCLAIMER**: The Supabase API key provided in this code is intended for
  demonstration purposes only and is associated with a specific project. 
  It is **not** intended for reuse in other projects or contexts. 
  Unauthorized use of this API key is strictly prohibited. 
  Each user should create their own Supabase account and generate t
  heir own API keys for their projects. Misuse of this API key may 
  lead to it being revoked, which could disrupt the functionality of 
  the associated project. Please respect these guidelines. Thank you.
*/
const publicKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bHppa2xhb3dja2t0YmN1ZnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2NjQ5MzgsImV4cCI6MjAzODI0MDkzOH0.Z61I3csvPrhKOiGRoRCmh4cJdiKxQRbOh-N_Mi4vFo0';
export const supabase = createClient(projectUrl, publicKey);

// Sign up users(Used in handler for sing up link)
export const handleSignUp = async (
  userEmail,
  userPassword,
  userFullName,
  username,
) => {
  const { user, data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
  });

  if (error) {
    // Handle Specific Error Codes if user is already sign up
    if (error.message === 'User already registered') {
      return { error: 'User already registered' };
    }
    console.error('Error during sign up:', error.message);
  } else {
    console.log('Signed up user process: successful'); // Log the user object

    // Create a new row for the user in database(Insert primary profile data)
    const profileData = {
      id: data.user.id,
      full_name: userFullName,
      username: username,
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([profileData]);

    if (profileError) {
      if (
        profileError.message.includes(
          'duplicate key value violates unique constraint',
        )
      ) {
        return { error: 'Username already taken. Please choose another one.' };
      }
      console.error('Error inserting profile data:', profileError);
      return { error: profileError };
    } else {
      console.log('Sign up and profile creation successful.');
    }

    return { user };
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session from handleGoogleLogIn:', error);
    return null; // Return null if there's an error
  }

  if (!data.session) {
    console.warn('No session found in getSession');
    return null; // Return null if session is not found
  }

  console.log('Session from getSession in utility:', data.session);
  return data.session;
};

// checkSessionExpiration returns true if the sessionData is valid
export const checkSessionExpiration = async () => {
  const sessionData = await getSession();
  console.log('sessionData from checkSessionExpiration:', sessionData); // --- TEST ---
  let isSessionExpired = null;
  if (sessionData) {
    setTimeout(() => {
      console.log('Expiration time has been reached!');
      isSessionExpired = true;
      console.log(
        'isSessionExpired in checkSessionExpiration inside setTimeout, in supabase-apiCall:',
        isSessionExpired,
      ); // --- TEST ---
      return isSessionExpired;
    }, 3600000);
  } else {
    isSessionExpired = false;
    console.log(
      'isSessionExpired in checkSessionExpiration *after* setTimeout, in supabase-apiCall:',
      isSessionExpired,
    ); // --- TEST ---
    return isSessionExpired;
  }
};

// Log in users
export const handleLogIn = async (userEmail, userPassword) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (error) {
    console.error('Error during log in:', error);
    window.alert(`Log in failed: ${error.message}`);
    throw new Error('LogIn failed!');
  } else {
    console.log('User successfully logged in');
    return data.session;
  }
};

// Create handleGoogleLogIn function
export const handleGoogleLogIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error)
    console.error(
      'Error during log in with google from handleGoogleLogIn:',
      error,
    );
};

//*** WARNING: This function might need to change because it might return the wrong user. Check the comment out version of getting user below
export const getUser = async () => {
  // Get the current authenticated user and handle errors
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    } else {
      return data.user;
    }
  } catch (e) {
    console.error('Error during getting user obj in handleCreatePost:', e);
    throw e; // Re-throw to let the caller handle it
  }
};

export const handleCreatePost = async (postText, postImages) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error(
        'User not defined, user must be authenticated to create post.',
      );
    }

    // First store the images to the supabase storage
    // Then receive public URLs from those images
    // Then store these URLs in the posts table along with postText

    // Insert post into the 'posts' table
    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      content: postText,
      images: postImages,
    });
    if (error) {
      throw error;
    }
  } catch (e) {
    console.error('Error during post creation in handleCreatePost:', e);
    throw e; // Re-throw to let the caller handle it
  }
};

export const handleGettingPosts = async (user) => {
  const { data, error } = await supabase
    .from('posts')
    .select('id, content, images')
    .eq('user_id', user.id);

  if (error) {
    console.error(
      'Error during getting user post from handleGettingPosts utility:',
      error,
    );
    throw error;
  } else {
    return data;
  }
};

// Get user profile (Create a getProfile function that gets the user profile and
// return an individual user profile data as an object)
// export const getProfile = async (user) => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('full_name', 'username', 'avatar_url', 'bio')
//     .eq('id', user.id)
//     .single();
//   if (error) console.warn('Error getting Profile:', error);
//   else if (data) return data;
// };

// Use the fetched user data with supabase for stopping the repetitive sign up
// export const checkEmailExistence = async (email) => {
//   try {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('email')
//       .eq('email', email); // Filter where email column equals the provided email value. data is an array of rows that match the query condition
//     console.log('data = array of emails in checkEmailExistence:', data); // TEST //BUG: *** The fetched data is undefined

//     if (data)
//       console.log('data is fetched correctly.'); // TEST
//     else console.log('data is not fetched correctly.'); // TEST

//     if (error) throw error;
//     console.log(data.length); // TEST
//     return data.length > 0; // If there's data, the email exists and it return true, otherwise return false
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
