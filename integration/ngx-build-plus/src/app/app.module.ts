import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NgModuleFactoryLoader } from "@angular/core";
import { AppComponent } from "./app.component";
import { WebpackDllNgModuleLoader } from "webpack-dll-ng-module-loader";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule],
  providers: [
    {
      provide: NgModuleFactoryLoader,
      useClass: WebpackDllNgModuleLoader
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
