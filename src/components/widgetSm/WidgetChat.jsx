import "./widgetSm.css";
import React from "react";
import Chat from "./chat";

export default class WidgetChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: '',
      operator_set: false,
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(this.state.operator!==event.target.value){
      this.setState({operator: event.target.value});
    }
  }

  handleSubmit(event) {
    this.setState({operator_set: true});
    event.preventDefault();
  }
  render() {

    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">Central de comunicación</span>
        <br />
        {!this.state.operator_set && (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.operator} onChange={this.handleChange} />
          <input type="submit" value="Elige tu Nombre" />
        </form>)}
        {this.state.operator_set && <Chat operator={this.state.operator} />}
      </div>
    );
  }
}