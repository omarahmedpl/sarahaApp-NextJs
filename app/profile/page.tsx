"use client"; // Mark this as a client component

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../ui/Loading";
import ProfileCard from "./ProfileCard";
import { IoMail } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import {
  deleteMessage,
  fetchProfile,
  fetchUserMessages,
} from "../actions/user";
import MessageSkeleton from "../ui/MessageSkeleton";
import Modal from "../ui/Modal";
import Error from "../ui/Error";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({ profile: true, messages: true });
  const [loadMore, setLoadMore] = useState(false);
  const [messagesLength, setMessagesLength] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  const fetchMessages = useCallback(
    async (type: string) => {
      try {
        if (type === "new") {
          setLoading((prev) => ({ ...prev, messages: true }));
        } else {
          setLoadMore(true);
        }
        const messagesData = await fetchUserMessages({ page, limit });
        setMessages(messagesData?.messages || []);
      } catch (err) {
        console.error("Failed to load messages:", err);
        setError("Failed to load messages.");
      } finally {
        setLoading((prev) => ({ ...prev, messages: false }));
        setLoadMore(false);
      }
    },
    [page]
  );

  const fetchUser = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, profile: true }));
      const userData = await fetchProfile();
      setUser(userData);
      setMessagesLength(userData?.messages?.length || 0);
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setError("Failed to load user profile.");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  }, []);
  // Fetch user profile and initial messages on component mount
  useEffect(() => {
    fetchUser();
    fetchMessages("new");
  }, []);
  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1); // Functional update
  }, []);
  // Fetch messages when `page` changes
  useEffect(() => {
    if (page > 1) {
      fetchMessages("loadMore");
    }
  }, [page]);
  const handleDelete = useCallback(
    async (messageId: string) => {
      try {
        setLoading((prev) => ({ ...prev, messages: true }));
        await deleteMessage({ messageId });
        const messagesData = await fetchUserMessages({ page, limit });
        setMessages(messagesData?.messages || []);
        setMessagesLength((prev) => prev - 1);
      } catch (err) {
        console.error("Failed to delete message:", err);
        setError("Failed to delete message.");
      } finally {
        setLoading((prev) => ({ ...prev, messages: false }));
      }
    },
    [page, limit]
  );

  const handleDeleteConfirmation = useCallback((messageId: string) => {
    setSelectedMessageId(messageId);
    setIsOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedMessageId) {
      handleDelete(selectedMessageId);
      setIsOpen(false);
    }
  }, [selectedMessageId, handleDelete]);
  const isLoading = useMemo(() => {
    return loading.profile && loading.messages ? true : false;
  }, [loading]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container flex flex-col md:flex-row gap-[30px]">
      
      {/* Profile Section */}
      <div className="flex-[0.4] h-fit border rounded-md overflow-hidden flex flex-col items-center">
        {!user ? (
          <div>Error loading profile.</div>
        ) : (
          <ProfileCard
            userData={user.user}
            messages={messagesLength}
            className="flex flex-col items-center w-full"
          />
        )}
      </div>

      {/* Messages Section */}
      <div className="flex-[0.6] border rounded-md min-h-[400px] overflow-hidden p-10 flex flex-col items-center">
        <div className="title-messages flex flex-row gap-2 items-center">
          <IoMail size={30} />
          <div className="message-title text-[30px]">Messages</div>
        </div>
        <div className="messages flex flex-col gap-[20px] items-center w-full my-3">
          {loading.messages ? (
            <MessageSkeleton />
          ) : messages.length ? (
            messages.map((message) => (
              <div
                key={message._id}
                className="message bg-primary text-white p-4 rounded-md flex flex-col gap-2 w-full relative"
              >
                <div className="message-content">{message.message}</div>
                <div className="message-time text-[12px]">
                  {message.createdAt}
                </div>
                <button
                  type="button"
                  className="delete-icon absolute top-5 right-5 cursor-pointer"
                  onClick={() => handleDeleteConfirmation(message._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <div className="no-messages text-[20px] font-bold">
              No messages yet
            </div>
          )}
          {messages.length ? (
            <div>
              <button
                onClick={handleLoadMore}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loadMore || messages.length === messagesLength}
              >
                {loadMore ? "Loading..." : "Load More"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        modalProps={{
          isOpen,
          setIsOpen,
          title: "Are You Sure? You're About to delete the message",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            <button onClick={handleConfirmDelete} className="btn-danger">
              Confirm
            </button>
            <button onClick={() => setIsOpen(false)} className="btn-info">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
