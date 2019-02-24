import React from 'react';

export default class MediaTileSelectButton extends React.PureComponent{
    constructor(props){
        super(props);

        this.state={
            selected: false
        };
    }
    componentDidMount(){
        //this.setState({selected: this.props.media.selected});
        this.setState({selected: this.props.isSelected});
    }
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState(prevState=>({selected: !prevState.selected}));
        this.props.onClick();
    }

    render(){
        const baseClasses = "media_tile_toolbar_button media_tile_select_button tile_selectBtn";

        const classname = this.state.selected ? `${baseClasses} active` : `${baseClasses}`;

        return(
            <div className={classname} title={"Select"} onClick={(e)=>this.handleButtonClick(e)}>
                &#x2714;
            </div>            
        );
    }
}