"use client";

import { MessageList } from "./components/MessageList";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            <i className="fas fa-envelope mr-3 text-blue-600"></i>
            Message Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage messages received through your contact form
          </p>
        </div>

        <MessageList />
      </div>
    </div>
  );
}
