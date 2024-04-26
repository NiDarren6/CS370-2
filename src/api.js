const API_URL = 'http://localhost:3001'; //WILL NEED TO CHANGE FOR PRODUCTION!!!!!!

export const fetchMetricData = async (metric) => {
  try {
    const response = await fetch(`${API_URL}/api/${metric}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};