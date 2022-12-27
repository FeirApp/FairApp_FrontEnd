/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios";
import './search.css';

function Map() {

  const [data, setData] = useState([]);
  const [weekDay, setWeekday] = useState('Todas');
  const [totalFairs, setTotalFairs] = useState(0);



  const handleMenu = (element) => {
    const selectedweek = element.target.id
    setWeekday(selectedweek)
    setOpen(false);
  };

  const getData = async () => {

    if (weekDay === 'Todas') {
      const { data } = await axios.get('fairs');
      setData(data);
    } else {
      const { data } = await axios.get('fairs/' + weekDay);
      setData(data);
    }
  };

  useEffect(() => {
    getData();
  }, [weekDay]);

  const markers = []

  data.forEach(currentFair => markers.push(
    {
      id: currentFair.id,
      name: "Nome: " + currentFair.name + " Horário: " + currentFair.time,
      position: { lat: currentFair.latitude, lng: currentFair.longitude }
    }))

    const totalMarkers = markers.length;
    useEffect(() => {
      setTotalFairs(totalMarkers);
    });
    
  
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return [
    <div>
      <div className="topo">
        <img src="fair.png" alt="Logo Feirapp - Fundo verde com uma folha branca" className="logo"></img>
        <h1 className="header1">Feiras Modelo de Porto Alegre</h1>
      </div>
      <div className="filter">
        <h2 className="filterTitle">Filtros: </h2>
        <div className="dropdown">
          <label className="label">Pesquisar feiras por: </label>
          <button onClick={handleOpen} className="button">Dias da semana</button>
          <div class="item-list-wrapper">
          {open ? (
            <ul className="menu">
              <li className="menu-item" onClick={handleMenu} id="Todas"> Todas
              </li>
              <li className="menu-item" onClick={handleMenu} id="Segunda feira"> Segunda feira
              </li>
              <li className="menu-item" onClick={handleMenu} id="Terça Feira"> Terça Feira
              </li>
              <li className="menu-item" onClick={handleMenu} id="Quarta Feira"> Quarta Feira
              </li>
              <li className="menu-item" onClick={handleMenu} id="Quinta Feira"> Quinta Feira
              </li>
              <li className="menu-item" onClick={handleMenu} id="Sexta Feira"> Sexta Feira
              </li>
              <li className="menu-item" onClick={handleMenu} id="Sábado"> Sábado
              </li>
              <li className="menu-item" onClick={handleMenu} id="Domingo"> Domingo
              </li>
            </ul>
          ) : null} 
          </div> 
        </div> 
      </div>
      <div className = "box">
        <p className="selected">Você selecionou: {weekDay}</p>
          <p>Há {totalFairs} feiras no dia que você selecionou</p>
      </div>
      <div className="fixed">
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          zoom={15}
          center={{ lat: -30.033056, lng: -51.230000 }}
          initialCenter={{ lat: -30.033056, lng: -51.230000 }}

          mapContainerStyle={{ width: "80vw", height: "80vh" }}
        >
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: "./fair.png",
                anchor: new google.maps.Point(15,15),
                scaledSize: new google.maps.Size(30,30)
              }}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
        </div>
    </div>
    ];
}

export default Map;
