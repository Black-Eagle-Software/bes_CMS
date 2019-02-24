import React from 'react';

export default class TagSelectable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            selected: false
        };
    }
    componentDidMount(){
        this.setState({selected: this.props.selected});
    }
    handleChange(e){
        let val = e.target.checked;
        this.setState({selected: val});
        this.props.onTagClick(this.props.tag, val);
    }
    render(){
        const contStyle={
            display: "inline-block",
            margin: "0.25em 0.5em",
            minWidth: "10em"
        };

        return(
            <div style={contStyle}>
                <label><input type="checkbox" checked={this.state.selected} onChange={(e)=>this.handleChange(e)}/>{this.props.description}</label>
            </div>
        );
    }
}