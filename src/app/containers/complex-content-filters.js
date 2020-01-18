import React from 'react';
import { ContentFilter } from '../components/shell-ui/content-filter';
import DateHelper from '../../helpers/date';

export class ComplexContentFilters extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showAdditionalFilters: false,
            showAppliedFilters: false,
            appliedTagFilters: [],
            update: false,
            dates: []
        };

        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.onShowAdditionalFiltersButtonClick = this.onShowAdditionalFiltersButtonClick.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.media.length > 0){
            if(this.props.media.length !== prevProps.media.length){
                this.parseMediaDatesForFilter(this.props.media);
            }
        }        
    }
    handleClearClick(){
        this.setState(prevState=>({
            appliedTagFilters: [],
            showAdditionalFilters: false,
            showAppliedFilters: false,
            update: !prevState.update
        }), ()=>{
            this.props.onTagFiltersChanged(this.state.appliedTagFilters);
        });
    }
    handleCloseClick(filter){
        this.handleTagChange(filter);
        if(this.state.appliedTagFilters.length === 0){
            this.setState({
                showAdditionalFilters: false,
                showAppliedFilters: false
            });
        }
    }
    handleClosePopup(){
        if(this.state.appliedTagFilters.length > 0){
            this.setState({
                showAdditionalFilters: false
            });
        }else{
            this.setState({
                showAdditionalFilters: false,
                showAppliedFilters: false
            });
        }        
    }
    handleDateClick(date){
        let temp = this.state.appliedTagFilters;
        let index = temp.indexOf(date);
        if(index === -1){
            temp.push(date);
        }else{
            temp.splice(index, 1);
        }
        this.setState(prevState=>({
            appliedTagFilters: temp,
            update: !prevState.update
        }), ()=>{
            this.props.onTagFiltersChanged(this.state.appliedTagFilters);
        });
    }
    handleTagChange(tag){
        let temp = this.state.appliedTagFilters;
        let index = temp.indexOf(tag);
        //let index = this.state.appliedTagFilters.indexOf(tag);
        if(index === -1){
            //this.state.appliedTagFilters.push(tag);
            temp.push(tag);
        }else{
            //this.state.appliedTagFilters.splice(index, 1);
            temp.splice(index, 1);
        }
        this.setState(prevState=>({
            appliedTagFilters: temp,
            update: !prevState.update
        }), ()=>{
            this.props.onTagFiltersChanged(this.state.appliedTagFilters);
        });                
    }
    onShowAdditionalFiltersButtonClick(){
        if(this.state.appliedTagFilters.length > 0){
            this.setState({
                showAdditionalFilters: true,
                showAppliedFilters: true
            });
        }else{
            this.setState(prevState=>({
                showAdditionalFilters: !prevState.showAdditionalFilters,
                showAppliedFilters: !prevState.showAppliedFilters
            }));
        }
    }
    parseMediaDatesForFilter(media){
        let temp = this.state.dates;
        for(let i = 0; i < media.length; i++){
            let dObj = DateHelper.getMonthYearFromMillisecondDate(media[i].fileDate);
            if(temp.find(d=>d.month === dObj.month && d.year === dObj.year) === undefined){
                temp.push(dObj);
            }
        }
        temp.sort((a, b)=>{
            if(a.year === b.year){
                return a.month - b.month;
            }else{
                return a.year - b.year;
            }
        });
        this.setState({dates: temp});
    }
    render(){
        const {onChange, placeholder, tags} = this.props;        

        return <ContentFilter placeholder={placeholder}
                                tags={tags}
                                dates={this.state.dates}
                                onChange={onChange}
                                filters={this.state.appliedTagFilters}
                                showAdditionalFilters={this.state.showAdditionalFilters}
                                showAppliedFilters={this.state.showAppliedFilters}
                                onShowAdditionalFiltersButtonClick={this.onShowAdditionalFiltersButtonClick}
                                onTagChange={this.handleTagChange}
                                onDateClick={this.handleDateClick}
                                update={this.state.update}
                                onClosePopup={this.handleClosePopup}
                                onCloseClick={this.handleCloseClick}
                                onClearClick={this.handleClearClick}/>
    }
}