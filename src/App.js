//6t9h6nikto
import { NaverMap, Marker } from "react-naver-maps";
import { RenderAfterNavermapsLoaded } from "react-naver-maps"; // 패키지 불러오기

import React from "react";



class App extends React.Component {
  state = {
    lat: 37.3595704,
    lon: 127.105399,
    tag: [],
    bgColor : "red",
    text: "운행종료",

  };

  async componentDidMount() {
  
    let chatSocket = new WebSocket(
      `ws://220.69.209.111:8000/ws/1234/`
      );
      chatSocket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        
        let lat = data['message']['lat']
        let lon = data['message']['lon']
        let tag = data['message']['tag']
        let info = data['message']['info']
        let user = data['user']
        let connection = data['message']['connection']
      
          if(connection == "out" ){
            //여기서 connect 나간거 작업 진행
            this.setState({bgColor:"red",text:"운행종료"})
            return;
          }
          else if(connection == "in"){
            //여기서 connect 들어온거 진행
            this.setState({bgColor:"green",text:"운행중"})
            return;
            
          }
          
        

        
        if(lat != 0 && lon != 0){
          this.setState({ lat: lat, lon: lon });

        }
        if(tag != null){
          let temp = this.state.tag
          let today = new Date();   

          let hours = today.getHours(); // 시
          let minutes = today.getMinutes();  // 분
          let seconds = today.getSeconds();  // 초
          let now = hours + ':' + minutes + ':' + seconds
          let push_data = {tag:tag,lat:lat,lon:lon,info:info,time:now}
          console.log(push_data);
          
          temp.push(push_data)
          this.setState({tag:temp})
          console.log(this.state.tag) 
        }
        
    };
  

  }

  render() {
    const { lat, lon } = this.state;
    return (
      <div>
        <RenderAfterNavermapsLoaded
          ncpClientId={"6t9h6nikto"} // 자신의 네이버 계정에서 발급받은 Client ID
          error={<p>Maps Load Error</p>}
          loading={<p>Maps Loading...</p>}
        >
          <NaverMap
            center={{ lat: lat, lng: lon }}
            style={{
              width: "100%", // 네이버지도 가로 길이
              height: "70vh", // 네이버지도 세로 길이
            }}
          >
            <Marker
             
              position={{ lat: lat, lng: lon }}
              //onClick={() => {setLat(36.7672084337826); setLon(126.9381987088473);}}
            />

            {this.state.tag.map( (x,index) => <Marker
            key = {index}
            position = {{lat:x.lat,lng : x.lon}}
            onClick = { () => { alert(`${x.tag} ${x.info} - ${x.time}`) }}
            />)}
          </NaverMap>
        </RenderAfterNavermapsLoaded>
        <h2
        style={
          {
            backgroundColor : this.state.bgColor,
            width : "150px",
            color : "#fff",
          }
        }
        >
         {this.state.text}</h2>
        <ul> {this.state.tag.reverse().map( (x) => <li>{x.tag}  {x.info}  - {x.time} </li>)}</ul>
      </div>
    );
  }

  
}

/*
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
//get_server_data({ sr, sl });*/
export default App;
