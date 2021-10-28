import "./widgetLg.css";
import React from "react";
import { io } from 'socket.io-client';


export default class Info extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      trucks_damaged: {}
    }
  }

  componentDidMount () {
    this.socket = io('wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl', {
      path: "/trucks",
      transports: ['websocket']
    });
    this.socket.on('FAILURE', message => {
        var failing = this.state.trucks_damaged
        var code = message.code
        this.setState({trucks_damaged: {[code]: message.source , ...failing}} );
    })
    this.socket.on('FIX', message => {
        const failing = this.state.trucks_damaged
        delete failing[message.code]
        this.setState({trucks_damaged: failing})
      })
  }

  render(){
    const list = this.props.trucks_info || {};
    const trucks_info = Object.entries(list).map(([key, info]) => {
        console.log(info.staff)
        const l = info.staff || []
        const staff = l.map((data) =>{
            return (
                <div className="staff" >
                   <div className="code" >Integrante {data.name} (edad: {data.age}) </div>
               </div>)    
        })
        if(info.code in this.state.trucks_damaged){
            return (
                <div className="truck_container_bad" >
                   <div className="code" >Camión {info.code} </div>
                   <div className="code" >Capacidad: {info.capacity} </div>
                   <div className="code" >Motor: {info.engine} </div>
                   <div className="code" >Modelo: {info.truck} </div>
                   <div className="code" >falla: {this.state.trucks_damaged[info.code]} </div>
                   <div className="code" >--STAFF-- </div>
                   {staff}
               </div>)

        }else{
            return (
                <div className="truck_container" >
                   <div className="code" >Camión {info.code} </div>
                   <div className="code" >Capacidad: {info.capacity} </div>
                   <div className="code" >Motor: {info.engine} </div>
                   <div className="code" >Modelo: {info.truck} </div>
                   <div className="code" >status: Ok </div>
                   <div className="code" >--STAFF-- </div>
                   {staff}
               </div>)
        }
    });

    return(
        <div className="widgetLg">
          {trucks_info}
        </div>
    );
  }
}