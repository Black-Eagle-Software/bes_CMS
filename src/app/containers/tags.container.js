import React from 'react';
import axios from 'axios';
import TagDeleteConfirmation from '../components/tag-delete-confirmation.component';
import TagAddForm from '../components/tag-add-form.component';

const uuid = require('uuid/v4');

export default class Tags extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            public_tags: [],
            user_tags: [],
            show_delete_dialog: false
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
            console.log(res);
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
    handleDeleteConfirmButtonClick(tag){
        axios.delete(`/api/t/${tag.id}`).then(res=>{
            console.log(res);
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

        return(
            <div style={contStyle}>
                {this.state.show_delete_dialog && 
                    <TagDeleteConfirmation tag={this.state.request_delete_tag} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(tag)=>this.handleDeleteConfirmButtonClick(tag)}/>
                }                
                <div style={pageStyle}>
                    <span className={"tag gray"} title="Add new tag" onClick={()=>this.handleAddNewTagClick()}>Add new tag</span>                
                    {this.state.show_add_form && 
                        <TagAddForm onAddTag={(data)=>this.handleAddTag(data)} onCancelClick={()=>this.handleAddTagCancelClick()}/>
                    }
                    <div>
                        User Tags: 
                        <div>
                            {/* color the tags based on access level */}
                            {this.state.user_tags.map(tag=>{
                                return  <a key={uuid()} className={`tag ${tag.accessLevel}`} href={`/search?t=${tag.description}`}>                                            
                                            <div style={tagLinkStyle}>
                                                <span>{tag.description}</span>
                                                <div style={buttonStyle} className={"tile_deleteBtn"} onClick={(e)=>this.handleButtonClick(e, tag)} title={"Delete tag"}>
                                                    &#x2716;
                                                </div>
                                            </div>
                                        </a>
                                                                            
                            })}
                        </div>
                    </div>
                    <br/>
                    <div>
                        Public Tags:
                        <div>
                            {this.state.public_tags.map(tag=>{
                                return <a key={uuid()} className={"tag"} href={`/search?t=${tag.description}`}>
                                            {tag.description}
                                        </a>
                            })}
                        </div>
                    </div>
                </div>
            </div>
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