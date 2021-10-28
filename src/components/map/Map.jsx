import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import React from 'react';
import L from "leaflet";
import icon from './assets/cargo-truck.png'

delete L.Icon.Default.prototype._getIconUrl;

const Icon = L.icon({
        iconUrl: icon,
        iconSize: [25,25]
    });

L.Marker.prototype.options.icon = Icon;
    

export default class MyMap extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          trucks: {},
          trucks_info: {}
        };
      }

    componentDidMount() {
        const refreshMarkers = () => {
            // Clear state to prevent duplicates
            this.setState({trucks: {},  trucks_info: {}});
            this.setState({
                  trucks: this.props.trucks,
                  trucks_info: this.props.trucks_info
                });  
        };
        refreshMarkers();
    }

    componentDidUpdate() {
        const refreshMarkers = () => {
            // Clear state to prevent duplicates
            if(this.state.trucks!==this.props.trucks && this.state.trucks_info!==this.props.trucks_info){
                this.setState({trucks: {},  trucks_info: {}});
                this.setState({
                    trucks: this.props.trucks,
                    trucks_info: this.props.trucks_info
                    });
            } else if(this.state.trucks!==this.props.trucks){
                this.setState({trucks: {}});
                this.setState({
                  trucks: this.props.trucks
                });
            } else if(this.state.trucks_info!==this.props.trucks_info){
                this.setState({trucks: {}});
                this.setState({
                  trucks: this.props.trucks
                });
            }
        };
        refreshMarkers();
    }
    
    render() {
        return (
            <MapContainer center={this.props.center} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />{Object.entries(this.state.trucks).map(([key, value]) => {
                    return(<Marker position={value} key={key} >
                        <Popup>
                            Camion {key}
                        </Popup>
                    </Marker>)
                })}
                {Object.entries(this.state.trucks_info).map(([key, info]) => {
                    return(<Polyline positions={[info.origin, info.destination]} />)
                })}

            </MapContainer>
        )
    }
  }