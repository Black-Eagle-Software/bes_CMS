import React from 'react';
import axios from 'axios';

const uuid = require('uuid/v4');

export default class TagAddForm extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            access_levels: [],
            selected_access_level: {},
            selected_index: 0,
            description: "",
            is_description_bad: false
        };
    }
    componentDidMount(){
        axios.get(`/api/access_levels`)
        .then(res=>{
            this.setState({
                access_levels: res.data,
                selected_access_level: res.data[0]
            });
        });
    }
    handleAccessLevelChange(e){
        let val = e.target.value;
        this.setState({
            selected_access_level: this.state.access_levels[val],
            selected_index: val
        });
    }
    handleCancelClick(){
        this.props.onCancelClick();
    }
    handleSubmit(e){
        e.preventDefault();
        let form = e.target;
        if(!form.checkValidity()) return;   //form is invalid
        let data = {description: form.elements.description.value, access_level: this.state.selected_access_level.id};
        //let data = new FormData();
        //data.append('description', this.state.description);
        //data.append('access_level', this.state.selected_access_level.id);
        this.props.onAddTag(data);
        //reset the form
        form.elements.description.value = "";
        form.elements.access_level.value=0;
    }
    render(){
        return(
            <form noValidate onSubmit={(e)=>this.handleSubmit(e)}>
                <input name="description" type="text" placeholder="Description" required autoFocus/>
                <div>
                    <label >Access level:
                        <select name="access_level" value={this.state.selected_index} onChange={(e)=>this.handleAccessLevelChange(e)}>
                            {this.state.access_levels.map((level, index)=>{
                                return <option key={uuid()} value={index}>{level.id}</option>
                            })}
                        </select>
                    </label>                    
                    {this.state.selected_access_level &&
                        <span>{this.state.selected_access_level.description}</span>
                    }
                </div>
                <button>Add</button>
                <button onClick={()=>this.handleCancelClick()}>Cancel</button>
            </form>
        );
    }
}