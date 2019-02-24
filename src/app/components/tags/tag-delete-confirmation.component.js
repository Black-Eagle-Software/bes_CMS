import React from 'react';
import DialogOverlay from '../dialog-overlay.component';

export default class TagDeleteConfirmation extends React.PureComponent{
    render(){
        const {tag} = this.props;

        return(
            <DialogOverlay>
                <h2>You are about to delete the following tag.</h2>                
                <div className="tagFrame">
                    {tag.description}
                </div>
                <br/>
                This can not be undone.  The tag will be removed from the server's database and from any media that may be tagged with it.
                <div className="commandContainer">
                    <h2>Continue with delete?</h2>
                    <div>
                        <button className="btn-danger paneBtn" onClick={()=>this.props.onConfirmClick(tag)}>Delete tag</button>                        
                        <button className="paneBtn" onClick={()=>this.props.onCloseClick()}>Cancel</button>
                    </div>
                </div>
            </DialogOverlay>
        )
    }
}