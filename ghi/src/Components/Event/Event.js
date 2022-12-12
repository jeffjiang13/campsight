import { useGetEventsQuery, useDeleteEventMutation } from "../../app/eventApi";
import { Link } from "react-router-dom";

import "./Event.css"
function Events() {
    const [deleteEvent] = useDeleteEventMutation();
    const { data, isLoading } = useGetEventsQuery();
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="login3">
            <div className="">
                <form>
                    <h2>Events</h2>
                    <div className="loginText">
                        <p>want to add an event?</p>
                        <p>
                            Click{" "}
                            <Link className="link" to="/create">
                                here!
                            </Link>
                        </p>
                    </div>
                    <table className="events">
                        <thead>
                            <tr>
                                <th>Name of event</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Remove?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.events.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.name}</td>
                                    <td>{event.date}</td>
                                    <td>{event.location}</td>
                                    <td>{event.description}</td>
                                    <td>
                                        <button onClick={() => deleteEvent(event.id)}>
                                            remove
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

export default Events;
