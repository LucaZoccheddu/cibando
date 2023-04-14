import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  user: any;
  ricerca: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private recipeService: RecipeService
    ) {}

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) != null) {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  onCerca() {
    this.recipeService.ricerca.next(this.ricerca);
    this.router.navigate(['/ricette/cerca/']);
    // this.ricerca = '';
  }
}
