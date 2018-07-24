import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
<h1>Angular Router</h1>
<nav>
    <a routerLink="/foo">link to foo</a>
</nav>
<router-outlet></router-outlet>
  `
})
export class AppComponent {}
