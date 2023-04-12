import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
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

  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
    // map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
    map(res => this.ricette = res),
  )
  ricette: Recipe[];

  constructor (
    private recipeService: RecipeService,
    private messageService: MessageService,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.userService.userRole.subscribe({
        next: res => this.ruolo = res,
      })
    }
  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  // prendiRicette() {
  //   this.recipeService.getRecipes()
  //   .pipe(
  //     take(1)
  //   )
  //   .subscribe({
  //     next: (res) => {
  //       this.recipes = res;
  //       if (this.pag === 'home') {
  //         this.recipes = this.recipes.sort((a,b) => String(b._id).localeCompare(String(a._id))).slice(0, 4);
  //       }
  //       console.log(this.recipes[1]._id);
  //       this.ricetteTotali = this.recipes.length;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  inviaTitolo(titolo: string) {
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }
}
