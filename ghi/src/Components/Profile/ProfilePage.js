import { useGetProfilesQuery, useUpdateProfileMutation } from "../../app/profileApi";
import { useGetTokenQuery } from "../../app/api"
function Profile() {
    const [update] = useUpdateProfileMutation();
    const { data: token } = useGetTokenQuery();
    const { data, isLoading } = useGetProfilesQuery();
    if (isLoading) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div className="login2">
            <div className="">
                <form>
                    {token ? <table className="">
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
                    </table> : null}
                </form>
            </div>
        </div>
    );
}

export default Profile;
