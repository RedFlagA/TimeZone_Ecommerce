/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state: StateType) => state.product);
  const userInfo = useSelector((state: StateType) => state.auth.user);
  const [total, setTotal] = useState<number>(1);
  const changeTotal = (type: string) => {
    if (type === "plus") {
      setTotal(total + 1);
    } else {
      if (total > 1) {
        setTotal(total - 1);
      }
    }
  };
  const onChangeTotal = (event: any) => {
    setTotal(event.target.value);
  };
  useEffect(() => {
    dispatch({
      type: "@saga/getSingleProduct",
      payload: {
        id,
      },
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: product?.images?.length > 1 ? 2 : 1,
    slidesToScroll: product?.images?.length > 1 ? 2 : 1,
  };

  const addToCart = () => {
    const products = [{ id: product?.id, quantity: total }];
    dispatch({
      type: "@saga/addNewCart",
      payload: {
        userId: userInfo.id,
        products: products,
        image: product?.thumbnail
      },
    });
  };
  return (
    <main>
      <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>{`${product?.category} - ${product?.brand}`}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product_image_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Slider {...settings}>
                {product?.images?.map((element: string, index: number) => {
                  return (
                    <div className="single_product_img" key={index}>
                      <img src={element} alt="#" className="img-fluid" />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-lg-8">
              <div className="single_product_text text-center">
                <h3>{product?.title}</h3>
                <p>{product?.description}</p>
                <div className="card_area">
                  <div className="product_count_area">
                    <p>Quantity</p>
                    <div className="product_count d-inline-block">
                      <span className="product_count_item inumber-decrement">
                        {" "}
                        <button
                          className="icon_quantity"
                          onClick={() => changeTotal("minus")}
                        >
                          {" "}
                          -{" "}
                        </button>
                      </span>
                      <input
                        className="product_count_item input-number"
                        type="text"
                        value={total}
                        onChange={onChangeTotal}
                      />
                      <span className="product_count_item number-increment">
                        {" "}
                        <button
                          className="icon_quantity"
                          onClick={() => changeTotal("plus")}
                        >
                          {" "}
                          +
                        </button>
                      </span>
                    </div>
                    <p>${product?.price}</p>
                  </div>
                  <div className="add_to_cart">
                    <Button onClick={addToCart}>add to cart</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="subscribe_part section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="subscribe_part_content">
                <h2>Get promotions & updates!</h2>
                <p>
                  Seamlessly empower fully researched growth strategies and
                  interoperable internal or “organic” sources credibly innovate
                  granular internal .
                </p>
                <div className="subscribe_form">
                  <input type="email" placeholder="Enter your mail" />
                  <a href="/#" className="btn_1">
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductScreen;
