import './App.css';
import React from 'react';
import WidgetChat from "./components/widgetSm/WidgetChat";
import WidgetLg from "./components/widgetLg/WidgetLg";
import MyMap from './components/map/Map';
import { io } from 'socket.io-client';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {position: []},
      trucks: {},
      trucks_info: {}
    }
  }
  componentDidMount () {
    this.socket = io('wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
      path: "/trucks",
      transports: ['websocket']
    });

    this.socket.on('POSITION', (...args) => {
      let trucks = this.state.trucks;
      trucks[args[0].code] = args[0].position;
      this.setState({trucks: trucks});
      if(this.state.center.position.length===0){
        let center = {position:args[0].position};
        this.setState({center: center, trucks: trucks});
      }
    });
    this.socket.emit("TRUCKS",);

    this.socket.on('TRUCKS', (...args) => {
      this.setState({trucks_info: args[0]});
    });
  }

  render() {
    if(this.state.center.position.length>0){
      return (
        <div className="home">
          <div className="upper">
            <MyMap center={this.state.center.position} trucks={this.state.trucks} trucks_info={this.state.trucks_info} />
            <div className="homeWidgets">
              <WidgetChat />
            </div>
          </div>
  
          <div className="homeWidgets">
            <WidgetLg trucks_info={this.state.trucks_info} />
          </div>
        </div>
      )
    }
      return (
        <div className="home">
          <div className="upper">
            <div className="homeWidgets">
              <WidgetChat />
            </div>
          </div>
  
          <div className="homeWidgets">
            <WidgetLg />
          </div>
        </div>
      )
    
  };
}

export default App;
