// InputTemplate.js
export const InputTemplate = ({ value, onChange, className, placeholder }) => (
    <input
      type="text"
      className={`border-b border-gray-300 focus:border-[#FEAB5F] outline-none px-1 w-20 inline-block ${className}`}
      placeholder={placeholder || 'Completar'}
      value={value}
      onChange={onChange}
    />
  );
  export default InputTemplate;
