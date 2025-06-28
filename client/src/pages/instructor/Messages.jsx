import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus,
  Clock,
  Star,
  Archive,
  Filter
} from "lucide-react";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real API data
  const conversations = [
    {
      id: 1,
      student: {
        name: "Alice Johnson",
        avatar: "AJ",
        course: "React Fundamentals"
      },
      lastMessage: "Thank you for the detailed explanation about hooks!",
      timestamp: "2 hours ago",
      unread: true,
      priority: "high",
      messages: [
        {
          id: 1,
          sender: "student",
          content: "Hi! I'm having trouble understanding useEffect. Could you help?",
          timestamp: "3 hours ago"
        },
        {
          id: 2,
          sender: "instructor",
          content: "Of course! useEffect is used for side effects in React components. What specific part are you struggling with?",
          timestamp: "2.5 hours ago"
        },
        {
          id: 3,
          sender: "student",
          content: "Thank you for the detailed explanation about hooks!",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      id: 2,
      student: {
        name: "Bob Smith",
        avatar: "BS",
        course: "Node.js Basics"
      },
      lastMessage: "Could you review my assignment?",
      timestamp: "1 day ago",
      unread: false,
      priority: "medium",
      messages: [
        {
          id: 1,
          sender: "student",
          content: "Could you review my assignment?",
          timestamp: "1 day ago"
        }
      ]
    },
    {
      id: 3,
      student: {
        name: "Carol Davis",
        avatar: "CD",
        course: "Full Stack Development"
      },
      lastMessage: "Great course! Really enjoying the content.",
      timestamp: "3 days ago",
      unread: false,
      priority: "low",
      messages: [
        {
          id: 1,
          sender: "student",
          content: "Great course! Really enjoying the content.",
          timestamp: "3 days ago"
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Here you would send the message to your API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-300">Communicate with your students</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-red-600">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-green-600">Average response</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-yellow-600">Student rating</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-blue-600">Messages handled</p>
          </CardContent>
        </Card>
      </div>

      {/* Message Interface */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 h-[600px]">
        {/* Conversation List */}
        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Conversations</span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-[450px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        {conversation.student.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 truncate">
                          {conversation.student.name}
                        </h4>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{conversation.student.course}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(conversation.priority)}`}>
                          {conversation.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      {selectedConversation.student.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.student.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedConversation.student.course}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-[400px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'instructor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'instructor'
                            ? 'bg-blue-600 dark:bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'instructor' ? 'text-blue-100 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[60px] max-h-[120px]"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage} className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Select a conversation</h3>
                <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
