// src/components/Button.js

import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ label, onClick, type = 'button', className = '', disabled = false, icon: Icon, iconPosition = 'left' }) => {
  return (
    <button 
      type={type}
      className={`button ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {Icon && iconPosition === 'left' && <Icon className="button-icon left" />} {/* Icon on the left */}
      <span>{label}</span> {/* Button text */}
      {Icon && iconPosition === 'right' && <Icon className="button-icon right" />} {/* Icon on the right */}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // The text on the button
  onClick: PropTypes.func, // Click handler
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Button type
  className: PropTypes.string, // Additional CSS classes
  disabled: PropTypes.bool, // Disabled state
  icon: PropTypes.elementType, // Icon component
  iconPosition: PropTypes.oneOf(['left', 'right']) // Icon position relative to the text
};

export default Button;
