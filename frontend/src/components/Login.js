import { useState, useEffect } from "react";
import "../scss/Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const handleLogin = async () => {
    if (!userName || !password) {
      toast.error("User Name/Password is required!");
      return;
    }

    dispatch(handleLoginRedux(userName, password));
  };
  const handleEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container col-12 col-sm-4 ">
      <span className="title">mor_2314, 83r5^_</span>

      <input
        placeholder="username"
        className="form-control"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />

      <input
        placeholder="password"
        className="form-control"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />

      <button
        className={userName && password ? "active" : ""}
        disabled={userName && password ? false : true}
        onClick={handleLogin}
      >
        {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
        Login
      </button>
      <span>
        <i className="fa-solid fa-angles-left" />
        {/* <svg data-testid="ArrowBackIosIcon"></svg> */}
        {/* <i className="fa-regular fa-angle-left"></i> */}
        {/* <span onClick={handleGoBack}> Back</span> */}
        <a href="/">Back</a>
      </span>
    </div>
  );
};
export default Login;
