import { usePage } from "@inertiajs/react";
import React from "react";
import UserAvatar from "./UserAvatar";
import ReactMmarkdown from "react-markdown";
import { formatMessageDateLong } from "@/helpers";

const MessageItem = ({ message, attachmentClick }) => {
    const currentUser = usePage().props.auth.user;
    return (
        <div
            className={
                "chat " +
                (message.sender_id === currentUser.id
                    ? "chat-end"
                    : "chat-start")
            }
        >
            {<UserAvatar user={message.sender} />}
            <div className="chat-header">
                {message.group_id !== null &&
                message.sender_id !== currentUser.id
                    ? message.sender.name
                    : ""}
                {/* {message.sender_id !== currentUser.id
                    ? message.sender.name
                    : ""} */}
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={
                    "chat-bubble relative " +
                    (message.sender_id === currentUser.id
                        ? " chat-bubble-info"
                        : "")
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMmarkdown>{message.message}</ReactMmarkdown>
                    </div>
                    <MessageAttachments attachments={message.attachments} />
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
