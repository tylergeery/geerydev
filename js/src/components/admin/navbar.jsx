import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home is where the heart is </h2>
  </div>
)

const About = () => (
  <div>
    <h2>About me... No more about you</h2>
  </div>
)

const AdminRouter = () => (
    <Router>
        <div>
            <div className="black-back admin-nav nav-pills">
                <h1 className="white pull-left pl-15">Admin Control Center</h1>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <a href="/logout">Logout</a>
                </div>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <Link to="/moderate/projects">Projects</Link>
                </div>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <Link to="/moderate/subscribers">Subscribers</Link>
                </div>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <Link to="/moderate/users">Users</Link>
                </div>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <Link to="/moderate/posts">Posts</Link>
                </div>
                <div className="pull-right mt-20 ml-10 btn btn-default pad-box">
                    <Link to="/moderate/comments">Comments</Link>
                </div>
            </div>

            <hr />

            <section>
                <Switch>
                    <Route exact path="/moderate" component={Home}/>
                    <Route exact path="/moderate/comments" component={Home}/>
                    <Route exact path="/moderate/posts" component={About}/>
                    <Route exact path="/moderate/users" component={About}/>
                    <Route exact path="/moderate/subscribers" component={About}/>
                    <Route exact path="/moderate/projects" component={Home}/>
                </Switch>
            </section>
        </div>
    </Router>
)
export default AdminRouter
