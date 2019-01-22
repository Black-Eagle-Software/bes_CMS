import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HeaderSearchBarSuggestions from './header-search-bar-suggestions.component';

export default class HeaderSearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input_value: "",
            show_query_results: false,
            query_results: {}
        }
    }
    componentDidMount(){
        this.resetSearchState();
    }
    componentWillMount(){
        if(typeof window !== 'undefined'){
            document.addEventListener('click', this.handleGlobalClick.bind(this));
        }
    }
    componentWillUnmount(){
        if(typeof window !== 'undefined'){
            document.removeEventListener('click', this.handleGlobalClick);
        }
    }
    handleGlobalClick(e){
        if(this.state.show_query_results){
            const elmt = ReactDOM.findDOMNode(this);
            if(!elmt.contains(e.target)){
                this.setState(prevState=>({show_query_results: !prevState.show_query_results}));
            }
        }
    }
    handleImageClick(image){

    }
    handleInputChange(e){
        //maybe this should offload this to a parent component
        //such that we can redirect to a dedicated search result page?
        let val = e.target.value;
        if(val.length >= 3){
            //fire the missiles!
            axios.get(`/api/search?s=${val}&limit=5`)
            .then(res=>{
                //relevant bits are in res.data
                console.log(res);
                this.setState({
                    show_query_results: true,
                    query_results: res.data
                });
            });
        }else{
            this.setState({
                show_query_results: false,
                query_results: {}
            });
        }
        this.setState({input_value: val});
    }
    handleLinkClick(){
        this.resetSearchState();
    }
    handleShowMoreButtonClick(){
        this.props.onShowMoreButtonClick(this.state.input_value);
    }
    render(){
        const contStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "relative"
        };
        const formStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0em 3em",
            height: "100%",
            flex: "1 1 auto"
        };
        const textInputStyle = {
            padding: "0.3em 0.15em",
            alignSelf: "center",
            flex: "1 1 auto"
        };
        const btnDivStyle = {
            display: "inline-block",
            alignSelf: "center"
        };
        const srchBtnStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0",
            height: "1.5em"
        };
        const svgStyle = {
            width: "1em",
            height: "1em"
        };        

        /*
            Search Bar Thoughts
            Query results pane will be a jumping-off point to fuller results
            Should be able to click a result in the query and go to its relevant page
            +click media, go to details
            ++details show where used?
            +click album, go to details
            +click tag, go to search for where used
            ++create details page, show where used?
            Should have a 'Show more...' button to redirect to the full search page
            If click the search button, redirect to the full search page with the 
            input search term
        */

        return(
            <div style={contStyle}>
                <form style={formStyle}>
                    <input type='text' placeholder='Search...' style={textInputStyle} ref={this.inputRef} value={this.state.input_value} onChange={e=>this.handleInputChange(e)}/>                    
                    <div style={btnDivStyle}>
                        <button className={"headerBtn"} type='submit' style={srchBtnStyle}>
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {this.state.show_query_results &&
                    <HeaderSearchBarSuggestions query_results={this.state.query_results} 
                            onLinkClick={()=>this.handleLinkClick()} 
                            onShowMoreButtonClick={()=>this.handleShowMoreButtonClick()}/>
                }
            </div>
        );
    }
    resetSearchState(){
        this.setState({
            show_query_results: false,
            query_results: {},
            input_value: this.props.query_value ? this.props.query_value : ""
        });
    }
}