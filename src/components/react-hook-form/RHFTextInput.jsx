import { Controller, useFormContext } from "react-hook-form";

export const TextInput = ({
  customInput = null,
  name,
  placeholder = "",
  type = "text",
}) => {
  const { register } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {

        return (
          <>
            {customInput || (
              <input
                value={field.value}
                type={type}
                placeholder={placeholder}
                className="border-2 border-[#1A579A] px-3 py-1.5 font-[poppins] placeholder:text-sm rounded-lg w-full outline-none"
                {...register(name)}
              />
            )}
            {error && (
              <span className="font-[poppins] text-sm md:text-base text-[red] font-semibold">

                {error.type === "required" ? 'Este campo es requerido' : error.message}
              </span>
            )}

          </>
        );
      }}
    />
  );
};
