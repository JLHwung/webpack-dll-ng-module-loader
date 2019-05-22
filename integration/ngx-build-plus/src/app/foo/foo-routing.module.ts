import { FooComponent } from "./foo.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const fooRoutes: Routes = [
  {
    path: "",
    component: FooComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(fooRoutes)],
  exports: [RouterModule]
})
export class FooRoutingModule {}
