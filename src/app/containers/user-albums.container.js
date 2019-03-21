import React from 'react';
import axios from 'axios';
import PageContent from '../components/pages/page-component';
import AlbumCoversList from '../components/albums/album-covers-list.component';

export default class UserAlbums extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            albums: []            
        };
    }

    componentDidMount(){
        this.updateAlbumsFromDatabase();
    }
    handleAlbumDeleteButtonClick(album){
        //Not yet implemented
        return;
    }

    render(){
        const outerDivStyle = {
            display: "flex",
            flexFlow: "column nowrap",            
            width: "100%",
            flex: "1 1 auto"
        };

        return(
            <PageContent    isAutoSizerListContent={true} 
                            hasViewToolbar={false}>
                {this.state.albums &&
                    <div style={outerDivStyle}>
                        <div style={{ flex: "0 1 auto"}}>
                            <h2 style={{margin: "0.5em"}}>All Albums for {this.props.username} ({this.state.albums.length})</h2>
                        </div>
                        <div style={{flex: "1 0 auto", paddingLeft: "1em", paddingTop: "1em"}}>
                            <AlbumCoversList    albums={this.state.albums} 
                                                onAlbumClick={(album)=>this.props.onAlbumClick(album)} 
                                                can_delete={false}
                                                onDeleteButtonClick={(album)=>this.handleAlbumDeleteButtonClick(album)}/>
                        </div>
                    </div>
                }
            </PageContent>
        );
    }

    updateAlbumsFromDatabase(){
        //read our albums from the dbase
        axios.get(`/api/u/${this.props.id}/a`)
        .then(response=>{
            this.setState({albums: response.data});
        });
    }
}