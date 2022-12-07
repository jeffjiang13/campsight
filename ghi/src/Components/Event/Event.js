import { useGetEventsQuery, useDeleteEventMutation } from "../../app/eventApi";
import "./Event.css"
function Events() {
    const [deleteEvent] = useDeleteEventMutation();
    const { data, isLoading } = useGetEventsQuery();
    if (isLoading) {
        return <progress className="progress is-primary" max="100"></progress>;
    }

    return (
        <div className="login2">
            <div className="">
                <form>
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
