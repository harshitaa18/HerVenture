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
  const { user } = useUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/${id}`);
        setPost(res.data);

        if (res.data.userId?._id) {
          const userRes = await API.get(`/post/user/${res.data.userId._id}`);
          const otherPosts = userRes.data.filter(p => p._id !== id); // exclude current post
          setUserPosts(otherPosts);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
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

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p><strong>Tags:</strong> {Array.isArray(post.tags) ? post.tags.join(", ") : "None"}</p>
      <p><strong>Role:</strong> {post.role}</p>

      <button className="like-btn" onClick={handleLike}>
        👍 {post.likes?.length || 0} Likes
      </button>

      <div className="comment-section">
        <h3>Comments</h3>
        {post.comments?.map((c, i) => (
          <div key={i} className="comment">
            <strong>{c.userName}</strong>: {c.text}
          </div>
        ))}
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
                <strong>{p.title}</strong> - {p.description?.slice(0, 60)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
