function Button({ text, className, ...props }) {
    return (
      <button
        className={`px-6 py-2 rounded-full font-medium transition duration-300 ${className}`}
        {...props}
      >
        {text}
      </button>
    );
  }
  
  export default Button;