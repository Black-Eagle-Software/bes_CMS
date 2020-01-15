import React from 'react';

export class ContentFilterInput extends React.Component {
    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillUnmount(){
        this.props.onChange('');
    }
    handleInputChange(event) {        
        this.props.onChange(event.target.value);
    }
    
    render(){
        const {placeholder, onFocus, onBlur} = this.props;

        return (
            <input name='query' type='text' placeholder={placeholder} onChange={this.handleInputChange} onFocus={onFocus} onBlur={onBlur}/>
        );
    }
}