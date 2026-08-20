import { Message } from '@/types';

export const safeConversation: Message[] = [
  { id: '1', sender: 'contact', content: 'Hey, did you finish the math homework?', timestamp: '2026-08-18T10:00:00Z' },
  { id: '2', sender: 'child', content: 'Yeah, just finished it. Question 4 was hard.', timestamp: '2026-08-18T10:05:00Z' },
  { id: '3', sender: 'contact', content: 'Same here! See you tomorrow.', timestamp: '2026-08-18T10:06:00Z' }
];

export const cyberbullyingConversation: Message[] = [
  { id: '1', sender: 'contact', content: 'Look at what you wore today, so ugly.', timestamp: '2026-08-18T11:00:00Z' },
  { id: '2', sender: 'child', content: 'Leave me alone.', timestamp: '2026-08-18T11:02:00Z' },
  { id: '3', sender: 'contact', content: 'Everyone hates you. You are so stupid.', timestamp: '2026-08-18T11:05:00Z' },
  { id: '4', sender: 'contact', content: 'Just don\'t come to school tomorrow.', timestamp: '2026-08-18T11:10:00Z' }
];

export const groomingConversation: Message[] = [
  { id: '1', sender: 'contact', content: 'Hey! You seem really cool. I like your profile pic.', timestamp: '2026-08-18T12:00:00Z' },
  { id: '2', sender: 'child', content: 'Thanks!', timestamp: '2026-08-18T12:02:00Z' },
  { id: '3', sender: 'contact', content: 'I feel like we really understand each other. You can tell me anything.', timestamp: '2026-08-18T12:15:00Z' },
  { id: '4', sender: 'contact', content: 'Don\'t tell your parents we are talking though, they wouldn\'t get it.', timestamp: '2026-08-18T12:20:00Z' },
  { id: '5', sender: 'contact', content: 'Where do you live? Maybe we can hang out.', timestamp: '2026-08-18T12:25:00Z' }
];
