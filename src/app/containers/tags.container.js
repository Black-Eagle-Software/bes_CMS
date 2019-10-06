import React from 'react';
import axios from 'axios';
import TagDeleteConfirmation from '../components/tags/tag-delete-confirmation.component';
import TagAddForm from '../components/tags/tag-add-form.component';
import TagList from '../components/tags/tag-list.component';
import PageContent from '../components/pages/page-component';

const uuid = require('uuid/v4');

export default class Tags extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            public_tags: [],
            user_tags: [],
            show_delete_dialog: false,
            edit_tags: false
        };
    }
    componentDidMount(){
        this.updateTagsFromDatabase();
    }
    handleAddNewTagClick(){
        this.setState({show_add_form: true});
    }
    handleAddTag(data){        
        axios.post('/api/t', data, {headers: {'Content-Type':'application/json'}})
        .then(res=>{
            this.updateTagsFromDatabase();
        });
        this.setState({show_add_form: false});
    }
    handleAddTagCancelClick(){
        this.setState({show_add_form: false});
    }
    handleButtonClick(e, tag){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            show_delete_dialog: true,
            request_delete_tag: tag
        });
    }
    handleEditTagsClick(){
        this.setState(prevState=>({edit_tags: !prevState.edit_tags}));
    }
    handleRemoveTag(tag){
        this.setState({
            show_delete_dialog: true,
            request_delete_tag: tag
        });
    }
    handleDeleteConfirmButtonClick(tag){
        axios.delete(`/api/t/${tag.id}`).then(res=>{
            this.setState({
                show_delete_dialog: false,
                request_delete_tag: {}
            });
            this.updateTagsFromDatabase();
        });
    }
    handleDeleteDialogCloseClick(){
        this.setState({
            show_delete_dialog: false,
            request_delete_tag: {}
        });
    }
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row nowrap",
            height: "100%",
            width: "100%"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            marginRight: "1em",
            marginTop: "1em"
        };
        const tagLinkStyle = {
            display: "inline-flex",
            alignItems: "center"
        };
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",            
            width: "1.5em",
            height: "1.5em",
            borderRadius: "0.75em",            
            cursor: "default",
            marginLeft: "0.25em",
            marginRight: "-0.75em"
        };
        const svgStyle = {
            position: "relative",
            top: "6px",
            width: "24px",
            height: "24px",
            marginRight: "0.25em"
        };

        //this needs to be changed to use a toolbar and have an edit state (so tags can search on click by default)
        return(
            <PageContent    hasViewToolbar={true}
                            toolbarChildren={
                                <div>
                                    <div className={this.state.show_add_form ? "toolbar_btn active" : "toolbar_btn"} onClick={()=>this.handleAddNewTagClick()}>                                        
                                        <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                        Add new tag
                                    </div>
                                    <div className={this.state.edit_tags ? "toolbar_btn active" : "toolbar_btn"} onClick={()=>this.handleEditTagsClick()}>
                                        <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                            <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                        </svg>
                                        Edit tags 
                                    </div>                                    
                                </div>
                            }>
                {this.state.show_delete_dialog && 
                    <TagDeleteConfirmation tag={this.state.request_delete_tag} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(tag)=>this.handleDeleteConfirmButtonClick(tag)}/>
                }
                {/*<span className={"tag gray"} title="Add new tag" onClick={()=>this.handleAddNewTagClick()}>Add new tag</span>*/}
                {this.state.show_add_form && 
                    <TagAddForm onAddTag={(data)=>this.handleAddTag(data)} onCancelClick={()=>this.handleAddTagCancelClick()}/>
                }
                <div>
                    User Tags: 
                    <div>
                        {/* color the tags based on access level */}
                        <TagList    tags={this.state.user_tags}
                                    show_access_level_colors={true}
                                    canAdd={false}
                                    canRemove={this.state.edit_tags}
                                    onRemoveTag={(tag)=>this.handleRemoveTag(tag)}/>
                    </div>
                </div>
                <br/>
                <div>
                    Public Tags:
                    <div>
                        <TagList    tags={this.state.public_tags}
                                    show_access_level_colors={false}
                                    canAdd={false}
                                    canRemove={false}/>
                    </div>
                </div>
            </PageContent>
        );
    }
    updateTagsFromDatabase(){
        //get our tags list
        axios.get(`/api/u/${this.props.id}/t`)
        .then(res=>{
            this.setState({
                user_tags: res.data
            });
        });
        axios.get('/api/t')
        .then(res=>{
            this.setState({
                public_tags: res.data
            });
        });
    }
}