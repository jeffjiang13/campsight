import { useGetProfilesQuery, useUpdateProfileMutation } from "../../app/profileApi";

function Profile() {
    const [update] = useUpdateProfileMutation();

    const { data, isLoading } = useGetProfilesQuery();
    if (isLoading) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div className="login2">
            <div className="">
                <form>
                    <table className="">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>city</th>
                                <th>state</th>
                                <th>Description</th>
                                <th>social media</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.profile.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.city}</td>
                                    <td>{p.state}</td>
                                    <td>{p.description}</td>
                                    <td>{p.social_media}</td>
                                    <td>
                                        <button onClick={() => update(p.id)}>
                                            update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default Profile;
