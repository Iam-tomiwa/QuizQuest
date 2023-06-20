import {DetailedHTMLProps, SelectHTMLAttributes} from "react";

type SelectFieldProps = {
  label?: string;
  options: string[] | {label: string; value: string}[];
  loading?: boolean;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

function SelectField({
  label,
  options = [],
  loading,
  ...props
}: SelectFieldProps) {
  return (
    <div className="relative h-11 w-full min-w-[200px]">
      <select
        placeholder={props?.placeholder || ""}
        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        {...props}
        defaultValue=""
        disabled={loading || props.disabled}
      >
        {loading ? (
          <option className="text-textClr" disabled value={""}>
            Loading...
          </option>
        ) : (
          <>
            {props.placeholder && (
              <option className="text-textClr" value={""}>
                {props.placeholder}
              </option>
            )}
            {options.map(el => (
              <option
                className="text-textClr"
                key={typeof el !== "string" ? el?.value : el}
                value={typeof el !== "string" ? el?.value : el}
              >
                {typeof el !== "string" ? el?.label : el}
              </option>
            ))}
          </>
        )}
      </select>
      {label && (
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-primary after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary">
          {label}
        </label>
      )}
    </div>
  );
}

export default SelectField;
