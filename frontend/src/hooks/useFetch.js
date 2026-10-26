import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import api from '../api/client';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!url || !token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: result } = await api.get(url);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
}
