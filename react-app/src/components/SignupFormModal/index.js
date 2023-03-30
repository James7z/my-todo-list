import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const checkValidEmail = () => {
		if (!email.includes('@') || !email.includes('.')) return ["Email is invalid"];
		if (!email || !email.length > 6) return ["Email must be 6 characters or more"];

		const textAfterPeriod = email.split(".")[1]
		const textAfterAmpersand = email.split("@")[1]

		if (!textAfterPeriod || !textAfterAmpersand) return ["Email is invalid"]
		return false
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errors = [];
		const checkEmail = checkValidEmail();
		if (checkEmail) errors.push(checkEmail)

		if (!username || username.length < 4) errors.push('Username must be 4 characters or more');
		if (!password || password.length < 6) errors.push("Password length must longer than 6 character");
		if (password !== confirmPassword) errors.push('Confirm Password field must be the same as the Password fieldh')

		if (errors.length > 0) return setErrors(errors)

		const data = await dispatch(signUp(username, email, password));
		if (data) {
			return setErrors(data);
		} else {
			closeModal();
		}

	};

	return (
		<>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit} className="sign-up-form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
