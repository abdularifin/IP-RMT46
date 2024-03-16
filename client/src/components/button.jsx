const Button = ({ className, onClick, name, type }) => {
  return (
    <div>
      <button className={className} onClick={onClick} type={type}>
        {name}
      </button>
    </div>
  );
};
export default Button;
