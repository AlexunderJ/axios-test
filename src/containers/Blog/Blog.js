import React, { Component } from 'react';

// import axios from 'axios';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        post: [],
        selectedPostId: null,
        erroe: false
    }

    componentDidMount(){
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
            // console.log(error)
            this.setState({error: true})
        })
        ;
    }

    postSelectedHandler = (id) =>{
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Somethig went Wrong</p>
        if(!this.state.error){

            posts = this.state.post.map(post=>{
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={()=>this.postSelectedHandler(post.id)}            
                />
            })
        }

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;