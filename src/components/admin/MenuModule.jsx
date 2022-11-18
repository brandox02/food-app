import { MenuDish } from './MenuDish';
import { MenuDishOption } from './MenuDishOption';

export const MenuModule = ({ title }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <h4 className="w-52 font-semibold text-blue-400 italic font-[poppins]">
          Módulo {title}
        </h4>
        <span className="h-[1.5px] w-full bg-gray-200 rounded-full"></span>
      </div>
    </>
  );
};
