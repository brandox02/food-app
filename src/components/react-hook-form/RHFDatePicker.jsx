import { createStyles } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = createStyles(() => ({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1A579A',
    fontFamily: 'poppins',
  },
}));

export const RHFDatePicker = ({
  name,
  placeholder = "Seleccionar Fecha",
}) => {
  const { classes } = useStyles();
  const { setValue, watch, trigger } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ fieldState: { error } }) => {

        return (
          <>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              classNames={{ input: classes.input }}
              placeholder={placeholder}
              onChange={date => {

                setValue(name, date);
                trigger();
              }}
              value={watch(name)}
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
