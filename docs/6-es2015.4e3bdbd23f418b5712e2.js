(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"8r/t":function(t,e,o){"use strict";o.r(e),o.d(e,"ProfileModule",(function(){return b}));var n=o("ofXK"),i=o("tyNb"),r=o("fXoL"),s=o("aTx8");const c=[{path:"",redirectTo:"edit"},{path:"edit",component:(()=>{class t{constructor(t){this.keycloakService=t,this.user=""}ngOnInit(){this.initializeUserOptions()}initializeUserOptions(){this.user=this.keycloakService.getUsername()}logout(){this.keycloakService.logout("https://eu.yuuvis.io/tenant?logout")}}return t.\u0275fac=function(e){return new(e||t)(r.Db(s.b))},t.\u0275cmp=r.xb({type:t,selectors:[["app-edit-profile"]],decls:4,vars:1,consts:[[3,"click"]],template:function(t,e){1&t&&(r.Gb(0,"p"),r.Qb(1),r.Fb(),r.Gb(2,"button",0),r.Lb("click",(function(){return e.logout()})),r.Qb(3,"Logout"),r.Fb()),2&t&&(r.ub(1),r.Rb("Hi ",e.user,""))},styles:[""]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=r.Bb({type:t}),t.\u0275inj=r.Ab({factory:function(e){return new(e||t)},imports:[[i.b.forChild(c)],i.b]}),t})(),b=(()=>{class t{}return t.\u0275mod=r.Bb({type:t}),t.\u0275inj=r.Ab({factory:function(e){return new(e||t)},imports:[[n.b,u]]}),t})()}}]);