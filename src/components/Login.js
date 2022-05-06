import React, { useState } from "react";
import Error from "./Error";
import InputContainer from "./InputContainer";

export default function Login({ login, authenticate, setuser }) {
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState("");

	function handleLogin(e) {
		e.preventDefault();
		seterror("");
		const userData = authenticate(username, password);
		if (userData.passwordMatches) setuser(userData.user);
		else seterror("Username or Password is incorrect");
	}

	return (
		<div className={`login ${login ? "active" : ""}`}>
			<form
				onSubmit={handleLogin}
				style={{ display: `${login ? "flex" : "none"}` }}
			>
				<InputContainer
					label={"Username"}
					id={`username`}
					data={username}
					setdata={setusername}
					type={"text"}
					clearError={() => error !== "" && seterror("")}
				/>
				<InputContainer
					label={"Password"}
					id={`password`}
					data={password}
					setdata={setpassword}
					type={"password"}
					clearError={() => error !== "" && seterror("")}
				/>
				<Error text={error} />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}
