import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../app/api";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../app/accountSlice";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, password, full_name } = useSelector((state) => state.account);
    const [signUp] = useSignUpMutation();
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
                <div className="text-center mt-3 mb-3">
                    <h2>Sign up</h2>

                </div>
                <Form
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUp({
                            email,
                            password,
                            full_name,
                        });
                        navigate("/profile");
                    }}
                >
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="mail"
                            placeholder="Enter Email"
                            name="email"
                            onChange={field}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={field}
                            value={password}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="full_name"
                            onChange={field}
                            value={full_name}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button size="md" variant="primary" type="submit">
                            Create Account
                        </Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <p>Already have an account?</p>
                    <p>
                        Sign in{" "}
                        <Link className="link" to="/login">
                            here!
                        </Link>
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default SignUp;
