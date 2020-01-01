import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import WindowNavigation from '../helpers/windowNavigation';
import Landing from './containers/landing.container';
import UserHomeContainer from './containers/user-home.container';
import UploadMedia from './containers/upload.container';
import MediaDetails from './containers/media-details.container';
import Layout from './containers/layout.container';
import Search from './containers/search.container';
import Tags from './containers/tags.container';
import UserMedia from './containers/user-media.container';
import PublicMedia from './containers/public-media.container';
import AlbumDetails from './containers/album-details.container';
import UserAlbums from './containers/user-albums.container';

class App extends React.Component {
  constructor(props){
    super(props);

    let is_authorized, username, id;
    if(__isBrowser__){
        is_authorized = window.__INITIAL_DATA__.is_authorized;
        username = window.__INITIAL_DATA__.username;
        id = window.__INITIAL_DATA__.user_id;
        delete window.__INITIAL_DATA__;
    }else{
        is_authorized = props.staticContext.data.is_authorized;
        username = props.staticContext.data.username;
        id = props.staticContext.data.user_id;
    }

    this.state = {
      isAuthenticated: is_authorized,
      username: username,
      id: id,
      show_albums: false,
      show_login: false,
      show_register: false,
      show_update: false,
      show_tags: false,
      search_query: ""      
    };
  }
  handleAddAlbum(){
    WindowNavigation.goToLocation('/new_album');
  }
  handleHeaderBtnClick(name){
    switch (name){
        case 'albums': 
                    this.handleUserShowAllAlbums();
                    break;
        case 'home':
                    WindowNavigation.goToLocation('/'); 
                    break;
        case 'media':
                    this.handleUserShowAllMedia();
                    break;
        case 'login': 
                    this.setState({
                        show_login: true,
                        show_register: false,
                        show_update: false
                    });
                    break;
        case 'register': 
                    this.setState({
                        show_register: true,
                        show_login: false,
                        show_update: false
                    });
                    break;        
        case 'tags': 
                    WindowNavigation.goToLocation('/tags');
                    break;
        case 'upload': 
                    WindowNavigation.goToLocation('/upload');
                    break;
        case 'default': break;
    }
  }
  handleLogin(){
    WindowNavigation.goToLocation('/home');    
  }
  handleRegister(){
    //new user registered, have them log in
    this.setState({
      show_login: true,
      show_register: false,
      show_update: false
    });
  }
  handleUpdateRequired(){
    //user needs to update their password
    this.setState({
      show_login: false,
      show_register: false,
      show_update: true
    })
  }
  handleUpdatePass(){
    //user updated pass, have them log in
    this.setState({
      show_login: true,
      show_register: false,
      show_update: false
    });
  }
  handleSearchShowMoreButtonClick(query){
    WindowNavigation.goToLocation(`/search?s=${query}`);
    this.setState({search_query: query});    
  }
  handlePublicShowAllMedia(){
    WindowNavigation.goToLocation('/media');
  }
  handleUserShowAllAlbums(){
    WindowNavigation.goToLocation(`/users/${this.state.id}/albums`);
  }
  handleUserShowAllMedia(){
    WindowNavigation.goToLocation(`/users/${this.state.id}/media`);
  }
  handleMediaInfo(media){
    WindowNavigation.goToLocation(`/media_details/${media.id}`);
  }
  handleAlbumClick(album){
    WindowNavigation.goToLocation(`/album_details/${album.id}`);
  }
  verifyAuthentication(){
    axios.get('/api/auth/check').then(res=>{
      let auth = this.state.isAuthenticated;
      if(res.status === 200){
          if(!auth){  //needs to handle admin access
            this.setState({isAuthenticated: true}, ()=>{});            
          }
      } else{
          this.setState({isAuthenticated: false}, ()=>{});          
      }
    });
  }
  render(){
    return(
      <Layout isAuthenticated={this.state.isAuthenticated} 
          username={this.state.username}
          id={this.state.id}
          onHeaderBtnClick={(name)=>this.handleHeaderBtnClick(name)}
          onSearchShowMoreButtonClick={(query)=>this.handleSearchShowMoreButtonClick(query)}
          query_value={this.state.search_query}>
            <Switch>
                <Route exact path='/' render={(props, routeProps)=>(
                  <Landing 
                  {...props} 
                  {...routeProps} 
                  onLogin={()=>this.handleLogin()}
                  onRegister={()=>this.handleRegister()}
                  onUpdateRequired={()=>this.handleUpdateRequired()}
                  onUpdatePass={()=>this.handleUpdatePass()}
                  show_login={this.state.show_login}
                  show_register={this.state.show_register}
                  show_update={this.state.show_update}/>)} />
                )}/>
                <Route path='/home' render={(props)=>(
                  <UserHomeContainer
                    id={this.state.id} 
                    {...props}
                    show_albums={this.state.show_albums}
                    show_tags={this.state.show_tags}
                    onMediaInfoClick={(media)=>this.handleMediaInfo(media)}
                    onZoomMediaClick={(media)=>this.handleZoomMedia(media)}
                    onPublicShowAllMediaButtonClick={()=>this.handlePublicShowAllMedia()}
                    onUserShowAllMediaButtonClick={()=>this.handleUserShowAllMedia()}
                    onUserShowAllAlbumsButtonClick={()=>this.handleUserShowAllAlbums()}
                    onAddAlbum={()=>this.handleAddAlbum()}
                    onAlbumClick={(album)=>this.handleAlbumClick(album)}/>
                  )}/>
                <Route path='/upload' render={(props)=>(
                  <UploadMedia id={this.state.id} {...props}/>
                )}/>                
                <Route path='/admin' render={()=>(
                  <div>This is the Admin page</div>
                  )} />
                <Route exact path='/users/:id' render={(props)=>(
                  <div>User Profile for: {props.match.params.id}</div>
                )}/>
                <Route path='/users/:id/media' render={(props)=>(
                  <UserMedia  id={this.state.id} 
                              username={this.state.username} 
                              {...props} 
                              onMediaInfoClick={(media)=>this.handleMediaInfo(media)}
                              onZoomMediaClick={(media)=>this.handleZoomMedia(media)}/>
                )}/>
                <Route path='/users/:id/albums' render={(props)=>(
                  <UserAlbums id={this.state.id} 
                              username={this.state.username} 
                              {...props}
                              onAlbumClick={(album)=>this.handleAlbumClick(album)}/>
                )}/>
                <Route path='/media' render={(props)=>(
                  <PublicMedia  {...props} 
                                onMediaInfoClick={(media)=>this.handleMediaInfo(media)}
                                onZoomMediaClick={(media)=>this.handleZoomMedia(media)}/>
                )}/>
                <Route path='/album_details/:id' render={(props)=>(
                  <AlbumDetails user_id={this.state.id} 
                                {...props}
                                onMediaInfoClick={(media)=>this.handleMediaInfo(media)}
                                onZoomMediaClick={(media)=>this.handleZoomMedia(media)}/>
                )}/>
                <Route path='/new_album' render={(props)=>(
                  <AlbumDetails user_id={this.state.id} 
                                {...props}
                                onZoomMediaClick={(media)=>this.handleZoomMedia(media)}/>
                )}/>
                <Route path='/media_details/:id' render={(props)=>(
                  <MediaDetails user_id={this.state.id} {...props}/>
                )}/>
                <Route path='/search' render={(props)=>(
                  <Search {...props} 
                          onMediaInfoClick={(media)=>this.handleMediaInfo(media)}
                          onZoomMediaClick={(media)=>this.handleZoomMedia(media)}/>
                )}/>
                <Route path='/tags' render={(props)=>(
                  <Tags id={this.state.id} {...props}/>
                )}/>
                <Route render={(props)=><div>Page not found.</div>}/>
            </Switch>
        </Layout>            
    );
  }
}

export default withRouter(App);