import React from 'react';

import styles from './toolbar-add-new-item.css';
import tbStyles from './canvas-toolbar.css';

export class ToolbarAddNewItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showEditField: false,
            itemName: '',
            canConfirmNewItem: false
        };

        this.handleAddItemCancelClick = this.handleAddItemCancelClick.bind(this);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
        this.handleAddItemConfirmClick = this.handleAddItemConfirmClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleAddItemCancelClick(){
        this.setState({showEditField: false});
    }
    handleAddItemClick(){
        this.setState({showEditField: true});
    }
    handleAddItemConfirmClick(){
        if(!this.state.canConfirmNewItem) return;
        console.log(this.state.itemName);
        this.setState({showEditField: false},()=>{
            this.props.onAddNewItem(this.state.itemName);
        });
    }
    handleInputChange(event){
        if(event.target.value === '') return;
        this.setState({
            itemName: event.target.value,
            canConfirmNewItem: true
        });
    }
    render(){
        const {addBtnTitle, placeholder} = this.props;
        return(
            <>
                <div className={tbStyles.button} title={addBtnTitle} onClick={this.handleAddItemClick}>
                    <span className='codicon codicon-plus'/>
                </div>
                {this.state.showEditField &&
                    <div className={styles.editField}>
                        <input placeholder={placeholder} onChange={this.handleInputChange}/>
                        <div className={tbStyles.spacer}/>                        
                        <div className={tbStyles.button} title={addBtnTitle} onClick={this.handleAddItemConfirmClick}>
                            <span className='codicon codicon-check'/>
                        </div>
                        <div className={tbStyles.button} title="Cancel" onClick={this.handleAddItemCancelClick}>
                            <span className='codicon codicon-close'/>
                        </div>
                    </div>
                }
            </>
        );
    }
}