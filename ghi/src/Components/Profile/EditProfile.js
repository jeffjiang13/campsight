
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useGetProfilesQuery, useUpdateProfileMutation } from "../../app/profileApi";
import { useGetTokenQuery } from "../../app/api"



export default function EditProfile(props) {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [social_media, setSocialMedia] = useState("");
    const { data: tokenData } = useGetTokenQuery();
    const accountId = tokenData && tokenData.account && tokenData.account.id;
    const [updateProfile] = useUpdateProfileMutation();
    const { profileData } = useGetProfilesQuery();
    console.log(profileData, "tokenData", tokenData, "accountId", accountId)

    const profile = profileData.find(p => p.account_id === accountId)

    async function submitHandler(e) {
        e.preventDefault();

        const body = {
            city: city,
            state: state,
            description: description,
            social_media: social_media,
        };

        updateProfile(profile, body);
        navigate("/profile");
        console.log(body)

    }

    function cityChangeHandler(e) {
        setCity(e.target.value);
    }
    function stateChangeHandler(e) {
        setState(e.target.value);
    }
    function socialMediaChangeHandler(e) {
        setSocialMedia(e.target.value);
    }
    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }
    return (
        <div className="login" >
            <Container>
                <div className="loginText">
                    <h2>Update Profile</h2>
                </div>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Control
                            onChange={cityChangeHandler}
                            type="text"
                            placeholder="Update City"
                            value={city}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="input"
                            placeholder="Update State"
                            onChange={stateChangeHandler}
                            value={state}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            onChange={descriptionChangeHandler}
                            as="textarea"
                            rows={3}
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Social media"
                            onChange={socialMediaChangeHandler}
                            value={social_media}
                        />
                    </Form.Group>
                    <div>
                        <button className="createAccountBtn">
                            Submit
                        </button>
                    </div>
                </Form>
            </Container>
        </div>

    );
}
