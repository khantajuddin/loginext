import { useState, useEffect } from 'react';

const useUsers = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(setUserData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { userData, isLoading, error, setUserData };
};

export default useUsers;