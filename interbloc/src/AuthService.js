import { Auth } from 'aws-amplify';
import adminConfig from './aws-exports-admin';
import customerConfig from './aws-exports-customer';

// User login
export const signIn = async (username, password, userType) => {
    try {
        if (userType === 'admin') {
            Auth.configure(adminConfig);
            
        } else {
            Auth.configure(customerConfig);
        }
        const user = await Auth.signIn(username, password);
        return user; // Return the full user session information
    } catch (error) {
        console.error('Error signing in', error);
        throw error;
    }
};

// User logout
export const signOut = async () => {
    try {
        await Auth.signOut();
    } catch (error) {
        console.error('Error signing out', error);
        throw error;
    }
};

// Get current user's JWT Token
export const getToken = async () => {
    try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        // console.log(`Retrieved token: ${token}`); 
        return token;
    } catch (error) {
        console.error('Error getting token', error);
        throw error;
    }
};

// Get current authenticated user
export const getCurrentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error getting current user', error);
      throw error;
    }
  };