import React from 'react'
import Select from 'react-select';

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


const SelectInput = ({ options, selectedValue,...inputProps }) => {
   
   return <Select styles={customStyles} 
                  placeholder="Selecione a opção..."
                  noOptionsMessage={() => 'Pesquisa não encontrada!'}
                  value={options.filter(({value}) => value === selectedValue)}
                  options={options}
                  {...inputProps} />
   
         
}


export default SelectInput
