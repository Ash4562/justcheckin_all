import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <ul className='flex justify-evenly'>
        <li><Link to="/">Homesdadsad</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contactus">Contact</Link></li>
      </ul>
    </div>
  );
}

export default Nav;
