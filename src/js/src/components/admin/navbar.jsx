import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import AdminComments from '../../containers/admin/comments'
import AdminPosts from '../../containers/admin/AdminPosts'
import AdminUsers from '../../containers/admin/AdminUsers'
import AdminSubscribers from '../../containers/admin/AdminSubscribers'
import AdminProjects from '../../containers/admin/AdminProjects'

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
                    <Route exact path="/moderate" component={AdminComments}/>
                    <Route exact path="/moderate/comments" component={AdminComments}/>
                    <Route exact path="/moderate/posts" component={AdminPosts}/>
                    <Route exact path="/moderate/users" component={AdminUsers}/>
                    <Route exact path="/moderate/subscribers" component={AdminSubscribers}/>
                    <Route exact path="/moderate/projects" component={AdminProjects}/>
                </Switch>
            </section>
        </div>
    </Router>
)
export default AdminRouter
