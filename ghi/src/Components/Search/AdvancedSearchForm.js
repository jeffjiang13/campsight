import React from "react";

class AdvancedSearchForm extends React.Component {
    state = {
        pname: '',
        pstate: '',
        states: [
            "IA",
            "CO",
            "FL",
            "TX",
        ],
        siteType: null,
        amenity: null,
        eqplen: null,
        Maxpeople: '',
        hookup: '',
        hookups: [
            "N/A",
            "15 Amps or more",
            "20 Amps or more",
            "30 Amps or more",
            "50 Amps or more",
        ],
        sewer: false,
        water: false,
        pull: false,
        pets: false,
        waterfront: false,
    }

    // handleSubmit = async (event) => {

    // }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    handleCheckbox = (event) => {
        console.log(event.target.value);
        const value = event.target.checked;
        const name = event.target.name;
        this.setState({ [name]: value })
        console.log(this.state);
    }

    render = () => {
        return (
            <div className="containter">
                <div className="row">
                    <div className="">
                        <h1>Advanced Search</h1>
                        <form onSubmit={this.handleSubmit} id="advanced-search-form">
                            <div className="">
                                <input value={this.state.pname} onChange={this.handleChange} placeholder="Search by park name" type="text" name="pname" id="pname" className="form-control" />
                                <label htmlFor="pname">Park Name</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChange} required name="pstate" id="pstate" className="form-select">
                                    <option value="">Choose a state</option>
                                    {this.state.states.map(state => {
                                        return (
                                            <option key={state} value={state}>{state}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-check">
                                <input onChange={this.handleCheckbox} className="form-check-input" type="checkbox" value={this.state.waterfront} checked={this.state.waterfront} name="waterfront" id="waterfront" />
                                <label className="form-check-label" for="waterfront">Waterfront</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default AdvancedSearchForm;
