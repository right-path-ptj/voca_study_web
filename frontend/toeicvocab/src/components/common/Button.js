import React from 'react';

function Button({
  children,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;