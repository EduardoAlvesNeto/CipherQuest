import { forwardRef, ComponentProps } from 'react';

import './styles.css';

interface InputProps extends ComponentProps<'input'> {
  error?: string
  formatCPF?: boolean
  formatCardNumber?: boolean
  formatCardExpiration?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ onChange, formatCardNumber, formatCardExpiration, formatCPF, name, id, error, placeholder, ...props }, ref) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (formatCPF) {
        const inputValue = e.target.value.replace(/\D/g, '');
        const formattedValue = inputValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        e.target.value = formattedValue;
      }

      if (formatCardNumber) {
        const inputValue = e.target.value.replace(/\D/g, '');
        const formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = formattedValue;
      }

      if (formatCardExpiration) {
        const inputValue = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const formattedValue = inputValue.slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2');
        e.target.value = formattedValue;
      }
      onChange(e);
    }
  };

  const inputId = id ?? name;

  return (
    <div className='input-container'>
      <label htmlFor={inputId} className='input-label'>{name}</label>
      <input
        {...props}
        ref={ref}
        name={name}
        id={inputId}
        placeholder={placeholder}
        className='input'
        onChange={handleChange}
      />
      {error && <span className='error-message'>{error}</span>}
    </div>
  );
});
