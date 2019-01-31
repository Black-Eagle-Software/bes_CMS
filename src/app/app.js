import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import WindowNavigation from '../helpers/windowNavigation';
//import AuthRoute from './components/authRoute.component';
//import Header from './components/header.component';
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

class App extends React.Component {
  constructor(props){
    super(props);

    let is_authorized, username, id;
    if(__isBrowser__){
        //console.log(window.__INITIAL_DATA__);
        //console.log(window.__INITIAL_DATA__.is_authorized);
        is_authorized = window.__INITIAL_DATA__.is_authorized;
        username = window.__INITIAL_DATA__.username;
        id = window.__INITIAL_DATA__.user_id;
        delete window.__INITIAL_DATA__;
    }else{
        //console.log(props.staticContext);
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
                        show_register: false
                    });
                    break;
        case 'register': 
                    this.setState({
                        show_register: true,
                        show_login: false
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
    //return <Redirect to='/home'/>
    //this.verifyAuthentication();
    WindowNavigation.goToLocation('/home');    
  }
  handleSearchShowMoreButtonClick(query){
    //when we change location, it's getting a new instance
    //of app and losing state.
    //we need to somehow get hte query value to the search bar
    //cookie? parse it from the url?
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
  verifyAuthentication(){
    axios.get('/api/auth/check').then(res=>{
      console.log(res.status);
      let auth = this.state.isAuthenticated;
      if(res.status === 200){
          if(!auth){  //needs to handle admin access
            this.setState({isAuthenticated: true}, ()=>{
              //this.props.history.push('/home'); //go to '/' on logout
            });            
          }
      } else{
          this.setState({isAuthenticated: false}, ()=>{
            //this.props.history.push('/');
          });          
      }
    });
  }
  componentDidMount(){
    //this.verifyAuthentication();
    //console.log(this.state.isAuthenticated);
  }
  render(){
    return(
      <Layout isAuthenticated={this.state.isAuthenticated} 
          username={this.state.username}
          id={this.state.id}
          onHeaderBtnClick={(name)=>this.handleHeaderBtnClick(name)}
          onSearchShowMoreButtonClick={(query)=>this.handleSearchShowMoreButtonClick(query)}
          query_value={this.state.search_query}>
            {/*<Header isAuthenticated={this.state.isAuthenticated} username={this.state.username} id={this.state.id} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>*/}

            <Switch>
                <Route exact path='/' render={(props, routeProps)=>(
                  <Landing 
                  {...props} 
                  {...routeProps} 
                  onLogin={()=>this.handleLogin()} 
                  show_login={this.state.show_login}
                  show_register={this.state.show_register}/>)} />
                )}/>
                {/*<Route path='/home' component={UserHomeContainer} />*/}
                {/*<Route path='/home' render={(props)=>(
                this.state.isAuthenticated ? <UserHomeContainer {...props}/> : <Redirect to='/'/>
                )} />*/}
                {/*<AuthRoute path='/home' component={UserHomeContainer}/>*/}
                {/*<AuthRoute path='/home' isAuthenticated={this.state.isAuthenticated} render={(props)=>(<UserHomeContainer isAuthenticated={this.state.isAuthenticated} {...props}/>)}/>*/}
                <Route path='/home' render={(props)=>(
                  <UserHomeContainer
                  id={this.state.id} 
                  {...props}
                  show_albums={this.state.show_albums}
                  show_tags={this.state.show_tags}
                  onPublicShowAllMediaButtonClick={()=>this.handlePublicShowAllMedia()}
                  onUserShowAllMediaButtonClick={()=>this.handleUserShowAllMedia()}
                  onUserShowAllAlbumsButtonClick={()=>this.handleUserShowAllAlbums()}
                  onAddAlbum={()=>this.handleAddAlbum()}/>
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
                  <UserMedia id={this.state.id} username={this.state.username} {...props}/>
                )}/>
                <Route path='/media' render={(props)=>(
                  <PublicMedia {...props} />
                )}/>
                <Route path='/album_details/:id' render={(props)=>(
                  <AlbumDetails user_id={this.state.id} {...props}/>
                )}/>
                <Route path='/new_album' render={(props)=>(
                  <AlbumDetails user_id={this.state.id} {...props}/>
                )}/>
                <Route path='/media_details/:id' render={(props)=>(
                  <MediaDetails user_id={this.state.id} {...props}/>
                )}/>
                <Route path='/search' render={(props)=>(
                  <Search {...props} />
                )}/>
                <Route path='/tags' render={(props)=>(
                  <Tags id={this.state.id} {...props}/>
                )}/>
                {/*<Route render={()=>(<div>Sorry, this page does not exist.</div>)} />*/}
                <Route render={(props)=><div>Page not found.</div>}/>
            </Switch>
        </Layout>            
    );
  }
}

export default withRouter(App);