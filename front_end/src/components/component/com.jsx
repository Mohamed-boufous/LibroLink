import React, { useState, useEffect, useRef } from "react";
import { FiThumbsUp, FiThumbsDown, FiMoreVertical } from "react-icons/fi";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";
import { Dialog } from "../ui/dialog";
import ReportForm from "../ReportForm";
import { CurrencyFranc } from "@mui/icons-material";

export default function CommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  /* {
      id: 1,
      likes: 20,
      deslikes: 0,
      liked: false,
      disliked: false,
      replyInput: "",
      showReplyInput: false,
      optionsVisible: false,
    }, */
  const handleLikeClick = (id, index) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
              disliked: comment.disliked ? false : comment.disliked,
              deslikes: comment.disliked
                ? comment.deslikes - 1
                : comment.deslikes,
            }
          : comment
      )
    );
    const likes = comments[index].liked
      ? comments[index].likes - 1
      : comments[index].likes + 1;
    const deslikes = comments[index].deslikes;
    console.log(likes, deslikes);
    axiosClient
      .post(`api/update_comment/${id}/${likes}/${deslikes}`)
      .then((response) => {
        console.log(response.data.likes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDislikeClick = (id, index) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              deslikes: comment.disliked
                ? comment.deslikes - 1
                : comment.deslikes + 1,
              disliked: !comment.disliked,
              liked: comment.liked ? false : comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes,
            }
          : comment
      )
    );
    const likes = comments[index].likes;
    const deslikes = comments[index].disliked
      ? comments[index].deslikes - 1
      : comments[index].deslikes + 1;
    axiosClient
      .post(`api/update_comment/${id}/${likes}/${deslikes}`)
      .then((response) => {
        console.log(response.data.deslikes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowReplyInput = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              showReplyInput: !comment.showReplyInput,
              optionsVisible: false,
            }
          : comment
      )
    );
  };

  const toggleOptions = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, optionsVisible: !comment.optionsVisible }
          : { ...comment, optionsVisible: false }
      )
    );
  };

  const optionsRef = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      optionsRef.current.forEach((ref, index) => {
        // Vérifiez si le clic est en dehors du champ de réponse
        if (
          ref &&
          !ref.contains(event.target) &&
          !event.target.classList.contains("reply-input") // Ne ferme pas si le clic est sur le champ de réponse lui-même
        ) {
          setComments((prevComments) =>
            prevComments.map((comment, i) =>
              i === index ? { ...comment, showReplyInput: false } : comment
            )
          );
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [textComment, setTextComment] = useState(null);
  const [textReply, setTextReply] = useState(null);
  const { currentUser } = useStateContext();
  const [load, setLoad] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(0);

  const handleShowReplies = (id, index) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, showReplies: !comment.showReplies }
          : comment
      )
    );
    if (comments[index].showReplies === false) {
      axiosClient
        .get(`/api/list_comments?book_id=${bookId}&replied_id=${id}`)
        .then((response) => {
          console.log(response.data);
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id
                ? { ...comment, replies: response.data }
                : comment
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const formData = {
      text: textComment,
      book_id: bookId,
      replied_id: 0,
      user_id: currentUser.id,
    };
    axiosClient
      .post("/api/add_comment", formData)
      .then((response) => {
        setTextComment("");
        setLoad(!load);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();
    const formData = {
      text: textReply,
      book_id: bookId,
      replied_id: commentId,
      user_id: currentUser.id,
    };
    axiosClient
      .post("/api/add_comment", formData)
      .then((response) => {
        setLoad(!load);
        console.log(response.data);
        setTextReply("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosClient
      .get(`/api/list_comments?book_id=${bookId}`)
      .then((response) => {
        setComments(
          response.data.map((comment) => ({
            ...comment,
            liked: false,
            disliked: false,
            replyInput: "",
            replies: [],
            showReplyInput: false,
            showReplies: false,
            optionsVisible: false,
          }))
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosClient
      .get(`api/get_comments_number/${bookId}`)
      .then((response) => {
        setCommentsNumber(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [load,bookId]);
  return (
    
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">{commentsNumber} Comments</h2>
      {
      currentUser.id ? (
        <form onSubmit={handleCommentSubmit}>
        <div className="flex flex-col space-y-2 items-end border-b border-gray-200 mb-5 pb-5">
          <div className="w-full">
            <div className="flex items-center">
              <Avatar className="">
                <AvatarImage src={currentUser.image} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-orange-500 ml-3">{currentUser.displayName}</h3>
            </div>
            <textarea
              name="comment"
              className=" w-[98%] mx-12 h-24 p-2 outline-none border rounded resize-none"
              placeholder="Write a comment..."
              onChange={(e) => setTextComment(e.target.value)}
              required
              value={textComment}
            ></textarea>
          </div>
          <Button { ...{disabled: currentUser.state.penalty === "timeout"} } className=" disabled:cursor-not-allowed font-semibold h-10">Post Comment</Button>
          <div className={` ${currentUser.state.penalty === "timeout" ? "block" : "hidden"} text-red-500`}> You have been timedout</div>
        </div>
      </form>
  
      ) : (
        <div></div>
      )
    }  
      {/* Liste des commentaires */}
      {comments ? (
        comments.map((comment, index) =>
          comment.replied_id === null ? (
            <div key={comment.id} className="flex items-start space-x-3 mb-4">
              <Avatar className="">
                <AvatarImage src={comment.user.image} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-orange-500">
                    {comment.user.displayName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Comment Date {comment.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{comment.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-1 text-sm cursor-pointer">
                    <div
                      className={`flex space-x-1 ${
                        comment.liked ? "text-blue-500" : "text-gray-500"
                      }`}
                      onClick={() => handleLikeClick(comment.id, index)}
                    >
                      <FiThumbsUp className="w-5 h-5" />
                      <span>{comment.likes}</span>
                    </div>
                    <div
                      className={`flex space-x-1 ${
                        comment.disliked ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => handleDislikeClick(comment.id, index)}
                    >
                      <FiThumbsDown className="w-5 h-5" />
                      <span>{comment.deslikes}</span>
                    </div>
                    <div
                      ref={(ref) => (optionsRef.current[index] = ref)}
                      className="cursor-pointer ml-1"
                    >
                      <FiMoreVertical
                        onClick={() => toggleOptions(comment.id)}
                        className="w-5 h-5 text-gray-500"
                      />{" "}
                    </div>
                    <div
                      className="text-gray-400 "
                      onClick={() => handleShowReplies(comment.id, index)}
                    >
                      {" "}
                      {comment.showReplies
                        ? "Hide Replies"
                        : "Show Replies"}{" "}
                    </div>
                  </div>
                  {comment.optionsVisible && (
                    <div className="bg-white shadow-md rounded-md absolute mt-2 p-2">
                      <ul>
                        <li
                          className="p-2 cursor-pointer"
                          onClick={() => handleShowReplyInput(comment.id)}
                        >
                          Reply
                        </li>
                        <ReportForm
                          comment={comment.id}
                          reporter={currentUser.id}
                          reported={comment.user.id}
                        />
                      </ul>
                    </div>
                  )}
                </div>
                {comment.showReplyInput && (
                  <div className="mt-4 reply-input">
                    <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                      <div className="flex items-end space-x-3">
                        <textarea
                          name="comment"
                          className=" w-[98%] mx-12 h-16 p-2 outline-none border rounded resize-none reply-input"
                          placeholder="Write a reply..."
                          required
                          value={textReply}
                          onChange={(e) => {
                            console.log(textReply);
                            setTextReply(e.target.value);
                          }}
                        ></textarea>
                        <Button
                          className=" h-7 font-semibold reply-input"
                          type="submit"
                        >
                          Reply
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {comment.showReplies &&
                  comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex items-start space-x-3 mt-4"
                    >
                      <Avatar className="">
                        <AvatarImage src={reply.user.image}/>
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-orange-500">
                            {reply.user.userName}
                          </h3>
                          <span className="text-sm text-gray-500">
                            Reply Date {reply.date}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )
        )
      ) : (
        <p>Loading...</p>
      )}
      {/* Fin de la liste des commentaires */}
    </div>
  );
}
