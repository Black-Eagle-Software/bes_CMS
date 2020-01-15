import React from 'react';
import ReactDOM from 'react-dom';
import { ContentFilter } from '../components/shell-ui/content-filter';

export class ComplexContentFilters extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showAdditionalFilters: false,
            showAppliedFilters: false,
            appliedTagFilters: [],
            update: false
        };

        this.handleTagChange = this.handleTagChange.bind(this);
        this.onShowAdditionalFiltersButtonClick = this.onShowAdditionalFiltersButtonClick.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
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
    render(){
        const {onChange, placeholder, tags} = this.props;
        return <ContentFilter placeholder={placeholder}
                                tags={tags}
                                onChange={onChange}
                                filters={this.state.appliedTagFilters}
                                showAdditionalFilters={this.state.showAdditionalFilters}
                                showAppliedFilters={this.state.showAppliedFilters}
                                onShowAdditionalFiltersButtonClick={this.onShowAdditionalFiltersButtonClick}
                                onTagChange={this.handleTagChange}
                                update={this.state.update}
                                onClosePopup={this.handleClosePopup}
                                onCloseClick={this.handleCloseClick}/>
    }
}