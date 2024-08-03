import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuImagePlus } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoCheckboxSharp } from "react-icons/io5";

const EditForm = ({ post, setPosts, setEditPost, userId }) => {
  const { id, postText: text, postLocation: location, postMedia } = post;
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [removeSelectedMedia, setRemoveSelectedMedia] = useState([]);
  const [postText, setPostText] = useState(text);
  const [postLocation, setPostLocation] = useState(location);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState("");

  const inputRef = useRef();
  const onChooseFile = () => inputRef.current.click();

  const handleMediaSelection = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const [oldMediaPreview, setOldMediaPreview] = useState("");
  const [oldPreviewIndex, setOldPreviewIndex] = useState(0);

  const nextOldPreview = () => {
    setOldPreviewIndex((prev) => {
      if (prev === postMedia.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevOldPreview = () => {
    setOldPreviewIndex((prev) => {
      if (prev === 0) {
        return postMedia.length - 1;
      }
      return prev - 1;
    });
  };

  const addForRemoval = (mediaName) => {
    setRemoveSelectedMedia((prev) => [...prev, mediaName]);
  };

  const removeFromRemoval = (mediaName) => {
    setRemoveSelectedMedia((prev) =>
      prev.filter((media) => media !== mediaName)
    );
  };

  const [newMediaPreview, setNewMediaPreview] = useState("");
  const [newPreviewIndex, setNewPreviewIndex] = useState(0);

  const nextNewPreview = () => {
    setNewPreviewIndex((prev) => {
      if (prev === media.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevNewPreview = () => {
    setNewPreviewIndex((prev) => {
      if (prev === 0) {
        return media.length - 1;
      }
      return prev - 1;
    });
  };

  const removeNewMedia = () => {
    setMedia((prev) => prev.filter((_, index) => index !== newPreviewIndex));
  };

  const startOver = () => {
    setPostText(text);
    setPostLocation(location);
    setMedia([]);
    setNewMediaPreview("");
    setNewPreviewIndex(0);
    setOldPreviewIndex(0);
    setRemoveSelectedMedia([]);
  };

  const checkTotalMedia = () => {
    return postMedia.length + media.length - removeSelectedMedia.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText && !media.length) {
      setError("Post must contain text or media");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else if (checkTotalMedia() > 5) {
      setError("Post can only contain up to 5 media files in total");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("postText", postText);
      formData.append("postLocation", postLocation);
      removeSelectedMedia.forEach((mediaName) =>
        formData.append("removeSelectedMedia", mediaName)
      );
      media.forEach((file) => formData.append("media", file));
      try {
        const res = await axios.put(`${BASE_URL}/posts/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPosts((prev) =>
          prev.map((post) => (post.id === id ? res.data : post))
        );
        setEditPost(false);
      } catch (err) {
        setError(err.response.data);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (media.length) {
      setNewMediaPreview(
        <div key={"new" + newPreviewIndex} className="preview-window">
          <button
            type="button"
            onClick={prevNewPreview}
            className="prev-preview-btn"
          >
            <FcPrevious />
          </button>
          <button
            type="button"
            onClick={nextNewPreview}
            className="next-preview-btn"
          >
            <FcNext />
          </button>
          <img
            src={URL.createObjectURL(media[newPreviewIndex])}
            alt="media-preview"
            style={{ width: "150px" }}
          />
          <button
            type="button"
            onClick={removeNewMedia}
            className="delete-media-btn"
          >
            <CiCircleRemove />
          </button>
        </div>
      );
    } else {
      setNewMediaPreview("");
      setNewPreviewIndex(0);
    }
  }, [newPreviewIndex, media]);

  useEffect(() => {
    if (postMedia.length) {
      setOldMediaPreview(
        <div key={"old" + oldPreviewIndex} className="preview-window">
          <button
            type="button"
            onClick={prevOldPreview}
            className="prev-preview-btn"
          >
            <FcPrevious />
          </button>
          <button
            type="button"
            onClick={nextOldPreview}
            className="next-preview-btn"
          >
            <FcNext />
          </button>
          <img
            src={postMedia[oldPreviewIndex].mediaUrl}
            alt="media-preview"
            style={{ width: "150px" }}
          />
          {!removeSelectedMedia.includes(
            postMedia[oldPreviewIndex].mediaName
          ) ? (
            <button
              type="button"
              onClick={() =>
                addForRemoval(postMedia[oldPreviewIndex].mediaName)
              }
              className="select-media-btn"
            >
              <IoCheckboxOutline />
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                removeFromRemoval(postMedia[oldPreviewIndex].mediaName)
              }
              className="select-media-btn"
            >
              <IoCheckboxSharp />
            </button>
          )}
        </div>
      );
    } else {
      setOldMediaPreview("");
      setOldPreviewIndex(0);
    }
  }, [oldPreviewIndex, removeSelectedMedia]);

  useEffect(() => {
    if (checkTotalMedia() > 5) {
      setError("Post can only contain up to 5 media files in total");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [media, removeSelectedMedia]);

  return (
    <div className="edit-post">
      <form onSubmit={handleSubmit} className="edit-form-container">
        <div className="edit-form-container__location">
          <div className="regular-input">
            <input
              type="text"
              value={postLocation}
              placeholder="Post's Location..."
              onChange={(e) => setPostLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-form-container__upload-media switch-btn">
          <input
            type="file"
            ref={inputRef}
            onChange={handleMediaSelection}
            multiple
            style={{ display: "none" }}
            accept="image/*"
          />
          <button type="button" onClick={onChooseFile}>
            <LuImagePlus />
          </button>
          <p>media: {checkTotalMedia()} / 5</p>
        </div>
        <div className="edit-form-container__post-text">
          <div className="regular-input">
            <input
              type="text"
              value={postText}
              placeholder="Post's Text..."
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-form-container__media-preview">
          {oldMediaPreview}
          {newMediaPreview}
        </div>
        <div className="edit-form-container__btns main-btns">
          <button type="button" onClick={() => setEditPost(false)}>
            Cancel
          </button>
          <button type="button" onClick={startOver}>
            Clear
          </button>
          <button type="submit">Submit</button>
        </div>
        <div className="edit-form-container__error">
          <p>{error}</p>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
