import Button from "react-bootstrap/Button";
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
		<div className="login" >
			<Container className="shadow p-4 mt-5 d-grid">
				<div className="d-flex justify-content-center mt-2">
					{/* <Image src={ } style={{ width: "6rem" }} /> */}
				</div>
				<div className="text-center mt-3">
					<h2>Login</h2>
				</div>
				<Form
					className="mt-3 mb-3 w-100 justify-content-center"
					method="POST"
					onSubmit={(e) => {
						e.preventDefault();
						logIn(e.target);
						navigate("/profile");
					}}
				>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							required
							onChange={field}
							value={email}
							name="email"
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control
							required
							onChange={field}
							value={password}
							name="password"
							type="password"
							placeholder="Enter Password"
						/>
					</Form.Group>
					<div className="d-grid gap-2">
						<Button size="md" variant="primary" type="submit">
							Sign in
						</Button>
					</div>
				</Form>
				<div className="text-center">
					<p>Don't have an account?</p>
					<p>
						Sign up{" "}
						<Link className="link" to="/signup">{" "}here!
						</Link>
					</p>
				</div>
			</Container>
		</div>
	);
}
export default Login;
