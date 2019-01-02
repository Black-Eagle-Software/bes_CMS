import React from 'react';
import axios from 'axios';

const uuid = require('uuid/v4');

export default class HeaderSearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input_value: "",
            show_query_results: false,
            query_results: {}
        }
    }
    handleInputChange(e){
        //maybe this should offload this to a parent component
        //such that we can redirect to a dedicated search result page?
        let val = e.target.value;
        if(val.length >= 3){
            //fire the missiles!
            axios.get(`/api/search?s=${val}`)
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
        const resultsDivStyle = {
            position: "absolute",
            width: "100%",
            background: "#ebebeb",
            zIndex: "500",
            top: "2em",
            boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
            padding: "0.5em"
        };

        return(
            <div style={contStyle}>
                <form style={formStyle}>
                    <input type='text' style={textInputStyle} ref={this.inputRef} value={this.state.input_value} onChange={e=>this.handleInputChange(e)}/>
                    <div style={btnDivStyle}>
                        <button className={"headerBtn"} type='submit' style={srchBtnStyle}>
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {this.state.show_query_results &&
                    <div style={resultsDivStyle}>
                        <div>Albums:
                            <ul>
                                {this.state.query_results.albums.length > 0 && this.state.query_results.albums.map(result=>{
                                    return <li key={uuid()}>{result.name}</li>
                                })}
                            </ul>
                        </div>
                        <div>Media:
                            <ul>
                                {this.state.query_results.media.length > 0 && this.state.query_results.media.map(result=>{
                                    return <li key={uuid()}>{result.originalFilename}</li>
                                })}
                            </ul>
                        </div>
                        <div>Tags:
                            <ul>
                                {this.state.query_results.tags.length > 0 && this.state.query_results.tags.map(result=>{
                                    return <li key={uuid()}>{result.description}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}