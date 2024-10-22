import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCog,
  FaBoxOpen,
  FaShoppingCart,
  FaClipboardList,
  FaHandHoldingUsd,
  FaChartLine,
  FaQuestionCircle,
} from 'react-icons/fa';
import './NavigationPanel.css';
import Cookie from 'js-cookie';

const NavigationPanel = () => {
  const navigate = useNavigate();

  // Fetch the user role from local storage (or replace this with your own logic)
  const userRole = Cookie.get('role'); // Assuming role is stored as 'role' in local storage

  const goToLogin = () => {
    navigate('/');
  };

  // Determine which navigation items to show based on role
  const rolePermissions = {
    admin: [
      'dashboard',
      'components',
      'lowstocks',
      'purchases',
      'bom-ordering',
      'bomorderslist',
      'lending',
      'help',
          ],
    'stock manager': ['dashboard','components', 'lowstocks', 'purchases', 'lending','componentRequest' , 'bomorderslist','help',],
    user: ['dashboard','components', 'purchases', 'bom-ordering','help',],
    intern: ['dashboard','components', 'purchases','help',],
    executive: [
      'dashboard',
      'components',
      'lowstocks',
      'purchases',
      'bom-ordering',
      'bomorderslist',
      'lending',
      'help',
    ],
  };

  const allowedRoutes = rolePermissions[userRole] || []; // Default to an empty array if the role is not found

  return (
    <div className='navigation-panel'>
      <div onClick={goToLogin} className='logo'>
        <h2>STOCKPULSE</h2>
      </div>
      <nav>
        <ul>
          {allowedRoutes.includes('dashboard') && (
            <li>
              <NavLink to='/dashboard' activeClassName='active'>
                <FaTachometerAlt className='nav-icon' />
                <span>Dashboard</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('components') && (
            <li>
              <NavLink to='/components' activeClassName='active'>
                <FaCog className='nav-icon' />
                <span>Components</span>
              </NavLink>
            </li>
          )}

          {allowedRoutes.includes('componentRequest') && (
            <li>
              <NavLink to='/componentRequest' activeClassName='active'>
                <FaChartLine className='nav-icon' />
                <span>Component Requests</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('lowstocks') && (
            <li>
              <NavLink to='/lowstocks' activeClassName='active'>
                <FaBoxOpen className='nav-icon' />
                <span>Low Stocks</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('purchases') && (
            <li>
              <NavLink to='/purchases' activeClassName='active'>
                <FaShoppingCart className='nav-icon' />
                <span>Purchasing</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('bom-ordering') && (
            <li>
              <NavLink to='/bom-ordering' activeClassName='active'>
                <FaClipboardList className='nav-icon' />
                <span>BoM Ordering</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('bomorderslist') && (
            <li>
              <NavLink to='/bomorderslist' activeClassName='active'>
                <FaClipboardList className='nav-icon' />
                <span>BoM Ordering List</span>
              </NavLink>
            </li>
          )}
          {allowedRoutes.includes('lending') && (
            <li>
              <NavLink to='/lending' activeClassName='active'>
                <FaHandHoldingUsd className='nav-icon' />
                <span>Lending</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className='settings-help'>
        {allowedRoutes.includes('help') && (
          <NavLink to='/help' activeClassName='active'>
            <FaQuestionCircle className='nav-icon' />
            <span>Help Centre</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavigationPanel;
