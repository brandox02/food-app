import { FormProvider as RHFFormProvider } from "react-hook-form"

 

export const FormProvider = ({ methods, children, onSubmit }) => {
   return (
      <RHFFormProvider {...methods}>
         <form
            className=" h-full px-6 md:p-10 flex flex-col gap-2"
            onSubmit={methods.handleSubmit(onSubmit)}
         >
            {children}
         </form>
      </RHFFormProvider>
   )
}