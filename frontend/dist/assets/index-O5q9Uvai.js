(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Il(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const ge={},vs=[],Un=()=>{},xf=()=>!1,xo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Ul=n=>n.startsWith("onUpdate:"),Ve=Object.assign,Nl=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Pd=Object.prototype.hasOwnProperty,le=(n,t)=>Pd.call(n,t),Vt=Array.isArray,xs=n=>Mo(n)==="[object Map]",Mf=n=>Mo(n)==="[object Set]",qt=n=>typeof n=="function",Re=n=>typeof n=="string",si=n=>typeof n=="symbol",ve=n=>n!==null&&typeof n=="object",Sf=n=>(ve(n)||qt(n))&&qt(n.then)&&qt(n.catch),Ef=Object.prototype.toString,Mo=n=>Ef.call(n),Dd=n=>Mo(n).slice(8,-1),yf=n=>Mo(n)==="[object Object]",Fl=n=>Re(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,js=Il(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),So=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Ld=/-\w/g,Ei=So(n=>n.replace(Ld,t=>t.slice(1).toUpperCase())),Id=/\B([A-Z])/g,ji=So(n=>n.replace(Id,"-$1").toLowerCase()),bf=So(n=>n.charAt(0).toUpperCase()+n.slice(1)),Bo=So(n=>n?`on${bf(n)}`:""),xi=(n,t)=>!Object.is(n,t),zo=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Tf=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Ud=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Ec;const Eo=()=>Ec||(Ec=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ol(n){if(Vt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Re(i)?Bd(i):Ol(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Re(n)||ve(n))return n}const Nd=/;(?![^(]*\))/g,Fd=/:([^]+)/,Od=/\/\*[^]*?\*\//g;function Bd(n){const t={};return n.replace(Od,"").split(Nd).forEach(e=>{if(e){const i=e.split(Fd);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function en(n){let t="";if(Re(n))t=n;else if(Vt(n))for(let e=0;e<n.length;e++){const i=en(n[e]);i&&(t+=i+" ")}else if(ve(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const zd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",kd=Il(zd);function Af(n){return!!n||n===""}const wf=n=>!!(n&&n.__v_isRef===!0),Zt=n=>Re(n)?n:n==null?"":Vt(n)||ve(n)&&(n.toString===Ef||!qt(n.toString))?wf(n)?Zt(n.value):JSON.stringify(n,Rf,2):String(n),Rf=(n,t)=>wf(t)?Rf(n,t.value):xs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[ko(i,r)+" =>"]=s,e),{})}:Mf(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ko(e))}:si(t)?ko(t):ve(t)&&!Vt(t)&&!yf(t)?String(t):t,ko=(n,t="")=>{var e;return si(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Qe;class Cf{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Qe,!t&&Qe&&(this.index=(Qe.scopes||(Qe.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Qe;try{return Qe=this,t()}finally{Qe=e}}}on(){++this._on===1&&(this.prevScope=Qe,Qe=this)}off(){this._on>0&&--this._on===0&&(Qe=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Hd(n){return new Cf(n)}function Vd(){return Qe}let me;const Ho=new WeakSet;class Pf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Qe&&Qe.active&&Qe.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ho.has(this)&&(Ho.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Lf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,yc(this),If(this);const t=me,e=bn;me=this,bn=!0;try{return this.fn()}finally{Uf(this),me=t,bn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)kl(t);this.deps=this.depsTail=void 0,yc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ho.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ca(this)&&this.run()}get dirty(){return Ca(this)}}let Df=0,Ks,Zs;function Lf(n,t=!1){if(n.flags|=8,t){n.next=Zs,Zs=n;return}n.next=Ks,Ks=n}function Bl(){Df++}function zl(){if(--Df>0)return;if(Zs){let t=Zs;for(Zs=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Ks;){let t=Ks;for(Ks=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function If(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Uf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),kl(i),Gd(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Ca(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Nf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Nf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===or)||(n.globalVersion=or,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Ca(n))))return;n.flags|=2;const t=n.dep,e=me,i=bn;me=n,bn=!0;try{If(n);const s=n.fn(n._value);(t.version===0||xi(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,bn=i,Uf(n),n.flags&=-3}}function kl(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)kl(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Gd(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let bn=!0;const Ff=[];function ei(){Ff.push(bn),bn=!1}function ni(){const n=Ff.pop();bn=n===void 0?!0:n}function yc(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let or=0;class Wd{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Hl{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!bn||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new Wd(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,Of(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,or++,this.notify(t)}notify(t){Bl();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{zl()}}}function Of(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Of(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Pa=new WeakMap,Xi=Symbol(""),Da=Symbol(""),ar=Symbol("");function Oe(n,t,e){if(bn&&me){let i=Pa.get(n);i||Pa.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Hl),s.map=i,s.key=e),s.track()}}function Kn(n,t,e,i,s,r){const o=Pa.get(n);if(!o){or++;return}const a=l=>{l&&l.trigger()};if(Bl(),t==="clear")o.forEach(a);else{const l=Vt(n),c=l&&Fl(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===ar||!si(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(ar)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Xi)),xs(n)&&a(o.get(Da)));break;case"delete":l||(a(o.get(Xi)),xs(n)&&a(o.get(Da)));break;case"set":xs(n)&&a(o.get(Xi));break}}zl()}function Ji(n){const t=ae(n);return t===n?t:(Oe(t,"iterate",ar),vn(n)?t:t.map(Ue))}function yo(n){return Oe(n=ae(n),"iterate",ar),n}const Xd={__proto__:null,[Symbol.iterator](){return Vo(this,Symbol.iterator,Ue)},concat(...n){return Ji(this).concat(...n.map(t=>Vt(t)?Ji(t):t))},entries(){return Vo(this,"entries",n=>(n[1]=Ue(n[1]),n))},every(n,t){return Hn(this,"every",n,t,void 0,arguments)},filter(n,t){return Hn(this,"filter",n,t,e=>e.map(Ue),arguments)},find(n,t){return Hn(this,"find",n,t,Ue,arguments)},findIndex(n,t){return Hn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Hn(this,"findLast",n,t,Ue,arguments)},findLastIndex(n,t){return Hn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Hn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Go(this,"includes",n)},indexOf(...n){return Go(this,"indexOf",n)},join(n){return Ji(this).join(n)},lastIndexOf(...n){return Go(this,"lastIndexOf",n)},map(n,t){return Hn(this,"map",n,t,void 0,arguments)},pop(){return zs(this,"pop")},push(...n){return zs(this,"push",n)},reduce(n,...t){return bc(this,"reduce",n,t)},reduceRight(n,...t){return bc(this,"reduceRight",n,t)},shift(){return zs(this,"shift")},some(n,t){return Hn(this,"some",n,t,void 0,arguments)},splice(...n){return zs(this,"splice",n)},toReversed(){return Ji(this).toReversed()},toSorted(n){return Ji(this).toSorted(n)},toSpliced(...n){return Ji(this).toSpliced(...n)},unshift(...n){return zs(this,"unshift",n)},values(){return Vo(this,"values",Ue)}};function Vo(n,t,e){const i=yo(n),s=i[t]();return i!==n&&!vn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const qd=Array.prototype;function Hn(n,t,e,i,s,r){const o=yo(n),a=o!==n&&!vn(n),l=o[t];if(l!==qd[t]){const f=l.apply(n,r);return a?Ue(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,Ue(f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function bc(n,t,e,i){const s=yo(n);let r=e;return s!==n&&(vn(n)?e.length>3&&(r=function(o,a,l){return e.call(this,o,a,l,n)}):r=function(o,a,l){return e.call(this,o,Ue(a),l,n)}),s[t](r,...i)}function Go(n,t,e){const i=ae(n);Oe(i,"iterate",ar);const s=i[t](...e);return(s===-1||s===!1)&&Wl(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function zs(n,t,e=[]){ei(),Bl();const i=ae(n)[t].apply(n,e);return zl(),ni(),i}const Yd=Il("__proto__,__v_isRef,__isVue"),Bf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(si));function $d(n){si(n)||(n=String(n));const t=ae(this);return Oe(t,"has",n),t.hasOwnProperty(n)}class zf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?sp:Gf:r?Vf:Hf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Vt(t);if(!s){let l;if(o&&(l=Xd[e]))return l;if(e==="hasOwnProperty")return $d}const a=Reflect.get(t,e,Be(t)?t:i);if((si(e)?Bf.has(e):Yd(e))||(s||Oe(t,"get",e),r))return a;if(Be(a)){const l=o&&Fl(e)?a:a.value;return s&&ve(l)?Ia(l):l}return ve(a)?s?Ia(a):bo(a):a}}class kf extends zf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];if(!this._isShallow){const l=yi(r);if(!vn(i)&&!yi(i)&&(r=ae(r),i=ae(i)),!Vt(t)&&Be(r)&&!Be(i))return l||(r.value=i),!0}const o=Vt(t)&&Fl(e)?Number(e)<t.length:le(t,e),a=Reflect.set(t,e,i,Be(t)?t:s);return t===ae(s)&&(o?xi(i,r)&&Kn(t,"set",e,i):Kn(t,"add",e,i)),a}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Kn(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!si(e)||!Bf.has(e))&&Oe(t,"has",e),i}ownKeys(t){return Oe(t,"iterate",Vt(t)?"length":Xi),Reflect.ownKeys(t)}}class jd extends zf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Kd=new kf,Zd=new jd,Jd=new kf(!0);const La=n=>n,Ar=n=>Reflect.getPrototypeOf(n);function Qd(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=xs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?La:t?oo:Ue;return!t&&Oe(r,"iterate",l?Da:Xi),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function wr(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function tp(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(xi(s,a)&&Oe(o,"get",s),Oe(o,"get",a));const{has:l}=Ar(o),c=t?La:n?oo:Ue;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Oe(ae(s),"iterate",Xi),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(xi(s,a)&&Oe(o,"has",s),Oe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?La:n?oo:Ue;return!n&&Oe(l,"iterate",Xi),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ve(e,n?{add:wr("add"),set:wr("set"),delete:wr("delete"),clear:wr("clear")}:{add(s){!t&&!vn(s)&&!yi(s)&&(s=ae(s));const r=ae(this);return Ar(r).has.call(r,s)||(r.add(s),Kn(r,"add",s,s)),this},set(s,r){!t&&!vn(r)&&!yi(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=Ar(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?xi(r,u)&&Kn(o,"set",s,r):Kn(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=Ar(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Kn(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&Kn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Qd(s,n,t)}),e}function Vl(n,t){const e=tp(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const ep={get:Vl(!1,!1)},np={get:Vl(!1,!0)},ip={get:Vl(!0,!1)};const Hf=new WeakMap,Vf=new WeakMap,Gf=new WeakMap,sp=new WeakMap;function rp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function op(n){return n.__v_skip||!Object.isExtensible(n)?0:rp(Dd(n))}function bo(n){return yi(n)?n:Gl(n,!1,Kd,ep,Hf)}function Wf(n){return Gl(n,!1,Jd,np,Vf)}function Ia(n){return Gl(n,!0,Zd,ip,Gf)}function Gl(n,t,e,i,s){if(!ve(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=op(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Ms(n){return yi(n)?Ms(n.__v_raw):!!(n&&n.__v_isReactive)}function yi(n){return!!(n&&n.__v_isReadonly)}function vn(n){return!!(n&&n.__v_isShallow)}function Wl(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function Xf(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&Tf(n,"__v_skip",!0),n}const Ue=n=>ve(n)?bo(n):n,oo=n=>ve(n)?Ia(n):n;function Be(n){return n?n.__v_isRef===!0:!1}function ze(n){return Yf(n,!1)}function qf(n){return Yf(n,!0)}function Yf(n,t){return Be(n)?n:new ap(n,t)}class ap{constructor(t,e){this.dep=new Hl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:Ue(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||vn(t)||yi(t);t=i?t:ae(t),xi(t,e)&&(this._rawValue=t,this._value=i?t:Ue(t),this.dep.trigger())}}function tn(n){return Be(n)?n.value:n}const lp={get:(n,t,e)=>t==="__v_raw"?n:tn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Be(s)&&!Be(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function $f(n){return Ms(n)?n:new Proxy(n,lp)}class cp{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Hl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=or-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return Lf(this,!0),!0}get value(){const t=this.dep.track();return Nf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function up(n,t,e=!1){let i,s;return qt(n)?i=n:(i=n.get,s=n.set),new cp(i,s,e)}const Rr={},ao=new WeakMap;let Bi;function fp(n,t=!1,e=Bi){if(e){let i=ao.get(e);i||ao.set(e,i=[]),i.push(n)}}function hp(n,t,e=ge){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:vn(M)||s===!1||s===0?_i(M,1):_i(M);let u,f,h,p,v=!1,x=!1;if(Be(n)?(f=()=>n.value,v=vn(n)):Ms(n)?(f=()=>c(n),v=!0):Vt(n)?(x=!0,v=n.some(M=>Ms(M)||vn(M)),f=()=>n.map(M=>{if(Be(M))return M.value;if(Ms(M))return c(M);if(qt(M))return l?l(M,2):M()})):qt(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){ei();try{h()}finally{ni()}}const M=Bi;Bi=u;try{return l?l(n,3,[p]):n(p)}finally{Bi=M}}:f=Un,t&&s){const M=f,R=s===!0?1/0:s;f=()=>_i(M(),R)}const m=Vd(),d=()=>{u.stop(),m&&m.active&&Nl(m.effects,u)};if(r&&t){const M=t;t=(...R)=>{M(...R),d()}}let y=x?new Array(n.length).fill(Rr):Rr;const w=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const R=u.run();if(s||v||(x?R.some((D,C)=>xi(D,y[C])):xi(R,y))){h&&h();const D=Bi;Bi=u;try{const C=[R,y===Rr?void 0:x&&y[0]===Rr?[]:y,p];y=R,l?l(t,3,C):t(...C)}finally{Bi=D}}}else u.run()};return a&&a(w),u=new Pf(f),u.scheduler=o?()=>o(w,!1):w,p=M=>fp(M,!1,u),h=u.onStop=()=>{const M=ao.get(u);if(M){if(l)l(M,4);else for(const R of M)R();ao.delete(u)}},t?i?w(!0):y=u.run():o?o(w.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function _i(n,t=1/0,e){if(t<=0||!ve(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Be(n))_i(n.value,t,e);else if(Vt(n))for(let i=0;i<n.length;i++)_i(n[i],t,e);else if(Mf(n)||xs(n))n.forEach(i=>{_i(i,t,e)});else if(yf(n)){for(const i in n)_i(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&_i(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function xr(n,t,e,i){try{return i?n(...i):n()}catch(s){To(s,t,e)}}function Fn(n,t,e,i){if(qt(n)){const s=xr(n,t,e,i);return s&&Sf(s)&&s.catch(r=>{To(r,t,e)}),s}if(Vt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Fn(n[r],t,e,i));return s}}function To(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||ge;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){ei(),xr(r,null,10,[n,l,c]),ni();return}}dp(n,e,s,i,o)}function dp(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const je=[];let Cn=-1;const Ss=[];let di=null,ds=0;const jf=Promise.resolve();let lo=null;function Kf(n){const t=lo||jf;return n?t.then(this?n.bind(this):n):t}function pp(n){let t=Cn+1,e=je.length;for(;t<e;){const i=t+e>>>1,s=je[i],r=lr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function Xl(n){if(!(n.flags&1)){const t=lr(n),e=je[je.length-1];!e||!(n.flags&2)&&t>=lr(e)?je.push(n):je.splice(pp(t),0,n),n.flags|=1,Zf()}}function Zf(){lo||(lo=jf.then(Qf))}function mp(n){Vt(n)?Ss.push(...n):di&&n.id===-1?di.splice(ds+1,0,n):n.flags&1||(Ss.push(n),n.flags|=1),Zf()}function Tc(n,t,e=Cn+1){for(;e<je.length;e++){const i=je[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;je.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Jf(n){if(Ss.length){const t=[...new Set(Ss)].sort((e,i)=>lr(e)-lr(i));if(Ss.length=0,di){di.push(...t);return}for(di=t,ds=0;ds<di.length;ds++){const e=di[ds];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}di=null,ds=0}}const lr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Qf(n){try{for(Cn=0;Cn<je.length;Cn++){const t=je[Cn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),xr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Cn<je.length;Cn++){const t=je[Cn];t&&(t.flags&=-2)}Cn=-1,je.length=0,Jf(),lo=null,(je.length||Ss.length)&&Qf()}}let nn=null,th=null;function co(n){const t=nn;return nn=n,th=n&&n.type.__scopeId||null,t}function uo(n,t=nn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&po(-1);const r=co(t);let o;try{o=n(...s)}finally{co(r),i._d&&po(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Pi(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(ei(),Fn(l,e,8,[n.el,a,n,t]),ni())}}const gp=Symbol("_vte"),_p=n=>n.__isTeleport,vp=Symbol("_leaveCb");function ql(n,t){n.shapeFlag&6&&n.component?(n.transition=t,ql(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function eh(n,t){return qt(n)?Ve({name:n.name},t,{setup:n}):n}function nh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const fo=new WeakMap;function Js(n,t,e,i,s=!1){if(Vt(n)){n.forEach((v,x)=>Js(v,t&&(Vt(t)?t[x]:t),e,i,s));return}if(Es(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Js(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Kl(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===ge?a.refs={}:a.refs,f=a.setupState,h=ae(f),p=f===ge?xf:v=>le(h,v);if(c!=null&&c!==l){if(Ac(t),Re(c))u[c]=null,p(c)&&(f[c]=null);else if(Be(c)){c.value=null;const v=t;v.k&&(u[v.k]=null)}}if(qt(l))xr(l,a,12,[o,u]);else{const v=Re(l),x=Be(l);if(v||x){const m=()=>{if(n.f){const d=v?p(l)?f[l]:u[l]:l.value;if(s)Vt(d)&&Nl(d,r);else if(Vt(d))d.includes(r)||d.push(r);else if(v)u[l]=[r],p(l)&&(f[l]=u[l]);else{const y=[r];l.value=y,n.k&&(u[n.k]=y)}}else v?(u[l]=o,p(l)&&(f[l]=o)):x&&(l.value=o,n.k&&(u[n.k]=o))};if(o){const d=()=>{m(),fo.delete(n)};d.id=-1,fo.set(n,d),un(d,e)}else Ac(n),m()}}}function Ac(n){const t=fo.get(n);t&&(t.flags|=8,fo.delete(n))}Eo().requestIdleCallback;Eo().cancelIdleCallback;const Es=n=>!!n.type.__asyncLoader,ih=n=>n.type.__isKeepAlive;function xp(n,t){sh(n,"a",t)}function Mp(n,t){sh(n,"da",t)}function sh(n,t,e=Ke){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ao(t,i,e),e){let s=e.parent;for(;s&&s.parent;)ih(s.parent.vnode)&&Sp(i,t,e,s),s=s.parent}}function Sp(n,t,e,i){const s=Ao(t,n,i,!0);Mr(()=>{Nl(i[t],s)},e)}function Ao(n,t,e=Ke,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{ei();const a=Sr(e),l=Fn(t,e,n,o);return a(),ni(),l});return i?s.unshift(r):s.push(r),r}}const ri=n=>(t,e=Ke)=>{(!fr||n==="sp")&&Ao(n,(...i)=>t(...i),e)},Ep=ri("bm"),wo=ri("m"),yp=ri("bu"),bp=ri("u"),Tp=ri("bum"),Mr=ri("um"),Ap=ri("sp"),wp=ri("rtg"),Rp=ri("rtc");function Cp(n,t=Ke){Ao("ec",n,t)}const Pp=Symbol.for("v-ndc");function bi(n,t,e,i){let s;const r=e,o=Vt(n);if(o||Re(n)){const a=o&&Ms(n);let l=!1,c=!1;a&&(l=!vn(n),c=yi(n),n=yo(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?oo(Ue(n[u])):Ue(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ve(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}function wc(n,t,e={},i,s){if(nn.ce||nn.parent&&Es(nn.parent)&&nn.parent.ce){const c=Object.keys(e).length>0;return t!=="default"&&(e.name=t),Wt(),Ti(we,null,[ye("slot",e,i&&i())],c?-2:64)}let r=n[t];r&&r._c&&(r._d=!1),Wt();const o=r&&rh(r(e)),a=e.key||o&&o.key,l=Ti(we,{key:(a&&!si(a)?a:`_${t}`)+(!o&&i?"_fb":"")},o||(i?i():[]),o&&n._===1?64:-2);return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),r&&r._c&&(r._d=!0),l}function rh(n){return n.some(t=>ur(t)?!(t.type===ii||t.type===we&&!rh(t.children)):!0)?n:null}const Ua=n=>n?Ah(n)?Kl(n):Ua(n.parent):null,Qs=Ve(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ua(n.parent),$root:n=>Ua(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ah(n),$forceUpdate:n=>n.f||(n.f=()=>{Xl(n.update)}),$nextTick:n=>n.n||(n.n=Kf.bind(n.proxy)),$watch:n=>Zp.bind(n)}),Wo=(n,t)=>n!==ge&&!n.__isScriptSetup&&le(n,t),Dp={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(t[0]!=="$"){const p=o[t];if(p!==void 0)switch(p){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Wo(i,t))return o[t]=1,i[t];if(s!==ge&&le(s,t))return o[t]=2,s[t];if((c=n.propsOptions[0])&&le(c,t))return o[t]=3,r[t];if(e!==ge&&le(e,t))return o[t]=4,e[t];Na&&(o[t]=0)}}const u=Qs[t];let f,h;if(u)return t==="$attrs"&&Oe(n.attrs,"get",""),u(n);if((f=a.__cssModules)&&(f=f[t]))return f;if(e!==ge&&le(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,le(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Wo(s,t)?(s[t]=e,!0):i!==ge&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,propsOptions:r,type:o}},a){let l,c;return!!(e[a]||n!==ge&&a[0]!=="$"&&le(n,a)||Wo(t,a)||(l=r[0])&&le(l,a)||le(i,a)||le(Qs,a)||le(s.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Rc(n){return Vt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Na=!0;function Lp(n){const t=ah(n),e=n.proxy,i=n.ctx;Na=!1,t.beforeCreate&&Cc(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:p,updated:v,activated:x,deactivated:m,beforeDestroy:d,beforeUnmount:y,destroyed:w,unmounted:M,render:R,renderTracked:D,renderTriggered:C,errorCaptured:O,serverPrefetch:T,expose:b,inheritAttrs:I,components:G,directives:J,filters:at}=t;if(c&&Ip(c,i,null),o)for(const nt in o){const q=o[nt];qt(q)&&(i[nt]=q.bind(e))}if(s){const nt=s.call(e,e);ve(nt)&&(n.data=bo(nt))}if(Na=!0,r)for(const nt in r){const q=r[nt],vt=qt(q)?q.bind(e,e):qt(q.get)?q.get.bind(e,e):Un,xt=!qt(q)&&qt(q.set)?q.set.bind(e):Un,Pt=ce({get:vt,set:xt});Object.defineProperty(i,nt,{enumerable:!0,configurable:!0,get:()=>Pt.value,set:Nt=>Pt.value=Nt})}if(a)for(const nt in a)oh(a[nt],i,e,nt);if(l){const nt=qt(l)?l.call(e):l;Reflect.ownKeys(nt).forEach(q=>{Zr(q,nt[q])})}u&&Cc(u,n,"c");function et(nt,q){Vt(q)?q.forEach(vt=>nt(vt.bind(e))):q&&nt(q.bind(e))}if(et(Ep,f),et(wo,h),et(yp,p),et(bp,v),et(xp,x),et(Mp,m),et(Cp,O),et(Rp,D),et(wp,C),et(Tp,y),et(Mr,M),et(Ap,T),Vt(b))if(b.length){const nt=n.exposed||(n.exposed={});b.forEach(q=>{Object.defineProperty(nt,q,{get:()=>e[q],set:vt=>e[q]=vt,enumerable:!0})})}else n.exposed||(n.exposed={});R&&n.render===Un&&(n.render=R),I!=null&&(n.inheritAttrs=I),G&&(n.components=G),J&&(n.directives=J),T&&nh(n)}function Ip(n,t,e=Un){Vt(n)&&(n=Fa(n));for(const i in n){const s=n[i];let r;ve(s)?"default"in s?r=Qn(s.from||i,s.default,!0):r=Qn(s.from||i):r=Qn(s),Be(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Cc(n,t,e){Fn(Vt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function oh(n,t,e,i){let s=i.includes(".")?Mh(e,i):()=>e[i];if(Re(n)){const r=t[n];qt(r)&&tr(s,r)}else if(qt(n))tr(s,n.bind(e));else if(ve(n))if(Vt(n))n.forEach(r=>oh(r,t,e,i));else{const r=qt(n.handler)?n.handler.bind(e):t[n.handler];qt(r)&&tr(s,r,n)}}function ah(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>ho(l,c,o,!0)),ho(l,t,o)),ve(t)&&r.set(t,l),l}function ho(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&ho(n,r,e,!0),s&&s.forEach(o=>ho(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Up[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Up={data:Pc,props:Dc,emits:Dc,methods:qs,computed:qs,beforeCreate:We,created:We,beforeMount:We,mounted:We,beforeUpdate:We,updated:We,beforeDestroy:We,beforeUnmount:We,destroyed:We,unmounted:We,activated:We,deactivated:We,errorCaptured:We,serverPrefetch:We,components:qs,directives:qs,watch:Fp,provide:Pc,inject:Np};function Pc(n,t){return t?n?function(){return Ve(qt(n)?n.call(this,this):n,qt(t)?t.call(this,this):t)}:t:n}function Np(n,t){return qs(Fa(n),Fa(t))}function Fa(n){if(Vt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function We(n,t){return n?[...new Set([].concat(n,t))]:t}function qs(n,t){return n?Ve(Object.create(null),n,t):t}function Dc(n,t){return n?Vt(n)&&Vt(t)?[...new Set([...n,...t])]:Ve(Object.create(null),Rc(n),Rc(t??{})):t}function Fp(n,t){if(!n)return t;if(!t)return n;const e=Ve(Object.create(null),n);for(const i in t)e[i]=We(n[i],t[i]);return e}function lh(){return{app:null,config:{isNativeTag:xf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Op=0;function Bp(n,t){return function(i,s=null){qt(i)||(i=Ve({},i)),s!=null&&!ve(s)&&(s=null);const r=lh(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Op++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Mm,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&qt(u.install)?(o.add(u),u.install(c,...f)):qt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const p=c._ceVNode||ye(i,s);return p.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(p,u,h),l=!0,c._container=u,u.__vue_app__=c,Kl(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Fn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=ys;ys=c;try{return u()}finally{ys=f}}};return c}}let ys=null;function Zr(n,t){if(Ke){let e=Ke.provides;const i=Ke.parent&&Ke.parent.provides;i===e&&(e=Ke.provides=Object.create(i)),e[n]=t}}function Qn(n,t,e=!1){const i=pm();if(i||ys){let s=ys?ys._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&qt(t)?t.call(i&&i.proxy):t}}const ch={},uh=()=>Object.create(ch),fh=n=>Object.getPrototypeOf(n)===ch;function zp(n,t,e,i=!1){const s={},r=uh();n.propsDefaults=Object.create(null),hh(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Wf(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function kp(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Ro(n.emitsOptions,h))continue;const p=t[h];if(l)if(le(r,h))p!==r[h]&&(r[h]=p,c=!0);else{const v=Ei(h);s[v]=Oa(l,a,v,p,n,!1)}else p!==r[h]&&(r[h]=p,c=!0)}}}else{hh(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!le(t,f)&&((u=ji(f))===f||!le(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=Oa(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!le(t,f))&&(delete r[f],c=!0)}c&&Kn(n.attrs,"set","")}function hh(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(js(l))continue;const c=t[l];let u;s&&le(s,u=Ei(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Ro(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||ge;for(let u=0;u<r.length;u++){const f=r[u];e[f]=Oa(s,l,f,c[f],n,!le(c,f))}}return o}function Oa(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&qt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Sr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ji(e))&&(i=!0))}return i}const Hp=new WeakMap;function dh(n,t,e=!1){const i=e?Hp:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!qt(n)){const u=f=>{l=!0;const[h,p]=dh(f,t,!0);Ve(o,h),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ve(n)&&i.set(n,vs),vs;if(Vt(r))for(let u=0;u<r.length;u++){const f=Ei(r[u]);Lc(f)&&(o[f]=ge)}else if(r)for(const u in r){const f=Ei(u);if(Lc(f)){const h=r[u],p=o[f]=Vt(h)||qt(h)?{type:h}:Ve({},h),v=p.type;let x=!1,m=!0;if(Vt(v))for(let d=0;d<v.length;++d){const y=v[d],w=qt(y)&&y.name;if(w==="Boolean"){x=!0;break}else w==="String"&&(m=!1)}else x=qt(v)&&v.name==="Boolean";p[0]=x,p[1]=m,(x||le(p,"default"))&&a.push(f)}}const c=[o,a];return ve(n)&&i.set(n,c),c}function Lc(n){return n[0]!=="$"&&!js(n)}const Yl=n=>n==="_"||n==="_ctx"||n==="$stable",$l=n=>Vt(n)?n.map(Pn):[Pn(n)],Vp=(n,t,e)=>{if(t._n)return t;const i=uo((...s)=>$l(t(...s)),e);return i._c=!1,i},ph=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Yl(s))continue;const r=n[s];if(qt(r))t[s]=Vp(s,r,i);else if(r!=null){const o=$l(r);t[s]=()=>o}}},mh=(n,t)=>{const e=$l(t);n.slots.default=()=>e},gh=(n,t,e)=>{for(const i in t)(e||!Yl(i))&&(n[i]=t[i])},Gp=(n,t,e)=>{const i=n.slots=uh();if(n.vnode.shapeFlag&32){const s=t._;s?(gh(i,t,e),e&&Tf(i,"_",s,!0)):ph(t,i)}else t&&mh(n,t)},Wp=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=ge;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:gh(s,t,e):(r=!t.$stable,ph(t,s)),o=t}else t&&(mh(n,t),o={default:1});if(r)for(const a in s)!Yl(a)&&o[a]==null&&delete s[a]},un=rm;function Xp(n){return qp(n)}function qp(n,t){const e=Eo();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:p=Un,insertStaticContent:v}=n,x=(A,g,U,V=null,X=null,F=null,ht=void 0,K=null,ot=!!g.dynamicChildren)=>{if(A===g)return;A&&!ks(A,g)&&(V=L(A),Nt(A,X,F,!0),A=null),g.patchFlag===-2&&(ot=!1,g.dynamicChildren=null);const{type:lt,ref:Mt,shapeFlag:S}=g;switch(lt){case Co:m(A,g,U,V);break;case ii:d(A,g,U,V);break;case Jr:A==null&&y(g,U,V,ht);break;case we:G(A,g,U,V,X,F,ht,K,ot);break;default:S&1?R(A,g,U,V,X,F,ht,K,ot):S&6?J(A,g,U,V,X,F,ht,K,ot):(S&64||S&128)&&lt.process(A,g,U,V,X,F,ht,K,ot,j)}Mt!=null&&X?Js(Mt,A&&A.ref,F,g||A,!g):Mt==null&&A&&A.ref!=null&&Js(A.ref,null,F,A,!0)},m=(A,g,U,V)=>{if(A==null)i(g.el=a(g.children),U,V);else{const X=g.el=A.el;g.children!==A.children&&c(X,g.children)}},d=(A,g,U,V)=>{A==null?i(g.el=l(g.children||""),U,V):g.el=A.el},y=(A,g,U,V)=>{[A.el,A.anchor]=v(A.children,g,U,V,A.el,A.anchor)},w=({el:A,anchor:g},U,V)=>{let X;for(;A&&A!==g;)X=h(A),i(A,U,V),A=X;i(g,U,V)},M=({el:A,anchor:g})=>{let U;for(;A&&A!==g;)U=h(A),s(A),A=U;s(g)},R=(A,g,U,V,X,F,ht,K,ot)=>{g.type==="svg"?ht="svg":g.type==="math"&&(ht="mathml"),A==null?D(g,U,V,X,F,ht,K,ot):T(A,g,X,F,ht,K,ot)},D=(A,g,U,V,X,F,ht,K)=>{let ot,lt;const{props:Mt,shapeFlag:S,transition:_,dirs:N}=A;if(ot=A.el=o(A.type,F,Mt&&Mt.is,Mt),S&8?u(ot,A.children):S&16&&O(A.children,ot,null,V,X,Xo(A,F),ht,K),N&&Pi(A,null,V,"created"),C(ot,A,A.scopeId,ht,V),Mt){for(const it in Mt)it!=="value"&&!js(it)&&r(ot,it,null,Mt[it],F,V);"value"in Mt&&r(ot,"value",null,Mt.value,F),(lt=Mt.onVnodeBeforeMount)&&Rn(lt,V,A)}N&&Pi(A,null,V,"beforeMount");const $=Yp(X,_);$&&_.beforeEnter(ot),i(ot,g,U),((lt=Mt&&Mt.onVnodeMounted)||$||N)&&un(()=>{lt&&Rn(lt,V,A),$&&_.enter(ot),N&&Pi(A,null,V,"mounted")},X)},C=(A,g,U,V,X)=>{if(U&&p(A,U),V)for(let F=0;F<V.length;F++)p(A,V[F]);if(X){let F=X.subTree;if(g===F||Eh(F.type)&&(F.ssContent===g||F.ssFallback===g)){const ht=X.vnode;C(A,ht,ht.scopeId,ht.slotScopeIds,X.parent)}}},O=(A,g,U,V,X,F,ht,K,ot=0)=>{for(let lt=ot;lt<A.length;lt++){const Mt=A[lt]=K?pi(A[lt]):Pn(A[lt]);x(null,Mt,g,U,V,X,F,ht,K)}},T=(A,g,U,V,X,F,ht)=>{const K=g.el=A.el;let{patchFlag:ot,dynamicChildren:lt,dirs:Mt}=g;ot|=A.patchFlag&16;const S=A.props||ge,_=g.props||ge;let N;if(U&&Di(U,!1),(N=_.onVnodeBeforeUpdate)&&Rn(N,U,g,A),Mt&&Pi(g,A,U,"beforeUpdate"),U&&Di(U,!0),(S.innerHTML&&_.innerHTML==null||S.textContent&&_.textContent==null)&&u(K,""),lt?b(A.dynamicChildren,lt,K,U,V,Xo(g,X),F):ht||q(A,g,K,null,U,V,Xo(g,X),F,!1),ot>0){if(ot&16)I(K,S,_,U,X);else if(ot&2&&S.class!==_.class&&r(K,"class",null,_.class,X),ot&4&&r(K,"style",S.style,_.style,X),ot&8){const $=g.dynamicProps;for(let it=0;it<$.length;it++){const Y=$[it],bt=S[Y],pt=_[Y];(pt!==bt||Y==="value")&&r(K,Y,bt,pt,X,U)}}ot&1&&A.children!==g.children&&u(K,g.children)}else!ht&&lt==null&&I(K,S,_,U,X);((N=_.onVnodeUpdated)||Mt)&&un(()=>{N&&Rn(N,U,g,A),Mt&&Pi(g,A,U,"updated")},V)},b=(A,g,U,V,X,F,ht)=>{for(let K=0;K<g.length;K++){const ot=A[K],lt=g[K],Mt=ot.el&&(ot.type===we||!ks(ot,lt)||ot.shapeFlag&198)?f(ot.el):U;x(ot,lt,Mt,null,V,X,F,ht,!0)}},I=(A,g,U,V,X)=>{if(g!==U){if(g!==ge)for(const F in g)!js(F)&&!(F in U)&&r(A,F,g[F],null,X,V);for(const F in U){if(js(F))continue;const ht=U[F],K=g[F];ht!==K&&F!=="value"&&r(A,F,K,ht,X,V)}"value"in U&&r(A,"value",g.value,U.value,X)}},G=(A,g,U,V,X,F,ht,K,ot)=>{const lt=g.el=A?A.el:a(""),Mt=g.anchor=A?A.anchor:a("");let{patchFlag:S,dynamicChildren:_,slotScopeIds:N}=g;N&&(K=K?K.concat(N):N),A==null?(i(lt,U,V),i(Mt,U,V),O(g.children||[],U,Mt,X,F,ht,K,ot)):S>0&&S&64&&_&&A.dynamicChildren?(b(A.dynamicChildren,_,U,X,F,ht,K),(g.key!=null||X&&g===X.subTree)&&_h(A,g,!0)):q(A,g,U,Mt,X,F,ht,K,ot)},J=(A,g,U,V,X,F,ht,K,ot)=>{g.slotScopeIds=K,A==null?g.shapeFlag&512?X.ctx.activate(g,U,V,ht,ot):at(g,U,V,X,F,ht,ot):st(A,g,ot)},at=(A,g,U,V,X,F,ht)=>{const K=A.component=dm(A,V,X);if(ih(A)&&(K.ctx.renderer=j),mm(K,!1,ht),K.asyncDep){if(X&&X.registerDep(K,et,ht),!A.el){const ot=K.subTree=ye(ii);d(null,ot,g,U),A.placeholder=ot.el}}else et(K,A,g,U,X,F,ht)},st=(A,g,U)=>{const V=g.component=A.component;if(im(A,g,U))if(V.asyncDep&&!V.asyncResolved){nt(V,g,U);return}else V.next=g,V.update();else g.el=A.el,V.vnode=g},et=(A,g,U,V,X,F,ht)=>{const K=()=>{if(A.isMounted){let{next:S,bu:_,u:N,parent:$,vnode:it}=A;{const Rt=vh(A);if(Rt){S&&(S.el=it.el,nt(A,S,ht)),Rt.asyncDep.then(()=>{A.isUnmounted||K()});return}}let Y=S,bt;Di(A,!1),S?(S.el=it.el,nt(A,S,ht)):S=it,_&&zo(_),(bt=S.props&&S.props.onVnodeBeforeUpdate)&&Rn(bt,$,S,it),Di(A,!0);const pt=Uc(A),Tt=A.subTree;A.subTree=pt,x(Tt,pt,f(Tt.el),L(Tt),A,X,F),S.el=pt.el,Y===null&&sm(A,pt.el),N&&un(N,X),(bt=S.props&&S.props.onVnodeUpdated)&&un(()=>Rn(bt,$,S,it),X)}else{let S;const{el:_,props:N}=g,{bm:$,m:it,parent:Y,root:bt,type:pt}=A,Tt=Es(g);Di(A,!1),$&&zo($),!Tt&&(S=N&&N.onVnodeBeforeMount)&&Rn(S,Y,g),Di(A,!0);{bt.ce&&bt.ce._def.shadowRoot!==!1&&bt.ce._injectChildStyle(pt);const Rt=A.subTree=Uc(A);x(null,Rt,U,V,A,X,F),g.el=Rt.el}if(it&&un(it,X),!Tt&&(S=N&&N.onVnodeMounted)){const Rt=g;un(()=>Rn(S,Y,Rt),X)}(g.shapeFlag&256||Y&&Es(Y.vnode)&&Y.vnode.shapeFlag&256)&&A.a&&un(A.a,X),A.isMounted=!0,g=U=V=null}};A.scope.on();const ot=A.effect=new Pf(K);A.scope.off();const lt=A.update=ot.run.bind(ot),Mt=A.job=ot.runIfDirty.bind(ot);Mt.i=A,Mt.id=A.uid,ot.scheduler=()=>Xl(Mt),Di(A,!0),lt()},nt=(A,g,U)=>{g.component=A;const V=A.vnode.props;A.vnode=g,A.next=null,kp(A,g.props,V,U),Wp(A,g.children,U),ei(),Tc(A),ni()},q=(A,g,U,V,X,F,ht,K,ot=!1)=>{const lt=A&&A.children,Mt=A?A.shapeFlag:0,S=g.children,{patchFlag:_,shapeFlag:N}=g;if(_>0){if(_&128){xt(lt,S,U,V,X,F,ht,K,ot);return}else if(_&256){vt(lt,S,U,V,X,F,ht,K,ot);return}}N&8?(Mt&16&&rt(lt,X,F),S!==lt&&u(U,S)):Mt&16?N&16?xt(lt,S,U,V,X,F,ht,K,ot):rt(lt,X,F,!0):(Mt&8&&u(U,""),N&16&&O(S,U,V,X,F,ht,K,ot))},vt=(A,g,U,V,X,F,ht,K,ot)=>{A=A||vs,g=g||vs;const lt=A.length,Mt=g.length,S=Math.min(lt,Mt);let _;for(_=0;_<S;_++){const N=g[_]=ot?pi(g[_]):Pn(g[_]);x(A[_],N,U,null,X,F,ht,K,ot)}lt>Mt?rt(A,X,F,!0,!1,S):O(g,U,V,X,F,ht,K,ot,S)},xt=(A,g,U,V,X,F,ht,K,ot)=>{let lt=0;const Mt=g.length;let S=A.length-1,_=Mt-1;for(;lt<=S&&lt<=_;){const N=A[lt],$=g[lt]=ot?pi(g[lt]):Pn(g[lt]);if(ks(N,$))x(N,$,U,null,X,F,ht,K,ot);else break;lt++}for(;lt<=S&&lt<=_;){const N=A[S],$=g[_]=ot?pi(g[_]):Pn(g[_]);if(ks(N,$))x(N,$,U,null,X,F,ht,K,ot);else break;S--,_--}if(lt>S){if(lt<=_){const N=_+1,$=N<Mt?g[N].el:V;for(;lt<=_;)x(null,g[lt]=ot?pi(g[lt]):Pn(g[lt]),U,$,X,F,ht,K,ot),lt++}}else if(lt>_)for(;lt<=S;)Nt(A[lt],X,F,!0),lt++;else{const N=lt,$=lt,it=new Map;for(lt=$;lt<=_;lt++){const Dt=g[lt]=ot?pi(g[lt]):Pn(g[lt]);Dt.key!=null&&it.set(Dt.key,lt)}let Y,bt=0;const pt=_-$+1;let Tt=!1,Rt=0;const mt=new Array(pt);for(lt=0;lt<pt;lt++)mt[lt]=0;for(lt=N;lt<=S;lt++){const Dt=A[lt];if(bt>=pt){Nt(Dt,X,F,!0);continue}let Ct;if(Dt.key!=null)Ct=it.get(Dt.key);else for(Y=$;Y<=_;Y++)if(mt[Y-$]===0&&ks(Dt,g[Y])){Ct=Y;break}Ct===void 0?Nt(Dt,X,F,!0):(mt[Ct-$]=lt+1,Ct>=Rt?Rt=Ct:Tt=!0,x(Dt,g[Ct],U,null,X,F,ht,K,ot),bt++)}const St=Tt?$p(mt):vs;for(Y=St.length-1,lt=pt-1;lt>=0;lt--){const Dt=$+lt,Ct=g[Dt],Et=g[Dt+1],kt=Dt+1<Mt?Et.el||Et.placeholder:V;mt[lt]===0?x(null,Ct,U,kt,X,F,ht,K,ot):Tt&&(Y<0||lt!==St[Y]?Pt(Ct,U,kt,2):Y--)}}},Pt=(A,g,U,V,X=null)=>{const{el:F,type:ht,transition:K,children:ot,shapeFlag:lt}=A;if(lt&6){Pt(A.component.subTree,g,U,V);return}if(lt&128){A.suspense.move(g,U,V);return}if(lt&64){ht.move(A,g,U,j);return}if(ht===we){i(F,g,U);for(let S=0;S<ot.length;S++)Pt(ot[S],g,U,V);i(A.anchor,g,U);return}if(ht===Jr){w(A,g,U);return}if(V!==2&&lt&1&&K)if(V===0)K.beforeEnter(F),i(F,g,U),un(()=>K.enter(F),X);else{const{leave:S,delayLeave:_,afterLeave:N}=K,$=()=>{A.ctx.isUnmounted?s(F):i(F,g,U)},it=()=>{F._isLeaving&&F[vp](!0),S(F,()=>{$(),N&&N()})};_?_(F,$,it):it()}else i(F,g,U)},Nt=(A,g,U,V=!1,X=!1)=>{const{type:F,props:ht,ref:K,children:ot,dynamicChildren:lt,shapeFlag:Mt,patchFlag:S,dirs:_,cacheIndex:N}=A;if(S===-2&&(X=!1),K!=null&&(ei(),Js(K,null,U,A,!0),ni()),N!=null&&(g.renderCache[N]=void 0),Mt&256){g.ctx.deactivate(A);return}const $=Mt&1&&_,it=!Es(A);let Y;if(it&&(Y=ht&&ht.onVnodeBeforeUnmount)&&Rn(Y,g,A),Mt&6)Yt(A.component,U,V);else{if(Mt&128){A.suspense.unmount(U,V);return}$&&Pi(A,null,g,"beforeUnmount"),Mt&64?A.type.remove(A,g,U,j,V):lt&&!lt.hasOnce&&(F!==we||S>0&&S&64)?rt(lt,g,U,!1,!0):(F===we&&S&384||!X&&Mt&16)&&rt(ot,g,U),V&&Qt(A)}(it&&(Y=ht&&ht.onVnodeUnmounted)||$)&&un(()=>{Y&&Rn(Y,g,A),$&&Pi(A,null,g,"unmounted")},U)},Qt=A=>{const{type:g,el:U,anchor:V,transition:X}=A;if(g===we){ee(U,V);return}if(g===Jr){M(A);return}const F=()=>{s(U),X&&!X.persisted&&X.afterLeave&&X.afterLeave()};if(A.shapeFlag&1&&X&&!X.persisted){const{leave:ht,delayLeave:K}=X,ot=()=>ht(U,F);K?K(A.el,F,ot):ot()}else F()},ee=(A,g)=>{let U;for(;A!==g;)U=h(A),s(A),A=U;s(g)},Yt=(A,g,U)=>{const{bum:V,scope:X,job:F,subTree:ht,um:K,m:ot,a:lt}=A;Ic(ot),Ic(lt),V&&zo(V),X.stop(),F&&(F.flags|=8,Nt(ht,A,g,U)),K&&un(K,g),un(()=>{A.isUnmounted=!0},g)},rt=(A,g,U,V=!1,X=!1,F=0)=>{for(let ht=F;ht<A.length;ht++)Nt(A[ht],g,U,V,X)},L=A=>{if(A.shapeFlag&6)return L(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const g=h(A.anchor||A.el),U=g&&g[gp];return U?h(U):g};let B=!1;const k=(A,g,U)=>{A==null?g._vnode&&Nt(g._vnode,null,null,!0):x(g._vnode||null,A,g,null,null,null,U),g._vnode=A,B||(B=!0,Tc(),Jf(),B=!1)},j={p:x,um:Nt,m:Pt,r:Qt,mt:at,mc:O,pc:q,pbc:b,n:L,o:n};return{render:k,hydrate:void 0,createApp:Bp(k)}}function Xo({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Di({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Yp(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function _h(n,t,e=!1){const i=n.children,s=t.children;if(Vt(i)&&Vt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=pi(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&_h(o,a)),a.type===Co&&a.patchFlag!==-1&&(a.el=o.el),a.type===ii&&!a.el&&(a.el=o.el)}}function $p(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function vh(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:vh(t)}function Ic(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}const jp=Symbol.for("v-scx"),Kp=()=>Qn(jp);function tr(n,t,e){return xh(n,t,e)}function xh(n,t,e=ge){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ve({},e),l=t&&i||!t&&r!=="post";let c;if(fr){if(r==="sync"){const p=Kp();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Un,p.resume=Un,p.pause=Un,p}}const u=Ke;a.call=(p,v,x)=>Fn(p,u,v,x);let f=!1;r==="post"?a.scheduler=p=>{un(p,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(p,v)=>{v?p():Xl(p)}),a.augmentJob=p=>{t&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const h=hp(n,t,a);return fr&&(c?c.push(h):l&&h()),h}function Zp(n,t,e){const i=this.proxy,s=Re(n)?n.includes(".")?Mh(i,n):()=>i[n]:n.bind(i,i);let r;qt(t)?r=t:(r=t.handler,e=t);const o=Sr(this),a=xh(s,r.bind(i),e);return o(),a}function Mh(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const Jp=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ei(t)}Modifiers`]||n[`${ji(t)}Modifiers`];function Qp(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ge;let s=e;const r=t.startsWith("update:"),o=r&&Jp(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Re(u)?u.trim():u)),o.number&&(s=e.map(Ud)));let a,l=i[a=Bo(t)]||i[a=Bo(Ei(t))];!l&&r&&(l=i[a=Bo(ji(t))]),l&&Fn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Fn(c,n,6,s)}}const tm=new WeakMap;function Sh(n,t,e=!1){const i=e?tm:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!qt(n)){const l=c=>{const u=Sh(c,t,!0);u&&(a=!0,Ve(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ve(n)&&i.set(n,null),null):(Vt(r)?r.forEach(l=>o[l]=null):Ve(o,r),ve(n)&&i.set(n,o),o)}function Ro(n,t){return!n||!xo(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,ji(t))||le(n,t))}function Uc(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:p,ctx:v,inheritAttrs:x}=n,m=co(n);let d,y;try{if(e.shapeFlag&4){const M=s||i,R=M;d=Pn(c.call(R,M,u,f,p,h,v)),y=a}else{const M=t;d=Pn(M.length>1?M(f,{attrs:a,slots:o,emit:l}):M(f,null)),y=t.props?a:em(a)}}catch(M){er.length=0,To(M,n,1),d=ye(ii)}let w=d;if(y&&x!==!1){const M=Object.keys(y),{shapeFlag:R}=w;M.length&&R&7&&(r&&M.some(Ul)&&(y=nm(y,r)),w=ws(w,y,!1,!0))}return e.dirs&&(w=ws(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(e.dirs):e.dirs),e.transition&&ql(w,e.transition),d=w,co(m),d}const em=n=>{let t;for(const e in n)(e==="class"||e==="style"||xo(e))&&((t||(t={}))[e]=n[e]);return t},nm=(n,t)=>{const e={};for(const i in n)(!Ul(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function im(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?Nc(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!Ro(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Nc(i,o,c):!0:!!o;return!1}function Nc(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(t[r]!==n[r]&&!Ro(e,r))return!0}return!1}function sm({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const Eh=n=>n.__isSuspense;function rm(n,t){t&&t.pendingBranch?Vt(n)?t.effects.push(...n):t.effects.push(n):mp(n)}const we=Symbol.for("v-fgt"),Co=Symbol.for("v-txt"),ii=Symbol.for("v-cmt"),Jr=Symbol.for("v-stc"),er=[];let fn=null;function Wt(n=!1){er.push(fn=n?null:[])}function om(){er.pop(),fn=er[er.length-1]||null}let cr=1;function po(n,t=!1){cr+=n,n<0&&fn&&t&&(fn.hasOnce=!0)}function yh(n){return n.dynamicChildren=cr>0?fn||vs:null,om(),cr>0&&fn&&fn.push(n),n}function te(n,t,e,i,s,r){return yh(Z(n,t,e,i,s,r,!0))}function Ti(n,t,e,i,s){return yh(ye(n,t,e,i,s,!0))}function ur(n){return n?n.__v_isVNode===!0:!1}function ks(n,t){return n.type===t.type&&n.key===t.key}const bh=({key:n})=>n??null,Qr=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Re(n)||Be(n)||qt(n)?{i:nn,r:n,k:t,f:!!e}:n:null);function Z(n,t=null,e=null,i=0,s=null,r=n===we?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&bh(t),ref:t&&Qr(t),scopeId:th,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:nn};return a?(jl(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Re(e)?8:16),cr>0&&!o&&fn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&fn.push(l),l}const ye=am;function am(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Pp)&&(n=ii),ur(n)){const a=ws(n,t,!0);return e&&jl(a,e),cr>0&&!r&&fn&&(a.shapeFlag&6?fn[fn.indexOf(n)]=a:fn.push(a)),a.patchFlag=-2,a}if(xm(n)&&(n=n.__vccOpts),t){t=lm(t);let{class:a,style:l}=t;a&&!Re(a)&&(t.class=en(a)),ve(l)&&(Wl(l)&&!Vt(l)&&(l=Ve({},l)),t.style=Ol(l))}const o=Re(n)?1:Eh(n)?128:_p(n)?64:ve(n)?4:qt(n)?2:0;return Z(n,t,e,i,s,o,r,!0)}function lm(n){return n?Wl(n)||fh(n)?Ve({},n):n:null}function ws(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?um(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&bh(c),ref:t&&t.ref?e&&r?Vt(r)?r.concat(Qr(t)):[r,Qr(t)]:Qr(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==we?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ws(n.ssContent),ssFallback:n.ssFallback&&ws(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&ql(u,l.clone(u)),u}function Th(n=" ",t=0){return ye(Co,null,n,t)}function cm(n,t){const e=ye(Jr,null,n);return e.staticCount=t,e}function Po(n="",t=!1){return t?(Wt(),Ti(ii,null,n)):ye(ii,null,n)}function Pn(n){return n==null||typeof n=="boolean"?ye(ii):Vt(n)?ye(we,null,n.slice()):ur(n)?pi(n):ye(Co,null,String(n))}function pi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ws(n)}function jl(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Vt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),jl(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!fh(t)?t._ctx=nn:s===3&&nn&&(nn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else qt(t)?(t={default:t,_ctx:nn},e=32):(t=String(t),i&64?(e=16,t=[Th(t)]):e=8);n.children=t,n.shapeFlag|=e}function um(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=en([t.class,i.class]));else if(s==="style")t.style=Ol([t.style,i.style]);else if(xo(s)){const r=t[s],o=i[s];o&&r!==o&&!(Vt(r)&&r.includes(o))&&(t[s]=r?[].concat(r,o):o)}else s!==""&&(t[s]=i[s])}return t}function Rn(n,t,e,i=null){Fn(n,t,7,[e,i])}const fm=lh();let hm=0;function dm(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||fm,r={uid:hm++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Cf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:dh(i,s),emitsOptions:Sh(i,s),emit:null,emitted:null,propsDefaults:ge,inheritAttrs:i.inheritAttrs,ctx:ge,data:ge,props:ge,attrs:ge,slots:ge,refs:ge,setupState:ge,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Qp.bind(null,r),n.ce&&n.ce(r),r}let Ke=null;const pm=()=>Ke||nn;let mo,Ba;{const n=Eo(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};mo=t("__VUE_INSTANCE_SETTERS__",e=>Ke=e),Ba=t("__VUE_SSR_SETTERS__",e=>fr=e)}const Sr=n=>{const t=Ke;return mo(n),n.scope.on(),()=>{n.scope.off(),mo(t)}},Fc=()=>{Ke&&Ke.scope.off(),mo(null)};function Ah(n){return n.vnode.shapeFlag&4}let fr=!1;function mm(n,t=!1,e=!1){t&&Ba(t);const{props:i,children:s}=n.vnode,r=Ah(n);zp(n,i,r,t),Gp(n,s,e||t);const o=r?gm(n,t):void 0;return t&&Ba(!1),o}function gm(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Dp);const{setup:i}=e;if(i){ei();const s=n.setupContext=i.length>1?vm(n):null,r=Sr(n),o=xr(i,n,0,[n.props,s]),a=Sf(o);if(ni(),r(),(a||n.sp)&&!Es(n)&&nh(n),a){if(o.then(Fc,Fc),t)return o.then(l=>{Oc(n,l)}).catch(l=>{To(l,n,0)});n.asyncDep=o}else Oc(n,o)}else wh(n)}function Oc(n,t,e){qt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ve(t)&&(n.setupState=$f(t)),wh(n)}function wh(n,t,e){const i=n.type;n.render||(n.render=i.render||Un);{const s=Sr(n);ei();try{Lp(n)}finally{ni(),s()}}}const _m={get(n,t){return Oe(n,"get",""),n[t]}};function vm(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,_m),slots:n.slots,emit:n.emit,expose:t}}function Kl(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy($f(Xf(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Qs)return Qs[e](n)},has(t,e){return e in t||e in Qs}})):n.proxy}function xm(n){return qt(n)&&"__vccOpts"in n}const ce=(n,t)=>up(n,t,fr);function Rh(n,t,e){try{po(-1);const i=arguments.length;return i===2?ve(t)&&!Vt(t)?ur(t)?ye(n,null,[t]):ye(n,t):ye(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&ur(e)&&(e=[e]),ye(n,t,e))}finally{po(1)}}const Mm="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let za;const Bc=typeof window<"u"&&window.trustedTypes;if(Bc)try{za=Bc.createPolicy("vue",{createHTML:n=>n})}catch{}const Ch=za?n=>za.createHTML(n):n=>n,Sm="http://www.w3.org/2000/svg",Em="http://www.w3.org/1998/Math/MathML",jn=typeof document<"u"?document:null,zc=jn&&jn.createElement("template"),ym={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?jn.createElementNS(Sm,n):t==="mathml"?jn.createElementNS(Em,n):e?jn.createElement(n,{is:e}):jn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>jn.createTextNode(n),createComment:n=>jn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>jn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{zc.innerHTML=Ch(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=zc.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},bm=Symbol("_vtc");function Tm(n,t,e){const i=n[bm];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const kc=Symbol("_vod"),Am=Symbol("_vsh"),wm=Symbol(""),Rm=/(?:^|;)\s*display\s*:/;function Cm(n,t,e){const i=n.style,s=Re(e);let r=!1;if(e&&!s){if(t)if(Re(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&to(i,a,"")}else for(const o in t)e[o]==null&&to(i,o,"");for(const o in e)o==="display"&&(r=!0),to(i,o,e[o])}else if(s){if(t!==e){const o=i[wm];o&&(e+=";"+o),i.cssText=e,r=Rm.test(e)}}else t&&n.removeAttribute("style");kc in n&&(n[kc]=r?i.display:"",n[Am]&&(i.display="none"))}const Hc=/\s*!important$/;function to(n,t,e){if(Vt(e))e.forEach(i=>to(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Pm(n,t);Hc.test(e)?n.setProperty(ji(i),e.replace(Hc,""),"important"):n[i]=e}}const Vc=["Webkit","Moz","ms"],qo={};function Pm(n,t){const e=qo[t];if(e)return e;let i=Ei(t);if(i!=="filter"&&i in n)return qo[t]=i;i=bf(i);for(let s=0;s<Vc.length;s++){const r=Vc[s]+i;if(r in n)return qo[t]=r}return t}const Gc="http://www.w3.org/1999/xlink";function Wc(n,t,e,i,s,r=kd(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Gc,t.slice(6,t.length)):n.setAttributeNS(Gc,t,e):e==null||r&&!Af(e)?n.removeAttribute(t):n.setAttribute(t,r?"":si(e)?String(e):e)}function Xc(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?Ch(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=Af(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Dm(n,t,e,i){n.addEventListener(t,e,i)}function Lm(n,t,e,i){n.removeEventListener(t,e,i)}const qc=Symbol("_vei");function Im(n,t,e,i,s=null){const r=n[qc]||(n[qc]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Um(t);if(i){const c=r[t]=Om(i,s);Dm(n,a,c,l)}else o&&(Lm(n,a,o,l),r[t]=void 0)}}const Yc=/(?:Once|Passive|Capture)$/;function Um(n){let t;if(Yc.test(n)){t={};let i;for(;i=n.match(Yc);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ji(n.slice(2)),t]}let Yo=0;const Nm=Promise.resolve(),Fm=()=>Yo||(Nm.then(()=>Yo=0),Yo=Date.now());function Om(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Fn(Bm(i,e.value),t,5,[i])};return e.value=n,e.attached=Fm(),e}function Bm(n,t){if(Vt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const $c=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,zm=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Tm(n,i,o):t==="style"?Cm(n,e,i):xo(t)?Ul(t)||Im(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):km(n,t,i,o))?(Xc(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Wc(n,t,i,o,r,t!=="value")):n._isVueCE&&(/[A-Z]/.test(t)||!Re(i))?Xc(n,Ei(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Wc(n,t,i,o))};function km(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&$c(t)&&qt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return $c(t)&&Re(e)?!1:t in n}const Hm=Ve({patchProp:zm},ym);let jc;function Vm(){return jc||(jc=Xp(Hm))}const Gm=((...n)=>{const t=Vm().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=Xm(i);if(!s)return;const r=t._component;!qt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,Wm(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function Wm(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Xm(n){return Re(n)?document.querySelector(n):n}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const qm=Symbol();var Kc;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(Kc||(Kc={}));function Ym(){const n=Hd(!0),t=n.run(()=>ze({}));let e=[],i=[];const s=Xf({install(r){s._a=r,r.provide(qm,s),r.config.globalProperties.$pinia=s,i.forEach(o=>e.push(o)),i=[]},use(r){return this._a?e.push(r):i.push(r),this},_p:e,_a:null,_e:n,_s:new Map,state:t});return s}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ps=typeof document<"u";function Ph(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function $m(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Ph(n.default)}const oe=Object.assign;function $o(n,t){const e={};for(const i in t){const s=t[i];e[i]=An(s)?s.map(n):n(s)}return e}const nr=()=>{},An=Array.isArray;function Zc(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const Dh=/#/g,jm=/&/g,Km=/\//g,Zm=/=/g,Jm=/\?/g,Lh=/\+/g,Qm=/%5B/g,tg=/%5D/g,Ih=/%5E/g,eg=/%60/g,Uh=/%7B/g,ng=/%7C/g,Nh=/%7D/g,ig=/%20/g;function Zl(n){return n==null?"":encodeURI(""+n).replace(ng,"|").replace(Qm,"[").replace(tg,"]")}function sg(n){return Zl(n).replace(Uh,"{").replace(Nh,"}").replace(Ih,"^")}function ka(n){return Zl(n).replace(Lh,"%2B").replace(ig,"+").replace(Dh,"%23").replace(jm,"%26").replace(eg,"`").replace(Uh,"{").replace(Nh,"}").replace(Ih,"^")}function rg(n){return ka(n).replace(Zm,"%3D")}function og(n){return Zl(n).replace(Dh,"%23").replace(Jm,"%3F")}function ag(n){return og(n).replace(Km,"%2F")}function hr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const lg=/\/$/,cg=n=>n.replace(lg,"");function jo(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=dg(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:hr(o)}}function ug(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Jc(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function fg(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&Rs(t.matched[i],e.matched[s])&&Fh(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function Rs(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Fh(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(const e in n)if(!hg(n[e],t[e]))return!1;return!0}function hg(n,t){return An(n)?Qc(n,t):An(t)?Qc(t,n):n===t}function Qc(n,t){return An(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function dg(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const oi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Ha=(function(n){return n.pop="pop",n.push="push",n})({}),Ko=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function pg(n){if(!n)if(ps){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),cg(n)}const mg=/^[^#]+#/;function gg(n,t){return n.replace(mg,"#")+t}function _g(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const Do=()=>({left:window.scrollX,top:window.scrollY});function vg(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=_g(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function tu(n,t){return(history.state?history.state.position-t:-1)+n}const Va=new Map;function xg(n,t){Va.set(n,t)}function Mg(n){const t=Va.get(n);return Va.delete(n),t}function Sg(n){return typeof n=="string"||n&&typeof n=="object"}function Oh(n){return typeof n=="string"||typeof n=="symbol"}let Ee=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Bh=Symbol("");Ee.MATCHER_NOT_FOUND+"",Ee.NAVIGATION_GUARD_REDIRECT+"",Ee.NAVIGATION_ABORTED+"",Ee.NAVIGATION_CANCELLED+"",Ee.NAVIGATION_DUPLICATED+"";function Cs(n,t){return oe(new Error,{type:n,[Bh]:!0},t)}function Vn(n,t){return n instanceof Error&&Bh in n&&(t==null||!!(n.type&t))}const Eg=["params","query","hash"];function yg(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of Eg)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function bg(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Lh," "),r=s.indexOf("="),o=hr(r<0?s:s.slice(0,r)),a=r<0?null:hr(s.slice(r+1));if(o in t){let l=t[o];An(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function eu(n){let t="";for(let e in n){const i=n[e];if(e=rg(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(An(i)?i.map(s=>s&&ka(s)):[i&&ka(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function Tg(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=An(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const Ag=Symbol(""),nu=Symbol(""),Jl=Symbol(""),zh=Symbol(""),Ga=Symbol("");function Hs(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function mi(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(Cs(Ee.NAVIGATION_ABORTED,{from:e,to:t})):h instanceof Error?l(h):Sg(h)?l(Cs(Ee.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&i.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function Zo(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Ph(l)){const c=(l.__vccOpts||l)[t];c&&r.push(mi(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=$m(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&mi(h,e,i,o,a,s)()}))}}return r}function wg(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>Rs(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>Rs(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Rg=()=>location.protocol+"//"+location.host;function kh(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Jc(a,"")}return Jc(e,n)+i+s}function Cg(n,t,e,i){let s=[],r=[],o=null;const a=({state:h})=>{const p=kh(n,location),v=e.value,x=t.value;let m=0;if(h){if(e.value=p,t.value=h,o&&o===v){o=null;return}m=x?h.position-x.position:0}else i(p);s.forEach(d=>{d(e.value,v,{delta:m,type:Ha.pop,direction:m?m>0?Ko.forward:Ko.back:Ko.unknown})})};function l(){o=e.value}function c(h){s.push(h);const p=()=>{const v=s.indexOf(h);v>-1&&s.splice(v,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(oe({},h.state,{scroll:Do()}),"")}}function f(){for(const h of r)h();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function iu(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?Do():null}}function Pg(n){const{history:t,location:e}=window,i={value:kh(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),h=f>-1?(e.host&&document.querySelector("base")?n:n.slice(f))+l:Rg()+n+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(p){console.error(p),e[u?"replace":"assign"](h)}}function o(l,c){r(l,oe({},t.state,iu(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:Do()});r(u.current,u,!0),r(l,oe({},iu(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function Dg(n){n=pg(n);const t=Pg(n),e=Cg(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:gg.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}let Vi=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Pe=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Pe||{});const Lg={type:Vi.Static,value:""},Ig=/[a-zA-Z0-9_]/;function Ug(n){if(!n)return[[]];if(n==="/")return[[Lg]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(p){throw new Error(`ERR (${e})/"${c}": ${p}`)}let e=Pe.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(e===Pe.Static?r.push({type:Vi.Static,value:c}):e===Pe.Param||e===Pe.ParamRegExp||e===Pe.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Vi.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Pe.ParamRegExp){i=e,e=Pe.EscapeNext;continue}switch(e){case Pe.Static:l==="/"?(c&&f(),o()):l===":"?(f(),e=Pe.Param):h();break;case Pe.EscapeNext:h(),e=i;break;case Pe.Param:l==="("?e=Pe.ParamRegExp:Ig.test(l)?h():(f(),e=Pe.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Pe.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Pe.ParamRegExpEnd:u+=l;break;case Pe.ParamRegExpEnd:f(),e=Pe.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Pe.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}const su="[^/]+?",Ng={sensitive:!1,strict:!1,start:!0,end:!0};var $e=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})($e||{});const Fg=/[.+*?^${}()[\]/\\]/g;function Og(n,t){const e=oe({},Ng,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[$e.Root];e.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const h=c[f];let p=$e.Segment+(e.sensitive?$e.BonusCaseSensitive:0);if(h.type===Vi.Static)f||(s+="/"),s+=h.value.replace(Fg,"\\$&"),p+=$e.Static;else if(h.type===Vi.Param){const{value:v,repeatable:x,optional:m,regexp:d}=h;r.push({name:v,repeatable:x,optional:m});const y=d||su;if(y!==su){p+=$e.BonusCustomRegExp;try{`${y}`}catch(M){throw new Error(`Invalid custom RegExp for param "${v}" (${y}): `+M.message)}}let w=x?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;f||(w=m&&c.length<2?`(?:/${w})`:"/"+w),m&&(w+="?"),s+=w,p+=$e.Dynamic,m&&(p+=$e.BonusOptional),x&&(p+=$e.BonusRepeatable),y===".*"&&(p+=$e.BonusWildcard)}u.push(p)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=$e.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const p=u[h]||"",v=r[h-1];f[v.name]=p&&v.repeatable?p.split("/"):p}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const p of h)if(p.type===Vi.Static)u+=p.value;else if(p.type===Vi.Param){const{value:v,repeatable:x,optional:m}=p,d=v in c?c[v]:"";if(An(d)&&!x)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const y=An(d)?d.join("/"):d;if(!y)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${v}"`);u+=y}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function Bg(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===$e.Static+$e.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===$e.Static+$e.Segment?1:-1:0}function Hh(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=Bg(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(ru(i))return 1;if(ru(s))return-1}return s.length-i.length}function ru(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const zg={strict:!1,end:!0,sensitive:!1};function kg(n,t,e){const i=Og(Ug(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function Hg(n,t){const e=[],i=new Map;t=Zc(zg,t);function s(f){return i.get(f)}function r(f,h,p){const v=!p,x=au(f);x.aliasOf=p&&p.record;const m=Zc(t,f),d=[x];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const R of M)d.push(au(oe({},x,{components:p?p.record.components:x.components,path:R,aliasOf:p?p.record:x})))}let y,w;for(const M of d){const{path:R}=M;if(h&&R[0]!=="/"){const D=h.record.path,C=D[D.length-1]==="/"?"":"/";M.path=h.record.path+(R&&C+R)}if(y=kg(M,h,m),p?p.alias.push(y):(w=w||y,w!==y&&w.alias.push(y),v&&f.name&&!lu(y)&&o(f.name)),Vh(y)&&l(y),x.children){const D=x.children;for(let C=0;C<D.length;C++)r(D[C],y,p&&p.children[C])}p=p||y}return w?()=>{o(w)}:nr}function o(f){if(Oh(f)){const h=i.get(f);h&&(i.delete(f),e.splice(e.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=e.indexOf(f);h>-1&&(e.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return e}function l(f){const h=Wg(f,e);e.splice(h,0,f),f.record.name&&!lu(f)&&i.set(f.record.name,f)}function c(f,h){let p,v={},x,m;if("name"in f&&f.name){if(p=i.get(f.name),!p)throw Cs(Ee.MATCHER_NOT_FOUND,{location:f});m=p.record.name,v=oe(ou(h.params,p.keys.filter(w=>!w.optional).concat(p.parent?p.parent.keys.filter(w=>w.optional):[]).map(w=>w.name)),f.params&&ou(f.params,p.keys.map(w=>w.name))),x=p.stringify(v)}else if(f.path!=null)x=f.path,p=e.find(w=>w.re.test(x)),p&&(v=p.parse(x),m=p.record.name);else{if(p=h.name?i.get(h.name):e.find(w=>w.re.test(h.path)),!p)throw Cs(Ee.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=p.record.name,v=oe({},h.params,f.params),x=p.stringify(v)}const d=[];let y=p;for(;y;)d.unshift(y.record),y=y.parent;return{name:m,path:x,params:v,matched:d,meta:Gg(d)}}n.forEach(f=>r(f));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function ou(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function au(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Vg(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Vg(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function lu(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Gg(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function Wg(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Hh(n,t[r])<0?i=r:e=r+1}const s=Xg(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function Xg(n){let t=n;for(;t=t.parent;)if(Vh(t)&&Hh(n,t)===0)return t}function Vh({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function cu(n){const t=Qn(Jl),e=Qn(zh),i=ce(()=>{const l=tn(n.to);return t.resolve(l)}),s=ce(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=e.matched;if(!u||!f.length)return-1;const h=f.findIndex(Rs.bind(null,u));if(h>-1)return h;const p=uu(l[c-2]);return c>1&&uu(u)===p&&f[f.length-1].path!==p?f.findIndex(Rs.bind(null,l[c-2])):h}),r=ce(()=>s.value>-1&&Kg(e.params,i.value.params)),o=ce(()=>s.value>-1&&s.value===e.matched.length-1&&Fh(e.params,i.value.params));function a(l={}){if(jg(l)){const c=t[tn(n.replace)?"replace":"push"](tn(n.to)).catch(nr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:ce(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function qg(n){return n.length===1?n[0]:n}const Yg=eh({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:cu,setup(n,{slots:t}){const e=bo(cu(n)),{options:i}=Qn(Jl),s=ce(()=>({[fu(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[fu(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&qg(t.default(e));return n.custom?r:Rh("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),$g=Yg;function jg(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function Kg(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!An(s)||s.length!==i.length||i.some((r,o)=>r!==s[o]))return!1}return!0}function uu(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const fu=(n,t,e)=>n??t??e,Zg=eh({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=Qn(Ga),s=ce(()=>n.route||i.value),r=Qn(nu,0),o=ce(()=>{let c=tn(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=ce(()=>s.value.matched[o.value]);Zr(nu,ce(()=>o.value+1)),Zr(Ag,a),Zr(Ga,s);const l=ze();return tr(()=>[l.value,a.value,n.name],([c,u,f],[h,p,v])=>{u&&(u.instances[f]=c,p&&p!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Rs(u,p)||!h)&&(u.enterCallbacks[f]||[]).forEach(x=>x(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return hu(e.default,{Component:h,route:c});const p=f.props[u],v=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=Rh(h,oe({},v,t,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return hu(e.default,{Component:m,route:c})||m}}});function hu(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const Gh=Zg;function Jg(n){const t=Hg(n.routes,n),e=n.parseQuery||bg,i=n.stringifyQuery||eu,s=n.history,r=Hs(),o=Hs(),a=Hs(),l=qf(oi);let c=oi;ps&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=$o.bind(null,L=>""+L),f=$o.bind(null,ag),h=$o.bind(null,hr);function p(L,B){let k,j;return Oh(L)?(k=t.getRecordMatcher(L),j=B):j=L,t.addRoute(j,k)}function v(L){const B=t.getRecordMatcher(L);B&&t.removeRoute(B)}function x(){return t.getRoutes().map(L=>L.record)}function m(L){return!!t.getRecordMatcher(L)}function d(L,B){if(B=oe({},B||l.value),typeof L=="string"){const U=jo(e,L,B.path),V=t.resolve({path:U.path},B),X=s.createHref(U.fullPath);return oe(U,V,{params:h(V.params),hash:hr(U.hash),redirectedFrom:void 0,href:X})}let k;if(L.path!=null)k=oe({},L,{path:jo(e,L.path,B.path).path});else{const U=oe({},L.params);for(const V in U)U[V]==null&&delete U[V];k=oe({},L,{params:f(U)}),B.params=f(B.params)}const j=t.resolve(k,B),ft=L.hash||"";j.params=u(h(j.params));const A=ug(i,oe({},L,{hash:sg(ft),path:j.path})),g=s.createHref(A);return oe({fullPath:A,hash:ft,query:i===eu?Tg(L.query):L.query||{}},j,{redirectedFrom:void 0,href:g})}function y(L){return typeof L=="string"?jo(e,L,l.value.path):oe({},L)}function w(L,B){if(c!==L)return Cs(Ee.NAVIGATION_CANCELLED,{from:B,to:L})}function M(L){return C(L)}function R(L){return M(oe(y(L),{replace:!0}))}function D(L,B){const k=L.matched[L.matched.length-1];if(k&&k.redirect){const{redirect:j}=k;let ft=typeof j=="function"?j(L,B):j;return typeof ft=="string"&&(ft=ft.includes("?")||ft.includes("#")?ft=y(ft):{path:ft},ft.params={}),oe({query:L.query,hash:L.hash,params:ft.path!=null?{}:L.params},ft)}}function C(L,B){const k=c=d(L),j=l.value,ft=L.state,A=L.force,g=L.replace===!0,U=D(k,j);if(U)return C(oe(y(U),{state:typeof U=="object"?oe({},ft,U.state):ft,force:A,replace:g}),B||k);const V=k;V.redirectedFrom=B;let X;return!A&&fg(i,j,k)&&(X=Cs(Ee.NAVIGATION_DUPLICATED,{to:V,from:j}),Pt(j,j,!0,!1)),(X?Promise.resolve(X):b(V,j)).catch(F=>Vn(F)?Vn(F,Ee.NAVIGATION_GUARD_REDIRECT)?F:xt(F):q(F,V,j)).then(F=>{if(F){if(Vn(F,Ee.NAVIGATION_GUARD_REDIRECT))return C(oe({replace:g},y(F.to),{state:typeof F.to=="object"?oe({},ft,F.to.state):ft,force:A}),B||V)}else F=G(V,j,!0,g,ft);return I(V,j,F),F})}function O(L,B){const k=w(L,B);return k?Promise.reject(k):Promise.resolve()}function T(L){const B=ee.values().next().value;return B&&typeof B.runWithContext=="function"?B.runWithContext(L):L()}function b(L,B){let k;const[j,ft,A]=wg(L,B);k=Zo(j.reverse(),"beforeRouteLeave",L,B);for(const U of j)U.leaveGuards.forEach(V=>{k.push(mi(V,L,B))});const g=O.bind(null,L,B);return k.push(g),rt(k).then(()=>{k=[];for(const U of r.list())k.push(mi(U,L,B));return k.push(g),rt(k)}).then(()=>{k=Zo(ft,"beforeRouteUpdate",L,B);for(const U of ft)U.updateGuards.forEach(V=>{k.push(mi(V,L,B))});return k.push(g),rt(k)}).then(()=>{k=[];for(const U of A)if(U.beforeEnter)if(An(U.beforeEnter))for(const V of U.beforeEnter)k.push(mi(V,L,B));else k.push(mi(U.beforeEnter,L,B));return k.push(g),rt(k)}).then(()=>(L.matched.forEach(U=>U.enterCallbacks={}),k=Zo(A,"beforeRouteEnter",L,B,T),k.push(g),rt(k))).then(()=>{k=[];for(const U of o.list())k.push(mi(U,L,B));return k.push(g),rt(k)}).catch(U=>Vn(U,Ee.NAVIGATION_CANCELLED)?U:Promise.reject(U))}function I(L,B,k){a.list().forEach(j=>T(()=>j(L,B,k)))}function G(L,B,k,j,ft){const A=w(L,B);if(A)return A;const g=B===oi,U=ps?history.state:{};k&&(j||g?s.replace(L.fullPath,oe({scroll:g&&U&&U.scroll},ft)):s.push(L.fullPath,ft)),l.value=L,Pt(L,B,k,g),xt()}let J;function at(){J||(J=s.listen((L,B,k)=>{if(!Yt.listening)return;const j=d(L),ft=D(j,Yt.currentRoute.value);if(ft){C(oe(ft,{replace:!0,force:!0}),j).catch(nr);return}c=j;const A=l.value;ps&&xg(tu(A.fullPath,k.delta),Do()),b(j,A).catch(g=>Vn(g,Ee.NAVIGATION_ABORTED|Ee.NAVIGATION_CANCELLED)?g:Vn(g,Ee.NAVIGATION_GUARD_REDIRECT)?(C(oe(y(g.to),{force:!0}),j).then(U=>{Vn(U,Ee.NAVIGATION_ABORTED|Ee.NAVIGATION_DUPLICATED)&&!k.delta&&k.type===Ha.pop&&s.go(-1,!1)}).catch(nr),Promise.reject()):(k.delta&&s.go(-k.delta,!1),q(g,j,A))).then(g=>{g=g||G(j,A,!1),g&&(k.delta&&!Vn(g,Ee.NAVIGATION_CANCELLED)?s.go(-k.delta,!1):k.type===Ha.pop&&Vn(g,Ee.NAVIGATION_ABORTED|Ee.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),I(j,A,g)}).catch(nr)}))}let st=Hs(),et=Hs(),nt;function q(L,B,k){xt(L);const j=et.list();return j.length?j.forEach(ft=>ft(L,B,k)):console.error(L),Promise.reject(L)}function vt(){return nt&&l.value!==oi?Promise.resolve():new Promise((L,B)=>{st.add([L,B])})}function xt(L){return nt||(nt=!L,at(),st.list().forEach(([B,k])=>L?k(L):B()),st.reset()),L}function Pt(L,B,k,j){const{scrollBehavior:ft}=n;if(!ps||!ft)return Promise.resolve();const A=!k&&Mg(tu(L.fullPath,0))||(j||!k)&&history.state&&history.state.scroll||null;return Kf().then(()=>ft(L,B,A)).then(g=>g&&vg(g)).catch(g=>q(g,L,B))}const Nt=L=>s.go(L);let Qt;const ee=new Set,Yt={currentRoute:l,listening:!0,addRoute:p,removeRoute:v,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:x,resolve:d,options:n,push:M,replace:R,go:Nt,back:()=>Nt(-1),forward:()=>Nt(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:et.add,isReady:vt,install(L){L.component("RouterLink",$g),L.component("RouterView",Gh),L.config.globalProperties.$router=Yt,Object.defineProperty(L.config.globalProperties,"$route",{enumerable:!0,get:()=>tn(l)}),ps&&!Qt&&l.value===oi&&(Qt=!0,M(s.location).catch(j=>{}));const B={};for(const j in oi)Object.defineProperty(B,j,{get:()=>l.value[j],enumerable:!0});L.provide(Jl,Yt),L.provide(zh,Wf(B)),L.provide(Ga,l);const k=L.unmount;ee.add(L),L.unmount=function(){ee.delete(L),ee.size<1&&(c=oi,J&&J(),J=null,l.value=oi,Qt=!1,nt=!1),k()}}};function rt(L){return L.reduce((B,k)=>B.then(()=>T(k)),Promise.resolve())}return Yt}const Qg={__name:"App",setup(n){return(t,e)=>(Wt(),Ti(tn(Gh)))}},t_={class:"flex items-center justify-between whitespace-nowrap border-b border-primary/20 dark:border-primary/30 px-10 py-3"},e_={__name:"DashboardHeader",setup(n){return(t,e)=>(Wt(),te("header",t_,[...e[0]||(e[0]=[cm('<div class="flex items-center gap-4 text-black dark:text-white"><div class="size-6 text-primary"><svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path></svg></div><h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">베어링 인사이트</h2></div><div class="flex items-center gap-4"><button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20"><svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg></button><div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style="background-image:url(&#39;https://cdn.usegalileo.ai/stability/d1d6d8b9-6c5f-4e73-b8e4-f878c0e4e1f7.png&#39;);"></div></div>',2)])]))}},n_={class:"flex flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 dark:bg-primary/20"},i_={class:"text-black/80 dark:text-white/80 text-base font-medium"},s_={class:"text-black dark:text-white text-3xl font-bold"},r_={__name:"SummaryCard",props:{label:{type:String,required:!0},value:{type:[String,Number],required:!0}},setup(n){return(t,e)=>(Wt(),te("div",n_,[Z("p",i_,Zt(n.label),1),Z("p",s_,Zt(n.value),1)]))}},o_={class:"flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 p-6 bg-background-light dark:bg-background-dark"},a_={class:"text-black dark:text-white text-lg font-medium"},Wh={__name:"ChartCard",props:{title:{type:String,default:""}},setup(n){return(t,e)=>(Wt(),te("div",o_,[wc(t.$slots,"header",{},()=>[Z("p",a_,Zt(n.title),1)]),wc(t.$slots,"content")]))}},ir="http://localhost:8080",l_={async getSingleBearingResults(n=50){try{const t=await fetch(`${ir}/api/airesult/single?limit=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API 호출 실패: ${t.status} ${t.statusText}`);return await t.json()}catch(t){throw t.message.includes("Failed to fetch")?(console.error("❌ 백엔드 서버에 연결할 수 없습니다. http://localhost:8080 확인 필요"),new Error("백엔드 서버에 연결할 수 없습니다.")):(console.error("PMS AI Result API 호출 에러:",t),t)}}},c_={async getDetailsByLogId(n){try{const t=await fetch(`${ir}/api/retrain/detail/by-log-id?logId=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API 호출 실패: ${t.status} ${t.statusText}`);return await t.json()}catch(t){throw t.message.includes("Failed to fetch")?(console.error("❌ 백엔드 서버에 연결할 수 없습니다."),new Error("백엔드 서버에 연결할 수 없습니다.")):(console.error("Retrain Log Detail API 호출 에러:",t),t)}},async getLatestDetailsByLogId(n,t=50){try{const e=await fetch(`${ir}/api/retrain/detail/latest-by-log-id?logId=${n}&limit=${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`API 호출 실패: ${e.status} ${e.statusText}`);return await e.json()}catch(e){throw e.message.includes("Failed to fetch")?(console.error("❌ 백엔드 서버에 연결할 수 없습니다."),new Error("백엔드 서버에 연결할 수 없습니다.")):(console.error("Retrain Log Detail API 호출 에러:",e),e)}},async getLatestDetails(n=50){try{const t=await fetch(`${ir}/api/retrain/detail?limit=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API 호출 실패: ${t.status} ${t.statusText}`);return await t.json()}catch(t){throw t.message.includes("Failed to fetch")?(console.error("❌ 백엔드 서버에 연결할 수 없습니다."),new Error("백엔드 서버에 연결할 수 없습니다.")):(console.error("Retrain Log Detail API 호출 에러:",t),t)}}},u_={async getLatestData(n=50){try{const t=await fetch(`${ir}/api/realtime?limit=${n}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API 호출 실패: ${t.status} ${t.statusText}`);return await t.json()}catch(t){throw t.message.includes("Failed to fetch")?(console.error("❌ 백엔드 서버에 연결할 수 없습니다."),new Error("백엔드 서버에 연결할 수 없습니다.")):(console.error("Realtime Data API 호출 에러:",t),t)}}};function f_(){const n=ze([]),t=ze(!1),e=ze(null),i=async(c=50)=>{t.value=!0,e.value=null;try{const u=await u_.getLatestData(c);n.value=u,console.log(`✅ Realtime 데이터 ${u.length}개 로드 완료`)}catch(u){e.value=u.message,console.error("❌ Realtime 데이터 로드 실패:",u)}finally{t.value=!1}},s=()=>n.value.map(c=>c.timeRms),r=c=>n.value.map(u=>u[c]);return{realtimeData:n,loading:t,error:e,fetchRealtimeData:i,getTimeRmsValues:s,getFeatureValues:r,getTimeDomainFeatures:()=>({rms:r("timeRms"),skewness:r("timeSkewness"),kurtosis:r("timeKurtosis"),crestFactor:r("timeCrestFactor"),shapeFactor:r("timeShapeFactor"),mean:r("timeMean"),std:r("timeStd"),peak:r("timePeak"),meanDiff:r("timeMeanDiff"),stdDiff:r("timeStdDiff"),minDiff:r("timeMinDiff"),maxDiff:r("timeMaxDiff")}),getFftFeatures:()=>({centroid:r("fftCentroid"),bandwidth:r("fftBandwidth"),peakFreq:r("fftPeakFreq"),overEnv:r("fftOverEnv"),amp1x:r("fftAmp1x"),amp2x:r("fftAmp2x"),amp3x:r("fftAmp3x"),amp4x:r("fftAmp4x"),amp5x:r("fftAmp5x")}),getWaveletFeatures:()=>({cD1:{rms:r("cD1Rms"),kurtosis:r("cD1Kurtosis")},cD2:{rms:r("cD2Rms"),kurtosis:r("cD2Kurtosis")},cD3:{rms:r("cD3Rms"),kurtosis:r("cD3Kurtosis")},cD4:{rms:r("cD4Rms"),kurtosis:r("cD4Kurtosis")},cD5:{rms:r("cD5Rms"),kurtosis:r("cD5Kurtosis")},cD6:{rms:r("cD6Rms"),kurtosis:r("cD6Kurtosis")},cD7:{rms:r("cD7Rms"),kurtosis:r("cD7Kurtosis")}})}}const h_={class:"flex flex-1 gap-4 py-4 h-48"},d_={class:"flex-1 flex flex-col gap-4"},p_={fill:"none",height:"100%",preserveAspectRatio:"none",viewBox:"0 0 472 150",width:"100%",xmlns:"http://www.w3.org/2000/svg"},m_=["d"],g_=["d"],__={class:"flex justify-around"},v_={__name:"SensorSignalChart",props:{timeLabels:{type:Array,required:!0}},setup(n){const{fetchRealtimeData:t,getTimeRmsValues:e}=f_();wo(async()=>{await t(50),setInterval(()=>t(50),6e4)});const i=ce(()=>{const r=e();if(r.length===0)return"M0 75 L472 75";const o=l=>{const c=(3-l)/6;return Math.max(0,Math.min(150,c*150))},a=472/Math.max(1,r.length-1);return r.map((l,c)=>`${c===0?"M":"L"}${c*a} ${o(l)}`).join(" ")}),s=ce(()=>{const r=e();if(r.length===0)return"M0 75 L472 75 L472 150 L0 150 Z";const o=c=>{const u=(3-c)/6;return Math.max(0,Math.min(150,u*150))},a=472/Math.max(1,r.length-1);return`${r.map((c,u)=>`${u===0?"M":"L"}${u*a} ${o(c)}`).join(" ")}V150H0V${o(r[0])}Z`});return(r,o)=>(Wt(),Ti(Wh,{title:"RMS 이상 탐지 (점수) 또는 센서 신호값"},{content:uo(()=>[o[2]||(o[2]=Z("div",{class:"flex items-baseline gap-3"},[Z("p",{class:"text-black dark:text-white text-4xl font-bold"},"1800"),Z("p",{class:"text-red-500 text-base font-medium"},"+5%")],-1)),o[3]||(o[3]=Z("p",{class:"text-black/60 dark:text-white/60 text-sm font-normal"},"지난 24시간",-1)),Z("div",h_,[o[1]||(o[1]=Z("div",{class:"flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"},[Z("p",null,"3"),Z("p",null,"1"),Z("p",null,"-1"),Z("p",null,"-3")],-1)),Z("div",d_,[(Wt(),te("svg",p_,[Z("path",{d:s.value,fill:"url(#paint0_linear_chart)"},null,8,m_),Z("path",{d:i.value,stroke:"#1193d4","stroke-linecap":"round","stroke-width":"3"},null,8,g_),o[0]||(o[0]=Z("defs",null,[Z("linearGradient",{gradientUnits:"userSpaceOnUse",id:"paint0_linear_chart",x1:"236",x2:"236",y1:"1",y2:"149"},[Z("stop",{"stop-color":"#1193d4","stop-opacity":"0.3"}),Z("stop",{offset:"1","stop-color":"#1193d4","stop-opacity":"0"})])],-1))])),Z("div",__,[(Wt(!0),te(we,null,bi(n.timeLabels,a=>(Wt(),te("p",{key:a,class:"text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"},Zt(a),1))),128))])])])]),_:1}))}},x_={class:"flex flex-1 gap-4 pt-4 h-48"},M_={class:"flex-1 flex flex-col gap-4"},S_={class:"flex-1 rounded-md bg-zinc-100 dark:bg-zinc-800",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 475 150",xmlns:"http://www.w3.org/2000/svg"},E_=["d"],y_={class:"flex justify-around"},b_={__name:"BinaryStateChart",props:{minuteData:{type:Array,required:!0},timeLabels:{type:Array,required:!0}},setup(n){const t=n,e=ce(()=>{const i=t.minuteData;if(!i||i.length===0)return"";const s=475,r=150,o=s/(i.length-1);let a="";return i.forEach((l,c)=>{const u=c*o,f=l.value===1?1:r-1;if(c===0)a+=`M0 ${f}`;else{const h=(c-1)*o;a+=`L${h} ${f}L${u} ${f}`}}),a});return(i,s)=>(Wt(),Ti(Wh,null,{header:uo(()=>[...s[0]||(s[0]=[Z("div",{class:"flex flex-col gap-1"},[Z("p",{class:"text-black dark:text-white text-lg font-medium"},"베어링 상태 분포"),Z("p",{class:"text-black/60 dark:text-white/60 text-sm font-normal"}," 베어링 상태의 이진 시각화 (0: 정상, 1: 이상). ")],-1)])]),content:uo(()=>[s[2]||(s[2]=Z("div",{class:"flex items-center gap-4 mb-4"},[Z("div",{class:"flex items-center gap-2"},[Z("div",{class:"h-4 w-4 rounded-sm bg-green-500/20 dark:bg-green-500/30"}),Z("p",{class:"text-black/80 dark:text-white/80 text-sm"},"정상")]),Z("div",{class:"flex items-center gap-2"},[Z("div",{class:"relative h-4 w-4 flex items-center justify-center"},[Z("div",{class:"h-0.5 w-full bg-blue-600"})]),Z("p",{class:"text-black/80 dark:text-white/80 text-sm"},"이상")])],-1)),Z("div",x_,[s[1]||(s[1]=Z("div",{class:"flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider h-full pb-8"},[Z("p",null,"1"),Z("p",null,"0")],-1)),Z("div",M_,[(Wt(),te("svg",S_,[Z("path",{d:e.value,stroke:"#2563eb","stroke-linecap":"round","stroke-width":"3"},null,8,E_)])),Z("div",y_,[(Wt(!0),te(we,null,bi(n.timeLabels,r=>(Wt(),te("p",{key:r,class:"text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"},Zt(r),1))),128))])])])]),_:1}))}},T_={class:"flex items-center gap-4"},A_={class:"material-symbols-outlined text-3xl"},w_={class:"flex flex-col"},R_={class:"text-lg font-bold text-black dark:text-white"},C_={__name:"BearingStatusCard",props:{bearingId:{type:String,required:!0},status:{type:String,required:!0},icon:{type:String,required:!0},statusClass:{type:String,default:""},iconBgClass:{type:String,default:""},iconColorClass:{type:String,default:""},textClass:{type:String,default:""}},setup(n){return(t,e)=>(Wt(),te("div",{class:en(["flex flex-col gap-4 rounded-xl border p-4",n.statusClass])},[Z("div",T_,[Z("div",{class:en(["flex h-12 w-12 items-center justify-center rounded-full",n.iconBgClass,n.iconColorClass])},[Z("span",A_,Zt(n.icon),1)],2),Z("div",w_,[Z("p",R_,Zt(n.bearingId),1),Z("p",{class:en(n.textClass)},Zt(n.status),3)])])],2))}},P_={class:"flex flex-col gap-4"},D_={class:"overflow-x-auto rounded-lg border border-primary/20 dark:border-primary/30"},L_={class:"w-full text-left text-sm text-black/80 dark:text-white/80"},I_={class:"px-6 py-4 font-medium"},U_={class:"px-6 py-4"},N_={class:"px-6 py-4"},F_={class:"px-6 py-4"},O_={class:"px-6 py-4"},B_={class:"px-6 py-4"},z_={class:"px-6 py-4"},k_=["onClick"],H_={__name:"RetrainTable",props:{logs:{type:Array,required:!0}},emits:["view-log"],setup(n){return(t,e)=>(Wt(),te("div",P_,[e[1]||(e[1]=Z("h2",{class:"text-black dark:text-white text-2xl font-bold"},"Retrain Runs",-1)),Z("div",D_,[Z("table",L_,[e[0]||(e[0]=Z("thead",{class:"bg-primary/10 dark:bg-primary/20 text-xs uppercase text-black/60 dark:text-white/60"},[Z("tr",null,[Z("th",{class:"px-6 py-3",scope:"col"},"ID"),Z("th",{class:"px-6 py-3",scope:"col"},"시작 시간"),Z("th",{class:"px-6 py-3",scope:"col"},"종료 시간"),Z("th",{class:"px-6 py-3",scope:"col"},"상태"),Z("th",{class:"px-6 py-3",scope:"col"},"지속 시간"),Z("th",{class:"px-6 py-3",scope:"col"},"메시지"),Z("th",{class:"px-6 py-3",scope:"col"})])],-1)),Z("tbody",null,[(Wt(!0),te(we,null,bi(n.logs,(i,s)=>(Wt(),te("tr",{key:i.id,class:en(["bg-background-light dark:bg-background-dark",s<n.logs.length-1?"border-b border-primary/20 dark:border-primary/30":""])},[Z("td",I_,Zt(i.id),1),Z("td",U_,Zt(i.startTime),1),Z("td",N_,Zt(i.endTime),1),Z("td",F_,[Z("span",{class:en(i.statusClass)},Zt(i.status),3)]),Z("td",O_,Zt(i.duration),1),Z("td",B_,Zt(i.message),1),Z("td",z_,[Z("button",{onClick:r=>t.$emit("view-log",i.id),class:"px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"}," 로그 보기 ",8,k_)])],2))),128))])])])]))}},V_={key:0,class:"flex flex-col gap-4"},G_={class:"flex items-center justify-between"},W_={class:"text-black dark:text-white text-2xl font-bold"},X_=["disabled"],q_={class:"rounded-lg border border-primary/20 dark:border-primary/30 bg-zinc-900 p-4"},Y_={class:"h-64 overflow-y-auto font-mono text-sm text-white"},$_={key:0,class:"text-gray-400"},j_={key:1,class:"text-red-400"},K_={key:2,class:"text-gray-400"},Z_={key:3},J_={class:"text-gray-500"},Q_={__name:"LogViewer",props:{logId:{type:[String,Number],default:null},limit:{type:Number,default:20}},setup(n){const t=n,e=ze([]),i=ze(!1),s=ze(null),r=async()=>{if(t.logId){i.value=!0,s.value=null;try{const c=await c_.getLatestDetailsByLogId(t.logId,t.limit);e.value=c.sort((u,f)=>u.seq-f.seq),console.log(`✅ 로그 ${c.length}개 로드 완료 (logId: ${t.logId})`)}catch(c){s.value=c.message,console.error("❌ 로그 로드 실패:",c)}finally{i.value=!1}}},o=()=>{r()},a=c=>c?new Date(c).toLocaleTimeString("ko-KR",{hour12:!1}):"",l=c=>{switch(c){case"ERROR":return"text-red-400 font-bold";case"WARN":return"text-yellow-400";case"INFO":return"text-blue-400";default:return"text-gray-400"}};return tr(()=>t.logId,c=>{console.log("🔍 logId 변경 감지:",c),c&&r()},{immediate:!0}),(c,u)=>n.logId?(Wt(),te("div",V_,[Z("div",G_,[Z("h2",W_,"로그 #"+Zt(n.logId),1),Z("button",{onClick:o,disabled:i.value,class:"px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"},Zt(i.value?"로딩 중...":"새로고침"),9,X_)]),Z("div",q_,[Z("div",Y_,[i.value&&e.value.length===0?(Wt(),te("div",$_,"로그를 불러오는 중...")):s.value?(Wt(),te("div",j_,Zt(s.value),1)):e.value.length===0?(Wt(),te("div",K_,"로그가 없습니다.")):(Wt(),te("div",Z_,[(Wt(!0),te(we,null,bi(e.value,f=>(Wt(),te("p",{key:f.id,class:en({"text-red-400":f.level==="ERROR","text-yellow-400":f.level==="WARN","text-white":f.level==="INFO"})},[Z("span",J_,"["+Zt(a(f.ts))+"]",1),Z("span",{class:en(l(f.level))},"["+Zt(f.level)+"]",3),Th(" "+Zt(f.text),1)],2))),128))]))])])])):Po("",!0)}},t0={class:"flex items-center gap-2 text-sm"},e0={key:0,class:"flex items-center gap-2 text-blue-600 dark:text-blue-400"},n0={key:1,class:"text-black/60 dark:text-white/60"},i0=["disabled"],s0={__name:"RefreshIndicator",props:{isRefreshing:{type:Boolean,default:!1},lastUpdated:{type:Date,default:null}},emits:["refresh"],setup(n){const t=e=>e?e.toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return(e,i)=>(Wt(),te("div",t0,[n.isRefreshing?(Wt(),te("div",e0,[...i[1]||(i[1]=[Z("svg",{class:"animate-spin h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},[Z("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),Z("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})],-1),Z("span",null,"갱신 중...",-1)])])):n.lastUpdated?(Wt(),te("div",n0,[Z("span",null,"마지막 업데이트: "+Zt(t(n.lastUpdated)),1)])):Po("",!0),Z("button",{onClick:i[0]||(i[0]=s=>e.$emit("refresh")),disabled:n.isRefreshing,class:"px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"},[...i[2]||(i[2]=[Z("span",{class:"material-symbols-outlined text-base"},"refresh",-1)])],8,i0)]))}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ql="180",bs={ROTATE:0,DOLLY:1,PAN:2},gs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},r0=0,du=1,o0=2,Xh=1,a0=2,$n=3,Ai=0,sn=1,Zn=2,Mi=0,Ts=1,pu=2,mu=3,gu=4,l0=5,ki=100,c0=101,u0=102,f0=103,h0=104,d0=200,p0=201,m0=202,g0=203,Wa=204,Xa=205,_0=206,v0=207,x0=208,M0=209,S0=210,E0=211,y0=212,b0=213,T0=214,qa=0,Ya=1,$a=2,Ps=3,ja=4,Ka=5,Za=6,Ja=7,qh=0,A0=1,w0=2,Si=0,R0=1,C0=2,P0=3,D0=4,L0=5,I0=6,U0=7,Yh=300,Ds=301,Ls=302,Qa=303,tl=304,Lo=306,el=1e3,Gi=1001,nl=1002,Tn=1003,N0=1004,Cr=1005,Ln=1006,Jo=1007,Wi=1008,On=1009,$h=1010,jh=1011,dr=1012,tc=1013,qi=1014,Jn=1015,Er=1016,ec=1017,nc=1018,pr=1020,Kh=35902,Zh=35899,Jh=1021,Qh=1022,yn=1023,mr=1026,gr=1027,td=1028,ic=1029,ed=1030,sc=1031,rc=1033,eo=33776,no=33777,io=33778,so=33779,il=35840,sl=35841,rl=35842,ol=35843,al=36196,ll=37492,cl=37496,ul=37808,fl=37809,hl=37810,dl=37811,pl=37812,ml=37813,gl=37814,_l=37815,vl=37816,xl=37817,Ml=37818,Sl=37819,El=37820,yl=37821,bl=36492,Tl=36494,Al=36495,wl=36283,Rl=36284,Cl=36285,Pl=36286,F0=3200,O0=3201,nd=0,B0=1,vi="",mn="srgb",Is="srgb-linear",go="linear",fe="srgb",Qi=7680,_u=519,z0=512,k0=513,H0=514,id=515,V0=516,G0=517,W0=518,X0=519,vu=35044,xu="300 es",In=2e3,_o=2001;class Ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Mu=1234567;const sr=Math.PI/180,_r=180/Math.PI;function Ns(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Kt(n,t,e){return Math.max(t,Math.min(e,n))}function oc(n,t){return(n%t+t)%t}function q0(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Y0(n,t,e){return n!==t?(e-n)/(t-n):0}function rr(n,t,e){return(1-e)*n+e*t}function $0(n,t,e,i){return rr(n,t,1-Math.exp(-e*i))}function j0(n,t=1){return t-Math.abs(oc(n,t*2)-t)}function K0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Z0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function J0(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Q0(n,t){return n+Math.random()*(t-n)}function tv(n){return n*(.5-Math.random())}function ev(n){n!==void 0&&(Mu=n);let t=Mu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nv(n){return n*sr}function iv(n){return n*_r}function sv(n){return(n&n-1)===0&&n!==0}function rv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ov(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function av(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),f=r((t-i)/2),h=o((t-i)/2),p=r((i-t)/2),v=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*v,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*v,a*c);break;case"ZYZ":n.set(l*v,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const sd={DEG2RAD:sr,RAD2DEG:_r,generateUUID:Ns,clamp:Kt,euclideanModulo:oc,mapLinear:q0,inverseLerp:Y0,lerp:rr,damp:$0,pingpong:j0,smoothstep:K0,smootherstep:Z0,randInt:J0,randFloat:Q0,randFloatSpread:tv,seededRandom:ev,degToRad:nv,radToDeg:iv,isPowerOfTwo:sv,ceilPowerOfTwo:rv,floorPowerOfTwo:ov,setQuaternionFromProperEuler:av,normalize:Xe,denormalize:ms};class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[o+0],p=r[o+1],v=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=v,t[e+3]=x;return}if(f!==x||l!==h||c!==p||u!==v){let m=1-a;const d=l*h+c*p+u*v+f*x,y=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){const R=Math.sqrt(w),D=Math.atan2(R,d*y);m=Math.sin(m*D)/R,a=Math.sin(a*D)/R}const M=a*y;if(l=l*m+h*M,c=c*m+p*M,u=u*m+v*M,f=f*m+x*M,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],p=r[o+2],v=r[o+3];return t[e]=a*v+u*f+l*p-c*h,t[e+1]=l*v+u*h+c*f-a*p,t[e+2]=c*v+u*p+a*h-l*f,t[e+3]=u*v-a*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),p=l(s/2),v=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"YXZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"ZXY":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"ZYX":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"YZX":this._x=h*u*f+c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f-h*p*v;break;case"XZY":this._x=h*u*f-c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(t=0,e=0,i=0){W.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Su.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Su.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Qo.copy(this).projectOnVector(t),this.sub(Qo)}reflect(t){return this.sub(Qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qo=new W,Su=new Yi;class Xt{constructor(t,e,i,s,r,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],v=i[8],x=s[0],m=s[3],d=s[6],y=s[1],w=s[4],M=s[7],R=s[2],D=s[5],C=s[8];return r[0]=o*x+a*y+l*R,r[3]=o*m+a*w+l*D,r[6]=o*d+a*M+l*C,r[1]=c*x+u*y+f*R,r[4]=c*m+u*w+f*D,r[7]=c*d+u*M+f*C,r[2]=h*x+p*y+v*R,r[5]=h*m+p*w+v*D,r[8]=h*d+p*M+v*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,p=c*r-o*l,v=e*f+i*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=f*x,t[1]=(s*c-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=h*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ta.makeScale(t,e)),this}rotate(t){return this.premultiply(ta.makeRotation(-t)),this}translate(t,e){return this.premultiply(ta.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new Xt;function rd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function vo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lv(){const n=vo("canvas");return n.style.display="block",n}const Eu={};function vr(n){n in Eu||(Eu[n]=!0,console.warn(n))}function cv(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const yu=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bu=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uv(){const n={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===fe&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===fe&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?go:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Is]:{primaries:t,whitePoint:i,transfer:go,toXYZ:yu,fromXYZ:bu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:yu,fromXYZ:bu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),n}const ie=uv();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function As(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class fv{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ts===void 0&&(ts=vo("canvas")),ts.width=t.width,ts.height=t.height;const s=ts.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ts}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=vo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ti(e[i]/255)*255):e[i]=ti(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hv=0;class ac{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=Ns(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ea(s[o].image)):r.push(ea(s[o]))}else r=ea(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ea(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?fv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dv=0;const na=new W;class rn extends Ki{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,i=Gi,s=Gi,r=Ln,o=Wi,a=yn,l=On,c=rn.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=Ns(),this.name="",this.source=new ac(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(na).x}get height(){return this.source.getSize(na).y}get depth(){return this.source.getSize(na).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case el:t.x=t.x-Math.floor(t.x);break;case Gi:t.x=t.x<0?0:1;break;case nl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case el:t.y=t.y-Math.floor(t.y);break;case Gi:t.y=t.y<0?0:1;break;case nl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Yh;rn.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,i=0,s=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],v=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,M=(p+1)/2,R=(d+1)/2,D=(u+h)/4,C=(f+x)/4,O=(v+m)/4;return w>M&&w>R?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=D/i,r=C/i):M>R?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=D/s,r=O/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=C/r,s=O/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-v)*(m-v)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(f-x)/y,this.z=(h-u)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pv extends Ki{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new rn(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ac(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $i extends pv{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class od extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mv extends rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fs{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pr.copy(i.boundingBox)),Pr.applyMatrix4(t.matrixWorld),this.union(Pr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vs),Dr.subVectors(this.max,Vs),es.subVectors(t.a,Vs),ns.subVectors(t.b,Vs),is.subVectors(t.c,Vs),ai.subVectors(ns,es),li.subVectors(is,ns),Li.subVectors(es,is);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Li.z,Li.y,ai.z,0,-ai.x,li.z,0,-li.x,Li.z,0,-Li.x,-ai.y,ai.x,0,-li.y,li.x,0,-Li.y,Li.x,0];return!ia(e,es,ns,is,Dr)||(e=[1,0,0,0,1,0,0,0,1],!ia(e,es,ns,is,Dr))?!1:(Lr.crossVectors(ai,li),e=[Lr.x,Lr.y,Lr.z],ia(e,es,ns,is,Dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Gn=[new W,new W,new W,new W,new W,new W,new W,new W],xn=new W,Pr=new Fs,es=new W,ns=new W,is=new W,ai=new W,li=new W,Li=new W,Vs=new W,Dr=new W,Lr=new W,Ii=new W;function ia(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ii.fromArray(n,r);const a=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),l=t.dot(Ii),c=e.dot(Ii),u=i.dot(Ii);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const gv=new Fs,Gs=new W,sa=new W;class Io{constructor(t=new W,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):gv.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gs.subVectors(t,this.center);const e=Gs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Gs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gs.copy(t.center).add(sa)),this.expandByPoint(Gs.copy(t.center).sub(sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Wn=new W,ra=new W,Ir=new W,ci=new W,oa=new W,Ur=new W,aa=new W;class lc{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ra.copy(t).add(e).multiplyScalar(.5),Ir.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(ra);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ir),a=ci.dot(this.direction),l=-ci.dot(Ir),c=ci.lengthSq(),u=Math.abs(1-o*o);let f,h,p,v;if(u>0)if(f=o*l-a,h=o*a-l,v=r*u,f>=0)if(h>=-v)if(h<=v){const x=1/u;f*=x,h*=x,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-v?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=v?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ra).addScaledVector(Ir,h),p}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);const i=Wn.dot(this.direction),s=Wn.dot(Wn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,i,s,r){oa.subVectors(e,t),Ur.subVectors(i,t),aa.crossVectors(oa,Ur);let o=this.direction.dot(aa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(Ur.crossVectors(ci,Ur));if(l<0)return null;const c=a*this.direction.dot(oa.cross(ci));if(c<0||l+c>o)return null;const u=-a*ci.dot(aa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,i,s,r,o,a,l,c,u,f,h,p,v,x,m){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,p,v,x,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,p,v,x,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=v,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),o=1/ss.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,p=o*f,v=a*u,x=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+v*c,e[5]=h-x*c,e[9]=-a*l,e[2]=x-h*c,e[6]=v+p*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,p=l*f,v=c*u,x=c*f;e[0]=h+x*a,e[4]=v*a-p,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-v,e[6]=x+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,p=l*f,v=c*u,x=c*f;e[0]=h-x*a,e[4]=-o*f,e[8]=v+p*a,e[1]=p+v*a,e[5]=o*u,e[9]=x-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,p=o*f,v=a*u,x=a*f;e[0]=l*u,e[4]=v*c-p,e[8]=h*c+x,e[1]=l*f,e[5]=x*c+h,e[9]=p*c-v,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,p=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=x-h*f,e[8]=v*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*f+v,e[10]=h-x*f}else if(t.order==="XZY"){const h=o*l,p=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+x,e[5]=o*u,e[9]=p*f-v,e[2]=v*f-p,e[6]=a*u,e[10]=x*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_v,t,vv)}lookAt(t,e,i){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ui.crossVectors(i,ln),ui.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ui.crossVectors(i,ln)),ui.normalize(),Nr.crossVectors(ln,ui),s[0]=ui.x,s[4]=Nr.x,s[8]=ln.x,s[1]=ui.y,s[5]=Nr.y,s[9]=ln.y,s[2]=ui.z,s[6]=Nr.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],v=i[2],x=i[6],m=i[10],d=i[14],y=i[3],w=i[7],M=i[11],R=i[15],D=s[0],C=s[4],O=s[8],T=s[12],b=s[1],I=s[5],G=s[9],J=s[13],at=s[2],st=s[6],et=s[10],nt=s[14],q=s[3],vt=s[7],xt=s[11],Pt=s[15];return r[0]=o*D+a*b+l*at+c*q,r[4]=o*C+a*I+l*st+c*vt,r[8]=o*O+a*G+l*et+c*xt,r[12]=o*T+a*J+l*nt+c*Pt,r[1]=u*D+f*b+h*at+p*q,r[5]=u*C+f*I+h*st+p*vt,r[9]=u*O+f*G+h*et+p*xt,r[13]=u*T+f*J+h*nt+p*Pt,r[2]=v*D+x*b+m*at+d*q,r[6]=v*C+x*I+m*st+d*vt,r[10]=v*O+x*G+m*et+d*xt,r[14]=v*T+x*J+m*nt+d*Pt,r[3]=y*D+w*b+M*at+R*q,r[7]=y*C+w*I+M*st+R*vt,r[11]=y*O+w*G+M*et+R*xt,r[15]=y*T+w*J+M*nt+R*Pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],v=t[3],x=t[7],m=t[11],d=t[15];return v*(+r*l*f-s*c*f-r*a*h+i*c*h+s*a*p-i*l*p)+x*(+e*l*p-e*c*h+r*o*h-s*o*p+s*c*u-r*l*u)+m*(+e*c*f-e*a*p-r*o*f+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*f+e*a*h+s*o*f-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],v=t[12],x=t[13],m=t[14],d=t[15],y=f*m*c-x*h*c+x*l*p-a*m*p-f*l*d+a*h*d,w=v*h*c-u*m*c-v*l*p+o*m*p+u*l*d-o*h*d,M=u*x*c-v*f*c+v*a*p-o*x*p-u*a*d+o*f*d,R=v*f*l-u*x*l-v*a*h+o*x*h+u*a*m-o*f*m,D=e*y+i*w+s*M+r*R;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/D;return t[0]=y*C,t[1]=(x*h*r-f*m*r-x*s*p+i*m*p+f*s*d-i*h*d)*C,t[2]=(a*m*r-x*l*r+x*s*c-i*m*c-a*s*d+i*l*d)*C,t[3]=(f*l*r-a*h*r-f*s*c+i*h*c+a*s*p-i*l*p)*C,t[4]=w*C,t[5]=(u*m*r-v*h*r+v*s*p-e*m*p-u*s*d+e*h*d)*C,t[6]=(v*l*r-o*m*r-v*s*c+e*m*c+o*s*d-e*l*d)*C,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*p+e*l*p)*C,t[8]=M*C,t[9]=(v*f*r-u*x*r-v*i*p+e*x*p+u*i*d-e*f*d)*C,t[10]=(o*x*r-v*a*r+v*i*c-e*x*c-o*i*d+e*a*d)*C,t[11]=(u*a*r-o*f*r-u*i*c+e*f*c+o*i*p-e*a*p)*C,t[12]=R*C,t[13]=(u*x*s-v*f*s+v*i*h-e*x*h-u*i*m+e*f*m)*C,t[14]=(v*a*s-o*x*s-v*i*l+e*x*l+o*i*m-e*a*m)*C,t[15]=(o*f*s-u*a*s+u*i*l-e*f*l-o*i*h+e*a*h)*C,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,p=r*u,v=r*f,x=o*u,m=o*f,d=a*f,y=l*c,w=l*u,M=l*f,R=i.x,D=i.y,C=i.z;return s[0]=(1-(x+d))*R,s[1]=(p+M)*R,s[2]=(v-w)*R,s[3]=0,s[4]=(p-M)*D,s[5]=(1-(h+d))*D,s[6]=(m+y)*D,s[7]=0,s[8]=(v+w)*C,s[9]=(m-y)*C,s[10]=(1-(h+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ss.set(s[0],s[1],s[2]).length();const o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Mn.copy(this);const c=1/r,u=1/o,f=1/a;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=f,Mn.elements[9]*=f,Mn.elements[10]*=f,e.setFromRotationMatrix(Mn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=In,l=!1){const c=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),p=(i+s)/(i-s);let v,x;if(l)v=r/(o-r),x=o*r/(o-r);else if(a===In)v=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===_o)v=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=In,l=!1){const c=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),p=-(i+s)/(i-s);let v,x;if(l)v=1/(o-r),x=o/(o-r);else if(a===In)v=-2/(o-r),x=-(o+r)/(o-r);else if(a===_o)v=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ss=new W,Mn=new Te,_v=new W(0,0,0),vv=new W(1,1,1),ui=new W,Nr=new W,ln=new W,Tu=new Te,Au=new Yi;class Bn{constructor(t=0,e=0,i=0,s=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Tu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Tu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Au.setFromEuler(this),this.setFromQuaternion(Au,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";class cc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xv=0;const wu=new W,rs=new Yi,Xn=new Te,Fr=new W,Ws=new W,Mv=new W,Sv=new Yi,Ru=new W(1,0,0),Cu=new W(0,1,0),Pu=new W(0,0,1),Du={type:"added"},Ev={type:"removed"},os={type:"childadded",child:null},la={type:"childremoved",child:null};class ke extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xv++}),this.uuid=Ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new W,e=new Bn,i=new Yi,s=new W(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Te},normalMatrix:{value:new Xt}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(Ru,t)}rotateY(t){return this.rotateOnAxis(Cu,t)}rotateZ(t){return this.rotateOnAxis(Pu,t)}translateOnAxis(t,e){return wu.copy(t).applyQuaternion(this.quaternion),this.position.add(wu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ru,t)}translateY(t){return this.translateOnAxis(Cu,t)}translateZ(t){return this.translateOnAxis(Pu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Fr.copy(t):Fr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Ws,Fr,this.up):Xn.lookAt(Fr,Ws,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Xn),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Du),os.child=t,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ev),la.child=t,this.dispatchEvent(la),la.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Du),os.child=t,this.dispatchEvent(os),os.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,t,Mv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,Sv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),p=o(t.animations),v=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}ke.DEFAULT_UP=new W(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new W,qn=new W,ca=new W,Yn=new W,as=new W,ls=new W,Lu=new W,ua=new W,fa=new W,ha=new W,da=new be,pa=new be,ma=new be;class En{constructor(t=new W,e=new W,i=new W){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Sn.subVectors(t,e),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Sn.subVectors(s,e),qn.subVectors(i,e),ca.subVectors(t,e);const o=Sn.dot(Sn),a=Sn.dot(qn),l=Sn.dot(ca),c=qn.dot(qn),u=qn.dot(ca),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-a*u)*h,v=(o*u-a*l)*h;return r.set(1-p-v,v,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(o,Yn.y),l.addScaledVector(a,Yn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return da.setScalar(0),pa.setScalar(0),ma.setScalar(0),da.fromBufferAttribute(t,e),pa.fromBufferAttribute(t,i),ma.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(da,r.x),o.addScaledVector(pa,r.y),o.addScaledVector(ma,r.z),o}static isFrontFacing(t,e,i,s){return Sn.subVectors(i,e),qn.subVectors(t,e),Sn.cross(qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Sn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return En.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return En.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return En.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return En.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return En.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;as.subVectors(s,i),ls.subVectors(r,i),ua.subVectors(t,i);const l=as.dot(ua),c=ls.dot(ua);if(l<=0&&c<=0)return e.copy(i);fa.subVectors(t,s);const u=as.dot(fa),f=ls.dot(fa);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(as,o);ha.subVectors(t,r);const p=as.dot(ha),v=ls.dot(ha);if(v>=0&&p<=v)return e.copy(r);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),e.copy(i).addScaledVector(ls,a);const m=u*v-p*f;if(m<=0&&f-u>=0&&p-v>=0)return Lu.subVectors(r,s),a=(f-u)/(f-u+(p-v)),e.copy(s).addScaledVector(Lu,a);const d=1/(m+x+h);return o=x*d,a=h*d,e.copy(i).addScaledVector(as,o).addScaledVector(ls,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},Or={h:0,s:0,l:0};function ga(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=i,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ie.workingColorSpace){if(t=oc(t,1),e=Kt(e,0,1),i=Kt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ga(o,r,t+1/3),this.g=ga(o,r,t),this.b=ga(o,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=mn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=mn){const i=ad[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=As(t.r),this.g=As(t.g),this.b=As(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mn){return ie.workingToColorSpace(Fe.copy(this),t),Math.round(Kt(Fe.r*255,0,255))*65536+Math.round(Kt(Fe.g*255,0,255))*256+Math.round(Kt(Fe.b*255,0,255))}getHexString(t=mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=mn){ie.workingToColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==mn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(fi),this.setHSL(fi.h+t,fi.s+e,fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(fi),t.getHSL(Or);const i=rr(fi.h,Or.h,e),s=rr(fi.s,Or.s,e),r=rr(fi.l,Or.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new jt;jt.NAMES=ad;let yv=0;class yr extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=Ns(),this.name="",this.type="Material",this.blending=Ts,this.side=Ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ts&&(i.blending=this.blending),this.side!==Ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wa&&(i.blendSrc=this.blendSrc),this.blendDst!==Xa&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ps&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_u&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ld extends yr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new W,Br=new Ht;let bv=0;class Nn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=vu,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Br.fromBufferAttribute(this,e),Br.applyMatrix3(t),this.setXY(e,Br.x,Br.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ms(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vu&&(t.usage=this.usage),t}}class cd extends Nn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ud extends Nn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends Nn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Tv=0;const pn=new Te,_a=new ke,cs=new W,cn=new Fs,Xs=new Fs,Ie=new W;class zn extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=Ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?ud:cd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Xt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,i){return pn.makeTranslation(t,e,i),this.applyMatrix4(pn),this}scale(t,e,i){return pn.makeScale(t,e,i),this.applyMatrix4(pn),this}lookAt(t){return _a.lookAt(t),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new He(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(cn.min,Xs.min),cn.expandByPoint(Ie),Ie.addVectors(cn.max,Xs.max),cn.expandByPoint(Ie)):(cn.expandByPoint(Xs.min),cn.expandByPoint(Xs.max))}cn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ie.fromBufferAttribute(a,c),l&&(cs.fromBufferAttribute(t,c),Ie.add(cs)),s=Math.max(s,i.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<i.count;O++)a[O]=new W,l[O]=new W;const c=new W,u=new W,f=new W,h=new Ht,p=new Ht,v=new Ht,x=new W,m=new W;function d(O,T,b){c.fromBufferAttribute(i,O),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,b),h.fromBufferAttribute(r,O),p.fromBufferAttribute(r,T),v.fromBufferAttribute(r,b),u.sub(c),f.sub(c),p.sub(h),v.sub(h);const I=1/(p.x*v.y-v.x*p.y);isFinite(I)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(I),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(I),a[O].add(x),a[T].add(x),a[b].add(x),l[O].add(m),l[T].add(m),l[b].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let O=0,T=y.length;O<T;++O){const b=y[O],I=b.start,G=b.count;for(let J=I,at=I+G;J<at;J+=3)d(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const w=new W,M=new W,R=new W,D=new W;function C(O){R.fromBufferAttribute(s,O),D.copy(R);const T=a[O];w.copy(T),w.sub(R.multiplyScalar(R.dot(T))).normalize(),M.crossVectors(D,T);const I=M.dot(l[O])<0?-1:1;o.setXYZW(O,w.x,w.y,w.z,I)}for(let O=0,T=y.length;O<T;++O){const b=y[O],I=b.start,G=b.count;for(let J=I,at=I+G;J<at;J+=3)C(t.getX(J+0)),C(t.getX(J+1)),C(t.getX(J+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new W,r=new W,o=new W,a=new W,l=new W,c=new W,u=new W,f=new W;if(t)for(let h=0,p=t.count;h<p;h+=3){const v=t.getX(h+0),x=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let p=0,v=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let d=0;d<u;d++)h[v++]=c[p++]}return new Nn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new zn,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Iu=new Te,Ui=new lc,zr=new Io,Uu=new W,kr=new W,Hr=new W,Vr=new W,va=new W,Gr=new W,Nu=new W,Wr=new W;class se extends ke{constructor(t=new zn,e=new ld){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(va.fromBufferAttribute(f,t),o?Gr.addScaledVector(va,u):Gr.addScaledVector(va.sub(e),u))}e.add(Gr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(r),Ui.copy(t.ray).recast(t.near),!(zr.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(zr,Uu)===null||Ui.origin.distanceToSquared(Uu)>(t.far-t.near)**2))&&(Iu.copy(r).invert(),Ui.copy(t.ray).applyMatrix4(Iu),!(i.boundingBox!==null&&Ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=h.length;v<x;v++){const m=h[v],d=o[m.materialIndex],y=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,R=w;M<R;M+=3){const D=a.getX(M),C=a.getX(M+1),O=a.getX(M+2);s=Xr(this,d,t,i,c,u,f,D,C,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=Xr(this,o,t,i,c,u,f,y,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=h.length;v<x;v++){const m=h[v],d=o[m.materialIndex],y=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,R=w;M<R;M+=3){const D=M,C=M+1,O=M+2;s=Xr(this,d,t,i,c,u,f,D,C,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=v,d=x;m<d;m+=3){const y=m,w=m+1,M=m+2;s=Xr(this,o,t,i,c,u,f,y,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Av(n,t,e,i,s,r,o,a){let l;if(t.side===sn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Ai,a),l===null)return null;Wr.copy(a),Wr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Wr);return c<e.near||c>e.far?null:{distance:c,point:Wr.clone(),object:n}}function Xr(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,kr),n.getVertexPosition(l,Hr),n.getVertexPosition(c,Vr);const u=Av(n,t,e,i,kr,Hr,Vr,Nu);if(u){const f=new W;En.getBarycoord(Nu,kr,Hr,Vr,f),s&&(u.uv=En.getInterpolatedAttribute(s,a,l,c,f,new Ht)),r&&(u.uv1=En.getInterpolatedAttribute(r,a,l,c,f,new Ht)),o&&(u.normal=En.getInterpolatedAttribute(o,a,l,c,f,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new W,materialIndex:0};En.getNormal(kr,Hr,Vr,h.normal),u.face=h,u.barycoord=f}return u}class gn extends zn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,p=0;v("z","y","x",-1,-1,i,e,t,o,r,0),v("z","y","x",1,-1,i,e,-t,o,r,1),v("x","z","y",1,1,t,i,e,s,o,2),v("x","z","y",1,-1,t,i,-e,s,o,3),v("x","y","z",1,-1,t,e,i,s,r,4),v("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(f,2));function v(x,m,d,y,w,M,R,D,C,O,T){const b=M/C,I=R/O,G=M/2,J=R/2,at=D/2,st=C+1,et=O+1;let nt=0,q=0;const vt=new W;for(let xt=0;xt<et;xt++){const Pt=xt*I-J;for(let Nt=0;Nt<st;Nt++){const Qt=Nt*b-G;vt[x]=Qt*y,vt[m]=Pt*w,vt[d]=at,c.push(vt.x,vt.y,vt.z),vt[x]=0,vt[m]=0,vt[d]=D>0?1:-1,u.push(vt.x,vt.y,vt.z),f.push(Nt/C),f.push(1-xt/O),nt+=1}}for(let xt=0;xt<O;xt++)for(let Pt=0;Pt<C;Pt++){const Nt=h+Pt+st*xt,Qt=h+Pt+st*(xt+1),ee=h+(Pt+1)+st*(xt+1),Yt=h+(Pt+1)+st*xt;l.push(Nt,Qt,Yt),l.push(Qt,ee,Yt),q+=6}a.addGroup(p,q,T),p+=q,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Us(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function qe(n){const t={};for(let e=0;e<n.length;e++){const i=Us(n[e]);for(const s in i)t[s]=i[s]}return t}function wv(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function fd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const Rv={clone:Us,merge:qe};var Cv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends yr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cv,this.fragmentShader=Pv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Us(t.uniforms),this.uniformsGroups=wv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class hd extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new W,Fu=new Ht,Ou=new Ht;class _n extends hd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_r*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(hi.x,hi.y).multiplyScalar(-t/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hi.x,hi.y).multiplyScalar(-t/hi.z)}getViewSize(t,e){return this.getViewBounds(t,Fu,Ou),e.subVectors(Ou,Fu)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(sr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const us=-90,fs=1;class Dv extends ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(us,fs,t,e);s.layers=this.layers,this.add(s);const r=new _n(us,fs,t,e);r.layers=this.layers,this.add(r);const o=new _n(us,fs,t,e);o.layers=this.layers,this.add(o);const a=new _n(us,fs,t,e);a.layers=this.layers,this.add(a);const l=new _n(us,fs,t,e);l.layers=this.layers,this.add(l);const c=new _n(us,fs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===In)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_o)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class dd extends rn{constructor(t=[],e=Ds,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Lv extends $i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new dd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gn(5,5,5),r=new wi({name:"CubemapFromEquirect",uniforms:Us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Mi});r.uniforms.tEquirect.value=e;const o=new se(s,r),a=e.minFilter;return e.minFilter===Wi&&(e.minFilter=Ln),new Dv(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class Ys extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Iv={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Iv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ys;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Uv extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ma=new W,Nv=new W,Fv=new Xt;class gi{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ma.subVectors(i,e).cross(Nv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ma),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Fv.getNormalMatrix(t),s=this.coplanarPoint(Ma).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Io,Ov=new Ht(.5,.5),qr=new W;class uc{constructor(t=new gi,e=new gi,i=new gi,s=new gi,r=new gi,o=new gi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=In,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],v=r[8],x=r[9],m=r[10],d=r[11],y=r[12],w=r[13],M=r[14],R=r[15];if(s[0].setComponents(c-o,p-u,d-v,R-y).normalize(),s[1].setComponents(c+o,p+u,d+v,R+y).normalize(),s[2].setComponents(c+a,p+f,d+x,R+w).normalize(),s[3].setComponents(c-a,p-f,d-x,R-w).normalize(),i)s[4].setComponents(l,h,m,M).normalize(),s[5].setComponents(c-l,p-h,d-m,R-M).normalize();else if(s[4].setComponents(c-l,p-h,d-m,R-M).normalize(),e===In)s[5].setComponents(c+l,p+h,d+m,R+M).normalize();else if(e===_o)s[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){Ni.center.set(0,0,0);const e=Ov.distanceTo(t.center);return Ni.radius=.7071067811865476+e,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(qr.x=s.normal.x>0?t.max.x:t.min.x,qr.y=s.normal.y>0?t.max.y:t.min.y,qr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pd extends rn{constructor(t,e,i=qi,s,r,o,a=Tn,l=Tn,c,u=mr,f=1){if(u!==mr&&u!==gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ac(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class md extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fc extends zn{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new W,u=new Ht;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const p=i+f/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new He(o,3)),this.setAttribute("normal",new He(a,3)),this.setAttribute("uv",new He(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ye extends zn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],p=[];let v=0;const x=[],m=i/2;let d=0;y(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new He(f,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(p,2));function y(){const M=new W,R=new W;let D=0;const C=(e-t)/i;for(let O=0;O<=r;O++){const T=[],b=O/r,I=b*(e-t)+t;for(let G=0;G<=s;G++){const J=G/s,at=J*l+a,st=Math.sin(at),et=Math.cos(at);R.x=I*st,R.y=-b*i+m,R.z=I*et,f.push(R.x,R.y,R.z),M.set(st,C,et).normalize(),h.push(M.x,M.y,M.z),p.push(J,1-b),T.push(v++)}x.push(T)}for(let O=0;O<s;O++)for(let T=0;T<r;T++){const b=x[T][O],I=x[T+1][O],G=x[T+1][O+1],J=x[T][O+1];(t>0||T!==0)&&(u.push(b,I,J),D+=3),(e>0||T!==r-1)&&(u.push(I,G,J),D+=3)}c.addGroup(d,D,0),d+=D}function w(M){const R=v,D=new Ht,C=new W;let O=0;const T=M===!0?t:e,b=M===!0?1:-1;for(let G=1;G<=s;G++)f.push(0,m*b,0),h.push(0,b,0),p.push(.5,.5),v++;const I=v;for(let G=0;G<=s;G++){const at=G/s*l+a,st=Math.cos(at),et=Math.sin(at);C.x=T*et,C.y=m*b,C.z=T*st,f.push(C.x,C.y,C.z),h.push(0,b,0),D.x=st*.5+.5,D.y=et*.5*b+.5,p.push(D.x,D.y),v++}for(let G=0;G<s;G++){const J=R+G,at=I+G;M===!0?u.push(at,at+1,J):u.push(at+1,at,J),O+=3}c.addGroup(d,O,M===!0?1:2),d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Uo extends zn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,p=[],v=[],x=[],m=[];for(let d=0;d<u;d++){const y=d*h-o;for(let w=0;w<c;w++){const M=w*f-r;v.push(M,-y,0),x.push(0,0,1),m.push(w/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<a;y++){const w=y+c*d,M=y+c*(d+1),R=y+1+c*(d+1),D=y+1+c*d;p.push(w,M,D),p.push(M,R,D)}this.setIndex(p),this.setAttribute("position",new He(v,3)),this.setAttribute("normal",new He(x,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uo(t.width,t.height,t.widthSegments,t.heightSegments)}}class hc extends zn{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new W,f=new W,h=new W;for(let p=0;p<=i;p++)for(let v=0;v<=s;v++){const x=v/s*r,m=p/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(x),f.y=(t+e*Math.cos(m))*Math.sin(x),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(v/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=s;v++){const x=(s+1)*p+v-1,m=(s+1)*(p-1)+v-1,d=(s+1)*(p-1)+v,y=(s+1)*p+v;o.push(x,m,y),o.push(m,d,y)}this.setIndex(o),this.setAttribute("position",new He(a,3)),this.setAttribute("normal",new He(l,3)),this.setAttribute("uv",new He(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Bu extends yr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nd,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Bv extends yr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=F0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class zv extends yr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class gd extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Sa=new Te,zu=new W,ku=new W;class kv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=On,this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uc,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;zu.setFromMatrixPosition(t.matrixWorld),e.position.copy(zu),ku.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ku),e.updateMatrixWorld(),Sa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Sa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class _d extends hd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Hv extends kv{constructor(){super(new _d(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hu extends gd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new Hv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Vv extends gd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Gv extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Vu=new Te;class Wv{constructor(t,e,i=0,s=1/0){this.ray=new lc(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new cc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Vu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vu),this}intersectObject(t,e=!0,i=[]){return Dl(t,this,i,e),i.sort(Gu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Dl(t[s],this,i,e);return i.sort(Gu),i}}function Gu(n,t){return n.distance-t.distance}function Dl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Dl(r[o],t,e,!0)}}class Wu{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Xv extends Ki{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Xu(n,t,e,i){const s=qv(i);switch(e){case Jh:return n*t;case td:return n*t/s.components*s.byteLength;case ic:return n*t/s.components*s.byteLength;case ed:return n*t*2/s.components*s.byteLength;case sc:return n*t*2/s.components*s.byteLength;case Qh:return n*t*3/s.components*s.byteLength;case yn:return n*t*4/s.components*s.byteLength;case rc:return n*t*4/s.components*s.byteLength;case eo:case no:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case io:case so:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sl:case ol:return Math.max(n,16)*Math.max(t,8)/4;case il:case rl:return Math.max(n,8)*Math.max(t,8)/2;case al:case ll:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case cl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case hl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case dl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case pl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ml:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case gl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case _l:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case vl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case xl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case El:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case yl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case bl:case Tl:case Al:return Math.ceil(n/4)*Math.ceil(t/4)*16;case wl:case Rl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Cl:case Pl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qv(n){switch(n){case On:case $h:return{byteLength:1,components:1};case dr:case jh:case Er:return{byteLength:2,components:1};case ec:case nc:return{byteLength:2,components:4};case qi:case tc:case Jn:return{byteLength:4,components:1};case Kh:case Zh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ql}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ql);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Yv(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<f.length;p++){const v=f[h],x=f[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++h,f[h]=x)}f.length=h+1;for(let p=0,v=f.length;p<v;p++){const x=f[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var $v=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ex=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ix=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ox=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ax=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,px=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_x=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Mx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ex=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ax=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Px=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ix=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ux=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ox=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$x=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,iM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,aM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_M=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,MM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,SM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,EM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,TM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,CM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,PM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,LM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,NM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,FM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,OM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,BM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,HM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,VM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,GM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const YM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$M=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,eS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,iS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_S=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ES=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,TS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,AS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:$v,alphahash_pars_fragment:jv,alphamap_fragment:Kv,alphamap_pars_fragment:Zv,alphatest_fragment:Jv,alphatest_pars_fragment:Qv,aomap_fragment:tx,aomap_pars_fragment:ex,batching_pars_vertex:nx,batching_vertex:ix,begin_vertex:sx,beginnormal_vertex:rx,bsdfs:ox,iridescence_fragment:ax,bumpmap_pars_fragment:lx,clipping_planes_fragment:cx,clipping_planes_pars_fragment:ux,clipping_planes_pars_vertex:fx,clipping_planes_vertex:hx,color_fragment:dx,color_pars_fragment:px,color_pars_vertex:mx,color_vertex:gx,common:_x,cube_uv_reflection_fragment:vx,defaultnormal_vertex:xx,displacementmap_pars_vertex:Mx,displacementmap_vertex:Sx,emissivemap_fragment:Ex,emissivemap_pars_fragment:yx,colorspace_fragment:bx,colorspace_pars_fragment:Tx,envmap_fragment:Ax,envmap_common_pars_fragment:wx,envmap_pars_fragment:Rx,envmap_pars_vertex:Cx,envmap_physical_pars_fragment:kx,envmap_vertex:Px,fog_vertex:Dx,fog_pars_vertex:Lx,fog_fragment:Ix,fog_pars_fragment:Ux,gradientmap_pars_fragment:Nx,lightmap_pars_fragment:Fx,lights_lambert_fragment:Ox,lights_lambert_pars_fragment:Bx,lights_pars_begin:zx,lights_toon_fragment:Hx,lights_toon_pars_fragment:Vx,lights_phong_fragment:Gx,lights_phong_pars_fragment:Wx,lights_physical_fragment:Xx,lights_physical_pars_fragment:qx,lights_fragment_begin:Yx,lights_fragment_maps:$x,lights_fragment_end:jx,logdepthbuf_fragment:Kx,logdepthbuf_pars_fragment:Zx,logdepthbuf_pars_vertex:Jx,logdepthbuf_vertex:Qx,map_fragment:tM,map_pars_fragment:eM,map_particle_fragment:nM,map_particle_pars_fragment:iM,metalnessmap_fragment:sM,metalnessmap_pars_fragment:rM,morphinstance_vertex:oM,morphcolor_vertex:aM,morphnormal_vertex:lM,morphtarget_pars_vertex:cM,morphtarget_vertex:uM,normal_fragment_begin:fM,normal_fragment_maps:hM,normal_pars_fragment:dM,normal_pars_vertex:pM,normal_vertex:mM,normalmap_pars_fragment:gM,clearcoat_normal_fragment_begin:_M,clearcoat_normal_fragment_maps:vM,clearcoat_pars_fragment:xM,iridescence_pars_fragment:MM,opaque_fragment:SM,packing:EM,premultiplied_alpha_fragment:yM,project_vertex:bM,dithering_fragment:TM,dithering_pars_fragment:AM,roughnessmap_fragment:wM,roughnessmap_pars_fragment:RM,shadowmap_pars_fragment:CM,shadowmap_pars_vertex:PM,shadowmap_vertex:DM,shadowmask_pars_fragment:LM,skinbase_vertex:IM,skinning_pars_vertex:UM,skinning_vertex:NM,skinnormal_vertex:FM,specularmap_fragment:OM,specularmap_pars_fragment:BM,tonemapping_fragment:zM,tonemapping_pars_fragment:kM,transmission_fragment:HM,transmission_pars_fragment:VM,uv_pars_fragment:GM,uv_pars_vertex:WM,uv_vertex:XM,worldpos_vertex:qM,background_vert:YM,background_frag:$M,backgroundCube_vert:jM,backgroundCube_frag:KM,cube_vert:ZM,cube_frag:JM,depth_vert:QM,depth_frag:tS,distanceRGBA_vert:eS,distanceRGBA_frag:nS,equirect_vert:iS,equirect_frag:sS,linedashed_vert:rS,linedashed_frag:oS,meshbasic_vert:aS,meshbasic_frag:lS,meshlambert_vert:cS,meshlambert_frag:uS,meshmatcap_vert:fS,meshmatcap_frag:hS,meshnormal_vert:dS,meshnormal_frag:pS,meshphong_vert:mS,meshphong_frag:gS,meshphysical_vert:_S,meshphysical_frag:vS,meshtoon_vert:xS,meshtoon_frag:MS,points_vert:SS,points_frag:ES,shadow_vert:yS,shadow_frag:bS,sprite_vert:TS,sprite_frag:AS},yt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Dn={basic:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new jt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:qe([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:qe([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new jt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:qe([yt.points,yt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:qe([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:qe([yt.common,yt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:qe([yt.sprite,yt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:qe([yt.common,yt.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:qe([yt.lights,yt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Dn.physical={uniforms:qe([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Yr={r:0,b:0,g:0},Fi=new Bn,wS=new Te;function RS(n,t,e,i,s,r,o){const a=new jt(0);let l=r===!0?0:1,c,u,f=null,h=0,p=null;function v(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function x(w){let M=!1;const R=v(w);R===null?d(a,l):R&&R.isColor&&(d(R,1),M=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,M){const R=v(M);R&&(R.isCubeTexture||R.mapping===Lo)?(u===void 0&&(u=new se(new gn(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:Us(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,C,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Fi.copy(M.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(wS.makeRotationFromEuler(Fi)),u.material.toneMapped=ie.getTransfer(R.colorSpace)!==fe,(f!==R||h!==R.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=R,h=R.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new se(new Uo(2,2),new wi({name:"BackgroundMaterial",uniforms:Us(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ie.getTransfer(R.colorSpace)!==fe,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(f!==R||h!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=R,h=R.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,M){w.getRGB(Yr,fd(n)),i.buffers.color.setClear(Yr.r,Yr.g,Yr.b,M,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,M=1){a.set(w),l=M,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(a,l)},render:x,addToRenderList:m,dispose:y}}function CS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(b,I,G,J,at){let st=!1;const et=f(J,G,I);r!==et&&(r=et,c(r.object)),st=p(b,J,G,at),st&&v(b,J,G,at),at!==null&&t.update(at,n.ELEMENT_ARRAY_BUFFER),(st||o)&&(o=!1,M(b,I,G,J),at!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(at).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function f(b,I,G){const J=G.wireframe===!0;let at=i[b.id];at===void 0&&(at={},i[b.id]=at);let st=at[I.id];st===void 0&&(st={},at[I.id]=st);let et=st[J];return et===void 0&&(et=h(l()),st[J]=et),et}function h(b){const I=[],G=[],J=[];for(let at=0;at<e;at++)I[at]=0,G[at]=0,J[at]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:J,object:b,attributes:{},index:null}}function p(b,I,G,J){const at=r.attributes,st=I.attributes;let et=0;const nt=G.getAttributes();for(const q in nt)if(nt[q].location>=0){const xt=at[q];let Pt=st[q];if(Pt===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Pt=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Pt=b.instanceColor)),xt===void 0||xt.attribute!==Pt||Pt&&xt.data!==Pt.data)return!0;et++}return r.attributesNum!==et||r.index!==J}function v(b,I,G,J){const at={},st=I.attributes;let et=0;const nt=G.getAttributes();for(const q in nt)if(nt[q].location>=0){let xt=st[q];xt===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor));const Pt={};Pt.attribute=xt,xt&&xt.data&&(Pt.data=xt.data),at[q]=Pt,et++}r.attributes=at,r.attributesNum=et,r.index=J}function x(){const b=r.newAttributes;for(let I=0,G=b.length;I<G;I++)b[I]=0}function m(b){d(b,0)}function d(b,I){const G=r.newAttributes,J=r.enabledAttributes,at=r.attributeDivisors;G[b]=1,J[b]===0&&(n.enableVertexAttribArray(b),J[b]=1),at[b]!==I&&(n.vertexAttribDivisor(b,I),at[b]=I)}function y(){const b=r.newAttributes,I=r.enabledAttributes;for(let G=0,J=I.length;G<J;G++)I[G]!==b[G]&&(n.disableVertexAttribArray(G),I[G]=0)}function w(b,I,G,J,at,st,et){et===!0?n.vertexAttribIPointer(b,I,G,at,st):n.vertexAttribPointer(b,I,G,J,at,st)}function M(b,I,G,J){x();const at=J.attributes,st=G.getAttributes(),et=I.defaultAttributeValues;for(const nt in st){const q=st[nt];if(q.location>=0){let vt=at[nt];if(vt===void 0&&(nt==="instanceMatrix"&&b.instanceMatrix&&(vt=b.instanceMatrix),nt==="instanceColor"&&b.instanceColor&&(vt=b.instanceColor)),vt!==void 0){const xt=vt.normalized,Pt=vt.itemSize,Nt=t.get(vt);if(Nt===void 0)continue;const Qt=Nt.buffer,ee=Nt.type,Yt=Nt.bytesPerElement,rt=ee===n.INT||ee===n.UNSIGNED_INT||vt.gpuType===tc;if(vt.isInterleavedBufferAttribute){const L=vt.data,B=L.stride,k=vt.offset;if(L.isInstancedInterleavedBuffer){for(let j=0;j<q.locationSize;j++)d(q.location+j,L.meshPerAttribute);b.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let j=0;j<q.locationSize;j++)m(q.location+j);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let j=0;j<q.locationSize;j++)w(q.location+j,Pt/q.locationSize,ee,xt,B*Yt,(k+Pt/q.locationSize*j)*Yt,rt)}else{if(vt.isInstancedBufferAttribute){for(let L=0;L<q.locationSize;L++)d(q.location+L,vt.meshPerAttribute);b.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let L=0;L<q.locationSize;L++)m(q.location+L);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let L=0;L<q.locationSize;L++)w(q.location+L,Pt/q.locationSize,ee,xt,Pt*Yt,Pt/q.locationSize*L*Yt,rt)}}else if(et!==void 0){const xt=et[nt];if(xt!==void 0)switch(xt.length){case 2:n.vertexAttrib2fv(q.location,xt);break;case 3:n.vertexAttrib3fv(q.location,xt);break;case 4:n.vertexAttrib4fv(q.location,xt);break;default:n.vertexAttrib1fv(q.location,xt)}}}}y()}function R(){O();for(const b in i){const I=i[b];for(const G in I){const J=I[G];for(const at in J)u(J[at].object),delete J[at];delete I[G]}delete i[b]}}function D(b){if(i[b.id]===void 0)return;const I=i[b.id];for(const G in I){const J=I[G];for(const at in J)u(J[at].object),delete J[at];delete I[G]}delete i[b.id]}function C(b){for(const I in i){const G=i[I];if(G[b.id]===void 0)continue;const J=G[b.id];for(const at in J)u(J[at].object),delete J[at];delete G[b.id]}}function O(){T(),o=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:O,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:D,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function PS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v];e.update(p,i,1)}function l(c,u,f,h){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],u[v],h[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let v=0;for(let x=0;x<f;x++)v+=u[x]*h[x];e.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function DS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==yn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const O=C===Er&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==On&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Jn&&!O)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=v>0,D=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:R,maxSamples:D}}function LS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new gi,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){const v=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||v===null||v.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,w=y*4;let M=d.clippingState||null;l.value=M,M=u(v,h,w,p);for(let R=0;R!==w;++R)M[R]=e[R];d.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,p,v){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,v!==!0||m===null){const d=p+x*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let w=0,M=p;w!==x;++w,M+=4)o.copy(f[w]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function IS(n){let t=new WeakMap;function e(o,a){return a===Qa?o.mapping=Ds:a===tl&&(o.mapping=Ls),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qa||a===tl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Lv(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const _s=4,qu=[.125,.215,.35,.446,.526,.582],Hi=20,Ea=new _d,Yu=new jt;let ya=null,ba=0,Ta=0,Aa=!1;const zi=(1+Math.sqrt(5))/2,hs=1/zi,$u=[new W(-zi,hs,0),new W(zi,hs,0),new W(-hs,0,zi),new W(hs,0,zi),new W(0,zi,-hs),new W(0,zi,hs),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)],US=new W;class ju{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=US}=r;ya=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ya,ba,Ta),this._renderer.xr.enabled=Aa,t.scissorTest=!1,$r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ds||t.mapping===Ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ya=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:Er,format:yn,colorSpace:Is,depthBuffer:!1},s=Ku(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ku(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=NS(r)),this._blurMaterial=FS(r,t,e)}return s}_compileMaterial(t){const e=new se(this._lodPlanes[0],t);this._renderer.compile(e,Ea)}_sceneToCubeUV(t,e,i,s,r){const l=new _n(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Yu),f.toneMapping=Si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));const x=new ld({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),m=new se(new gn,x);let d=!1;const y=t.background;y?y.isColor&&(x.color.copy(y),t.background=null,d=!0):(x.color.copy(Yu),d=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[w]));const R=this._cubeSize;$r(s,M*R,w>2?R:0,R,R),f.setRenderTarget(s),d&&f.render(m,l),f.render(t,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=h,t.background=y}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ds||t.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new se(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;$r(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ea)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=$u[(s-r-1)%$u.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new se(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),x=r/v,m=isFinite(r)?1+Math.floor(u*x):Hi;m>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const d=[];let y=0;for(let C=0;C<Hi;++C){const O=C/x,T=Math.exp(-O*O/2);d.push(T),C===0?y+=T:C<m&&(y+=2*T)}for(let C=0;C<d.length;C++)d[C]=d[C]/y;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=v,h.mipInt.value=w-i;const M=this._sizeLods[s],R=3*M*(s>w-_s?s-w+_s:0),D=4*(this._cubeSize-M);$r(e,R,D,3*M,2*M),l.setRenderTarget(e),l.render(f,Ea)}}function NS(n){const t=[],e=[],i=[];let s=n;const r=n-_s+1+qu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-_s?l=qu[o-n+_s-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,x=3,m=2,d=1,y=new Float32Array(x*v*p),w=new Float32Array(m*v*p),M=new Float32Array(d*v*p);for(let D=0;D<p;D++){const C=D%3*2/3-1,O=D>2?0:-1,T=[C,O,0,C+2/3,O,0,C+2/3,O+1,0,C,O,0,C+2/3,O+1,0,C,O+1,0];y.set(T,x*v*D),w.set(h,m*v*D);const b=[D,D,D,D,D,D];M.set(b,d*v*D)}const R=new zn;R.setAttribute("position",new Nn(y,x)),R.setAttribute("uv",new Nn(w,m)),R.setAttribute("faceIndex",new Nn(M,d)),t.push(R),s>_s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ku(n,t,e){const i=new $i(n,t,e);return i.texture.mapping=Lo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $r(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function FS(n,t,e){const i=new Float32Array(Hi),s=new W(0,1,0);return new wi({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Zu(){return new wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ju(){return new wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function dc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function OS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Qa||l===tl,u=l===Ds||l===Ls;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new ju(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new ju(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function BS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&vr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function zS(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const v in h.attributes)t.remove(h.attributes[v]);h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(t.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const p in h)t.update(h[p],n.ARRAY_BUFFER)}function c(f){const h=[],p=f.index,v=f.attributes.position;let x=0;if(p!==null){const y=p.array;x=p.version;for(let w=0,M=y.length;w<M;w+=3){const R=y[w+0],D=y[w+1],C=y[w+2];h.push(R,D,D,C,C,R)}}else if(v!==void 0){const y=v.array;x=v.version;for(let w=0,M=y.length/3-1;w<M;w+=3){const R=w+0,D=w+1,C=w+2;h.push(R,D,D,C,C,R)}}else return;const m=new(rd(h)?ud:cd)(h,1);m.version=x;const d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function kS(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,r,h*o),e.update(p,i,1)}function c(h,p,v){v!==0&&(n.drawElementsInstanced(i,p,r,h*o,v),e.update(p,i,v))}function u(h,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,h,0,v);let m=0;for(let d=0;d<v;d++)m+=p[d];e.update(m,i,1)}function f(h,p,v,x){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,h,0,x,0,v);let d=0;for(let y=0;y<v;y++)d+=p[y]*x[y];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function HS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function VS(n,t,e){const i=new WeakMap,s=new be;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let b=function(){O.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var p=b;h!==void 0&&h.texture.dispose();const v=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let M=0;v===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let R=a.attributes.position.count*M,D=1;R>t.maxTextureSize&&(D=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const C=new Float32Array(R*D*4*f),O=new od(C,R,D,f);O.type=Jn,O.needsUpdate=!0;const T=M*4;for(let I=0;I<f;I++){const G=d[I],J=y[I],at=w[I],st=R*D*4*I;for(let et=0;et<G.count;et++){const nt=et*T;v===!0&&(s.fromBufferAttribute(G,et),C[st+nt+0]=s.x,C[st+nt+1]=s.y,C[st+nt+2]=s.z,C[st+nt+3]=0),x===!0&&(s.fromBufferAttribute(J,et),C[st+nt+4]=s.x,C[st+nt+5]=s.y,C[st+nt+6]=s.z,C[st+nt+7]=0),m===!0&&(s.fromBufferAttribute(at,et),C[st+nt+8]=s.x,C[st+nt+9]=s.y,C[st+nt+10]=s.z,C[st+nt+11]=at.itemSize===4?s.w:1)}}h={count:f,texture:O,size:new Ht(R,D)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const x=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function GS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=t.get(l,u);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const xd=new rn,Qu=new pd(1,1),Md=new od,Sd=new mv,Ed=new dd,tf=[],ef=[],nf=new Float32Array(16),sf=new Float32Array(9),rf=new Float32Array(4);function Os(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=tf[s];if(r===void 0&&(r=new Float32Array(s),tf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function De(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function No(n,t){let e=ef[t];e===void 0&&(e=new Int32Array(t),ef[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function WS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function XS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function qS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function YS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function $S(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(De(e,i))return;rf.set(i),n.uniformMatrix2fv(this.addr,!1,rf),Le(e,i)}}function jS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(De(e,i))return;sf.set(i),n.uniformMatrix3fv(this.addr,!1,sf),Le(e,i)}}function KS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(De(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(De(e,i))return;nf.set(i),n.uniformMatrix4fv(this.addr,!1,nf),Le(e,i)}}function ZS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function JS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function QS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function tE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function eE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function nE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function iE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function sE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function rE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Qu.compareFunction=id,r=Qu):r=xd,e.setTexture2D(t||r,s)}function oE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Sd,s)}function aE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Ed,s)}function lE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Md,s)}function cE(n){switch(n){case 5126:return WS;case 35664:return XS;case 35665:return qS;case 35666:return YS;case 35674:return $S;case 35675:return jS;case 35676:return KS;case 5124:case 35670:return ZS;case 35667:case 35671:return JS;case 35668:case 35672:return QS;case 35669:case 35673:return tE;case 5125:return eE;case 36294:return nE;case 36295:return iE;case 36296:return sE;case 35678:case 36198:case 36298:case 36306:case 35682:return rE;case 35679:case 36299:case 36307:return oE;case 35680:case 36300:case 36308:case 36293:return aE;case 36289:case 36303:case 36311:case 36292:return lE}}function uE(n,t){n.uniform1fv(this.addr,t)}function fE(n,t){const e=Os(t,this.size,2);n.uniform2fv(this.addr,e)}function hE(n,t){const e=Os(t,this.size,3);n.uniform3fv(this.addr,e)}function dE(n,t){const e=Os(t,this.size,4);n.uniform4fv(this.addr,e)}function pE(n,t){const e=Os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function mE(n,t){const e=Os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function gE(n,t){const e=Os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function _E(n,t){n.uniform1iv(this.addr,t)}function vE(n,t){n.uniform2iv(this.addr,t)}function xE(n,t){n.uniform3iv(this.addr,t)}function ME(n,t){n.uniform4iv(this.addr,t)}function SE(n,t){n.uniform1uiv(this.addr,t)}function EE(n,t){n.uniform2uiv(this.addr,t)}function yE(n,t){n.uniform3uiv(this.addr,t)}function bE(n,t){n.uniform4uiv(this.addr,t)}function TE(n,t,e){const i=this.cache,s=t.length,r=No(e,s);De(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||xd,r[o])}function AE(n,t,e){const i=this.cache,s=t.length,r=No(e,s);De(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Sd,r[o])}function wE(n,t,e){const i=this.cache,s=t.length,r=No(e,s);De(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ed,r[o])}function RE(n,t,e){const i=this.cache,s=t.length,r=No(e,s);De(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Md,r[o])}function CE(n){switch(n){case 5126:return uE;case 35664:return fE;case 35665:return hE;case 35666:return dE;case 35674:return pE;case 35675:return mE;case 35676:return gE;case 5124:case 35670:return _E;case 35667:case 35671:return vE;case 35668:case 35672:return xE;case 35669:case 35673:return ME;case 5125:return SE;case 36294:return EE;case 36295:return yE;case 36296:return bE;case 35678:case 36198:case 36298:case 36306:case 35682:return TE;case 35679:case 36299:case 36307:return AE;case 35680:case 36300:case 36308:case 36293:return wE;case 36289:case 36303:case 36311:case 36292:return RE}}class PE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=cE(e.type)}}class DE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=CE(e.type)}}class LE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function of(n,t){n.seq.push(t),n.map[t.id]=t}function IE(n,t,e){const i=n.name,s=i.length;for(wa.lastIndex=0;;){const r=wa.exec(i),o=wa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){of(e,c===void 0?new PE(a,n,t):new DE(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new LE(a),of(e,f)),e=f}}}class ro{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);IE(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function af(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const UE=37297;let NE=0;function FE(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const lf=new Xt;function OE(n){ie._getMatrix(lf,ie.workingColorSpace,n);const t=`mat3( ${lf.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(n)){case go:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function cf(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+FE(n.getShaderSource(t),a)}else return r}function BE(n,t){const e=OE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function zE(n,t){let e;switch(t){case R0:e="Linear";break;case C0:e="Reinhard";break;case P0:e="Cineon";break;case D0:e="ACESFilmic";break;case I0:e="AgX";break;case U0:e="Neutral";break;case L0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const jr=new W;function kE(){ie.getLuminanceCoefficients(jr);const n=jr.x.toFixed(4),t=jr.y.toFixed(4),e=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function VE(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function GE(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function $s(n){return n!==""}function uf(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ff(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const WE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(n){return n.replace(WE,qE)}const XE=new Map;function qE(n,t){let e=$t[t];if(e===void 0){const i=XE.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ll(e)}const YE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hf(n){return n.replace(YE,$E)}function $E(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function df(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function jE(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===a0?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function KE(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ds:case Ls:t="ENVMAP_TYPE_CUBE";break;case Lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ZE(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ls:t="ENVMAP_MODE_REFRACTION";break}return t}function JE(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qh:t="ENVMAP_BLENDING_MULTIPLY";break;case A0:t="ENVMAP_BLENDING_MIX";break;case w0:t="ENVMAP_BLENDING_ADD";break}return t}function QE(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function ty(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=jE(e),c=KE(e),u=ZE(e),f=JE(e),h=QE(e),p=HE(e),v=VE(r),x=s.createProgram();let m,d,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter($s).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter($s).join(`
`),d.length>0&&(d+=`
`)):(m=[df(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),d=[df(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?$t.tonemapping_pars_fragment:"",e.toneMapping!==Si?zE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,BE("linearToOutputTexel",e.outputColorSpace),kE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($s).join(`
`)),o=Ll(o),o=uf(o,e),o=ff(o,e),a=Ll(a),a=uf(a,e),a=ff(a,e),o=hf(o),a=hf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=y+m+o,M=y+d+a,R=af(s,s.VERTEX_SHADER,w),D=af(s,s.FRAGMENT_SHADER,M);s.attachShader(x,R),s.attachShader(x,D),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(I){if(n.debug.checkShaderErrors){const G=s.getProgramInfoLog(x)||"",J=s.getShaderInfoLog(R)||"",at=s.getShaderInfoLog(D)||"",st=G.trim(),et=J.trim(),nt=at.trim();let q=!0,vt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,R,D);else{const xt=cf(s,R,"vertex"),Pt=cf(s,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+st+`
`+xt+`
`+Pt)}else st!==""?console.warn("THREE.WebGLProgram: Program Info Log:",st):(et===""||nt==="")&&(vt=!1);vt&&(I.diagnostics={runnable:q,programLog:st,vertexShader:{log:et,prefix:m},fragmentShader:{log:nt,prefix:d}})}s.deleteShader(R),s.deleteShader(D),O=new ro(s,x),T=GE(s,x)}let O;this.getUniforms=function(){return O===void 0&&C(this),O};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,UE)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=NE++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=D,this}let ey=0;class ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new iy(t),e.set(t,i)),i}}class iy{constructor(t){this.id=ey++,this.code=t,this.usedTimes=0}}function sy(n,t,e,i,s,r,o){const a=new cc,l=new ny,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,b,I,G,J){const at=G.fog,st=J.geometry,et=T.isMeshStandardMaterial?G.environment:null,nt=(T.isMeshStandardMaterial?e:t).get(T.envMap||et),q=nt&&nt.mapping===Lo?nt.image.height:null,vt=v[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const xt=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,Pt=xt!==void 0?xt.length:0;let Nt=0;st.morphAttributes.position!==void 0&&(Nt=1),st.morphAttributes.normal!==void 0&&(Nt=2),st.morphAttributes.color!==void 0&&(Nt=3);let Qt,ee,Yt,rt;if(vt){const re=Dn[vt];Qt=re.vertexShader,ee=re.fragmentShader}else Qt=T.vertexShader,ee=T.fragmentShader,l.update(T),Yt=l.getVertexShaderID(T),rt=l.getFragmentShaderID(T);const L=n.getRenderTarget(),B=n.state.buffers.depth.getReversed(),k=J.isInstancedMesh===!0,j=J.isBatchedMesh===!0,ft=!!T.map,A=!!T.matcap,g=!!nt,U=!!T.aoMap,V=!!T.lightMap,X=!!T.bumpMap,F=!!T.normalMap,ht=!!T.displacementMap,K=!!T.emissiveMap,ot=!!T.metalnessMap,lt=!!T.roughnessMap,Mt=T.anisotropy>0,S=T.clearcoat>0,_=T.dispersion>0,N=T.iridescence>0,$=T.sheen>0,it=T.transmission>0,Y=Mt&&!!T.anisotropyMap,bt=S&&!!T.clearcoatMap,pt=S&&!!T.clearcoatNormalMap,Tt=S&&!!T.clearcoatRoughnessMap,Rt=N&&!!T.iridescenceMap,mt=N&&!!T.iridescenceThicknessMap,St=$&&!!T.sheenColorMap,Dt=$&&!!T.sheenRoughnessMap,Ct=!!T.specularMap,Et=!!T.specularColorMap,kt=!!T.specularIntensityMap,P=it&&!!T.transmissionMap,ct=it&&!!T.thicknessMap,dt=!!T.gradientMap,At=!!T.alphaMap,gt=T.alphaTest>0,ut=!!T.alphaHash,Ut=!!T.extensions;let Gt=Si;T.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Gt=n.toneMapping);const pe={shaderID:vt,shaderType:T.type,shaderName:T.name,vertexShader:Qt,fragmentShader:ee,defines:T.defines,customVertexShaderID:Yt,customFragmentShaderID:rt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:j,batchingColor:j&&J._colorsTexture!==null,instancing:k,instancingColor:k&&J.instanceColor!==null,instancingMorph:k&&J.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:L===null?n.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Is,alphaToCoverage:!!T.alphaToCoverage,map:ft,matcap:A,envMap:g,envMapMode:g&&nt.mapping,envMapCubeUVHeight:q,aoMap:U,lightMap:V,bumpMap:X,normalMap:F,displacementMap:h&&ht,emissiveMap:K,normalMapObjectSpace:F&&T.normalMapType===B0,normalMapTangentSpace:F&&T.normalMapType===nd,metalnessMap:ot,roughnessMap:lt,anisotropy:Mt,anisotropyMap:Y,clearcoat:S,clearcoatMap:bt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Tt,dispersion:_,iridescence:N,iridescenceMap:Rt,iridescenceThicknessMap:mt,sheen:$,sheenColorMap:St,sheenRoughnessMap:Dt,specularMap:Ct,specularColorMap:Et,specularIntensityMap:kt,transmission:it,transmissionMap:P,thicknessMap:ct,gradientMap:dt,opaque:T.transparent===!1&&T.blending===Ts&&T.alphaToCoverage===!1,alphaMap:At,alphaTest:gt,alphaHash:ut,combine:T.combine,mapUv:ft&&x(T.map.channel),aoMapUv:U&&x(T.aoMap.channel),lightMapUv:V&&x(T.lightMap.channel),bumpMapUv:X&&x(T.bumpMap.channel),normalMapUv:F&&x(T.normalMap.channel),displacementMapUv:ht&&x(T.displacementMap.channel),emissiveMapUv:K&&x(T.emissiveMap.channel),metalnessMapUv:ot&&x(T.metalnessMap.channel),roughnessMapUv:lt&&x(T.roughnessMap.channel),anisotropyMapUv:Y&&x(T.anisotropyMap.channel),clearcoatMapUv:bt&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:pt&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:St&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(T.sheenRoughnessMap.channel),specularMapUv:Ct&&x(T.specularMap.channel),specularColorMapUv:Et&&x(T.specularColorMap.channel),specularIntensityMapUv:kt&&x(T.specularIntensityMap.channel),transmissionMapUv:P&&x(T.transmissionMap.channel),thicknessMapUv:ct&&x(T.thicknessMap.channel),alphaMapUv:At&&x(T.alphaMap.channel),vertexTangents:!!st.attributes.tangent&&(F||Mt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,pointsUvs:J.isPoints===!0&&!!st.attributes.uv&&(ft||At),fog:!!at,useFog:T.fog===!0,fogExp2:!!at&&at.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:B,skinning:J.isSkinnedMesh===!0,morphTargets:st.morphAttributes.position!==void 0,morphNormals:st.morphAttributes.normal!==void 0,morphColors:st.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Nt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Gt,decodeVideoTexture:ft&&T.map.isVideoTexture===!0&&ie.getTransfer(T.map.colorSpace)===fe,decodeVideoTextureEmissive:K&&T.emissiveMap.isVideoTexture===!0&&ie.getTransfer(T.emissiveMap.colorSpace)===fe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Zn,flipSided:T.side===sn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ut&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&T.extensions.multiDraw===!0||j)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return pe.vertexUv1s=c.has(1),pe.vertexUv2s=c.has(2),pe.vertexUv3s=c.has(3),c.clear(),pe}function d(T){const b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)b.push(I),b.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(y(b,T),w(b,T),b.push(n.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function y(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function w(T,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),T.push(a.mask)}function M(T){const b=v[T.type];let I;if(b){const G=Dn[b];I=Rv.clone(G.uniforms)}else I=T.uniforms;return I}function R(T,b){let I;for(let G=0,J=u.length;G<J;G++){const at=u[G];if(at.cacheKey===b){I=at,++I.usedTimes;break}}return I===void 0&&(I=new ty(n,b,T,r),u.push(I)),I}function D(T){if(--T.usedTimes===0){const b=u.indexOf(T);u[b]=u[u.length-1],u.pop(),T.destroy()}}function C(T){l.remove(T)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:R,releaseProgram:D,releaseShaderCache:C,programs:u,dispose:O}}function ry(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function oy(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function pf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function mf(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f,h,p,v,x,m){let d=n[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:v,renderOrder:f.renderOrder,z:x,group:m},n[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=v,d.renderOrder=f.renderOrder,d.z=x,d.group=m),t++,d}function a(f,h,p,v,x,m){const d=o(f,h,p,v,x,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(f,h,p,v,x,m){const d=o(f,h,p,v,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(f,h){e.length>1&&e.sort(f||oy),i.length>1&&i.sort(h||pf),s.length>1&&s.sort(h||pf)}function u(){for(let f=t,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function ay(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new mf,n.set(i,[o])):s>=r.length?(o=new mf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function ly(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new W,color:new jt};break;case"SpotLight":e={position:new W,direction:new W,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new W,halfWidth:new W,halfHeight:new W};break}return n[t.id]=e,e}}}function cy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let uy=0;function fy(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function hy(n){const t=new ly,e=cy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new Te,o=new Te;function a(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,v=0,x=0,m=0,d=0,y=0,w=0,M=0,R=0,D=0,C=0;c.sort(fy);for(let T=0,b=c.length;T<b;T++){const I=c[T],G=I.color,J=I.intensity,at=I.distance,st=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=G.r*J,f+=G.g*J,h+=G.b*J;else if(I.isLightProbe){for(let et=0;et<9;et++)i.probe[et].addScaledVector(I.sh.coefficients[et],J);C++}else if(I.isDirectionalLight){const et=t.get(I);if(et.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const nt=I.shadow,q=e.get(I);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,i.directionalShadow[p]=q,i.directionalShadowMap[p]=st,i.directionalShadowMatrix[p]=I.shadow.matrix,y++}i.directional[p]=et,p++}else if(I.isSpotLight){const et=t.get(I);et.position.setFromMatrixPosition(I.matrixWorld),et.color.copy(G).multiplyScalar(J),et.distance=at,et.coneCos=Math.cos(I.angle),et.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),et.decay=I.decay,i.spot[x]=et;const nt=I.shadow;if(I.map&&(i.spotLightMap[R]=I.map,R++,nt.updateMatrices(I),I.castShadow&&D++),i.spotLightMatrix[x]=nt.matrix,I.castShadow){const q=e.get(I);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,i.spotShadow[x]=q,i.spotShadowMap[x]=st,M++}x++}else if(I.isRectAreaLight){const et=t.get(I);et.color.copy(G).multiplyScalar(J),et.halfWidth.set(I.width*.5,0,0),et.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=et,m++}else if(I.isPointLight){const et=t.get(I);if(et.color.copy(I.color).multiplyScalar(I.intensity),et.distance=I.distance,et.decay=I.decay,I.castShadow){const nt=I.shadow,q=e.get(I);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,q.shadowCameraNear=nt.camera.near,q.shadowCameraFar=nt.camera.far,i.pointShadow[v]=q,i.pointShadowMap[v]=st,i.pointShadowMatrix[v]=I.shadow.matrix,w++}i.point[v]=et,v++}else if(I.isHemisphereLight){const et=t.get(I);et.skyColor.copy(I.color).multiplyScalar(J),et.groundColor.copy(I.groundColor).multiplyScalar(J),i.hemi[d]=et,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const O=i.hash;(O.directionalLength!==p||O.pointLength!==v||O.spotLength!==x||O.rectAreaLength!==m||O.hemiLength!==d||O.numDirectionalShadows!==y||O.numPointShadows!==w||O.numSpotShadows!==M||O.numSpotMaps!==R||O.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+R-D,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=C,O.directionalLength=p,O.pointLength=v,O.spotLength=x,O.rectAreaLength=m,O.hemiLength=d,O.numDirectionalShadows=y,O.numPointShadows=w,O.numSpotShadows=M,O.numSpotMaps=R,O.numLightProbes=C,i.version=uy++)}function l(c,u){let f=0,h=0,p=0,v=0,x=0;const m=u.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const w=c[d];if(w.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){const M=i.hemi[x];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function gf(n){const t=new hy(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function dy(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new gf(n),t.set(s,[a])):r>=o.length?(a=new gf(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const py=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,my=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gy(n,t,e){let i=new uc;const s=new Ht,r=new Ht,o=new be,a=new Bv({depthPacking:O0}),l=new zv,c={},u=e.maxTextureSize,f={[Ai]:sn,[sn]:Ai,[Zn]:Zn},h=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:py,fragmentShader:my}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new zn;v.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new se(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xh;let d=this.type;this.render=function(D,C,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;const T=n.getRenderTarget(),b=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),G=n.state;G.setBlending(Mi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const J=d!==$n&&this.type===$n,at=d===$n&&this.type!==$n;for(let st=0,et=D.length;st<et;st++){const nt=D[st],q=nt.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const vt=q.getFrameExtents();if(s.multiply(vt),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/vt.x),s.x=r.x*vt.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/vt.y),s.y=r.y*vt.y,q.mapSize.y=r.y)),q.map===null||J===!0||at===!0){const Pt=this.type!==$n?{minFilter:Tn,magFilter:Tn}:{};q.map!==null&&q.map.dispose(),q.map=new $i(s.x,s.y,Pt),q.map.texture.name=nt.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const xt=q.getViewportCount();for(let Pt=0;Pt<xt;Pt++){const Nt=q.getViewport(Pt);o.set(r.x*Nt.x,r.y*Nt.y,r.x*Nt.z,r.y*Nt.w),G.viewport(o),q.updateMatrices(nt,Pt),i=q.getFrustum(),M(C,O,q.camera,nt,this.type)}q.isPointLightShadow!==!0&&this.type===$n&&y(q,O),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(T,b,I)};function y(D,C){const O=t.update(x);h.defines.VSM_SAMPLES!==D.blurSamples&&(h.defines.VSM_SAMPLES=D.blurSamples,p.defines.VSM_SAMPLES=D.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new $i(s.x,s.y)),h.uniforms.shadow_pass.value=D.map.texture,h.uniforms.resolution.value=D.mapSize,h.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(C,null,O,h,x,null),p.uniforms.shadow_pass.value=D.mapPass.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(C,null,O,p,x,null)}function w(D,C,O,T){let b=null;const I=O.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(I!==void 0)b=I;else if(b=O.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const G=b.uuid,J=C.uuid;let at=c[G];at===void 0&&(at={},c[G]=at);let st=at[J];st===void 0&&(st=b.clone(),at[J]=st,C.addEventListener("dispose",R)),b=st}if(b.visible=C.visible,b.wireframe=C.wireframe,T===$n?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:f[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,O.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const G=n.properties.get(b);G.light=O}return b}function M(D,C,O,T,b){if(D.visible===!1)return;if(D.layers.test(C.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&b===$n)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,D.matrixWorld);const J=t.update(D),at=D.material;if(Array.isArray(at)){const st=J.groups;for(let et=0,nt=st.length;et<nt;et++){const q=st[et],vt=at[q.materialIndex];if(vt&&vt.visible){const xt=w(D,vt,T,b);D.onBeforeShadow(n,D,C,O,J,xt,q),n.renderBufferDirect(O,null,J,xt,D,q),D.onAfterShadow(n,D,C,O,J,xt,q)}}}else if(at.visible){const st=w(D,at,T,b);D.onBeforeShadow(n,D,C,O,J,st,null),n.renderBufferDirect(O,null,J,st,D,null),D.onAfterShadow(n,D,C,O,J,st,null)}}const G=D.children;for(let J=0,at=G.length;J<at;J++)M(G[J],C,O,T,b)}function R(D){D.target.removeEventListener("dispose",R);for(const O in c){const T=c[O],b=D.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}const _y={[qa]:Ya,[$a]:Za,[ja]:Ja,[Ps]:Ka,[Ya]:qa,[Za]:$a,[Ja]:ja,[Ka]:Ps};function vy(n,t){function e(){let P=!1;const ct=new be;let dt=null;const At=new be(0,0,0,0);return{setMask:function(gt){dt!==gt&&!P&&(n.colorMask(gt,gt,gt,gt),dt=gt)},setLocked:function(gt){P=gt},setClear:function(gt,ut,Ut,Gt,pe){pe===!0&&(gt*=Gt,ut*=Gt,Ut*=Gt),ct.set(gt,ut,Ut,Gt),At.equals(ct)===!1&&(n.clearColor(gt,ut,Ut,Gt),At.copy(ct))},reset:function(){P=!1,dt=null,At.set(-1,0,0,0)}}}function i(){let P=!1,ct=!1,dt=null,At=null,gt=null;return{setReversed:function(ut){if(ct!==ut){const Ut=t.get("EXT_clip_control");ut?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),ct=ut;const Gt=gt;gt=null,this.setClear(Gt)}},getReversed:function(){return ct},setTest:function(ut){ut?L(n.DEPTH_TEST):B(n.DEPTH_TEST)},setMask:function(ut){dt!==ut&&!P&&(n.depthMask(ut),dt=ut)},setFunc:function(ut){if(ct&&(ut=_y[ut]),At!==ut){switch(ut){case qa:n.depthFunc(n.NEVER);break;case Ya:n.depthFunc(n.ALWAYS);break;case $a:n.depthFunc(n.LESS);break;case Ps:n.depthFunc(n.LEQUAL);break;case ja:n.depthFunc(n.EQUAL);break;case Ka:n.depthFunc(n.GEQUAL);break;case Za:n.depthFunc(n.GREATER);break;case Ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}At=ut}},setLocked:function(ut){P=ut},setClear:function(ut){gt!==ut&&(ct&&(ut=1-ut),n.clearDepth(ut),gt=ut)},reset:function(){P=!1,dt=null,At=null,gt=null,ct=!1}}}function s(){let P=!1,ct=null,dt=null,At=null,gt=null,ut=null,Ut=null,Gt=null,pe=null;return{setTest:function(re){P||(re?L(n.STENCIL_TEST):B(n.STENCIL_TEST))},setMask:function(re){ct!==re&&!P&&(n.stencilMask(re),ct=re)},setFunc:function(re,kn,wn){(dt!==re||At!==kn||gt!==wn)&&(n.stencilFunc(re,kn,wn),dt=re,At=kn,gt=wn)},setOp:function(re,kn,wn){(ut!==re||Ut!==kn||Gt!==wn)&&(n.stencilOp(re,kn,wn),ut=re,Ut=kn,Gt=wn)},setLocked:function(re){P=re},setClear:function(re){pe!==re&&(n.clearStencil(re),pe=re)},reset:function(){P=!1,ct=null,dt=null,At=null,gt=null,ut=null,Ut=null,Gt=null,pe=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,p=[],v=null,x=!1,m=null,d=null,y=null,w=null,M=null,R=null,D=null,C=new jt(0,0,0),O=0,T=!1,b=null,I=null,G=null,J=null,at=null;const st=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let et=!1,nt=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(q)[1]),et=nt>=1):q.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),et=nt>=2);let vt=null,xt={};const Pt=n.getParameter(n.SCISSOR_BOX),Nt=n.getParameter(n.VIEWPORT),Qt=new be().fromArray(Pt),ee=new be().fromArray(Nt);function Yt(P,ct,dt,At){const gt=new Uint8Array(4),ut=n.createTexture();n.bindTexture(P,ut),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ut=0;Ut<dt;Ut++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(ct,0,n.RGBA,1,1,At,0,n.RGBA,n.UNSIGNED_BYTE,gt):n.texImage2D(ct+Ut,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,gt);return ut}const rt={};rt[n.TEXTURE_2D]=Yt(n.TEXTURE_2D,n.TEXTURE_2D,1),rt[n.TEXTURE_CUBE_MAP]=Yt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[n.TEXTURE_2D_ARRAY]=Yt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),rt[n.TEXTURE_3D]=Yt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),L(n.DEPTH_TEST),o.setFunc(Ps),X(!1),F(du),L(n.CULL_FACE),U(Mi);function L(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function B(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function k(P,ct){return f[P]!==ct?(n.bindFramebuffer(P,ct),f[P]=ct,P===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ct),P===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ct),!0):!1}function j(P,ct){let dt=p,At=!1;if(P){dt=h.get(ct),dt===void 0&&(dt=[],h.set(ct,dt));const gt=P.textures;if(dt.length!==gt.length||dt[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,Ut=gt.length;ut<Ut;ut++)dt[ut]=n.COLOR_ATTACHMENT0+ut;dt.length=gt.length,At=!0}}else dt[0]!==n.BACK&&(dt[0]=n.BACK,At=!0);At&&n.drawBuffers(dt)}function ft(P){return v!==P?(n.useProgram(P),v=P,!0):!1}const A={[ki]:n.FUNC_ADD,[c0]:n.FUNC_SUBTRACT,[u0]:n.FUNC_REVERSE_SUBTRACT};A[f0]=n.MIN,A[h0]=n.MAX;const g={[d0]:n.ZERO,[p0]:n.ONE,[m0]:n.SRC_COLOR,[Wa]:n.SRC_ALPHA,[S0]:n.SRC_ALPHA_SATURATE,[x0]:n.DST_COLOR,[_0]:n.DST_ALPHA,[g0]:n.ONE_MINUS_SRC_COLOR,[Xa]:n.ONE_MINUS_SRC_ALPHA,[M0]:n.ONE_MINUS_DST_COLOR,[v0]:n.ONE_MINUS_DST_ALPHA,[E0]:n.CONSTANT_COLOR,[y0]:n.ONE_MINUS_CONSTANT_COLOR,[b0]:n.CONSTANT_ALPHA,[T0]:n.ONE_MINUS_CONSTANT_ALPHA};function U(P,ct,dt,At,gt,ut,Ut,Gt,pe,re){if(P===Mi){x===!0&&(B(n.BLEND),x=!1);return}if(x===!1&&(L(n.BLEND),x=!0),P!==l0){if(P!==m||re!==T){if((d!==ki||M!==ki)&&(n.blendEquation(n.FUNC_ADD),d=ki,M=ki),re)switch(P){case Ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pu:n.blendFunc(n.ONE,n.ONE);break;case mu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case gu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pu:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case mu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}y=null,w=null,R=null,D=null,C.set(0,0,0),O=0,m=P,T=re}return}gt=gt||ct,ut=ut||dt,Ut=Ut||At,(ct!==d||gt!==M)&&(n.blendEquationSeparate(A[ct],A[gt]),d=ct,M=gt),(dt!==y||At!==w||ut!==R||Ut!==D)&&(n.blendFuncSeparate(g[dt],g[At],g[ut],g[Ut]),y=dt,w=At,R=ut,D=Ut),(Gt.equals(C)===!1||pe!==O)&&(n.blendColor(Gt.r,Gt.g,Gt.b,pe),C.copy(Gt),O=pe),m=P,T=!1}function V(P,ct){P.side===Zn?B(n.CULL_FACE):L(n.CULL_FACE);let dt=P.side===sn;ct&&(dt=!dt),X(dt),P.blending===Ts&&P.transparent===!1?U(Mi):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);const At=P.stencilWrite;a.setTest(At),At&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),K(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?L(n.SAMPLE_ALPHA_TO_COVERAGE):B(n.SAMPLE_ALPHA_TO_COVERAGE)}function X(P){b!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),b=P)}function F(P){P!==r0?(L(n.CULL_FACE),P!==I&&(P===du?n.cullFace(n.BACK):P===o0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):B(n.CULL_FACE),I=P}function ht(P){P!==G&&(et&&n.lineWidth(P),G=P)}function K(P,ct,dt){P?(L(n.POLYGON_OFFSET_FILL),(J!==ct||at!==dt)&&(n.polygonOffset(ct,dt),J=ct,at=dt)):B(n.POLYGON_OFFSET_FILL)}function ot(P){P?L(n.SCISSOR_TEST):B(n.SCISSOR_TEST)}function lt(P){P===void 0&&(P=n.TEXTURE0+st-1),vt!==P&&(n.activeTexture(P),vt=P)}function Mt(P,ct,dt){dt===void 0&&(vt===null?dt=n.TEXTURE0+st-1:dt=vt);let At=xt[dt];At===void 0&&(At={type:void 0,texture:void 0},xt[dt]=At),(At.type!==P||At.texture!==ct)&&(vt!==dt&&(n.activeTexture(dt),vt=dt),n.bindTexture(P,ct||rt[P]),At.type=P,At.texture=ct)}function S(){const P=xt[vt];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{n.texSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function it(){try{n.texSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(){try{n.compressedTexSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pt(){try{n.texStorage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Tt(){try{n.texStorage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(){try{n.texImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function mt(){try{n.texImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function St(P){Qt.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Qt.copy(P))}function Dt(P){ee.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),ee.copy(P))}function Ct(P,ct){let dt=c.get(ct);dt===void 0&&(dt=new WeakMap,c.set(ct,dt));let At=dt.get(P);At===void 0&&(At=n.getUniformBlockIndex(ct,P.name),dt.set(P,At))}function Et(P,ct){const At=c.get(ct).get(P);l.get(ct)!==At&&(n.uniformBlockBinding(ct,At,P.__bindingPointIndex),l.set(ct,At))}function kt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},vt=null,xt={},f={},h=new WeakMap,p=[],v=null,x=!1,m=null,d=null,y=null,w=null,M=null,R=null,D=null,C=new jt(0,0,0),O=0,T=!1,b=null,I=null,G=null,J=null,at=null,Qt.set(0,0,n.canvas.width,n.canvas.height),ee.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:L,disable:B,bindFramebuffer:k,drawBuffers:j,useProgram:ft,setBlending:U,setMaterial:V,setFlipSided:X,setCullFace:F,setLineWidth:ht,setPolygonOffset:K,setScissorTest:ot,activeTexture:lt,bindTexture:Mt,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:N,texImage2D:Rt,texImage3D:mt,updateUBOMapping:Ct,uniformBlockBinding:Et,texStorage2D:pt,texStorage3D:Tt,texSubImage2D:$,texSubImage3D:it,compressedTexSubImage2D:Y,compressedTexSubImage3D:bt,scissor:St,viewport:Dt,reset:kt}}function xy(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ht,u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return p?new OffscreenCanvas(S,_):vo("canvas")}function x(S,_,N){let $=1;const it=Mt(S);if((it.width>N||it.height>N)&&($=N/Math.max(it.width,it.height)),$<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const Y=Math.floor($*it.width),bt=Math.floor($*it.height);f===void 0&&(f=v(Y,bt));const pt=_?v(Y,bt):f;return pt.width=Y,pt.height=bt,pt.getContext("2d").drawImage(S,0,0,Y,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+Y+"x"+bt+")."),pt}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),S;return S}function m(S){return S.generateMipmaps}function d(S){n.generateMipmap(S)}function y(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(S,_,N,$,it=!1){if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let Y=_;if(_===n.RED&&(N===n.FLOAT&&(Y=n.R32F),N===n.HALF_FLOAT&&(Y=n.R16F),N===n.UNSIGNED_BYTE&&(Y=n.R8)),_===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.R8UI),N===n.UNSIGNED_SHORT&&(Y=n.R16UI),N===n.UNSIGNED_INT&&(Y=n.R32UI),N===n.BYTE&&(Y=n.R8I),N===n.SHORT&&(Y=n.R16I),N===n.INT&&(Y=n.R32I)),_===n.RG&&(N===n.FLOAT&&(Y=n.RG32F),N===n.HALF_FLOAT&&(Y=n.RG16F),N===n.UNSIGNED_BYTE&&(Y=n.RG8)),_===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RG8UI),N===n.UNSIGNED_SHORT&&(Y=n.RG16UI),N===n.UNSIGNED_INT&&(Y=n.RG32UI),N===n.BYTE&&(Y=n.RG8I),N===n.SHORT&&(Y=n.RG16I),N===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),N===n.UNSIGNED_INT&&(Y=n.RGB32UI),N===n.BYTE&&(Y=n.RGB8I),N===n.SHORT&&(Y=n.RGB16I),N===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),N===n.UNSIGNED_INT&&(Y=n.RGBA32UI),N===n.BYTE&&(Y=n.RGBA8I),N===n.SHORT&&(Y=n.RGBA16I),N===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),_===n.RGBA){const bt=it?go:ie.getTransfer($);N===n.FLOAT&&(Y=n.RGBA32F),N===n.HALF_FLOAT&&(Y=n.RGBA16F),N===n.UNSIGNED_BYTE&&(Y=bt===fe?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function M(S,_){let N;return S?_===null||_===qi||_===pr?N=n.DEPTH24_STENCIL8:_===Jn?N=n.DEPTH32F_STENCIL8:_===dr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===qi||_===pr?N=n.DEPTH_COMPONENT24:_===Jn?N=n.DEPTH_COMPONENT32F:_===dr&&(N=n.DEPTH_COMPONENT16),N}function R(S,_){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==Tn&&S.minFilter!==Ln?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function D(S){const _=S.target;_.removeEventListener("dispose",D),O(_),_.isVideoTexture&&u.delete(_)}function C(S){const _=S.target;_.removeEventListener("dispose",C),b(_)}function O(S){const _=i.get(S);if(_.__webglInit===void 0)return;const N=S.source,$=h.get(N);if($){const it=$[_.__cacheKey];it.usedTimes--,it.usedTimes===0&&T(S),Object.keys($).length===0&&h.delete(N)}i.remove(S)}function T(S){const _=i.get(S);n.deleteTexture(_.__webglTexture);const N=S.source,$=h.get(N);delete $[_.__cacheKey],o.memory.textures--}function b(S){const _=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let it=0;it<_.__webglFramebuffer[$].length;it++)n.deleteFramebuffer(_.__webglFramebuffer[$][it]);else n.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)n.deleteFramebuffer(_.__webglFramebuffer[$]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=S.textures;for(let $=0,it=N.length;$<it;$++){const Y=i.get(N[$]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(N[$])}i.remove(S)}let I=0;function G(){I=0}function J(){const S=I;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),I+=1,S}function at(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function st(S,_){const N=i.get(S);if(S.isVideoTexture&&ot(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){const $=S.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(N,S,_);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+_)}function et(S,_){const N=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){rt(N,S,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+_)}function nt(S,_){const N=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){rt(N,S,_);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+_)}function q(S,_){const N=i.get(S);if(S.version>0&&N.__version!==S.version){L(N,S,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+_)}const vt={[el]:n.REPEAT,[Gi]:n.CLAMP_TO_EDGE,[nl]:n.MIRRORED_REPEAT},xt={[Tn]:n.NEAREST,[N0]:n.NEAREST_MIPMAP_NEAREST,[Cr]:n.NEAREST_MIPMAP_LINEAR,[Ln]:n.LINEAR,[Jo]:n.LINEAR_MIPMAP_NEAREST,[Wi]:n.LINEAR_MIPMAP_LINEAR},Pt={[z0]:n.NEVER,[X0]:n.ALWAYS,[k0]:n.LESS,[id]:n.LEQUAL,[H0]:n.EQUAL,[W0]:n.GEQUAL,[V0]:n.GREATER,[G0]:n.NOTEQUAL};function Nt(S,_){if(_.type===Jn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ln||_.magFilter===Jo||_.magFilter===Cr||_.magFilter===Wi||_.minFilter===Ln||_.minFilter===Jo||_.minFilter===Cr||_.minFilter===Wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,vt[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,vt[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,vt[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,xt[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,xt[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Pt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Tn||_.minFilter!==Cr&&_.minFilter!==Wi||_.type===Jn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Qt(S,_){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",D));const $=_.source;let it=h.get($);it===void 0&&(it={},h.set($,it));const Y=at(_);if(Y!==S.__cacheKey){it[Y]===void 0&&(it[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),it[Y].usedTimes++;const bt=it[S.__cacheKey];bt!==void 0&&(it[S.__cacheKey].usedTimes--,bt.usedTimes===0&&T(_)),S.__cacheKey=Y,S.__webglTexture=it[Y].texture}return N}function ee(S,_,N){return Math.floor(Math.floor(S/N)/_)}function Yt(S,_,N,$){const Y=S.updateRanges;if(Y.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,N,$,_.data);else{Y.sort((mt,St)=>mt.start-St.start);let bt=0;for(let mt=1;mt<Y.length;mt++){const St=Y[bt],Dt=Y[mt],Ct=St.start+St.count,Et=ee(Dt.start,_.width,4),kt=ee(St.start,_.width,4);Dt.start<=Ct+1&&Et===kt&&ee(Dt.start+Dt.count-1,_.width,4)===Et?St.count=Math.max(St.count,Dt.start+Dt.count-St.start):(++bt,Y[bt]=Dt)}Y.length=bt+1;const pt=n.getParameter(n.UNPACK_ROW_LENGTH),Tt=n.getParameter(n.UNPACK_SKIP_PIXELS),Rt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let mt=0,St=Y.length;mt<St;mt++){const Dt=Y[mt],Ct=Math.floor(Dt.start/4),Et=Math.ceil(Dt.count/4),kt=Ct%_.width,P=Math.floor(Ct/_.width),ct=Et,dt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,kt),n.pixelStorei(n.UNPACK_SKIP_ROWS,P),e.texSubImage2D(n.TEXTURE_2D,0,kt,P,ct,dt,N,$,_.data)}S.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,pt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Tt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Rt)}}function rt(S,_,N){let $=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=n.TEXTURE_3D);const it=Qt(S,_),Y=_.source;e.bindTexture($,S.__webglTexture,n.TEXTURE0+N);const bt=i.get(Y);if(Y.version!==bt.__version||it===!0){e.activeTexture(n.TEXTURE0+N);const pt=ie.getPrimaries(ie.workingColorSpace),Tt=_.colorSpace===vi?null:ie.getPrimaries(_.colorSpace),Rt=_.colorSpace===vi||pt===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let mt=x(_.image,!1,s.maxTextureSize);mt=lt(_,mt);const St=r.convert(_.format,_.colorSpace),Dt=r.convert(_.type);let Ct=w(_.internalFormat,St,Dt,_.colorSpace,_.isVideoTexture);Nt($,_);let Et;const kt=_.mipmaps,P=_.isVideoTexture!==!0,ct=bt.__version===void 0||it===!0,dt=Y.dataReady,At=R(_,mt);if(_.isDepthTexture)Ct=M(_.format===gr,_.type),ct&&(P?e.texStorage2D(n.TEXTURE_2D,1,Ct,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,Ct,mt.width,mt.height,0,St,Dt,null));else if(_.isDataTexture)if(kt.length>0){P&&ct&&e.texStorage2D(n.TEXTURE_2D,At,Ct,kt[0].width,kt[0].height);for(let gt=0,ut=kt.length;gt<ut;gt++)Et=kt[gt],P?dt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,Et.width,Et.height,St,Dt,Et.data):e.texImage2D(n.TEXTURE_2D,gt,Ct,Et.width,Et.height,0,St,Dt,Et.data);_.generateMipmaps=!1}else P?(ct&&e.texStorage2D(n.TEXTURE_2D,At,Ct,mt.width,mt.height),dt&&Yt(_,mt,St,Dt)):e.texImage2D(n.TEXTURE_2D,0,Ct,mt.width,mt.height,0,St,Dt,mt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){P&&ct&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Ct,kt[0].width,kt[0].height,mt.depth);for(let gt=0,ut=kt.length;gt<ut;gt++)if(Et=kt[gt],_.format!==yn)if(St!==null)if(P){if(dt)if(_.layerUpdates.size>0){const Ut=Xu(Et.width,Et.height,_.format,_.type);for(const Gt of _.layerUpdates){const pe=Et.data.subarray(Gt*Ut/Et.data.BYTES_PER_ELEMENT,(Gt+1)*Ut/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,Gt,Et.width,Et.height,1,St,pe)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,0,Et.width,Et.height,mt.depth,St,Et.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,gt,Ct,Et.width,Et.height,mt.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?dt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,0,Et.width,Et.height,mt.depth,St,Dt,Et.data):e.texImage3D(n.TEXTURE_2D_ARRAY,gt,Ct,Et.width,Et.height,mt.depth,0,St,Dt,Et.data)}else{P&&ct&&e.texStorage2D(n.TEXTURE_2D,At,Ct,kt[0].width,kt[0].height);for(let gt=0,ut=kt.length;gt<ut;gt++)Et=kt[gt],_.format!==yn?St!==null?P?dt&&e.compressedTexSubImage2D(n.TEXTURE_2D,gt,0,0,Et.width,Et.height,St,Et.data):e.compressedTexImage2D(n.TEXTURE_2D,gt,Ct,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?dt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,Et.width,Et.height,St,Dt,Et.data):e.texImage2D(n.TEXTURE_2D,gt,Ct,Et.width,Et.height,0,St,Dt,Et.data)}else if(_.isDataArrayTexture)if(P){if(ct&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Ct,mt.width,mt.height,mt.depth),dt)if(_.layerUpdates.size>0){const gt=Xu(mt.width,mt.height,_.format,_.type);for(const ut of _.layerUpdates){const Ut=mt.data.subarray(ut*gt/mt.data.BYTES_PER_ELEMENT,(ut+1)*gt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ut,mt.width,mt.height,1,St,Dt,Ut)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,St,Dt,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ct,mt.width,mt.height,mt.depth,0,St,Dt,mt.data);else if(_.isData3DTexture)P?(ct&&e.texStorage3D(n.TEXTURE_3D,At,Ct,mt.width,mt.height,mt.depth),dt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,St,Dt,mt.data)):e.texImage3D(n.TEXTURE_3D,0,Ct,mt.width,mt.height,mt.depth,0,St,Dt,mt.data);else if(_.isFramebufferTexture){if(ct)if(P)e.texStorage2D(n.TEXTURE_2D,At,Ct,mt.width,mt.height);else{let gt=mt.width,ut=mt.height;for(let Ut=0;Ut<At;Ut++)e.texImage2D(n.TEXTURE_2D,Ut,Ct,gt,ut,0,St,Dt,null),gt>>=1,ut>>=1}}else if(kt.length>0){if(P&&ct){const gt=Mt(kt[0]);e.texStorage2D(n.TEXTURE_2D,At,Ct,gt.width,gt.height)}for(let gt=0,ut=kt.length;gt<ut;gt++)Et=kt[gt],P?dt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,St,Dt,Et):e.texImage2D(n.TEXTURE_2D,gt,Ct,St,Dt,Et);_.generateMipmaps=!1}else if(P){if(ct){const gt=Mt(mt);e.texStorage2D(n.TEXTURE_2D,At,Ct,gt.width,gt.height)}dt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,St,Dt,mt)}else e.texImage2D(n.TEXTURE_2D,0,Ct,St,Dt,mt);m(_)&&d($),bt.__version=Y.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function L(S,_,N){if(_.image.length!==6)return;const $=Qt(S,_),it=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+N);const Y=i.get(it);if(it.version!==Y.__version||$===!0){e.activeTexture(n.TEXTURE0+N);const bt=ie.getPrimaries(ie.workingColorSpace),pt=_.colorSpace===vi?null:ie.getPrimaries(_.colorSpace),Tt=_.colorSpace===vi||bt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Rt=_.isCompressedTexture||_.image[0].isCompressedTexture,mt=_.image[0]&&_.image[0].isDataTexture,St=[];for(let ut=0;ut<6;ut++)!Rt&&!mt?St[ut]=x(_.image[ut],!0,s.maxCubemapSize):St[ut]=mt?_.image[ut].image:_.image[ut],St[ut]=lt(_,St[ut]);const Dt=St[0],Ct=r.convert(_.format,_.colorSpace),Et=r.convert(_.type),kt=w(_.internalFormat,Ct,Et,_.colorSpace),P=_.isVideoTexture!==!0,ct=Y.__version===void 0||$===!0,dt=it.dataReady;let At=R(_,Dt);Nt(n.TEXTURE_CUBE_MAP,_);let gt;if(Rt){P&&ct&&e.texStorage2D(n.TEXTURE_CUBE_MAP,At,kt,Dt.width,Dt.height);for(let ut=0;ut<6;ut++){gt=St[ut].mipmaps;for(let Ut=0;Ut<gt.length;Ut++){const Gt=gt[Ut];_.format!==yn?Ct!==null?P?dt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut,0,0,Gt.width,Gt.height,Ct,Gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut,kt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut,0,0,Gt.width,Gt.height,Ct,Et,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut,kt,Gt.width,Gt.height,0,Ct,Et,Gt.data)}}}else{if(gt=_.mipmaps,P&&ct){gt.length>0&&At++;const ut=Mt(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,At,kt,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(mt){P?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,St[ut].width,St[ut].height,Ct,Et,St[ut].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,kt,St[ut].width,St[ut].height,0,Ct,Et,St[ut].data);for(let Ut=0;Ut<gt.length;Ut++){const pe=gt[Ut].image[ut].image;P?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut+1,0,0,pe.width,pe.height,Ct,Et,pe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut+1,kt,pe.width,pe.height,0,Ct,Et,pe.data)}}else{P?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Ct,Et,St[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,kt,Ct,Et,St[ut]);for(let Ut=0;Ut<gt.length;Ut++){const Gt=gt[Ut];P?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut+1,0,0,Ct,Et,Gt.image[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ut+1,kt,Ct,Et,Gt.image[ut])}}}m(_)&&d(n.TEXTURE_CUBE_MAP),Y.__version=it.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function B(S,_,N,$,it,Y){const bt=r.convert(N.format,N.colorSpace),pt=r.convert(N.type),Tt=w(N.internalFormat,bt,pt,N.colorSpace),Rt=i.get(_),mt=i.get(N);if(mt.__renderTarget=_,!Rt.__hasExternalTextures){const St=Math.max(1,_.width>>Y),Dt=Math.max(1,_.height>>Y);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,Y,Tt,St,Dt,_.depth,0,bt,pt,null):e.texImage2D(it,Y,Tt,St,Dt,0,bt,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,S),K(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,it,mt.__webglTexture,0,ht(_)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,it,mt.__webglTexture,Y),e.bindFramebuffer(n.FRAMEBUFFER,null)}function k(S,_,N){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer){const $=_.depthTexture,it=$&&$.isDepthTexture?$.type:null,Y=M(_.stencilBuffer,it),bt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=ht(_);K(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,Y,_.width,_.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,S)}else{const $=_.textures;for(let it=0;it<$.length;it++){const Y=$[it],bt=r.convert(Y.format,Y.colorSpace),pt=r.convert(Y.type),Tt=w(Y.internalFormat,bt,pt,Y.colorSpace),Rt=ht(_);N&&K(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,Tt,_.width,_.height):K(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Rt,Tt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Tt,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function j(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(_.depthTexture);$.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),st(_.depthTexture,0);const it=$.__webglTexture,Y=ht(_);if(_.depthTexture.format===mr)K(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(_.depthTexture.format===gr)K(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function ft(S){const _=i.get(S),N=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){const $=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){const it=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",it)};$.addEventListener("dispose",it),_.__depthDisposeCallback=it}_.__boundDepthTexture=$}if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const $=S.texture.mipmaps;$&&$.length>0?j(_.__webglFramebuffer[0],S):j(_.__webglFramebuffer,S)}else if(N){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=n.createRenderbuffer(),k(_.__webglDepthbuffer[$],S,!1);else{const it=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,Y)}}else{const $=S.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),k(_.__webglDepthbuffer,S,!1);else{const it=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,Y)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function A(S,_,N){const $=i.get(S);_!==void 0&&B($.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&ft(S)}function g(S){const _=S.texture,N=i.get(S),$=i.get(_);S.addEventListener("dispose",C);const it=S.textures,Y=S.isWebGLCubeRenderTarget===!0,bt=it.length>1;if(bt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=_.version,o.memory.textures++),Y){N.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[pt]=[];for(let Tt=0;Tt<_.mipmaps.length;Tt++)N.__webglFramebuffer[pt][Tt]=n.createFramebuffer()}else N.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let pt=0;pt<_.mipmaps.length;pt++)N.__webglFramebuffer[pt]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(bt)for(let pt=0,Tt=it.length;pt<Tt;pt++){const Rt=i.get(it[pt]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=n.createTexture(),o.memory.textures++)}if(S.samples>0&&K(S)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let pt=0;pt<it.length;pt++){const Tt=it[pt];N.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[pt]);const Rt=r.convert(Tt.format,Tt.colorSpace),mt=r.convert(Tt.type),St=w(Tt.internalFormat,Rt,mt,Tt.colorSpace,S.isXRRenderTarget===!0),Dt=ht(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,St,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,N.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),k(N.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Nt(n.TEXTURE_CUBE_MAP,_);for(let pt=0;pt<6;pt++)if(_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)B(N.__webglFramebuffer[pt][Tt],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Tt);else B(N.__webglFramebuffer[pt],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(_)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let pt=0,Tt=it.length;pt<Tt;pt++){const Rt=it[pt],mt=i.get(Rt);let St=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(St=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(St,mt.__webglTexture),Nt(St,Rt),B(N.__webglFramebuffer,S,Rt,n.COLOR_ATTACHMENT0+pt,St,0),m(Rt)&&d(St)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(pt=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,$.__webglTexture),Nt(pt,_),_.mipmaps&&_.mipmaps.length>0)for(let Tt=0;Tt<_.mipmaps.length;Tt++)B(N.__webglFramebuffer[Tt],S,_,n.COLOR_ATTACHMENT0,pt,Tt);else B(N.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,pt,0);m(_)&&d(pt),e.unbindTexture()}S.depthBuffer&&ft(S)}function U(S){const _=S.textures;for(let N=0,$=_.length;N<$;N++){const it=_[N];if(m(it)){const Y=y(S),bt=i.get(it).__webglTexture;e.bindTexture(Y,bt),d(Y),e.unbindTexture()}}}const V=[],X=[];function F(S){if(S.samples>0){if(K(S)===!1){const _=S.textures,N=S.width,$=S.height;let it=n.COLOR_BUFFER_BIT;const Y=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(S),pt=_.length>1;if(pt)for(let Rt=0;Rt<_.length;Rt++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);const Tt=S.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let Rt=0;Rt<_.length;Rt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[Rt]);const mt=i.get(_[Rt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,mt,0)}n.blitFramebuffer(0,0,N,$,0,0,N,$,it,n.NEAREST),l===!0&&(V.length=0,X.length=0,V.push(n.COLOR_ATTACHMENT0+Rt),S.depthBuffer&&S.resolveDepthBuffer===!1&&(V.push(Y),X.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,X)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,V))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let Rt=0;Rt<_.length;Rt++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,bt.__webglColorRenderbuffer[Rt]);const mt=i.get(_[Rt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,mt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const _=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ht(S){return Math.min(s.maxSamples,S.samples)}function K(S){const _=i.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ot(S){const _=o.render.frame;u.get(S)!==_&&(u.set(S,_),S.update())}function lt(S,_){const N=S.colorSpace,$=S.format,it=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==Is&&N!==vi&&(ie.getTransfer(N)===fe?($!==yn||it!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function Mt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=G,this.setTexture2D=st,this.setTexture2DArray=et,this.setTexture3D=nt,this.setTextureCube=q,this.rebindTextures=A,this.setupRenderTarget=g,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=B,this.useMultisampledRTT=K}function My(n,t){function e(i,s=vi){let r;const o=ie.getTransfer(s);if(i===On)return n.UNSIGNED_BYTE;if(i===ec)return n.UNSIGNED_SHORT_4_4_4_4;if(i===nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Kh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Zh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$h)return n.BYTE;if(i===jh)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===tc)return n.INT;if(i===qi)return n.UNSIGNED_INT;if(i===Jn)return n.FLOAT;if(i===Er)return n.HALF_FLOAT;if(i===Jh)return n.ALPHA;if(i===Qh)return n.RGB;if(i===yn)return n.RGBA;if(i===mr)return n.DEPTH_COMPONENT;if(i===gr)return n.DEPTH_STENCIL;if(i===td)return n.RED;if(i===ic)return n.RED_INTEGER;if(i===ed)return n.RG;if(i===sc)return n.RG_INTEGER;if(i===rc)return n.RGBA_INTEGER;if(i===eo||i===no||i===io||i===so)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===il||i===sl||i===rl||i===ol)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===al||i===ll||i===cl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===al||i===ll)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===cl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ul||i===fl||i===hl||i===dl||i===pl||i===ml||i===gl||i===_l||i===vl||i===xl||i===Ml||i===Sl||i===El||i===yl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ul)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ml)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_l)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ml)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===El)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yl)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bl||i===Tl||i===Al)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===bl)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wl||i===Rl||i===Cl||i===Pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===wl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===pr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Sy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ey=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new md(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new wi({vertexShader:Sy,fragmentShader:Ey,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new Uo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class by extends Ki{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,v=null;const x=typeof XRWebGLBinding<"u",m=new yy,d={},y=e.getContextAttributes();let w=null,M=null;const R=[],D=[],C=new Ht;let O=null;const T=new _n;T.viewport=new be;const b=new _n;b.viewport=new be;const I=[T,b],G=new Gv;let J=null,at=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(rt){let L=R[rt];return L===void 0&&(L=new xa,R[rt]=L),L.getTargetRaySpace()},this.getControllerGrip=function(rt){let L=R[rt];return L===void 0&&(L=new xa,R[rt]=L),L.getGripSpace()},this.getHand=function(rt){let L=R[rt];return L===void 0&&(L=new xa,R[rt]=L),L.getHandSpace()};function st(rt){const L=D.indexOf(rt.inputSource);if(L===-1)return;const B=R[L];B!==void 0&&(B.update(rt.inputSource,rt.frame,c||o),B.dispatchEvent({type:rt.type,data:rt.inputSource}))}function et(){s.removeEventListener("select",st),s.removeEventListener("selectstart",st),s.removeEventListener("selectend",st),s.removeEventListener("squeeze",st),s.removeEventListener("squeezestart",st),s.removeEventListener("squeezeend",st),s.removeEventListener("end",et),s.removeEventListener("inputsourceschange",nt);for(let rt=0;rt<R.length;rt++){const L=D[rt];L!==null&&(D[rt]=null,R[rt].disconnect(L))}J=null,at=null,m.reset();for(const rt in d)delete d[rt];t.setRenderTarget(w),p=null,h=null,f=null,s=null,M=null,Yt.stop(),i.isPresenting=!1,t.setPixelRatio(O),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(rt){r=rt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(rt){a=rt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(rt){c=rt},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(rt){if(s=rt,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",st),s.addEventListener("selectstart",st),s.addEventListener("selectend",st),s.addEventListener("squeeze",st),s.addEventListener("squeezestart",st),s.addEventListener("squeezeend",st),s.addEventListener("end",et),s.addEventListener("inputsourceschange",nt),y.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let B=null,k=null,j=null;y.depth&&(j=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,B=y.stencil?gr:mr,k=y.stencil?pr:qi);const ft={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(ft),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new $i(h.textureWidth,h.textureHeight,{format:yn,type:On,depthTexture:new pd(h.textureWidth,h.textureHeight,k,void 0,void 0,void 0,void 0,void 0,void 0,B),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const B={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,B),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new $i(p.framebufferWidth,p.framebufferHeight,{format:yn,type:On,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(rt){for(let L=0;L<rt.removed.length;L++){const B=rt.removed[L],k=D.indexOf(B);k>=0&&(D[k]=null,R[k].disconnect(B))}for(let L=0;L<rt.added.length;L++){const B=rt.added[L];let k=D.indexOf(B);if(k===-1){for(let ft=0;ft<R.length;ft++)if(ft>=D.length){D.push(B),k=ft;break}else if(D[ft]===null){D[ft]=B,k=ft;break}if(k===-1)break}const j=R[k];j&&j.connect(B)}}const q=new W,vt=new W;function xt(rt,L,B){q.setFromMatrixPosition(L.matrixWorld),vt.setFromMatrixPosition(B.matrixWorld);const k=q.distanceTo(vt),j=L.projectionMatrix.elements,ft=B.projectionMatrix.elements,A=j[14]/(j[10]-1),g=j[14]/(j[10]+1),U=(j[9]+1)/j[5],V=(j[9]-1)/j[5],X=(j[8]-1)/j[0],F=(ft[8]+1)/ft[0],ht=A*X,K=A*F,ot=k/(-X+F),lt=ot*-X;if(L.matrixWorld.decompose(rt.position,rt.quaternion,rt.scale),rt.translateX(lt),rt.translateZ(ot),rt.matrixWorld.compose(rt.position,rt.quaternion,rt.scale),rt.matrixWorldInverse.copy(rt.matrixWorld).invert(),j[10]===-1)rt.projectionMatrix.copy(L.projectionMatrix),rt.projectionMatrixInverse.copy(L.projectionMatrixInverse);else{const Mt=A+ot,S=g+ot,_=ht-lt,N=K+(k-lt),$=U*g/S*Mt,it=V*g/S*Mt;rt.projectionMatrix.makePerspective(_,N,$,it,Mt,S),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert()}}function Pt(rt,L){L===null?rt.matrixWorld.copy(rt.matrix):rt.matrixWorld.multiplyMatrices(L.matrixWorld,rt.matrix),rt.matrixWorldInverse.copy(rt.matrixWorld).invert()}this.updateCamera=function(rt){if(s===null)return;let L=rt.near,B=rt.far;m.texture!==null&&(m.depthNear>0&&(L=m.depthNear),m.depthFar>0&&(B=m.depthFar)),G.near=b.near=T.near=L,G.far=b.far=T.far=B,(J!==G.near||at!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),J=G.near,at=G.far),G.layers.mask=rt.layers.mask|6,T.layers.mask=G.layers.mask&3,b.layers.mask=G.layers.mask&5;const k=rt.parent,j=G.cameras;Pt(G,k);for(let ft=0;ft<j.length;ft++)Pt(j[ft],k);j.length===2?xt(G,T,b):G.projectionMatrix.copy(T.projectionMatrix),Nt(rt,G,k)};function Nt(rt,L,B){B===null?rt.matrix.copy(L.matrixWorld):(rt.matrix.copy(B.matrixWorld),rt.matrix.invert(),rt.matrix.multiply(L.matrixWorld)),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.updateMatrixWorld(!0),rt.projectionMatrix.copy(L.projectionMatrix),rt.projectionMatrixInverse.copy(L.projectionMatrixInverse),rt.isPerspectiveCamera&&(rt.fov=_r*2*Math.atan(1/rt.projectionMatrix.elements[5]),rt.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(rt){l=rt,h!==null&&(h.fixedFoveation=rt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=rt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(rt){return d[rt]};let Qt=null;function ee(rt,L){if(u=L.getViewerPose(c||o),v=L,u!==null){const B=u.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let k=!1;B.length!==G.cameras.length&&(G.cameras.length=0,k=!0);for(let g=0;g<B.length;g++){const U=B[g];let V=null;if(p!==null)V=p.getViewport(U);else{const F=f.getViewSubImage(h,U);V=F.viewport,g===0&&(t.setRenderTargetTextures(M,F.colorTexture,F.depthStencilTexture),t.setRenderTarget(M))}let X=I[g];X===void 0&&(X=new _n,X.layers.enable(g),X.viewport=new be,I[g]=X),X.matrix.fromArray(U.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(U.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(V.x,V.y,V.width,V.height),g===0&&(G.matrix.copy(X.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),k===!0&&G.cameras.push(X)}const j=s.enabledFeatures;if(j&&j.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const g=f.getDepthInformation(B[0]);g&&g.isValid&&g.texture&&m.init(g,s.renderState)}if(j&&j.includes("camera-access")&&x){t.state.unbindTexture(),f=i.getBinding();for(let g=0;g<B.length;g++){const U=B[g].camera;if(U){let V=d[U];V||(V=new md,d[U]=V);const X=f.getCameraImage(U);V.sourceTexture=X}}}}for(let B=0;B<R.length;B++){const k=D[B],j=R[B];k!==null&&j!==void 0&&j.update(k,L,c||o)}Qt&&Qt(rt,L),L.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:L}),v=null}const Yt=new vd;Yt.setAnimationLoop(ee),this.setAnimationLoop=function(rt){Qt=rt},this.dispose=function(){}}}const Oi=new Bn,Ty=new Te;function Ay(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,fd(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,y,w,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),v(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,y,w):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===sn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===sn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=t.get(d),w=y.envMap,M=y.envMapRotation;w&&(m.envMap.value=w,Oi.copy(M),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ty.makeRotationFromEuler(Oi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,w){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=w*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===sn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function wy(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const M=w.program;i.uniformBlockBinding(y,M)}function c(y,w){let M=s[y.id];M===void 0&&(v(y),M=u(y),s[y.id]=M,y.addEventListener("dispose",m));const R=w.program;i.updateUBOMapping(y,R);const D=t.render.frame;r[y.id]!==D&&(h(y),r[y.id]=D)}function u(y){const w=f();y.__bindingPointIndex=w;const M=n.createBuffer(),R=y.__size,D=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,R,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const w=s[y.id],M=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let D=0,C=M.length;D<C;D++){const O=Array.isArray(M[D])?M[D]:[M[D]];for(let T=0,b=O.length;T<b;T++){const I=O[T];if(p(I,D,T,R)===!0){const G=I.__offset,J=Array.isArray(I.value)?I.value:[I.value];let at=0;for(let st=0;st<J.length;st++){const et=J[st],nt=x(et);typeof et=="number"||typeof et=="boolean"?(I.__data[0]=et,n.bufferSubData(n.UNIFORM_BUFFER,G+at,I.__data)):et.isMatrix3?(I.__data[0]=et.elements[0],I.__data[1]=et.elements[1],I.__data[2]=et.elements[2],I.__data[3]=0,I.__data[4]=et.elements[3],I.__data[5]=et.elements[4],I.__data[6]=et.elements[5],I.__data[7]=0,I.__data[8]=et.elements[6],I.__data[9]=et.elements[7],I.__data[10]=et.elements[8],I.__data[11]=0):(et.toArray(I.__data,at),at+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,w,M,R){const D=y.value,C=w+"_"+M;if(R[C]===void 0)return typeof D=="number"||typeof D=="boolean"?R[C]=D:R[C]=D.clone(),!0;{const O=R[C];if(typeof D=="number"||typeof D=="boolean"){if(O!==D)return R[C]=D,!0}else if(O.equals(D)===!1)return O.copy(D),!0}return!1}function v(y){const w=y.uniforms;let M=0;const R=16;for(let C=0,O=w.length;C<O;C++){const T=Array.isArray(w[C])?w[C]:[w[C]];for(let b=0,I=T.length;b<I;b++){const G=T[b],J=Array.isArray(G.value)?G.value:[G.value];for(let at=0,st=J.length;at<st;at++){const et=J[at],nt=x(et),q=M%R,vt=q%nt.boundary,xt=q+vt;M+=vt,xt!==0&&R-xt<nt.storage&&(M+=R-xt),G.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=M,M+=nt.storage}}}const D=M%R;return D>0&&(M+=R-D),y.__size=M,y.__cache={},this}function x(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),w}function m(y){const w=y.target;w.removeEventListener("dispose",m);const M=o.indexOf(w.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function d(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Ry{constructor(t={}){const{canvas:e=lv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Uint32Array(4),x=new Int32Array(4);let m=null,d=null;const y=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let R=!1;this._outputColorSpace=mn;let D=0,C=0,O=null,T=-1,b=null;const I=new be,G=new be;let J=null;const at=new jt(0);let st=0,et=e.width,nt=e.height,q=1,vt=null,xt=null;const Pt=new be(0,0,et,nt),Nt=new be(0,0,et,nt);let Qt=!1;const ee=new uc;let Yt=!1,rt=!1;const L=new Te,B=new W,k=new be,j={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function A(){return O===null?q:1}let g=i;function U(E,z){return e.getContext(E,z)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ql}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",gt,!1),g===null){const z="webgl2";if(g=U(z,E),g===null)throw U(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let V,X,F,ht,K,ot,lt,Mt,S,_,N,$,it,Y,bt,pt,Tt,Rt,mt,St,Dt,Ct,Et,kt;function P(){V=new BS(g),V.init(),Ct=new My(g,V),X=new DS(g,V,t,Ct),F=new vy(g,V),X.reversedDepthBuffer&&h&&F.buffers.depth.setReversed(!0),ht=new HS(g),K=new ry,ot=new xy(g,V,F,K,X,Ct,ht),lt=new IS(M),Mt=new OS(M),S=new Yv(g),Et=new CS(g,S),_=new zS(g,S,ht,Et),N=new GS(g,_,S,ht),mt=new VS(g,X,ot),pt=new LS(K),$=new sy(M,lt,Mt,V,X,Et,pt),it=new Ay(M,K),Y=new ay,bt=new dy(V),Rt=new RS(M,lt,Mt,F,N,p,l),Tt=new gy(M,N,X),kt=new wy(g,ht,X,F),St=new PS(g,V,ht),Dt=new kS(g,V,ht),ht.programs=$.programs,M.capabilities=X,M.extensions=V,M.properties=K,M.renderLists=Y,M.shadowMap=Tt,M.state=F,M.info=ht}P();const ct=new by(M,g);this.xr=ct,this.getContext=function(){return g},this.getContextAttributes=function(){return g.getContextAttributes()},this.forceContextLoss=function(){const E=V.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=V.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(et,nt,!1))},this.getSize=function(E){return E.set(et,nt)},this.setSize=function(E,z,Q=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}et=E,nt=z,e.width=Math.floor(E*q),e.height=Math.floor(z*q),Q===!0&&(e.style.width=E+"px",e.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(et*q,nt*q).floor()},this.setDrawingBufferSize=function(E,z,Q){et=E,nt=z,q=Q,e.width=Math.floor(E*Q),e.height=Math.floor(z*Q),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(Pt)},this.setViewport=function(E,z,Q,tt){E.isVector4?Pt.set(E.x,E.y,E.z,E.w):Pt.set(E,z,Q,tt),F.viewport(I.copy(Pt).multiplyScalar(q).round())},this.getScissor=function(E){return E.copy(Nt)},this.setScissor=function(E,z,Q,tt){E.isVector4?Nt.set(E.x,E.y,E.z,E.w):Nt.set(E,z,Q,tt),F.scissor(G.copy(Nt).multiplyScalar(q).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(E){F.setScissorTest(Qt=E)},this.setOpaqueSort=function(E){vt=E},this.setTransparentSort=function(E){xt=E},this.getClearColor=function(E){return E.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(E=!0,z=!0,Q=!0){let tt=0;if(E){let H=!1;if(O!==null){const _t=O.texture.format;H=_t===rc||_t===sc||_t===ic}if(H){const _t=O.texture.type,wt=_t===On||_t===qi||_t===dr||_t===pr||_t===ec||_t===nc,It=Rt.getClearColor(),Lt=Rt.getClearAlpha(),Bt=It.r,zt=It.g,Ft=It.b;wt?(v[0]=Bt,v[1]=zt,v[2]=Ft,v[3]=Lt,g.clearBufferuiv(g.COLOR,0,v)):(x[0]=Bt,x[1]=zt,x[2]=Ft,x[3]=Lt,g.clearBufferiv(g.COLOR,0,x))}else tt|=g.COLOR_BUFFER_BIT}z&&(tt|=g.DEPTH_BUFFER_BIT),Q&&(tt|=g.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),g.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Rt.dispose(),Y.dispose(),bt.dispose(),K.dispose(),lt.dispose(),Mt.dispose(),N.dispose(),Et.dispose(),kt.dispose(),$.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",wn),ct.removeEventListener("sessionend",gc),Ri.stop()};function dt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const E=ht.autoReset,z=Tt.enabled,Q=Tt.autoUpdate,tt=Tt.needsUpdate,H=Tt.type;P(),ht.autoReset=E,Tt.enabled=z,Tt.autoUpdate=Q,Tt.needsUpdate=tt,Tt.type=H}function gt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ut(E){const z=E.target;z.removeEventListener("dispose",ut),Ut(z)}function Ut(E){Gt(E),K.remove(E)}function Gt(E){const z=K.get(E).programs;z!==void 0&&(z.forEach(function(Q){$.releaseProgram(Q)}),E.isShaderMaterial&&$.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,Q,tt,H,_t){z===null&&(z=j);const wt=H.isMesh&&H.matrixWorld.determinant()<0,It=bd(E,z,Q,tt,H);F.setMaterial(tt,wt);let Lt=Q.index,Bt=1;if(tt.wireframe===!0){if(Lt=_.getWireframeAttribute(Q),Lt===void 0)return;Bt=2}const zt=Q.drawRange,Ft=Q.attributes.position;let Jt=zt.start*Bt,ue=(zt.start+zt.count)*Bt;_t!==null&&(Jt=Math.max(Jt,_t.start*Bt),ue=Math.min(ue,(_t.start+_t.count)*Bt)),Lt!==null?(Jt=Math.max(Jt,0),ue=Math.min(ue,Lt.count)):Ft!=null&&(Jt=Math.max(Jt,0),ue=Math.min(ue,Ft.count));const Se=ue-Jt;if(Se<0||Se===1/0)return;Et.setup(H,tt,It,Q,Lt);let _e,de=St;if(Lt!==null&&(_e=S.get(Lt),de=Dt,de.setIndex(_e)),H.isMesh)tt.wireframe===!0?(F.setLineWidth(tt.wireframeLinewidth*A()),de.setMode(g.LINES)):de.setMode(g.TRIANGLES);else if(H.isLine){let Ot=tt.linewidth;Ot===void 0&&(Ot=1),F.setLineWidth(Ot*A()),H.isLineSegments?de.setMode(g.LINES):H.isLineLoop?de.setMode(g.LINE_LOOP):de.setMode(g.LINE_STRIP)}else H.isPoints?de.setMode(g.POINTS):H.isSprite&&de.setMode(g.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)vr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(V.get("WEBGL_multi_draw"))de.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ot=H._multiDrawStarts,xe=H._multiDrawCounts,ne=H._multiDrawCount,on=Lt?S.get(Lt).bytesPerElement:1,Zi=K.get(tt).currentProgram.getUniforms();for(let an=0;an<ne;an++)Zi.setValue(g,"_gl_DrawID",an),de.render(Ot[an]/on,xe[an])}else if(H.isInstancedMesh)de.renderInstances(Jt,Se,H.count);else if(Q.isInstancedBufferGeometry){const Ot=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,xe=Math.min(Q.instanceCount,Ot);de.renderInstances(Jt,Se,xe)}else de.render(Jt,Se)};function pe(E,z,Q){E.transparent===!0&&E.side===Zn&&E.forceSinglePass===!1?(E.side=sn,E.needsUpdate=!0,Tr(E,z,Q),E.side=Ai,E.needsUpdate=!0,Tr(E,z,Q),E.side=Zn):Tr(E,z,Q)}this.compile=function(E,z,Q=null){Q===null&&(Q=E),d=bt.get(Q),d.init(z),w.push(d),Q.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),E!==Q&&E.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights();const tt=new Set;return E.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const _t=H.material;if(_t)if(Array.isArray(_t))for(let wt=0;wt<_t.length;wt++){const It=_t[wt];pe(It,Q,H),tt.add(It)}else pe(_t,Q,H),tt.add(_t)}),d=w.pop(),tt},this.compileAsync=function(E,z,Q=null){const tt=this.compile(E,z,Q);return new Promise(H=>{function _t(){if(tt.forEach(function(wt){K.get(wt).currentProgram.isReady()&&tt.delete(wt)}),tt.size===0){H(E);return}setTimeout(_t,10)}V.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let re=null;function kn(E){re&&re(E)}function wn(){Ri.stop()}function gc(){Ri.start()}const Ri=new vd;Ri.setAnimationLoop(kn),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(E){re=E,ct.setAnimationLoop(E),E===null?Ri.stop():Ri.start()},ct.addEventListener("sessionstart",wn),ct.addEventListener("sessionend",gc),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(z),z=ct.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,z,O),d=bt.get(E,w.length),d.init(z),w.push(d),L.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ee.setFromProjectionMatrix(L,In,z.reversedDepth),rt=this.localClippingEnabled,Yt=pt.init(this.clippingPlanes,rt),m=Y.get(E,y.length),m.init(),y.push(m),ct.enabled===!0&&ct.isPresenting===!0){const _t=M.xr.getDepthSensingMesh();_t!==null&&Fo(_t,z,-1/0,M.sortObjects)}Fo(E,z,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(vt,xt),ft=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ft&&Rt.addToRenderList(m,E),this.info.render.frame++,Yt===!0&&pt.beginShadows();const Q=d.state.shadowsArray;Tt.render(Q,E,z),Yt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const tt=m.opaque,H=m.transmissive;if(d.setupLights(),z.isArrayCamera){const _t=z.cameras;if(H.length>0)for(let wt=0,It=_t.length;wt<It;wt++){const Lt=_t[wt];vc(tt,H,E,Lt)}ft&&Rt.render(E);for(let wt=0,It=_t.length;wt<It;wt++){const Lt=_t[wt];_c(m,E,Lt,Lt.viewport)}}else H.length>0&&vc(tt,H,E,z),ft&&Rt.render(E),_c(m,E,z);O!==null&&C===0&&(ot.updateMultisampleRenderTarget(O),ot.updateRenderTargetMipmap(O)),E.isScene===!0&&E.onAfterRender(M,E,z),Et.resetDefaultState(),T=-1,b=null,w.pop(),w.length>0?(d=w[w.length-1],Yt===!0&&pt.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Fo(E,z,Q,tt){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)Q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ee.intersectsSprite(E)){tt&&k.setFromMatrixPosition(E.matrixWorld).applyMatrix4(L);const wt=N.update(E),It=E.material;It.visible&&m.push(E,wt,It,Q,k.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ee.intersectsObject(E))){const wt=N.update(E),It=E.material;if(tt&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),k.copy(E.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),k.copy(wt.boundingSphere.center)),k.applyMatrix4(E.matrixWorld).applyMatrix4(L)),Array.isArray(It)){const Lt=wt.groups;for(let Bt=0,zt=Lt.length;Bt<zt;Bt++){const Ft=Lt[Bt],Jt=It[Ft.materialIndex];Jt&&Jt.visible&&m.push(E,wt,Jt,Q,k.z,Ft)}}else It.visible&&m.push(E,wt,It,Q,k.z,null)}}const _t=E.children;for(let wt=0,It=_t.length;wt<It;wt++)Fo(_t[wt],z,Q,tt)}function _c(E,z,Q,tt){const H=E.opaque,_t=E.transmissive,wt=E.transparent;d.setupLightsView(Q),Yt===!0&&pt.setGlobalState(M.clippingPlanes,Q),tt&&F.viewport(I.copy(tt)),H.length>0&&br(H,z,Q),_t.length>0&&br(_t,z,Q),wt.length>0&&br(wt,z,Q),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function vc(E,z,Q,tt){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[tt.id]===void 0&&(d.state.transmissionRenderTarget[tt.id]=new $i(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")||V.has("EXT_color_buffer_float")?Er:On,minFilter:Wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));const _t=d.state.transmissionRenderTarget[tt.id],wt=tt.viewport||I;_t.setSize(wt.z*M.transmissionResolutionScale,wt.w*M.transmissionResolutionScale);const It=M.getRenderTarget(),Lt=M.getActiveCubeFace(),Bt=M.getActiveMipmapLevel();M.setRenderTarget(_t),M.getClearColor(at),st=M.getClearAlpha(),st<1&&M.setClearColor(16777215,.5),M.clear(),ft&&Rt.render(Q);const zt=M.toneMapping;M.toneMapping=Si;const Ft=tt.viewport;if(tt.viewport!==void 0&&(tt.viewport=void 0),d.setupLightsView(tt),Yt===!0&&pt.setGlobalState(M.clippingPlanes,tt),br(E,Q,tt),ot.updateMultisampleRenderTarget(_t),ot.updateRenderTargetMipmap(_t),V.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let ue=0,Se=z.length;ue<Se;ue++){const _e=z[ue],de=_e.object,Ot=_e.geometry,xe=_e.material,ne=_e.group;if(xe.side===Zn&&de.layers.test(tt.layers)){const on=xe.side;xe.side=sn,xe.needsUpdate=!0,xc(de,Q,tt,Ot,xe,ne),xe.side=on,xe.needsUpdate=!0,Jt=!0}}Jt===!0&&(ot.updateMultisampleRenderTarget(_t),ot.updateRenderTargetMipmap(_t))}M.setRenderTarget(It,Lt,Bt),M.setClearColor(at,st),Ft!==void 0&&(tt.viewport=Ft),M.toneMapping=zt}function br(E,z,Q){const tt=z.isScene===!0?z.overrideMaterial:null;for(let H=0,_t=E.length;H<_t;H++){const wt=E[H],It=wt.object,Lt=wt.geometry,Bt=wt.group;let zt=wt.material;zt.allowOverride===!0&&tt!==null&&(zt=tt),It.layers.test(Q.layers)&&xc(It,z,Q,Lt,zt,Bt)}}function xc(E,z,Q,tt,H,_t){E.onBeforeRender(M,z,Q,tt,H,_t),E.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(M,z,Q,tt,E,_t),H.transparent===!0&&H.side===Zn&&H.forceSinglePass===!1?(H.side=sn,H.needsUpdate=!0,M.renderBufferDirect(Q,z,tt,H,E,_t),H.side=Ai,H.needsUpdate=!0,M.renderBufferDirect(Q,z,tt,H,E,_t),H.side=Zn):M.renderBufferDirect(Q,z,tt,H,E,_t),E.onAfterRender(M,z,Q,tt,H,_t)}function Tr(E,z,Q){z.isScene!==!0&&(z=j);const tt=K.get(E),H=d.state.lights,_t=d.state.shadowsArray,wt=H.state.version,It=$.getParameters(E,H.state,_t,z,Q),Lt=$.getProgramCacheKey(It);let Bt=tt.programs;tt.environment=E.isMeshStandardMaterial?z.environment:null,tt.fog=z.fog,tt.envMap=(E.isMeshStandardMaterial?Mt:lt).get(E.envMap||tt.environment),tt.envMapRotation=tt.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,Bt===void 0&&(E.addEventListener("dispose",ut),Bt=new Map,tt.programs=Bt);let zt=Bt.get(Lt);if(zt!==void 0){if(tt.currentProgram===zt&&tt.lightsStateVersion===wt)return Sc(E,It),zt}else It.uniforms=$.getUniforms(E),E.onBeforeCompile(It,M),zt=$.acquireProgram(It,Lt),Bt.set(Lt,zt),tt.uniforms=It.uniforms;const Ft=tt.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ft.clippingPlanes=pt.uniform),Sc(E,It),tt.needsLights=Ad(E),tt.lightsStateVersion=wt,tt.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMap.value=H.state.directionalShadowMap,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotShadowMap.value=H.state.spotShadowMap,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMap.value=H.state.pointShadowMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),tt.currentProgram=zt,tt.uniformsList=null,zt}function Mc(E){if(E.uniformsList===null){const z=E.currentProgram.getUniforms();E.uniformsList=ro.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function Sc(E,z){const Q=K.get(E);Q.outputColorSpace=z.outputColorSpace,Q.batching=z.batching,Q.batchingColor=z.batchingColor,Q.instancing=z.instancing,Q.instancingColor=z.instancingColor,Q.instancingMorph=z.instancingMorph,Q.skinning=z.skinning,Q.morphTargets=z.morphTargets,Q.morphNormals=z.morphNormals,Q.morphColors=z.morphColors,Q.morphTargetsCount=z.morphTargetsCount,Q.numClippingPlanes=z.numClippingPlanes,Q.numIntersection=z.numClipIntersection,Q.vertexAlphas=z.vertexAlphas,Q.vertexTangents=z.vertexTangents,Q.toneMapping=z.toneMapping}function bd(E,z,Q,tt,H){z.isScene!==!0&&(z=j),ot.resetTextureUnits();const _t=z.fog,wt=tt.isMeshStandardMaterial?z.environment:null,It=O===null?M.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Is,Lt=(tt.isMeshStandardMaterial?Mt:lt).get(tt.envMap||wt),Bt=tt.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,zt=!!Q.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),Ft=!!Q.morphAttributes.position,Jt=!!Q.morphAttributes.normal,ue=!!Q.morphAttributes.color;let Se=Si;tt.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Se=M.toneMapping);const _e=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,de=_e!==void 0?_e.length:0,Ot=K.get(tt),xe=d.state.lights;if(Yt===!0&&(rt===!0||E!==b)){const Ge=E===b&&tt.id===T;pt.setState(tt,E,Ge)}let ne=!1;tt.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==xe.state.version||Ot.outputColorSpace!==It||H.isBatchedMesh&&Ot.batching===!1||!H.isBatchedMesh&&Ot.batching===!0||H.isBatchedMesh&&Ot.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ot.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ot.instancing===!1||!H.isInstancedMesh&&Ot.instancing===!0||H.isSkinnedMesh&&Ot.skinning===!1||!H.isSkinnedMesh&&Ot.skinning===!0||H.isInstancedMesh&&Ot.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ot.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ot.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ot.instancingMorph===!1&&H.morphTexture!==null||Ot.envMap!==Lt||tt.fog===!0&&Ot.fog!==_t||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==pt.numPlanes||Ot.numIntersection!==pt.numIntersection)||Ot.vertexAlphas!==Bt||Ot.vertexTangents!==zt||Ot.morphTargets!==Ft||Ot.morphNormals!==Jt||Ot.morphColors!==ue||Ot.toneMapping!==Se||Ot.morphTargetsCount!==de)&&(ne=!0):(ne=!0,Ot.__version=tt.version);let on=Ot.currentProgram;ne===!0&&(on=Tr(tt,z,H));let Zi=!1,an=!1,Bs=!1;const Me=on.getUniforms(),hn=Ot.uniforms;if(F.useProgram(on.program)&&(Zi=!0,an=!0,Bs=!0),tt.id!==T&&(T=tt.id,an=!0),Zi||b!==E){F.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Me.setValue(g,"projectionMatrix",E.projectionMatrix),Me.setValue(g,"viewMatrix",E.matrixWorldInverse);const Ze=Me.map.cameraPosition;Ze!==void 0&&Ze.setValue(g,B.setFromMatrixPosition(E.matrixWorld)),X.logarithmicDepthBuffer&&Me.setValue(g,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&Me.setValue(g,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,an=!0,Bs=!0)}if(H.isSkinnedMesh){Me.setOptional(g,H,"bindMatrix"),Me.setOptional(g,H,"bindMatrixInverse");const Ge=H.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),Me.setValue(g,"boneTexture",Ge.boneTexture,ot))}H.isBatchedMesh&&(Me.setOptional(g,H,"batchingTexture"),Me.setValue(g,"batchingTexture",H._matricesTexture,ot),Me.setOptional(g,H,"batchingIdTexture"),Me.setValue(g,"batchingIdTexture",H._indirectTexture,ot),Me.setOptional(g,H,"batchingColorTexture"),H._colorsTexture!==null&&Me.setValue(g,"batchingColorTexture",H._colorsTexture,ot));const dn=Q.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&mt.update(H,Q,on),(an||Ot.receiveShadow!==H.receiveShadow)&&(Ot.receiveShadow=H.receiveShadow,Me.setValue(g,"receiveShadow",H.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(hn.envMap.value=Lt,hn.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),tt.isMeshStandardMaterial&&tt.envMap===null&&z.environment!==null&&(hn.envMapIntensity.value=z.environmentIntensity),an&&(Me.setValue(g,"toneMappingExposure",M.toneMappingExposure),Ot.needsLights&&Td(hn,Bs),_t&&tt.fog===!0&&it.refreshFogUniforms(hn,_t),it.refreshMaterialUniforms(hn,tt,q,nt,d.state.transmissionRenderTarget[E.id]),ro.upload(g,Mc(Ot),hn,ot)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(ro.upload(g,Mc(Ot),hn,ot),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&Me.setValue(g,"center",H.center),Me.setValue(g,"modelViewMatrix",H.modelViewMatrix),Me.setValue(g,"normalMatrix",H.normalMatrix),Me.setValue(g,"modelMatrix",H.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){const Ge=tt.uniformsGroups;for(let Ze=0,Oo=Ge.length;Ze<Oo;Ze++){const Ci=Ge[Ze];kt.update(Ci,on),kt.bind(Ci,on)}}return on}function Td(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function Ad(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(E,z,Q){const tt=K.get(E);tt.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,tt.__autoAllocateDepthBuffer===!1&&(tt.__useRenderToTexture=!1),K.get(E.texture).__webglTexture=z,K.get(E.depthTexture).__webglTexture=tt.__autoAllocateDepthBuffer?void 0:Q,tt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,z){const Q=K.get(E);Q.__webglFramebuffer=z,Q.__useDefaultFramebuffer=z===void 0};const wd=g.createFramebuffer();this.setRenderTarget=function(E,z=0,Q=0){O=E,D=z,C=Q;let tt=!0,H=null,_t=!1,wt=!1;if(E){const Lt=K.get(E);if(Lt.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(g.FRAMEBUFFER,null),tt=!1;else if(Lt.__webglFramebuffer===void 0)ot.setupRenderTarget(E);else if(Lt.__hasExternalTextures)ot.rebindTextures(E,K.get(E.texture).__webglTexture,K.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ft=E.depthTexture;if(Lt.__boundDepthTexture!==Ft){if(Ft!==null&&K.has(Ft)&&(E.width!==Ft.image.width||E.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(E)}}const Bt=E.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(wt=!0);const zt=K.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[z])?H=zt[z][Q]:H=zt[z],_t=!0):E.samples>0&&ot.useMultisampledRTT(E)===!1?H=K.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?H=zt[Q]:H=zt,I.copy(E.viewport),G.copy(E.scissor),J=E.scissorTest}else I.copy(Pt).multiplyScalar(q).floor(),G.copy(Nt).multiplyScalar(q).floor(),J=Qt;if(Q!==0&&(H=wd),F.bindFramebuffer(g.FRAMEBUFFER,H)&&tt&&F.drawBuffers(E,H),F.viewport(I),F.scissor(G),F.setScissorTest(J),_t){const Lt=K.get(E.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_CUBE_MAP_POSITIVE_X+z,Lt.__webglTexture,Q)}else if(wt){const Lt=z;for(let Bt=0;Bt<E.textures.length;Bt++){const zt=K.get(E.textures[Bt]);g.framebufferTextureLayer(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0+Bt,zt.__webglTexture,Q,Lt)}}else if(E!==null&&Q!==0){const Lt=K.get(E.texture);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Lt.__webglTexture,Q)}T=-1},this.readRenderTargetPixels=function(E,z,Q,tt,H,_t,wt,It=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=K.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(Lt=Lt[wt]),Lt){F.bindFramebuffer(g.FRAMEBUFFER,Lt);try{const Bt=E.textures[It],zt=Bt.format,Ft=Bt.type;if(!X.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!X.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-tt&&Q>=0&&Q<=E.height-H&&(E.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+It),g.readPixels(z,Q,tt,H,Ct.convert(zt),Ct.convert(Ft),_t))}finally{const Bt=O!==null?K.get(O).__webglFramebuffer:null;F.bindFramebuffer(g.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(E,z,Q,tt,H,_t,wt,It=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=K.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(Lt=Lt[wt]),Lt)if(z>=0&&z<=E.width-tt&&Q>=0&&Q<=E.height-H){F.bindFramebuffer(g.FRAMEBUFFER,Lt);const Bt=E.textures[It],zt=Bt.format,Ft=Bt.type;if(!X.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!X.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=g.createBuffer();g.bindBuffer(g.PIXEL_PACK_BUFFER,Jt),g.bufferData(g.PIXEL_PACK_BUFFER,_t.byteLength,g.STREAM_READ),E.textures.length>1&&g.readBuffer(g.COLOR_ATTACHMENT0+It),g.readPixels(z,Q,tt,H,Ct.convert(zt),Ct.convert(Ft),0);const ue=O!==null?K.get(O).__webglFramebuffer:null;F.bindFramebuffer(g.FRAMEBUFFER,ue);const Se=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);return g.flush(),await cv(g,Se,4),g.bindBuffer(g.PIXEL_PACK_BUFFER,Jt),g.getBufferSubData(g.PIXEL_PACK_BUFFER,0,_t),g.deleteBuffer(Jt),g.deleteSync(Se),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,z=null,Q=0){const tt=Math.pow(2,-Q),H=Math.floor(E.image.width*tt),_t=Math.floor(E.image.height*tt),wt=z!==null?z.x:0,It=z!==null?z.y:0;ot.setTexture2D(E,0),g.copyTexSubImage2D(g.TEXTURE_2D,Q,0,0,wt,It,H,_t),F.unbindTexture()};const Rd=g.createFramebuffer(),Cd=g.createFramebuffer();this.copyTextureToTexture=function(E,z,Q=null,tt=null,H=0,_t=null){_t===null&&(H!==0?(vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_t=H,H=0):_t=0);let wt,It,Lt,Bt,zt,Ft,Jt,ue,Se;const _e=E.isCompressedTexture?E.mipmaps[_t]:E.image;if(Q!==null)wt=Q.max.x-Q.min.x,It=Q.max.y-Q.min.y,Lt=Q.isBox3?Q.max.z-Q.min.z:1,Bt=Q.min.x,zt=Q.min.y,Ft=Q.isBox3?Q.min.z:0;else{const dn=Math.pow(2,-H);wt=Math.floor(_e.width*dn),It=Math.floor(_e.height*dn),E.isDataArrayTexture?Lt=_e.depth:E.isData3DTexture?Lt=Math.floor(_e.depth*dn):Lt=1,Bt=0,zt=0,Ft=0}tt!==null?(Jt=tt.x,ue=tt.y,Se=tt.z):(Jt=0,ue=0,Se=0);const de=Ct.convert(z.format),Ot=Ct.convert(z.type);let xe;z.isData3DTexture?(ot.setTexture3D(z,0),xe=g.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(ot.setTexture2DArray(z,0),xe=g.TEXTURE_2D_ARRAY):(ot.setTexture2D(z,0),xe=g.TEXTURE_2D),g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL,z.flipY),g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),g.pixelStorei(g.UNPACK_ALIGNMENT,z.unpackAlignment);const ne=g.getParameter(g.UNPACK_ROW_LENGTH),on=g.getParameter(g.UNPACK_IMAGE_HEIGHT),Zi=g.getParameter(g.UNPACK_SKIP_PIXELS),an=g.getParameter(g.UNPACK_SKIP_ROWS),Bs=g.getParameter(g.UNPACK_SKIP_IMAGES);g.pixelStorei(g.UNPACK_ROW_LENGTH,_e.width),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,_e.height),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Bt),g.pixelStorei(g.UNPACK_SKIP_ROWS,zt),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Ft);const Me=E.isDataArrayTexture||E.isData3DTexture,hn=z.isDataArrayTexture||z.isData3DTexture;if(E.isDepthTexture){const dn=K.get(E),Ge=K.get(z),Ze=K.get(dn.__renderTarget),Oo=K.get(Ge.__renderTarget);F.bindFramebuffer(g.READ_FRAMEBUFFER,Ze.__webglFramebuffer),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,Oo.__webglFramebuffer);for(let Ci=0;Ci<Lt;Ci++)Me&&(g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,K.get(E).__webglTexture,H,Ft+Ci),g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,K.get(z).__webglTexture,_t,Se+Ci)),g.blitFramebuffer(Bt,zt,wt,It,Jt,ue,wt,It,g.DEPTH_BUFFER_BIT,g.NEAREST);F.bindFramebuffer(g.READ_FRAMEBUFFER,null),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else if(H!==0||E.isRenderTargetTexture||K.has(E)){const dn=K.get(E),Ge=K.get(z);F.bindFramebuffer(g.READ_FRAMEBUFFER,Rd),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,Cd);for(let Ze=0;Ze<Lt;Ze++)Me?g.framebufferTextureLayer(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,dn.__webglTexture,H,Ft+Ze):g.framebufferTexture2D(g.READ_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,dn.__webglTexture,H),hn?g.framebufferTextureLayer(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,Ge.__webglTexture,_t,Se+Ze):g.framebufferTexture2D(g.DRAW_FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,Ge.__webglTexture,_t),H!==0?g.blitFramebuffer(Bt,zt,wt,It,Jt,ue,wt,It,g.COLOR_BUFFER_BIT,g.NEAREST):hn?g.copyTexSubImage3D(xe,_t,Jt,ue,Se+Ze,Bt,zt,wt,It):g.copyTexSubImage2D(xe,_t,Jt,ue,Bt,zt,wt,It);F.bindFramebuffer(g.READ_FRAMEBUFFER,null),F.bindFramebuffer(g.DRAW_FRAMEBUFFER,null)}else hn?E.isDataTexture||E.isData3DTexture?g.texSubImage3D(xe,_t,Jt,ue,Se,wt,It,Lt,de,Ot,_e.data):z.isCompressedArrayTexture?g.compressedTexSubImage3D(xe,_t,Jt,ue,Se,wt,It,Lt,de,_e.data):g.texSubImage3D(xe,_t,Jt,ue,Se,wt,It,Lt,de,Ot,_e):E.isDataTexture?g.texSubImage2D(g.TEXTURE_2D,_t,Jt,ue,wt,It,de,Ot,_e.data):E.isCompressedTexture?g.compressedTexSubImage2D(g.TEXTURE_2D,_t,Jt,ue,_e.width,_e.height,de,_e.data):g.texSubImage2D(g.TEXTURE_2D,_t,Jt,ue,wt,It,de,Ot,_e);g.pixelStorei(g.UNPACK_ROW_LENGTH,ne),g.pixelStorei(g.UNPACK_IMAGE_HEIGHT,on),g.pixelStorei(g.UNPACK_SKIP_PIXELS,Zi),g.pixelStorei(g.UNPACK_SKIP_ROWS,an),g.pixelStorei(g.UNPACK_SKIP_IMAGES,Bs),_t===0&&z.generateMipmaps&&g.generateMipmap(xe),F.unbindTexture()},this.initRenderTarget=function(E){K.get(E).__webglFramebuffer===void 0&&ot.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ot.setTextureCube(E,0):E.isData3DTexture?ot.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ot.setTexture2DArray(E,0):ot.setTexture2D(E,0),F.unbindTexture()},this.resetState=function(){D=0,C=0,O=null,F.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}}const _f={type:"change"},pc={type:"start"},yd={type:"end"},Kr=new lc,vf=new gi,Cy=Math.cos(70*sd.DEG2RAD),Ce=new W,Je=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ra=1e-6;class Py extends Xv{constructor(t,e=null){super(t,e),this.state=he.NONE,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bs.ROTATE,MIDDLE:bs.DOLLY,RIGHT:bs.PAN},this.touches={ONE:gs.ROTATE,TWO:gs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new Yi,this._lastTargetPosition=new W,this._quat=new Yi().setFromUnitVectors(t.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wu,this._sphericalDelta=new Wu,this._scale=1,this._panOffset=new W,this._rotateStart=new Ht,this._rotateEnd=new Ht,this._rotateDelta=new Ht,this._panStart=new Ht,this._panEnd=new Ht,this._panDelta=new Ht,this._dollyStart=new Ht,this._dollyEnd=new Ht,this._dollyDelta=new Ht,this._dollyDirection=new W,this._mouse=new Ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ly.bind(this),this._onPointerDown=Dy.bind(this),this._onPointerUp=Iy.bind(this),this._onContextMenu=ky.bind(this),this._onMouseWheel=Fy.bind(this),this._onKeyDown=Oy.bind(this),this._onTouchStart=By.bind(this),this._onTouchMove=zy.bind(this),this._onMouseDown=Uy.bind(this),this._onMouseMove=Ny.bind(this),this._interceptControlDown=Hy.bind(this),this._interceptControlUp=Vy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_f),this.update(),this.state=he.NONE}update(t=null){const e=this.object.position;Ce.copy(e).sub(this.target),Ce.applyQuaternion(this._quat),this._spherical.setFromVector3(Ce),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Je:i>Math.PI&&(i-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ce.setFromSpherical(this._spherical),Ce.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ce),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ce.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new W(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new W(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ce.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Kr.origin.copy(this.object.position),Kr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Kr.direction))<Cy?this.object.lookAt(this.target):(vf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Kr.intersectPlane(vf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ra||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ra||this._lastTargetPosition.distanceToSquared(this.target)>Ra?(this.dispatchEvent(_f),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ce.setFromMatrixColumn(e,0),Ce.multiplyScalar(-t),this._panOffset.add(Ce)}_panUp(t,e){this.screenSpacePanning===!0?Ce.setFromMatrixColumn(e,1):(Ce.setFromMatrixColumn(e,0),Ce.crossVectors(this.object.up,Ce)),Ce.multiplyScalar(t),this._panOffset.add(Ce)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ce.copy(s).sub(this.target);let r=Ce.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ht,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Dy(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Ly(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Iy(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yd),this.state=he.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Uy(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case bs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=he.DOLLY;break;case bs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}break;case bs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(pc)}function Ny(n){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Fy(n){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(n.preventDefault(),this.dispatchEvent(pc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(yd))}function Oy(n){this.enabled!==!1&&this._handleKeyDown(n)}function By(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case gs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=he.TOUCH_ROTATE;break;case gs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case gs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=he.TOUCH_DOLLY_PAN;break;case gs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(pc)}function zy(n){switch(this._trackPointer(n),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=he.NONE}}function ky(n){this.enabled!==!1&&n.preventDefault()}function Hy(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vy(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Gy=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},Wy={class:"relative flex flex-col gap-4 px-4 pt-8"},Xy={class:"motor-viewer"},qy={class:"motor-viewer-stage"},Yy={class:"detail-header"},$y={class:"detail-body"},jy={class:"metric-card"},Ky={class:"metric-value"},Zy={class:"metric-trend"},Jy={class:"metric-card"},Qy={class:"metric-value"},tb={class:"metric-trend"},eb={class:"metric-card"},nb={class:"metric-value"},ib={class:"metric-trend"},sb={class:"metric-card"},rb={class:"subsystems"},ob={class:"subsystem-label"},ab={key:1,class:"subsystem-row"},lb={class:"metric-card"},cb={class:"subsystems"},ub=["onClick"],fb={class:"subsystem-label"},hb={__name:"ThreeDMotor",setup(n){const t=ze(null),e=ee(),i=ze(null),s=ze(!1),r=ce(()=>e.components??[]),o=ce(()=>i.value??r.value[0]??null),a=ce(()=>i.value?.events??e.events??[]),l=ce(()=>o.value?.status===1?"이상 감지":"정상"),c=ce(()=>o.value?.status===1?"status-1":"status-0"),u=ce(()=>(o.value?.score??0).toFixed(2)),f=ce(()=>o.value?.trend??e.trend??""),h=ce(()=>{const B=o.value?.temperature?.current;return typeof B=="number"?`${B}°C`:"N/A"}),p=ce(()=>o.value?.temperature?.note??""),v=ce(()=>{const B=o.value?.vibration?.current;return typeof B=="number"?`${B} mm/s`:"N/A"}),x=ce(()=>o.value?.vibration?.note??"");let m=null,d=null,y=null,w=null,M=null,R=[],D=null;const C=new Wv,O=new Ht;let T=null,b=null;const I=B=>{B&&(i.value=B,s.value=!0,Pt(B.id))},G=()=>{s.value=!1,Pt(null)},J=()=>{!M||!d||!w||Nt()},at=()=>{const B=t.value;if(!B)return;m=new Uv,m.background=new jt("#0b0f18"),y=new Ry({antialias:!0}),y.setPixelRatio(Math.min(window.devicePixelRatio,2)),y.setSize(B.clientWidth,B.clientHeight),y.domElement.style.cursor="grab",B.innerHTML="",B.appendChild(y.domElement),d=new _n(50,B.clientWidth/B.clientHeight,.1,100),d.position.set(3,2.2,3.4),w=new Py(d,y.domElement),w.enableDamping=!0,w.dampingFactor=.08,w.minDistance=1.1,w.maxDistance=9;const k=new Vv(16777215,.65),j=new Hu(16777215,.9);j.position.set(5,6,4);const ft=new Hu(7387135,.3);ft.position.set(-4,3,-6),m.add(k,j,ft),M=new Ys,M.position.y=.4,m.add(M),R=Yt(e.components),R.forEach(U=>M.add(U.mesh)),rt(R);const A=new se(new fc(4.5,64),new Bu({color:1054242,roughness:1,metalness:0}));A.rotation.x=-Math.PI/2,A.position.y=-.75,m.add(A);const g=e.components?.find(U=>U.status===1)??e.components?.[0]??null;g&&I(g),Nt(),st(),window.addEventListener("resize",et),T=U=>nt(U),b=U=>q(U),y.domElement.addEventListener("pointermove",T),y.domElement.addEventListener("click",b)},st=()=>{D=requestAnimationFrame(st),w&&w.update(),y&&m&&d&&y.render(m,d)},et=()=>{if(!y||!d||!t.value)return;const B=t.value.clientWidth,k=t.value.clientHeight;d.aspect=B/Math.max(k,1),d.updateProjectionMatrix(),y.setSize(B,k),Nt()},nt=B=>{if(!y||!d)return;vt(B),C.setFromCamera(O,d);const k=C.intersectObjects(xt(),!1);y.domElement.style.cursor=k.length>0?"pointer":"grab"},q=B=>{if(!y||!d)return;vt(B),C.setFromCamera(O,d);const k=C.intersectObjects(xt(),!1);if(!k.length)return;const j=R.find(ft=>ft.mesh===k[0].object);j?.component&&I(j.component)},vt=B=>{if(!y)return;const k=y.domElement.getBoundingClientRect(),j=B.clientX-k.left,ft=B.clientY-k.top;O.x=j/k.width*2-1,O.y=-(ft/k.height)*2+1},xt=()=>R.filter(B=>B.interactive!==!1).map(B=>B.mesh),Pt=B=>{R.forEach(k=>{if(!k.mesh?.material||!("emissive"in k.mesh.material))return;const ft=B&&k.component?.id===B?new jt(.1,.2,.35):L(k.component);k.mesh.material.emissive.copy(ft),k.mesh.material.needsUpdate=!0})},Nt=()=>{if(!M||!d||!w||!t.value)return;const B=new Fs().setFromObject(M),k=B.getCenter(new W),j=new Io;B.getBoundingSphere(j);const ft=t.value,A=ft.clientWidth/Math.max(ft.clientHeight,1),g=sd.degToRad(d.fov),U=2*Math.atan(Math.tan(g/2)*A),V=Math.max(Math.sin(g/2),1e-4),X=Math.max(Math.sin(U/2),1e-4),F=j.radius/V,ht=j.radius/X,K=Math.max(F,ht),ot=K*.85,lt=j.radius*.38,Mt=new W(k.x+lt,k.y,k.z),_=new W(.65,.32,1).normalize().clone().multiplyScalar(ot).add(Mt);d.position.copy(_),d.lookAt(Mt),w.target.copy(Mt),w.minDistance=Math.max(K*.35,.75),w.maxDistance=K*2.2,w.update()},Qt=()=>{cancelAnimationFrame(D),window.removeEventListener("resize",et),y?.domElement&&(y.domElement.removeEventListener("pointermove",T),y.domElement.removeEventListener("click",b)),w?.dispose(),M?.traverse(B=>{B.isMesh&&(B.geometry?.dispose(),Array.isArray(B.material)?B.material.forEach(k=>k.dispose?.()):B.material?.dispose?.())}),y?.dispose(),m=null,d=null,y=null,w=null,M=null,R=[],D=null,T=null,b=null};function ee(){return{id:"ac-motor-01",name:"AC 모터 #01",status:0,score:.18,trend:"지난 24시간 평균 0.12",temperature:{current:63,note:"허용 범위 40~75°C"},vibration:{current:2.6,note:"ISO 10816 기준 양호"},events:[{title:"6분 전 · 베어링 온도 67°C",note:"냉각팬 RPM을 확인하세요."},{title:"43분 전 · 진동 스파이크",note:"고정자 전류 불균형 감지."}],components:[{id:"housing",name:"모터 하우징",status:0,score:.12,baseColor:"#1a7fad",trend:"최근 1시간 평균 0.09",temperature:{current:58,note:"외부 케이스 온도 안정"},vibration:{current:1.8,note:"정상 범위"}},{id:"stator",name:"고정자",status:0,score:.21,baseColor:"#2d4f9e",trend:"최근 30분 상승 추세",temperature:{current:66,note:"권선 저항 상승 감시"},vibration:{current:2.4,note:"자기력 균형 유지"}},{id:"rotor",name:"회전자",status:1,score:.87,baseColor:"#cbd6dd",trend:"최근 5분 급상승",temperature:{current:72,note:"허용치 근접 · 윤활 확인"},vibration:{current:3.7,note:"임계치 접근 · 정밀 진단 필요"},events:[{title:"2분 전 · 진동 3.9mm/s",note:"좌측 베어링 공진 의심"},{title:"8분 전 · 온도 알람",note:"냉각 라인 확인 요망"}]},{id:"fan",name:"냉각 팬",status:0,score:.16,baseColor:"#2a3545",trend:"안정적",temperature:{current:54,note:"흡입구 온도 정상"},vibration:{current:1.2,note:"균형 양호"}},{id:"terminal",name:"단자함",status:0,score:.09,baseColor:"#1b748c",trend:"안정적",temperature:{current:47,note:"내부 온도 정상"},vibration:{current:.4,note:"진동 영향 미미"}}]}}function Yt(B=[]){const k=[],j=P=>B.find(ct=>ct.id===P),ft=(P,ct,dt)=>new Bu({color:new jt(P),metalness:ct,roughness:dt}),A=(P,ct,dt=!1)=>(P.userData.component=ct,k.push({mesh:P,component:ct,interactive:dt}),P),g=j("housing"),U=j("stator"),V=j("rotor"),X=j("fan"),F=j("terminal"),ht=ft(g?.baseColor??"#1a7fad",.55,.35),K=A(new se(new Ye(.88,.88,1.65,64,1,!1),ht.clone()),g,!0);K.rotation.z=Math.PI/2;const ot=ft(g?.baseColor??"#1a7fad",.5,.38),lt=18,Mt=1.7,S=.1,_=.32,N=.66;for(let P=0;P<lt;P+=1){const ct=P/lt*Math.PI*2,dt=Math.cos(ct);if(dt<-.4)continue;const At=A(new se(new gn(Mt,S,_),ot.clone()),g);At.rotation.x=ct,At.position.set(0,dt*N,Math.sin(ct)*N)}const $=ft("#a3c5d4",.65,.25),it=A(new se(new Ye(1.02,1.08,.24,48),$),g);it.rotation.z=Math.PI/2,it.position.x=.95;const Y=A(new se(new Ye(1.08,1.14,.08,48),ft("#7ca3b7",.5,.35)),g);Y.rotation.z=Math.PI/2,Y.position.x=1.04;const bt=A(new se(new Ye(.45,.6,.2,32),ft("#d2e3ea",.72,.2)),g);bt.rotation.z=Math.PI/2,bt.position.x=1.12;const pt=ft("#d7d9dd",.55,.2),Tt=.95,Rt=6;for(let P=0;P<Rt;P+=1){const ct=P/Rt*Math.PI*2,dt=A(new se(new Ye(.05,.05,.28,16),pt.clone()),g);dt.rotation.x=Math.PI/2,dt.rotation.z=Math.PI/2,dt.position.set(1.05,Math.cos(ct)*Tt,Math.sin(ct)*Tt)}const mt=A(new se(new Ye(.84,.88,.32,48),ft(X?.baseColor??"#2a3545",.45,.55)),X,!0);mt.rotation.z=Math.PI/2,mt.position.x=-.88;const St=A(new se(new Ye(.3,.3,.02,24)),X);St.material=ft("#d7d9dd",.4,.6),St.rotation.z=Math.PI/2,St.position.x=-1.02;const Dt=8;for(let P=0;P<Dt;P+=1){const ct=P/Dt*Math.PI,dt=A(new se(new gn(.7,.03,.04),ft("#5b6574",.35,.6)),X);dt.rotation.x=Math.PI/2,dt.rotation.z=ct,dt.position.x=-.99}const Ct=A(new se(new gn(2.2,.16,1.2),ft("#102835",.35,.75)),g);Ct.position.y=-1;const Et=new gn(.7,.24,1.1);[.72,-.72].forEach(P=>{A(new se(Et.clone(),ft("#153848",.3,.7)),g).position.set(P,-.92,0)});const kt=new gn(.78,.08,1.28);if([.72,-.72].forEach(P=>{A(new se(kt.clone(),ft("#0c1d26",.25,.8)),g).position.set(P,-1.12,0)}),F){A(new se(new gn(.75,.45,.62),ft(F.baseColor??"#1b748c",.5,.4)),F,!0).position.set(-.18,.84,0),A(new se(new gn(.82,.08,.68),ft("#215f73",.4,.55)),F).position.set(-.18,1.07,0);const dt=A(new se(new hc(.28,.05,12,36),ft("#c62828",.2,.35)),F);dt.rotation.x=Math.PI/2.4,dt.position.set(-.18,1.17,0);const At=A(new se(new Ye(.09,.09,.36,24),ft("#0c1d26",.3,.65)),F);At.rotation.z=Math.PI/2,At.position.set(-.6,.78,0)}if(U){const P=A(new se(new Ye(.58,.58,1.45,48),ft(U.baseColor??"#2d4f9e",.35,.55)),U,!0);P.rotation.z=Math.PI/2,P.position.x=-.02}if(V){const P=A(new se(new Ye(.34,.34,1.55,48),ft(V.baseColor??"#cbd6dd",.55,.35)),V,!0);P.rotation.z=Math.PI/2,P.position.x=0;const ct=A(new se(new Ye(.13,.13,3.6,32),ft("#b5b8bd",.62,.28)),V);ct.rotation.z=Math.PI/2;const dt=A(new se(new Ye(.22,.22,.28,32),ft("#d9dcdf",.6,.25)),V);dt.rotation.z=Math.PI/2,dt.position.x=1.3;const At=A(new se(new Ye(.18,.18,.46,32),ft("#e7e9eb",.58,.18)),V);At.rotation.z=Math.PI/2,At.position.x=1.56}return k}function rt(B){B.forEach(({mesh:k,component:j})=>{if(!j||!k.material)return;const ft=j.status===1,A=j.baseColor??"#9aa0a6",g=ft?new jt("#ff4d4f"):new jt(A);if(k.material.color?.copy?.(g),"emissive"in k.material){const U=L(j);k.material.emissive.copy(U)}})}function L(B){return B?B.status===1?new jt(.25,0,0):new jt("#04090f"):new jt("#04090f")}return wo(()=>{at()}),Mr(()=>{Qt()}),(B,k)=>(Wt(),te("section",Wy,[Z("div",{class:"flex items-center justify-between"},[k[0]||(k[0]=Z("h2",{class:"text-black dark:text-white text-2xl font-bold"},"3D 모터 상태 뷰어",-1)),Z("button",{type:"button",class:"rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white transition hover:bg-white/10 dark:border-white/20",onClick:J}," 카메라 리셋 ")]),Z("div",Xy,[Z("div",qy,[Z("div",{ref_key:"threeContainer",ref:t,class:"three-canvas"},null,512),k[1]||(k[1]=Z("div",{class:"hud"},"마우스: 드래그=회전, 휠=줌, 우클릭=패닝",-1))]),o.value?(Wt(),te("aside",{key:0,class:en(["detail-panel",{hidden:!s.value}])},[Z("div",Yy,[Z("h2",null,Zt(o.value.name),1),Z("button",{type:"button",class:"detail-close",onClick:G},"닫기")]),Z("div",$y,[Z("div",{class:en(["status-pill",c.value])},Zt(l.value),3),Z("div",jy,[k[2]||(k[2]=Z("span",{class:"metric-title"},"현재 이상 스코어",-1)),Z("span",Ky,Zt(u.value),1),Z("span",Zy,Zt(f.value),1)]),Z("div",Jy,[k[3]||(k[3]=Z("span",{class:"metric-title"},"온도",-1)),Z("span",Qy,Zt(h.value),1),Z("span",tb,Zt(p.value),1)]),Z("div",eb,[k[4]||(k[4]=Z("span",{class:"metric-title"},"진동 (RMS)",-1)),Z("span",nb,Zt(v.value),1),Z("span",ib,Zt(x.value),1)]),Z("div",sb,[k[6]||(k[6]=Z("span",{class:"metric-title"},"최근 이벤트",-1)),Z("div",rb,[a.value.length?(Wt(!0),te(we,{key:0},bi(a.value,j=>(Wt(),te("div",{key:j.title,class:"subsystem-row"},[Z("div",ob,[Z("strong",null,Zt(j.title),1),Z("span",null,Zt(j.note),1)])]))),128)):(Wt(),te("div",ab,[...k[5]||(k[5]=[Z("div",{class:"subsystem-label"},[Z("strong",null,"최근 경고 없음"),Z("span",null,"이벤트가 기록되면 여기에 표시됩니다.")],-1)])]))])]),Z("div",lb,[k[7]||(k[7]=Z("span",{class:"metric-title"},"구성 요소 상태",-1)),Z("div",cb,[(Wt(!0),te(we,null,bi(r.value,j=>(Wt(),te("div",{key:j.id,class:en(["subsystem-row",{"subsystem-row--active":o.value&&j.id===o.value.id,"subsystem-row--clickable":!0}]),onClick:ft=>I(j)},[Z("div",fb,[Z("strong",null,Zt(j.name),1),Z("span",null,"스코어 "+Zt(j.score.toFixed(2))+" · "+Zt(j.status===1?"이상":"정상"),1)]),Z("div",{class:en(["status-pill",j.status===1?"status-1":"status-0"])},Zt(j.status===1?"이상":"정상"),3)],10,ub))),128))])])])],2)):Po("",!0)])]))}},db=Gy(hb,[["__scopeId","data-v-d9b4ae7d"]]);function pb(n,t=6e4){const e=ze(!1),i=ze(null);let s=null;const r=async()=>{if(e.value){console.log("⏳ 이미 갱신 중입니다. 건너뜁니다.");return}try{e.value=!0,await n(),i.value=new Date,console.log(`✅ 데이터 갱신 완료: ${i.value.toLocaleTimeString()}`)}catch(l){console.error("❌ 자동 갱신 실패:",l)}finally{e.value=!1}},o=()=>{if(s){console.log("⚠️ 이미 자동 갱신이 실행 중입니다.");return}console.log(`🔄 자동 갱신 시작 (${t/1e3}초 간격)`),s=setInterval(r,t)},a=()=>{s&&(clearInterval(s),s=null,console.log("⏹️ 자동 갱신 중지"))};return Mr(()=>{a()}),{isRefreshing:e,lastUpdated:i,refresh:r,startAutoRefresh:o,stopAutoRefresh:a}}function mb(){const n=qf([]),t=ze(!1),e=ze(null),i=async(c=50)=>{t.value=!0,e.value=null;try{const u=await l_.getSingleBearingResults(c);n.value=u,console.log(`✅ AI 결과 ${u.length}개 로드 완료`)}catch(u){e.value=u.message,console.error("❌ AI 결과 로드 실패:",u)}finally{t.value=!1}},s=(c=60)=>{if(!n.value||n.value.length===0)return Array.from({length:c},(v,x)=>({label:`${x}분`,value:0}));const u=new Date,f=new Map;for(let v=c-1;v>=0;v--){const m=new Date(u.getTime()-v*60*1e3).toISOString().slice(0,16);f.set(m,[])}n.value.forEach(v=>{const m=new Date(v.createdAt).toISOString().slice(0,16);f.has(m)&&f.get(m).push(v.result)});const h=[];return Array.from(f.keys()).sort().forEach((v,x)=>{const d=(f.get(v)||[]).some(M=>M===1),w=new Date(v).getMinutes();h.push({label:`${String(w).padStart(2,"0")}분`,value:d?1:0})}),h},{isRefreshing:r,lastUpdated:o,startAutoRefresh:a,stopAutoRefresh:l}=pb(()=>i(500),6e4);return{aiResults:n,loading:t,error:e,isRefreshing:r,lastUpdated:o,fetchAiResults:i,getMinuteData:s,startAutoRefresh:a,stopAutoRefresh:l}}function gb(n){const t=ce(()=>(n.value.length>0?n.value[0].result:0)===1?{id:"B001",status:"이상 감지",icon:"warning",statusClass:"border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20",iconBgClass:"bg-yellow-500/20",iconColorClass:"text-yellow-500",textClass:"text-sm text-yellow-700 dark:text-yellow-300"}:{id:"B001",status:"정상",icon:"check_circle",statusClass:"border-green-500/50 bg-green-500/10 dark:bg-green-500/20",iconBgClass:"bg-green-500/20",iconColorClass:"text-green-500",textClass:"text-sm text-green-700 dark:text-green-300"}),e=[{id:"B002",status:"이상 감지",icon:"warning",statusClass:"border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20",iconBgClass:"bg-yellow-500/20",iconColorClass:"text-yellow-500",textClass:"text-sm text-yellow-700 dark:text-yellow-300"},{id:"B003",status:"수리 중",icon:"build",statusClass:"border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/20",iconBgClass:"bg-blue-500/20",iconColorClass:"text-blue-500",textClass:"text-sm text-blue-700 dark:text-blue-300"},{id:"B004",status:"위험",icon:"error",statusClass:"border-red-500/50 bg-red-500/10 dark:bg-red-500/20",iconBgClass:"bg-red-500/20",iconColorClass:"text-red-500",textClass:"text-sm text-red-700 dark:text-red-300"},{id:"B005",status:"정상",icon:"check_circle",statusClass:"border-green-500/50 bg-green-500/10 dark:bg-green-500/20",iconBgClass:"bg-green-500/20",iconColorClass:"text-green-500",textClass:"text-sm text-green-700 dark:text-green-300"},{id:"B006",status:"정상",icon:"check_circle",statusClass:"border-green-500/50 bg-green-500/10 dark:bg-green-500/20",iconBgClass:"bg-green-500/20",iconColorClass:"text-green-500",textClass:"text-sm text-green-700 dark:text-green-300"},{id:"B007",status:"이상 감지",icon:"warning",statusClass:"border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20",iconBgClass:"bg-yellow-500/20",iconColorClass:"text-yellow-500",textClass:"text-sm text-yellow-700 dark:text-yellow-300"},{id:"B008",status:"정상",icon:"check_circle",statusClass:"border-green-500/50 bg-green-500/10 dark:bg-green-500/20",iconBgClass:"bg-green-500/20",iconColorClass:"text-green-500",textClass:"text-sm text-green-700 dark:text-green-300"}];return{bearings:ce(()=>[t.value,...e]),b001Status:t}}const _b={class:"relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden"},vb={class:"layout-container flex h-full grow flex-col"},xb={class:"px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8"},Mb={class:"layout-content-container flex flex-col w-full max-w-6xl"},Sb={class:"flex flex-col gap-2 p-4"},Eb={class:"flex items-center justify-between"},yb={key:0,class:"mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3"},bb={class:"flex-1"},Tb={class:"text-red-600 dark:text-red-400 text-sm"},Ab={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"},wb={class:"grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6"},Rb={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"},Cb={class:"flex flex-col gap-8 p-4"},Pb={__name:"BearingDashboard",setup(n){const{aiResults:t,error:e,fetchAiResults:i,getMinuteData:s,isRefreshing:r,lastUpdated:o,startAutoRefresh:a,stopAutoRefresh:l}=mb(),{bearings:c}=gb(t),u=ce(()=>s(60)),f=ce(()=>{const m=new Date,d=[];for(let y=0;y<60;y+=5){const w=new Date(m.getTime()-(60-y)*60*1e3),M=w.getHours(),R=w.getMinutes();d.push(`${M}:${String(R).padStart(2,"0")}`)}return d}),h=ce(()=>{const m=t.value.filter(y=>y.result===1).length,d=t.value.length;return[{label:"총 베어링 수",value:"1"},{label:"활성 알림",value:m.toString()},{label:"예측 수",value:d.toString()}]}),p=[{id:1,startTime:"2025-10-15 04:40:33",endTime:"2025-10-15 04:40:34",status:"Success",statusClass:"inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300",duration:"1s",message:"재학습이 성공적으로 완료되었습니다."},{id:2,startTime:"2025-10-15 06:55:48",endTime:"2025-10-15 06:55:50",status:"Success",statusClass:"inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300",duration:"2s",message:"재학습이 성공적으로 완료되었습니다."}],v=ze(null),x=m=>{v.value=m};return wo(async()=>{await i(500),a()}),Mr(()=>{l()}),(m,d)=>(Wt(),te("div",_b,[Z("div",vb,[ye(e_),Z("main",xb,[Z("div",Mb,[Z("div",Sb,[Z("div",Eb,[d[2]||(d[2]=Z("div",null,[Z("h1",{class:"text-black dark:text-white text-3xl font-bold"}," 베어링 모니터링 대시보드 "),Z("p",{class:"text-black/60 dark:text-white/60 text-base font-normal leading-normal"}," 베어링 상태 및 예측 분석에 대한 실시간 정보입니다. ")],-1)),ye(s0,{"is-refreshing":tn(r),"last-updated":tn(o),onRefresh:d[0]||(d[0]=y=>tn(i)(500))},null,8,["is-refreshing","last-updated"])]),tn(e)?(Wt(),te("div",yb,[d[5]||(d[5]=Z("span",{class:"material-symbols-outlined text-red-500"},"error",-1)),Z("div",bb,[d[3]||(d[3]=Z("p",{class:"text-red-700 dark:text-red-300 font-medium"},"연결 오류",-1)),Z("p",Tb,Zt(tn(e)),1),d[4]||(d[4]=Z("p",{class:"text-red-600 dark:text-red-400 text-xs mt-1"}," 백엔드 서버가 실행 중인지 확인하세요: http://localhost:8080 ",-1))]),Z("button",{onClick:d[1]||(d[1]=y=>tn(i)(500)),class:"px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"}," 재시도 ")])):Po("",!0)]),Z("div",Ab,[(Wt(!0),te(we,null,bi(h.value,y=>(Wt(),Ti(r_,{key:y.label,label:y.label,value:y.value},null,8,["label","value"]))),128))]),ye(db),d[6]||(d[6]=Z("h2",{class:"text-black dark:text-white text-2xl font-bold px-4 pb-3 pt-8"}," 베어링 상태 개요 ",-1)),Z("div",wb,[ye(v_,{"time-labels":f.value},null,8,["time-labels"]),ye(b_,{"minute-data":u.value,"time-labels":f.value},null,8,["minute-data","time-labels"])]),d[7]||(d[7]=Z("h2",{class:"text-black dark:text-white text-2xl font-bold px-4 pb-3 pt-8"},"예지보전",-1)),Z("div",Rb,[(Wt(!0),te(we,null,bi(tn(c),y=>(Wt(),Ti(C_,{key:y.id,"bearing-id":y.id,status:y.status,icon:y.icon,"status-class":y.statusClass,"icon-bg-class":y.iconBgClass,"icon-color-class":y.iconColorClass,"text-class":y.textClass},null,8,["bearing-id","status","icon","status-class","icon-bg-class","icon-color-class","text-class"]))),128))]),Z("div",Cb,[ye(H_,{logs:p,onViewLog:x}),ye(Q_,{"log-id":v.value,limit:20},null,8,["log-id"])])])])])]))}},Db=Jg({history:Dg("/"),routes:[{path:"/",name:"bearing-dashboard",component:Pb}]}),mc=Gm(Qg);mc.use(Ym());mc.use(Db);mc.mount("#app");
