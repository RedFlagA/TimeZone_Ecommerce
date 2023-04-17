import { useEffect, useState } from "react";

type Item = {
  item: CartItem;
};
const CartItem = ({ item }: Item) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.total)
  const changeQuantity = (type: string) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  useEffect(()=>{
     const totalPrice = quantity * item?.price
     setTotal(totalPrice)
  },[quantity])
  const onChangeQuantity = (event: any) => {
    setQuantity(event.target.value);
  };
  return (
    <tr>
      <td>
        <div className="media">
          <div className="d-flex">
            <img src={item?.image} alt="" />
          </div>
          <div className="media-body">
            <p>{item?.title}</p>
          </div>
        </div>
      </td>
      <td>
        <h5>${item?.price}</h5>
      </td>
      <td>
        <div className="input-group w-auto align-items-center justify-content-center">
          <input
            type="button"
            value="-"
            className="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
            data-field="quantity"
            onClick={() => changeQuantity("minus")}
            readOnly
          />
          <input
            type="number"
            value={quantity}
            name="quantity"
            className="quantity-field border-0 text-center w-25"
            onChange={onChangeQuantity}
          />
          <input
            type="button"
            value="+"
            className="button-plus border rounded-circle icon-shape icon-sm "
            data-field="quantity"
            onClick={() => changeQuantity("plus")}
            readOnly
          />
        </div>
      </td>
      <td>
        <h5>${total}</h5>
      </td>
    </tr>
  );
};
export default CartItem;
