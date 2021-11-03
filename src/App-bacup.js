//6t9h6nikto

import { useState } from "react";
import { NaverMap, Marker } from "react-naver-maps";
import { RenderAfterNavermapsLoaded } from "react-naver-maps"; // 패키지 불러오기

const axios = require("axios");
var onchange = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get_server_data({ setLat, setLon }) {
  while (1) {
    var r = await axios.get("http://localhost:8000/bus/gps/download/");

    console.log(r.data);
    //console.log(setLon);
    setLat(r.data.lat);
    setLon(r.data.lon);
    await sleep(1000);
  }
}
function NaverMapAPI({ lat, lon }) {
  return (
    <NaverMap
      center={{ lat: lat, lng: lon }}
      style={{
        width: "100%", // 네이버지도 가로 길이
        height: "70vh", // 네이버지도 세로 길이
      }}
    >
      <Marker
        key={1}
        position={{ lat: lat, lng: lon }}
        //onClick={() => {setLat(36.7672084337826); setLon(126.9381987088473);}}
      />
    </NaverMap>
  );
}

function App() {
  const [lat, setLat] = useState(37.3595704);
  const [lon, setLon] = useState(127.105399);
  //if (!onchange) {
  //onchange = true;
  //get_server_data({ setLat, setLon });
  //}
  //get_server_data({ setLat, setLon });

  return (
    <div>
      <RenderAfterNavermapsLoaded
        ncpClientId={"6t9h6nikto"} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI lat={lat} lon={lon} />
      </RenderAfterNavermapsLoaded>

      <div
        style={{
          backgroundColor: "#0f0",
          overflow: "scroll",
          width: "100%",
          height: "auto",
        }}
      >
        <button
          onClick={() => {
            get_server_data({ setLat, setLon });
          }}
        >
          버튼
        </button>
        <button
          onClick={() => {
            setLat(36.77068057043212);
            setLon(126.92485203719319);
          }}
        >
          버튼2
        </button>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </div>
  );
}
//get_server_data({ sr, sl });
export default App;
