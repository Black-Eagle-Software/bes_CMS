import React from 'react';
import DialogOverlay from '../dialog-overlay.component';
import AlbumCover from './album-cover.component';

export default class AlbumDeleteConfirmation extends React.PureComponent{
    handleCancelClick(){
        this.props.onCloseClick();
    }
    handleConfirmClick(){
        this.props.onConfirmClick(this.props.album);
    }
    render(){
        const imgFrameStyle={
            display: "flex",
            justifyContent: "center",
            flex: "1 1 auto",
            maxHeight: "50%",
            objectFit: "contain"
        };
        const commandsStyle={
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "0 0 auto"
        };
        const btnStyle={
            margin: "0em 0.25em"
        };

        return(
            <DialogOverlay>
                <h2>You are about to delete the following album.</h2>                
                <div style={imgFrameStyle}>
                    <AlbumCover album={this.props.album}/>
                </div>
                <br/>
                This can not be undone.  The album will be removed from the server's database and will no longer be accessible.
                <div style={commandsStyle}>
                    <h2>Continue with delete?</h2>
                    <div>
                        <button className={"btn-danger"} style={btnStyle} onClick={()=>this.handleConfirmClick()}>Delete album</button>                        
                        <button style={btnStyle} onClick={()=>this.handleCancelClick()}>Cancel</button>
                    </div>
                </div>
            </DialogOverlay>
        )
    }
}