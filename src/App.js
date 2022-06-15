import React, { useState, useEffect } from 'react';

/* CSS Styles */
import './App.css';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

async function usgsWaterData() {
      try{
        let response = await fetch('https://waterservices.usgs.gov/nwis/iv/?format=json&sites=02032250&parameterCd=00060,00065&siteStatus=all')

        // let response = await fetch('https://api.agify.io?name=bella')
        let data = await response.json()
        console.log(data.value)
        // to get current streamflow data for specific site by site ID
        // for example, Moorman's River site id: 02032250
        console.log('Current Streamflow: ', data.value.timeSeries[0].values[0].value[0].value)
        

        
        
      } catch (err) {
        console.log('error in API call!')
        console.log(err);
      }
    }


function App() {

  useEffect(() => {
    usgsWaterData()
  }, [])

  

  const [riverData, setRiverData] = useState([
    {
      id: 1,
      name: "Moormans River",
      area: "Sugar Hollow",
      latitude: 38.137866,
      longitude: -78.551420
    },
    {
      id: 2,
      name: "Rockfish River",
      area: "Schuyler",
      latitude: 37.818201,
      longitude: -78.771352
    },
    {
      id: 3,
      name: "Rivanna River",
      latitude: 38.024981,
      longitude: -78.452893
    },
    {
      id: 4,
      name: "Piney River",
      area: "Blue Ridge Railway Trail",
      latitude: 37.702826,
      longitude: -79.025056
    },
    {
      id: 5,
      name: "Tye River",
      area: "Love Nest",
      latitude: 37.748388,
      longitude: -78.981485
    },
    {
      id: 6,
      name: "James River",
      area: "Holcomb Rock",
      latitude: 37.510061,
      longitude: -79.263919
    },
    {
      id: 7,
      name: "New River",
      area: "New River Gorge",
      latitude: 38.063733,
      longitude: -81.076491
    },
    {
      id: 8,
      name: "Meadow River",
      area: "Meadow River",
      latitude: 38.115119,
      longitude: -80.879187
    },
    {
      id: 9,
      name: "Gauley River",
      area: "Summersville Lake",
      latitude: 38.324855,
      longitude: -80.618284
    },
    {
      id: 10,
      name: "South Branch Potomac River",
      area: "Franklin, River's Bend",
      latitude: 38.670059,
      longitude: -79.319928
    },
    {
      id: 11,
      name: "South Branch Potomac River",
      area: "Old House, Blue Rock",
      latitude: 38.925356,
      longitude: -79.226880
    },
    {
      id: 12,
      name: "Rapidan River",
      latitude: 38.239894,
      longitude: -78.355899
    },
    {
      id: 13, 
      name: "Watauga River",
      area: "Watauga River Gorge",
      latitude: 36.255811,
      longitude: -81.831477
    },
    {
      id: 14,
      name: "Linville River",
      area: "Linville Gorge",
      latitude: 35.857875,
      longitude: -81.900285
    }
  ])


  return (
    <main>

      <MapContainer center={[36.95, -79.98]} zoom={7.25} scrollWheelZoom={false}>
        <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
          {riverData && riverData.map((river) =>
            // create marker w/ popup for each river in map
            <Marker position={[river.latitude, river.longitude]}>
              <Popup>
                <h2>{river.name}</h2>
                <h4>{river.area}</h4>
              </Popup>
            </Marker>
          )}
      </MapContainer>

    </main>

  );
}

export default App;
