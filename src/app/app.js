import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import WindowNavigation from '../helpers/windowNavigation';
//import AuthRoute from './components/authRoute.component';
//import Header from './components/header.component';
import Landing from './containers/landing.container';
import UserHomeContainer from './containers/user-home.container';

class App extends React.Component {
  constructor(props){
    super(props);

    let is_authorized, username;
    if(__isBrowser__){
        //console.log(window.__INITIAL_DATA__);
        //console.log(window.__INITIAL_DATA__.is_authorized);
        is_authorized = window.__INITIAL_DATA__.is_authorized;
        username = window.__INITIAL_DATA__.username;
        delete window.__INITIAL_DATA__;
    }else{
        //console.log(props.staticContext);
        is_authorized = props.staticContext.data.is_authorized;
        username = props.staticContext.data.username;
    }

    this.state = {
      isAuthenticated: is_authorized,
      username: username
    };
  }
  handleLogin(){
    //return <Redirect to='/home'/>
    //this.verifyAuthentication();
    WindowNavigation.goToLocation('/home');    
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
    console.log(this.state.isAuthenticated);
  }
  render(){
    return(
        <div>
            {/*<Header isAuthenticated={this.state.isAuthenticated} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>*/}

            <Switch>
                <Route exact path='/' render={(props, routeProps)=>(<Landing {...props} {...routeProps} onLogin={()=>this.handleLogin()}/>)} />
                {/*<Route path='/home' component={UserHomeContainer} />*/}
                {/*<Route path='/home' render={(props)=>(
                this.state.isAuthenticated ? <UserHomeContainer {...props}/> : <Redirect to='/'/>
                )} />*/}
                {/*<AuthRoute path='/home' component={UserHomeContainer}/>*/}
                {/*<AuthRoute path='/home' isAuthenticated={this.state.isAuthenticated} render={(props)=>(<UserHomeContainer isAuthenticated={this.state.isAuthenticated} {...props}/>)}/>*/}
                <Route path='/home' render={(props)=>(<UserHomeContainer isAuthenticated={this.state.isAuthenticated} username={this.state.username} {...props}/>)}/>
                <Route path='/admin' render={()=>(<div>This is the Admin page</div>)} />
                {/*<Route render={()=>(<div>Sorry, this page does not exist.</div>)} />*/}
            </Switch>
        </div>            
    );
  }
}

export default withRouter(App);