"use client";

import { useState, useEffect } from "react";
import { ContactMessage, MessageFilters } from "@/types/message";
import { messageService } from "../messageService";
import { MessageCard } from "./MessageCard";

// Import design system components
import Typography from "@/components/atoms/Typography/Typography";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Card from "@/components/molecules/Card/Card";
import { Loading } from "@/components/atoms/Loading/Loading";

interface MessageListProps {
  onUnreadCountChange?: (count: number) => void;
}

export function MessageList({ onUnreadCountChange }: MessageListProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MessageFilters>({});
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await messageService.fetchMessages(filters);

      // Apply sorting
      const sortedMessages = [...fetchedMessages].sort((a, b) => {
        const dateA = new Date(a.receivedAt).getTime();
        const dateB = new Date(b.receivedAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });

      setMessages(sortedMessages);

      // Update unread count
      const unreadCount = sortedMessages.filter((msg) => !msg.isRead).length;
      onUnreadCountChange?.(unreadCount);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [filters, sortBy]);

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search: search || undefined }));
  };

  const handleFilterChange = (isRead?: boolean) => {
    setFilters((prev) => ({ ...prev, isRead }));
  };

  const filteredMessages = messages;
  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loading size="lg" />
        <Typography variant="p" className="ml-3 text-gray-400">
          Loading messages...
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-roboto">
      {/* Header with stats and filters */}
      <Card variant="elevated" className="p-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <Typography variant="h2" className="text-white font-roboto">
              Messages
            </Typography>
            <Typography variant="p" className="text-gray-400">
              {messages.length} total messages • {unreadCount} unread
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-3"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2">
              <Button
                variant={filters.isRead === undefined ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange(undefined)}
              >
                All
              </Button>
              <Button
                variant={filters.isRead === false ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange(false)}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filters.isRead === true ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange(true)}
              >
                Read
              </Button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              aria-label="Sort messages"
              title="Sort messages"
              className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-white"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card variant="bordered" className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <i className="fas fa-envelope-open"></i>
            </div>
            <Typography variant="h3" className="text-white mb-2">
              No messages found
            </Typography>
            <Typography variant="p" className="text-gray-400">
              {Object.keys(filters).length > 0
                ? "Try adjusting your search or filters"
                : "Messages from your contact form will appear here"}
            </Typography>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onUpdate={loadMessages}
            />
          ))
        )}
      </div>
    </div>
  );
}
