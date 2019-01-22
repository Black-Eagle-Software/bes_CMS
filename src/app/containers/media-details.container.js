import React from 'react';
import axios from 'axios';
import ImageFingerprintGraphic from '../components/image-fingerprint-graphic.component';
import ViewToolbar from '../components/view-toolbar.component';

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
            width: "100%",
            overflow: "auto",
            flex: "1 1 auto"            
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
        const svgStyle = {
            position: "relative",
            top: "6px",
            width: "24px",
            height: "24px",
            marginRight: "0.25em"
        };
        const outerDivStyle = {
            display: "flex",
            flexFlow: "column nowrap",            
            width: "100%",
            flex: "1 1 auto"
        };

        return(
            <div style={outerDivStyle}>
                <ViewToolbar>
                {this.state.image_source &&
                    <div>
                        <div className={"toolbar_btn"}>
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z" />
                            </svg>
                            Edit media tags 
                        </div>
                        <a className={"toolbar_btn"} href={`/search?phash=${this.state.image_source.pHash}`} title={"Find similar images"}>
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                            Find similar media
                        </a>
                        <a className={"toolbar_btn"} href={`../${this.state.image_source.filePath}/${this.state.image_source.hashFilename}`} download={this.state.image_source.originalFilename} title={"Download media"}>
                            <svg style={svgStyle}>
                                <path d={"M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"} />
                            </svg>
                            Download media
                        </a>
                    </div>
                }
                </ViewToolbar>
                <div style={contStyle}>                
                    {this.state.image_source &&
                        <div> 
                            {/*Media details for: {this.props.match.params.id}*/}                            
                            {/*<a className={"downloadLink"} href={`../${this.state.image_source.filePath}/${this.state.image_source.hashFilename}`} download={this.state.image_source.originalFilename} title={"Download media"}>
                                <svg style={svgStyle}>
                                    <path d={"M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"} />
                                </svg>
                            </a>*/}
                            <div style={contentStyle}>
                                {this.state.image_source.type !== "video" && 
                                    <img ref={this.imgRef} style={imgStyle} src={`../${this.state.image_source.filePath}/${this.state.image_source.hashFilename}`} alt={this.state.image_source.originalFilename}/>
                                }
                                <div style={detailsDivStyle}>
                                    <ul style={ulStyle}>
                                        <li style={liStyle}><span style={liLabelStyle}>ID: </span><span style={liItemStyle}>{this.state.image_source.id}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Filename: </span><span style={liItemStyle}>{this.state.image_source.originalFilename}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Dimensions:</span><span style={liItemStyle}>{this.state.image_source.width} x {this.state.image_source.height}</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Width:</span><span style={liItemStyle}>{this.state.image_source.width} pixels</span></li>
                                        <li style={liStyle}><span style={liLabelStyle}>Height:</span><span style={liItemStyle}>{this.state.image_source.height} pixels</span></li>
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
                            You currently do not have access right to this media item or some other type of error occurred.
                        </div>
                    }                
                </div>
            </div>
        );
    }
}