import React from 'react';

export class FilterableList extends React.Component{
    constructor(props){
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(event){        
        const value = event.target.value;
        this.props.onFilter(value);
    }
    render(){
        const { children } = this.props;

        return(
            <div>
                <div>
                    <input name='query' type='text' onChange={this.onInputChange}/>
                </div>
                {children}
            </div>
        );
    }
}