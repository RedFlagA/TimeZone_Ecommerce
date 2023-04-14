declare type Arrivals = {
  payload: {
    id:number;
    title: string;
    description: string;
    price:number;
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: Array<string>,
  };
};
declare type UserInfo = {
  id?: number,
  username?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  gender?: string,
  image?: string,
  token?: string,
}
declare type StateType = {
  home:{
    newArrivals: Array<Arrivals>;
    popularItems:any
  },
  auth: {
    [key: string]: any;
  },
  product:{
      [key: string]: any;
  }
};
