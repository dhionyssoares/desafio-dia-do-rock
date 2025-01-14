import React, {createContext, useEffect, useState} from 'react';
import {getAll} from "../../Api/eventoApi";

export const MapInfoContext = createContext();

export default function MapInfoProvider({children}) {
    const [mapInfo, setMapInfo] = useState({
        panTo: null,
        markers: [],
        zoom: 4,
    });

    async function getMarkers() {
        try {
            const data = await getAll();
            setMapInfo((oldInfo) => ({...oldInfo, markers: data}));
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    }

    async function getMarkerBySearch(search) {
        try {
            const data = await getAll();
            const result = data.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase())
                    || item.description.toLowerCase().includes(search.toLowerCase())
                    || item.address.toLowerCase().includes(search.toLowerCase());
            });
            setMapInfo((oldInfo) => ({...oldInfo, markers: result}));
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }

    }

    useEffect(() => {
        getMarkers();
    }, []);

    const setPanTo = (panTo) => {
        setMapInfo((oldInfo) => ({...oldInfo, panTo}));
    }

    const setZoom = (zoom) => {
        setMapInfo((oldInfo) => ({...oldInfo, zoom}));

    }

    return (
        <MapInfoContext.Provider value={{mapInfo, setMapInfo, setPanTo, getMarkers, getMarkerBySearch, setZoom}}>
            {children}
        </MapInfoContext.Provider>
    );
}
