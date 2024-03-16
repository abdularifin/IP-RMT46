const SelectInput = ({ getRent, handleInput, handleSubmit }) => {
  return (
    <div className="flex flex-col mt-20 items-center justify-center h-full">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs"
        value={getRent}
        onChange={handleInput}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        AddCart
      </button>
    </div>
  );
};

export default SelectInput;
