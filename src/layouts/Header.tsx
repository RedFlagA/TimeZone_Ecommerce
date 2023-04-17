import React from "react";
import { IMAGE } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../utils";
import { useDispatch } from "react-redux";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkAuthNavigate = () =>{
    navigate(checkAuth() ? "/profile-screen" : "/login");
  }

  const clearCart = () =>{
    dispatch({
      type: "@saga/removeCart",
      payload: null,
    });
  }
  return (
    <header>
      <div className="header-area">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="menu-wrapper">
              <div className="logo">
                <Link to={"/"}>
                  <img src={IMAGE.logo} alt="" />
                </Link>
              </div>
              <div className="main-menu d-none d-lg-block">
                <nav>
                  <ul id="navigation">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="shop.html">shop</a>
                    </li>
                    <li>
                      <a href="about.html">about</a>
                    </li>
                    <li className="hot">
                      <a href="#">Latest</a>
                      <ul className="submenu">
                        <li>
                          <a href="shop.html"> Product list</a>
                        </li>
                        <li>
                          <a href="product_details.html"> Product Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                      <ul className="submenu">
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Pages</a>
                      <ul className="submenu">
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="elements.html">Element</a>
                        </li>
                        <li>
                          <a href="confirmation.html">Confirmation</a>
                        </li>
                        <li>
                          <a href="checkout.html">Product Checkout</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header-right">
                <ul>
                  <li>
                    <div className="nav-search search-switch">
                      <span className="flaticon-search"></span>
                    </div>
                  </li>
                  <li>
                    {" "}
                    <a onClick={() => checkAuthNavigate()}>
                      <span className="flaticon-user"></span>
                    </a>
                  </li>
                  <li>
                  <a onClick={() => navigate('/cart')}>
                      <span className="flaticon-shopping-cart"></span>
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
