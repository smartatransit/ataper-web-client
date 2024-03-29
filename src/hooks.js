import { useState, useEffect, useRef } from 'react';

export function useFetcher(action) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadData() {
        try {
            setLoading(true);
            const actionData = await action();
            setData(actionData);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }
    loadData();
  }, [action]);
  return [data, loading, error];
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}