import React from 'react';
import LogoRJ from "./logoRJ.png";

const Logo = (props) => {
    return (

        <div>
            <div className="form-row">
                <div className="col-sm-2">
                    <img src={LogoRJ} style={{width: '80px', height: '80px'}} alt=""/> 
                </div>
                <div className="col-sm-6">
                    <div className="form-row">
                        <label>Governo do Estado do Rio de Janeiro</label>  
                    </div>
                    <div className="form-row">
                        <label>Secretaria de Estado de Saúde</label>  
                    </div>
                    <div className="form-row">
                        <label>Subsecretaria do Fundo Estadual de Saúde</label>
                    </div>
                </div>
            </div>
        </div>
    
    )
};
export default Logo;
