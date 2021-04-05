import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RecipesResolverService } from './shared/recipes-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "recipes", component: RecipesComponent, canActivate:[AuthGuard], children: [
    { path: "", component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService], children: [
      { path: 'edit', component: RecipeEditComponent }
    ] }    
  ]},
  { path: "shopping-list", component: ShoppingListComponent},
  { path: "auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
