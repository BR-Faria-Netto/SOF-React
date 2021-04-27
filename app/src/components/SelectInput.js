import React, { Fragment } from "react";
import Select, { components } from "react-select";
import { Link } from 'react-router-dom';
const Menu = (props) => {
   return (
      <Fragment>
         <components.Menu {...props}>
            <div styles={customStyles}>
                  {props.children}
                  <br></br>
                  {props.selectProps.linkValue?<hr/>:null} 
                  {props.selectProps.linkValue? 
                  <div style={{ textAlign: 'right', marginBottom: '15px', marginRight: '15px' }}>
                     <Link to={props.selectProps.linkValue} style={{ color: 'inherit', textDecoration: 'inherit' }}>Novo registro</Link>
                  </div>
                  : null
               }
            </div>
         </components.Menu>
      </Fragment>
   );
};

const Option = (props) => {
   return (
      <Fragment>
         <components.Option {...props}>{props.children}</components.Option>
      </Fragment>
   );
};

const customStyles = {
  control: (provided, state) => ({
      ...provided,
      background: '#fff',
      bordercolor: '#80bdff',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)': null,
    }),
     valueContainer: (provided, state) => ({
       ...provided,
       height: '30px',
       padding: '0 6px'
    }),
    input: (provided, state) => ({
       ...provided,
       margin: '0px',
    }),
    indicatorSeparator: state => ({
       display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
       ...provided,
       height: '30px',
    }),
};

const SelectInput = ({ options, selectedValue, linkValue, ...inputProps }) => {

   return <div>
      <Select styles={customStyles}
         placeholder="Escolha a opção..."
         defaultValue={options[0]}
         components={{ Menu, Option }}
         noOptionsMessage={() => 'Pesquisa não encontrada!'}
         value={options.filter(({ value }) => value === selectedValue)}
         linkValue={linkValue}
         options={options}
         {...inputProps} />

   </div>
   
}

export default SelectInput
