import React from 'react';
import Routes from './routes'

// styles global react
import Global from "./styles/global";

// styles primefaces 
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div>
      {/* <Global /> */}
      <Routes />
    </div>
  );
}

export default App;
