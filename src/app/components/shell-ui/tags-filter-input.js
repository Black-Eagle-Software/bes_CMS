import React from 'react';
import { ContentFilterInput } from './content-filter-input';
import { TagsFilterList } from './tags-filter-list';

import styles from './tags-filter-input.css';

export class TagsFilterInput extends React.Component{
    /*
        This hosts an input field that accepts text
        Clicking in input displays popup showing scrolling tags list
        Tags in list show checkbox and name
        Input value filters tags list
        Tags in tags list can be selected
        Selecting tag adds to filter parameters (sent via onFilterChange)
    */
   constructor(props){
       super(props);

       this.state={
           tags: [],
           popupOpen: false,
           isFiltered: false,
           update: false
       };

       this.containerRef = React.createRef();

       this.handleFilterFocus = this.handleFilterFocus.bind(this);
       this.handleTagChange = this.handleTagChange.bind(this);
       this.handleGlobalClick = this.handleGlobalClick.bind(this);
       this.onFilterChange = this.onFilterChange.bind(this);
    }
    componentDidMount(){
        document.addEventListener('click', this.handleGlobalClick);
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.tags.length > 0){ 
            if(this.state.tags.length === 0 && !this.state.isFiltered){
                this.setState({tags: this.props.tags});
            }else if(this.state.tags.length !== this.props.tags.length && !this.state.isFiltered){
                this.setState({tags: this.props.tags});
            }
        }
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleGlobalClick);
    }
    handleFilterFocus(event){
        this.setState({popupOpen: true});
    }
    handleGlobalClick(e){
        if(this.state.popupOpen && this.containerRef.current){
            /*if(!this.containerRef.current.contains(e.target)){
                this.setState({popupOpen: false});
            }*/
            if(e.path.indexOf(this.containerRef.current) === -1){
                this.setState({popupOpen: false});
            }
        }
    }
    handleTagChange(tag){
        this.props.onTagChange(tag);
    }
    onFilterChange(filter){
        if(filter === ''){
            this.setState(prevState=>({
                tags: this.props.tags,
                isFiltered: false,
                update: !prevState.update  
            }));            
            return;
        }
        let temp = this.props.tags.filter(tag=>{return tag.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            tags: temp,
            isFiltered: true,
            update: !prevState.update
        }));
    }
    render(){
        return(
            <div ref={this.containerRef} className={styles.container}>
                <ContentFilterInput placeholder={'Enter tags'} onChange={this.onFilterChange} onFocus={this.handleFilterFocus}/>
                {this.state.popupOpen &&
                    <TagsFilterList tags={this.state.tags} filters={this.props.filters} onTagChange={this.handleTagChange}/>
                }                
            </div>
        );
    }
}