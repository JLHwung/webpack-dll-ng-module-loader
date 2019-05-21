import { CheatAngularCompilerResourcePlugin } from "./plugin";

export default {
  config(cfg) {
    /* 
        prepend to builtin AngularCompilerPlugin, it is important since the plugin 
        manipulates the resource path of the context module
         */
    cfg.plugins.unshift(new CheatAngularCompilerResourcePlugin());
    return cfg;
  }
};
