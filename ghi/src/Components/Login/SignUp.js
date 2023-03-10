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
    const { email, password, full_name, city, state, description, social_media } = useSelector((state) => state.account);
    const [signUp] = useSignUpMutation();
    const field = useCallback(
        (e) =>
            dispatch(updateField({ field: e.target.name, value: e.target.value })),
        [dispatch]
    );

    return (
        <div className="login" >
            <Container>
                <div className="loginText">
                    <h2>Sign up</h2>
                </div>
                <Form
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUp({
                            info: {
                                email,
                                password,
                                full_name,
                            },
                            profile: {
                                city,
                                state,
                                description,
                                social_media
                            }
                        });
                        navigate("/");
                    }}
                >
                    <Form.Group>
                        <Form.Control
                            type="mail"
                            placeholder="Enter Email"
                            name="email"
                            onChange={field}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={field}
                            value={password}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="full_name"
                            onChange={field}
                            value={full_name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={field}
                            value={city}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            onChange={field}
                            value={state}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Describe yourself"
                            name="description"
                            onChange={field}
                            as="textarea"
                            rows={3}
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Share a social media link"
                            name="social_media"
                            onChange={field}
                            value={social_media}
                        />
                    </Form.Group>
                    <div>
                        <button className="createAccountBtn" type="submit">
                            Create Account
                        </button>
                    </div>
                </Form>
                <div className="loginText">
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
