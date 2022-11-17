import React from 'react';
import { useState } from 'react';
import { useToken } from './Authorization';
import "./Login.css"

export default function LogIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [, login] = useToken();
	const [loginResponse, setLoginResponse] = useState(true);

	async function onSubmit() {
		const result = await login(username, password);

		if (result.status === 200 || result.status === undefined) {
			console.log(result.status);
			console.log("Successful Login");
			setLoginResponse(true);
		} else {
			setLoginResponse(false);
		}

		console.log(await result);
		console.log(await result.slice(22, -1));
		console.log(await (result.slice(22, -1) === "authenticated"));

		if ((await result) == null || (await result.slice(22, -1)) === "authenticated") {
			setUsername("");
			setPassword("");
		}
	}

	return (
		<div className="login">

			<form>
				<h1> Log in </h1>
				<div className="form-floating mb-3">
					<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" />
					<label htmlFor="username">  </label>
				</div>
				<div className="form-floating mb-3">
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
					<label htmlFor="password">  </label>
				</div>
				<p className="fs-5" hidden={loginResponse ? true : false}>
					Failed to log in - Check Username or Password
				</p>
				<button type="button" className="btn btn-dark" onClick={onSubmit}>
					Log in
				</button>
			</form>
		</div>

	);
}
