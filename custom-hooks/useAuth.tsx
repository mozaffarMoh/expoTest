import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      // Replace this with real authentication logic
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setIsAuthLoading(false);
    };
    checkAuth();
  }, []);

  return { isAuthenticated, isAuthLoading };
}
