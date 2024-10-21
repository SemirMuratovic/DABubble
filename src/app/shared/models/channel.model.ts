export class Channel {
  admin: {
    userId: string;
    userName: string;
  };
  channelId: string;
  channelName: string;
  description: string;
  members: {
    userId: string;
    userName: string;
  }[];
  messages: {
    content: string;
    messageId: string;
    reactions: {
      emoji: string;
      count: number;
    }[];
    thread: {
      messages: {
        content: string;
        messageId: string;
        reactions: {
          emoji: string;
          count: number;
        }[];
        time: string;
        user: {
          userId: string;
          userName: string;
        };
      }[];
    };
    time: string;
    user: {
      userId: string;
      userName: string;
    };
  }[];
  

  constructor(
    admin: { userId: string; userName: string },
    channelId: string,
    channelName: string,
    description: string,
    members: { userId: string; userName: string }[],
    messages: {
      content: string;
      messageId: string;
      reactions: { emoji: string; count: number }[];
      thread: {
        messages: {
          content: string;
          messageId: string;
          reactions: { emoji: string; count: number }[];
          time: string;
          user: { userId: string; userName: string };
        }[];
      };
      time: string;
      user: { userId: string; userName: string };
    }[],
  ) {
    this.admin = admin;
    this.channelId = channelId;
    this.channelName = channelName;
    this.description = description;
    this.members = members;
    this.messages = messages;
  }
}

  