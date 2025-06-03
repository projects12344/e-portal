import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  icon, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <div className={`relative rounded-md shadow-sm`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full rounded-md border-gray-300 
            ${error ? 'border-red-500 pr-10' : 'border-gray-300'} 
            ${icon ? 'pl-10' : 'pl-3'} py-2.5 text-gray-900 
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm
            bg-white border shadow-sm
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;