import React, { Component } from 'react';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';


// import axios from 'axios';
// import axios from '../../axios';

import './Blog.css';

class Blog extends Component {
  
state = {
    auth: true
}

   

    render () {
       

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink to='/posts/' exact activeClassName='active'>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
               {/* <Route path='/' exact render={()=><Posts/>} /> */}
               <Switch>
               {this.state.auth ? <Route path='/new-post' component={NewPost} /> : null}
               <Route path='/posts'  component={Posts} />
                <Route render={()=><h1>Not Found</h1>} />
               {/* <Redirect from='/' to='/posts'  /> */}
               
               </Switch>
                   
               
             </div>
        );
    }
}

export default Blog;