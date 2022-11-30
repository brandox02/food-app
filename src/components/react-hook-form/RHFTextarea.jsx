import { Textarea } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export const RHFTextarea = ({
  name,
  placeholder = "",
  className,
  ...other
}) => {
  const { register } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <Textarea
              value={field.value}

              placeholder={placeholder}

              {...register(name)}
              {...other}
            />

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
