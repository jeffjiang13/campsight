
export async function CreateActivity(userid, activity) {
        const url = `${process.env.REACT_APP_USERS}/users/${userid}/`
        const data = { favorite_activities: [activity.id] };
        const fetchConfig = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                        'Content-Type': 'application/json',
                },
        }
        await fetch(url, fetchConfig);

}
