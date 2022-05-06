// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Switch from "./components/Switch";
import bcryptjs from "bcryptjs";

function App() {
	const [databaseKuno, setdatabaseKuno] = useState([
		{
			email: "geoff@text.com",
			username: "geoffMapagmahal",
			password: "$2a$10$UpHaNUlLn3isdmM64Qpo5eKJHXiRyz/CvSr0WPoz6KVey9uHzhwiu",
		}, //123123aA
		{
			email: "someone@text.com",
			username: "someoneMakulit",
			password: "$2a$10$qUVpvnXPswwMdFk8C9dyWumIE9VgDSUkwmqBFt9Rm/Pa1pOynlyT6",
		}, //ustlang$4kaLam
	]);
	const [login, setlogin] = useState(true);
	// const [testPass, settestPass] = useState("");
	const [user, setuser] = useState({});

	const salt = bcryptjs.genSaltSync(10);

	const hash = pass => bcryptjs.hashSync(pass, salt);

	// useEffect(() => {
	// 	console.log(databaseKuno);
	// }, [databaseKuno]);

	function userExists(u) {
		const userFound = databaseKuno.find(user => user.username === u);
		return userFound;
	}
	function emailExists(e) {
		const userFound = databaseKuno.find(user => user.email === e);
		return userFound;
	}

	function authenticate(u, p) {
		const userFound = userExists(u);
		if (userFound) {
			const compare = bcryptjs.compareSync(p, userFound.password);
			// hash(p);
			// console.log(compare);
			// console.log(userFound.password);
			if (compare) {
				// console.log(userFound);
				return { passwordMatches: true, user: userFound };
			} else return { passwordMatches: false };
		} else return { passwordMatches: false };
	}

	function handleLogout() {
		setuser({});
	}

	function register(e, u, p) {
		let tempArray = databaseKuno;
		tempArray.push({ email: e, username: u, password: hash(p) });
		setdatabaseKuno(tempArray);
		// console.log(databaseKuno);
		// console.log({ email: e, username: u, password: hash(p) });
	}

	useEffect(() => {
		console.log(databaseKuno);
	}, [databaseKuno]);

	return (
		<>
			{user.username ? (
				<div className="authedt">
					<h1>Welcome {user.username}!</h1>
					<br />
					<br />
					Email: {user.email}
					<br />
					Password: {user.password}
					<br />
					<br />
					<button className="logout" onClick={handleLogout}>
						Log out
					</button>
				</div>
			) : (
				<div className={`wallpaper w-${login ? "login" : "signup"}`}>
					<div
						className={`switch s-${login ? "login" : "signup"}`}
						onClick={() => setlogin(!login)}
					>
						{login ? (
							<Switch line={`Not registered yet?`} main={`Sign Up!`} />
						) : (
							<Switch line={`Already have an account?`} main={`Login!`} />
						)}
					</div>
					<div className="main-container">
						<Login
							login={login}
							authenticate={authenticate}
							setuser={setuser}
						/>
						<div className="blank">
							{/* <input value={testPass} onChange={e => settestPass(e.target.value)} /> */}
						</div>
						<div className="blank"></div>
						<Signup
							login={login}
							setlogin={setlogin}
							userExists={userExists}
							emailExists={emailExists}
							register={register}
						/>
					</div>
					<div className={`uptopia ${login ? `bottom` : ""} `}>
						<h1>UPtopia</h1>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
