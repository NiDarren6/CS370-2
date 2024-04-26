import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Page Not Found.</h1>
      <p className="mb-8 text-white">The page you are looking for does not exist</p>
      <Link to="/">
        <button className="bg-white text-red-600 p-2 rounded">Cick here to go back to the Home Page</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
