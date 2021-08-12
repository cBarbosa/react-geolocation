import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';

export function Reporte01() {

    const [lista, setLista] = useState([]);

    useEffect(()=> {

        const fetchReport = async()=>{
            const response = db.collection('pcdf-geo');
            const data = await response.get();
            data.docs.forEach( item => {
                console.log(item.data());
                setLista([...lista, item.data()])
            })
        }

        fetchReport();

    }, [lista]);

    

	return (
        <div>
		<h1>Result</h1>
        <table width="90%" border="1">
            <thead>
                <tr>
                <th>Date</th>
                <th>IP</th>
                <th>Port</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {lista.map((data, index) => {
                        return(
                            <tr key={index}>
                                <td>{data.data.toDate().toLocaleString()}</td>
                                <td>{data.ip}</td>
                                <td>{data.porta}</td>
                                <td>{data.latitude}</td>
                                <td>{data.longitude}</td>
                                <td>{data.cidade}/{data.estado}</td>
                            </tr>
                        );
                })}
            </tbody>
        </table>
        </div>
	);

} 
