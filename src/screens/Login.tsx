import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [username, setUserName] = useState<string>("kminchelle");
  const [password, setPassword] = useState<string>("0lelplR");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event: any, type: string) => {
    if (type === "userName") {
      setUserName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const loginSuccess = (data: boolean) => {
    if (data) {
      navigate("/");
    }
  };
  const handleLogin = () => {
    const user: any = {
      username,
      password,
    };
    localStorage.setItem("userInfo", JSON.stringify(user));
    dispatch({
      type: "@saga/Login",
      payload: {
        username: username,
        password: password,
        loginSuccess: loginSuccess,
      },
    });
  };
  return (
    <main>
      {/* <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Login</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <section className="login_part section_padding "> */}
      <section className="login_part mt-5 pt-5 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="login_part_text text-center">
                <div className="login_part_text_iner">
                  <h2>New to our Shop?</h2>
                  <p>
                    There are advances being made in science and technology
                    everyday, and a good example of this is the
                  </p>
                  <a href="/#" className="btn_3">
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login_part_form">
                <div className="login_part_form_iner">
                  <h3>
                    Welcome Back ! <br />
                    Please Sign in now
                  </h3>
                  <form className="row contact_form" action="#" method="post">
                    <div className="col-md-12 form-group p_star mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={username}
                        placeholder="Username"
                        onChange={(event) => handleChange(event, "userName")}
                      />
                    </div>
                    <div className="col-md-12 form-group p_star mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => handleChange(event, "password")}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="creat_account d-flex align-items-center">
                        <input type="checkbox" id="f-option" name="selector" />
                        <label htmlFor="f-option">Remember me</label>
                      </div>
                      <button
                        type="button"
                        className="btn_3"
                        onClick={handleLogin}
                      >
                        log in
                      </button>
                      <a className="lost_pass" href="/#">
                        forget password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginScreen;
