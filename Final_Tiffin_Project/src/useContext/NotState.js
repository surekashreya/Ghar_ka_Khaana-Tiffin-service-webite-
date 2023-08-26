import React, {useState} from 'react'
import NoteContext from './NoteContext.js'

function NoteState(props) {
    const [isshown,setIsShown]=useState(0);
    const [count,setCount] = useState(0);
    const [city,setCity]= useState(0);
    const [pop,setPop]= useState();
    const [name,setName]= useState('');
    const [id,setId]= useState("");
    const [userid,setUserId]= useState("");

  return (
    <NoteContext.Provider value={
      {
        isshown,setIsShown, 
        count,setCount,
        city,setCity,
        userid,setUserId,
        pop,setPop,
        name,setName,
        id,setId
      }
      }>

      {props.children}

    </NoteContext.Provider>
  )
}


export default NoteState;

