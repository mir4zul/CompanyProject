import clsx from "clsx";
import React from "react";

export const InputField = ({type, placeholder, value, onChange, className, name, ...props}) => {
  return (
      <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className={clsx("bg-transparent border w-full text-sm text-gray-700 dark:text-gray-100 " +
              "border-gray-200 dark:border-gray-600 focus:outline-none p-2 rounded", className)}
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
          className={clsx("bg-transparent text-sm border w-full text-gray-700 dark:text-gray-100 border-gray-200" +
              " dark:border-gray-600 focus:outline-none p-2 rounded", className)}
      />
  );
};

export const LabelField = ({htmlFor, className, ...props}) => {
  return (
      <label
          htmlFor={htmlFor}
          {...props}
          className={clsx("pb-2 text-sm text-gray-700 dark:text-gray-100", className)}
      />
  );
};

export const SelectField = ({className, defaultValue, onChange, ...props}) => {
  return (
      <select
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
          className={clsx("bg-secondary border border-gray-400 dark:border-gray-600 focus:outline-none p-2 rounded", className)}
      >
        {props.children}
      </select>
  );
}

export const OptionField = ({value, onChange, className, ...props}) => {
  return (
      <option
          value={value}
          {...props}
          onChange={onChange}
          className={clsx("bg-secondary text-sm hover:bg-red-500 hover:text-white transition-colors duration-200", className)}
      />
  );
}

export const AnimatedInputField = ({type, value, onChange, label, className, name, ...props}) => {
  return (
      <>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
            className={clsx("peer absolute top-0 left-0 w-full h-full px-2 py-4 text-sm text-gray-200 border " +
                "border-gray-500 rounded outline-none bg-transparent z-[1] focus:border-[1.5px] " +
                "focus:border-amber-700", className)}
            placeholder=" "
        />
        <label
            className={
          clsx("absolute left-2 top-4 px-1 text-sm text-[#80868b] bg-accent transition-all" +
              " duration-300 ease-in-out pointer-events-none peer-focus:top-[-0.5rem] peer-focus:left-[0.8rem]" +
              " peer-focus:text-[0.75rem] peer-focus:text-amber-700 peer-focus:font-medium peer-focus:z-10" +
              " peer-placeholder-shown:top-1.5 peer-placeholder-shown:left-2 peer-placeholder-shown:text-sm" +
              "peer-not-placeholder-shown:top-[-0.5rem] peer-not-placeholder-shown:left-[0.8rem]" +
              "peer-not-placeholder-shown:text-[0.75rem] peer-not-placeholder-shown:font-medium" +
              " peer-not-placeholder-shown:z-10")
            }>
          {label}
        </label>
      </>
  );
};