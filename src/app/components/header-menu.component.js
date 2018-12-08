import React from 'react';

export default class HeaderMenu extends React.Component{
    constructor(props){
        super(props);

        this.state={
            show_menu: false
        };
    }
    handleMenuClick(){
        this.setState(prevState=>({show_menu: !prevState.show_menu}));
    }
    render(){
        const outerContStyle={
            position: "relative"
        };
        const contStyle={
            background: "#ebebeb",
            zIndex: "500"
        };
        const listStyle={
            listStyleType: "none",
            margin: "0",
            padding: "0"
        };
        const liStyle={
            display: "block",
            textAlign: "center"
        }

        //this needs some work, but is fine for now
        return(
            <div style={outerContStyle}>
                <div className={"headerBtn"} onClick={()=>this.handleMenuClick()}>{this.props.headerName}</div>
                {this.state.show_menu &&
                    <div style={contStyle}>
                        <ul style={listStyle}>
                            {this.props.menuChildren.map(child=>{
                                return <li style={liStyle} key={child.id} className={"headerBtn"} onClick={()=>child.onClick()}>
                                    <div>{child.header}</div>
                                    </li>
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}