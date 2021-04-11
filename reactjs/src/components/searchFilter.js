import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../styles/searchFilter.scss';

class SearchFilter extends Component {

  render() {
    const { searchFilter, dropdownOptions } = this.props;

    const handleDropdownSelect = (selectedValue) => {
        const newSearchFilter = {
            ...searchFilter,
            socialMediaSource: selectedValue,
        }

        this.props.onChange(newSearchFilter);
    }

    const handleUsernameInput = (event) => {
        const value = event.target.value;
        const newSearchFilter = {
            ...searchFilter,
            username: value,
        }

        this.props.onChange(newSearchFilter);
    }

    const renderDropdownOptions = () => {
        return dropdownOptions.map((option, index) => {
            const isActive = searchFilter.socialMediaSource === option.value;

            return (
                <Dropdown.Item eventKey={option.value} active={isActive} key={index}>
                    {option.label}
                </Dropdown.Item>
            )
        });
    }

    const getDropdownButtonTitle = () => {
        const selectedOption = dropdownOptions.find(option => option.value === searchFilter.socialMediaSource);

        return selectedOption.label;
    }
    
    return (
        <div className='search-filters'>
            <div className='social-media-source search-filter'>
                <div className='label'>Select social media: </div>
                <DropdownButton 
                    id="dropdown-basic-button" 
                    title={(getDropdownButtonTitle())}
                    className='selector'
                    onSelect={handleDropdownSelect}>
                    {renderDropdownOptions()}
                </DropdownButton>
            </div>

            <div className='username-input search-filter'>
                <div className='label'>Enter Username: </div>
                <input 
                    type='text'
                    className='selector'
                    value={searchFilter.username}
                    onChange={handleUsernameInput}
                />
            </div>


            {/* TODO: finish date picker */}
            <div className='date-selector search-filter'>
                <div className='label from-date'>From date: </div>
                <input 
                    type='date'
                    className='selector from-date'
                />
                <div className='label to-date'>To date: </div>
                <input 
                    type='date'
                    className='selector to-date'
                />
            </div>
        </div>
    );
  }

}

SearchFilter.propTypes = {
    searchFilter: PropTypes.object.isRequired,
    dropdownOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default withRouter(SearchFilter);