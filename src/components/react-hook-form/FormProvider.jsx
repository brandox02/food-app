import { FormProvider as RHFFormProvider } from 'react-hook-form';

export const FormProvider = ({ methods, children, onSubmit = () => { } }) => {
  return (
    <RHFFormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </RHFFormProvider>
  );
};
