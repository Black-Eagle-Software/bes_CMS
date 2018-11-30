import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
//import AuthRoute from './components/authRoute.component';
import Landing from './containers/landing.container';
//import UserHomeContainer from './containers/user-home.container';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isAuthenticated: false
    };
  }
  handleLogin(){
    //return <Redirect to='/home'/>
    this.verifyAuthentication();    
  }
  verifyAuthentication(){
    axios.get('/credentials/check').then(res=>{
      console.log(res.status);
      let auth = this.state.isAuthenticated;
      if(res.status === 200){
          if(!auth){  //needs to handle admin access
            this.setState({isAuthenticated: true}, ()=>{
              this.props.history.push('/home'); //go to '/' on logout
            });            
          }
      } else{
          this.setState({isAuthenticated: false}, ()=>{
            this.props.history.push('/');
          });          
      }
    });
  }
  componentDidMount(){
    this.verifyAuthentication();
  }
  render(){
    return(
      <Switch>
        <Route exact path='/' render={(props, routeProps)=>(<Landing {...props} {...routeProps} onLogin={()=>this.handleLogin()}/>)} />
        {/*<Route path='/home' component={UserHomeContainer} />*/}
        {/*<Route path='/home' render={(props)=>(
          this.state.isAuthenticated ? <UserHomeContainer {...props}/> : <Redirect to='/'/>
        )} />*/}
        {/*<AuthRoute path='/home' component={UserHomeContainer}/>*/}
        {/*<AuthRoute path='/home' isAuthenticated={this.state.isAuthenticated} render={(props)=>(<UserHomeContainer isAuthenticated={this.state.isAuthenticated} {...props}/>)}/>*/}
        <Route path='/admin' render={()=>(<div>This is the Admin page</div>)} />
        {/*<Route render={()=>(<div>Sorry, this page does not exist.</div>)} />*/}
      </Switch>      
    );
  }
}

export default withRouter(App);