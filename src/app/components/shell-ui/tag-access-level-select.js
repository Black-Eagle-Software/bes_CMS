import React from 'react';
import axios from 'axios';

const uuid = require('uuid/v4');

export class TagAccessLevelSelect extends React.Component{
    constructor(props){
        super(props);

        this.state={
            accessLevels: [],
            selected: null,
            index: 0
        };

        this.handleAccessLevelChange = this.handleAccessLevelChange.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/access_levels`)
        .then(res=>{
            this.setState({
                accessLevels: res.data,
                selected: res.data[this.state.index]
            }, ()=>{
                this.props.onAccessLevelChange(this.state.accessLevels[this.state.index].id);
            });
        });
    }
    handleAccessLevelChange(event){
        let val = event.target.value;
        this.setState({
            selected: this.state.accessLevels[val],
            index: val
        }, ()=>{
            this.props.onAccessLevelChange(this.state.accessLevels[val].id);
        });
    }
    render(){
        return(
            <select name="accessLevel" value={this.state.index} onChange={this.handleAccessLevelChange}>
                {this.state.accessLevels.map((level, index)=>{
                    return <option key={uuid()} value={index}>{level.id}</option>
                })}
            </select>
        );
    }
}