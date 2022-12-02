// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css"
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../../app/api";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateField } from "../../app/accountSlice";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email, password } = useSelector((state) => state.account);
	const [logIn] = useLogInMutation();
	const field = useCallback(
		(e) =>
			dispatch(updateField({ field: e.target.name, value: e.target.value })),
		[dispatch]
	);

	return (
		<main>
			<div className="login" >
				<Container>
					<div className="loginText">
						<h2>Login</h2>
					</div>
					<Form
						method="POST"
						onSubmit={(e) => {
							e.preventDefault();
							logIn(e.target);
							navigate("/profile/:id");
						}}
					>
						<Form.Group>
							<Form.Control
								required
								onChange={field}
								value={email}
								name="email"
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Control
								required
								onChange={field}
								value={password}
								name="password"
								type="password"
								placeholder="Enter Password"
							/>
						</Form.Group>
						<div>
							<button className="signInButton" type="submit">
								Sign in
							</button>
						</div>
					</Form>
					<div className="loginText">
						<p>Don't have an account?</p>
						<p>
							Sign up{" "}
							<Link className="link" to="/signup">{" "}here!
							</Link>
						</p>
					</div>
				</Container>
			</div>
		</main>
	);
}
export default Login;
