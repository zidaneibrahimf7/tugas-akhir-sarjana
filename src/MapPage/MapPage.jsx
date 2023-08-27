import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import mapData from "../data/jalan-provinsi.geojson";
import photoData from "../data/media-ta.geojson"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './MapPage.css'


const MapPage = () => {
  const coordinates = [-6.918, 107.635];

  const [geojsonData, setGeojsonData] = useState(null);
  const [photoGeojsonData, setPhotoGeojsonData] = useState(null);
  // SearchQuery
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGeojson = async () => {
      const response = await Promise.all([
        fetch(mapData).then((res) => res.json()),
        fetch(photoData).then((res) => res.json())
      ]);
      setGeojsonData(response[0]);
      setPhotoGeojsonData(response[1]);
    };
    fetchGeojson();
  }, []);

  const [popupContent, setPopupContent] = useState(null);

  // searchQuery

  // Fetch location details using Google Maps API
  const handleSearch = () => {
    const apiKey = 'ENTER_YOUR_API_KEY';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${apiKey}`;

    axios
      .get(geocodeUrl)
      .then((response) => {
        const data = response.data;
        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          const address = result.formatted_address;
          const { lat, lng } = result.geometry.location;

          // Set the search results in the state
          setSearchResults({ address, lat, lng });
        } else {
          setSearchResults(null);
        }
      })
      .catch((error) => {
        console.error('Error searching for location:', error);
        setSearchResults(null);
      });
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    setSearchResults(null); // Clear the previous search results
  };


  function handleMouseOver(e) {
    const { lat, lng } = e.latlng;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=ENTER_YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        const address = data.results[0].formatted_address;
        const latLng = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;

        const mapDataContent = `
        <div>
          <b>${address}</b>
          <p>${latLng}</p>
        </div>
      `;

        const layer = e.target;
        layer.bindPopup(mapDataContent).openPopup();

      });
  }

  function handleMouseOut() {

  }

  function handlePhotoMouseOver(e, layer) {
    const { feature } = layer;
    const { properties } = feature;

    const { Name, Lat, Lon } = properties;


    //Get the image URL from the properties object
    const imageUrl = properties.Images

    // Get the video URL from the properties object
    const videoUrl = properties.Videos;

    const popupContent = `
    <div>
    <img src="${imageUrl}" alt="${Name}" style="width:100%; height:100%;" />
      <h3>${Name}</h3>
      <div>Latitude: ${Lat.toFixed(4)}</div>
      <div>Longitude: ${Lon.toFixed(4)}</div>
    <div>
        <video width="100px" controls>
          <source src="${videoUrl}" type="video/mp4">
        </video>
      </div>
    </div>
  `;

    layer.bindPopup(popupContent).openPopup();
  }

  function handlePhotoMouseOut() {
    setPopupContent(null);
  }


  const roadStyle = {
    color: 'darkblue',
    weight: 3,
    opacity: 0.75
  }
  const photoStyle = {
    marker: 'circle',
    radius: 6,
    fillColor: 'red',
    color: '#eb6a50',
    weight: 4,
    opacity: 2,
    fillOpacity: 0.8
  };


  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      {/* Search Box */}
      <div className="search-box" style={{ position: 'absolute', top: '80px', left: '10px', zIndex: 1000 }}>
        <PlacesAutocomplete value={searchQuery} onChange={handleInputChange} onSelect={handleSearch}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Search for a location...' })} />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => (
                  <div key={index} {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {searchResults && (
          <div className="search-results">
            <p>Address: {searchResults.address}</p>
            <p>Latitude: {searchResults.lat && searchResults.lat.toFixed(4)}</p>
            <p>Longitude: {searchResults.lng && searchResults.lng.toFixed(4)}</p>
          </div>
        )}
      </div>
      <div >
        <MapContainer center={coordinates} zoom={8} scrollWheelZoom={false} style={{ height: 'calc(100vh - 80px)', width: '100vw', marginTop: '80px' }} className='map-container' zoomControl={false} >
          <ZoomControl className="top-right" />
          <LayersControl position="topright" className='custom-layers-control' style={{ color: 'black' }}>
            <LayersControl.BaseLayer name="OpenStreetMaps" checked>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Streets">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>
            {geojsonData &&
              <GeoJSON
                data={geojsonData}
                onEachFeature={(feature, layer) => {
                  layer.on({
                    mouseover: handleMouseOver,
                    mouseout: handleMouseOut
                  });
                }}
                style={roadStyle}
              >
                {popupContent && <Popup>{popupContent}</Popup>}
              </GeoJSON>
            }
            {photoGeojsonData &&
              <GeoJSON
                data={photoGeojsonData}
                pointToLayer={(feature, latlng) => L.circleMarker(latlng, photoStyle)}
                onEachFeature={(feature, layer) => {
                  layer.on({
                    mouseover: (e) => handlePhotoMouseOver(e, layer),
                    mouseout: (e) => handlePhotoMouseOut(e, layer)
                  });
                }}
              >
                {popupContent && <Popup>{popupContent}</Popup>}
              </GeoJSON>
            }
          </LayersControl>
        </MapContainer>

      </div >
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default MapPage;
