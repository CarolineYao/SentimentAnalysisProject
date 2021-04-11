import React from 'react';
import Select from 'react-select';

const SelectDropdown = (props) => {
    const calculateWidth = (selectedValue) => {
        return `${8 * selectedValue.length + 100}px`;
    };

    return (
        <div style={{ width: calculateWidth(props.value.label) }}>
            <Select
                options={props.options}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default SelectDropdown;
