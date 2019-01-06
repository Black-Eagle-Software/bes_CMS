import React from 'react';

export default class Search extends React.Component{
    render(){
        return(
            <div>
                Search page
                {this.props.location.search} {/*need to parse this myself*/}                            
            </div>
        );
    }
}