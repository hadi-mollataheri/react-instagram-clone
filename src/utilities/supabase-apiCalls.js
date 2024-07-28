import { createClient } from '@supabase/supabase-js';

const projectUrl = 'https://efwicoxsibqrsuruwkjv.supabase.co';
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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmd2ljb3hzaWJxcnN1cnV3a2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNTAyNDAsImV4cCI6MjAzNjcyNjI0MH0.lAtMMZ-Ifnq5gKHs1yYqd1XvylO5ywMPgMRlurMKJSo';
const supabase = createClient(projectUrl, publicKey);

// Sign up users(handler for sing up link)
export const handleSignUp = async (userEmail, userPassword) => {
  const { user, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
  });
  if (error) console.error('Error during sign up:', error);
  else window.alert(`Sign up successfully, ${user}`);
};
