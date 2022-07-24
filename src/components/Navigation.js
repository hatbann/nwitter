import React from 'react';
import { Link } from 'react-router-dom';

const Navigtaion = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigtaion;