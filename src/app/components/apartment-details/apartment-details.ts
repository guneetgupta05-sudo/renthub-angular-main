import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-apartment-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './apartment-details.html',
  styleUrl: './apartment-details.css'
})
export class ApartmentDetails implements OnInit {

  apartment: Apartment | undefined;
  comments: Comment[] = [];
newComment = '';
replyText = '';
replyingTo: number | null = null;

  constructor(
  private route: ActivatedRoute,
  private apartmentService: ApartmentService,
  private commentService: CommentService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.apartment = this.apartmentService.getApartmentById(id);

  if (!this.apartment) {
    this.router.navigate(['/']);
    return;
  }

  this.comments = this.commentService.getCommentsByApartment(id);
}

addComment(): void {
  const user = this.authService.getCurrentUser();

  if (!user) {
    this.router.navigate(['/login']);
    return;
  }

  if (!this.newComment.trim() || !this.apartment) {
    return;
  }

  const comment: Comment = {
    id: Date.now(),
    apartmentId: this.apartment.id,
    userEmail: user.email,
    userName: user.name,
    text: this.newComment,
    parentCommentId: null,
    createdAt: new Date().toISOString()
  };

  this.commentService.addComment(comment);

  this.comments =
    this.commentService.getCommentsByApartment(
      this.apartment.id
    );

  this.newComment = '';
}

startReply(commentId: number): void {
  this.replyingTo = commentId;
  this.replyText = '';
}

cancelReply(): void {
  this.replyingTo = null;
  this.replyText = '';
}

addReply(commentId: number): void {
  const user = this.authService.getCurrentUser();

  if (!user) {
    this.router.navigate(['/login']);
    return;
  }

  if (!this.replyText.trim() || !this.apartment) {
    return;
  }

  const reply: Comment = {
    id: Date.now(),
    apartmentId: this.apartment.id,
    userEmail: user.email,
    userName: user.name,
    text: this.replyText,
    parentCommentId: commentId,
    createdAt: new Date().toISOString()
  };

  this.commentService.addComment(reply);

  this.comments =
    this.commentService.getCommentsByApartment(
      this.apartment.id
    );

  this.replyText = '';
  this.replyingTo = null;
}

  goBack(): void {
    this.router.navigate(['/']);
  }
}