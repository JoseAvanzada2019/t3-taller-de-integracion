import "./widgetLg.css";
import React from 'react';
import Info from "./info";

export default class WidgetLg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_info: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({show_info: true});
    event.preventDefault();
  }

  render(){
    return (
      <div className="widgetLg">
        <span className="widgetLgTitle">Información Camiones</span>
        <br />
        {!this.state.show_info && (
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Mostrar Info" />
        </form>)}
        {this.state.show_info && <Info trucks_info={this.props.trucks_info} />}
      </div>
    );
  }
}