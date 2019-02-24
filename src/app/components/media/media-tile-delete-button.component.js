import React from 'react';

export default class MediaTileDeleteButton extends React.PureComponent{
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onClick();
    }

    render(){
        const title = this.props.title ? this.props.title : "Remove media";

        return(
            <div    className="media_tile_toolbar_button media_tile_delete_button tile_deleteBtn" 
                    onClick={(e)=>this.handleButtonClick(e)} 
                    title={title}>
                &#x2716;
            </div>            
        );
    }
}