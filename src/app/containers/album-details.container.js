import React from 'react';
import axios from 'axios';
import ViewToolbar from '../components/view-toolbar.component';
import MediaTilesList from '../components/media/media-tiles-list.component';
import DateHelper from '../../helpers/date';
import WindowNavigation from '../../helpers/windowNavigation';

export default class AlbumDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            album: {},
            media: [],
            album_is_editing: false,
            possible_media: [],
            temp_album_media: []
        };
    }
    componentDidMount(){
        if(this.props.match.params.id){
            this.updateAlbumFromDatabase();
        }else{
            //creating a new album
            axios.get(`/api/u/${this.props.user_id}/m?all=true`)
            .then(response=>{
                let temp_media = [];
                let res = response.data;
                for(let i = 0; i < res.length; i++){
                    temp_media.push({file: res[i], src_file: `/${res[i].filePath}/${res[i].hashFilename}`, thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});               
                }
                this.setState({
                    album_is_editing: true,
                    //possible_media: temp_media,
                    possible_media: response.data,
                    album_name: "New album"
                });
            });
        }
    }
    handleEditAlbumClick(){
        let ta_media = [].concat(this.state.media);        
        axios.get(`/api/u/${this.props.user_id}/m?all=true`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                if(ta_media.find(m=>m.id === res[i].id) === undefined){
                    //this media is not in our ta_media
                    //temp_media.push({file: res[i], src_file: `/${res[i].filePath}/${res[i].hashFilename}`, thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
                    temp_media.push(res[i]);
                }                
            }
            this.setState(prevState=>({
                album_is_editing: !prevState.album_is_editing,
                possible_media: temp_media,
                //possible_media: response.data,
                temp_album_media: ta_media,
                album_name: this.state.album.name
            }));
        });        
    }
    handlePossibleMediaClick(media){
        let temp_media = this.state.temp_album_media;
        let pos_temp = this.state.possible_media;        
        temp_media.push(media);
        pos_temp.splice(pos_temp.indexOf(media), 1);
        this.setState({
            temp_album_media: temp_media,
            possible_media: pos_temp
        });
    }
    handleCancelChangesBtnClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({album_is_editing: false});
    }
    handleSaveChangesBtnClick(e){
        e.preventDefault();
        e.stopPropagation();
        let temp = {'album_name': this.state.album_name};
        temp.media = this.state.temp_album_media.map(m=>{return {'id': m.file.id};});
        console.log(temp);
        if(this.props.match.params.id){
            axios.put(`/api/a/${this.state.album.id}`, temp)
            .then(response=>{
                console.log(response.status);
                this.setState({album_is_editing: false});
                this.updateAlbumFromDatabase();
            })
        }else{
            axios.post(`/api/a`, temp)
            .then(response=>{
                console.log(response);
                //this needs to change to the album details page :(
                WindowNavigation.goToLocation(`/album_details/${response.data.id}`);
            });
        }
    }
    handleTempDeleteButtonClick(media){
        //remove media from the temp album media list
        let temp_media = this.state.temp_album_media;
        let pos_temp = this.state.possible_media;        
        pos_temp.unshift(media);        //add to the front of hte possibles array
        temp_media.splice(temp_media.indexOf(media), 1);
        this.setState({
            temp_album_media: temp_media,
            possible_media: pos_temp
        });
    }
    handleAlbumNameChange(e){
        this.setState({album_name: e.target.value});
    }

    render(){
        const contStyle = {
            height: "100%",
            width: "100%",
            //overflow: "auto",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            overflowX: "hidden",
            overflowY: "auto"
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
        const deselectStyle = {
            float: "right"
        };
        const borderStyle = {
            borderTop: "1px dashed #666666",
            width: "100%",
            margin: "0.5em 0.5em 1.25em 0.5em"
        };
        const toolbarStyle = {
            float: "right"
        };
        const buttonStyle = {
            marginRight: "0.5em"
        };

        const editAlbumClass = this.state.album_is_editing ? "toolbar_btn active" : "toolbar_btn";

        return(
            <div style={outerDivStyle}>
                <ViewToolbar>
                    <div>
                        <div className={editAlbumClass} onClick={()=>this.handleEditAlbumClick()}>
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M18,14.5V11A1,1 0 0,0 17,10H16C18.24,8.39 18.76,5.27 17.15,3C15.54,0.78 12.42,0.26 10.17,1.87C9.5,2.35 8.96,3 8.6,3.73C6.25,2.28 3.17,3 1.72,5.37C0.28,7.72 1,10.8 3.36,12.25C3.57,12.37 3.78,12.5 4,12.58V21A1,1 0 0,0 5,22H17A1,1 0 0,0 18,21V17.5L22,21.5V10.5L18,14.5M13,4A2,2 0 0,1 15,6A2,2 0 0,1 13,8A2,2 0 0,1 11,6A2,2 0 0,1 13,4M6,6A2,2 0 0,1 8,8A2,2 0 0,1 6,10A2,2 0 0,1 4,8A2,2 0 0,1 6,6Z" />
                            </svg>
                            Edit album
                        </div>
                        {!this.state.album_is_editing && 
                            <div className={"toolbar_btn"} onClick={()=>this.handleDownloadSelectionClick()}>
                                <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                                Download as zip
                            </div>
                        }
                        {!this.state.album_is_editing &&
                            <div className={"toolbar_btn"} onClick={()=>this.handleDeleteSelectionClick()}>
                                &#x2716;
                                Remove selected media 
                            </div>
                        }
                        {/* will want things like download all media as a .zip file */}
                        <div style={deselectStyle} className={"toolbar_btn"} onClick={()=>this.handleDeselectClick()} title={"Deselect"}>                                
                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
                            </svg>
                            {this.state.media.filter(media=>media.selected).length} selected
                        </div>
                    </div>
                </ViewToolbar>
                <div style={contStyle}>
                    <div style={pageStyle}>
                        Album {this.props.match.params.id} details
                        <br/>
                        {!this.state.album_is_editing &&
                            <h4>{this.state.album.name} ({DateHelper.formatDateForMillisecondDate(this.state.album.dateCreated)})</h4>
                        }
                        {this.state.album_is_editing &&
                            <input type='text' onChange={(e)=>this.handleAlbumNameChange(e)} value={this.state.album_name} />
                        }
                        {!this.state.album_is_editing && this.state.media && this.state.media.length > 0 &&                            
                            <div style={{maxHeight: "100%", minHeight: "10%", flex: "1 1 auto"}}>
                            <MediaTilesList media={this.state.media}
                                            onMediaClick={(media)=>this.props.onMediaInfoClick(media)} 
                                            onMediaInfoClick={(media)=>this.props.onZoomMediaClick(media)} 
                                            can_delete={false}
                                            include_show_all_button={false}
                                            allow_selection={false} />
                            </div>
                        }
                        {this.state.album_is_editing && this.state.temp_album_media && this.state.temp_album_media.length > 0 &&
                            <div style={{maxHeight: "50%", flex: "1 1 auto"}}>
                            <MediaTilesList media={this.state.temp_album_media} 
                                            onMediaInfoClick={(media)=>this.props.onZoomMediaClick(media)} 
                                            can_delete={true}
                                            onMediaDeleteClick={(media)=>this.handleTempDeleteButtonClick(media)}
                                            allow_selection={false}
                                            allow_reorder={true} />
                            </div>
                        }
                        {this.state.album_is_editing && this.state.temp_album_media && this.state.temp_album_media.length > 0 &&
                            <div style={toolbarStyle}>
                                <button style={buttonStyle} className={'btn btn-primary'} onClick={(e)=>this.handleSaveChangesBtnClick(e)}>Save changes</button>
                                <button className={'btn btn-danger'} onClick={(e)=>this.handleCancelChangesBtnClick(e)}>Cancel</button>
                            </div>
                        }
                        {this.state.album_is_editing &&
                            <span style={borderStyle}></span>
                        }
                        {this.state.album_is_editing && this.state.possible_media && this.state.possible_media.length > 0 &&
                            <div style={{maxHeight: "100%", minHeight: "10%", flex: "1 1 auto"}}>
                            <MediaTilesList media={this.state.possible_media} 
                                            onMediaClick={(media)=>this.handlePossibleMediaClick(media)} 
                                            can_delete={false}
                                            include_show_all_button={false}
                                            allow_selection={false} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
    updateAlbumFromDatabase(){        
        axios.get(`/api/a/${this.props.match.params.id}`)
        .then(response=>{
            this.setState({album: response.data[0]});
        });

        axios.get(`/api/a/${this.props.match.params.id}/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            /*for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `/${res[i].filePath}/${res[i].hashFilename}`, thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});                
            }*/
            //this.setState({media: temp_media});
            this.setState({media: response.data});
        });
    }
}