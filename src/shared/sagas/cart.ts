/* eslint-disable import/no-anonymous-default-export */
import { call, put, select, takeEvery } from "redux-saga/effects";
import { callHttpClientMethodSagas } from "./callHttpClientMethodSagas";
import { HttpMethod } from "../../services/api/api.constant";
import { addNewCarts, clearCarts, setDataCarts } from "../store/cartSlice";

type AddToCart = {
  userId: number;
  products: Array<Object>;
  image: string;
};
type UserId = {
  userId: number;
};
type productInfo = {
  productId: number;
  quantity: number;
};
export function* getAllCarts(action: UserId | any): any {
  try {
    const { userId } = action.payload;
    console.log(
      "🚀 ~ file: cart.ts:16 ~ function*getAllCarts ~ userId:",
      userId
    );
    const response = yield call(
      callHttpClientMethodSagas,
      `/carts/user/${userId}`,
      HttpMethod.Get,
      null
    );
    if (response) {
      yield put(setDataCarts(response.carts));
    }
  } catch (error) {
    console.log("🚀 ~ file: cart.ts:27 ~ function*getAllCarts ~ error:", error);
  }
}

export function* addNewCart({
  payload: { userId, products, image },
}: AddToCart | any): any {
  try {
    const dataCarts = yield select((state) => state.cart.carts);

    const response = yield call(
      callHttpClientMethodSagas,
      `/carts/add`,
      HttpMethod.Post,
      JSON.stringify({
        userId,
        products,
      })
    );
    const responseCustom = {
      ...response,
      products: [{ ...response.products[0], image }],
    };
    let data = dataCarts.length
      ? dataCarts.map((cart: any) => {
          if (cart.id === response.id) {
            const product = response.products[0];
            const existingProductIndex = cart.products.findIndex(
              (p: any) => p.id === product.id
            );
            if (existingProductIndex !== -1) {
              const existingProduct = cart.products[existingProductIndex];
              const updatedProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity + product.quantity,
                total: existingProduct.total + product.total,
              };
              return {
                ...cart,
                products: [
                  ...cart.products.slice(0, existingProductIndex),
                  updatedProduct,
                  ...cart.products.slice(existingProductIndex + 1),
                ],
                total: cart.total + product.total,
                totalProducts: cart.totalProducts + product.quantity,
                totalQuantity: cart.totalQuantity + product.quantity,
              };
            }
            return {
              ...cart,
              products: [...cart.products, product],
              total: cart.total + product.total,
              totalProducts: cart.totalProducts + product.quantity,
              totalQuantity: cart.totalQuantity + product.quantity,
            };
          }
          return cart;
        })
      : [responseCustom];
    yield put(addNewCarts(data));
  } catch (error) {
    console.log("Error:", error);
  }
}

export function* updateCart(action: productInfo | any): any {
  try {
    const { productId, quantity } = action.payload;
    const response = yield call(
      callHttpClientMethodSagas,
      `/carts/${productId}`,
      HttpMethod.Post,
      JSON.stringify({
        merge: true, // this will include existing products in the cart
        products: [
          {
            id: productId,
            quantity,
          },
        ],
      })
    );
    if (response) {
      console.log(
        "🚀 ~ file: cart.ts:71 ~ function*updateCart ~ response:",
        response
      );
      // yield put(setDataCarts(response.carts));
    }
  } catch (error) {
    console.log("🚀 ~ file: cart.ts:75 ~ function*updateCart ~ error:", error);
  }
}
export function* removeCart(action: any): any {
  try {
    const carts: any = [];
    yield put(clearCarts(carts));
  } catch (error) {
    console.log("🚀 ~ file: cart.ts:141 ~ function*logout ~ error:", error);
  }
}

export default [
  takeEvery("@saga/getAllCarts", getAllCarts),
  takeEvery("@saga/addNewCart", addNewCart),
  takeEvery("@saga/updateCart", updateCart),
  takeEvery("@saga/removeCart", removeCart),
];
