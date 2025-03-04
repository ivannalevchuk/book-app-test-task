const Input = ({ title, name, className, ...props }) => {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input id={name} name={name} {...props} className={className}/>
    </div>
  );
};

export default Input;
