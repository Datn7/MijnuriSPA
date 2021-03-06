import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message.model';
import { PaginatedResult, Pagination } from '../_models/pagination.model';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this._userService
      .getMessages(
        this._authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this._alertify.error(error);
        }
      );
  }

  deleteMessage(id: number) {
    this._alertify.confirm(
      'Are you sure you want to delete this message?',
      () => {
        this._userService
          .deleteMessage(id, this._authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex((m) => m.id === id),
                1
              );
              this._alertify.success('Message has been deleted');
            },
            (error) => {
              this._alertify.error('Failed to delete the message');
            }
          );
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
