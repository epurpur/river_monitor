import React, { useState, useEffect } from 'react';

/* CSS Styles */
import './App.css';

/* Components */
import { Button } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'leaflet';


const App = () => {

  ////////////////////////////////////////////////////////////
  // Manually set data for all rivers (database not needed) //
  ////////////////////////////////////////////////////////////

  const [riverData, setRiverData] = useState([
    {
      id: 1,
      siteID: "02032250",
      name: "Moormans River",
      area: "Sugar Hollow",
      latitude: 38.137866,
      longitude: -78.551420,
      link: 'https://waterdata.usgs.gov/nwis/uv?02032250',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 2,
      siteID: "02028500",
      name: "Rockfish River",
      area: "Schuyler",
      latitude: 37.818201,
      longitude: -78.771352,
      link: `https://waterdata.usgs.gov/nwis/uv?02028500`,
      streamflow: null,
      riverLevel: null
    },
    {
      id: 3,
      siteID: "02034000",
      name: "Rivanna River",
      latitude: 38.024981,
      longitude: -78.452893,
      link: 'https://waterdata.usgs.gov/nwis/uv?02034000',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 4,
      siteID: "02027500",
      name: "Piney River",
      area: "Blue Ridge Railway Trail",
      latitude: 37.702826,
      longitude: -79.025056,
      link: 'https://waterdata.usgs.gov/nwis/uv?02027500',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 5,
      siteID: "02027000",
      name: "Tye River",
      area: "Love Nest",
      latitude: 37.748388,
      longitude: -78.981485,
      link: 'https://waterdata.usgs.gov/nwis/uv?02027000',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 6,
      siteID: "02025500",
      name: "James River",
      area: "Holcomb Rock",
      latitude: 37.510061,
      longitude: -79.263919,
      link: 'https://waterdata.usgs.gov/nwis/uv?02025500',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 7,
      siteID: "03185400",
      name: "New River",
      area: "New River Gorge",
      latitude: 38.063733,
      longitude: -81.076491,
      link: 'https://waterdata.usgs.gov/nwis/uv?03185400',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 8,
      siteID: "03190000",
      name: "Meadow River",
      area: "Meadow River",
      latitude: 38.115119,
      longitude: -80.879187,
      link: 'https://waterdata.usgs.gov/nwis/uv?03190000',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 9,
      siteID: "03189000",
      name: "Gauley River",
      area: "Summersville Lake",
      latitude: 38.324855,
      longitude: -80.618284,
      link: 'https://waterdata.usgs.gov/nwis/uv?03189000',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 10,
      siteID: "01605500",
      name: "South Branch Potomac River",
      area: "Franklin, River's Bend",
      latitude: 38.670059,
      longitude: -79.319928,
      link: 'https://waterdata.usgs.gov/nwis/uv?01605500',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 11,
      siteID: "01606500",
      name: "South Branch Potomac River",
      area: "Old House, Blue Rock",
      latitude: 38.925356,
      longitude: -79.226880,
      link: 'https://waterdata.usgs.gov/nwis/uv?01606500',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 12,
      siteID: "01665500",
      name: "Rapidan River",
      latitude: 38.239894,
      longitude: -78.355899,
      link: 'https://waterdata.usgs.gov/nwis/uv?01665500',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 13, 
      siteID: "03479000",
      name: "Watauga River",
      area: "Watauga River Gorge",
      latitude: 36.255811,
      longitude: -81.831477,
      link: 'https://waterdata.usgs.gov/nwis/uv?03479000',
      streamflow: null,
      riverLevel: null
    },
    {
      id: 14,
      siteID: "02138500",
      name: "Linville River",
      area: "Linville Gorge",
      latitude: 35.857875,
      longitude: -81.900285,
      link: 'https://waterdata.usgs.gov/nwis/uv?02138500',
      streamflow: null,
      riverLevel: null
    }
  ])
  
  //////////////////////////////////////////////
  // Setting location and zoom levels for map //
  //////////////////////////////////////////////
  const [mapLocation, setMapLocation] = useState([36.95, -79.98]);
  const [mapZoom, setMapZoom] = useState(7.25);

  const handleMapZoom = (event) => {
    //START HERE!!!!//
    const currentState = event.currentTarget.textContent

    // set map location and zoom level for each state
    if (currentState === 'VA') {
      setMapLocation([37.95, -78.5]);
      setMapZoom(9.25)

    } else if (currentState === 'WV') {
      setMapLocation([38.58, -80.35]);
      setMapZoom(8.5)

    } else if (currentState === 'NC') {
      setMapLocation([36, -81.9]);
      setMapZoom(9.25)
    }
  };


  /////////////////////////////////////////////
  // Getting water levels data from USGS API //
  /////////////////////////////////////////////

  useEffect(() => {
    const usgsCurrentWaterData = async () => {
      try{
        // API call includes river ID for each river, to add more rivers just include id number in 'sites'
        let response = await fetch('https://waterservices.usgs.gov/nwis/iv/?format=json&sites=02032250,02028500,02034000,02027500,02027000,02025500,03185400,03190000,03189000,01605500,01606500,01665500,03479000,02138500&parameterCd=00060,00065&siteStatus=all')

        let data = await response.json()
        // extract timeSeries data from API results
        data = data.value.timeSeries

        // set accumulator arrays
        const streamflowArray = []
        const riverHeightArray = []

        // had to use old school for loop, made it easier to access index of current item
        for (let i = 0; i< data.length; i++) {
          //if i is 0 or is even number
          if (i === 0 || i%2 === 0) {    //modulo is for remainder
            streamflowArray.push(data[i])
          } else {
            riverHeightArray.push(data[i])
          }
        }

        // parse streamflow Array to set streamflow levels
        for (let i of streamflowArray) {
            // must slice string to get id of river from API data
            let riverID = i.name.slice(5, 13) // id: '02032250' (string)

            // set streamflow in riverData state
            setRiverData(riverData.map((river) => {
              if (river.siteID === riverID) {
                river.streamflow = i.values[0].value[0].value
              }
              return river
            }))
        }

        // parse riverHeight Array to set river height levels
        for (let i of riverHeightArray) {
          // must slice string to get id of river from API data
          let riverID = i.name.slice(5, 13) // id: '02032250' (string)

          // set river height in riverData state
          setRiverData(riverData.map((river) => {
            if (river.siteID === riverID) {
              river.riverLevel = i.values[0].value[0].value
            }
            return river
          }))
        }

      } catch (err) {
        console.log('error in API call!')
        console.log(err);
      }
    }
    // usgsCurrentWaterData()
  }, []);


  return (
    <main>
      <h1 id='titleText'> Climbing River Monitor </h1>
      <div id='zoomLabel'>Click state to zoom</div>
      <div id='buttonHolder'>
        <Button onClick={handleMapZoom}>VA</Button>
        <Button onClick={handleMapZoom}>WV</Button>
        <Button onClick={handleMapZoom}>NC</Button>
      </div>
      
      <MapContainer center={mapLocation} zoom={mapZoom} scrollWheelZoom={false}>
        <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
          {riverData && riverData.map((river) =>
            // create marker w/ popup for each river in map
            <Marker position={[river.latitude, river.longitude]}>
              <Popup>
                <h1>{river.name}</h1>
                <h3>{river.area}</h3>
                <h4>Current Streamflow Rate: {river.streamflow} m^3/s</h4>
                <h4>Current River Level: {river.riverLevel} ft</h4>
                <a href={river.link} target="_blank" rel="noreferrer">See USGS Site</a>
              </Popup>
            </Marker>
          )}
      </MapContainer>

    </main>

  );
}

export default App;
