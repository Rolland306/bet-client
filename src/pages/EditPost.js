import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = ({ data }) => {

        const [posts, setPosts] = useState([]);
        const [post, setPost] = useState(null);
        const { id } = useParams();
useEffect(() => {
  const fetchData = async () => {
    const { data } = await supabase
      .from('Posts')
      .select()

    // set state of posts
    setPosts(data);
  };

  fetchData();
  console.log(posts)
}, []);

useEffect(() => {
    console.log("id: ",id)
  const selectedPost = posts.find((item) => item.id === parseInt(id));
  console.log("selection test: ",posts.filter((item) => item.id === parseInt(id)))
  console.log("chosen ", selectedPost)
  setPost(selectedPost);
}, [posts, id]);
  

  const updatePost = async (event) => {
    event.preventDefault();

    await supabase.from('Posts').update(post).eq('id', id);
    alert('Post updated successfully!');
    window.location="/";
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase
    .from('Posts')
    .delete()
    .eq('id', id); 

    window.location = "/";
}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} />
        <br />
        <br />

        <label htmlFor="author">Author</label>
        <br />
        <input type="text" id="author" name="author" value={post.author} onChange={handleInputChange} />
        <br />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleInputChange}></textarea>
        <br />
        <br />
        <button className="updateButton" type="submit">Update</button>
        <button className='deleteButton' onClick={deletePost}>Delete</button>
      </form>
    </div>
  );
};

export default EditPost;
