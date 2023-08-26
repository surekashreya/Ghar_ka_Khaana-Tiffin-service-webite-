// customer logn main page

import React from "react";
import { useState } from "react";

import ProviderList from "../Admin/ProviderList";
import SearchIcon from "@mui/icons-material/Search";

function Menu() {
  const [srch, setSrch] = useState("pop");
  const [text, setText] = useState("");
  const [visible,setVisible]= useState(false);

  function handleSearch() {
    setSrch(text);
    setVisible(true);
  }

  function handleText(e) {
    e.preventDefault();
    setText(e.target.value);
  }

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
        </center>

        <ProviderList find={srch} visible={visible} />
      </div>
    </div>
  );
}

export default Menu;

