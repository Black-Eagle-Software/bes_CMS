import React from 'react';
import axios from 'axios';
import { MediaFingerprintGraphic } from './media-fingerprint-graphic';
import DateHelper from '../../../helpers/date';
import { PanelCloseButton } from './panel-close-button';
import { TagsList } from './tags-list';

import styles from './media-details.css';

export class MediaDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags: []
        };
    }
    componentDidMount(){
        axios.get(`/api/m/${this.props.media.id}/t`)
        .then(res=>{
            if(res){
                this.setState({tags: res.data});
            }
        });
    }
    render(){
        return(
            <div className={styles.container}>
                <PanelCloseButton onClose={()=>this.props.onCloseClick()}/>
                {this.props.media &&
                    <div className={styles.innerContainer}>
                        <TagsList tags={this.state.tags} onRowClick={(tag)=>this.props.onTagClick(tag)}/>
                        <div className={styles.content}>
                            {this.props.media.type !== "video" && 
                                <img ref={this.imgRef} className={styles.image} src={`../${this.props.media.filePath}/${this.props.media.hashFilename}`} alt={this.props.media.originalFilename}/>
                            }
                            <div className={styles.details}>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}><span className={styles.label}>ID: </span>                      <span className={styles.value}>{this.props.media.id}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Filename: </span>                <span className={styles.value}>{this.props.media.originalFilename}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Dimensions:</span>               <span className={styles.value}>{this.props.media.width} x {this.props.media.height}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Width:</span>                    <span className={styles.value}>{this.props.media.width} pixels</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Height:</span>                   <span className={styles.value}>{this.props.media.height} pixels</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>File date: </span>               <span className={styles.value}>{DateHelper.formatDateForMillisecondDate(this.props.media.fileDate)}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Date added: </span>              <span className={styles.value}>{DateHelper.formatDateForMillisecondDate(this.props.media.dateAdded)}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Perceptual hash (pHash): </span> <span className={styles.value}><MediaFingerprintGraphic hash={this.props.media.pHash}/></span></li>
                                    <li className={styles.listItem}><span className={styles.label}>File path: </span>               <span className={styles.value}>{this.props.media.filePath}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Hashed filename: </span>         <span className={styles.value}>{this.props.media.hashFilename}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Thumbnail filename: </span>      <span className={styles.value}>{this.props.media.thumbnailFilename}</span></li>
                                    <li className={styles.listItem}><span className={styles.label}>Owner: </span>                   <span className={styles.value}>{this.props.media.owner}</span></li>
                                    {/*<li className={styles.listItem}>
                                        <span style={liLabelStyle}>Tags: </span>
                                        <TagConnectedLists  primaryTags={this.state.show_edit_tags ? this.state.temp_tags : this.state.tags}
                                                            secondaryTags={this.state.possible_tags}
                                                            is_editing={this.state.show_edit_tags}
                                                            onMoveTagFromSecondaryToPrimary={(tag)=>this.handleAddTag(tag)}
                                                            onMoveTagFromPrimaryToSecondary={(tag)=>this.handleRemoveTag(tag)}
                                                            show_access_level_colors={true}/>
                                        
                                    </li>*/}
                                </ul>
                                {/*this.state.show_edit_tags &&
                                    <div style={toolbarStyle}>
                                        <button style={buttonStyle} className={'btn btn-primary'} onClick={(e)=>this.handleSaveChangesBtnClick(e)}>Save changes</button>
                                        <button className={'btn btn-danger'} onClick={(e)=>this.handleCancelChangesBtnClick(e)}>Cancel</button>
                                    </div>
                                */}
                            </div>
                        </div>
                    </div>
                }
                {!this.props.media &&
                    <div>
                        You currently do not have access right to this media item or some other type of error occurred.
                    </div>
                }                
            </div>
        );
    }
}