import React from 'react';
import MyImage from '../../images/Safira.png'

export default function Home() {
  return (
    <div className="responsive full-bg-size">  
        <img src={MyImage} style={{width: '100%', height: '100%'}} alt=""/> 
    </div>
  );
}
