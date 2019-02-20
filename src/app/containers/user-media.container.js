import React from 'react';
import axios from 'axios';
import PageContent from '../components/pages/page-component';
import MediaTilesList from '../components/media/media-tiles-list.component';
import MediaDeleteConfirmation from '../components/media/media-delete-confirmation.component';
import ViewToolbar from '../components/view-toolbar.component';
import MediaDeleteSelectionConfirmation from '../components/media/media-delete-selection-confirmation.component';
import Queue from '../../models/queue';

export default class UserMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],            
            show_delete_dialog: false,
            request_delete_media: {},
            show_delete_selection_dialog: false,
            show_media_zoom: false,
            media_zoom_source: {}
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }
    getSelectionCount(){
        let count = this.state.media.filter(media=>media.selected);
        return count.length;
    }

    handleDeleteButtonClick(media){
        //need to tell the server to delete the media
        //confirm?
        console.log(`Trying to delete: (${media.file.id}) ${media.file.originalFilename}`);
        this.setState({
            show_delete_dialog: true,
            request_delete_media: media
        });        
    }
    handleDeleteDialogCloseClick(){
        this.setState({
            show_delete_dialog: false,
            request_delete_media: {}
        });
    }
    handleDeleteConfirmButtonClick(media){
        axios.delete(`/api/m/${media.file.id}`).then(res=>{
            console.log(res);
            this.setState({
                show_delete_dialog: false,
                request_delete_media: {}
            });
            this.updateMediaFromDatabase();
        });
    }
    handleDeleteSelection(queue){
        axios.delete(`/api/m/${queue.next().file.id}`).then(res=>{
            console.log(res);
            if(queue.length() > 0){
                this.handleDeleteSelection(queue);
            }else{
                this.setState({show_delete_selection_dialog: false});
                this.updateMediaFromDatabase(); 
            }
        });
    }
    handleDeleteSelectionClick(){
        this.setState({show_delete_selection_dialog: true});
    }
    handleDeleteSelectionConfirmButtonClick(){
        let q = new Queue(this.state.media.filter(media=>media.selected));
        this.handleDeleteSelection(q);                  
    }
    handleDeleteSelectionDialogCloseClick(){
        this.setState({show_delete_selection_dialog: false});
    }
    handleDeselectClick(){
        let temp = this.state.media;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].selected){
                temp[i].selected = false;
            }
        }
        this.setState({media: temp});
    }
    handleDownloadSelectionClick(){
        axios.post(`/api/archive/zip`, {media: this.state.media.filter(media=>media.selected)}, {headers: {'Content-Type':'application/json'}})
        .then(res=>{
            console.log(res);
            window.location = `/api/archive/zip/${res.data.file}`;
        });
    }
    handleMediaSelect(media){
        let temp = this.state.media;
        let media_index = temp.indexOf(media);
        temp[media_index].selected = !temp[media_index].selected;
        this.setState({media: temp});
    }
    handleZoomMediaClick(media){
        this.setState({
            show_media_zoom: true,
            media_zoom_source: media
        });
    }
    handleHideZoomMedia(){
        this.setState({show_media_zoom: false});
    }
    handleZoomMediaNext(origin){
        let media_index = origin.indexOf(this.state.media_zoom_source);
        if(media_index + 1 === origin.length){
            media_index = 0;
        }else{
            media_index += 1;
        }
        this.setState({
            media_zoom_source: origin[media_index]
        });
    }
    handleZoomMediaPrevious(origin){
        let media_index = origin.indexOf(this.state.media_zoom_source);
        if(media_index === 0){
            media_index = origin.length - 1;
        }else{
            media_index -= 1;
        }
        this.setState({
            media_zoom_source: origin[media_index]
        });
    }
    render(){
        const contStyle = {
            height: "100%",
            width: "100%",
            overflow: "auto",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap"
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

        return(
            <PageContent    isAutoSizerListContent={true}
                            show_media_zoom={this.state.show_media_zoom}
                            media_zoom_source={this.state.media_zoom_source}
                            hideMediaZoom={()=>{this.handleHideZoomMedia()}}
                            onMediaZoomPreviousClick={()=>{this.handleZoomMediaPrevious(this.state.media)}}
                            onMediaZoomNextClick={()=>{this.handleZoomMediaNext(this.state.media)}} 
                            hasViewToolbar={true}
                            toolbarChildren={
                                <div>
                                    {this.state.media.filter(media=>media.selected).length > 0 &&
                                        <div className={"toolbar_btn"} onClick={()=>this.handleDownloadSelectionClick()}>
                                            <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                            </svg>
                                            Download as zip
                                        </div>
                                    }
                                    {this.state.media.filter(media=>media.selected).length > 0 &&
                                        <div className={"toolbar_btn"} onClick={()=>this.handleDeleteSelectionClick()}>
                                            &#x2716;
                                            Delete selected media 
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
                            }>
                {this.state.show_delete_dialog && 
                    <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                }
                {this.state.show_delete_selection_dialog &&
                    <MediaDeleteSelectionConfirmation count={this.getSelectionCount()} onCloseClick={()=>this.handleDeleteSelectionDialogCloseClick()} onConfirmClick={()=>this.handleDeleteSelectionConfirmButtonClick()}/>
                }
                {this.state.media &&
                    <div style={outerDivStyle}>
                        <div style={{ flex: "0 1 auto"}}>
                            <h2 style={{margin: "0.5em"}}>All Media for {this.props.username} ({this.state.media.length})</h2>
                        </div>
                        <div style={{flex: "1 0 auto", paddingLeft: "1em", paddingTop: "1em"}}>
                            <MediaTilesList media={this.state.media} 
                                            onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                            onMediaInfoClick={(media)=>this.handleZoomMediaClick(media)} 
                                            can_delete={true}
                                            include_show_all_button={false}
                                            allow_selection={true} 
                                            onMediaSelect={(media)=>this.handleMediaSelect(media)}
                                            onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)} />
                        </div>
                    </div>
                }
            </PageContent>
        )
        
        return(
            <div style={outerDivStyle}>
                {this.state.media.some(media=>media.selected) &&
                    <ViewToolbar>
                        <div>
                            <div className={"toolbar_btn"} onClick={()=>this.handleDownloadSelectionClick()}>
                                <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                                Download as zip
                            </div>
                            <div className={"toolbar_btn"} onClick={()=>this.handleDeleteSelectionClick()}>
                                &#x2716;
                                Delete selected media 
                            </div>
                            {/* will want things like download all media as a .zip file */}
                            <div style={deselectStyle} className={"toolbar_btn"} onClick={()=>this.handleDeselectClick()} title={"Deselect"}>                                
                                <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
                                </svg>
                                {this.state.media.filter(media=>media.selected).length} selected
                            </div>
                        </div>
                    </ViewToolbar>
                }
                <div style={contStyle}>
                    {this.state.show_delete_dialog && 
                        <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                    }
                    {this.state.show_delete_selection_dialog &&
                        <MediaDeleteSelectionConfirmation count={this.getSelectionCount()} onCloseClick={()=>this.handleDeleteSelectionDialogCloseClick()} onConfirmClick={()=>this.handleDeleteSelectionConfirmButtonClick()}/>
                    }
                    
                    <div style={pageStyle}>
                        {this.state.media &&
                            <div style={outerDivStyle}>
                                <h2>All Media for {this.props.username} ({this.state.media.length})</h2>
                                <div style={{flex: "1 1 auto"}}>
                                    <MediaTilesList media={this.state.media} 
                                                    onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                                    onMediaInfoClick={(media)=>this.props.onZoomMediaClick(media)} 
                                                    can_delete={true}
                                                    include_show_all_button={false}
                                                    allow_selection={true} 
                                                    onMediaSelect={(media)=>this.handleMediaSelect(media)}
                                                    onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)} />
                                </div>
                            </div>
                        }                    
                    </div>
                </div>
            </div>
        );
    }
    updateMediaFromDatabase(){
        //read our media from the dbase
        axios.get(`/api/u/${this.props.id}/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                /*temp_media.push({
                    file: res[i], 
                    src_file: `/${res[i].filePath}/${res[i].hashFilename}`, 
                    thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`, 
                    selected: false
                });*/
                res[i].selected = false;
            }
            //this.setState({media: temp_media});
            this.setState({media: response.data});
        });
    }
}