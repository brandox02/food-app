



export const useActions = ({order, setOrder}) => {
 
   const dailyDishDetails = order.details.filter(x => x.isDailyDish);
   const restDetails = order.details.filter(x => !x.isDailyDish);
   const totalOrder = order.total;


   function incrementOrDecrementDetailQuantity({ quantity = 1, id }) {
      const mapped = order.details.map(item => {
         const newQuantity = item.quantity + quantity;
         return item.id === id ? ({ ...item, quantity: newQuantity, total: newQuantity * item.price }) : item
      });
      const totalOrder = mapped.reduce((acc, curr) => (curr.isDailyDish ? 0 : curr.total) + acc, order.dailyDishPrice || 0);
 
      setOrder({ ...order, details: mapped, total: totalOrder });
   }

   function setComment({value, id}){
      const mapped = order.details.map(item => item.id === id ? ({ ...item, comment: value }) : item);
      setOrder({ ...order, details: mapped });
   }
 
 
   return { setComment, orderTypeId: order.typeId, dailyDishDetails, restDetails, totalOrder, dailyDishPrice: order.dailyDishPrice, incrementOrDecrementDetailQuantity }
 }