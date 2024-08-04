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

const supabase = createClient(projectUrl, publicKey);

// Sign up users(handler for sing up link)
export const handleSignUp = async (
  userEmail,
  userPassword,
  userFullName,
  username,
) => {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
  });

  console.log('Sign up data response:', data); // Log the entire response

  if (error) {
    console.error('Error during sign up:', error);
    console.log(error.error_description || error.message);
    return null;
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
      console.error('Error inserting profile data:', profileError);
      alert(profileError.message);
    } else {
      console.log('Sign up and profile creation successful.');
    }

    return data.user;
  }
};

export const handleLogIn = async (userEmail, userPassword) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });
};

// Create a getProfile function that gets the user profile and
// return an individual user profile data as an object
export const getProfile = async (user) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name', 'username', 'avatar_url', 'bio')
    .eq('id', user.id)
    .single();
  if (error) console.warn('Error getting Profile:', error);
  else if (data) return data;
};
