import { take } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent {

  newUser: any;

  constructor (
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    ) {};

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    repPassword: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue)
  },
  [CustomValidator.matchValidator('password', 'repPassword')]
  );

  onSubmit() {
      const user = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      }
      this.userService.aggiungiUtente(user).pipe(
        take(1)
      )
      .subscribe({
        next: (response) => {
          this.newUser = response;
          this.userService.datiUtente.next(this.newUser);
        },
        error: (error) => {
          console.log(error);
        }
      })
      this.router.navigate(['home']);
  };

  open(content: any, titolo?: string) {
    let title = titolo;

    this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      // close, inserimento nuova ricetta
      console.log('azione da eseguire' + title)
    }).catch((res) => {
      // dismiss, reindirizzare alle ricette
      console.log('nessuna azione da eseguire')
    });
  }
}
