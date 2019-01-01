import React from 'react';
import axios from 'axios';
import ImageFingerprintGraphic from '../components/image-fingerprint-graphic.component';
import Header from '../components/header.component';

export default class MediaDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            image_source: null
        };
    }
    componentDidMount(){
        axios.get(`/api/m/${this.props.match.params.id}`)
        .then(res=>{
            //console.log(res);
            if(res){
                this.setState({image_source: res.data});
            }
        });
    }
    formatDateForMillisecondDate(msDate){
        let date = new Date(msDate);
        let output = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return output;
    }
    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }    
    render(){
        const contStyle = {
            /*position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "0px", 
            left: "0px",
            bottom: "0px",
            right: "0px",*/
            /*background: "rgba(15, 15, 15, 0.98)",
            color: "#f5f5f5",
            zIndex: "1000",*/
            padding: "70px"
        };
        const contentStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        };
        const imgStyle = {
            maxWidth: "100%",
            maxHeight: "100%",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)"
        };
        const detailsDivStyle={
            width: "100%",
            flex: "1 1 auto"
        };
        const ulStyle = {
            listStyle: "none",
            padding: "0"
        };
        const liStyle={
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "baseline",
            justifyContent: "flex-start"
        };
        const liItemStyle={
            //padding: "0.25em 0.5em",
            color: "#1f1f1f"
        };
        const liLabelStyle = {
            flex: "1 1 auto",
            color: "#666666"
        };

        return(
            <div>
                <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username} id={this.props.user_id} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
            
                <div style={contStyle}>                
                    {this.state.image_source &&
                        <div> 
                            Media details for: {this.props.match.params.id}
                            <div style={contentStyle}>
                                {this.state.image_source.type !== "video" && 
                                    <img style={imgStyle} src={`../${this.state.image_source.filePath}/${this.state.image_source.hashFilename}`} alt={this.state.image_source.originalFilename}/>
                                }
                                <div style={detailsDivStyle}>
                                    <ul style={ulStyle}>
                                        <li style={liStyle}><span style={liLabelStyle}>ID: </span><span style={liItemStyle}>{this.state.image_source.id}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>File date: </span><span style={liItemStyle}>{this.formatDateForMillisecondDate(this.state.image_source.fileDate)}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Date added: </span><span style={liItemStyle}>{this.formatDateForMillisecondDate(this.state.image_source.dateAdded)}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Perceptual hash (pHash): </span><span style={liItemStyle}><ImageFingerprintGraphic hash={this.state.image_source.pHash}/></span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>File path: </span><span style={liItemStyle}>{this.state.image_source.filePath}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Hashed filename: </span><span style={liItemStyle}>{this.state.image_source.hashFilename}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Thumbnail filename: </span><span style={liItemStyle}>{this.state.image_source.thumbnailFilename}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Owner: </span><span style={liItemStyle}>{this.state.image_source.owner}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Tags: </span><span style={liItemStyle}>This space intentionally left blank</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }                
                </div>
            </div>
        );
    }
}