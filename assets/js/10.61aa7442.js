(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{422:function(t,e,l){"use strict";l.r(e);var a={name:"template-url",props:{text:{type:String,default:""},urlTemplate:{type:String,required:!0},jwt:{type:Boolean,default:!0}},data:()=>({url:""}),async mounted(){const t=await l.e(18).then(l.t.bind(null,418,7)),e=await Promise.all([l.e(2),l.e(20)]).then(l.t.bind(null,235,7)),a=t.template(this.urlTemplate);let n={moment:e};n.jwt=this.$site.themeConfig.jwt,this.url=a(n)}},n=l(3),s=Object(n.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{target:"_blank",href:this.url}},[this._v("\n  "+this._s(this.text)+"\n  "),e("i",{staticClass:"las la-external-link-square-alt"})])}),[],!1,null,null,null);e.default=s.exports}}]);