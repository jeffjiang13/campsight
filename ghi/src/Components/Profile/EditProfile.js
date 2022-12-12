import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGetTokenQuery } from "../../app/api"


export default function EditProfile() {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [social_media, setSocialMedia] = useState("");
    const [updateProfile] = useUpdateProfileMutation();
    const { profileData } = useGetProfilesQuery();
    const { data: tokenData } = useGetTokenQuery();
    const accountId = tokenData.account.id;
    console.log(profileData, tokenData)
    // const profile = profileData.find(p => p.account_id === accountId)
    async function submitHandler(e) {
        e.preventDefault();

        const body = {
            city: city,
            state: state,
            description: description,
            social_media: social_media,
        };

        updateProfile(profile.id, body);
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
                    <div>
                        In order to see the changes take effect on your profile, refresh the page after being redirected.
                    </div>
                </Form>
            </Container>
        </div>
    );
}
