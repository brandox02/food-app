import { createStyles, Select } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = createStyles(() => ({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#1A579A",
    fontFamily: "poppins",
  },
}));

export const RHFSelect = ({
  name,
  placeholder = "Seleccionar",
  items,
  ...other
}) => {
  const { setValue, trigger } = useFormContext();
  const { classes } = useStyles();


  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <Select
              classNames={{
                input: classes.input,
              }}
              value={field.value}
              clearable
              placeholder={placeholder}
              data={items.map(item => ({ value: item.id, label: item.name }))}
              onChange={(e) => {
                setValue(name, e);
                trigger(name);
              }}
              {...other}
            />

            {error && error.type === "required" && (
              <span className="font-[poppins] text-sm md:text-base text-[red] font-semibold">
                Este campo es requerido
              </span>
            )}
          </>
        );
      }}
    />
  );
};
