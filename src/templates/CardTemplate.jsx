// CardTemplate.js
export const CardTemplate = ({ children, className }) => (
    <div className={`p-4 border rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

  export default CardTemplate;