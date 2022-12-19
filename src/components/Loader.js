import React from 'react'
import Gif from "../loading-1.gif"

export default function Loader() {
  return (
    <div className ="absolute inset-0 bg-black opacity-70 flex items-center justify-center">
     <div>
       <img src = {Gif} alt = "loading"/>
     </div>
    </div>
  );
}
