import React from 'react';
import { ContentFilterInput } from './content-filter-input';
import { ContentFilterMoreButton } from './content-filter-more-btn';
import { ContentFilterMorePopup } from './content-filter-more-popup';
import { AdditionalFiltersList } from './additional-filters-list';

import styles from './content-filter.css';

export class ContentFilter extends React.Component {
    /*
        Should this track whether the filter popup is open???
        That should keep the popup from closing unless we want it to        
    */
    constructor(props){
        super(props);

        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
    }
    handleDateClick(date){
        this.props.onDateClick(date);
    }
    handleTagChange(tag){
        this.props.onTagChange(tag);
    }
    render(){
        const {onChange, placeholder, tags, filters, showAdditionalFilters, showAppliedFilters, dates} = this.props;

        return (
            <div className={styles.container} ref={this.containerRef}>
                {/*<input name='query' type='text' placeholder={placeholder} onChange={handleInputChange}/>*/}
                {!showAppliedFilters &&
                    <ContentFilterInput placeholder={placeholder} onChange={onChange}/>
                }
                {showAppliedFilters &&
                    <AdditionalFiltersList filters={filters} 
                                            onCloseClick={(filter)=>this.props.onCloseClick(filter)}
                                            onClearClick={()=>this.props.onClearClick()}/>
                }
                <ContentFilterMoreButton buttonClass={styles.button}
                                            buttonContents={<span className='codicon codicon-settings' title="Additional filters"/>}
                                            showPopup={showAdditionalFilters}
                                            onButtonClick={()=>this.props.onShowAdditionalFiltersButtonClick()}
                                            popupChildren={
                                                <ContentFilterMorePopup tags={tags} 
                                                                        onTagChange={this.handleTagChange} 
                                                                        filters={filters}
                                                                        dates={dates}
                                                                        onDateClick={this.handleDateClick}/>
                                            }
                                            onClosePopup={()=>this.props.onClosePopup()}/>
            </div>
        );
    }
}