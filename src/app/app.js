import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import WindowNavigation from '../helpers/windowNavigation';
import Landing from './containers/landing.container';
import { UserHome } from './components/shell-ui/user-home';

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

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpdatePass = this.handleUpdatePass.bind(this);
    this.handleUpdateRequired = this.handleUpdateRequired.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
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
  onLoginClick(){
    this.setState({
      show_login: true,
      show_register: false,
      show_update: false
    });
  }
  onRegisterClick(){
    this.setState({
      show_register: true,
      show_login: false,
      show_update: false
    });
  }
  render(){
    return(
      <Switch>
        <Route exact path='/' render={(props, routeProps)=>(
          <Landing 
          {...props} 
          {...routeProps}
          handleLoginClick={this.onLoginClick}
          handleRegisterClick={this.onRegisterClick} 
          onLogin={this.handleLogin}
          onRegister={this.handleRegister}
          onUpdateRequired={this.handleUpdateRequired}
          onUpdatePass={this.handleUpdatePass}
          show_login={this.state.show_login}
          show_register={this.state.show_register}
          show_update={this.state.show_update}/>)} />
        )}/>
        <Route path='/home' render={(props)=>(
          <UserHome id={this.state.id}
                    username={this.state.username} 
                    {...props}/>)}/>
        <Route render={(props)=><div>Page not found.</div>}/>
    </Switch>
    );
  }
}

export default withRouter(App);