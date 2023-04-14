import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, take, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  providers: [MessageService]
})
export class RecipeCardComponent implements OnDestroy, OnInit{


  @Input() pag: string;
  @Output() messaggio = new EventEmitter;

  // recipes: Recipe[];
  ricetteTotali: number;
  page = 1;
  ricettePerPagina = 4;
  ruolo: any;

  // recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
  //   // map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
  //   map(res => this.ricette = res),
  // )
  ricette: Recipe[];
  ricerca: any;

  constructor (
    private recipeService: RecipeService,
    private messageService: MessageService,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      const email = JSON.parse(localStorage.getItem('user')).email;
      // const email = (JSON.parse(user)).email;
      this.userService.getUser(email).subscribe({
        next: res => this.ruolo = res.role,
      })
    }
    if(this.pag === 'cerca'){
      this.recipeService.ricerca.subscribe((res) => this.ricerca = res);
      this.ricercaRicetta(this.ricerca);
    } else {
      this.prendiRicette();
    }
  }

  ngDoCheck() {
    if(this.pag === 'cerca' && this.recipeService.ricerca.subscribe() != this.ricerca) {
      this.recipeService.ricerca.subscribe((res) => this.ricerca = res);
      this.ricercaRicetta(this.ricerca);
    }
  }

  ngOnDestroy(): void {

  }

  prendiRicette() {
    this.recipeService.getRecipes()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.ricette = res;
          if (this.pag === 'home') {
            this.ricette = this.ricette.sort((a,b) => String(b._id).localeCompare(String(a._id))).slice(0, 4);
          }
          console.log(this.ricette[1]._id);
          this.ricetteTotali = this.ricette.length;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  ricercaRicetta (ricerca: string) {
    // this.recipeService.ricerca.subscribe((res) => this.ricerca = res);
    this.recipeService.getRecipeByText(this.ricerca).subscribe({
      next: (res) => {
        this.ricette = res;
        this.ricetteTotali = this.ricette.length;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  inviaTitolo(titolo: string) {
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }
}
