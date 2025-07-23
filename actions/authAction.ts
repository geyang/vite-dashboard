import { authClient } from '@/lib/auth/auth-client';

/**
 * A simple timeout function that resolves after the specified delay
 * @param ms The delay in milliseconds
 * @returns A promise that resolves after the specified delay
 */
export const timeout = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * https://www.better-auth.com/docs/plugins/generic-oauth
 * https://www.better-auth.com/docs/basic-usage
 *
 * returns:
 *  {
 *     data: {
 *       url: 'https://github.com/login/oauth/authorize?xxxx',
 *       redirect: true,
 *     },
 *     error: null,
 *  };
 * */
export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: 'google',
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: window.location.origin + '/',
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    // errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    // newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    // disableRedirect: true,
  });
};

export const signInWithGitHub = async () => {
  console.log('sign in with github - starting');

  return await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: 'github',
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: window.location.origin + '/',
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    // errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    // newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    // disableRedirect: true,
  });
};
