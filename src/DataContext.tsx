import { createContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data from server');
      try {
        const response = await fetch('/api/company_page');
        const jsonData = await response.json();
        setAllData(jsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={allData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;