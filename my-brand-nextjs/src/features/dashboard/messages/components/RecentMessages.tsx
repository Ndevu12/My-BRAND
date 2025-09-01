"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactMessage } from "@/types/message";
import { messageService } from "@/features/dashboard/messages/messageService";

// Import design system components
import Typography from "@/components/atoms/Typography/Typography";
import Badge from "@/components/atoms/Badge/Badge";
import Card from "@/components/molecules/Card/Card";
import { Loading } from "@/components/atoms/Loading/Loading";
import CustomLink from "@/components/atoms/Link/Link";

export function RecentMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadRecentMessages = async () => {
      try {
        const recentMessages = await messageService.getRecentMessages();
        const unread = await messageService.getUnreadMessagesCount();
        setMessages(recentMessages);
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to load recent messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentMessages();
  }, []);

  if (loading) {
    return (
      <Card variant="elevated" className="p-6">
        <Typography variant="h3" className="text-white mb-4 flex items-center">
          <i className="fas fa-envelope mr-3 text-blue-400"></i>
          Recent Messages
        </Typography>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <Loading size="sm" />
              <div className="h-4 bg-gray-700 rounded flex-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="text-white flex items-center">
          <i className="fas fa-envelope mr-3 text-blue-400"></i>
          Recent Messages
        </Typography>
        {unreadCount > 0 && (
          <Badge variant="status" color="red" size="sm">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      {messages.length === 0 ? (
        <Typography variant="small" className="text-gray-400">
          No messages yet. Messages from your contact form will appear here.
        </Typography>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              variant="bordered"
              className={`p-3 transition-colors ${
                message.isRead
                  ? "border-gray-600 bg-gray-700/50"
                  : "border-accent/50 bg-accent/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 animate-pulse"></div>
                    )}
                    <Typography variant="h6" className="text-white truncate">
                      {message.name}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    className="text-gray-300 truncate"
                  >
                    {message.subject || "No subject"}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-gray-400 truncate mt-1"
                  >
                    {message.message}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  className="text-gray-500 whitespace-nowrap ml-2"
                >
                  {new Date(message.receivedAt).toLocaleDateString()}
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700">
        <CustomLink
          href="/dashboard/messages"
          className="text-accent hover:text-accent/80 text-sm font-medium flex items-center transition-colors"
        >
          View all messages
          <i className="fas fa-arrow-right ml-2 text-xs"></i>
        </CustomLink>
      </div>
    </Card>
  );
}
