import React, { useState } from "react";
import {
  Send,
  ThumbsUp,
  MoreVertical,
  Trash2,
  Flag,
  Pin,
  MessageCircle,
} from "lucide-react";
import "./RoomComments.css";

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  isPinned?: boolean;
  likes: number;
  likedByUser: boolean;
}

interface RoomCommentsProps {
  currentUserId: string;
  isCreator: boolean;
  roomId: string;
}

const RoomComments: React.FC<RoomCommentsProps> = ({
  currentUserId,
  isCreator,
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "user2",
      username: "AnnaWiśniewska",
      avatar: "A",
      content:
        "Świetny turniej! Punktacja jest bardzo sprawiedliwa i motywująca do regularnego typowania.",
      timestamp: "2024-10-25T14:30:00",
      isPinned: true,
      likes: 8,
      likedByUser: false,
    },
    {
      id: "2",
      userId: "user3",
      username: "PiotrNowak",
      avatar: "P",
      content:
        "Czy ktoś ma jakieś statystyki z poprzednich sezonów Premier League? Przydałoby się do analizy.",
      timestamp: "2024-10-26T10:15:00",
      likes: 3,
      likedByUser: true,
    },
    {
      id: "3",
      userId: "user4",
      username: "MariaKowalczyk",
      avatar: "M",
      content:
        "Polecam stronę fbref.com - mają świetne statystyki i analizy. Ja z tego korzystam przy typowaniu.",
      timestamp: "2024-10-26T11:20:00",
      likes: 5,
      likedByUser: false,
    },
    {
      id: "4",
      userId: "user5",
      username: "TomaszZieliński",
      avatar: "T",
      content:
        "Może warto dodać jeszcze jakieś bonusy za serie trafionych wyników? Motywowałoby to do konsekwencji.",
      timestamp: "2024-10-27T09:45:00",
      likes: 2,
      likedByUser: false,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: "Gracz",
      avatar: "G",
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedByUser: false,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
            likedByUser: !comment.likedByUser,
          };
        }
        return comment;
      })
    );
  };

  const handlePin = (commentId: string) => {
    setComments(
      comments.map((comment) => ({
        ...comment,
        isPinned:
          comment.id === commentId ? !comment.isPinned : comment.isPinned,
      }))
    );
    setActiveMenu(null);
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten komentarz?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
      setActiveMenu(null);
    }
  };

  const handleReport = () => {
    alert("Komentarz został zgłoszony do moderacji");
    setActiveMenu(null);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Teraz";
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours}h temu`;
    if (diffDays < 7) return `${diffDays}d temu`;

    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="room-comments">
      <div className="comments-header">
        <div className="comments-title-section">
          <div className="title-icon-wrapper">
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 className="comments-title">Dyskusja</h2>
            <p className="comments-subtitle">
              {comments.length}{" "}
              {comments.length === 1
                ? "komentarz"
                : comments.length < 5
                  ? "komentarze"
                  : "komentarzy"}
            </p>
          </div>
        </div>
      </div>

      <div className="comments-input-section">
        <textarea
          className="comments-textarea"
          placeholder="Podziel się opinią o turnieju..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <div className="input-actions">
          <button
            className="comments-submit-button"
            onClick={handleAddComment}
            disabled={newComment.trim() === ""}
          >
            <Send size={18} />
            <span>Opublikuj</span>
          </button>
        </div>
      </div>

      <div className="comments-list">
        {sortedComments.length === 0 ? (
          <div className="no-comments">
            <div className="no-comments-icon">
              <MessageCircle size={32} />
            </div>
            <p>Brak komentarzy</p>
            <span>Bądź pierwszy i rozpocznij dyskusję!</span>
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-item ${comment.userId === currentUserId ? "own-comment" : ""
                } ${comment.isPinned ? "pinned-comment" : ""}`}
            >
              {comment.isPinned && (
                <div className="comment-pinned-badge">
                  <Pin size={12} />
                  <span>Przypięty</span>
                </div>
              )}

              <div className="comment-main">
                <div className="comment-avatar">{comment.avatar}</div>

                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-timestamp">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>

                  <div className="comment-text">{comment.content}</div>

                  <div className="comment-footer">
                    <button
                      className={`comment-like-btn ${comment.likedByUser ? "liked" : ""
                        }`}
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp size={14} />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>

                    <div className="comment-menu">
                      <button
                        className="comment-menu-trigger"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === comment.id ? null : comment.id
                          )
                        }
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeMenu === comment.id && (
                        <div className="comment-menu-dropdown">
                          {isCreator && (
                            <button
                              className="comment-menu-item"
                              onClick={() => handlePin(comment.id)}
                            >
                              <Pin size={14} />
                              {comment.isPinned ? "Odepnij" : "Przypnij"}
                            </button>
                          )}
                          {(comment.userId === currentUserId || isCreator) && (
                            <button
                              className="comment-menu-item danger"
                              onClick={() => handleDelete(comment.id)}
                            >
                              <Trash2 size={14} />
                              Usuń
                            </button>
                          )}
                          {comment.userId !== currentUserId && (
                            <button
                              className="comment-menu-item"
                              onClick={() => handleReport()}
                            >
                              <Flag size={14} />
                              Zgłoś
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomComments;