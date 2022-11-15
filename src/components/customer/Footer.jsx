export const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="max-w-[1750px] mx-auto w-full flex flex-col">
        <div className="flex flex-col text-center md:flex-row justify-center text-xs md:text-base gap-1 py-16">
          <span className="text-blue-900 font-semibold italic">
            ¿Necesitas ayuda? Envianos un correo al:
          </span>
          <span className="underline underline-offset-2 italic text-blue-400 font-semibold">
            example@gmail.com
          </span>
        </div>
        <div className="bg-white flex justify-center text-center items-center py-3 font-[poppins] text-[#1A579A] font-semibold text-[12px] sm:text-sm">
          © 2022 Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};
