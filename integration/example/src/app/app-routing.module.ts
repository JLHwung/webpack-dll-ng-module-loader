import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  {
    path: "foo",
    loadChildren: "./foo/foo.module#FooModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
