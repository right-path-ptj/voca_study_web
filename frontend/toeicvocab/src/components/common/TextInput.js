import React from 'react';

function TextInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-input ${error ? 'input-error' : ''}`}
        required={required}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}

export default TextInput;