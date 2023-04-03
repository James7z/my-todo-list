import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const signInDemoUser = () => {
    return dispatch(login('demo@aa.io', 'password'))
      .then(closeModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <>
      <div className="log-in-form-container">


        <form onSubmit={handleSubmit} className="log-in-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-input-container">
            <div>
              <label>
                Email
              </label>
            </div>
            <div>
              <input
                type="text"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-input-container">
            <div>
              <label>
                Password
              </label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="demo-user-login-container">
          <button onClick={signInDemoUser}>Login as demo user</button>
        </div>
      </div>

    </>
  );
}

export default LoginFormModal;
