import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/models/recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { take } from 'rxjs';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {

  newRecipe: any;
  percorsoStelline = "../../../../assets/images/difficolta-";

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl(false),
    difficulty: new FormControl('', Validators.required)
  })

  Editor = ClassicEditorBuild;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'codeBlock',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    height: 300,
};


  constructor (
    private router: Router,
    private modalService: NgbModal,
    private recipeService: RecipeService
  ) {};

  onSubmit() {
    const recipe = this.form.value;
    this.recipeService.addRecipe(recipe).pipe(
      take(1)
    )
    .subscribe({
      next: (response) => {
        this.newRecipe = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // open(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
  //     console.log('azione da eseguire')
  //     this.form.reset();
  //   }).catch((res) => {
  //     console.log('nessuna azione da eseguire')
  //     this.router.navigate(['/ricette'])
  //   });
  // }

  onClose() {
    this.newRecipe = '';
    this.router.navigate(['/ricette']);
  }

  onNewRecipe() {
    this.newRecipe = '';
    this.form.reset();
    this.form.patchValue({    // per modificare i valori di una reactive form
      difficulty: '',
    })
  }
}
