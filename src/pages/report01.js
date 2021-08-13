import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';

export function Reporte01() {
    const [lista, setLista] = useState([]);

    const fetchReport = async() => {
        db.collection("pcdf-geo").orderBy("data", "desc").get().then((querySnapshot) => {
            var result = [];

            querySnapshot.forEach((doc) => {
                // var id = doc.id;
                var data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            setLista(result);
        });
    }

    useEffect(()=> {
        fetchReport();
    }, []);

	return (
        <div>
		<h1>Result</h1>
        <table width="90%" border="1">
            <thead>
                <tr>
                <th>#-ID</th>
                <th>Date</th>
                <th>IP</th>
                <th>Port</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>Location</th>
                <th>UserAgent</th>
                </tr>
            </thead>
            <tbody>
                {lista.map((data, index) => {
                        return(
                            <tr key={data.id}>
                                <td>{index}-{data.id}</td>
                                <td>{data.data.toDate().toLocaleString()}</td>
                                <td>{data.ip}</td>
                                <td>{data.porta}</td>
                                <td>{data.latitude}</td>
                                <td>{data.longitude}</td>
                                <td>{data.cidade}/{data.estado}</td>
                                <td>{data.device?.userAgent}{data.device?.ua}</td>
                            </tr>
                        );
                })}
            </tbody>
        </table>
        </div>
	);
}
