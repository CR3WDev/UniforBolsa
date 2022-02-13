import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserResponse } from 'app/models/User';
import { UserService } from 'app/services/user.service';
import { DialogComponent } from 'app/components/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'age',
    'cep',
    'street',
    'number',
    'actions',
  ];
  dataSource!: UserResponse['data'];
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getUsers().subscribe((data: UserResponse) => {
      this.dataSource = data.data;
    });
  }
  ngOnInit(): void {}

  handleAddClick(): void {
    const newUser = {
      username: null,
      age: null,
      cep: null,
      street: null,
      number: null,
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: newUser,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.hasErrosOnCreateUser(result)) {
        this.showToast();
      } else {
        this.createUserAndUpdateUserList(result);
      }
    });
  }
  hasErrosOnCreateUser(newUser: User): boolean {
    if (newUser.username == null) return true;
    if (newUser.age == null) return true;
    if (newUser.cep == null) return true;
    if (newUser.street == null) return true;
    if (newUser.number == null) return true;
    return false;
  }

  showToast() {
    this.toastr.error('Um dos campos obrigatórios estava vazio', 'Error');
  }

  createUserAndUpdateUserList(newUser: User) {
    this.userService.createUser(newUser).subscribe(() => {
      this.getAllUsers();
    });
  }

  handleEditClick(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.editUserAndUpdateUserList(result);
    });
  }

  editUserAndUpdateUserList(newUserData: User) {
    this.userService.editUser(newUserData).subscribe(() => {
      this.getAllUsers();
    });
  }

  handleDeleteClick(userId: number) {
    this.deleteUserAndUpdateUserList(userId);
  }

  deleteUserAndUpdateUserList(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.getAllUsers();
    });
  }
}
