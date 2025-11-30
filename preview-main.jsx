
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './src/UserCard.css';  // <--- CSS IS INJECTED HERE
    import UserCard from './src/UserCard.jsx'; 
    import mockData from './mock-data.json';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <div style={{ padding: '20px' }}>
        <h1>Preview: UserCard</h1>
        <hr />
        <br />
        <UserCard {...mockData} />
      </div>
    );
  