import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import { useUser } from "../../Context/UserContext";
import "./PostDetailsPage.css";

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/post/${id}`);
        setPost(res.data);

        const uid = res.data.userId?._id || res.data.userId;
if (uid) {
  const userRes = await API.get(`/post/user/${uid}`);

          const otherPosts = userRes.data.filter(p => p._id !== id); // exclude current post
          setUserPosts(otherPosts);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like posts.");
    try {
      const res = await API.post(`/post/${id}/like`, { userId: user._id });
      setPost(res.data);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleComment = async () => {
    if (!user) return alert("Please login to comment.");
    if (!comment.trim()) return;
    
    try {
      const res = await API.post(`/post/${id}/comment`, {
        userId: user._id,
        text: comment,
      });
      setPost(res.data);
      setComment("");
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  if (loading) return <p className="loading">Loading post details...</p>;
  if (!post) return <p className="loading">Post not found</p>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      
      <p>{post.description}</p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="tag-container">
          {Array.isArray(post.tags) ? 
            post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            )) : 
            <span className="tag">No tags</span>
          }
        </div>
      )}
      
      {post.role && (
        <div className="role-badge">
          {post.role}
        </div>
      )}
      
      <button className="like-btn" onClick={handleLike}>
        👍 {post.likes?.length || 0} Likes
      </button>

      <div className="comment-section">
        <h3>Comments</h3>
        
        <div className="comments-container">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c, i) => (
              <div key={i} className="comment">
                <strong>{c.userName}</strong>
                <div className="comment-text">{c.text}</div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
        
        {user && (
          <div className="comment-form">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleComment}>Post</button>
          </div>
        )}
      </div>

      {userPosts.length > 0 && (
        <div className="other-posts">
          <h3>More posts by {post.userId?.name}</h3>
          <ul>
            {userPosts.map(p => (
              <li key={p._id}>
                <strong>{p.title}</strong>
                <div>{p.description?.slice(0, 60)}...</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;