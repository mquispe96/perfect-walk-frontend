import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { PageContext } from "../../Context/PageContext";
import { formatDate } from "../../Helper-Functions/formatDate";
import Comment from "./Comment";
import { FcNext, FcPrevious } from "react-icons/fc";
import { BiSolidLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { CgRemove } from "react-icons/cg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";
import { TiCancelOutline } from "react-icons/ti";

const Post = ({ post, setPosts }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(PageContext);
  const {
    id,
    userId,
    createdBy,
    createdOn,
    postLikes,
    postLocation: location,
    postText: text,
    postMedia,
  } = post;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [mediaPreview, setMediaPreview] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [deletePost, setDeletePost] = useState(false);

  const [editPost, setEditPost] = useState(false);
  const [removeSelectedMedia, setRemoveSelectedMedia] = useState([]);
  const [postText, setPostText] = useState(text);
  const [postLocation, setPostLocation] = useState(location);
  const [media, setMedia] = useState([]);

  const nextPreview = () => {
    setPreviewIndex((prev) => {
      if (prev === postMedia.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevPreview = () => {
    setPreviewIndex((prev) => {
      if (prev === 0) {
        return postMedia.length - 1;
      }
      return prev - 1;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText) return;
    axios
      .post(`${BASE_URL}/posts/${id}/comments`, { commentText, userId })
      .then((res) => {
        setCommentText("");
        setComments((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  const increaseLike = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/posts/${id}/like`);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? res.data : post))
      );
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    if (postMedia.length) {
      setMediaPreview(
        <div key={previewIndex} className="preview-window">
          {postMedia.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPreview}
                className="prev-preview-btn"
              >
                <FcPrevious />
              </button>
              <button
                type="button"
                onClick={nextPreview}
                className="next-preview-btn"
              >
                <FcNext />
              </button>
            </>
          )}
          <img src={postMedia[previewIndex].mediaUrl} alt="media" />
        </div>
      );
    } else {
      setMediaPreview("");
      setPreviewIndex(0);
    }
  }, [previewIndex]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/${id}/comments`)
      .then((res) => setComments(res.data));
  }, []);

  return (
    <div className="post-container">
      <div className="post-container__header">
        <h4>{createdBy}</h4>
        {userId === user.id && (
          <div className="post-settings-btn">
            {!deletePost && (
              <>
                <button type="button" onClick={() => setEditPost(prev => !prev)}>
                  <MdEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletePost(true);
                    setTimeout(() => {
                      setDeletePost(false);
                    }, 5000);
                  }}
                >
                  <CgRemove />
                </button>
              </>
            )}
            {deletePost && (
              <>
                <button type="button" onClick={() => setDeletePost(false)}>
                  <TiCancelOutline />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await axios.delete(`${BASE_URL}/posts/${id}`);
                      setPosts((prev) =>
                        prev.filter((post) => post.id !== id)
                      );
                    } catch (err) {
                      console.log(err.response.data.error);
                    }
                  }}
                >
                  <GiConfirmed />
                </button>
              </>
            )}
          </div>
        )}
        <h5>on: {formatDate(createdOn)}</h5>
        {location && <h5>at: {location}</h5>}
      </div>
      <div className="post-container__body-text">
        {text && <p>{text}</p>}
      </div>
      <div className="post-container__body-media">{mediaPreview}</div>
      <div className="post-container__likes">
        <p>{postLikes} likes</p>
        <button type="button" onClick={increaseLike}>
          <BiSolidLike />
        </button>
      </div>
      <div className="post-container__footer">
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="regular-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div className="comment-form__btns switch-btn">
            {commentText.length ? (
              <button type="button">
                <GiBackwardTime />
              </button>
            ) : (
              ""
            )}
            <button type="submit">
              <FaLongArrowAltRight />
            </button>
          </div>
        </form>
        <div
          className="comments-container"
          style={{
            height: comments.length > 1 ? "300px" : "auto",
            overflow: "scroll",
          }}
        >
          <h4>Comments</h4>
          {comments.map((comment, idx) => (
            <Comment
              key={comment.id}
              comment={comment}
              setComments={setComments}
              comments={comments}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
