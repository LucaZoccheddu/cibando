import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RecipeRoutingModule } from "./recipes-routing.module";

import { RecipeCardComponent } from "src/app/shared/recipe-card/recipe-card.component";
import { RecipesComponent } from "./recipes.component";
import { DetailComponent } from "./detail/detail.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipesComponent,
    DetailComponent,
    RecipesListComponent,
    AddRecipeComponent,
    ResultComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipeRoutingModule,
  ],
  exports: [
    RecipeCardComponent
  ]
})

export class RecipesModule {}
