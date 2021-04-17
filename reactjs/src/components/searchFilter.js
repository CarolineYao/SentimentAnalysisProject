import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SelectDropdown from './selectDropdown';
import DateRangePicker from './dateRangePicker';
import { getTimezoneLst, socialMediaSourceList, filterLsts } from './utils';
import '../styles/searchFilter.scss';

class SearchFilter extends Component {
    render() {
        const { searchFilter } = this.props;
        const timezoneOptions = getTimezoneLst();

        const handleSearchFilterChange = (newValue, filterName) => {
            let newFilter = {
                ...searchFilter,
            };

            switch (filterName) {
                case filterLsts.socialMedia:
                    newFilter.socialMediaSourceOption = newValue;
                    break;
                case filterLsts.username:
                    const value = newValue.target.value;
                    newFilter.username = value;
                    break;
                case filterLsts.timezone:
                    newFilter.timezoneOption = newValue;
                    break;
                case filterLsts.dateRange:
                    newFilter.dateRange = newValue;
                    break;
                default:
                    break;
            }
            this.props.onChange(newFilter);
        };

        return (
            <div className='search-filters'>
                <div className='social-media-source search-filter row'>
                    <div className='label'>Select social media: </div>
                    <SelectDropdown
                        value={searchFilter.socialMediaSourceOption}
                        options={socialMediaSourceList}
                        onChange={(val) =>
                            handleSearchFilterChange(
                                val,
                                filterLsts.socialMedia
                            )
                        }
                    />
                </div>

                <div className='username-input search-filter row'>
                    <div className='label'>Enter Username: </div>
                    <input
                        type='text'
                        className='selector'
                        value={searchFilter.username}
                        placeholder='e.g. johnDoe'
                        onChange={(val) =>
                            handleSearchFilterChange(val, filterLsts.username)
                        }
                    />
                </div>

                <div className='timezone-selector search-filter row'>
                    <div className='label'>Select Timezone: </div>

                    <SelectDropdown
                        value={searchFilter.timezoneOption}
                        options={timezoneOptions}
                        onChange={(val) =>
                            handleSearchFilterChange(val, filterLsts.timezone)
                        }
                    />
                </div>

                <div className='date-selector search-filter row'>
                    <div className='label'>Select Date Range: </div>
                    <DateRangePicker
                        dateRange={searchFilter.dateRange}
                        onChange={(val) =>
                            handleSearchFilterChange(val, filterLsts.dateRange)
                        }
                    />
                </div>
            </div>
        );
    }
}

SearchFilter.propTypes = {
    searchFilter: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withRouter(SearchFilter);
