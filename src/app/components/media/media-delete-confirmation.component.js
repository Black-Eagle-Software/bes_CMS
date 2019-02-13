import React from 'react';
import DialogOverlay from '../dialog-overlay.component';

export default class MediaDeleteConfirmation extends React.PureComponent{
    handleCancelClick(){
        this.props.onCloseClick();
    }
    handleConfirmClick(){
        this.props.onConfirmClick(this.props.media);
    }
    render(){
        const imgFrameStyle={
            display: "flex",
            justifyContent: "center",
            flex: "1 1 auto",
            maxHeight: "50%",
            /*objectFit: "contain"*/
        };
        const imgStyle={
            maxHeight: "100%",
            maxWidth: "100%",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)",
            objectFit: "cover",
            flex: "1 1 auto"
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

        const filename = this.props.media.originalFilename;
        const src = `/${this.props.media.filePath}/${this.props.media.hashFilename}`;

        return(
            <DialogOverlay>
                <h2>You are about to delete the following media item.</h2>                
                <div style={imgFrameStyle}>
                    <img style={imgStyle} src={src} alt={filename}></img>
                </div>
                <br/>
                This can not be undone.  The media item will be removed from the server's database, including any albums that may contain it, and deleted from the server's file system.
                <div style={commandsStyle}>
                    <h2>Continue with delete?</h2>
                    <div>
                        <button className={"btn-danger"} style={btnStyle} onClick={()=>this.handleConfirmClick()}>Delete media</button>                        
                        <button style={btnStyle} onClick={()=>this.handleCancelClick()}>Cancel</button>
                    </div>
                </div>
            </DialogOverlay>
        )
    }
}