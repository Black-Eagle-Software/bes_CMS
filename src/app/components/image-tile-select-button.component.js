import React from 'react';

export default class ImageTileSelectButton extends React.PureComponent{
    constructor(props){
        super(props);

        this.state={
            selected: false
        };
    }
    componentDidMount(){
        this.setState({selected: this.props.media.selected});
    }
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState(prevState=>({selected: !prevState.selected}));
        this.props.onMediaSelect();
    }

    render(){
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "0.25em",
            left: "0.25em",            
            width: "1.5em",
            height: "1.5em",
            borderRadius: "0.75em",            
            cursor: "default",
            textDecoration: "none"
        };

        const classname = this.state.selected ? "tile_selectBtn active" : "tile_selectBtn";

        return(
            <div style={buttonStyle} className={classname} title={"Select"} onClick={(e)=>this.handleButtonClick(e)}>
                &#x2714;
            </div>            
        );
    }
}