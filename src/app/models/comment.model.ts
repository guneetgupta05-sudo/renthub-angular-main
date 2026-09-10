export interface Comment {
  id: number;
  apartmentId: number;
  userEmail: string;
  userName: string;
  text: string;
  parentCommentId: number | null;
  createdAt: string;
}