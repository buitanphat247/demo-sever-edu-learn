"use client";

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  inputClassName?: string;
  showSearchIcon?: boolean;
}

export default function CustomInput({
  placeholder = "Tìm kiếm...",
  value,
  onChange,
  wrapperClassName = "w-1/2 mx-auto mb-16",
  inputClassName = "",
  showSearchIcon = true,
}: CustomInputProps) {
  return (
    <div className={wrapperClassName}>
      <div className="relative w-full">
        {showSearchIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-500 dark:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full h-10 px-4 rounded-lg
            bg-white dark:bg-[#1e293b]
            border border-slate-200 dark:border-slate-700/50
            text-slate-700 dark:text-slate-200
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            shadow-lg shadow-blue-500/5 dark:shadow-black/20
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
            transition-all duration-200
            ${showSearchIcon ? 'pl-10' : ''}
            ${inputClassName}
          `}
        />
        {value && (
          <button
            onClick={() => onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
