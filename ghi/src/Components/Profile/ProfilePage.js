import { useGetProfilesQuery } from "../../app/profileApi";
import { useGetTokenQuery } from "../../app/api"
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    const { data: tokenData } = useGetTokenQuery();
    const accountId = tokenData && tokenData.account && tokenData.account.id;
    const { data, isLoading } = useGetProfilesQuery();
    if (isLoading) {
        return <div>Loading...</div>
    } else {

        return (
            <div className="login">
                <div className="">
                    <form>
                        <h2>Name: {tokenData.account.full_name}</h2>
                        {data.filter((p) => p.account_id === accountId).map((p) => (
                            <div key={p.id}>
                                <p>City, State: {p.city}, {p.state}</p>
                                <p>Bio: {p.description}</p>
                                <p>Social media: {p.social_media}</p>

                                <button className="createAccountBtn" type="submit" onClick={() => navigate("/edit")}>
                                    Update
                                </button>

                            </div>
                        ))}
                    </form>
                </div>
            </div>
        );
    }
}

export default Profile;
