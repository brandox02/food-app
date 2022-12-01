import { useQuery } from "@apollo/client";
import { createStyles, Select } from "@mantine/core";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = createStyles(() => ({
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#1A579A",
    fontFamily: "poppins",
  },
}));

export const RHFSelectWithQuery = ({
  name,
  placeholder = "Seleccionar",
  query,
  variables = {},
  ...restProps
}) => {
  const { setValue, trigger, } = useFormContext();
  const { classes } = useStyles();
  const { data } = useQuery(query, {
    fetchPolicy: "cache-and-network",
    variables
  });

  const items = useMemo(
    () =>
      data && data?.items && Array.isArray(data.items)
        ? data.items.map((item) => ({
          label: item.name,
          value: item.id,
        }))
        : [],
    [data]
  );


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
              placeholder={placeholder}
              data={items}
              onChange={(e) => {
                console.log("que fuee")
                setValue(name, e);
                trigger(name);
              }}
              {...restProps}
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
