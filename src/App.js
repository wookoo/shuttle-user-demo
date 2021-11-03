
//6t9h6nikto

import { NaverMap, Marker } from 'react-naver-maps';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps'; // 패키지 불러오기
function NaverMapAPI(){
  const navermaps = window.naver.maps;
  console.log(navermaps);
  return(
    <NaverMap
    center={{ lat: 37.3595704, lng: 127.105399 }}
    style={{
      width: '100%', // 네이버지도 가로 길이
      height: '85vh' // 네이버지도 세로 길이
    }}
    
    >
      <Marker
        key = {1}
        position={{ lat: 37.3595704, lng: 127.105399 }}
        onClick={() => {alert('김찬호 탑승');}}
      />

    </NaverMap>
  

  );
}
function App() {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'6t9h6nikto'} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  )
}

export default App;