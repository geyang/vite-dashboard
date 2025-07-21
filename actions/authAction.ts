import { authClient } from '@/lib/auth/auth-client';

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: 'google',
    callbackURL: window.location.origin + '/',
  });
  console.log("sign in with google", data);
};

export const signInWithGitHub = async () => {
  const data = await authClient.signIn.social({
    provider: 'github',
    callbackURL: window.location.origin + '/',
  });
  console.log("sign in with github", data)
};
