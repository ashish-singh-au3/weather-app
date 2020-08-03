import React, { Component } from "react";
import "./search.css";
//import { SvgIcon } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchIcon from "@material-ui/icons/Search";
//import Footer from "../Footer/footer";
import { GoLocation } from "react-icons/fa";

//import AutoComplete from "@material-ui/core/A";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      correctInput: true,
    };
    this.getInput = this.getInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInput(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let getCity = this.props.getCity;

    if (this.state.value === "") {
      this.setState({
        correctInput: false,
      });
    } else {
      getCity(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <div className="form">
          <form>
            <label htmlFor="city">
              Please enter the location
              <LocationOnIcon />
            </label>
            <div className="input">
              <input
                type="text"
                id="city"
                name="city"
                onChange={this.getInput}
                placeholder="Search for city/town/place"
              />
            </div>

            <span
              className={
                (this.state.correctInput === false ? "show" : "hidden") +
                " warning"
              }
            >
              Please Enter city name!!!
            </span>
            <br />
            <div>
              {" "}
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
              >
                Display weather <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
