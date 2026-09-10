import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments: Comment[] = [];

  constructor() {
    const savedComments = localStorage.getItem('renthub_comments');

    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    }
  }

  getCommentsByApartment(apartmentId: number): Comment[] {
    return this.comments.filter(
      comment => comment.apartmentId === apartmentId
    );
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);

    localStorage.setItem(
      'renthub_comments',
      JSON.stringify(this.comments)
    );
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter(
      comment => comment.id !== commentId
    );

    localStorage.setItem(
      'renthub_comments',
      JSON.stringify(this.comments)
    );
  }
}