import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

function CartList() {
  const dataCart = useSelector((state: StateType) => state.cart.carts);
  return (
    <main>
      <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Cart List</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="cart_area section_padding">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col" className="text-center">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart[0]?.products?.map((item: CartItem, index: string)=>{
                    return(
                      <CartItem item={item} key={index} />
                    )
                  })}
                  <tr className="bottom_button">
                    <td>
                      <a className="btn_1" href="/#">
                        Update Cart
                      </a>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="cupon_text float-right">
                        <a className="btn_1" href="/#">
                          Close Coupon
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartList;
