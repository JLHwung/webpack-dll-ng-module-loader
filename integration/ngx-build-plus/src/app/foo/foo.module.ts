import { NgModule } from "@angular/core";

import { FooComponent } from "./foo.component";
import { FooRoutingModule } from "./foo-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [FooRoutingModule, CommonModule],
  declarations: [FooComponent]
})
export class FooModule {}
