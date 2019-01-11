import React from 'react';
import axios from 'axios';
import ImageFingerprintGraphic from '../components/image-fingerprint-graphic.component';
import Header from '../components/header.component';

const uuid = require('uuid/v4');

export default class MediaDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            image_source: null,
            tags: []
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
        axios.get(`/api/m/${this.props.match.params.id}/t`)
        .then(res=>{
            if(res){
                this.setState({tags: res.data});
            }
        });
    }
    formatDateForMillisecondDate(msDate){
        let date = new Date(msDate);
        let output = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return output;
    }   
    render(){
        const contStyle = {
            padding: "70px",
            height: "100%",
            width: "100%"
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
        const tagSpanStyle = {
            background: "#006cb7",
            color: "#f5f5f5",
            borderRadius: "1em",
            padding: "0.25em 1em",
            fontSize: "0.75em",
            height: "2em",
            margin: "0 0.25em",
            cursor: "default"
        }

        return(
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
                                        <li style={liStyle}>
                                            <span style={liLabelStyle}>Tags: </span>
                                            {this.state.tags.map(tag=>{
                                                return <a key={uuid()} className={"tag"} href={`/search?t=${tag.description}`}>
                                                            {tag.description}
                                                        </a>
                                            })}
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    {!this.state.image_source &&
                        <div>
                            You currently do not have access right to this media item.
                        </div>
                    }                
                </div>
        );
    }
}