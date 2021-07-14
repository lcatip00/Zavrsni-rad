import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, ModalFooter} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Category from './pages/Category'
import NavigationBar from './components/NavigationBar'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryList from './pages/CategoryList'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './pages/Register'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Search from './pages/Search'
import { ToastProvider } from 'react-toast-notifications';
import SomethingWentWrong from './pages/SomethingWentWrong'

function App() {
  return (
    <div className="App">
      <ToastProvider>
      <React.Fragment>
        
        <Layout>
          <Router>
            <NavigationBar> </NavigationBar>
            <Switch> 
              
              <Route exact path="/"> <Home></Home> </Route>
              {/* <Route exact path='/post'> <PostList></PostList></Route> */}
              <Route exact path='/categoryList' ><CategoryList></CategoryList></Route>
              <Route exact path='/category/:slug'> <Category></Category> </Route>
              <Route exact path='/post/:slug' name="postDetails"> <PostDetail></PostDetail></Route>
              <Route exact path='/register'> <Register></Register></Route>
              <Route exact path='/login'> <Login></Login></Route>
              <Route exact path='/myprofile'> <MyProfile></MyProfile></Route>
              <Route exact path='/profile/:slug' name="profile"> <Profile></Profile></Route>
              <Route exact path='/search/:query' name="search"> <Search></Search></Route>
              <Route exact path='/SomethingWentWrong/:errormessages' name="SomethingWentWrong"> <SomethingWentWrong></SomethingWentWrong></Route>
            </Switch>
            {/* <MyCategories></MyCategories> */}
          </Router>
          
        </Layout>  
      </React.Fragment>
      </ToastProvider>
    </div>
  );
}

export default App;
