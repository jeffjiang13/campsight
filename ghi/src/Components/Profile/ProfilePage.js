import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const fetchProfile = createAction('fetchProfile', (name, city, state, description, socialMedia) => ({
    payload: { name, city, state, description, socialMedia }
}));

const profileReducer = createReducer({}, {
    [fetchProfile]: (state, action) => {
        state.name = action.payload.name;
        state.city = action.payload.city;
        state.state = action.payload.state;
        state.description = action.payload.description;
        state.socialMedia = action.payload.socialMedia;
    }
});

const selectProfile = createSelector(
    state => state.name,
    state => state.city,
    state => state.state,
    state => state.description,
    state => state.socialMedia,
    (name, city, state, description, socialMedia) => ({ name, city, state, description, socialMedia })
);


const Profile = () => {
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile(profile.name, profile.city, profile.state, profile.description, profile.socialMedia));
    }, []);

    return (
        <div>
            <h1>{profile.name}</h1>
            <h2>{profile.city}, {profile.state}</h2>
            <p>{profile.description}</p>
            <p>{profile.socialMedia}</p>
        </div>
    );
};
export default Profile
