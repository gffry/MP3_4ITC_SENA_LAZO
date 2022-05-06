import React, { useState } from "react";
import Error from "./Error";
import InputContainer from "./InputContainer";

export default function Signup({
	login,
	setlogin,
	userExists,
	register,
	emailExists,
}) {
	const [emailReg, setemailReg] = useState("");
	const [usernameReg, setusernameReg] = useState("");
	const [passwordReg, setpasswordReg] = useState("");
	const [passwordConfReg, setpasswordConfReg] = useState("");
	const [error, seterror] = useState("");
	const [emailError, setemailError] = useState("");
	const [usernameError, setusernameError] = useState("");
	const [passwordError, setpasswordError] = useState("");
	const [passwordConfError, setpasswordConfError] = useState("");

	function passwordValid() {
		return (
			passwordReg.match(/[a-z]+/) &&
			passwordReg.match(/[0-9]+/) &&
			passwordReg.match(/[A-Z]+/) &&
			passwordReg.length >= 8
		);
	}

	function handleSignup(e) {
		e.preventDefault();
		seterror("");
		setemailError("");
		setusernameError("");
		setpasswordError("");
		setpasswordConfError("");

		const validEmail = checkEmailValidity(emailReg);
		const validEmail2 = emailExists(emailReg);
		if (validEmail === null) {
			setemailError("error-input");
			seterror("With all due respect, check your email");
			return;
		}
		if (validEmail2) {
			setemailError("error-input");
			seterror("Are you sure you aren't registered? That email's registered.");
			return;
		}

		// console.log(validEmail[0]);

		const validUsername = userExists(usernameReg);
		// console.log(validUsername);
		if (validUsername) {
			setusernameError("error-input");
			seterror("Someone snatched that username, sorry");
			return;
		}

		if (!passwordValid()) {
			setpasswordError("error-input");
			seterror(
				"Sorry, the password must meet the requirements: Alphanumeric with Upper and Lowercase letters, must be greater than or equal to 8 characters"
			);
			return;
		}

		if (passwordReg !== passwordConfReg) {
			setpasswordError("error-input");
			setpasswordConfError("error-input");
			seterror("Oh no, the password and confirm password do not match");
			return;
		}

		register(validEmail[0], usernameReg, passwordReg);
		alert(`Hi ${usernameReg}! You are now registered. You can now log in!`);
		clrea();
		setlogin(true);
	}

	function clrea() {
		setemailReg("");
		setusernameReg("");
		setpasswordReg("");
		setpasswordConfReg("");
	}

	function checkEmailValidity(e) {
		const pattern = new RegExp(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		);
		const res = e.toLowerCase().match(pattern);
		// console.log(e.toLowerCase());
		// console.log(res);
		return res;
	}

	return (
		<div className={`signup ${!login ? "active" : ""}`}>
			<form
				onSubmit={handleSignup}
				style={{ display: `${!login ? "flex" : "none"}` }}
			>
				<InputContainer
					style={emailError}
					label={"Email"}
					id={`emailReg`}
					data={emailReg}
					setdata={setemailReg}
					type={"email"}
					clearError={() => {
						error !== "" && seterror("");
						emailError !== "" && setemailError("");
					}}
				/>
				<InputContainer
					style={usernameError}
					label={"Username"}
					id={`usernameReg`}
					data={usernameReg}
					setdata={setusernameReg}
					type={"text"}
					clearError={() => {
						error !== "" && seterror("");
						usernameError !== "" && setusernameError("");
					}}
				/>
				<InputContainer
					style={passwordError}
					label={"Password"}
					id={`passwordReg`}
					data={passwordReg}
					setdata={setpasswordReg}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						passwordConfError !== "" && setpasswordConfError("");
					}}
				/>
				<InputContainer
					style={passwordConfError}
					label={"Confirm Password"}
					id={`passwordConfReg`}
					data={passwordConfReg}
					setdata={setpasswordConfReg}
					type={"password"}
					clearError={() => {
						error !== "" && seterror("");
						passwordError !== "" && setpasswordError("");
						passwordConfError !== "" && setpasswordConfError("");
					}}
				/>
				<Error text={error} />
				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
