import clsx from "clsx";

export const InputField = ({type, placeholder, value, onChange, className, name, ...props}) => {
  return (
      <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className={clsx("bg-transparent border w-full text-sm text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:outline-none p-2 rounded", className)}
      />
  );
};

export const TextareaField = ({placeholder, value, onChange, className, name, ...props}) => {
  return (
      <textarea
          placeholder={placeholder}
          value={value}
          name={name}
          {...props}
          onChange={onChange}
          className={clsx("bg-transparent text-sm border w-full text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:outline-none p-2 rounded", className)}
      />
  );
};