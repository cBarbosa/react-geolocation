import React, { useState, useEffect } from 'react';

const App = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [ip, setIp] = useState(null);
    const [country, setCountry] = useState(null);
    const [status, setStatus] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    const API = 'https://geolocation-db.com/json/';
    const DEFAULT_QUERY = 'redux';

    // const getLocation = () => {
    //     if (!navigator.geolocation) {
	// 		setStatus('Geolocation is not supported by your browser');
	// 	} else {
    //         setStatus('Localizando...');
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setStatus(null);
    //             setLat(position.coords.latitude);
    //             setLng(position.coords.longitude);
    //         }, () => {
    //             setStatus('Unable to retrieve your location');
    //         });
    //     }
    // }

    useEffect(()=> {
	    
	setStatus('Localizando...');

        //(async function() {
        //    if (!navigator.geolocation) {
        //        setStatus('Geolocation is not supported by your browser');
        //    } else {
        //        setStatus('Localizando...');
        //        navigator.geolocation.getCurrentPosition((position) => {
        //            setStatus(null);
        //            setLat(position.coords.latitude);
        //            setLng(position.coords.longitude);
        //        }, () => {
        //            setStatus('Unable to retrieve your location');
        //        });
        //    }
        //})();

        (async function() {
            fetch(API + DEFAULT_QUERY)
                .then(response => {
                if (response.ok) {
		    setStatus(null);
                    return response.json();
                } else {
                    //throw new Error('Something went wrong ...');
		    setStatus('USomething went wrong ...');
                }
                })
                .then(data => {
                    console.debug('result IP', data);
                    setIp(data.IPv4);
                    setCountry(data.country_name);
                    setCity(data.city);
                    setState(data.state);
		    setLat(data.latitude);
                    setLng(data.longitude);
		    setStatus(null);
                })
                .catch(error => setStatus('Unable to retrieve your location'););
            }
        )();
        
      }, []);

	return (
		<div className="App">
			{/* <button onClick={getLocation}>Pegar Localização</button> */}
			{/* <h1>Coordenadas</h1> */}
            <p>{status}</p>
			{lat && <p>Latitude: {lat}</p>}
			{lng && <p>Longitude: {lng}</p>}
            {ip && <p>IP: {ip}</p>}
            {country && <p>Pais: {country}</p>}
            {city && <p>Cidade: {city}</p>}
            {state && <p>Estado: {state}</p>}
		</div>
	);
}

export default App;
