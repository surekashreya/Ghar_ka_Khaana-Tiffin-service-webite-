// import React from "react";
// import { useState, useEffect } from "react";

// import ProviderList from "../Admin/ProviderList";
// import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { IconButton } from '@mui/material';

// function Menu() {
//   const [srch, setSrch] = useState("pop");
//   const [text, setText] = useState("");
//   const [visible,setVisible]= useState(false);
//   const [location, setLocation] = useState(null);
//   const [provider, setProvider] = useState([]);
//   const [Loc, setLoc] = useState("pop");
//   const deg2rad = (deg) => {
//     return deg * (Math.PI / 180);
//   };

//   /*useEffect(() => {
//     if (location) {
//       // Fetch providers from your API or database
//       fetch(`https://example.com/api/providers?lat=${location.latitude}&lng=${location.longitude}`)
//         .then(response => response.json())
//         .then(data => {
//           // Filter providers within 50km range
//           const filteredProviders = data.filter(provider => {
//             const R = 6371; // Earth's radius in km
//             const dLat = deg2rad(provider.latitude - location.latitude);
//             const dLng = deg2rad(provider.longitude - location.longitude);
//             const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//               Math.cos(deg2rad(location.latitude)) * Math.cos(deg2rad(provider.latitude)) *
//               Math.sin(dLng/2) * Math.sin(dLng/2);
//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//             const d = R * c; // distance in km
//             return d <= 50; // return providers within 50km range
//           });
//           //setProviders(filteredProviders);
//         })
//         .catch(error => console.error(error));
//     }
//   }, [location]);*/

//   function handleSearch() {
//     setSrch(text);
//     setVisible(true);
//   }

//   function handleText(e) {
//     e.preventDefault();
//     setText(e.target.value);
//   }
// //  function handleLocationClick() {
// //   navigator.geolocation.getCurrentPosition(
// //     (position) => {
// //       const latitude = position.coords.latitude;
// //       const longitude = position.coords.longitude;
// //       const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
// //       window.open(mapUrl, "_blank");
// //     },
// //     (error) => {
// //       console.log(error);
// //     }
// //   );

//   // const handleClick = () => {
//   //   alert('Access Location');
//   //   navigator.geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const latitude = position.coords.latitude;
//   //       const longitude = position.coords.longitude;
//   //       const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//   //       window.open(mapUrl, "_blank");
//   //     },
//   //     (error) => {
//   //       console.log(error);
//   //     }

//   //   )
//   // ;

//   //     /*fetch('http://localhost:3000/menu?srch=Gurgaon')
//   //       .then(response => response.json())
//   //       .then(data => {
//   //         setProvider(data);
//   //       })
//   //       .catch(error => console.error(error));*/

//   // };

//   return (
//     <div>
//       <br />

//       <div>
//         <br />
//         <br />
//         <center>
//           <h3>Search Choice Provider</h3>
//           <div className="searchmain">
//             <input
//               type="text"
//               value={text}
//               placeholder="enter your city"
//               onChange={handleText}
//               onKeyDown={handleSearch}
//               required
//             />
//             <SearchIcon fontSize="large" onClick={handleSearch}></SearchIcon>

//           </div>

//         </center>
//         <br/>
//         <ProviderList find={srch} visible={visible} />
//       </div>
//     </div>
//   );
// }

// export default Menu;
import React from "react";
import { useState, useEffect } from "react";

import ProviderList from "../Admin/ProviderList";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IconButton } from "@mui/material";

function Menu() {
  const [srch, setSrch] = useState("pop");
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [provider, setProvider] = useState([]);
  const [Loc, setLoc] = useState("pop");
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  function handleSearch() {
    setSrch(text);
    setVisible(true);
  }

  function handleText(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  // function handleClick() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  //       window.open(mapUrl, "_blank");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  const fcity = "Gurugram";
  const handleClick = () => {
    alert("Access Location");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        setSrch("gurugram");
        setVisible(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <br />

      <div>
        <br />
        <br />
        <center>
          <h3>Search Choice Provider</h3>
          <div className="searchmain">
            <input
              type="text"
              value={text}
              placeholder="enter your city"
              onChange={handleText}
              onKeyDown={handleSearch}
              required
            />
            <SearchIcon fontSize="large" onClick={handleSearch}></SearchIcon>
          </div>
          <div>
            <IconButton variant="contained" onClick={handleClick}>
              <LocationOnIcon fontSize="large" />
            </IconButton>
            {location && (
              <div>
                Latitude: {location.latitude}, Longitude: {location.longitude}
                <geocoding />
                <br />
                {fcity}
              </div>
            )}
          </div>
        </center>
        <br />
        <ProviderList find={srch} visible={visible} />
      </div>
    </div>
  );
}

export default Menu;
