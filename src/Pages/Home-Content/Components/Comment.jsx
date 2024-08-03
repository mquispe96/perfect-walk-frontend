import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { PageContext } from "../../Context/PageContext";
import SubComment from "./SubComment";
import { formatDate } from "../../Helper-Functions/formatDate";
import { BiSolidLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { CgRemove } from "react-icons/cg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";
import { TiCancelOutline } from "react-icons/ti";

const Comment = ({ comment, setComments }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(PageContext);
  const {
    id,
    userId,
    postId,
    commentedBy,
    createdOn,
    commentText: text,
    commentLikes,
  } = comment;
  const [subCommentText, setSubCommentText] = useState("");
  const [subComments, setSubComments] = useState([]);
  const [deleteComment, setDeleteComment] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [commentText, setCommentText] = useState(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subCommentText) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/posts/${postId}/comments/${id}/subcomments`,
        { subCommentText, userId }
      );
      setSubComments((prev) => [...prev, res.data]);
      setSubCommentText("");
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/posts/${postId}/comments/${id}`,
        { commentText }
      );
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? res.data : comment))
      );
      setEditComment(false);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  const increaseLike = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/posts/${postId}/comments/${id}/like`
      );
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? res.data : comment))
      );
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/${postId}/comments/${id}/subcomments`)
      .then((res) => setSubComments(res.data));
  }, []);

  return (
    <div className="comment-container">
      <div className="comment-container__header">
        <h5>{commentedBy}</h5>
        <h6>on: {formatDate(createdOn)}</h6>
        {userId === user.id && (
          <div className="comment-settings-btn">
            {!deleteComment && (
              <>
                <button
                  type="button"
                  onClick={() => setEditComment((prev) => !prev)}
                >
                  <MdEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteComment(true);
                    setTimeout(() => {
                      setDeleteComment(false);
                    }, 5000);
                  }}
                >
                  <CgRemove />
                </button>
              </>
            )}
            {deleteComment && (
              <>
                <button type="button" onClick={() => setDeleteComment(false)}>
                  <TiCancelOutline />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `${BASE_URL}/posts/${postId}/comments/${id}`
                      );
                      setComments((prev) =>
                        prev.filter((comment) => comment.id !== id)
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
      </div>
      <div className="comment-container__body-text">
        {!editComment && <p>{text}</p>}
        {editComment && (
          <form onSubmit={handleEditSubmit} className="comment-form">
            <div className="regular-input">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <div className="comment-form__btns switch-btn">
              <button type="button" onClick={() => setEditComment(false)}>
                <TiCancelOutline />
              </button>
              <button type="submit">
                <GiConfirmed />
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="comment-container__likes">
        <p>{commentLikes} likes</p>
        <button type="button" onClick={increaseLike}>
          <BiSolidLike />
        </button>
      </div>
      <div className="comment-container__footer">
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="regular-input">
            <input
              type="text"
              placeholder="respond..."
              value={subCommentText}
              onChange={(e) => setSubCommentText(e.target.value)}
            />
          </div>
          <div className="comment-form__btns switch-btn">
            {subCommentText.length ? (
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
          className="sub-comments-container"
          style={{
            height: subComments.length > 1 ? "200px" : "auto",
            overflow: "scroll",
          }}
        >
          {subComments.map((subComment) => (
            <SubComment
              key={subComment.id}
              subComment={subComment}
              setSubComments={setSubComments}
              postId={postId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
