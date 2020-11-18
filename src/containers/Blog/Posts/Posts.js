import React, { Component } from 'react';

import Post from '../../../components/Post/Post';
import axios from "../../../axios";
import {Link,Route} from 'react-router-dom';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

export default class Posts extends Component {


    state = {
        post: []
 
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(respons => {
            const posts = respons.data.slice(0,4);
            const updatedPosts = posts.map(post =>{
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({post: updatedPosts})
            //(console.log(respons))
        })
        .catch(error => {
            console.log(error)
            // this.setState({error: true})
        })
        ;
    }

    

    postSelectedHandler = (id) =>{
        this.setState({selectedPostId: id})
    }
    
    render() {

        let posts = <p style={{textAlign: "center"}}>Somethig went Wrong</p>
        if(!this.state.error){

            posts = this.state.post.map(post=>{
                return (
                <Link to={'/posts/' + post.id} key={post.id} >
                <Post 
                
                title={post.title} 
                author={post.author}
                clicked={()=>this.postSelectedHandler(post.id)}            
                /></Link>)
            })
        }

        return (
            <div>
            <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
                </div>
        )
    }
}
