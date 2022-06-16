import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* CSS Styles */
import './App.css';

/* Components */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function App() {


  // Manually set data for all rivers (database not needed)
  const [riverData, setRiverData] = useState([
    {
      id: 1,
      siteID: "02032250",
      name: "Moormans River",
      area: "Sugar Hollow",
      latitude: 38.137866,
      longitude: -78.551420,
      link: 'https://waterdata.usgs.gov/nwis/uv?02032250'
    },
    {
      id: 2,
      siteID: "02028500",
      name: "Rockfish River",
      area: "Schuyler",
      latitude: 37.818201,
      longitude: -78.771352,
      link: `https://waterdata.usgs.gov/nwis/uv?02028500`
    },
    {
      id: 3,
      siteID: "02034000",
      name: "Rivanna River",
      latitude: 38.024981,
      longitude: -78.452893,
      link: 'https://waterdata.usgs.gov/nwis/uv?02034000'
    },
    {
      id: 4,
      siteID: "02027500",
      name: "Piney River",
      area: "Blue Ridge Railway Trail",
      latitude: 37.702826,
      longitude: -79.025056,
      link: 'https://waterdata.usgs.gov/nwis/uv?02027500'
    },
    {
      id: 5,
      siteID: "02027000",
      name: "Tye River",
      area: "Love Nest",
      latitude: 37.748388,
      longitude: -78.981485,
      link: 'https://waterdata.usgs.gov/nwis/uv?02027000'
    },
    {
      id: 6,
      siteID: "02025500",
      name: "James River",
      area: "Holcomb Rock",
      latitude: 37.510061,
      longitude: -79.263919,
      link: 'https://waterdata.usgs.gov/nwis/uv?02025500'
    },
    {
      id: 7,
      siteID: "03185400",
      name: "New River",
      area: "New River Gorge",
      latitude: 38.063733,
      longitude: -81.076491,
      link: 'https://waterdata.usgs.gov/nwis/uv?03185400'
    },
    {
      id: 8,
      siteID: "03190000",
      name: "Meadow River",
      area: "Meadow River",
      latitude: 38.115119,
      longitude: -80.879187,
      link: 'https://waterdata.usgs.gov/nwis/uv?03190000'
    },
    {
      id: 9,
      siteID: "03189000",
      name: "Gauley River",
      area: "Summersville Lake",
      latitude: 38.324855,
      longitude: -80.618284,
      link: 'https://waterdata.usgs.gov/nwis/uv?03189000'
    },
    {
      id: 10,
      siteID: "01605500",
      name: "South Branch Potomac River",
      area: "Franklin, River's Bend",
      latitude: 38.670059,
      longitude: -79.319928,
      link: 'https://waterdata.usgs.gov/nwis/uv?01605500'
    },
    {
      id: 11,
      siteID: "01606500",
      name: "South Branch Potomac River",
      area: "Old House, Blue Rock",
      latitude: 38.925356,
      longitude: -79.226880,
      link: 'https://waterdata.usgs.gov/nwis/uv?01606500'
    },
    {
      id: 12,
      siteID: "01665500",
      name: "Rapidan River",
      latitude: 38.239894,
      longitude: -78.355899,
      link: 'https://waterdata.usgs.gov/nwis/uv?01665500'
    },
    {
      id: 13, 
      siteID: "03479000",
      name: "Watauga River",
      area: "Watauga River Gorge",
      latitude: 36.255811,
      longitude: -81.831477,
      link: 'https://waterdata.usgs.gov/nwis/uv?03479000'
    },
    {
      id: 14,
      siteID: "02138500",
      name: "Linville River",
      area: "Linville Gorge",
      latitude: 35.857875,
      longitude: -81.900285,
      link: 'https://waterdata.usgs.gov/nwis/uv?02138500'
    }
  ])



  /////////////////////////////////////////////
  // Getting water levels data from USGS API //
  /////////////////////////////////////////////
  //console.log('before', testData)

  //setTestData('new test data')

  //console.log('after', testData)
  


  // useEffect(() => {
  //   const usgsCurrentWaterData = async () => {
  //     try{
  //       let response = await fetch('https://waterservices.usgs.gov/nwis/iv/?format=json&sites=02032250&parameterCd=00060,00065&siteStatus=all')

  //       // let response = await fetch('https://api.agify.io?name=bella')
  //       let data = await response.json()
  //       console.log(data.value)
  //       // to get current streamflow data for specific site by site ID
  //       // for example, Moorman's River site id: 02032250
  //       //console.log('Current Streamflow: ', data.value.timeSeries[0].values[0].value[0].value)
  //       //console.log('Current River Level: ', data.value.timeSeries[1].values[0].value[0].value)
        


  //     } catch (err) {
  //       console.log('error in API call!')
  //       console.log(err);
  //     }
  //   }
  //   //usgsCurrentWaterData()
  // }, [])

  




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
                <a href={river.link} target="_blank" rel="noreferrer">See USGS Site</a>
              </Popup>
            </Marker>
          )}
      </MapContainer>

    </main>

  );
}

export default App;
