import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Avatar } from '../../components/ui/avatar';
import { Send, Search, Users, MessageSquare } from 'lucide-react';
import { ScrollArea } from '../../components/ui/scroll-area';

interface Conversation {
  id: string;
  name: string;
  companyName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Jane Supplier',
    companyName: 'NutriSource Ltd',
    lastMessage: 'Thank you for your inquiry. We can provide that...',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Mike Buyer',
    companyName: 'Health Foods Inc',
    lastMessage: 'Can you send me the COA for the last batch?',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    companyName: 'Organic Extracts Co',
    lastMessage: 'Quote submitted for RFQ #1234',
    timestamp: '2 days ago',
    unread: 1,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'other',
    text: 'Hi, I saw your RFQ for Vitamin C. We can definitely help with that.',
    timestamp: '10:15 AM',
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Great! Can you provide pricing for 500kg?',
    timestamp: '10:20 AM',
  },
  {
    id: '3',
    senderId: 'other',
    text: 'Thank you for your inquiry. We can provide that at $45/kg for quantities over 500kg.',
    timestamp: '10:30 AM',
  },
];

const ChatPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In production, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <h2 className="mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    selectedConversation === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{conv.companyName}</p>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {mockConversations.find(c => c.id === selectedConversation)?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {mockConversations.find(c => c.id === selectedConversation)?.companyName}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2 rounded-lg ${
                          msg.senderId === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-white">
                <div className="flex gap-2 max-w-3xl mx-auto">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
