import { Author } from './types';

export const authors: Author[] = [
  {
    name: 'Muhammad Shahsawar Khan',
    title: 'Networking Educator & Creator of OSI Model Simulator',
    bio: 'Muhammad Shahsawar Khan builds educational tools and reference guides that help students and professionals understand how computer networks actually work. He is the creator of OSI Model Simulator (by Roboticela), an interactive learning platform that visualizes encapsulation, protocols, and the seven OSI layers. His writing focuses on clear explanations grounded in RFCs, standards bodies, and real internet infrastructure.',
    website: 'https://muhammad.roboticela.com',
  },
];

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((author) => author.name === name);
}
