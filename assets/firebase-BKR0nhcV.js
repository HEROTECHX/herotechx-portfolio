var e=()=>void 0,t=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)==55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)==56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},n=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],o=e[n++],s=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|s&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let a=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join(``)},r={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,get ENCODED_VALS(){return this.ENCODED_VALS_BASE+`+/=`},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+`-_.`},HAS_NATIVE_SUPPORT:typeof atob==`function`,encodeByteArray(e,t){if(!Array.isArray(e))throw Error(`encodeByteArray takes an array as a parameter`);this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(i&3)<<4|o>>4,d=(o&15)<<2|c>>6,f=c&63;s||(f=64,a||(d=64)),r.push(n[l],n[u],n[d],n[f])}return r.join(``)},encodeString(e,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(e):this.encodeByteArray(t(e),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):n(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let a=n[e.charAt(t++)],o=t<e.length?n[e.charAt(t)]:0;++t;let s=t<e.length?n[e.charAt(t)]:64;++t;let c=t<e.length?n[e.charAt(t)]:64;if(++t,a==null||o==null||s==null||c==null)throw new i;let l=a<<2|o>>4;if(r.push(l),s!==64){let e=o<<4&240|s>>2;if(r.push(e),c!==64){let e=s<<6&192|c;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},i=class extends Error{constructor(){super(...arguments),this.name=`DecodeBase64StringError`}},a=function(e){let n=t(e);return r.encodeByteArray(n,!0)},o=function(e){return a(e).replace(/\./g,``)},s=function(e){try{return r.decodeString(e,!0)}catch(e){console.error(`base64Decode failed: `,e)}return null};
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function c(){if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global;throw Error(`Unable to locate global object.`)}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var l=()=>c().__FIREBASE_DEFAULTS__,u=()=>{if(typeof process>`u`)return;let e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},d=()=>{if(typeof document>`u`)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&s(e[1]);return t&&JSON.parse(t)},f=()=>{try{return e()||l()||u()||d()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},p=e=>f()?.emulatorHosts?.[e],m=e=>{let t=p(e);if(!t)return;let n=t.lastIndexOf(`:`);if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return t[0]===`[`?[t.substring(1,n-1),r]:[t.substring(0,n),r]},h=()=>f()?.config,g=e=>f()?.[`_${e}`],ee=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e==`function`&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function te(e){try{return(e.startsWith(`http://`)||e.startsWith(`https://`)?new URL(e).hostname:e).endsWith(`.cloudworkstations.dev`)}catch{return!1}}async function ne(e){return(await fetch(e,{credentials:`include`})).ok}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function re(e,t){if(e.uid)throw Error(`The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.`);let n={alg:`none`,type:`JWT`},r=t||`demo-project`,i=e.iat||0,a=e.sub||e.user_id;if(!a)throw Error(`mockUserToken must contain 'sub' or 'user_id' field!`);let s={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:a,user_id:a,firebase:{sign_in_provider:`custom`,identities:{}},...e};return[o(JSON.stringify(n)),o(JSON.stringify(s)),``].join(`.`)}var ie={};function ae(){let e={prod:[],emulator:[]};for(let t of Object.keys(ie))ie[t]?e.emulator.push(t):e.prod.push(t);return e}function oe(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement(`div`),t.setAttribute(`id`,e),n=!0),{created:n,element:t}}var se=!1;function ce(e,t){if(typeof window>`u`||typeof document>`u`||!te(window.location.host)||ie[e]===t||ie[e]||se)return;ie[e]=t;function n(e){return`__firebase__banner__${e}`}let r=`__firebase__banner`,i=ae().prod.length>0;function a(){let e=document.getElementById(r);e&&e.remove()}function o(e){e.style.display=`flex`,e.style.background=`#7faaf0`,e.style.position=`fixed`,e.style.bottom=`5px`,e.style.left=`5px`,e.style.padding=`.5em`,e.style.borderRadius=`5px`,e.style.alignItems=`center`}function s(e,t){e.setAttribute(`width`,`24`),e.setAttribute(`id`,t),e.setAttribute(`height`,`24`),e.setAttribute(`viewBox`,`0 0 24 24`),e.setAttribute(`fill`,`none`),e.style.marginLeft=`-6px`}function c(){let e=document.createElement(`span`);return e.style.cursor=`pointer`,e.style.marginLeft=`16px`,e.style.fontSize=`24px`,e.innerHTML=` &times;`,e.onclick=()=>{se=!0,a()},e}function l(e,t){e.setAttribute(`id`,t),e.innerText=`Learn more`,e.href=`https://firebase.google.com/docs/studio/preview-apps#preview-backend`,e.setAttribute(`target`,`__blank`),e.style.paddingLeft=`5px`,e.style.textDecoration=`underline`}function u(){let e=oe(r),t=n(`text`),a=document.getElementById(t)||document.createElement(`span`),u=n(`learnmore`),d=document.getElementById(u)||document.createElement(`a`),f=n(`preprendIcon`),p=document.getElementById(f)||document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);if(e.created){let t=e.element;o(t),l(d,u);let n=c();s(p,f),t.append(p,a,d,n),document.body.appendChild(t)}i?(a.innerText=`Preview backend disconnected.`,p.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(p.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,a.innerText=`Preview backend running in this workspace.`),a.setAttribute(`id`,t)}document.readyState===`loading`?window.addEventListener(`DOMContentLoaded`,u):u()}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _(){return typeof navigator<`u`&&typeof navigator.userAgent==`string`?navigator.userAgent:``}function v(){return typeof window<`u`&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())}function le(){let e=f()?.forceEnvironment;if(e===`node`)return!0;if(e===`browser`)return!1;try{return Object.prototype.toString.call(global.process)===`[object process]`}catch{return!1}}function ue(){return typeof navigator<`u`&&navigator.userAgent===`Cloudflare-Workers`}function de(){let e=typeof chrome==`object`?chrome.runtime:typeof browser==`object`?browser.runtime:void 0;return typeof e==`object`&&e.id!==void 0}function fe(){return typeof navigator==`object`&&navigator.product===`ReactNative`}function pe(){let e=_();return e.indexOf(`MSIE `)>=0||e.indexOf(`Trident/`)>=0}function me(){return!le()&&!!navigator.userAgent&&navigator.userAgent.includes(`Safari`)&&!navigator.userAgent.includes(`Chrome`)}function he(){try{return typeof indexedDB==`object`}catch{return!1}}function ge(){return new Promise((e,t)=>{try{let n=!0,r=`validate-browser-context-for-indexeddb-analytics-module`,i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||``)}}catch(e){t(e)}})}function _e(){return!(typeof navigator>`u`||!navigator.cookieEnabled)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ve=`FirebaseError`,ye=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=ve,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,be.prototype.create)}},be=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?xe(i,n):`Error`,o=`${this.serviceName}: ${a} (${r}).`;return new ye(r,o,n)}};function xe(e,t){return e.replace(Se,(e,n)=>{let r=t[n];return r==null?`<${n}?>`:String(r)})}var Se=/\{\$([^}]+)}/g;function Ce(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function we(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],a=t[i];if(Te(n)&&Te(a)){if(!we(n,a))return!1}else if(n!==a)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function Te(e){return typeof e==`object`&&!!e}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Ee(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+`=`+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+`=`+encodeURIComponent(r));return t.length?`&`+t.join(`&`):``}function De(e){let t={};return e.replace(/^\?/,``).split(`&`).forEach(e=>{if(e){let[n,r]=e.split(`=`);t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function Oe(e){let t=e.indexOf(`?`);if(!t)return``;let n=e.indexOf(`#`,t);return e.substring(t,n>0?n:void 0)}function ke(e,t){let n=new Ae(e,t);return n.subscribe.bind(n)}var Ae=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(e===void 0&&t===void 0&&n===void 0)throw Error(`Missing Observer.`);r=je(e,[`next`,`error`,`complete`])?e:{next:e,error:t,complete:n},r.next===void 0&&(r.next=Me),r.error===void 0&&(r.error=Me),r.complete===void 0&&(r.complete=Me);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],--this.observerCount,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(e){typeof console<`u`&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function je(e,t){if(typeof e!=`object`||!e)return!1;for(let n of t)if(n in e&&typeof e[n]==`function`)return!0;return!1}function Me(){}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ne=1e3,Pe=2,Fe=14400*1e3,Ie=.5;function y(e,t=Ne,n=Pe){let r=t*n**+e,i=Math.round(Ie*r*(Math.random()-.5)*2);return Math.min(Fe,r+i)}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function b(e){return e&&e._delegate?e._delegate:e}var x=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode=`LAZY`,this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}},Le=`[DEFAULT]`,Re=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new ee;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}else if(n)return null;else throw Error(`Service ${this.name} is not available`)}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(Be(e))try{this.getOrInitializeService({instanceIdentifier:Le})}catch{}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch{}}}}clearInstance(e=Le){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>`INTERNAL`in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>`_delete`in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Le){return this.instances.has(e)}getOptions(e=Le){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);n===i&&t.resolve(r)}return r}onInit(e,t){let n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);let i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:ze(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Le){return this.component?this.component.multipleInstances?e:Le:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!==`EXPLICIT`}};function ze(e){return e===Le?void 0:e}function Be(e){return e.instantiationMode===`EAGER`}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ve=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Re(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}},He=[],S;(function(e){e[e.DEBUG=0]=`DEBUG`,e[e.VERBOSE=1]=`VERBOSE`,e[e.INFO=2]=`INFO`,e[e.WARN=3]=`WARN`,e[e.ERROR=4]=`ERROR`,e[e.SILENT=5]=`SILENT`})(S||={});var Ue={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},We=S.INFO,Ge={[S.DEBUG]:`log`,[S.VERBOSE]:`log`,[S.INFO]:`info`,[S.WARN]:`warn`,[S.ERROR]:`error`},Ke=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Ge[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)},qe=class{constructor(e){this.name=e,this._logLevel=We,this._logHandler=Ke,this._userLogHandler=null,He.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==`string`?Ue[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=`function`)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}},Je=(e,t)=>t.some(t=>e instanceof t),Ye,Xe;function Ze(){return Ye||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function Qe(){return Xe||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var $e=new WeakMap,et=new WeakMap,tt=new WeakMap,C=new WeakMap,nt=new WeakMap;function rt(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(lt(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return t.then(t=>{t instanceof IDBCursor&&$e.set(t,e)}).catch(()=>{}),nt.set(t,e),t}function it(e){if(et.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});et.set(e,t)}var at={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return et.get(e);if(t===`objectStoreNames`)return e.objectStoreNames||tt.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return lt(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function ot(e){at=e(at)}function st(e){return e===IDBDatabase.prototype.transaction&&!(`objectStoreNames`in IDBTransaction.prototype)?function(t,...n){let r=e.call(ut(this),t,...n);return tt.set(r,t.sort?t.sort():[t]),lt(r)}:Qe().includes(e)?function(...t){return e.apply(ut(this),t),lt($e.get(this))}:function(...t){return lt(e.apply(ut(this),t))}}function ct(e){return typeof e==`function`?st(e):(e instanceof IDBTransaction&&it(e),Je(e,Ze())?new Proxy(e,at):e)}function lt(e){if(e instanceof IDBRequest)return rt(e);if(C.has(e))return C.get(e);let t=ct(e);return t!==e&&(C.set(e,t),nt.set(t,e)),t}var ut=e=>nt.get(e);function dt(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=lt(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(lt(o.result),e.oldVersion,e.newVersion,lt(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var ft=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],pt=[`put`,`add`,`delete`,`clear`],mt=new Map;function ht(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(mt.get(t))return mt.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=pt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ft.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return mt.set(t,a),a}ot(e=>({...e,get:(t,n,r)=>ht(t,n)||e.get(t,n,r),has:(t,n)=>!!ht(t,n)||e.has(t,n)}));
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var gt=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(_t(e)){let t=e.getImmediate();return`${t.library}/${t.version}`}else return null}).filter(e=>e).join(` `)}};function _t(e){return e.getComponent()?.type===`VERSION`}var vt=`@firebase/app`,yt=`0.14.3`,bt=new qe(`@firebase/app`),xt=`@firebase/app-compat`,St=`@firebase/analytics-compat`,Ct=`@firebase/analytics`,wt=`@firebase/app-check-compat`,Tt=`@firebase/app-check`,Et=`@firebase/auth`,Dt=`@firebase/auth-compat`,Ot=`@firebase/database`,kt=`@firebase/data-connect`,At=`@firebase/database-compat`,jt=`@firebase/functions`,Mt=`@firebase/functions-compat`,Nt=`@firebase/installations`,Pt=`@firebase/installations-compat`,Ft=`@firebase/messaging`,It=`@firebase/messaging-compat`,Lt=`@firebase/performance`,Rt=`@firebase/performance-compat`,zt=`@firebase/remote-config`,Bt=`@firebase/remote-config-compat`,Vt=`@firebase/storage`,Ht=`@firebase/storage-compat`,Ut=`@firebase/firestore`,Wt=`@firebase/ai`,Gt=`@firebase/firestore-compat`,w=`firebase`,Kt=`12.3.0`,qt=`[DEFAULT]`,Jt={[vt]:`fire-core`,[xt]:`fire-core-compat`,[Ct]:`fire-analytics`,[St]:`fire-analytics-compat`,[Tt]:`fire-app-check`,[wt]:`fire-app-check-compat`,[Et]:`fire-auth`,[Dt]:`fire-auth-compat`,[Ot]:`fire-rtdb`,[kt]:`fire-data-connect`,[At]:`fire-rtdb-compat`,[jt]:`fire-fn`,[Mt]:`fire-fn-compat`,[Nt]:`fire-iid`,[Pt]:`fire-iid-compat`,[Ft]:`fire-fcm`,[It]:`fire-fcm-compat`,[Lt]:`fire-perf`,[Rt]:`fire-perf-compat`,[zt]:`fire-rc`,[Bt]:`fire-rc-compat`,[Vt]:`fire-gcs`,[Ht]:`fire-gcs-compat`,[Ut]:`fire-fst`,[Gt]:`fire-fst-compat`,[Wt]:`fire-vertex`,"fire-js":`fire-js`,[w]:`fire-js-all`},Yt=new Map,Xt=new Map,Zt=new Map;function Qt(e,t){try{e.container.addComponent(t)}catch(n){bt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function $t(e){let t=e.name;if(Zt.has(t))return bt.debug(`There were multiple attempts to register component ${t}.`),!1;Zt.set(t,e);for(let t of Yt.values())Qt(t,e);for(let t of Xt.values())Qt(t,e);return!0}function en(e,t){let n=e.container.getProvider(`heartbeat`).getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function T(e){return e==null?!1:e.settings!==void 0}var tn=new be(`app`,`Firebase`,{"no-app":`No Firebase App '{$appName}' has been created - call initializeApp() first`,"bad-app-name":`Illegal App name: '{$appName}'`,"duplicate-app":`Firebase App named '{$appName}' already exists with different options or config`,"app-deleted":`Firebase App named '{$appName}' already deleted`,"server-app-deleted":`Firebase Server App has been deleted`,"no-options":`Need to provide options, when not being deployed to hosting via source.`,"invalid-app-argument":`firebase.{$appName}() takes either no argument or a Firebase App instance.`,"invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":`Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.`,"idb-get":`Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.`,"idb-set":`Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.`,"idb-delete":`Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.`,"finalization-registry-not-supported":`FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.`,"invalid-server-app-environment":`FirebaseServerApp is not for use in browser environments.`}),nn=class{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new x(`app`,()=>this,`PUBLIC`))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tn.create(`app-deleted`,{appName:this._name})}},rn=Kt;function an(e,t={}){let n=e;typeof t!=`object`&&(t={name:t});let r={name:qt,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!=`string`||!i)throw tn.create(`bad-app-name`,{appName:String(i)});if(n||=h(),!n)throw tn.create(`no-options`);let a=Yt.get(i);if(a){if(we(n,a.options)&&we(r,a.config))return a;throw tn.create(`duplicate-app`,{appName:i})}let o=new Ve(i);for(let e of Zt.values())o.addComponent(e);let s=new nn(n,r,o);return Yt.set(i,s),s}function on(e=qt){let t=Yt.get(e);if(!t&&e===`[DEFAULT]`&&h())return an();if(!t)throw tn.create(`no-app`,{appName:e});return t}function E(e,t,n){let r=Jt[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){let e=[`Unable to register library "${r}" with version "${t}":`];i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&e.push(`and`),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),bt.warn(e.join(` `));return}$t(new x(`${r}-version`,()=>({library:r,version:t}),`VERSION`))}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var sn=`firebase-heartbeat-database`,cn=1,ln=`firebase-heartbeat-store`,un=null;function dn(){return un||=dt(sn,cn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(ln)}catch(e){console.warn(e)}}}}).catch(e=>{throw tn.create(`idb-open`,{originalErrorMessage:e.message})}),un}async function fn(e){try{let t=(await dn()).transaction(ln),n=await t.objectStore(ln).get(mn(e));return await t.done,n}catch(e){if(e instanceof ye)bt.warn(e.message);else{let t=tn.create(`idb-get`,{originalErrorMessage:e?.message});bt.warn(t.message)}}}async function pn(e,t){try{let n=(await dn()).transaction(ln,`readwrite`);await n.objectStore(ln).put(t,mn(e)),await n.done}catch(e){if(e instanceof ye)bt.warn(e.message);else{let t=tn.create(`idb-set`,{originalErrorMessage:e?.message});bt.warn(t.message)}}}function mn(e){return`${e.name}!${e.options.appId}`}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var hn=1024,gn=30,_n=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider(`app`).getImmediate();this._storage=new D(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider(`platform-logger`).getImmediate().getPlatformInfoString(),t=vn();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>gn){let e=xn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){bt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return``;let e=vn(),{heartbeatsToSend:t,unsentEntries:n}=yn(this._heartbeatsCache.heartbeats),r=o(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return bt.warn(e),``}}};function vn(){return new Date().toISOString().substring(0,10)}function yn(e,t=hn){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),bn(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),bn(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var D=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return he()?ge().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await fn(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return pn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return pn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}else return}};function bn(e){return o(JSON.stringify({version:2,heartbeats:e})).length}function xn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Sn(e){$t(new x(`platform-logger`,e=>new gt(e),`PRIVATE`)),$t(new x(`heartbeat`,e=>new _n(e),`PRIVATE`)),E(vt,yt,e),E(vt,yt,`esm2020`),E(`fire-js`,``)}Sn(``);function Cn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var wn=Cn,Tn=new be(`auth`,`Firebase`,Cn()),En=new qe(`@firebase/auth`);function Dn(e,...t){En.logLevel<=S.WARN&&En.warn(`Auth (${rn}): ${e}`,...t)}function On(e,...t){En.logLevel<=S.ERROR&&En.error(`Auth (${rn}): ${e}`,...t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function O(e,...t){throw Mn(e,...t)}function kn(e,...t){return Mn(e,...t)}function An(e,t,n){let r={...wn(),[t]:n};return new be(`auth`,`Firebase`,r).create(t,{appName:e.name})}function jn(e){return An(e,`operation-not-supported-in-this-environment`,`Operations that alter the current user are not supported in conjunction with FirebaseServerApp`)}function Mn(e,...t){if(typeof e!=`string`){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Tn.create(e,...t)}function k(e,t,...n){if(!e)throw Mn(t,...n)}function Nn(e){let t=`INTERNAL ASSERTION FAILED: `+e;throw On(t),Error(t)}function Pn(e,t){e||Nn(t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Fn(){return typeof self<`u`&&self.location?.href||``}function In(){return Ln()===`http:`||Ln()===`https:`}function Ln(){return typeof self<`u`&&self.location?.protocol||null}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Rn(){return typeof navigator<`u`&&navigator&&`onLine`in navigator&&typeof navigator.onLine==`boolean`&&(In()||de()||`connection`in navigator)?navigator.onLine:!0}function zn(){if(typeof navigator>`u`)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Pn(t>e,`Short delay should be less than long delay!`),this.isMobile=v()||fe()}get(){return Rn()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Vn(e,t){Pn(e.emulator,`Emulator should always be set here`);let{url:n}=e.emulator;return t?`${n}${t.startsWith(`/`)?t.slice(1):t}`:n}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Hn=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<`u`&&`fetch`in self)return self.fetch;if(typeof globalThis<`u`&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<`u`)return fetch;Nn(`Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<`u`&&`Headers`in self)return self.Headers;if(typeof globalThis<`u`&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<`u`)return Headers;Nn(`Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<`u`&&`Response`in self)return self.Response;if(typeof globalThis<`u`&&globalThis.Response)return globalThis.Response;if(typeof Response<`u`)return Response;Nn(`Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}},Un={CREDENTIAL_MISMATCH:`custom-token-mismatch`,MISSING_CUSTOM_TOKEN:`internal-error`,INVALID_IDENTIFIER:`invalid-email`,MISSING_CONTINUE_URI:`internal-error`,INVALID_PASSWORD:`wrong-password`,MISSING_PASSWORD:`missing-password`,INVALID_LOGIN_CREDENTIALS:`invalid-credential`,EMAIL_EXISTS:`email-already-in-use`,PASSWORD_LOGIN_DISABLED:`operation-not-allowed`,INVALID_IDP_RESPONSE:`invalid-credential`,INVALID_PENDING_TOKEN:`invalid-credential`,FEDERATED_USER_ID_ALREADY_LINKED:`credential-already-in-use`,MISSING_REQ_TYPE:`internal-error`,EMAIL_NOT_FOUND:`user-not-found`,RESET_PASSWORD_EXCEED_LIMIT:`too-many-requests`,EXPIRED_OOB_CODE:`expired-action-code`,INVALID_OOB_CODE:`invalid-action-code`,MISSING_OOB_CODE:`internal-error`,CREDENTIAL_TOO_OLD_LOGIN_AGAIN:`requires-recent-login`,INVALID_ID_TOKEN:`invalid-user-token`,TOKEN_EXPIRED:`user-token-expired`,USER_NOT_FOUND:`user-token-expired`,TOO_MANY_ATTEMPTS_TRY_LATER:`too-many-requests`,PASSWORD_DOES_NOT_MEET_REQUIREMENTS:`password-does-not-meet-requirements`,INVALID_CODE:`invalid-verification-code`,INVALID_SESSION_INFO:`invalid-verification-id`,INVALID_TEMPORARY_PROOF:`invalid-credential`,MISSING_SESSION_INFO:`missing-verification-id`,SESSION_EXPIRED:`code-expired`,MISSING_ANDROID_PACKAGE_NAME:`missing-android-pkg-name`,UNAUTHORIZED_DOMAIN:`unauthorized-continue-uri`,INVALID_OAUTH_CLIENT_ID:`invalid-oauth-client-id`,ADMIN_ONLY_OPERATION:`admin-restricted-operation`,INVALID_MFA_PENDING_CREDENTIAL:`invalid-multi-factor-session`,MFA_ENROLLMENT_NOT_FOUND:`multi-factor-info-not-found`,MISSING_MFA_ENROLLMENT_ID:`missing-multi-factor-info`,MISSING_MFA_PENDING_CREDENTIAL:`missing-multi-factor-session`,SECOND_FACTOR_EXISTS:`second-factor-already-in-use`,SECOND_FACTOR_LIMIT_EXCEEDED:`maximum-second-factor-count-exceeded`,BLOCKING_FUNCTION_ERROR_RESPONSE:`internal-error`,RECAPTCHA_NOT_ENABLED:`recaptcha-not-enabled`,MISSING_RECAPTCHA_TOKEN:`missing-recaptcha-token`,INVALID_RECAPTCHA_TOKEN:`invalid-recaptcha-token`,INVALID_RECAPTCHA_ACTION:`invalid-recaptcha-action`,MISSING_CLIENT_TYPE:`missing-client-type`,MISSING_RECAPTCHA_VERSION:`missing-recaptcha-version`,INVALID_RECAPTCHA_VERSION:`invalid-recaptcha-version`,INVALID_REQ_TYPE:`invalid-req-type`},Wn=[`/v1/accounts:signInWithCustomToken`,`/v1/accounts:signInWithEmailLink`,`/v1/accounts:signInWithIdp`,`/v1/accounts:signInWithPassword`,`/v1/accounts:signInWithPhoneNumber`,`/v1/token`],Gn=new Bn(3e4,6e4);function A(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function j(e,t,n,r,i={}){return Kn(e,i,async()=>{let i={},a={};r&&(t===`GET`?a=r:i={body:JSON.stringify(r)});let o=Ee({key:e.config.apiKey,...a}).slice(1),s=await e._getAdditionalHeaders();s[`Content-Type`]=`application/json`,e.languageCode&&(s[`X-Firebase-Locale`]=e.languageCode);let c={method:t,headers:s,...i};return ue()||(c.referrerPolicy=`no-referrer`),e.emulatorConfig&&te(e.emulatorConfig.host)&&(c.credentials=`include`),Hn.fetch()(await Jn(e,e.config.apiHost,n,o),c)})}async function Kn(e,t,n){e._canInitEmulator=!1;let r={...Un,...t};try{let t=new Xn(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let a=await i.json();if(`needConfirmation`in a)throw Zn(e,`account-exists-with-different-credential`,a);if(i.ok&&!(`errorMessage`in a))return a;{let[t,n]=(i.ok?a.errorMessage:a.error.message).split(` : `);if(t===`FEDERATED_USER_ID_ALREADY_LINKED`)throw Zn(e,`credential-already-in-use`,a);if(t===`EMAIL_EXISTS`)throw Zn(e,`email-already-in-use`,a);if(t===`USER_DISABLED`)throw Zn(e,`user-disabled`,a);let o=r[t]||t.toLowerCase().replace(/[_\s]+/g,`-`);if(n)throw An(e,o,n);O(e,o)}}catch(t){if(t instanceof ye)throw t;O(e,`network-request-failed`,{message:String(t)})}}async function qn(e,t,n,r,i={}){let a=await j(e,t,n,r,i);return`mfaPendingCredential`in a&&O(e,`multi-factor-auth-required`,{_serverResponse:a}),a}async function Jn(e,t,n,r){let i=`${t}${n}?${r}`,a=e,o=a.config.emulator?Vn(e.config,i):`${e.config.apiScheme}://${i}`;return Wn.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()===`COOKIE`)?a._getPersistence()._getFinalTarget(o).toString():o}function Yn(e){switch(e){case`ENFORCE`:return`ENFORCE`;case`AUDIT`:return`AUDIT`;case`OFF`:return`OFF`;default:return`ENFORCEMENT_STATE_UNSPECIFIED`}}var Xn=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(kn(this.auth,`network-request-failed`)),Gn.get())})}};function Zn(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=kn(e,t,r);return i.customData._tokenResponse=n,i}function Qn(e){return e!==void 0&&e.enterprise!==void 0}var $n=class{constructor(e){if(this.siteKey=``,this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw Error(`recaptchaKey undefined`);this.siteKey=e.recaptchaKey.split(`/`)[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Yn(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)===`ENFORCE`||this.getProviderEnforcementState(e)===`AUDIT`}isAnyProviderEnabled(){return this.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)||this.isProviderEnabled(`PHONE_PROVIDER`)}};async function er(e,t){return j(e,`GET`,`/v2/recaptchaConfig`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function tr(e,t){return j(e,`POST`,`/v1/accounts:delete`,t)}async function nr(e,t){return j(e,`POST`,`/v1/accounts:lookup`,t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function rr(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function ir(e,t=!1){let n=b(e),r=await n.getIdToken(t),i=or(r);k(i&&i.exp&&i.auth_time&&i.iat,n.auth,`internal-error`);let a=typeof i.firebase==`object`?i.firebase:void 0,o=a?.sign_in_provider;return{claims:i,token:r,authTime:rr(ar(i.auth_time)),issuedAtTime:rr(ar(i.iat)),expirationTime:rr(ar(i.exp)),signInProvider:o||null,signInSecondFactor:a?.sign_in_second_factor||null}}function ar(e){return Number(e)*1e3}function or(e){let[t,n,r]=e.split(`.`);if(t===void 0||n===void 0||r===void 0)return On(`JWT malformed, contained fewer than 3 sections`),null;try{let e=s(n);return e?JSON.parse(e):(On(`Failed to decode base64 JWT payload`),null)}catch(e){return On(`Caught error parsing JWT payload as JSON`,e?.toString()),null}}function sr(e){let t=or(e);return k(t,`internal-error`),k(t.exp!==void 0,`internal-error`),k(t.iat!==void 0,`internal-error`),Number(t.exp)-Number(t.iat)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function cr(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof ye&&lr(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function lr({code:e}){return e===`auth/user-disabled`||e===`auth/user-token-expired`}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ur=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;let e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code===`auth/network-request-failed`&&this.schedule(!0);return}this.schedule()}},dr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=rr(this.lastLoginAt),this.creationTime=rr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function fr(e){let t=e.auth,n=await e.getIdToken(),r=await cr(e,nr(t,{idToken:n}));k(r?.users.length,t,`internal-error`);let i=r.users[0];e._notifyReloadListener(i);let a=i.providerUserInfo?.length?hr(i.providerUserInfo):[],o=mr(e.providerData,a),s=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!o?.length,l=s?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new dr(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(e,u)}async function pr(e){let t=b(e);await fr(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function mr(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function hr(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||``,displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function gr(e,t){let n=await Kn(e,{},async()=>{let n=Ee({grant_type:`refresh_token`,refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,a=await Jn(e,r,`/v1/token`,`key=${i}`),o=await e._getAdditionalHeaders();o[`Content-Type`]=`application/x-www-form-urlencoded`;let s={method:`POST`,headers:o,body:n};return e.emulatorConfig&&te(e.emulatorConfig.host)&&(s.credentials=`include`),Hn.fetch()(a,s)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function _r(e,t){return j(e,`POST`,`/v2/accounts:revokeToken`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var vr=class e{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,`internal-error`),k(e.idToken!==void 0,`internal-error`),k(e.refreshToken!==void 0,`internal-error`);let t=`expiresIn`in e&&e.expiresIn!==void 0?Number(e.expiresIn):sr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){k(e.length!==0,`internal-error`);let t=sr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,`user-token-expired`),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await gr(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(t,n){let{refreshToken:r,accessToken:i,expirationTime:a}=n,o=new e;return r&&(k(typeof r==`string`,`internal-error`,{appName:t}),o.refreshToken=r),i&&(k(typeof i==`string`,`internal-error`,{appName:t}),o.accessToken=i),a&&(k(typeof a==`number`,`internal-error`,{appName:t}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new e,this.toJSON())}_performRefresh(){return Nn(`not implemented`)}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function yr(e,t){k(typeof e==`string`||e===void 0,`internal-error`,{appName:t})}var br=class e{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId=`firebase`,this.proactiveRefresh=new ur(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new dr(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){let t=await cr(this,this.stsTokenManager.getToken(this.auth,e));return k(t,this.auth,`internal-error`),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ir(this,e)}reload(){return pr(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,`internal-error`),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(t){let n=new e({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,`internal-error`),this.reloadListener=e,this.reloadUserInfo&&=(this._notifyReloadListener(this.reloadUserInfo),null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await fr(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(T(this.auth.app))return Promise.reject(jn(this.auth));let e=await this.getIdToken();return await cr(this,tr(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||``}static _fromJSON(t,n){let r=n.displayName??void 0,i=n.email??void 0,a=n.phoneNumber??void 0,o=n.photoURL??void 0,s=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:p,providerData:m,stsTokenManager:h}=n;k(d&&h,t,`internal-error`);let g=vr.fromJSON(this.name,h);k(typeof d==`string`,t,`internal-error`),yr(r,t.name),yr(i,t.name),k(typeof f==`boolean`,t,`internal-error`),k(typeof p==`boolean`,t,`internal-error`),yr(a,t.name),yr(o,t.name),yr(s,t.name),yr(c,t.name),yr(l,t.name),yr(u,t.name);let ee=new e({uid:d,auth:t,email:i,emailVerified:f,displayName:r,isAnonymous:p,photoURL:o,phoneNumber:a,tenantId:s,stsTokenManager:g,createdAt:l,lastLoginAt:u});return m&&Array.isArray(m)&&(ee.providerData=m.map(e=>({...e}))),c&&(ee._redirectEventId=c),ee}static async _fromIdTokenResponse(t,n,r=!1){let i=new vr;i.updateFromServerResponse(n);let a=new e({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await fr(a),a}static async _fromGetAccountInfoResponse(t,n,r){let i=n.users[0];k(i.localId!==void 0,`internal-error`);let a=i.providerUserInfo===void 0?[]:hr(i.providerUserInfo),o=!(i.email&&i.passwordHash)&&!a?.length,s=new vr;s.updateFromIdToken(r);let c=new e({uid:i.localId,auth:t,stsTokenManager:s,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new dr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!a?.length};return Object.assign(c,l),c}},xr=new Map;function Sr(e){Pn(e instanceof Function,`Expected a class definition`);let t=xr.get(e);return t?(Pn(t instanceof e,`Instance stored in cache mismatched with class`),t):(t=new e,xr.set(e,t),t)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Cr=class{constructor(){this.type=`NONE`,this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Cr.type=`NONE`;var wr=Cr;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Tr(e,t,n){return`firebase:${e}:${t}:${n}`}var Er=class e{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=Tr(this.userKey,r.apiKey,i),this.fullPersistenceKey=Tr(`persistence`,r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e==`string`){let t=await nr(this.auth,{idToken:e}).catch(()=>void 0);return t?br._fromGetAccountInfoResponse(this.auth,t,e):null}return br._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r=`authUser`){if(!n.length)return new e(Sr(wr),t,r);let i=(await Promise.all(n.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),a=i[0]||Sr(wr),o=Tr(r,t.config.apiKey,t.name),s=null;for(let e of n)try{let n=await e._get(o);if(n){let r;if(typeof n==`string`){let e=await nr(t,{idToken:n}).catch(()=>void 0);if(!e)break;r=await br._fromGetAccountInfoResponse(t,e,n)}else r=br._fromJSON(t,n);e!==a&&(s=r),a=e;break}}catch{}let c=i.filter(e=>e._shouldAllowMigration);return!a._shouldAllowMigration||!c.length?new e(a,t,r):(a=c[0],s&&await a._set(o,s.toJSON()),await Promise.all(n.map(async e=>{if(e!==a)try{await e._remove(o)}catch{}})),new e(a,t,r))}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Dr(e){let t=e.toLowerCase();if(t.includes(`opera/`)||t.includes(`opr/`)||t.includes(`opios/`))return`Opera`;if(jr(t))return`IEMobile`;if(t.includes(`msie`)||t.includes(`trident/`))return`IE`;if(t.includes(`edge/`))return`Edge`;if(Or(t))return`Firefox`;if(t.includes(`silk/`))return`Silk`;if(Nr(t))return`Blackberry`;if(Pr(t))return`Webos`;if(kr(t))return`Safari`;if((t.includes(`chrome/`)||Ar(t))&&!t.includes(`edge/`))return`Chrome`;if(Mr(t))return`Android`;{let t=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(t?.length===2)return t[1]}return`Other`}function Or(e=_()){return/firefox\//i.test(e)}function kr(e=_()){let t=e.toLowerCase();return t.includes(`safari/`)&&!t.includes(`chrome/`)&&!t.includes(`crios/`)&&!t.includes(`android`)}function Ar(e=_()){return/crios\//i.test(e)}function jr(e=_()){return/iemobile/i.test(e)}function Mr(e=_()){return/android/i.test(e)}function Nr(e=_()){return/blackberry/i.test(e)}function Pr(e=_()){return/webos/i.test(e)}function Fr(e=_()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ir(e=_()){return Fr(e)&&!!window.navigator?.standalone}function Lr(){return pe()&&document.documentMode===10}function Rr(e=_()){return Fr(e)||Mr(e)||Pr(e)||Nr(e)||/windows phone/i.test(e)||jr(e)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function zr(e,t=[]){let n;switch(e){case`Browser`:n=Dr(_());break;case`Worker`:n=`${Dr(_())}-${e}`;break;default:n=e}let r=t.length?t.join(`,`):`FirebaseCore-web`;return`${n}/JsCore/${rn}/${r}`}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Br=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{let r=e(t);n(r)}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(let e of t)try{e()}catch{}throw this.auth._errorFactory.create(`login-blocked`,{originalMessage:e?.message})}}};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Vr(e,t={}){return j(e,`GET`,`/v2/passwordPolicy`,A(e,t))}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Hr=6,Ur=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Hr,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState===`ENFORCEMENT_STATE_UNSPECIFIED`&&(this.enforcementState=`OFF`),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join(``)??``,this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&=t.meetsMinPasswordLength??!0,t.isValid&&=t.meetsMaxPasswordLength??!0,t.isValid&&=t.containsLowercaseLetter??!0,t.isValid&&=t.containsUppercaseLetter??!0,t.isValid&&=t.containsNumericCharacter??!0,t.isValid&&=t.containsNonAlphanumericCharacter??!0,t}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>=`a`&&n<=`z`,n>=`A`&&n<=`Z`,n>=`0`&&n<=`9`,this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||=t),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||=n),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||=r),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||=i)}},Wr=class{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kr(this),this.idTokenSubscription=new Kr(this),this.beforeStateQueue=new Br(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Sr(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Er.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await nr(this,{idToken:e}),n=await br._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn(`FirebaseServerApp could not login user with provided authIdToken: `,e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(T(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,a=await this.tryRedirectSignIn(e);(!t||t===i)&&a?.user&&(n=a.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,`argument-error`),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fr(e)}catch(e){if(e?.code!==`auth/network-request-failed`)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=zn()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(T(this.app))return Promise.reject(jn(this));let t=e?b(e):null;return t&&k(t.auth.config.apiKey===this.config.apiKey,this,`invalid-user-token`),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,`tenant-id-mismatch`),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return T(this.app)?Promise.reject(jn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return T(this.app)?Promise.reject(jn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Sr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion===this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?t.validatePassword(e):Promise.reject(this._errorFactory.create(`unsupported-password-policy-schema-version`,{}))}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Vr(this),t=new Ur(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new be(`auth`,`Firebase`,e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),n={providerId:`apple.com`,tokenType:`ACCESS_TOKEN`,token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await _r(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Sr(e)||this._popupRedirectResolver;k(t,this,`argument-error`),this.redirectPersistenceManager=await Er.create(this,[Sr(t._redirectPersistence)],`redirectUser`),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i=typeof t==`function`?t:t.next.bind(t),a=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(o,this,`internal-error`),o.then(()=>{a||i(this.currentUser)}),typeof t==`function`){let i=e.addObserver(t,n,r);return()=>{a=!0,i()}}else{let n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,`internal-error`),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zr(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e[`X-Firebase-gmpid`]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e[`X-Firebase-Client`]=t);let n=await this._getAppCheckToken();return n&&(e[`X-Firebase-AppCheck`]=n),e}async _getAppCheckToken(){if(T(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Dn(`Error while retrieving App Check token: ${e.error}`),e?.token}};function Gr(e){return b(e)}var Kr=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=ke(e=>this.observer=e)}get next(){return k(this.observer,this.auth,`internal-error`),this.observer.next.bind(this.observer)}},qr={async loadJS(){throw Error(`Unable to load external scripts`)},recaptchaV2Script:``,recaptchaEnterpriseScript:``,gapiScript:``};function Jr(e){qr=e}function Yr(e){return qr.loadJS(e)}function Xr(){return qr.recaptchaEnterpriseScript}function Zr(){return qr.gapiScript}function Qr(e){return`__${e}${Math.floor(Math.random()*1e6)}`}var $r=class{constructor(){this.enterprise=new ei}ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},ei=class{ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},ti=`recaptcha-enterprise`,ni=`NO_RECAPTCHA`,ri=class{constructor(e){this.type=ti,this.auth=Gr(e)}async verify(e=`verify`,t=!1){async function n(e){if(!t){if(e.tenantId==null&&e._agentRecaptchaConfig!=null)return e._agentRecaptchaConfig.siteKey;if(e.tenantId!=null&&e._tenantRecaptchaConfigs[e.tenantId]!==void 0)return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{er(e,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}).then(r=>{if(r.recaptchaKey===void 0)n(Error(`recaptcha Enterprise site key undefined`));else{let n=new $n(r);return e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function r(t,n,r){let i=window.grecaptcha;Qn(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(ni)})}):r(Error(`No reCAPTCHA enterprise script loaded.`))}return this.auth.settings.appVerificationDisabledForTesting?new $r().execute(`siteKey`,{action:`verify`}):new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&Qn(window.grecaptcha))r(n,e,i);else{if(typeof window>`u`){i(Error(`RecaptchaVerifier is only supported in browser`));return}let t=Xr();t.length!==0&&(t+=n),Yr(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}};async function ii(e,t,n,r=!1,i=!1){let a=new ri(e),o;if(i)o=ni;else try{o=await a.verify(n)}catch{o=await a.verify(n,!0)}let s={...t};if(n===`mfaSmsEnrollment`||n===`mfaSmsSignIn`){if(`phoneEnrollmentInfo`in s){let e=s.phoneEnrollmentInfo.phoneNumber,t=s.phoneEnrollmentInfo.recaptchaToken;Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}else if(`phoneSignInInfo`in s){let e=s.phoneSignInInfo.recaptchaToken;Object.assign(s,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}return s}return r?Object.assign(s,{captchaResp:o}):Object.assign(s,{captchaResponse:o}),Object.assign(s,{clientType:`CLIENT_TYPE_WEB`}),Object.assign(s,{recaptchaVersion:`RECAPTCHA_ENTERPRISE`}),s}async function ai(e,t,n,r,i){if(i===`EMAIL_PASSWORD_PROVIDER`)if(e._getRecaptchaConfig()?.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)){let i=await ii(e,t,n,n===`getOobCode`);return r(e,i)}else return r(e,t).catch(async i=>{if(i.code===`auth/missing-recaptcha-token`){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await ii(e,t,n,n===`getOobCode`);return r(e,i)}else return Promise.reject(i)});else if(i===`PHONE_PROVIDER`)if(e._getRecaptchaConfig()?.isProviderEnabled(`PHONE_PROVIDER`)){let i=await ii(e,t,n);return r(e,i).catch(async i=>{if(e._getRecaptchaConfig()?.getProviderEnforcementState(`PHONE_PROVIDER`)===`AUDIT`&&(i.code===`auth/missing-recaptcha-token`||i.code===`auth/invalid-app-credential`)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);let i=await ii(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}else{let i=await ii(e,t,n,!1,!0);return r(e,i)}else return Promise.reject(i+` provider is not supported.`)}async function oi(e){let t=Gr(e),n=await er(t,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}),r=new $n(n);t.tenantId==null?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()&&new ri(t).verify()}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function si(e,t){let n=en(e,`auth`);if(n.isInitialized()){let e=n.getImmediate(),r=n.getOptions();if(we(r,t??{}))return e;O(e,`already-initialized`)}return n.initialize({options:t})}function ci(e,t){let n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Sr);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function li(e,t,n){let r=Gr(e);k(/^https?:\/\//.test(t),r,`invalid-emulator-scheme`);let i=!!n?.disableWarnings,a=ui(t),{host:o,port:s}=di(t),c=s===null?``:`:${s}`,l={url:`${a}//${o}${c}/`},u=Object.freeze({host:o,port:s,protocol:a.replace(`:`,``),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){k(r.config.emulator&&r.emulatorConfig,r,`emulator-config-failed`),k(we(l,r.config.emulator)&&we(u,r.emulatorConfig),r,`emulator-config-failed`);return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,te(o)?(ne(`${a}//${o}${c}`),ce(`Auth`,!0)):i||pi()}function ui(e){let t=e.indexOf(`:`);return t<0?``:e.substr(0,t+1)}function di(e){let t=ui(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:``,port:null};let r=n[2].split(`@`).pop()||``,i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:fi(r.substr(e.length+1))}}else{let[e,t]=r.split(`:`);return{host:e,port:fi(t)}}}function fi(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}function pi(){function e(){let e=document.createElement(`p`),t=e.style;e.innerText=`Running in emulator mode. Do not use with production credentials.`,t.position=`fixed`,t.width=`100%`,t.backgroundColor=`#ffffff`,t.border=`.1em solid #000000`,t.color=`#b50000`,t.bottom=`0px`,t.left=`0px`,t.margin=`0px`,t.zIndex=`10000`,t.textAlign=`center`,e.classList.add(`firebase-emulator-warning`),document.body.appendChild(e)}typeof console<`u`&&typeof console.info==`function`&&console.info(`WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`),typeof window<`u`&&typeof document<`u`&&(document.readyState===`loading`?window.addEventListener(`DOMContentLoaded`,e):e())}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var mi=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Nn(`not implemented`)}_getIdTokenResponse(e){return Nn(`not implemented`)}_linkToIdToken(e,t){return Nn(`not implemented`)}_getReauthenticationResolver(e){return Nn(`not implemented`)}};async function hi(e,t){return j(e,`POST`,`/v1/accounts:signUp`,t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function gi(e,t){return qn(e,`POST`,`/v1/accounts:signInWithPassword`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _i(e,t){return qn(e,`POST`,`/v1/accounts:signInWithEmailLink`,A(e,t))}async function vi(e,t){return qn(e,`POST`,`/v1/accounts:signInWithEmailLink`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var yi=class e extends mi{constructor(e,t,n,r=null){super(`password`,n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(t,n){return new e(t,n,`password`)}static _fromEmailAndCode(t,n,r=null){return new e(t,n,`emailLink`,r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e==`string`?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod===`password`)return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod===`emailLink`)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case`password`:let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`};return ai(e,t,`signInWithPassword`,gi,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return _i(e,{email:this._email,oobCode:this._password});default:O(e,`internal-error`)}}async _linkToIdToken(e,t){switch(this.signInMethod){case`password`:let n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`};return ai(e,n,`signUpPassword`,hi,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return vi(e,{idToken:t,email:this._email,oobCode:this._password});default:O(e,`internal-error`)}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function bi(e,t){return qn(e,`POST`,`/v1/accounts:signInWithIdp`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var xi=`http://localhost`,Si=class e extends mi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){let n=new e(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):O(`argument-error`),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){let{providerId:n,signInMethod:r,...i}=typeof t==`string`?JSON.parse(t):t;if(!n||!r)return null;let a=new e(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return bi(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,bi(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,bi(e,t)}buildRequest(){let e={requestUri:xi,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ee(t)}return e}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Ci(e,t){return j(e,`POST`,`/v1/accounts:sendVerificationCode`,A(e,t))}async function wi(e,t){return qn(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,A(e,t))}async function Ti(e,t){let n=await qn(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,A(e,t));if(n.temporaryProof)throw Zn(e,`account-exists-with-different-credential`,n);return n}var Ei={USER_NOT_FOUND:`user-not-found`};async function Di(e,t){let n={...t,operation:`REAUTH`};return qn(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,A(e,n),Ei)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Oi=class e extends mi{constructor(e){super(`phone`,`phone`),this.params=e}static _fromVerification(t,n){return new e({verificationId:t,verificationCode:n})}static _fromTokenResponse(t,n){return new e({phoneNumber:t,temporaryProof:n})}_getIdTokenResponse(e){return wi(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Ti(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Di(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(t){typeof t==`string`&&(t=JSON.parse(t));let{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a}=t;return!r&&!n&&!i&&!a?null:new e({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a})}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ki(e){switch(e){case`recoverEmail`:return`RECOVER_EMAIL`;case`resetPassword`:return`PASSWORD_RESET`;case`signIn`:return`EMAIL_SIGNIN`;case`verifyEmail`:return`VERIFY_EMAIL`;case`verifyAndChangeEmail`:return`VERIFY_AND_CHANGE_EMAIL`;case`revertSecondFactorAddition`:return`REVERT_SECOND_FACTOR_ADDITION`;default:return null}}function Ai(e){let t=De(Oe(e)).link,n=t?De(Oe(t)).deep_link_id:null,r=De(Oe(e)).deep_link_id;return(r?De(Oe(r)).link:null)||r||n||t||e}var ji=class e{constructor(e){let t=De(Oe(e)),n=t.apiKey??null,r=t.oobCode??null,i=ki(t.mode??null);k(n&&r&&i,`argument-error`),this.apiKey=n,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(t){let n=Ai(t);try{return new e(n)}catch{return null}}},Mi=class e{constructor(){this.providerId=e.PROVIDER_ID}static credential(e,t){return yi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=ji.parseLink(t);return k(n,`argument-error`),yi._fromEmailAndCode(e,n.code,n.tenantId)}};Mi.PROVIDER_ID=`password`,Mi.EMAIL_PASSWORD_SIGN_IN_METHOD=`password`,Mi.EMAIL_LINK_SIGN_IN_METHOD=`emailLink`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ni=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}},Pi=class extends Ni{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}},Fi=class e extends Pi{constructor(){super(`facebook.com`)}static credential(t){return Si._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Fi.FACEBOOK_SIGN_IN_METHOD=`facebook.com`,Fi.PROVIDER_ID=`facebook.com`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ii=class e extends Pi{constructor(){super(`google.com`),this.addScope(`profile`)}static credential(t,n){return Si._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return e.credential(n,r)}catch{return null}}};Ii.GOOGLE_SIGN_IN_METHOD=`google.com`,Ii.PROVIDER_ID=`google.com`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Li=class e extends Pi{constructor(){super(`github.com`)}static credential(t){return Si._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Li.GITHUB_SIGN_IN_METHOD=`github.com`,Li.PROVIDER_ID=`github.com`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ri=class e extends Pi{constructor(){super(`twitter.com`)}static credential(t,n){return Si._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return e.credential(n,r)}catch{return null}}};Ri.TWITTER_SIGN_IN_METHOD=`twitter.com`,Ri.PROVIDER_ID=`twitter.com`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function zi(e,t){return qn(e,`POST`,`/v1/accounts:signUp`,A(e,t))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bi=class e{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){let a=await br._fromIdTokenResponse(t,r,i),o=Vi(r);return new e({user:a,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);let i=Vi(r);return new e({user:t,providerId:i,_tokenResponse:r,operationType:n})}};function Vi(e){return e.providerId?e.providerId:`phoneNumber`in e?`phone`:null}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Hi=class e extends ye{constructor(t,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,e.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new e(t,n,r,i)}};function Ui(e,t,n,r){return(t===`reauthenticate`?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{throw n.code===`auth/multi-factor-auth-required`?Hi._fromErrorAndOperation(e,n,t,r):n})}async function Wi(e,t,n=!1){let r=await cr(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Bi._forOperation(e,`link`,r)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Gi(e,t,n=!1){let{auth:r}=e;if(T(r.app))return Promise.reject(jn(r));let i=`reauthenticate`;try{let a=await cr(e,Ui(r,i,t,e),n);k(a.idToken,r,`internal-error`);let o=or(a.idToken);k(o,r,`internal-error`);let{sub:s}=o;return k(e.uid===s,r,`user-mismatch`),Bi._forOperation(e,i,a)}catch(e){throw e?.code===`auth/user-not-found`&&O(r,`user-mismatch`),e}}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Ki(e,t,n=!1){if(T(e.app))return Promise.reject(jn(e));let r=`signIn`,i=await Ui(e,r,t),a=await Bi._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(a.user),a}async function qi(e,t){return Ki(Gr(e),t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Ji(e){let t=Gr(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Yi(e,t,n){if(T(e.app))return Promise.reject(jn(e));let r=Gr(e),i=await ai(r,{returnSecureToken:!0,email:t,password:n,clientType:`CLIENT_TYPE_WEB`},`signUpPassword`,zi,`EMAIL_PASSWORD_PROVIDER`).catch(t=>{throw t.code===`auth/password-does-not-meet-requirements`&&Ji(e),t}),a=await Bi._fromIdTokenResponse(r,`signIn`,i);return await r._updateCurrentUser(a.user),a}function Xi(e,t,n){return T(e.app)?Promise.reject(jn(e)):qi(b(e),Mi.credential(t,n)).catch(async t=>{throw t.code===`auth/password-does-not-meet-requirements`&&Ji(e),t})}function Zi(e,t,n,r){return b(e).onIdTokenChanged(t,n,r)}function Qi(e,t,n){return b(e).beforeAuthStateChanged(t,n)}function $i(e,t,n,r){return b(e).onAuthStateChanged(t,n,r)}function ea(e){return b(e).signOut()}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ta(e,t){return j(e,`POST`,`/v2/accounts/mfaEnrollment:start`,A(e,t))}function na(e,t){return j(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,A(e,t))}function ra(e,t){return j(e,`POST`,`/v2/accounts/mfaEnrollment:start`,A(e,t))}function ia(e,t){return j(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,A(e,t))}var aa=`__sak`,oa=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(aa,`1`),this.storage.removeItem(aa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}},sa=1e3,ca=10,la=class extends oa{constructor(){super(()=>window.localStorage,`LOCAL`),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Rr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);!t&&this.localCache[n]===e||this.notifyListeners(n,e)},i=this.storage.getItem(n);Lr()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,ca):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent(`storage`,{key:e,oldValue:t,newValue:n}),!0)})},sa)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}attachListener(){window.addEventListener(`storage`,this.boundEventHandler)}detachListener(){window.removeEventListener(`storage`,this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};la.type=`LOCAL`;var ua=la,da=1e3;function fa(e){let t=e.replace(/[\\^$.*+?()[\]{}|]/g,`\\$&`),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function pa(e){return`${window.location.protocol===`http:`?`__dev_`:`__HOST-`}FIREBASE_${e.split(`:`)[3]}`}var ma=class{constructor(){this.type=`COOKIE`,this.listenerUnsubscribes=new Map}_getFinalTarget(e){let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set(`finalTarget`,e),t}async _isAvailable(){return typeof isSecureContext==`boolean`&&!isSecureContext||typeof navigator>`u`||typeof document>`u`?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=pa(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:fa(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let t=pa(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch(`/__cookies__`,{method:`DELETE`}).catch(()=>void 0)}_addListener(e,t){if(!this._isAvailable())return;let n=pa(e);if(window.cookieStore){let e=(e=>{let r=e.changed.find(e=>e.name===n);r&&t(r.value),e.deleted.find(e=>e.name===n)&&t(null)});return this.listenerUnsubscribes.set(t,()=>window.cookieStore.removeEventListener(`change`,e)),window.cookieStore.addEventListener(`change`,e)}let r=fa(n),i=setInterval(()=>{let e=fa(n);e!==r&&(t(e),r=e)},da);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){let n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}};ma.type=`COOKIE`;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ha=class extends oa{constructor(){super(()=>window.sessionStorage,`SESSION`)}_addListener(e,t){}_removeListener(e,t){}};ha.type=`SESSION`;var ga=ha;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _a(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var va=class e{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){let n=this.receivers.find(e=>e.isListeningto(t));if(n)return n;let r=new e(t);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:`ack`,eventId:n,eventType:r});let o=Array.from(a).map(async e=>e(t.origin,i)),s=await _a(o);t.ports[0].postMessage({status:`done`,eventId:n,eventType:r,response:s})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener(`message`,this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener(`message`,this.boundEventHandler)}};va.receivers=[];
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ya(e=``,t=10){let n=``;for(let e=0;e<t;e++)n+=Math.floor(Math.random()*10);return e+n}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ba=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener(`message`,e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r=typeof MessageChannel<`u`?new MessageChannel:null;if(!r)throw Error(`connection_unavailable`);let i,a;return new Promise((o,s)=>{let c=ya(``,20);r.port1.start();let l=setTimeout(()=>{s(Error(`unsupported_event`))},n);a={messageChannel:r,onMessage(e){let t=e;if(t.data.eventId===c)switch(t.data.status){case`ack`:clearTimeout(l),i=setTimeout(()=>{s(Error(`timeout`))},3e3);break;case`done`:clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),s(Error(`invalid_response`));break}}},this.handlers.add(a),r.port1.addEventListener(`message`,a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function xa(){return window}function Sa(e){xa().location.href=e}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Ca(){return xa().WorkerGlobalScope!==void 0&&typeof xa().importScripts==`function`}async function wa(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ta(){return navigator?.serviceWorker?.controller||null}function Ea(){return Ca()?self:null}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Da=`firebaseLocalStorageDb`,Oa=1,ka=`firebaseLocalStorage`,Aa=`fbase_key`,ja=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener(`success`,()=>{e(this.request.result)}),this.request.addEventListener(`error`,()=>{t(this.request.error)})})}};function Ma(e,t){return e.transaction([ka],t?`readwrite`:`readonly`).objectStore(ka)}function Na(){let e=indexedDB.deleteDatabase(Da);return new ja(e).toPromise()}function Pa(){let e=indexedDB.open(Da,Oa);return new Promise((t,n)=>{e.addEventListener(`error`,()=>{n(e.error)}),e.addEventListener(`upgradeneeded`,()=>{let t=e.result;try{t.createObjectStore(ka,{keyPath:Aa})}catch(e){n(e)}}),e.addEventListener(`success`,async()=>{let n=e.result;n.objectStoreNames.contains(ka)?t(n):(n.close(),await Na(),t(await Pa()))})})}async function Fa(e,t,n){let r=Ma(e,!0).put({[Aa]:t,value:n});return new ja(r).toPromise()}async function Ia(e,t){let n=Ma(e,!1).get(t),r=await new ja(n).toPromise();return r===void 0?null:r.value}function La(e,t){let n=Ma(e,!0).delete(t);return new ja(n).toPromise()}var Ra=800,za=3,Ba=class{constructor(){this.type=`LOCAL`,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||=await Pa(),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>za)throw e;this.db&&=(this.db.close(),void 0)}}async initializeServiceWorkerMessaging(){return Ca()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=va._getInstance(Ea()),this.receiver._subscribe(`keyChanged`,async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe(`ping`,async(e,t)=>[`keyChanged`])}async initializeSender(){if(this.activeServiceWorker=await wa(),!this.activeServiceWorker)return;this.sender=new ba(this.activeServiceWorker);let e=await this.sender._send(`ping`,{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes(`keyChanged`)&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ta()!==this.activeServiceWorker))try{await this.sender._send(`keyChanged`,{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Pa();return await Fa(e,aa,`1`),await La(e,aa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fa(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>Ia(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>La(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>{let t=Ma(e,!1).getAll();return new ja(t).toPromise()});if(!e||this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ra)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Ba.type=`LOCAL`;var Va=Ba;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Ha(e,t){return j(e,`POST`,`/v2/accounts/mfaSignIn:start`,A(e,t))}function Ua(e,t){return j(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,A(e,t))}function Wa(e,t){return j(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,A(e,t))}Qr(`rcb`),new Bn(3e4,6e4);
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ga=`recaptcha`;async function Ka(e,t,n){if(!e._getRecaptchaConfig())try{await oi(e)}catch{console.log(`Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.`)}try{let r;if(r=typeof t==`string`?{phoneNumber:t}:t,`session`in r){let t=r.session;if(`phoneNumber`in r){k(t.type===`enroll`,e,`internal-error`);let i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`}};return(await ai(e,i,`mfaSmsEnrollment`,async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===ni){k(n?.type===Ga,e,`argument-error`);let r=await qa(e,t,n);return ta(e,r)}return ta(e,t)},`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}else{k(t.type===`signin`,e,`internal-error`);let i=r.multiFactorHint?.uid||r.multiFactorUid;k(i,e,`missing-multi-factor-info`);let a={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:`CLIENT_TYPE_WEB`}};return(await ai(e,a,`mfaSmsSignIn`,async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===ni){k(n?.type===Ga,e,`argument-error`);let r=await qa(e,t,n);return Ha(e,r)}return Ha(e,t)},`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}else{let t={phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`};return(await ai(e,t,`sendVerificationCode`,async(e,t)=>{if(t.captchaResponse===ni){k(n?.type===Ga,e,`argument-error`);let r=await qa(e,t,n);return Ci(e,r)}return Ci(e,t)},`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).sessionInfo}}finally{n?._reset()}}async function qa(e,t,n){k(n.type===Ga,e,`argument-error`);let r=await n.verify();k(typeof r==`string`,e,`argument-error`);let i={...t};if(`phoneEnrollmentInfo`in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,a=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:a}}),i}else if(`phoneSignInInfo`in i){let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}else return Object.assign(i,{recaptchaToken:r}),i}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ja=class e{constructor(t){this.providerId=e.PROVIDER_ID,this.auth=Gr(t)}verifyPhoneNumber(e,t){return Ka(this.auth,e,b(t))}static credential(e,t){return Oi._fromVerification(e,t)}static credentialFromResult(t){let n=t;return e.credentialFromTaggedObject(n)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?Oi._fromTokenResponse(t,n):null}};Ja.PROVIDER_ID=`phone`,Ja.PHONE_SIGN_IN_METHOD=`phone`;
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Ya(e,t){return t?Sr(t):(k(e._popupRedirectResolver,e,`argument-error`),e._popupRedirectResolver)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Xa=class extends mi{constructor(e){super(`custom`,`custom`),this.params=e}_getIdTokenResponse(e){return bi(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bi(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bi(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Za(e){return Ki(e.auth,new Xa(e),e.bypassAuthState)}function Qa(e){let{auth:t,user:n}=e;return k(n,t,`internal-error`),Gi(n,new Xa(e),e.bypassAuthState)}async function $a(e){let{auth:t,user:n}=e;return k(n,t,`internal-error`),Wi(n,new Xa(e),e.bypassAuthState)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var eo=class{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:o}=e;if(a){this.reject(a);return}let s={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(s))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case`signInViaPopup`:case`signInViaRedirect`:return Za;case`linkViaPopup`:case`linkViaRedirect`:return $a;case`reauthViaPopup`:case`reauthViaRedirect`:return Qa;default:O(this.auth,`internal-error`)}}resolve(e){Pn(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pn(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}},to=new Bn(2e3,1e4),no=class e extends eo{constructor(t,n,r,i,a){super(t,n,i,a),this.provider=r,this.authWindow=null,this.pollId=null,e.currentPopupAction&&e.currentPopupAction.cancel(),e.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return k(e,this.auth,`internal-error`),e}async onExecution(){Pn(this.filter.length===1,`Popup operations only handle one event`);let e=ya();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(kn(this.auth,`web-storage-unsupported`))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(kn(this.auth,`cancelled-popup-request`))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,e.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(kn(this.auth,`popup-closed-by-user`))},8e3);return}this.pollId=window.setTimeout(e,to.get())};e()}};no.currentPopupAction=null;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ro=`pendingRedirect`,io=new Map,ao=class extends eo{constructor(e,t,n=!1){super(e,[`signInViaRedirect`,`linkViaRedirect`,`reauthViaRedirect`,`unknown`],t,void 0,n),this.eventId=null}async execute(){let e=io.get(this.auth._key());if(!e){try{let t=await oo(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}io.set(this.auth._key(),e)}return this.bypassAuthState||io.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type===`signInViaRedirect`)return super.onAuthEvent(e);if(e.type===`unknown`){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function oo(e,t){let n=lo(t),r=co(e);if(!await r._isAvailable())return!1;let i=await r._get(n)===`true`;return await r._remove(n),i}function so(e,t){io.set(e._key(),t)}function co(e){return Sr(e._redirectPersistence)}function lo(e){return Tr(ro,e.config.apiKey,e.name)}async function uo(e,t,n=!1){if(T(e.app))return Promise.reject(jn(e));let r=Gr(e),i=Ya(r,t),a=await new ao(r,i,n).execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,t)),a}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var fo=600*1e3,po=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!go(e)?t:(this.hasHandledPotentialRedirect=!0,t||=(this.queuedRedirectEvent=e,!0),t)}sendToConsumer(e,t){if(e.error&&!ho(e)){let n=e.error.code?.split(`auth/`)[1]||`internal-error`;t.onError(kn(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fo&&this.cachedEventUids.clear(),this.cachedEventUids.has(mo(e))}saveEventToCache(e){this.cachedEventUids.add(mo(e)),this.lastProcessedEventTime=Date.now()}};function mo(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join(`-`)}function ho({type:e,error:t}){return e===`unknown`&&t?.code===`auth/no-auth-event`}function go(e){switch(e.type){case`signInViaRedirect`:case`linkViaRedirect`:case`reauthViaRedirect`:return!0;case`unknown`:return ho(e);default:return!1}}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _o(e,t={}){return j(e,`GET`,`/v1/projects`,t)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var vo=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yo=/^https?/;async function bo(e){if(e.config.emulator)return;let{authorizedDomains:t}=await _o(e);for(let e of t)try{if(xo(e))return}catch{}O(e,`unauthorized-domain`)}function xo(e){let t=Fn(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith(`chrome-extension://`)){let i=new URL(e);return i.hostname===``&&r===``?n===`chrome-extension:`&&e.replace(`chrome-extension://`,``)===t.replace(`chrome-extension://`,``):n===`chrome-extension:`&&i.hostname===r}if(!yo.test(n))return!1;if(vo.test(e))return r===e;let i=e.replace(/\./g,`\\.`);return RegExp(`^(.+\\.`+i+`|`+i+`)$`,`i`).test(r)}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var So=new Bn(3e4,6e4);function Co(){let e=xa().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}function wo(e){return new Promise((t,n)=>{function r(){Co(),gapi.load(`gapi.iframes`,{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Co(),n(kn(e,`network-request-failed`))},timeout:So.get()})}if(xa().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(xa().gapi?.load)r();else{let t=Qr(`iframefcb`);return xa()[t]=()=>{gapi.load?r():n(kn(e,`network-request-failed`))},Yr(`${Zr()}?onload=${t}`).catch(e=>n(e))}}).catch(e=>{throw To=null,e})}var To=null;function Eo(e){return To||=wo(e),To}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Do=new Bn(5e3,15e3),Oo=`__/auth/iframe`,ko=`emulator/auth/iframe`,Ao={style:{position:`absolute`,top:`-100px`,width:`1px`,height:`1px`},"aria-hidden":`true`,tabindex:`-1`},jo=new Map([[`identitytoolkit.googleapis.com`,`p`],[`staging-identitytoolkit.sandbox.googleapis.com`,`s`],[`test-identitytoolkit.sandbox.googleapis.com`,`t`]]);function Mo(e){let t=e.config;k(t.authDomain,e,`auth-domain-config-required`);let n=t.emulator?Vn(t,ko):`https://${e.config.authDomain}/${Oo}`,r={apiKey:t.apiKey,appName:e.name,v:rn},i=jo.get(e.config.apiHost);i&&(r.eid=i);let a=e._getFrameworks();return a.length&&(r.fw=a.join(`,`)),`${n}?${Ee(r).slice(1)}`}async function No(e){let t=await Eo(e),n=xa().gapi;return k(n,e,`internal-error`),t.open({where:document.body,url:Mo(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ao,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=kn(e,`network-request-failed`),a=xa().setTimeout(()=>{r(i)},Do.get());function o(){xa().clearTimeout(a),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Po={location:`yes`,resizable:`yes`,statusbar:`yes`,toolbar:`no`},Fo=500,Io=600,Lo=`_blank`,Ro=`http://localhost`,zo=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Bo(e,t,n,r=Fo,i=Io){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),s=``,c={...Po,width:r.toString(),height:i.toString(),top:a,left:o},l=_().toLowerCase();n&&(s=Ar(l)?Lo:n),Or(l)&&(t||=Ro,c.scrollbars=`yes`);let u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,``);if(Ir(l)&&s!==`_self`)return Vo(t||``,s),new zo(null);let d=window.open(t||``,s,u);k(d,e,`popup-blocked`);try{d.focus()}catch{}return new zo(d)}function Vo(e,t){let n=document.createElement(`a`);n.href=e,n.target=t;let r=document.createEvent(`MouseEvent`);r.initMouseEvent(`click`,!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ho=`__/auth/handler`,Uo=`emulator/auth/handler`,Wo=`fac`;async function Go(e,t,n,r,i,a){k(e.config.authDomain,e,`auth-domain-config-required`),k(e.config.apiKey,e,`invalid-api-key`);let o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:rn,eventId:i};if(t instanceof Ni){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||``,Ce(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(let[e,t]of Object.entries(a||{}))o[e]=t}if(t instanceof Pi){let e=t.getScopes().filter(e=>e!==``);e.length>0&&(o.scopes=e.join(`,`))}e.tenantId&&(o.tid=e.tenantId);let s=o;for(let e of Object.keys(s))s[e]===void 0&&delete s[e];let c=await e._getAppCheckToken(),l=c?`#${Wo}=${encodeURIComponent(c)}`:``;return`${Ko(e)}?${Ee(s).slice(1)}${l}`}function Ko({config:e}){return e.emulator?Vn(e,Uo):`https://${e.authDomain}/${Ho}`}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var qo=`webStorageSupport`,Jo=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ga,this._completeRedirectFn=uo,this._overrideRedirectResult=so}async _openPopup(e,t,n,r){Pn(this.eventManagers[e._key()]?.manager,`_initialize() not called before _openPopup()`);let i=await Go(e,t,n,Fn(),r);return Bo(e,i,ya())}async _openRedirect(e,t,n,r){await this._originValidation(e);let i=await Go(e,t,n,Fn(),r);return Sa(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Pn(n,`If manager is not set, promise should be`),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await No(e),n=new po(e);return t.register(`authEvent`,t=>(k(t?.authEvent,e,`invalid-auth-event`),{status:n.onEvent(t.authEvent)?`ACK`:`ERROR`}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(qo,{type:qo},n=>{let r=n?.[0]?.[qo];r!==void 0&&t(!!r),O(e,`internal-error`)},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=bo(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Rr()||kr()||Fr()}},Yo=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case`enroll`:return this._finalizeEnroll(e,t.credential,n);case`signin`:return this._finalizeSignIn(e,t.credential);default:return Nn(`unexpected MultiFactorSessionType`)}}},Xo=class e extends Yo{constructor(e){super(`phone`),this.credential=e}static _fromCredential(t){return new e(t)}_finalizeEnroll(e,t,n){return na(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Ua(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Zo=class{constructor(){}static assertion(e){return Xo._fromCredential(e)}};Zo.FACTOR_ID=`phone`;var Qo=class{static assertionForEnrollment(e,t){return $o._fromSecret(e,t)}static assertionForSignIn(e,t){return $o._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;k(t.user?.auth!==void 0,`internal-error`);let n=await ra(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return es._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}};Qo.FACTOR_ID=`totp`;var $o=class e extends Yo{constructor(e,t,n){super(`totp`),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(t,n){return new e(n,void 0,t)}static _fromEnrollmentId(t,n){return new e(n,t)}async _finalizeEnroll(e,t,n){return k(this.secret!==void 0,e,`argument-error`),ia(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){k(this.enrollmentId!==void 0&&this.otp!==void 0,e,`argument-error`);let n={verificationCode:this.otp};return Wa(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},es=class e{constructor(e,t,n,r,i,a,o){this.sessionInfo=a,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(t,n){return new e(t.totpSessionInfo.sharedSecretKey,t.totpSessionInfo.hashingAlgorithm,t.totpSessionInfo.verificationCodeLength,t.totpSessionInfo.periodSec,new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),t.totpSessionInfo.sessionInfo,n)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(ts(e)||ts(t))&&(n=!0),n&&(ts(e)&&(e=this.auth.currentUser?.email||`unknownuser`),ts(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function ts(e){return e===void 0||e?.length===0}var ns=`@firebase/auth`,rs=`1.11.0`,os=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,`dependent-sdk-initialized-before-auth`)}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ss(e){switch(e){case`Node`:return`node`;case`ReactNative`:return`rn`;case`Worker`:return`webworker`;case`Cordova`:return`cordova`;case`WebExtension`:return`web-extension`;default:return}}function cs(e){$t(new x(`auth`,(t,{options:n})=>{let r=t.getProvider(`app`).getImmediate(),i=t.getProvider(`heartbeat`),a=t.getProvider(`app-check-internal`),{apiKey:o,authDomain:s}=r.options;k(o&&!o.includes(`:`),`invalid-api-key`,{appName:r.name});let c={apiKey:o,authDomain:s,clientPlatform:e,apiHost:`identitytoolkit.googleapis.com`,tokenApiHost:`securetoken.googleapis.com`,apiScheme:`https`,sdkClientVersion:zr(e)},l=new Wr(r,i,a,c);return ci(l,n),l},`PUBLIC`).setInstantiationMode(`EXPLICIT`).setInstanceCreatedCallback((e,t,n)=>{e.getProvider(`auth-internal`).initialize()})),$t(new x(`auth-internal`,e=>(e=>new os(e))(Gr(e.getProvider(`auth`).getImmediate())),`PRIVATE`).setInstantiationMode(`EXPLICIT`)),E(ns,rs,ss(e)),E(ns,rs,`esm2020`)}var ls=g(`authIdTokenMaxAge`)||300,us=null,ds=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>ls)return;let i=n?.token;us!==i&&(us=i,await fetch(e,{method:i?`POST`:`DELETE`,headers:i?{Authorization:`Bearer ${i}`}:{}}))};function fs(e=on()){let t=en(e,`auth`);if(t.isInitialized())return t.getImmediate();let n=si(e,{popupRedirectResolver:Jo,persistence:[Va,ua,ga]}),r=g(`authTokenSyncURL`);if(r&&typeof isSecureContext==`boolean`&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){let t=ds(e.toString());Qi(n,t,()=>t(n.currentUser)),Zi(n,e=>t(e))}}let i=p(`auth`);return i&&li(n,`http://${i}`),n}function ps(){return document.getElementsByTagName(`head`)?.[0]??document}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
Jr({loadJS(e){return new Promise((t,n)=>{let r=document.createElement(`script`);r.setAttribute(`src`,e),r.onload=t,r.onerror=e=>{let t=kn(`internal-error`);t.customData=e,n(t)},r.type=`text/javascript`,r.charset=`UTF-8`,ps().appendChild(r)})},gapiScript:`https://apis.google.com/js/api.js`,recaptchaV2Script:`https://www.google.com/recaptcha/api.js`,recaptchaEnterpriseScript:`https://www.google.com/recaptcha/enterprise.js?render=`}),cs(`Browser`),E(`firebase`,`12.3.0`,`app`);var ms=typeof globalThis<`u`?globalThis:typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{},hs={},gs,_s;(function(){var e;function t(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var i=Array(arguments.length-2),a=2;a<arguments.length;a++)i[a-2]=arguments[a];return t.prototype[n].apply(e,i)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(e,t,n){n||=0;let r=Array(16);if(typeof t==`string`)for(var i=0;i<16;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;i<16;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];let a=e.g[3],o;o=t+(a^n&(i^a))+r[0]+3614090360&4294967295,t=n+(o<<7&4294967295|o>>>25),o=a+(i^t&(n^i))+r[1]+3905402710&4294967295,a=t+(o<<12&4294967295|o>>>20),o=i+(n^a&(t^n))+r[2]+606105819&4294967295,i=a+(o<<17&4294967295|o>>>15),o=n+(t^i&(a^t))+r[3]+3250441966&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(a^n&(i^a))+r[4]+4118548399&4294967295,t=n+(o<<7&4294967295|o>>>25),o=a+(i^t&(n^i))+r[5]+1200080426&4294967295,a=t+(o<<12&4294967295|o>>>20),o=i+(n^a&(t^n))+r[6]+2821735955&4294967295,i=a+(o<<17&4294967295|o>>>15),o=n+(t^i&(a^t))+r[7]+4249261313&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(a^n&(i^a))+r[8]+1770035416&4294967295,t=n+(o<<7&4294967295|o>>>25),o=a+(i^t&(n^i))+r[9]+2336552879&4294967295,a=t+(o<<12&4294967295|o>>>20),o=i+(n^a&(t^n))+r[10]+4294925233&4294967295,i=a+(o<<17&4294967295|o>>>15),o=n+(t^i&(a^t))+r[11]+2304563134&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(a^n&(i^a))+r[12]+1804603682&4294967295,t=n+(o<<7&4294967295|o>>>25),o=a+(i^t&(n^i))+r[13]+4254626195&4294967295,a=t+(o<<12&4294967295|o>>>20),o=i+(n^a&(t^n))+r[14]+2792965006&4294967295,i=a+(o<<17&4294967295|o>>>15),o=n+(t^i&(a^t))+r[15]+1236535329&4294967295,n=i+(o<<22&4294967295|o>>>10),o=t+(i^a&(n^i))+r[1]+4129170786&4294967295,t=n+(o<<5&4294967295|o>>>27),o=a+(n^i&(t^n))+r[6]+3225465664&4294967295,a=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(a^t))+r[11]+643717713&4294967295,i=a+(o<<14&4294967295|o>>>18),o=n+(a^t&(i^a))+r[0]+3921069994&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^a&(n^i))+r[5]+3593408605&4294967295,t=n+(o<<5&4294967295|o>>>27),o=a+(n^i&(t^n))+r[10]+38016083&4294967295,a=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(a^t))+r[15]+3634488961&4294967295,i=a+(o<<14&4294967295|o>>>18),o=n+(a^t&(i^a))+r[4]+3889429448&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^a&(n^i))+r[9]+568446438&4294967295,t=n+(o<<5&4294967295|o>>>27),o=a+(n^i&(t^n))+r[14]+3275163606&4294967295,a=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(a^t))+r[3]+4107603335&4294967295,i=a+(o<<14&4294967295|o>>>18),o=n+(a^t&(i^a))+r[8]+1163531501&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(i^a&(n^i))+r[13]+2850285829&4294967295,t=n+(o<<5&4294967295|o>>>27),o=a+(n^i&(t^n))+r[2]+4243563512&4294967295,a=t+(o<<9&4294967295|o>>>23),o=i+(t^n&(a^t))+r[7]+1735328473&4294967295,i=a+(o<<14&4294967295|o>>>18),o=n+(a^t&(i^a))+r[12]+2368359562&4294967295,n=i+(o<<20&4294967295|o>>>12),o=t+(n^i^a)+r[5]+4294588738&4294967295,t=n+(o<<4&4294967295|o>>>28),o=a+(t^n^i)+r[8]+2272392833&4294967295,a=t+(o<<11&4294967295|o>>>21),o=i+(a^t^n)+r[11]+1839030562&4294967295,i=a+(o<<16&4294967295|o>>>16),o=n+(i^a^t)+r[14]+4259657740&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^a)+r[1]+2763975236&4294967295,t=n+(o<<4&4294967295|o>>>28),o=a+(t^n^i)+r[4]+1272893353&4294967295,a=t+(o<<11&4294967295|o>>>21),o=i+(a^t^n)+r[7]+4139469664&4294967295,i=a+(o<<16&4294967295|o>>>16),o=n+(i^a^t)+r[10]+3200236656&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^a)+r[13]+681279174&4294967295,t=n+(o<<4&4294967295|o>>>28),o=a+(t^n^i)+r[0]+3936430074&4294967295,a=t+(o<<11&4294967295|o>>>21),o=i+(a^t^n)+r[3]+3572445317&4294967295,i=a+(o<<16&4294967295|o>>>16),o=n+(i^a^t)+r[6]+76029189&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(n^i^a)+r[9]+3654602809&4294967295,t=n+(o<<4&4294967295|o>>>28),o=a+(t^n^i)+r[12]+3873151461&4294967295,a=t+(o<<11&4294967295|o>>>21),o=i+(a^t^n)+r[15]+530742520&4294967295,i=a+(o<<16&4294967295|o>>>16),o=n+(i^a^t)+r[2]+3299628645&4294967295,n=i+(o<<23&4294967295|o>>>9),o=t+(i^(n|~a))+r[0]+4096336452&4294967295,t=n+(o<<6&4294967295|o>>>26),o=a+(n^(t|~i))+r[7]+1126891415&4294967295,a=t+(o<<10&4294967295|o>>>22),o=i+(t^(a|~n))+r[14]+2878612391&4294967295,i=a+(o<<15&4294967295|o>>>17),o=n+(a^(i|~t))+r[5]+4237533241&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~a))+r[12]+1700485571&4294967295,t=n+(o<<6&4294967295|o>>>26),o=a+(n^(t|~i))+r[3]+2399980690&4294967295,a=t+(o<<10&4294967295|o>>>22),o=i+(t^(a|~n))+r[10]+4293915773&4294967295,i=a+(o<<15&4294967295|o>>>17),o=n+(a^(i|~t))+r[1]+2240044497&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~a))+r[8]+1873313359&4294967295,t=n+(o<<6&4294967295|o>>>26),o=a+(n^(t|~i))+r[15]+4264355552&4294967295,a=t+(o<<10&4294967295|o>>>22),o=i+(t^(a|~n))+r[6]+2734768916&4294967295,i=a+(o<<15&4294967295|o>>>17),o=n+(a^(i|~t))+r[13]+1309151649&4294967295,n=i+(o<<21&4294967295|o>>>11),o=t+(i^(n|~a))+r[4]+4149444226&4294967295,t=n+(o<<6&4294967295|o>>>26),o=a+(n^(t|~i))+r[11]+3174756917&4294967295,a=t+(o<<10&4294967295|o>>>22),o=i+(t^(a|~n))+r[2]+718787259&4294967295,i=a+(o<<15&4294967295|o>>>17),o=n+(a^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+a&4294967295}r.prototype.v=function(e,t){t===void 0&&(t=e.length);let n=t-this.blockSize,r=this.C,a=this.h,o=0;for(;o<t;){if(a==0)for(;o<=n;)i(this,e,o),o+=this.blockSize;if(typeof e==`string`){for(;o<t;)if(r[a++]=e.charCodeAt(o++),a==this.blockSize){i(this,r),a=0;break}}else for(;o<t;)if(r[a++]=e[o++],a==this.blockSize){i(this,r),a=0;break}}this.h=a,this.o+=t},r.prototype.A=function(){var e=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=this.o*8;for(var n=e.length-8;n<e.length;++n)e[n]=t&255,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};function a(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}function o(e,t){this.h=t;let n=[],r=!0;for(let i=e.length-1;i>=0;i--){let a=e[i]|0;r&&a==t||(n[i]=a,r=!1)}this.g=n}var s={};function c(e){return-128<=e&&e<128?a(e,function(e){return new o([e|0],e<0?-1:0)}):new o([e|0],e<0?-1:0)}function l(e){if(isNaN(e)||!isFinite(e))return d;if(e<0)return g(l(-e));let t=[],n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new o(t,0)}function u(e,t){if(e.length==0)throw Error(`number format error: empty string`);if(t||=10,t<2||36<t)throw Error(`radix out of range: `+t);if(e.charAt(0)==`-`)return g(u(e.substring(1),t));if(e.indexOf(`-`)>=0)throw Error(`number format error: interior "-" character`);let n=l(t**8),r=d;for(let a=0;a<e.length;a+=8){var i=Math.min(8,e.length-a);let o=parseInt(e.substring(a,a+i),t);i<8?(i=l(t**+i),r=r.j(i).add(l(o))):(r=r.j(n),r=r.add(l(o)))}return r}var d=c(0),f=c(1),p=c(16777216);e=o.prototype,e.m=function(){if(h(this))return-g(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){let r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if(e||=10,e<2||36<e)throw Error(`radix out of range: `+e);if(m(this))return`0`;if(h(this))return`-`+g(this).toString(e);let t=l(e**6);var n=this;let r=``;for(;;){let i=re(n,t).g;n=ee(n,i.j(t));let a=((n.g.length>0?n.g[0]:n.h)>>>0).toString(e);if(n=i,m(n))return a+r;for(;a.length<6;)a=`0`+a;r=a+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h};function m(e){if(e.h!=0)return!1;for(let t=0;t<e.g.length;t++)if(e.g[t]!=0)return!1;return!0}function h(e){return e.h==-1}e.l=function(e){return e=ee(this,e),h(e)?-1:m(e)?0:1};function g(e){let t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new o(n,~e.h).add(f)}e.abs=function(){return h(this)?g(this):this},e.add=function(e){let t=Math.max(this.g.length,e.g.length),n=[],r=0;for(let i=0;i<=t;i++){let t=r+(this.i(i)&65535)+(e.i(i)&65535),a=(t>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);r=a>>>16,t&=65535,a&=65535,n[i]=a<<16|t}return new o(n,n[n.length-1]&-2147483648?-1:0)};function ee(e,t){return e.add(g(t))}e.j=function(e){if(m(this)||m(e))return d;if(h(this))return h(e)?g(this).j(g(e)):g(g(this).j(e));if(h(e))return g(this.j(g(e)));if(this.l(p)<0&&e.l(p)<0)return l(this.m()*e.m());let t=this.g.length+e.g.length,n=[];for(var r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(let t=0;t<e.g.length;t++){let i=this.i(r)>>>16,a=this.i(r)&65535,o=e.i(t)>>>16,s=e.i(t)&65535;n[2*r+2*t]+=a*s,te(n,2*r+2*t),n[2*r+2*t+1]+=i*s,te(n,2*r+2*t+1),n[2*r+2*t+1]+=a*o,te(n,2*r+2*t+1),n[2*r+2*t+2]+=i*o,te(n,2*r+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new o(n,0)};function te(e,t){for(;(e[t]&65535)!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function ne(e,t){this.g=e,this.h=t}function re(e,t){if(m(t))throw Error(`division by zero`);if(m(e))return new ne(d,d);if(h(e))return t=re(g(e),t),new ne(g(t.g),g(t.h));if(h(t))return t=re(e,g(t)),new ne(g(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error(`slowDivide_ only works with positive integers.`);for(var n=f,r=t;r.l(e)<=0;)n=ie(n),r=ie(r);var i=ae(n,1),a=ae(r,1);for(r=ae(r,2),n=ae(n,2);!m(r);){var o=a.add(r);o.l(e)<=0&&(i=i.add(n),a=o),r=ae(r,1),n=ae(n,1)}return t=ee(e,i.j(t)),new ne(i,t)}for(i=d;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=Math.ceil(Math.log(n)/Math.LN2),r=r<=48?1:2**(r-48),a=l(n),o=a.j(t);h(o)||o.l(e)>0;)n-=r,a=l(n),o=a.j(t);m(a)&&(a=f),i=i.add(a),e=ee(e,o)}return new ne(i,e)}e.B=function(e){return re(this,e).h},e.and=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new o(n,this.h&e.h)},e.or=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new o(n,this.h|e.h)},e.xor=function(e){let t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new o(n,this.h^e.h)};function ie(e){let t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new o(n,e.h)}function ae(e,t){let n=t>>5;t%=32;let r=e.g.length-n,i=[];for(let a=0;a<r;a++)i[a]=t>0?e.i(a+n)>>>t|e.i(a+n+1)<<32-t:e.i(a+n);return new o(i,e.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,_s=hs.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=u,gs=hs.Integer=o}).apply(ms===void 0?typeof self<`u`?self:typeof window<`u`?window:{}:ms);var vs=typeof globalThis<`u`?globalThis:typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{},ys={},bs,xs,Ss,Cs,ws,Ts,Es,Ds;(function(){var e,t=Object.defineProperty;function n(e){e=[typeof globalThis==`object`&&globalThis,e,typeof window==`object`&&window,typeof self==`object`&&self,typeof vs==`object`&&vs];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error(`Cannot find global object`)}var r=n(this);function i(e,n){if(n)a:{var i=r;e=e.split(`.`);for(var a=0;a<e.length-1;a++){var o=e[a];if(!(o in i))break a;i=i[o]}e=e[e.length-1],a=i[e],n=n(a),n!=a&&n!=null&&t(i,e,{configurable:!0,writable:!0,value:n})}}i(`Symbol.dispose`,function(e){return e||Symbol(`Symbol.dispose`)}),i(`Array.prototype.values`,function(e){return e||function(){return this[Symbol.iterator]()}}),i(`Object.entries`,function(e){return e||function(e){var t=[],n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push([n,e[n]]);return t}});var a=a||{},o=this||self;function s(e){var t=typeof e;return t==`object`&&e!=null||t==`function`}function c(e,t,n){return e.call.apply(e.bind,arguments)}function l(e,t,n){return l=c,l.apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function d(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var i=Array(arguments.length-2),a=2;a<arguments.length;a++)i[a-2]=arguments[a];return t.prototype[n].apply(e,i)}}var f=typeof AsyncContext<`u`&&typeof AsyncContext.Snapshot==`function`?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function p(e){let t=e.length;if(t>0){let n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function m(e,t){for(let t=1;t<arguments.length;t++){let r=arguments[t];var n=typeof r;if(n=n==`object`?r?Array.isArray(r)?`array`:n:`null`:n,n==`array`||n==`object`&&typeof r.length==`number`){n=e.length||0;let t=r.length||0;e.length=n+t;for(let i=0;i<t;i++)e[n+i]=r[i]}else e.push(r)}}class h{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function g(e){o.setTimeout(()=>{throw e},0)}function ee(){var e=oe;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class te{constructor(){this.h=this.g=null}add(e,t){let n=ne.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var ne=new h(()=>new re,e=>e.reset());class re{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let ie,ae=!1,oe=new te,se=()=>{let e=Promise.resolve(void 0);ie=()=>{e.then(ce)}};function ce(){for(var e;e=ee();){try{e.h.call(e.g)}catch(e){g(e)}var t=ne;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}ae=!1}function _(){this.u=this.u,this.C=this.C}_.prototype.u=!1,_.prototype.dispose=function(){this.u||(this.u=!0,this.N())},_.prototype[Symbol.dispose]=function(){this.dispose()},_.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var le=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},`passive`,{get:function(){e=!0}});try{let e=()=>{};o.addEventListener(`test`,e,t),o.removeEventListener(`test`,e,t)}catch{}return e}();function ue(e){return/^[\s\xa0]*$/.test(e)}function de(e,t){v.call(this,e?e.type:``),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key=``,this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType=``,this.i=null,e&&this.init(e,t)}d(de,v),de.prototype.init=function(e,t){let n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget,t||(n==`mouseover`?t=e.fromElement:n==`mouseout`&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=r.clientX===void 0?r.pageX:r.clientX,this.clientY=r.clientY===void 0?r.pageY:r.clientY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=e.clientX===void 0?e.pageX:e.clientX,this.clientY=e.clientY===void 0?e.pageY:e.clientY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||``,this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&de.Z.h.call(this)},de.prototype.h=function(){de.Z.h.call(this);let e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var fe=`closure_listenable_`+(Math.random()*1e6|0),pe=0;function me(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++pe,this.da=this.fa=!1}function he(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function ge(e,t,n){for(let r in e)t.call(n,e[r],r,e)}function _e(e,t){for(let n in e)t.call(void 0,e[n],n,e)}function ve(e){let t={};for(let n in e)t[n]=e[n];return t}let ye=`constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf`.split(` `);function be(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t],r)e[n]=r[n];for(let t=0;t<ye.length;t++)n=ye[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function xe(e){this.src=e,this.g={},this.h=0}xe.prototype.add=function(e,t,n,r,i){let a=e.toString();e=this.g[a],e||(e=this.g[a]=[],this.h++);let o=Ce(e,t,r,i);return o>-1?(t=e[o],n||(t.fa=!1)):(t=new me(t,this.src,a,!!r,i),t.fa=n,e.push(t)),t};function Se(e,t){let n=t.type;if(n in e.g){var r=e.g[n],i=Array.prototype.indexOf.call(r,t,void 0),a;(a=i>=0)&&Array.prototype.splice.call(r,i,1),a&&(he(t),e.g[n].length==0&&(delete e.g[n],e.h--))}}function Ce(e,t,n,r){for(let i=0;i<e.length;++i){let a=e[i];if(!a.da&&a.listener==t&&a.capture==!!n&&a.ha==r)return i}return-1}var we=`closure_lm_`+(Math.random()*1e6|0),Te={};function Ee(e,t,n,r,i){if(r&&r.once)return ke(e,t,n,r,i);if(Array.isArray(t)){for(let a=0;a<t.length;a++)Ee(e,t[a],n,r,i);return null}return n=Ie(n),e&&e[fe]?e.J(t,n,s(r)?!!r.capture:!!r,i):De(e,t,n,!1,r,i)}function De(e,t,n,r,i,a){if(!t)throw Error(`Invalid event type`);let o=s(i)?!!i.capture:!!i,c=Pe(e);if(c||(e[we]=c=new xe(e)),n=c.add(t,n,r,o,a),n.proxy)return n;if(r=Oe(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)le||(i=o),i===void 0&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(Me(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error(`addEventListener and attachEvent are unavailable.`);return n}function Oe(){function e(n){return t.call(e.src,e.listener,n)}let t=Ne;return e}function ke(e,t,n,r,i){if(Array.isArray(t)){for(let a=0;a<t.length;a++)ke(e,t[a],n,r,i);return null}return n=Ie(n),e&&e[fe]?e.K(t,n,s(r)?!!r.capture:!!r,i):De(e,t,n,!0,r,i)}function Ae(e,t,n,r,i){if(Array.isArray(t))for(var a=0;a<t.length;a++)Ae(e,t[a],n,r,i);else r=s(r)?!!r.capture:!!r,n=Ie(n),e&&e[fe]?(e=e.i,a=String(t).toString(),a in e.g&&(t=e.g[a],n=Ce(t,n,r,i),n>-1&&(he(t[n]),Array.prototype.splice.call(t,n,1),t.length==0&&(delete e.g[a],e.h--)))):(e&&=Pe(e))&&(t=e.g[t.toString()],e=-1,t&&(e=Ce(t,n,r,i)),(n=e>-1?t[e]:null)&&je(n))}function je(e){if(typeof e!=`number`&&e&&!e.da){var t=e.src;if(t&&t[fe])Se(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(Me(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Pe(t))?(Se(n,e),n.h==0&&(n.src=null,t[we]=null)):he(e)}}}function Me(e){return e in Te?Te[e]:Te[e]=`on`+e}function Ne(e,t){if(e.da)e=!0;else{t=new de(t,this);let n=e.listener,r=e.ha||e.src;e.fa&&je(e),e=n.call(r,t)}return e}function Pe(e){return e=e[we],e instanceof xe?e:null}var Fe=`__closure_events_fn_`+(Math.random()*1e9>>>0);function Ie(e){return typeof e==`function`?e:(e[Fe]||(e[Fe]=function(t){return e.handleEvent(t)}),e[Fe])}function y(){_.call(this),this.i=new xe(this),this.M=this,this.G=null}d(y,_),y.prototype[fe]=!0,y.prototype.removeEventListener=function(e,t,n,r){Ae(this,e,t,n,r)};function b(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,typeof t==`string`)t=new v(t,e);else if(t instanceof v)t.target=t.target||e;else{var i=t;t=new v(r,e),be(t,i)}i=!0;let a,o;if(n)for(o=n.length-1;o>=0;o--)a=t.g=n[o],i=x(a,r,!0,t)&&i;if(a=t.g=e,i=x(a,r,!0,t)&&i,i=x(a,r,!1,t)&&i,n)for(o=0;o<n.length;o++)a=t.g=n[o],i=x(a,r,!1,t)&&i}y.prototype.N=function(){if(y.Z.N.call(this),this.i){var e=this.i;for(let t in e.g){let n=e.g[t];for(let e=0;e<n.length;e++)he(n[e]);delete e.g[t],e.h--}}this.G=null},y.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},y.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};function x(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();let i=!0;for(let a=0;a<t.length;++a){let o=t[a];if(o&&!o.da&&o.capture==n){let t=o.listener,n=o.ha||o.src;o.fa&&Se(e.i,o),i=t.call(n,r)!==!1&&i}}return i&&!r.defaultPrevented}function Le(e,t){if(typeof e!=`function`)if(e&&typeof e.handleEvent==`function`)e=l(e.handleEvent,e);else throw Error(`Invalid listener argument`);return Number(t)>2147483647?-1:o.setTimeout(e,t||0)}function Re(e){e.g=Le(()=>{e.g=null,e.i&&(e.i=!1,Re(e))},e.l);let t=e.h;e.h=null,e.m.apply(null,t)}class ze extends _{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Re(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Be(e){_.call(this),this.h=e,this.g={}}d(Be,_);var Ve=[];function He(e){ge(e.g,function(e,t){this.g.hasOwnProperty(t)&&je(e)},e),e.g={}}Be.prototype.N=function(){Be.Z.N.call(this),He(this)},Be.prototype.handleEvent=function(){throw Error(`EventHandler.handleEvent not implemented`)};var S=o.JSON.stringify,Ue=o.JSON.parse,We=class{stringify(e){return o.JSON.stringify(e,void 0)}parse(e){return o.JSON.parse(e,void 0)}};function Ge(){}function Ke(){}var qe={OPEN:`a`,hb:`b`,ERROR:`c`,tb:`d`};function Je(){v.call(this,`d`)}d(Je,v);function Ye(){v.call(this,`c`)}d(Ye,v);var Xe={},Ze=null;function Qe(){return Ze||=new y}Xe.Ia=`serverreachability`;function $e(e){v.call(this,Xe.Ia,e)}d($e,v);function et(e){let t=Qe();b(t,new $e(t))}Xe.STAT_EVENT=`statevent`;function tt(e,t){v.call(this,Xe.STAT_EVENT,e),this.stat=t}d(tt,v);function C(e){let t=Qe();b(t,new tt(t,e))}Xe.Ja=`timingevent`;function nt(e,t){v.call(this,Xe.Ja,e),this.size=t}d(nt,v);function rt(e,t){if(typeof e!=`function`)throw Error(`Fn must not be null and must be a function`);return o.setTimeout(function(){e()},t)}function it(){this.g=!0}it.prototype.ua=function(){this.g=!1};function at(e,t,n,r,i,a){e.info(function(){if(e.g)if(a){var o=``,s=a.split(`&`);for(let e=0;e<s.length;e++){var c=s[e].split(`=`);if(c.length>1){let e=c[0];c=c[1];let t=e.split(`_`);o=t.length>=2&&t[1]==`type`?o+(e+`=`+c+`&`):o+(e+`=redacted&`)}}}else o=null;else o=a;return`XMLHTTP REQ (`+r+`) [attempt `+i+`]: `+t+`
`+n+`
`+o})}function ot(e,t,n,r,i,a,o){e.info(function(){return`XMLHTTP RESP (`+r+`) [ attempt `+i+`]: `+t+`
`+n+`
`+a+` `+o})}function st(e,t,n,r){e.info(function(){return`XMLHTTP TEXT (`+t+`): `+lt(e,n)+(r?` `+r:``)})}function ct(e,t){e.info(function(){return`TIMEOUT: `+t})}it.prototype.info=function(){};function lt(e,t){if(!e.g)return t;if(!t)return null;try{let a=JSON.parse(t);if(a){for(e=0;e<a.length;e++)if(Array.isArray(a[e])){var n=a[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var i=r[0];if(i!=`noop`&&i!=`stop`&&i!=`close`)for(let e=1;e<r.length;e++)r[e]=``}}}}return S(a)}catch{return t}}var ut={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},dt={ib:`complete`,Fb:`success`,ERROR:`error`,Ga:`abort`,xb:`ready`,yb:`readystatechange`,TIMEOUT:`timeout`,sb:`incrementaldata`,wb:`progress`,lb:`downloadprogress`,Nb:`uploadprogress`},ft;function pt(){}d(pt,Ge),pt.prototype.g=function(){return new XMLHttpRequest},ft=new pt;function mt(e){return encodeURIComponent(String(e))}function ht(e){var t=1;e=e.split(`:`);let n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(`:`)),n}function gt(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new Be(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new _t}function _t(){this.i=null,this.g=``,this.h=!1}var vt={},yt={};function bt(e,t,n){e.M=1,e.A=Kt(Ht(t)),e.u=n,e.R=!0,xt(e,null)}function xt(e,t){e.F=Date.now(),Tt(e),e.B=Ht(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),on(n.i,`t`,r),e.C=0,n=e.j.L,e.h=new _t,e.g=j(e.j,n?t:null,!e.u),e.P>0&&(e.O=new ze(l(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var i=`readystatechange`;Array.isArray(i)||(i&&(Ve[0]=i.toString()),i=Ve);for(let e=0;e<i.length;e++){let a=Ee(n,i[e],r||t.handleEvent,!1,t.h||t);if(!a)break;t.g[a.key]=a}t=e.J?ve(e.J):{},e.u?(e.v||=`POST`,t[`Content-Type`]=`application/x-www-form-urlencoded`,e.g.ea(e.B,e.v,e.u,t)):(e.v=`GET`,e.g.ea(e.B,e.v,null,t)),et(),at(e.i,e.v,e.B,e.l,e.S,e.u)}gt.prototype.ba=function(e){e=e.target;let t=this.O;t&&En(e)==3?t.j():this.Y(e)},gt.prototype.Y=function(e){try{if(e==this.g)a:{let s=En(this.g),c=this.g.ya(),l=this.g.ca();if(!(s<3)&&(s!=3||this.g&&(this.h.h||this.g.la()||Dn(this.g)))){this.K||s!=4||c==7||et(c==8||l<=0?3:2),Dt(this);var t=this.g.ca();this.X=t;var n=St(this);if(this.o=t==200,ot(this.i,this.v,this.B,this.l,this.S,s,t),this.o){if(this.U&&!this.L){b:{if(this.g){var r,i=this.g;if((r=i.g?i.g.getResponseHeader(`X-HTTP-Initial-Response`):null)&&!ue(r)){var a=r;break b}}a=null}if(e=a)st(this.i,this.l,e,`Initial handshake response via X-HTTP-Initial-Response`),this.L=!0,At(this,e);else{this.o=!1,this.m=3,C(12),kt(this),Ot(this);break a}}if(this.R){e=!0;let t;for(;!this.K&&this.C<n.length;)if(t=wt(this,n),t==yt){s==4&&(this.m=4,C(14),e=!1),st(this.i,this.l,null,`[Incomplete Response]`);break}else if(t==vt){this.m=4,C(15),st(this.i,this.l,n,`[Invalid Chunk]`),e=!1;break}else st(this.i,this.l,t,null),At(this,t);if(Ct(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),s!=4||n.length!=0||this.h.h||(this.m=1,C(16),e=!1),this.o=this.o&&e,!e)st(this.i,this.l,n,`[Invalid Chunked Response]`),kt(this),Ot(this);else if(n.length>0&&!this.W){this.W=!0;var o=this.j;o.g==this&&o.aa&&!o.P&&(o.j.info(`Great, no buffering proxy detected. Bytes received: `+n.length),zn(o),o.P=!0,C(11))}}else st(this.i,this.l,n,null),At(this,n);s==4&&kt(this),this.o&&!this.K&&(s==4?Hn(this.j,this):(this.o=!1,Tt(this)))}else On(this.g),t==400&&n.indexOf(`Unknown SID`)>0?(this.m=3,C(12)):(this.m=0,C(13)),kt(this),Ot(this)}}}catch{}};function St(e){if(!Ct(e))return e.g.la();let t=Dn(e.g);if(t===``)return``;let n=``,r=t.length,i=En(e.g)==4;if(!e.h.i){if(typeof TextDecoder>`u`)return kt(e),Ot(e),``;e.h.i=new o.TextDecoder}for(let a=0;a<r;a++)e.h.h=!0,n+=e.h.i.decode(t[a],{stream:!(i&&a==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}function Ct(e){return e.g?e.v==`GET`&&e.M!=2&&e.j.Aa:!1}function wt(e,t){var n=e.C,r=t.indexOf(`
`,n);return r==-1?yt:(n=Number(t.substring(n,r)),isNaN(n)?vt:(r+=1,r+n>t.length?yt:(t=t.slice(r,r+n),e.C=r+n,t)))}gt.prototype.cancel=function(){this.K=!0,kt(this)};function Tt(e){e.T=Date.now()+e.H,Et(e,e.H)}function Et(e,t){if(e.D!=null)throw Error(`WatchDog timer not null`);e.D=rt(l(e.aa,e),t)}function Dt(e){e.D&&=(o.clearTimeout(e.D),null)}gt.prototype.aa=function(){this.D=null;let e=Date.now();e-this.T>=0?(ct(this.i,this.B),this.M!=2&&(et(),C(17)),kt(this),this.m=2,Ot(this)):Et(this,this.T-e)};function Ot(e){e.j.I==0||e.K||Hn(e.j,e)}function kt(e){Dt(e);var t=e.O;t&&typeof t.dispose==`function`&&t.dispose(),e.O=null,He(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function At(e,t){try{var n=e.j;if(n.I!=0&&(n.g==e||Ft(n.h,e))){if(!e.L&&Ft(n.h,e)&&n.I==3){try{var r=n.Ba.g.parse(t)}catch{r=null}if(Array.isArray(r)&&r.length==3){var i=r;if(i[0]==0){a:if(!n.v){if(n.g)if(n.g.F+3e3<e.F)Vn(n),jn(n);else break a;Rn(n),C(18)}}else n.xa=i[1],0<n.xa-n.K&&i[2]<37500&&n.F&&n.A==0&&!n.C&&(n.C=rt(l(n.Va,n),6e3));Pt(n.h)<=1&&n.ta&&(n.ta=void 0)}else Wn(n,11)}else if((e.L||n.g==e)&&Vn(n),!ue(t))for(i=n.Ba.g.parse(t),t=0;t<i.length;t++){let l=i[t],u=l[0];if(!(u<=n.K))if(n.K=u,l=l[1],n.I==2)if(l[0]==`c`){n.M=l[1],n.ba=l[2];let t=l[3];t!=null&&(n.ka=t,n.j.info(`VER=`+n.ka));let i=l[4];i!=null&&(n.za=i,n.j.info(`SVER=`+n.za));let u=l[5];u!=null&&typeof u==`number`&&u>0&&(r=1.5*u,n.O=r,n.j.info(`backChannelRequestTimeoutMs_=`+r)),r=n;let d=e.g;if(d){let e=d.g?d.g.getResponseHeader(`X-Client-Wire-Protocol`):null;if(e){var a=r.h;a.g||e.indexOf(`spdy`)==-1&&e.indexOf(`quic`)==-1&&e.indexOf(`h2`)==-1||(a.j=a.l,a.g=new Set,a.h&&=(It(a,a.h),null))}if(r.G){let e=d.g?d.g.getResponseHeader(`X-HTTP-Session-Id`):null;e&&(r.wa=e,w(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info(`Handshake RTT: `+n.T+`ms`)),r=n;var o=e;if(r.na=A(r,r.L?r.ba:null,r.W),o.L){Lt(r.h,o);var s=o,c=r.O;c&&(s.H=c),s.D&&(Dt(s),Tt(s)),r.g=o}else Ln(r);n.i.length>0&&k(n)}else l[0]!=`stop`&&l[0]!=`close`||Wn(n,7);else n.I==3&&(l[0]==`stop`||l[0]==`close`?l[0]==`stop`?Wn(n,7):An(n):l[0]!=`noop`&&n.l&&n.l.qa(l),n.A=0)}}et(4)}catch{}}var jt=class{constructor(e,t){this.g=e,this.map=t}};function Mt(e){this.l=e||10,o.PerformanceNavigationTiming?(e=o.performance.getEntriesByType(`navigation`),e=e.length>0&&(e[0].nextHopProtocol==`hq`||e[0].nextHopProtocol==`h2`)):e=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Nt(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function Pt(e){return e.h?1:e.g?e.g.size:0}function Ft(e,t){return e.h?e.h==t:e.g?e.g.has(t):!1}function It(e,t){e.g?e.g.add(t):e.h=t}function Lt(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}Mt.prototype.cancel=function(){if(this.i=Rt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let e of this.g.values())e.cancel();this.g.clear()}};function Rt(e){if(e.h!=null)return e.i.concat(e.h.G);if(e.g!=null&&e.g.size!==0){let t=e.i;for(let n of e.g.values())t=t.concat(n.G);return t}return p(e.i)}var zt=RegExp(`^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$`);function Bt(e,t){if(e){e=e.split(`&`);for(let n=0;n<e.length;n++){let r=e[n].indexOf(`=`),i,a=null;r>=0?(i=e[n].substring(0,r),a=e[n].substring(r+1)):i=e[n],t(i,a?decodeURIComponent(a.replace(/\+/g,` `)):``)}}}function Vt(e){this.g=this.o=this.j=``,this.u=null,this.m=this.h=``,this.l=!1;let t;e instanceof Vt?(this.l=e.l,Ut(this,e.j),this.o=e.o,this.g=e.g,Wt(this,e.u),this.h=e.h,Gt(this,E(e.i)),this.m=e.m):e&&(t=String(e).match(zt))?(this.l=!1,Ut(this,t[1]||``,!0),this.o=qt(t[2]||``),this.g=qt(t[3]||``,!0),Wt(this,t[4]),this.h=qt(t[5]||``,!0),Gt(this,t[6]||``,!0),this.m=qt(t[7]||``)):(this.l=!1,this.i=new T(null,this.l))}Vt.prototype.toString=function(){let e=[];var t=this.j;t&&e.push(Jt(t,Xt,!0),`:`);var n=this.g;return(n||t==`file`)&&(e.push(`//`),(t=this.o)&&e.push(Jt(t,Xt,!0),`@`),e.push(mt(n).replace(/%25([0-9a-fA-F]{2})/g,`%$1`)),n=this.u,n!=null&&e.push(`:`,String(n))),(n=this.h)&&(this.g&&n.charAt(0)!=`/`&&e.push(`/`),e.push(Jt(n,n.charAt(0)==`/`?Qt:Zt,!0))),(n=this.i.toString())&&e.push(`?`,n),(n=this.m)&&e.push(`#`,Jt(n,en)),e.join(``)},Vt.prototype.resolve=function(e){let t=Ht(this),n=!!e.j;n?Ut(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=e.u!=null;var r=e.h;if(n)Wt(t,e.u);else if(n=!!e.h){if(r.charAt(0)!=`/`)if(this.g&&!this.h)r=`/`+r;else{var i=t.h.lastIndexOf(`/`);i!=-1&&(r=t.h.slice(0,i+1)+r)}if(i=r,i==`..`||i==`.`)r=``;else if(i.indexOf(`./`)!=-1||i.indexOf(`/.`)!=-1){r=i.lastIndexOf(`/`,0)==0,i=i.split(`/`);let e=[];for(let t=0;t<i.length;){let n=i[t++];n==`.`?r&&t==i.length&&e.push(``):n==`..`?((e.length>1||e.length==1&&e[0]!=``)&&e.pop(),r&&t==i.length&&e.push(``)):(e.push(n),r=!0)}r=e.join(`/`)}else r=i}return n?t.h=r:n=e.i.toString()!==``,n?Gt(t,E(e.i)):n=!!e.m,n&&(t.m=e.m),t};function Ht(e){return new Vt(e)}function Ut(e,t,n){e.j=n?qt(t,!0):t,e.j&&=e.j.replace(/:$/,``)}function Wt(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error(`Bad port number `+t);e.u=t}else e.u=null}function Gt(e,t,n){t instanceof T?(e.i=t,cn(e.i,e.l)):(n||(t=Jt(t,$t)),e.i=new T(t,e.l))}function w(e,t,n){e.i.set(t,n)}function Kt(e){return w(e,`zx`,Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),e}function qt(e,t){return e?t?decodeURI(e.replace(/%25/g,`%2525`)):decodeURIComponent(e):``}function Jt(e,t,n){return typeof e==`string`?(e=encodeURI(e).replace(t,Yt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,`%$1`)),e):null}function Yt(e){return e=e.charCodeAt(0),`%`+(e>>4&15).toString(16)+(e&15).toString(16)}var Xt=/[#\/\?@]/g,Zt=/[#\?:]/g,Qt=/[#\?]/g,$t=/[#\?@]/g,en=/#/g;function T(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tn(e){e.g||(e.g=new Map,e.h=0,e.i&&Bt(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g,` `)),n)}))}e=T.prototype,e.add=function(e,t){tn(this),this.i=null,e=sn(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this};function nn(e,t){tn(e),t=sn(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function rn(e,t){return tn(e),t=sn(e,t),e.g.has(t)}e.forEach=function(e,t){tn(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)};function an(e,t){tn(e);let n=[];if(typeof t==`string`)rn(e,t)&&(n=n.concat(e.g.get(sn(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}e.set=function(e,t){return tn(this),this.i=null,e=sn(this,e),rn(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e?(e=an(this,e),e.length>0?String(e[0]):t):t};function on(e,t,n){nn(e,t),n.length>0&&(e.i=null,e.g.set(sn(e,t),p(n)),e.h+=n.length)}e.toString=function(){if(this.i)return this.i;if(!this.g)return``;let e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];let i=mt(n);n=an(this,n);for(let t=0;t<n.length;t++){let r=i;n[t]!==``&&(r+=`=`+mt(n[t])),e.push(r)}}return this.i=e.join(`&`)};function E(e){let t=new T;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function sn(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function cn(e,t){t&&!e.j&&(tn(e),e.i=null,e.g.forEach(function(e,t){let n=t.toLowerCase();t!=n&&(nn(this,t),on(this,n,e))},e)),e.j=t}function ln(e,t){let n=new it;if(o.Image){let r=new Image;r.onload=u(dn,n,`TestLoadImage: loaded`,!0,t,r),r.onerror=u(dn,n,`TestLoadImage: error`,!1,t,r),r.onabort=u(dn,n,`TestLoadImage: abort`,!1,t,r),r.ontimeout=u(dn,n,`TestLoadImage: timeout`,!1,t,r),o.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}function un(e,t){let n=new it,r=new AbortController,i=setTimeout(()=>{r.abort(),dn(n,`TestPingServer: timeout`,!1,t)},1e4);fetch(e,{signal:r.signal}).then(e=>{clearTimeout(i),e.ok?dn(n,`TestPingServer: ok`,!0,t):dn(n,`TestPingServer: server error`,!1,t)}).catch(()=>{clearTimeout(i),dn(n,`TestPingServer: error`,!1,t)})}function dn(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch{}}function fn(){this.g=new We}function pn(e){this.i=e.Sb||null,this.h=e.ab||!1}d(pn,Ge),pn.prototype.g=function(){return new mn(this.i,this.h)};function mn(e,t){y.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText=``,this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F=`GET`,this.D=``,this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d(mn,y),e=mn.prototype,e.open=function(e,t){if(this.readyState!=0)throw this.abort(),Error(`Error reopening a connection`);this.F=e,this.D=t,this.readyState=1,_n(this)},e.send=function(e){if(this.readyState!=1)throw this.abort(),Error(`need to call open() first. `);if(this.v.signal.aborted)throw this.abort(),Error(`Request was aborted.`);this.g=!0;let t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||o).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText=``,this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel(`Request was aborted.`).catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,gn(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,_n(this)),this.g&&(this.readyState=3,_n(this),this.g)))if(this.responseType===`arraybuffer`)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(o.ReadableStream!==void 0&&`body`in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error(`responseType must be empty for "streamBinaryChunks" mode responses.`);this.response=[]}else this.response=this.responseText=``,this.B=new TextDecoder;hn(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))};function hn(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array;(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?gn(this):_n(this),this.readyState==3&&hn(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,gn(this))},e.Na=function(e){this.g&&(this.response=e,gn(this))},e.ga=function(){this.g&&gn(this)};function gn(e){e.readyState=4,e.l=null,e.j=null,e.B=null,_n(e)}e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||``},e.getAllResponseHeaders=function(){if(!this.h)return``;let e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+`: `+n[1]),n=t.next();return e.join(`\r
`)};function _n(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(mn.prototype,`withCredentials`,{get:function(){return this.m===`include`},set:function(e){this.m=e?`include`:`same-origin`}});function vn(e){let t=``;return ge(e,function(e,n){t+=n,t+=`:`,t+=e,t+=`\r
`}),t}function yn(e,t,n){a:{for(r in n){var r=!1;break a}r=!0}r||(n=vn(n),typeof e==`string`||w(e,t,n))}function D(e){y.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D=``,this.o=0,this.l=``,this.j=this.B=this.v=this.A=!1,this.m=null,this.F=``,this.H=!1}d(D,y);var bn=/^https?$/i,xn=[`POST`,`PUT`];e=D.prototype,e.Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error(`[goog.net.XhrIo] Object is active with another request=`+this.D+`; newUri=`+e);t=t?t.toUpperCase():`GET`,this.D=e,this.l=``,this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ft.g(),this.g.onreadystatechange=f(l(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(e){Sn(this,e);return}if(e=n||``,n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else if(typeof r.keys==`function`&&typeof r.get==`function`)for(let e of r.keys())n.set(e,r.get(e));else throw Error(`Unknown input type for opt_headers: `+String(r));r=Array.from(n.keys()).find(e=>e.toLowerCase()==`content-type`),i=o.FormData&&e instanceof o.FormData,!(Array.prototype.indexOf.call(xn,t,void 0)>=0)||r||i||n.set(`Content-Type`,`application/x-www-form-urlencoded;charset=utf-8`);for(let[e,t]of n)this.g.setRequestHeader(e,t);this.F&&(this.g.responseType=this.F),`withCredentials`in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&=(clearTimeout(this.m),null),this.v=!0,this.g.send(e),this.v=!1}catch(e){Sn(this,e)}};function Sn(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Cn(e),Tn(e)}function Cn(e){e.A||(e.A=!0,b(e,`complete`),b(e,`error`))}e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,b(this,`complete`),b(this,`abort`),Tn(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Tn(this,!0)),D.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?wn(this):this.Xa())},e.Xa=function(){wn(this)};function wn(e){if(e.h&&a!==void 0){if(e.v&&En(e)==4)setTimeout(e.Ca.bind(e),0);else if(b(e,`readystatechange`),En(e)==4){e.h=!1;try{let a=e.ca();a:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break a;default:t=!1}var n;if(!(n=t)){var r;if(r=a===0){let t=String(e.D).match(zt)[1]||null;!t&&o.self&&o.self.location&&(t=o.self.location.protocol.slice(0,-1)),r=!bn.test(t?t.toLowerCase():``)}n=r}if(n)b(e,`complete`),b(e,`success`);else{e.o=6;try{var i=En(e)>2?e.g.statusText:``}catch{i=``}e.l=i+` [`+e.ca()+`]`,Cn(e)}}finally{Tn(e)}}}}function Tn(e,t){if(e.g){e.m&&=(clearTimeout(e.m),null);let n=e.g;e.g=null,t||b(e,`ready`);try{n.onreadystatechange=null}catch{}}}e.isActive=function(){return!!this.g};function En(e){return e.g?e.g.readyState:0}e.ca=function(){try{return En(this)>2?this.g.status:-1}catch{return-1}},e.la=function(){try{return this.g?this.g.responseText:``}catch{return``}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&t.indexOf(e)==0&&(t=t.substring(e.length)),Ue(t)}};function Dn(e){try{if(!e.g)return null;if(`response`in e.g)return e.g.response;switch(e.F){case``:case`text`:return e.g.responseText;case`arraybuffer`:if(`mozResponseArrayBuffer`in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}function On(e){let t={};e=(e.g&&En(e)>=2&&e.g.getAllResponseHeaders()||``).split(`\r
`);for(let r=0;r<e.length;r++){if(ue(e[r]))continue;var n=ht(e[r]);let i=n[0];if(n=n[1],typeof n!=`string`)continue;n=n.trim();let a=t[i]||[];t[i]=a,a.push(n)}_e(t,function(e){return e.join(`, `)})}e.ya=function(){return this.o},e.Ha=function(){return typeof this.l==`string`?this.l:String(this.l)};function O(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function kn(e){this.za=0,this.i=[],this.j=new it,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=O(`failFast`,!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=O(`baseRetryDelayMs`,5e3,e),this.Za=O(`retryDelaySeedMs`,1e4,e),this.Ta=O(`forwardChannelMaxRetries`,2,e),this.va=O(`forwardChannelRequestTimeoutMs`,2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M=``,this.h=new Mt(e&&e.concurrentRequestLimit),this.Ba=new fn,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}e=kn.prototype,e.ka=8,e.I=1,e.connect=function(e,t,n,r){C(0),this.W=e,this.H=t||{},n&&r!==void 0&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=A(this,null,this.W),k(this)};function An(e){if(Mn(e),e.I==3){var t=e.V++,n=Ht(e.J);if(w(n,`SID`,e.M),w(n,`RID`,t),w(n,`TYPE`,`terminate`),Fn(e,n),t=new gt(e,e.j,t),t.M=2,t.A=Kt(Ht(n)),n=!1,o.navigator&&o.navigator.sendBeacon)try{n=o.navigator.sendBeacon(t.A.toString(),``)}catch{}!n&&o.Image&&(new Image().src=t.A,n=!0),n||(t.g=j(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Tt(t)}Gn(e)}function jn(e){e.g&&=(zn(e),e.g.cancel(),null)}function Mn(e){jn(e),e.v&&=(o.clearTimeout(e.v),null),Vn(e),e.h.cancel(),e.m&&=(typeof e.m==`number`&&o.clearTimeout(e.m),null)}function k(e){if(!Nt(e.h)&&!e.m){e.m=!0;var t=e.Ea;ie||se(),ae||=(ie(),!0),oe.add(t,e),e.D=0}}function Nn(e,t){return Pt(e.h)>=e.h.j-(e.m?1:0)?!1:e.m?(e.i=t.G.concat(e.i),!0):e.I==1||e.I==2||e.D>=(e.Sa?0:e.Ta)?!1:(e.m=rt(l(e.Ea,e,t),Un(e,e.D)),e.D++,!0)}e.Ea=function(e){if(this.m)if(this.m=null,this.I==1){if(!e){this.V=Math.floor(Math.random()*1e5),e=this.V++;let i=new gt(this,this.j,e),a=this.o;if(this.U&&(a?(a=ve(a),be(a,this.U)):a=this.U),this.u!==null||this.R||(i.J=a,a=null),this.S)a:{for(var t=0,n=0;n<this.i.length;n++){b:{var r=this.i[n];if(`__data__`in r.map&&(r=r.map.__data__,typeof r==`string`)){r=r.length;break b}r=void 0}if(r===void 0)break;if(t+=r,t>4096){t=n;break a}if(t===4096||n===this.i.length-1){t=n+1;break a}}t=1e3}else t=1e3;t=In(this,i,t),n=Ht(this.J),w(n,`RID`,e),w(n,`CVER`,22),this.G&&w(n,`X-HTTP-Session-Id`,this.G),Fn(this,n),a&&(this.R?t=`headers=`+mt(vn(a))+`&`+t:this.u&&yn(n,this.u,a)),It(this.h,i),this.Ra&&w(n,`TYPE`,`init`),this.S?(w(n,`$req`,t),w(n,`SID`,`null`),i.U=!0,bt(i,n,null)):bt(i,n,t),this.I=2}}else this.I==3&&(e?Pn(this,e):this.i.length==0||Nt(this.h)||Pn(this))};function Pn(e,t){var n=t?t.l:e.V++;let r=Ht(e.J);w(r,`SID`,e.M),w(r,`RID`,n),w(r,`AID`,e.K),Fn(e,r),e.u&&e.o&&yn(r,e.u,e.o),n=new gt(e,e.j,n,e.D+1),e.u===null&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=In(e,n,1e3),n.H=Math.round(e.va*.5)+Math.round(e.va*.5*Math.random()),It(e.h,n),bt(n,r,t)}function Fn(e,t){e.H&&ge(e.H,function(e,n){w(t,n,e)}),e.l&&ge({},function(e,n){w(t,n,e)})}function In(e,t,n){n=Math.min(e.i.length,n);let r=e.l?l(e.l.Ka,e.l,e):null;a:{var i=e.i;let t=-1;for(;;){let e=[`count=`+n];t==-1?n>0?(t=i[0].g,e.push(`ofs=`+t)):t=0:e.push(`ofs=`+t);let c=!0;for(let l=0;l<n;l++){var a=i[l].g;let n=i[l].map;if(a-=t,a<0)t=Math.max(0,i[l].g-100),c=!1;else try{a=`req`+a+`_`||``;try{var o=n instanceof Map?n:Object.entries(n);for(let[t,n]of o){let r=n;s(n)&&(r=S(n)),e.push(a+t+`=`+encodeURIComponent(r))}}catch(t){throw e.push(a+`type=_badmap`),t}}catch{r&&r(n)}}if(c){o=e.join(`&`);break a}}o=void 0}return e=e.i.splice(0,n),t.G=e,o}function Ln(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;ie||se(),ae||=(ie(),!0),oe.add(t,e),e.A=0}}function Rn(e){return e.g||e.v||e.A>=3?!1:(e.Y++,e.v=rt(l(e.Da,e),Un(e,e.A)),e.A++,!0)}e.Da=function(){if(this.v=null,Bn(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var e=4*this.T;this.j.info(`BP detection timer enabled: `+e),this.B=rt(l(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info(`BP detection timeout reached.`),this.j.info(`Buffering proxy detected and switch to long-polling!`),this.F=!1,this.P=!0,C(10),jn(this),Bn(this))};function zn(e){e.B!=null&&(o.clearTimeout(e.B),e.B=null)}function Bn(e){e.g=new gt(e,e.j,`rpc`,e.Y),e.u===null&&(e.g.J=e.o),e.g.P=0;var t=Ht(e.na);w(t,`RID`,`rpc`),w(t,`SID`,e.M),w(t,`AID`,e.K),w(t,`CI`,e.F?`0`:`1`),!e.F&&e.ia&&w(t,`TO`,e.ia),w(t,`TYPE`,`xmlhttp`),Fn(e,t),e.u&&e.o&&yn(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=Kt(Ht(t)),n.u=null,n.R=!0,xt(n,e)}e.Va=function(){this.C!=null&&(this.C=null,jn(this),Rn(this),C(19))};function Vn(e){e.C!=null&&(o.clearTimeout(e.C),e.C=null)}function Hn(e,t){var n=null;if(e.g==t){Vn(e),zn(e),e.g=null;var r=2}else if(Ft(e.h,t))n=t.G,Lt(e.h,t),r=1;else return;if(e.I!=0){if(t.o)if(r==1){n=t.u?t.u.length:0,t=Date.now()-t.F;var i=e.D;r=Qe(),b(r,new nt(r,n)),k(e)}else Ln(e);else if(i=t.m,i==3||i==0&&t.X>0||!(r==1&&Nn(e,t)||r==2&&Rn(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),i){case 1:Wn(e,5);break;case 4:Wn(e,10);break;case 3:Wn(e,6);break;default:Wn(e,2)}}}function Un(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function Wn(e,t){if(e.j.info(`Error code `+t),t==2){var n=l(e.bb,e),r=e.Ua;let t=!r;r=new Vt(r||`//www.google.com/images/cleardot.gif`),o.location&&o.location.protocol==`http`||Ut(r,`https`),Kt(r),t?ln(r.toString(),n):un(r.toString(),n)}else C(2);e.I=0,e.l&&e.l.pa(t),Gn(e),Mn(e)}e.bb=function(e){e?(this.j.info(`Successfully pinged google.com`),C(2)):(this.j.info(`Failed to ping google.com`),C(1))};function Gn(e){if(e.I=0,e.ja=[],e.l){let t=Rt(e.h);(t.length!=0||e.i.length!=0)&&(m(e.ja,t),m(e.ja,e.i),e.h.i.length=0,p(e.i),e.i.length=0),e.l.oa()}}function A(e,t,n){var r=n instanceof Vt?Ht(n):new Vt(n);if(r.g!=``)t&&(r.g=t+`.`+r.g),Wt(r,r.u);else{var i=o.location;r=i.protocol,t=t?t+`.`+i.hostname:i.hostname,i=+i.port;let e=new Vt(null);r&&Ut(e,r),t&&(e.g=t),i&&Wt(e,i),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&w(r,n,t),w(r,`VER`,e.ka),Fn(e,r),r}function j(e,t,n){if(t&&!e.L)throw Error(`Can't create secondary domain capable XhrIo object.`);return t=e.Aa&&!e.ma?new D(new pn({ab:n})):new D(e.ma),t.Fa(e.L),t}e.isActive=function(){return!!this.l&&this.l.isActive(this)};function Kn(){}e=Kn.prototype,e.ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){};function qn(){}qn.prototype.g=function(e,t){return new Jn(e,t)};function Jn(e,t){y.call(this),this.g=new kn(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e[`X-Client-Protocol`]=`webchannel`:e={"X-Client-Protocol":`webchannel`}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e[`X-WebChannel-Content-Type`]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e[`X-WebChannel-Client-Profile`]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!ue(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t&&=t.httpSessionIdParam)&&!ue(t)&&(this.g.G=t,e=this.h,e!==null&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Zn(this)}d(Jn,y),Jn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Jn.prototype.close=function(){An(this.g)},Jn.prototype.o=function(e){var t=this.g;if(typeof e==`string`){var n={};n.__data__=e,e=n}else this.v&&(n={},n.__data__=S(e),e=n);t.i.push(new jt(t.Ya++,e)),t.I==3&&k(t)},Jn.prototype.N=function(){this.g.l=null,delete this.j,An(this.g),delete this.g,Jn.Z.N.call(this)};function Yn(e){Je.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){a:{for(let n in t){e=n;break a}e=void 0}(this.i=e)&&(e=this.i,t=t!==null&&e in t?t[e]:void 0),this.data=t}else this.data=e}d(Yn,Je);function Xn(){Ye.call(this),this.status=1}d(Xn,Ye);function Zn(e){this.g=e}d(Zn,Kn),Zn.prototype.ra=function(){b(this.g,`a`)},Zn.prototype.qa=function(e){b(this.g,new Yn(e))},Zn.prototype.pa=function(e){b(this.g,new Xn)},Zn.prototype.oa=function(){b(this.g,`b`)},qn.prototype.createWebChannel=qn.prototype.g,Jn.prototype.send=Jn.prototype.o,Jn.prototype.open=Jn.prototype.m,Jn.prototype.close=Jn.prototype.close,Ds=ys.createWebChannelTransport=function(){return new qn},Es=ys.getStatEventTarget=function(){return Qe()},Ts=ys.Event=Xe,ws=ys.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ut.NO_ERROR=0,ut.TIMEOUT=8,ut.HTTP_ERROR=6,Cs=ys.ErrorCode=ut,dt.COMPLETE=`complete`,Ss=ys.EventType=dt,Ke.EventType=qe,qe.OPEN=`a`,qe.CLOSE=`b`,qe.ERROR=`c`,qe.MESSAGE=`d`,y.prototype.listen=y.prototype.J,xs=ys.WebChannel=Ke,ys.FetchXmlHttpFactory=pn,D.prototype.listenOnce=D.prototype.K,D.prototype.getLastError=D.prototype.Ha,D.prototype.getLastErrorCode=D.prototype.ya,D.prototype.getStatus=D.prototype.ca,D.prototype.getResponseJson=D.prototype.La,D.prototype.getResponseText=D.prototype.la,D.prototype.send=D.prototype.ea,D.prototype.setWithCredentials=D.prototype.Fa,bs=ys.XhrIo=D}).apply(vs===void 0?typeof self<`u`?self:typeof window<`u`?window:{}:vs);var Os=`@firebase/firestore`,ks=`4.9.2`,M=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?`uid:`+this.uid:`anonymous-user`}isEqual(e){return e.uid===this.uid}};M.UNAUTHENTICATED=new M(null),M.GOOGLE_CREDENTIALS=new M(`google-credentials-uid`),M.FIRST_PARTY=new M(`first-party-uid`),M.MOCK_USER=new M(`mock-user`);
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var As=`12.3.0`,js=new qe(`@firebase/firestore`);function Ms(){return js.logLevel}function N(e,...t){if(js.logLevel<=S.DEBUG){let n=t.map(Fs);js.debug(`Firestore (${As}): ${e}`,...n)}}function Ns(e,...t){if(js.logLevel<=S.ERROR){let n=t.map(Fs);js.error(`Firestore (${As}): ${e}`,...n)}}function Ps(e,...t){if(js.logLevel<=S.WARN){let n=t.map(Fs);js.warn(`Firestore (${As}): ${e}`,...n)}}function Fs(e){if(typeof e==`string`)return e;try{
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
return function(e){return JSON.stringify(e)}(e)}catch{return e}}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function P(e,t,n){let r=`Unexpected state`;typeof t==`string`?r=t:n=t,Is(e,r,n)}function Is(e,t,n){let r=`FIRESTORE (${As}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(n!==void 0)try{r+=` CONTEXT: `+JSON.stringify(n)}catch{r+=` CONTEXT: `+n}throw Ns(r),Error(r)}function F(e,t,n,r){let i=`Unexpected state`;typeof n==`string`?i=n:r=n,e||Is(t,i,r)}function I(e,t){return e}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var L={OK:`ok`,CANCELLED:`cancelled`,UNKNOWN:`unknown`,INVALID_ARGUMENT:`invalid-argument`,DEADLINE_EXCEEDED:`deadline-exceeded`,NOT_FOUND:`not-found`,ALREADY_EXISTS:`already-exists`,PERMISSION_DENIED:`permission-denied`,UNAUTHENTICATED:`unauthenticated`,RESOURCE_EXHAUSTED:`resource-exhausted`,FAILED_PRECONDITION:`failed-precondition`,ABORTED:`aborted`,OUT_OF_RANGE:`out-of-range`,UNIMPLEMENTED:`unimplemented`,INTERNAL:`internal`,UNAVAILABLE:`unavailable`,DATA_LOSS:`data-loss`},R=class extends ye{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}},Ls=class{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}},Rs=class{constructor(e,t){this.user=t,this.type=`OAuth`,this.headers=new Map,this.headers.set(`Authorization`,`Bearer ${e}`)}},zs=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(M.UNAUTHENTICATED)))}shutdown(){}},Bs=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}},Vs=class{constructor(e){this.t=e,this.currentUser=M.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i,r=e=>this.i===n?Promise.resolve():(n=this.i,t(e)),i=new Ls;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ls,e.enqueueRetryable((()=>r(this.currentUser)))};let a=()=>{let t=i;e.enqueueRetryable((async()=>{await t.promise,await r(this.currentUser)}))},o=e=>{N(`FirebaseAuthCredentialsProvider`,`Auth detected`),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((e=>o(e))),setTimeout((()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?o(e):(N(`FirebaseAuthCredentialsProvider`,`Auth not yet detected`),i.resolve(),i=new Ls)}}),0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i===e?t?(F(typeof t.accessToken==`string`,31837,{l:t}),new Rs(t.accessToken,this.currentUser)):null:(N(`FirebaseAuthCredentialsProvider`,`getToken aborted due to token change.`),this.getToken()))):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return F(e===null||typeof e==`string`,2055,{h:e}),new M(e)}},Hs=class{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type=`FirstParty`,this.user=M.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set(`X-Goog-AuthUser`,this.P);let e=this.R();return e&&this.A.set(`Authorization`,e),this.T&&this.A.set(`X-Goog-Iam-Authorization-Token`,this.T),this.A}},Us=class{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Hs(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(M.FIRST_PARTY)))}shutdown(){}invalidateToken(){}},Ws=class{constructor(e){this.value=e,this.type=`AppCheck`,this.headers=new Map,e&&e.length>0&&this.headers.set(`x-firebase-appcheck`,this.value)}},Gs=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,T(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);let n=e=>{e.error!=null&&N(`FirebaseAppCheckTokenProvider`,`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.m;return this.m=e.token,N(`FirebaseAppCheckTokenProvider`,`Received ${n?`new`:`existing`} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};let r=e=>{N(`FirebaseAppCheckTokenProvider`,`AppCheck detected`),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((e=>r(e))),setTimeout((()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?r(e):N(`FirebaseAppCheckTokenProvider`,`AppCheck not yet detected`)}}),0)}getToken(){if(this.p)return Promise.resolve(new Ws(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(F(typeof e.token==`string`,44558,{tokenResult:e}),this.m=e.token,new Ws(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Ks(e){let t=typeof self<`u`&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues==`function`)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var qs=class{static newId(){let e=``;for(;e.length<20;){let t=Ks(40);for(let n=0;n<t.length;++n)e.length<20&&t[n]<248&&(e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(t[n]%62))}return e}};function z(e,t){return e<t?-1:e>t?1:0}function Js(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.charAt(r),i=t.charAt(r);if(n!==i)return Zs(n)===Zs(i)?z(n,i):Zs(n)?1:-1}return z(e.length,t.length)}var Ys=55296,Xs=57343;function Zs(e){let t=e.charCodeAt(0);return t>=Ys&&t<=Xs}function Qs(e,t,n){return e.length===t.length&&e.every(((e,r)=>n(e,t[r])))}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $s=`__name__`,ec=class e{constructor(e,t,n){t===void 0?t=0:t>e.length&&P(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&P(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(t){return e.comparator(this,t)===0}child(t){let n=this.segments.slice(this.offset,this.limit());return t instanceof e?t.forEach((e=>{n.push(e)})):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){let r=Math.min(t.length,n.length);for(let i=0;i<r;i++){let r=e.compareSegments(t.get(i),n.get(i));if(r!==0)return r}return z(t.length,n.length)}static compareSegments(t,n){let r=e.isNumericId(t),i=e.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?e.extractNumericId(t).compare(e.extractNumericId(n)):Js(t,n)}static isNumericId(e){return e.startsWith(`__id`)&&e.endsWith(`__`)}static extractNumericId(e){return gs.fromString(e.substring(4,e.length-2))}},B=class e extends ec{construct(t,n,r){return new e(t,n,r)}canonicalString(){return this.toArray().join(`/`)}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join(`/`)}static fromString(...t){let n=[];for(let e of t){if(e.indexOf(`//`)>=0)throw new R(L.INVALID_ARGUMENT,`Invalid segment (${e}). Paths must not contain // in them.`);n.push(...e.split(`/`).filter((e=>e.length>0)))}return new e(n)}static emptyPath(){return new e([])}},tc=/^[_a-zA-Z][_a-zA-Z0-9]*$/,nc=class e extends ec{construct(t,n,r){return new e(t,n,r)}static isValidIdentifier(e){return tc.test(e)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,`\\\\`).replace(/`/g,"\\`"),e.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(`.`)}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$s}static keyField(){return new e([$s])}static fromServerFormat(t){let n=[],r=``,i=0,a=()=>{if(r.length===0)throw new R(L.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=``},o=!1;for(;i<t.length;){let e=t[i];if(e===`\\`){if(i+1===t.length)throw new R(L.INVALID_ARGUMENT,`Path has trailing escape character: `+t);let e=t[i+1];if(e!==`\\`&&e!==`.`&&e!=="`")throw new R(L.INVALID_ARGUMENT,`Path has invalid escape sequence: `+t);r+=e,i+=2}else e==="`"?(o=!o,i++):e!==`.`||o?(r+=e,i++):(a(),i++)}if(a(),o)throw new R(L.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new e(n)}static emptyPath(){return new e([])}},V=class e{constructor(e){this.path=e}static fromPath(t){return new e(B.fromString(t))}static fromName(t){return new e(B.fromString(t).popFirst(5))}static empty(){return new e(B.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&B.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return B.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(t){return new e(new B(t.slice()))}};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function rc(e,t,n){if(!n)throw new R(L.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function ic(e,t,n,r){if(!0===t&&!0===r)throw new R(L.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ac(e){if(!V.isDocumentKey(e))throw new R(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function oc(e){if(V.isDocumentKey(e))throw new R(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function sc(e){return typeof e==`object`&&!!e&&(Object.getPrototypeOf(e)===Object.prototype||Object.getPrototypeOf(e)===null)}function cc(e){if(e===void 0)return`undefined`;if(e===null)return`null`;if(typeof e==`string`)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e==`number`||typeof e==`boolean`)return``+e;if(typeof e==`object`){if(e instanceof Array)return`an array`;{let t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:`an object`}}return typeof e==`function`?`a function`:P(12329,{type:typeof e})}function lc(e,t){if(`_delegate`in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new R(L.INVALID_ARGUMENT,`Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`);{let n=cc(e);throw new R(L.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function uc(e,t){if(t<=0)throw new R(L.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function H(e,t){let n={typeString:e};return t&&(n.value=t),n}function dc(e,t){if(!sc(e))throw new R(L.INVALID_ARGUMENT,`JSON must be an object`);let n;for(let r in t)if(t[r]){let i=t[r].typeString,a=`value`in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}let o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(a!==void 0&&o!==a.value){n=`Expected '${r}' field to equal '${a.value}'`;break}}if(n)throw new R(L.INVALID_ARGUMENT,n);return!0}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var fc=-62135596800,pc=1e6,U=class e{static now(){return e.fromMillis(Date.now())}static fromDate(t){return e.fromMillis(t.getTime())}static fromMillis(t){let n=Math.floor(t/1e3),r=Math.floor((t-1e3*n)*pc);return new e(n,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new R(L.INVALID_ARGUMENT,`Timestamp nanoseconds out of range: `+t);if(e<fc||e>=253402300800)throw new R(L.INVALID_ARGUMENT,`Timestamp seconds out of range: `+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pc}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return`Timestamp(seconds=`+this.seconds+`, nanoseconds=`+this.nanoseconds+`)`}toJSON(){return{type:e._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(dc(t,e._jsonSchema))return new e(t.seconds,t.nanoseconds)}valueOf(){let e=this.seconds-fc;return String(e).padStart(12,`0`)+`.`+String(this.nanoseconds).padStart(9,`0`)}};U._jsonSchemaVersion=`firestore/timestamp/1.0`,U._jsonSchema={type:H(`string`,U._jsonSchemaVersion),seconds:H(`number`),nanoseconds:H(`number`)};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var W=class e{static fromTimestamp(t){return new e(t)}static min(){return new e(new U(0,0))}static max(){return new e(new U(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return`SnapshotVersion(`+this.timestamp.toString()+`)`}toTimestamp(){return this.timestamp}},mc=-1,hc=class{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}};hc.UNKNOWN_ID=-1;function gc(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=W.fromTimestamp(r===1e9?new U(n+1,0):new U(n,r));return new vc(i,V.empty(),t)}function _c(e){return new vc(e.readTime,e.key,mc)}var vc=class e{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new e(W.min(),V.empty(),mc)}static max(){return new e(W.max(),V.empty(),mc)}};function yc(e,t){let n=e.readTime.compareTo(t.readTime);return n===0?(n=V.comparator(e.documentKey,t.documentKey),n===0?z(e.largestBatchId,t.largestBatchId):n):n}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bc=`The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.`,xc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Sc(e){if(e.code!==L.FAILED_PRECONDITION||e.message!==bc)throw e;N(`LocalStore`,`Unexpectedly lost primary lease`)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var G=class e{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(t,n){return this.callbackAttached&&P(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new e(((e,r)=>{this.nextCallback=n=>{this.wrapSuccess(t,n).next(e,r)},this.catchCallback=t=>{this.wrapFailure(n,t).next(e,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(t){try{let n=t();return n instanceof e?n:e.resolve(n)}catch(t){return e.reject(t)}}wrapSuccess(t,n){return t?this.wrapUserFunction((()=>t(n))):e.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction((()=>t(n))):e.reject(n)}static resolve(t){return new e(((e,n)=>{e(t)}))}static reject(t){return new e(((e,n)=>{n(t)}))}static waitFor(t){return new e(((e,n)=>{let r=0,i=0,a=!1;t.forEach((t=>{++r,t.next((()=>{++i,a&&i===r&&e()}),(e=>n(e)))})),a=!0,i===r&&e()}))}static or(t){let n=e.resolve(!1);for(let r of t)n=n.next((t=>t?e.resolve(t):r()));return n}static forEach(e,t){let n=[];return e.forEach(((e,r)=>{n.push(t.call(this,e,r))})),this.waitFor(n)}static mapArray(t,n){return new e(((e,r)=>{let i=t.length,a=Array(i),o=0;for(let s=0;s<i;s++){let c=s;n(t[c]).next((t=>{a[c]=t,++o,o===i&&e(a)}),(e=>r(e)))}}))}static doWhile(t,n){return new e(((e,r)=>{let i=()=>{!0===t()?n().next((()=>{i()}),r):e()};i()}))}};function Cc(e){let t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(`.`).slice(0,2).join(`.`):`-1`;return Number(n)}function wc(e){return e.name===`IndexedDbTransactionError`}
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Tc=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}};Tc.ce=-1;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ec=-1;function Dc(e){return e==null}function Oc(e){return e===0&&1/e==-1/0}function kc(e){return typeof e==`number`&&Number.isInteger(e)&&!Oc(e)&&e<=2**53-1&&e>=-(2**53-1)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ac=``;function jc(e){let t=``;for(let n=0;n<e.length;n++)t.length>0&&(t=Nc(t)),t=Mc(e.get(n),t);return Nc(t)}function Mc(e,t){let n=t,r=e.length;for(let t=0;t<r;t++){let r=e.charAt(t);switch(r){case`\0`:n+=``;break;case Ac:n+=``;break;default:n+=r}}return n}function Nc(e){return e+Ac+``}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Pc(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Fc(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Ic(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var K=class e{constructor(e,t){this.comparator=e,this.root=t||Rc.EMPTY}insert(t,n){return new e(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,Rc.BLACK,null,null))}remove(t){return new e(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Rc.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(r===0)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){let e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(`, `)}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Lc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Lc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Lc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Lc(this.root,e,this.comparator,!0)}},Lc=class{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Rc=class e{constructor(t,n,r,i,a){this.key=t,this.value=n,this.color=r??e.RED,this.left=i??e.EMPTY,this.right=a??e.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,i,a){return new e(t??this.key,n??this.value,r??this.color,i??this.left,a??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return e.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,i=this;if(n(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(t,i.key)===0){if(i.right.isEmpty())return e.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let t=this.copy(null,null,e.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){let t=this.copy(null,null,e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return 2**this.check()<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw P(43730,{key:this.key,value:this.value});if(this.right.isRed())throw P(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw P(27949);return e+(this.isRed()?0:1)}};Rc.EMPTY=null,Rc.RED=!0,Rc.BLACK=!1,Rc.EMPTY=new class{constructor(){this.size=0}get key(){throw P(57766)}get value(){throw P(16141)}get color(){throw P(16727)}get left(){throw P(29726)}get right(){throw P(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new Rc(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var q=class e{constructor(e){this.comparator=e,this.data=new K(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=t===void 0?this.data.getIterator():this.data.getIteratorFrom(t);n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new zc(this.data.getIterator())}getIteratorFrom(e){return new zc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(t){if(!(t instanceof e)||this.size!==t.size)return!1;let n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){let e=n.getNext().key,t=r.getNext().key;if(this.comparator(e,t)!==0)return!1}return!0}toArray(){let e=[];return this.forEach((t=>{e.push(t)})),e}toString(){let e=[];return this.forEach((t=>e.push(t))),`SortedSet(`+e.toString()+`)`}copy(t){let n=new e(this.comparator);return n.data=t,n}},zc=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}},Bc=class e{constructor(e){this.fields=e,e.sort(nc.comparator)}static empty(){return new e([])}unionWith(t){let n=new q(nc.comparator);for(let e of this.fields)n=n.add(e);for(let e of t)n=n.add(e);return new e(n.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Qs(this.fields,e.fields,((e,t)=>e.isEqual(t)))}},Vc=class extends Error{constructor(){super(...arguments),this.name=`Base64DecodeError`}},Hc=class e{constructor(e){this.binaryString=e}static fromBase64String(t){let n=function(e){try{return atob(e)}catch(e){throw typeof DOMException<`u`&&e instanceof DOMException?new Vc(`Invalid base64 string: `+e):e}}(t);return new e(n)}static fromUint8Array(t){let n=function(e){let t=``;for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(t);return new e(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Hc.EMPTY_BYTE_STRING=new Hc(``);var Uc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wc(e){if(F(!!e,39018),typeof e==`string`){let t=0,n=Uc.exec(e);if(F(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+`000000000`).substr(0,9),t=Number(e)}let r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:J(e.seconds),nanos:J(e.nanos)}}function J(e){return typeof e==`number`?e:typeof e==`string`?Number(e):0}function Gc(e){return typeof e==`string`?Hc.fromBase64String(e):Hc.fromUint8Array(e)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Kc=`server_timestamp`,qc=`__type__`,Jc=`__previous_value__`,Yc=`__local_write_time__`;function Xc(e){return(e?.mapValue?.fields||{})[qc]?.stringValue===Kc}function Zc(e){let t=e.mapValue.fields[Jc];return Xc(t)?Zc(t):t}function Qc(e){let t=Wc(e.mapValue.fields[Yc].timestampValue);return new U(t.seconds,t.nanos)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $c=class{constructor(e,t,n,r,i,a,o,s,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=o,this.longPollingOptions=s,this.useFetchStreams=c,this.isUsingEmulator=l}},el=`(default)`,tl=class e{constructor(e,t){this.projectId=e,this.database=t||el}static empty(){return new e(``,``)}get isDefaultDatabase(){return this.database===el}isEqual(t){return t instanceof e&&t.projectId===this.projectId&&t.database===this.database}},nl=`__type__`,rl=`__max__`,il={mapValue:{fields:{__type__:{stringValue:rl}}}},al=`__vector__`,ol=`value`;function sl(e){return`nullValue`in e?0:`booleanValue`in e?1:`integerValue`in e||`doubleValue`in e?2:`timestampValue`in e?3:`stringValue`in e?5:`bytesValue`in e?6:`referenceValue`in e?7:`geoPointValue`in e?8:`arrayValue`in e?9:`mapValue`in e?Xc(e)?4:wl(e)?9007199254740991:Sl(e)?10:11:P(28295,{value:e})}function cl(e,t){if(e===t)return!0;let n=sl(e);if(n!==sl(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Qc(e).isEqual(Qc(t));case 3:return function(e,t){if(typeof e.timestampValue==`string`&&typeof t.timestampValue==`string`&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=Wc(e.timestampValue),r=Wc(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Gc(e.bytesValue).isEqual(Gc(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return J(e.geoPointValue.latitude)===J(t.geoPointValue.latitude)&&J(e.geoPointValue.longitude)===J(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if(`integerValue`in e&&`integerValue`in t)return J(e.integerValue)===J(t.integerValue);if(`doubleValue`in e&&`doubleValue`in t){let n=J(e.doubleValue),r=J(t.doubleValue);return n===r?Oc(n)===Oc(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Qs(e.arrayValue.values||[],t.arrayValue.values||[],cl);case 10:case 11:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(Pc(n)!==Pc(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(r[e]===void 0||!cl(n[e],r[e])))return!1;return!0}(e,t);default:return P(52216,{left:e})}}function ll(e,t){return(e.values||[]).find((e=>cl(e,t)))!==void 0}function ul(e,t){if(e===t)return 0;let n=sl(e),r=sl(t);if(n!==r)return z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return z(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=J(e.integerValue||e.doubleValue),r=J(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return dl(e.timestampValue,t.timestampValue);case 4:return dl(Qc(e),Qc(t));case 5:return Js(e.stringValue,t.stringValue);case 6:return function(e,t){let n=Gc(e),r=Gc(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split(`/`),r=t.split(`/`);for(let e=0;e<n.length&&e<r.length;e++){let t=z(n[e],r[e]);if(t!==0)return t}return z(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=z(J(e.latitude),J(t.latitude));return n===0?z(J(e.longitude),J(t.longitude)):n}(e.geoPointValue,t.geoPointValue);case 9:return fl(e.arrayValue,t.arrayValue);case 10:return function(e,t){let n=e.fields||{},r=t.fields||{},i=n[ol]?.arrayValue,a=r[ol]?.arrayValue,o=z(i?.values?.length||0,a?.values?.length||0);return o===0?fl(i,a):o}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===il.mapValue&&t===il.mapValue)return 0;if(e===il.mapValue)return 1;if(t===il.mapValue)return-1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},a=Object.keys(i);r.sort(),a.sort();for(let e=0;e<r.length&&e<a.length;++e){let t=Js(r[e],a[e]);if(t!==0)return t;let o=ul(n[r[e]],i[a[e]]);if(o!==0)return o}return z(r.length,a.length)}(e.mapValue,t.mapValue);default:throw P(23264,{he:n})}}function dl(e,t){if(typeof e==`string`&&typeof t==`string`&&e.length===t.length)return z(e,t);let n=Wc(e),r=Wc(t),i=z(n.seconds,r.seconds);return i===0?z(n.nanos,r.nanos):i}function fl(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=ul(n[e],r[e]);if(t)return t}return z(n.length,r.length)}function pl(e){return ml(e)}function ml(e){return`nullValue`in e?`null`:`booleanValue`in e?``+e.booleanValue:`integerValue`in e?``+e.integerValue:`doubleValue`in e?``+e.doubleValue:`timestampValue`in e?function(e){let t=Wc(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):`stringValue`in e?e.stringValue:`bytesValue`in e?function(e){return Gc(e).toBase64()}(e.bytesValue):`referenceValue`in e?function(e){return V.fromName(e).toString()}(e.referenceValue):`geoPointValue`in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):`arrayValue`in e?function(e){let t=`[`,n=!0;for(let r of e.values||[])n?n=!1:t+=`,`,t+=ml(r);return t+`]`}(e.arrayValue):`mapValue`in e?function(e){let t=Object.keys(e.fields||{}).sort(),n=`{`,r=!0;for(let i of t)r?r=!1:n+=`,`,n+=`${i}:${ml(e.fields[i])}`;return n+`}`}(e.mapValue):P(61005,{value:e})}function hl(e){switch(sl(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let t=Zc(e);return t?16+hl(t):16;case 5:return 2*e.stringValue.length;case 6:return Gc(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce(((e,t)=>e+hl(t)),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return Fc(e.fields,((e,n)=>{t+=e.length+hl(n)})),t}(e.mapValue);default:throw P(13486,{value:e})}}function gl(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function _l(e){return!!e&&`integerValue`in e}function vl(e){return!!e&&`arrayValue`in e}function yl(e){return!!e&&`nullValue`in e}function bl(e){return!!e&&`doubleValue`in e&&isNaN(Number(e.doubleValue))}function xl(e){return!!e&&`mapValue`in e}function Sl(e){return(e?.mapValue?.fields||{})[nl]?.stringValue===al}function Cl(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&typeof e.timestampValue==`object`)return{timestampValue:{...e.timestampValue}};if(e.mapValue){let t={mapValue:{fields:{}}};return Fc(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=Cl(n))),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Cl(e.arrayValue.values[n]);return t}return{...e}}function wl(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===rl}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Tl=class e{constructor(e){this.value=e}static empty(){return new e({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!xl(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cl(t)}setAll(e){let t=nc.emptyPath(),n={},r=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=Cl(e):r.push(i.lastSegment())}));let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());xl(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return cl(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];xl(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Fc(t,((t,n)=>e[t]=n));for(let t of n)delete e[t]}clone(){return new e(Cl(this.value))}};function El(e){let t=[];return Fc(e.fields,((e,n)=>{let r=new nc([e]);if(xl(n)){let e=El(n.mapValue).fields;if(e.length===0)t.push(r);else for(let n of e)t.push(r.child(n))}else t.push(r)})),new Bc(t)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Dl=class e{constructor(e,t,n,r,i,a,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=a,this.documentState=o}static newInvalidDocument(t){return new e(t,0,W.min(),W.min(),W.min(),Tl.empty(),0)}static newFoundDocument(t,n,r,i){return new e(t,1,n,W.min(),r,i,0)}static newNoDocument(t,n){return new e(t,2,n,W.min(),W.min(),Tl.empty(),0)}static newUnknownDocument(t,n){return new e(t,3,n,W.min(),W.min(),Tl.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Tl.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Tl.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof e&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new e(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}},Ol=class{constructor(e,t){this.position=e,this.inclusive=t}};function kl(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let a=t[i],o=e.position[i];if(r=a.field.isKeyField()?V.comparator(V.fromName(o.referenceValue),n.key):ul(o,n.data.field(a.field)),a.dir===`desc`&&(r*=-1),r!==0)break}return r}function Al(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!cl(e.position[n],t.position[n]))return!1;return!0}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var jl=class{constructor(e,t=`asc`){this.field=e,this.dir=t}};function Ml(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Nl=class{},Y=class e extends Nl{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(t,n,r){return t.isKeyField()?n===`in`||n===`not-in`?this.createKeyFieldInFilter(t,n,r):new Vl(t,n,r):n===`array-contains`?new Gl(t,r):n===`in`?new Kl(t,r):n===`not-in`?new ql(t,r):n===`array-contains-any`?new Jl(t,r):new e(t,n,r)}static createKeyFieldInFilter(e,t,n){return t===`in`?new Hl(e,n):new Ul(e,n)}matches(e){let t=e.data.field(this.field);return this.op===`!=`?t!==null&&t.nullValue===void 0&&this.matchesComparison(ul(t,this.value)):t!==null&&sl(this.value)===sl(t)&&this.matchesComparison(ul(t,this.value))}matchesComparison(e){switch(this.op){case`<`:return e<0;case`<=`:return e<=0;case`==`:return e===0;case`!=`:return e!==0;case`>`:return e>0;case`>=`:return e>=0;default:return P(47266,{operator:this.op})}}isInequality(){return[`<`,`<=`,`>`,`>=`,`!=`,`not-in`].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Pl=class e extends Nl{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(t,n){return new e(t,n)}matches(e){return Fl(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}};function Fl(e){return e.op===`and`}function Il(e){return Ll(e)&&Fl(e)}function Ll(e){for(let t of e.filters)if(t instanceof Pl)return!1;return!0}function Rl(e){if(e instanceof Y)return e.field.canonicalString()+e.op.toString()+pl(e.value);if(Il(e))return e.filters.map((e=>Rl(e))).join(`,`);{let t=e.filters.map((e=>Rl(e))).join(`,`);return`${e.op}(${t})`}}function zl(e,t){return e instanceof Y?function(e,t){return t instanceof Y&&e.op===t.op&&e.field.isEqual(t.field)&&cl(e.value,t.value)}(e,t):e instanceof Pl?function(e,t){return t instanceof Pl&&e.op===t.op&&e.filters.length===t.filters.length?e.filters.reduce(((e,n,r)=>e&&zl(n,t.filters[r])),!0):!1}(e,t):void P(19439)}function Bl(e){return e instanceof Y?function(e){return`${e.field.canonicalString()} ${e.op} ${pl(e.value)}`}(e):e instanceof Pl?function(e){return e.op.toString()+` {`+e.getFilters().map(Bl).join(` ,`)+`}`}(e):`Filter`}var Vl=class extends Y{constructor(e,t,n){super(e,t,n),this.key=V.fromName(n.referenceValue)}matches(e){let t=V.comparator(e.key,this.key);return this.matchesComparison(t)}},Hl=class extends Y{constructor(e,t){super(e,`in`,t),this.keys=Wl(`in`,t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}},Ul=class extends Y{constructor(e,t){super(e,`not-in`,t),this.keys=Wl(`not-in`,t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}};function Wl(e,t){return(t.arrayValue?.values||[]).map((e=>V.fromName(e.referenceValue)))}var Gl=class extends Y{constructor(e,t){super(e,`array-contains`,t)}matches(e){let t=e.data.field(this.field);return vl(t)&&ll(t.arrayValue,this.value)}},Kl=class extends Y{constructor(e,t){super(e,`in`,t)}matches(e){let t=e.data.field(this.field);return t!==null&&ll(this.value.arrayValue,t)}},ql=class extends Y{constructor(e,t){super(e,`not-in`,t)}matches(e){if(ll(this.value.arrayValue,{nullValue:`NULL_VALUE`}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ll(this.value.arrayValue,t)}},Jl=class extends Y{constructor(e,t){super(e,`array-contains-any`,t)}matches(e){let t=e.data.field(this.field);return!(!vl(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>ll(this.value.arrayValue,e)))}},Yl=class{constructor(e,t=null,n=[],r=[],i=null,a=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=a,this.endAt=o,this.Te=null}};function Xl(e,t=null,n=[],r=[],i=null,a=null,o=null){return new Yl(e,t,n,r,i,a,o)}function Zl(e){let t=I(e);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+=`|cg:`+t.collectionGroup),e+=`|f:`,e+=t.filters.map((e=>Rl(e))).join(`,`),e+=`|ob:`,e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(`,`),Dc(t.limit)||(e+=`|l:`,e+=t.limit),t.startAt&&(e+=`|lb:`,e+=t.startAt.inclusive?`b:`:`a:`,e+=t.startAt.position.map((e=>pl(e))).join(`,`)),t.endAt&&(e+=`|ub:`,e+=t.endAt.inclusive?`a:`:`b:`,e+=t.endAt.position.map((e=>pl(e))).join(`,`)),t.Te=e}return t.Te}function Ql(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Ml(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!zl(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Al(e.startAt,t.startAt)&&Al(e.endAt,t.endAt)}function $l(e){return V.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var eu=class{constructor(e,t=null,n=[],r=[],i=null,a=`F`,o=null,s=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=a,this.startAt=o,this.endAt=s,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}};function tu(e,t,n,r,i,a,o,s){return new eu(e,t,n,r,i,a,o,s)}function nu(e){return new eu(e)}function ru(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function iu(e){return e.collectionGroup!==null}function au(e){let t=I(e);if(t.Ie===null){t.Ie=[];let e=new Set;for(let n of t.explicitOrderBy)t.Ie.push(n),e.add(n.field.canonicalString());let n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:`asc`;(function(e){let t=new q(nc.comparator);return e.filters.forEach((e=>{e.getFlattenedFilters().forEach((e=>{e.isInequality()&&(t=t.add(e.field))}))})),t})(t).forEach((r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new jl(r,n))})),e.has(nc.keyField().canonicalString())||t.Ie.push(new jl(nc.keyField(),n))}return t.Ie}function ou(e){let t=I(e);return t.Ee||=su(t,au(e)),t.Ee}function su(e,t){if(e.limitType===`F`)return Xl(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((e=>{let t=e.dir===`desc`?`asc`:`desc`;return new jl(e.field,t)}));let n=e.endAt?new Ol(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Ol(e.startAt.position,e.startAt.inclusive):null;return Xl(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function cu(e,t){let n=e.filters.concat([t]);return new eu(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function lu(e,t,n){return new eu(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function uu(e,t){return Ql(ou(e),ou(t))&&e.limitType===t.limitType}function du(e){return`${Zl(ou(e))}|lt:${e.limitType}`}function fu(e){return`Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=` collectionGroup=`+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>Bl(e))).join(`, `)}]`),Dc(e.limit)||(t+=`, limit: `+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(`, `)}]`),e.startAt&&(t+=`, startAt: `,t+=e.startAt.inclusive?`b:`:`a:`,t+=e.startAt.position.map((e=>pl(e))).join(`,`)),e.endAt&&(t+=`, endAt: `,t+=e.endAt.inclusive?`a:`:`b:`,t+=e.endAt.position.map((e=>pl(e))).join(`,`)),`Target(${t})`}(ou(e))}; limitType=${e.limitType})`}function pu(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return e.collectionGroup===null?V.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n):t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n)}(e,t)&&function(e,t){for(let n of au(e))if(!n.field.isKeyField()&&t.data.field(n.field)===null)return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){let r=kl(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,au(e),t)||e.endAt&&!function(e,t,n){let r=kl(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,au(e),t))}(e,t)}function mu(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function hu(e){return(t,n)=>{let r=!1;for(let i of au(e)){let e=gu(i,t,n);if(e!==0)return e;r||=i.field.isKeyField()}return 0}}function gu(e,t,n){let r=e.field.isKeyField()?V.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return r!==null&&i!==null?ul(r,i):P(42886)}(e.field,t,n);switch(e.dir){case`asc`:return r;case`desc`:return-1*r;default:return P(19790,{direction:e.dir})}}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _u=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return n.length===1?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Fc(this.inner,((t,n)=>{for(let[t,r]of n)e(t,r)}))}isEmpty(){return Ic(this.inner)}size(){return this.innerSize}},vu=new K(V.comparator);function yu(){return vu}var bu=new K(V.comparator);function xu(...e){let t=bu;for(let n of e)t=t.insert(n.key,n);return t}function Su(e){let t=bu;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Cu(){return Tu()}function wu(){return Tu()}function Tu(){return new _u((e=>e.toString()),((e,t)=>e.isEqual(t)))}var Eu=new K(V.comparator),Du=new q(V.comparator);function X(...e){let t=Du;for(let n of e)t=t.add(n);return t}var Ou=new q(z);function ku(){return Ou}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Au(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:`NaN`};if(t===1/0)return{doubleValue:`Infinity`};if(t===-1/0)return{doubleValue:`-Infinity`}}return{doubleValue:Oc(t)?`-0`:t}}function ju(e){return{integerValue:``+e}}function Mu(e,t){return kc(t)?ju(t):Au(e,t)}
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Nu=class{constructor(){this._=void 0}};function Pu(e,t,n){return e instanceof Lu?function(e,t){let n={fields:{[qc]:{stringValue:Kc},[Yc]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Xc(t)&&(t=Zc(t)),t&&(n.fields[Jc]=t),{mapValue:n}}(n,t):e instanceof Ru?zu(e,t):e instanceof Bu?Vu(e,t):function(e,t){let n=Iu(e,t),r=Uu(n)+Uu(e.Ae);return _l(n)&&_l(e.Ae)?ju(r):Au(e.serializer,r)}(e,t)}function Fu(e,t,n){return e instanceof Ru?zu(e,t):e instanceof Bu?Vu(e,t):n}function Iu(e,t){return e instanceof Hu?function(e){return _l(e)||function(e){return!!e&&`doubleValue`in e}(e)}(t)?t:{integerValue:0}:null}var Lu=class extends Nu{},Ru=class extends Nu{constructor(e){super(),this.elements=e}};function zu(e,t){let n=Wu(t);for(let t of e.elements)n.some((e=>cl(e,t)))||n.push(t);return{arrayValue:{values:n}}}var Bu=class extends Nu{constructor(e){super(),this.elements=e}};function Vu(e,t){let n=Wu(t);for(let t of e.elements)n=n.filter((e=>!cl(e,t)));return{arrayValue:{values:n}}}var Hu=class extends Nu{constructor(e,t){super(),this.serializer=e,this.Ae=t}};function Uu(e){return J(e.integerValue||e.doubleValue)}function Wu(e){return vl(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Gu=class{constructor(e,t){this.field=e,this.transform=t}};function Ku(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Ru&&t instanceof Ru||e instanceof Bu&&t instanceof Bu?Qs(e.elements,t.elements,cl):e instanceof Hu&&t instanceof Hu?cl(e.Ae,t.Ae):e instanceof Lu&&t instanceof Lu}(e.transform,t.transform)}var qu=class{constructor(e,t){this.version=e,this.transformResults=t}},Ju=class e{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new e}static exists(t){return new e(void 0,t)}static updateTime(t){return new e(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Yu(e,t){return e.updateTime===void 0?e.exists===void 0||e.exists===t.isFoundDocument():t.isFoundDocument()&&t.version.isEqual(e.updateTime)}var Xu=class{};function Zu(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new sd(e.key,Ju.none()):new nd(e.key,e.data,Ju.none());{let n=e.data,r=Tl.empty(),i=new q(nc.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);t===null&&e.length>1&&(e=e.popLast(),t=n.field(e)),t===null?r.delete(e):r.set(e,t),i=i.add(e)}return new rd(e.key,r,new Bc(i.toArray()),Ju.none())}}function Qu(e,t,n){e instanceof nd?function(e,t,n){let r=e.value.clone(),i=ad(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof rd?function(e,t,n){if(!Yu(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=ad(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(id(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function $u(e,t,n,r){return e instanceof nd?function(e,t,n,r){if(!Yu(e.precondition,t))return n;let i=e.value.clone(),a=od(e.fieldTransforms,r,t);return i.setAll(a),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof rd?function(e,t,n,r){if(!Yu(e.precondition,t))return n;let i=od(e.fieldTransforms,r,t),a=t.data;return a.setAll(id(e)),a.setAll(i),t.convertToFoundDocument(t.version,a).setHasLocalMutations(),n===null?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,r):function(e,t,n){return Yu(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function ed(e,t){let n=null;for(let r of e.fieldTransforms){let e=t.data.field(r.field),i=Iu(r.transform,e||null);i!=null&&(n===null&&(n=Tl.empty()),n.set(r.field,i))}return n||null}function td(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return e===void 0&&t===void 0||!(!e||!t)&&Qs(e,t,((e,t)=>Ku(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}var nd=class extends Xu{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}},rd=class extends Xu{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function id(e){let t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}})),t}function ad(e,t,n){let r=new Map;F(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let i=0;i<n.length;i++){let a=e[i],o=a.transform,s=t.data.field(a.field);r.set(a.field,Fu(o,s,n[i]))}return r}function od(e,t,n){let r=new Map;for(let i of e){let e=i.transform,a=n.data.field(i.field);r.set(i.field,Pu(e,a,t))}return r}var sd=class extends Xu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},cd=class extends Xu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}},ld=class{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let r=this.mutations[t];r.key.isEqual(e.key)&&Qu(r,e,n[t])}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=$u(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=$u(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=wu();return this.mutations.forEach((r=>{let i=e.get(r.key),a=i.overlayedDocument,o=this.applyToLocalView(a,i.mutatedFields);o=t.has(r.key)?null:o;let s=Zu(a,o);s!==null&&n.set(r.key,s),a.isValidDocument()||a.convertToNoDocument(W.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),X())}isEqual(e){return this.batchId===e.batchId&&Qs(this.mutations,e.mutations,((e,t)=>td(e,t)))&&Qs(this.baseMutations,e.baseMutations,((e,t)=>td(e,t)))}},ud=class e{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(t,n,r){F(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let i=function(){return Eu}(),a=t.mutations;for(let e=0;e<a.length;e++)i=i.insert(a[e].key,r[e].version);return new e(t,n,r,i)}},dd=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}},fd=class{constructor(e,t){this.count=e,this.unchangedNames=t}},Z,Q;function pd(e){switch(e){case L.OK:return P(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return P(15467,{code:e})}}function md(e){if(e===void 0)return Ns(`GRPC error has no .code`),L.UNKNOWN;switch(e){case Z.OK:return L.OK;case Z.CANCELLED:return L.CANCELLED;case Z.UNKNOWN:return L.UNKNOWN;case Z.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Z.INTERNAL:return L.INTERNAL;case Z.UNAVAILABLE:return L.UNAVAILABLE;case Z.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Z.NOT_FOUND:return L.NOT_FOUND;case Z.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Z.ABORTED:return L.ABORTED;case Z.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Z.DATA_LOSS:return L.DATA_LOSS;default:return P(39323,{code:e})}}(Q=Z||={})[Q.OK=0]=`OK`,Q[Q.CANCELLED=1]=`CANCELLED`,Q[Q.UNKNOWN=2]=`UNKNOWN`,Q[Q.INVALID_ARGUMENT=3]=`INVALID_ARGUMENT`,Q[Q.DEADLINE_EXCEEDED=4]=`DEADLINE_EXCEEDED`,Q[Q.NOT_FOUND=5]=`NOT_FOUND`,Q[Q.ALREADY_EXISTS=6]=`ALREADY_EXISTS`,Q[Q.PERMISSION_DENIED=7]=`PERMISSION_DENIED`,Q[Q.UNAUTHENTICATED=16]=`UNAUTHENTICATED`,Q[Q.RESOURCE_EXHAUSTED=8]=`RESOURCE_EXHAUSTED`,Q[Q.FAILED_PRECONDITION=9]=`FAILED_PRECONDITION`,Q[Q.ABORTED=10]=`ABORTED`,Q[Q.OUT_OF_RANGE=11]=`OUT_OF_RANGE`,Q[Q.UNIMPLEMENTED=12]=`UNIMPLEMENTED`,Q[Q.INTERNAL=13]=`INTERNAL`,Q[Q.UNAVAILABLE=14]=`UNAVAILABLE`,Q[Q.DATA_LOSS=15]=`DATA_LOSS`;
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var hd=null;
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function gd(){return new TextEncoder}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _d=new gs([4294967295,4294967295],0);function vd(e){let t=gd().encode(e),n=new _s;return n.update(t),new Uint8Array(n.digest())}function yd(e){let t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),a=t.getUint32(12,!0);return[new gs([n,r],0),new gs([i,a],0)]}var bd=class e{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new xd(`Invalid padding: ${t}`);if(n<0||e.length>0&&this.hashCount===0)throw new xd(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new xd(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=gs.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(gs.fromNumber(n)));return r.compare(_d)===1&&(r=new gs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;let t=vd(e),[n,r]=yd(t);for(let e=0;e<this.hashCount;e++){let t=this.ye(n,r,e);if(!this.we(t))return!1}return!0}static create(t,n,r){let i=t%8==0?0:8-t%8,a=new Uint8Array(Math.ceil(t/8)),o=new e(a,i,n);return r.forEach((e=>o.insert(e))),o}insert(e){if(this.ge===0)return;let t=vd(e),[n,r]=yd(t);for(let e=0;e<this.hashCount;e++){let t=this.ye(n,r,e);this.Se(t)}}Se(e){let t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}},xd=class extends Error{constructor(){super(...arguments),this.name=`BloomFilterError`}},Sd=class e{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,r){let i=new Map;return i.set(t,Cd.createSynthesizedTargetChangeForCurrentChange(t,n,r)),new e(W.min(),i,new K(z),yu(),X())}},Cd=class e{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,r){return new e(r,n,X(),X(),X())}},wd=class{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}},Td=class{constructor(e,t){this.targetId=e,this.Ce=t}},Ed=class{constructor(e,t,n=Hc.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}},Dd=class{constructor(){this.ve=0,this.Fe=Ad(),this.Me=Hc.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),n=X();return this.Fe.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:P(38017,{changeType:i})}})),new Cd(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Ad()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){--this.ve,F(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}},Od=class{constructor(e){this.Ge=e,this.ze=new Map,this.je=yu(),this.Je=kd(),this.He=kd(),this.Ye=new K(z)}Ze(e){for(let t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(let t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{let n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:P(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((e,n)=>{this.rt(n)&&t(n)}))}st(e){let t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){let i=r.target;if($l(i))if(n===0){let e=new V(i.path);this.et(t,e,Dl.newNoDocument(e,W.min()))}else F(n===1,20013,{expectedCount:n});else{let r=this._t(t);if(r!==n){let n=this.ut(e),i=n?this.ct(n,e,r):1;if(i!==0){this.it(t);let e=i===2?`TargetPurposeExistenceFilterMismatchBloom`:`TargetPurposeExistenceFilterMismatch`;this.Ye=this.Ye.insert(t,e)}hd?.lt(function(e,t,n,r,i){let a={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(a.bloomFilter={applied:i===0,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),a}(r,e.Ce,this.Ge.ht(),n,i))}}}}ut(e){let t=e.Ce.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:n=``,padding:r=0},hashCount:i=0}=t,a,o;try{a=Gc(n).toUint8Array()}catch(e){if(e instanceof Vc)return Ps(`Decoding the base64 bloom filter in existence filter failed (`+e.message+`); ignoring the bloom filter and falling back to full re-query.`),null;throw e}try{o=new bd(a,r,i)}catch(e){return Ps(e instanceof xd?`BloomFilter error: `:`Applying bloom filter failed: `,e),null}return o.ge===0?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){let n=this.Ge.getRemoteKeysForTarget(t),r=0;return n.forEach((n=>{let i=this.Ge.ht(),a=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(a)||(this.et(t,n,null),r++)})),r}Tt(e){let t=new Map;this.ze.forEach(((n,r)=>{let i=this.ot(r);if(i){if(n.current&&$l(i.target)){let t=new V(i.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,Dl.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}}));let n=X();this.He.forEach(((e,t)=>{let r=!0;t.forEachWhile((e=>{let t=this.ot(e);return!t||t.purpose===`TargetPurposeLimboResolution`||(r=!1,!1)})),r&&(n=n.add(e))})),this.je.forEach(((t,n)=>n.setReadTime(e)));let r=new Sd(e,t,this.Ye,this.je,n);return this.je=yu(),this.Je=kd(),this.He=kd(),this.Ye=new K(z),r}Xe(e,t){if(!this.rt(e))return;let n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;let r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){let t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Dd,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new q(z),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new q(z),this.Je=this.Je.insert(e,t)),t}rt(e){let t=this.ot(e)!==null;return t||N(`WatchChangeAggregator`,`Detected inactive target`,e),t}ot(e){let t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Dd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}};function kd(){return new K(V.comparator)}function Ad(){return new K(V.comparator)}var jd=(()=>({asc:`ASCENDING`,desc:`DESCENDING`}))(),Md=(()=>({"<":`LESS_THAN`,"<=":`LESS_THAN_OR_EQUAL`,">":`GREATER_THAN`,">=":`GREATER_THAN_OR_EQUAL`,"==":`EQUAL`,"!=":`NOT_EQUAL`,"array-contains":`ARRAY_CONTAINS`,in:`IN`,"not-in":`NOT_IN`,"array-contains-any":`ARRAY_CONTAINS_ANY`}))(),Nd=(()=>({and:`AND`,or:`OR`}))(),Pd=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Fd(e,t){return e.useProto3Json||Dc(t)?t:{value:t}}function Id(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,``).replace(`Z`,``)}.${(`000000000`+t.nanoseconds).slice(-9)}Z`:{seconds:``+t.seconds,nanos:t.nanoseconds}}function Ld(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Rd(e,t){return Id(e,t.toTimestamp())}function zd(e){return F(!!e,49232),W.fromTimestamp(function(e){let t=Wc(e);return new U(t.seconds,t.nanos)}(e))}function Bd(e,t){return Vd(e,t).canonicalString()}function Vd(e,t){let n=function(e){return new B([`projects`,e.projectId,`databases`,e.database])}(e).child(`documents`);return t===void 0?n:n.child(t)}function Hd(e){let t=B.fromString(e);return F(pf(t),10190,{key:t.toString()}),t}function Ud(e,t){return Bd(e.databaseId,t.path)}function Wd(e,t){let n=Hd(t);if(n.get(1)!==e.databaseId.projectId)throw new R(L.INVALID_ARGUMENT,`Tried to deserialize key from different project: `+n.get(1)+` vs `+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new R(L.INVALID_ARGUMENT,`Tried to deserialize key from different database: `+n.get(3)+` vs `+e.databaseId.database);return new V(Jd(n))}function Gd(e,t){return Bd(e.databaseId,t)}function Kd(e){let t=Hd(e);return t.length===4?B.emptyPath():Jd(t)}function qd(e){return new B([`projects`,e.databaseId.projectId,`databases`,e.databaseId.database]).canonicalString()}function Jd(e){return F(e.length>4&&e.get(4)===`documents`,29091,{key:e.toString()}),e.popFirst(5)}function Yd(e,t,n){return{name:Ud(e,t),fields:n.value.mapValue.fields}}function Xd(e,t){let n;if(`targetChange`in t){t.targetChange;let r=function(e){return e===`NO_CHANGE`?0:e===`ADD`?1:e===`REMOVE`?2:e===`CURRENT`?3:e===`RESET`?4:P(39313,{state:e})}(t.targetChange.targetChangeType||`NO_CHANGE`),i=t.targetChange.targetIds||[],a=function(e,t){return e.useProto3Json?(F(t===void 0||typeof t==`string`,58123),Hc.fromBase64String(t||``)):(F(t===void 0||t instanceof Buffer||t instanceof Uint8Array,16193),Hc.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,s=o&&function(e){let t=e.code===void 0?L.UNKNOWN:md(e.code);return new R(t,e.message||``)}(o);n=new Ed(r,i,a,s||null)}else if(`documentChange`in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=Wd(e,r.document.name),a=zd(r.document.updateTime),o=r.document.createTime?zd(r.document.createTime):W.min(),s=new Tl({mapValue:{fields:r.document.fields}}),c=Dl.newFoundDocument(i,a,o,s),l=r.targetIds||[],u=r.removedTargetIds||[];n=new wd(l,u,c.key,c)}else if(`documentDelete`in t){t.documentDelete;let r=t.documentDelete;r.document;let i=Wd(e,r.document),a=r.readTime?zd(r.readTime):W.min(),o=Dl.newNoDocument(i,a),s=r.removedTargetIds||[];n=new wd([],s,o.key,o)}else if(`documentRemove`in t){t.documentRemove;let r=t.documentRemove;r.document;let i=Wd(e,r.document),a=r.removedTargetIds||[];n=new wd([],a,i,null)}else{if(!(`filter`in t))return P(11601,{Rt:t});{t.filter;let e=t.filter;e.targetId;let{count:r=0,unchangedNames:i}=e,a=new fd(r,i),o=e.targetId;n=new Td(o,a)}}return n}function Zd(e,t){let n;if(t instanceof nd)n={update:Yd(e,t.key,t.value)};else if(t instanceof sd)n={delete:Ud(e,t.key)};else if(t instanceof rd)n={update:Yd(e,t.key,t.data),updateMask:ff(t.fieldMask)};else{if(!(t instanceof cd))return P(16599,{Vt:t.type});n={verify:Ud(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){let n=t.transform;if(n instanceof Lu)return{fieldPath:t.field.canonicalString(),setToServerValue:`REQUEST_TIME`};if(n instanceof Ru)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Bu)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Hu)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw P(20930,{transform:t.transform})}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return t.updateTime===void 0?t.exists===void 0?P(27497):{exists:t.exists}:{updateTime:Rd(e,t.updateTime)}}(e,t.precondition)),n}function Qd(e,t){return e&&e.length>0?(F(t!==void 0,14353),e.map((e=>function(e,t){let n=e.updateTime?zd(e.updateTime):zd(t);return n.isEqual(W.min())&&(n=zd(t)),new qu(n,e.transformResults||[])}(e,t)))):[]}function $d(e,t){return{documents:[Gd(e,t.path)]}}function ef(e,t){let n={structuredQuery:{}},r=t.path,i;t.collectionGroup===null?(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]):(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]),n.parent=Gd(e,i);let a=function(e){if(e.length!==0)return df(Pl.create(e,`and`))}(t.filters);a&&(n.structuredQuery.where=a);let o=function(e){if(e.length!==0)return e.map((e=>function(e){return{field:lf(e.field),direction:af(e.dir)}}(e)))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);let s=Fd(e,t.limit);return s!==null&&(n.structuredQuery.limit=s),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i}}function tf(e){let t=Kd(e.parent),n=e.structuredQuery,r=n.from?n.from.length:0,i=null;if(r>0){F(r===1,65062);let e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let a=[];n.where&&(a=function(e){let t=rf(e);return t instanceof Pl&&Il(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map((e=>function(e){return new jl(uf(e.field),function(e){switch(e){case`ASCENDING`:return`asc`;case`DESCENDING`:return`desc`;default:return}}(e.direction))}(e)))}(n.orderBy));let s=null;n.limit&&(s=function(e){let t;return t=typeof e==`object`?e.value:e,Dc(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){let t=!!e.before,n=e.values||[];return new Ol(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){let t=!e.before,n=e.values||[];return new Ol(n,t)}(n.endAt)),tu(t,i,o,a,s,`F`,c,l)}function nf(e,t){let n=function(e){switch(e){case`TargetPurposeListen`:return null;case`TargetPurposeExistenceFilterMismatch`:return`existence-filter-mismatch`;case`TargetPurposeExistenceFilterMismatchBloom`:return`existence-filter-mismatch-bloom`;case`TargetPurposeLimboResolution`:return`limbo-document`;default:return P(28987,{purpose:e})}}(t.purpose);return n==null?null:{"goog-listen-tags":n}}function rf(e){return e.unaryFilter===void 0?e.fieldFilter===void 0?e.compositeFilter===void 0?P(30097,{filter:e}):function(e){return Pl.create(e.compositeFilter.filters.map((e=>rf(e))),function(e){switch(e){case`AND`:return`and`;case`OR`:return`or`;default:return P(1026)}}(e.compositeFilter.op))}(e):function(e){return Y.create(uf(e.fieldFilter.field),function(e){switch(e){case`EQUAL`:return`==`;case`NOT_EQUAL`:return`!=`;case`GREATER_THAN`:return`>`;case`GREATER_THAN_OR_EQUAL`:return`>=`;case`LESS_THAN`:return`<`;case`LESS_THAN_OR_EQUAL`:return`<=`;case`ARRAY_CONTAINS`:return`array-contains`;case`IN`:return`in`;case`NOT_IN`:return`not-in`;case`ARRAY_CONTAINS_ANY`:return`array-contains-any`;case`OPERATOR_UNSPECIFIED`:return P(58110);default:return P(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):function(e){switch(e.unaryFilter.op){case`IS_NAN`:let t=uf(e.unaryFilter.field);return Y.create(t,`==`,{doubleValue:NaN});case`IS_NULL`:let n=uf(e.unaryFilter.field);return Y.create(n,`==`,{nullValue:`NULL_VALUE`});case`IS_NOT_NAN`:let r=uf(e.unaryFilter.field);return Y.create(r,`!=`,{doubleValue:NaN});case`IS_NOT_NULL`:let i=uf(e.unaryFilter.field);return Y.create(i,`!=`,{nullValue:`NULL_VALUE`});case`OPERATOR_UNSPECIFIED`:return P(61313);default:return P(60726)}}(e)}function af(e){return jd[e]}function sf(e){return Md[e]}function cf(e){return Nd[e]}function lf(e){return{fieldPath:e.canonicalString()}}function uf(e){return nc.fromServerFormat(e.fieldPath)}function df(e){return e instanceof Y?function(e){if(e.op===`==`){if(bl(e.value))return{unaryFilter:{field:lf(e.field),op:`IS_NAN`}};if(yl(e.value))return{unaryFilter:{field:lf(e.field),op:`IS_NULL`}}}else if(e.op===`!=`){if(bl(e.value))return{unaryFilter:{field:lf(e.field),op:`IS_NOT_NAN`}};if(yl(e.value))return{unaryFilter:{field:lf(e.field),op:`IS_NOT_NULL`}}}return{fieldFilter:{field:lf(e.field),op:sf(e.op),value:e.value}}}(e):e instanceof Pl?function(e){let t=e.getFilters().map((e=>df(e)));return t.length===1?t[0]:{compositeFilter:{op:cf(e.op),filters:t}}}(e):P(54877,{filter:e})}function ff(e){let t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function pf(e){return e.length>=4&&e.get(0)===`projects`&&e.get(2)===`databases`}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var mf=class e{constructor(e,t,n,r,i=W.min(),a=W.min(),o=Hc.EMPTY_BYTE_STRING,s=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=o,this.expectedCount=s}withSequenceNumber(t){return new e(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new e(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new e(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new e(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}},hf=class{constructor(e){this.yt=e}};function gf(e){let t=tf({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType===`LAST`?lu(t,t.limit,`L`):t}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _f=class{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if(`nullValue`in e)this.Ft(t,5);else if(`booleanValue`in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if(`integerValue`in e)this.Ft(t,15),t.Mt(J(e.integerValue));else if(`doubleValue`in e){let n=J(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),Oc(n)?t.Mt(0):t.Mt(n))}else if(`timestampValue`in e){let n=e.timestampValue;this.Ft(t,20),typeof n==`string`&&(n=Wc(n)),t.xt(`${n.seconds||``}`),t.Mt(n.nanos||0)}else if(`stringValue`in e)this.Ot(e.stringValue,t),this.Nt(t);else if(`bytesValue`in e)this.Ft(t,30),t.Bt(Gc(e.bytesValue)),this.Nt(t);else if(`referenceValue`in e)this.Lt(e.referenceValue,t);else if(`geoPointValue`in e){let n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else `mapValue`in e?wl(e)?this.Ft(t,2**53-1):Sl(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):`arrayValue`in e?(this.Qt(e.arrayValue,t),this.Nt(t)):P(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){let n=e.fields||{};this.Ft(t,55);for(let e of Object.keys(n))this.Ot(e,t),this.Ct(n[e],t)}kt(e,t){let n=e.fields||{};this.Ft(t,53);let r=ol,i=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(J(i)),this.Ot(r,t),this.Ct(n[r],t)}Qt(e,t){let n=e.values||[];this.Ft(t,50);for(let e of n)this.Ct(e,t)}Lt(e,t){this.Ft(t,37),V.fromName(e).path.forEach((e=>{this.Ft(t,60),this.Ut(e,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}};_f.Kt=new _f;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var vf=class{constructor(){this.Cn=new yf}addToCollectionParentIndex(e,t){return this.Cn.add(t),G.resolve()}getCollectionParents(e,t){return G.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return G.resolve()}deleteFieldIndex(e,t){return G.resolve()}deleteAllFieldIndexes(e){return G.resolve()}createTargetIndexes(e,t){return G.resolve()}getDocumentsMatchingTarget(e,t){return G.resolve(null)}getIndexType(e,t){return G.resolve(0)}getFieldIndexes(e,t){return G.resolve([])}getNextCollectionGroupToUpdate(e){return G.resolve(null)}getMinOffset(e,t){return G.resolve(vc.min())}getMinOffsetFromCollectionGroup(e,t){return G.resolve(vc.min())}updateCollectionGroup(e,t,n){return G.resolve()}updateIndexEntries(e,t){return G.resolve()}},yf=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new q(B.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new q(B.comparator)).toArray()}};new Uint8Array;
/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xf=41943040,Sf=class e{static withCacheSize(t){return new e(t,e.DEFAULT_COLLECTION_PERCENTILE,e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
Sf.DEFAULT_COLLECTION_PERCENTILE=10,Sf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Sf.DEFAULT=new Sf(xf,Sf.DEFAULT_COLLECTION_PERCENTILE,Sf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Sf.DISABLED=new Sf(-1,0,0);
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Cf=class e{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new e(0)}static cr(){return new e(-1)}},wf=`LruGarbageCollector`,Tf=1048576;function Ef([e,t],[n,r]){let i=z(e,n);return i===0?z(t,r):i}var Df=class{constructor(e){this.Ir=e,this.buffer=new q(Ef),this.Er=0}dr(){return++this.Er}Ar(e){let t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();Ef(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}},Of=class{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&=(this.Rr.cancel(),null)}get started(){return this.Rr!==null}Vr(e){N(wf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay(`lru_garbage_collection`,e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){wc(e)?N(wf,`Ignoring IndexedDB error during garbage collection: `,e):await Sc(e)}await this.Vr(3e5)}))}},kf=class{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((e=>Math.floor(t/100*e)))}nthSequenceNumber(e,t){if(t===0)return G.resolve(Tc.ce);let n=new Df(t);return this.mr.forEachTarget(e,(e=>n.Ar(e.sequenceNumber))).next((()=>this.mr.pr(e,(e=>n.Ar(e))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N(`LruGarbageCollector`,`Garbage collection skipped; disabled`),G.resolve(bf)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(N(`LruGarbageCollector`,`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),bf):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,i,a,o,s,c,l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((t=>(t>this.params.maximumSequenceNumbersToCollect?(N(`LruGarbageCollector`,`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,a=Date.now(),this.nthSequenceNumber(e,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(e,n,t)))).next((t=>(i=t,s=Date.now(),this.removeOrphanedDocuments(e,n)))).next((e=>(c=Date.now(),Ms()<=S.DEBUG&&N(`LruGarbageCollector`,`LRU Garbage Collection\n\tCounted targets in ${a-l}ms\n\tDetermined least recently used ${r} in `+(o-a)+`ms
\tRemoved ${i} targets in `+(s-o)+`ms
\tRemoved ${e} documents in `+(c-s)+`ms
Total Duration: ${c-l}ms`),G.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e}))))}};function Af(e,t){return new kf(e,t)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var jf=class{constructor(){this.changes=new _u((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Dl.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return n===void 0?this.getFromCache(e,t):G.resolve(n)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}},Mf=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}},Nf=class{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(n=r,this.remoteDocumentCache.getEntry(e,t)))).next((e=>(n!==null&&$u(n.mutation,e,Bc.empty(),U.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,X()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=X()){let r=Cu();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,n).next((e=>{let t=xu();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){let n=Cu();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,X())))}populateOverlays(e,t,n){let r=[];return n.forEach((e=>{t.has(e)||r.push(e)})),this.documentOverlayCache.getOverlays(e,r).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,r){let i=yu(),a=Tu(),o=function(){return Tu()}();return t.forEach(((e,t)=>{let o=n.get(t.key);r.has(t.key)&&(o===void 0||o.mutation instanceof rd)?i=i.insert(t.key,t):o===void 0?a.set(t.key,Bc.empty()):(a.set(t.key,o.mutation.getFieldMask()),$u(o.mutation,t,o.mutation.getFieldMask(),U.now()))})),this.recalculateAndSaveOverlays(e,i).next((e=>(e.forEach(((e,t)=>a.set(e,t))),t.forEach(((e,t)=>o.set(e,new Mf(t,a.get(e)??null)))),o)))}recalculateAndSaveOverlays(e,t){let n=Tu(),r=new K(((e,t)=>e-t)),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(let i of e)i.keys().forEach((e=>{let a=t.get(e);if(a===null)return;let o=n.get(e)||Bc.empty();o=i.applyToLocalView(a,o),n.set(e,o);let s=(r.get(i.batchId)||X()).add(e);r=r.insert(i.batchId,s)}))})).next((()=>{let a=[],o=r.getReverseIterator();for(;o.hasNext();){let r=o.getNext(),s=r.key,c=r.value,l=wu();c.forEach((e=>{if(!i.has(e)){let r=Zu(t.get(e),n.get(e));r!==null&&l.set(e,r),i=i.add(e)}})),a.push(this.documentOverlayCache.saveOverlays(e,s,l))}return G.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n,r){return function(e){return V.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):iu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next((i=>{let a=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):G.resolve(Cu()),o=mc,s=i;return a.next((t=>G.forEach(t,((t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?G.resolve():this.remoteDocumentCache.getEntry(e,t).next((e=>{s=s.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,i))).next((()=>this.computeViews(e,s,t,X()))).next((e=>({batchId:o,changes:Su(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next((e=>{let t=xu();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){let i=t.collectionGroup,a=xu();return this.indexManager.getCollectionParents(e,i).next((o=>G.forEach(o,(o=>{let s=function(e,t){return new eu(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,s,n,r).next((e=>{e.forEach(((e,t)=>{a=a.insert(e,t)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r)))).next((e=>{i.forEach(((t,n)=>{let r=n.getKey();e.get(r)===null&&(e=e.insert(r,Dl.newInvalidDocument(r)))}));let n=xu();return e.forEach(((e,r)=>{let a=i.get(e);a!==void 0&&$u(a.mutation,r,Bc.empty(),U.now()),pu(t,r)&&(n=n.insert(e,r))})),n}))}},Pf=class{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return G.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:zd(e.createTime)}}(t)),G.resolve()}getNamedQuery(e,t){return G.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(e){return{name:e.name,query:gf(e.bundledQuery),readTime:zd(e.readTime)}}(t)),G.resolve()}},Ff=class{constructor(){this.overlays=new K(V.comparator),this.qr=new Map}getOverlay(e,t){return G.resolve(this.overlays.get(t))}getOverlays(e,t){let n=Cu();return G.forEach(t,(t=>this.getOverlay(e,t).next((e=>{e!==null&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,r)=>{this.St(e,t,r)})),G.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.qr.get(n);return r!==void 0&&(r.forEach((e=>this.overlays=this.overlays.remove(e))),this.qr.delete(n)),G.resolve()}getOverlaysForCollection(e,t,n){let r=Cu(),i=t.length+1,a=new V(t.child(``)),o=this.overlays.getIteratorFrom(a);for(;o.hasNext();){let e=o.getNext().value,a=e.getKey();if(!t.isPrefixOf(a.path))break;a.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return G.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new K(((e,t)=>e-t)),a=this.overlays.getIterator();for(;a.hasNext();){let e=a.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);t===null&&(t=Cu(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let o=Cu(),s=i.getIterator();for(;s.hasNext()&&(s.getNext().value.forEach(((e,t)=>o.set(e,t))),!(o.size()>=r)););return G.resolve(o)}St(e,t,n){let r=this.overlays.get(n.key);if(r!==null){let e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new dd(t,n));let i=this.qr.get(t);i===void 0&&(i=X(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}},If=class{constructor(){this.sessionToken=Hc.EMPTY_BYTE_STRING}getSessionToken(e){return G.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,G.resolve()}},Lf=class{constructor(){this.Qr=new q($.$r),this.Ur=new q($.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){let n=new $(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.Gr(new $(e,t))}zr(e,t){e.forEach((e=>this.removeReference(e,t)))}jr(e){let t=new V(new B([])),n=new $(t,e),r=new $(t,e+1),i=[];return this.Ur.forEachInRange([n,r],(e=>{this.Gr(e),i.push(e.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){let t=new V(new B([])),n=new $(t,e),r=new $(t,e+1),i=X();return this.Ur.forEachInRange([n,r],(e=>{i=i.add(e.key)})),i}containsKey(e){let t=new $(e,0),n=this.Qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}},$=class{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return V.comparator(e.key,t.key)||z(e.Yr,t.Yr)}static Kr(e,t){return z(e.Yr,t.Yr)||V.comparator(e.key,t.key)}},Rf=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new q($.$r)}checkEmpty(e){return G.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,r){let i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new ld(i,t,n,r);this.mutationQueue.push(a);for(let t of r)this.Zr=this.Zr.add(new $(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return G.resolve(a)}lookupMutationBatch(e,t){return G.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){let n=t+1,r=this.ei(n),i=r<0?0:r;return G.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return G.resolve(this.mutationQueue.length===0?Ec:this.tr-1)}getAllMutationBatches(e){return G.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new $(t,0),r=new $(t,1/0),i=[];return this.Zr.forEachInRange([n,r],(e=>{let t=this.Xr(e.Yr);i.push(t)})),G.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new q(z);return t.forEach((e=>{let t=new $(e,0),r=new $(e,1/0);this.Zr.forEachInRange([t,r],(e=>{n=n.add(e.Yr)}))})),G.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;V.isDocumentKey(i)||(i=i.child(``));let a=new $(new V(i),0),o=new q(z);return this.Zr.forEachWhile((e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)}),a),G.resolve(this.ti(o))}ti(e){let t=[];return e.forEach((e=>{let n=this.Xr(e);n!==null&&t.push(n)})),t}removeMutationBatch(e,t){F(this.ni(t.batchId,`removed`)===0,55003),this.mutationQueue.shift();let n=this.Zr;return G.forEach(t.mutations,(r=>{let i=new $(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.Zr=n}))}ir(e){}containsKey(e,t){let n=new $(t,0),r=this.Zr.firstAfterOrEqual(n);return G.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,G.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){let t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}},zf=class{constructor(e){this.ri=e,this.docs=function(){return new K(V.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,a=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return G.resolve(n?n.document.mutableCopy():Dl.newInvalidDocument(t))}getEntries(e,t){let n=yu();return t.forEach((e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Dl.newInvalidDocument(e))})),G.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=yu(),a=t.path,o=new V(a.child(`__id-9223372036854775808__`)),s=this.docs.getIteratorFrom(o);for(;s.hasNext();){let{key:e,value:{document:o}}=s.getNext();if(!a.isPrefixOf(e.path))break;e.path.length>a.length+1||yc(_c(o),n)<=0||(r.has(o.key)||pu(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return G.resolve(i)}getAllFromCollectionGroup(e,t,n,r){P(9500)}ii(e,t){return G.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new Bf(this)}getSize(e){return G.resolve(this.size)}},Bf=class extends jf{constructor(e){super(),this.Nr=e}applyChanges(e){let t=[];return this.changes.forEach(((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)})),G.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}},Vf=class{constructor(e){this.persistence=e,this.si=new _u((e=>Zl(e)),Ql),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.oi=0,this._i=new Lf,this.targetCount=0,this.ai=Cf.ur()}forEachTarget(e,t){return this.si.forEach(((e,n)=>t(n))),G.resolve()}getLastRemoteSnapshotVersion(e){return G.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return G.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),G.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),G.resolve()}Pr(e){this.si.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.ai=new Cf(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,G.resolve()}updateTargetData(e,t){return this.Pr(t),G.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),--this.targetCount,G.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.si.forEach(((a,o)=>{o.sequenceNumber<=t&&n.get(o.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)})),G.waitFor(i).next((()=>r))}getTargetCount(e){return G.resolve(this.targetCount)}getTargetData(e,t){let n=this.si.get(t)||null;return G.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),G.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((t=>{i.push(r.markPotentiallyOrphaned(e,t))})),G.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),G.resolve()}getMatchingKeysForTargetId(e,t){let n=this._i.Hr(t);return G.resolve(n)}containsKey(e,t){return G.resolve(this._i.containsKey(t))}},Hf=class{constructor(e,t){this.ui={},this.overlays={},this.ci=new Tc(0),this.li=!1,this.li=!0,this.hi=new If,this.referenceDelegate=e(this),this.Pi=new Vf(this),this.indexManager=new vf,this.remoteDocumentCache=function(e){return new zf(e)}((e=>this.referenceDelegate.Ti(e))),this.serializer=new hf(t),this.Ii=new Pf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ff,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new Rf(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){N(`MemoryPersistence`,`Starting transaction:`,e);let r=new Uf(this.ci.next());return this.referenceDelegate.Ei(),n(r).next((e=>this.referenceDelegate.di(r).next((()=>e)))).toPromise().then((e=>(r.raiseOnCommittedEvent(),e)))}Ai(e,t){return G.or(Object.values(this.ui).map((n=>()=>n.containsKey(e,t))))}},Uf=class extends xc{constructor(e){super(),this.currentSequenceNumber=e}},Wf=class e{constructor(e){this.persistence=e,this.Ri=new Lf,this.Vi=null}static mi(t){return new e(t)}get fi(){if(this.Vi)return this.Vi;throw P(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),G.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),G.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),G.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((e=>this.fi.add(e.toString())));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.fi.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return G.forEach(this.fi,(n=>{let r=V.fromPath(n);return this.gi(e,r).next((e=>{e||t.removeEntry(r,W.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return G.or([()=>G.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}},Gf=class e{constructor(e,t){this.persistence=e,this.pi=new _u((e=>jc(e.path)),((e,t)=>e.isEqual(t))),this.garbageCollector=Af(this,t)}static mi(t,n){return new e(t,n)}Ei(){}di(e){return G.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){let t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((e=>t.next((t=>e+t))))}wr(e){let t=0;return this.pr(e,(e=>{t++})).next((()=>t))}pr(e,t){return G.forEach(this.pi,((n,r)=>this.br(e,n,r).next((e=>e?G.resolve():t(r)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0,r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,(r=>this.br(e,r,t).next((e=>{e||(n++,i.removeEntry(r,W.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),G.resolve()}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),G.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),G.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),G.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=hl(e.data.value)),t}br(e,t,n){return G.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.pi.get(t);return G.resolve(e!==void 0&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}},Kf=class e{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(t,n){let r=X(),i=X();for(let e of n.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:i=i.add(e.doc.key)}return new e(t,n.fromCache,r,i)}},qf=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}},Jf=class{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return me()?8:Cc(_())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){let i={result:null};return this.ys(e,t).next((e=>{i.result=e})).next((()=>{if(!i.result)return this.ws(e,t,r,n).next((e=>{i.result=e}))})).next((()=>{if(i.result)return;let n=new qf;return this.Ss(e,t,n).next((r=>{if(i.result=r,this.Vs)return this.bs(e,t,n,r.size)}))})).next((()=>i.result))}bs(e,t,n,r){return n.documentReadCount<this.fs?(Ms()<=S.DEBUG&&N(`QueryEngine`,`SDK will not create cache indexes for query:`,fu(t),`since it only creates cache indexes for collection contains`,`more than or equal to`,this.fs,`documents`),G.resolve()):(Ms()<=S.DEBUG&&N(`QueryEngine`,`Query:`,fu(t),`scans`,n.documentReadCount,`local documents and returns`,r,`documents as results.`),n.documentReadCount>this.gs*r?(Ms()<=S.DEBUG&&N(`QueryEngine`,`The SDK decides to create cache indexes for query:`,fu(t),`as using cache indexes may help improve performance.`),this.indexManager.createTargetIndexes(e,ou(t))):G.resolve())}ys(e,t){if(ru(t))return G.resolve(null);let n=ou(t);return this.indexManager.getIndexType(e,n).next((r=>r===0?null:(t.limit!==null&&r===1&&(t=lu(t,null,`F`),n=ou(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((r=>{let i=X(...r);return this.ps.getDocuments(e,i).next((r=>this.indexManager.getMinOffset(e,n).next((n=>{let a=this.Ds(t,r);return this.Cs(t,a,i,n.readTime)?this.ys(e,lu(t,null,`F`)):this.vs(e,a,t,n)}))))})))))}ws(e,t,n,r){return ru(t)||r.isEqual(W.min())?G.resolve(null):this.ps.getDocuments(e,n).next((i=>{let a=this.Ds(t,i);return this.Cs(t,a,n,r)?G.resolve(null):(Ms()<=S.DEBUG&&N(`QueryEngine`,`Re-using previous result from %s to execute query: %s`,r.toString(),fu(t)),this.vs(e,a,t,gc(r,mc)).next((e=>e)))}))}Ds(e,t){let n=new q(hu(e));return t.forEach(((t,r)=>{pu(e,r)&&(n=n.add(r))})),n}Cs(e,t,n,r){if(e.limit===null)return!1;if(n.size!==t.size)return!0;let i=e.limitType===`F`?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,n){return Ms()<=S.DEBUG&&N(`QueryEngine`,`Using full collection scan to execute query:`,fu(t)),this.ps.getDocumentsMatchingQuery(e,t,vc.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}},Yf=`LocalStore`,Xf=3e8,Zf=class{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new K(z),this.xs=new _u((e=>Zl(e)),Ql),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Nf(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction(`Collect garbage`,`readwrite-primary`,(t=>e.collect(t,this.Ms)))}};function Qf(e,t,n,r){return new Zf(e,t,n,r)}async function $f(e,t){let n=I(e);return await n.persistence.runTransaction(`Handle user change`,`readonly`,(e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next((i=>(r=i,n.Bs(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{let i=[],a=[],o=X();for(let e of r){i.push(e.batchId);for(let t of e.mutations)o=o.add(t.key)}for(let e of t){a.push(e.batchId);for(let t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next((e=>({Ls:e,removedBatchIds:i,addedBatchIds:a})))}))}))}function ep(e,t){let n=I(e);return n.persistence.runTransaction(`Acknowledge batch`,`readwrite-primary`,(e=>{let r=t.batch.keys(),i=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){let i=n.batch,a=i.keys(),o=G.resolve();return a.forEach((e=>{o=o.next((()=>r.getEntry(t,e))).next((t=>{let a=n.docVersions.get(e);F(a!==null,48541),t.version.compareTo(a)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))}))})),o.next((()=>e.mutationQueue.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=X();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,r)))}))}function tp(e){let t=I(e);return t.persistence.runTransaction(`Get last remote snapshot version`,`readonly`,(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function np(e,t){let n=I(e),r=t.snapshotVersion,i=n.Ms;return n.persistence.runTransaction(`Apply remote event`,`readwrite-primary`,(e=>{let a=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;let o=[];t.targetChanges.forEach(((a,s)=>{let c=i.get(s);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,a.removedDocuments,s).next((()=>n.Pi.addMatchingKeys(e,a.addedDocuments,s))));let l=c.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.get(s)===null?a.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(a.resumeToken,r)):l=l.withResumeToken(Hc.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()),i=i.insert(s,l),function(e,t,n){return e.resumeToken.approximateByteSize()===0||t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=Xf?!0:n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,l,a)&&o.push(n.Pi.updateTargetData(e,l))}));let s=yu(),c=X();if(t.documentUpdates.forEach((r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))})),o.push(rp(e,a,t.documentUpdates).next((e=>{s=e.ks,c=e.qs}))),!r.isEqual(W.min())){let t=n.Pi.getLastRemoteSnapshotVersion(e).next((t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r)));o.push(t)}return G.waitFor(o).next((()=>a.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,s,c))).next((()=>s))})).then((e=>(n.Ms=i,e)))}function rp(e,t,n){let r=X(),i=X();return n.forEach((e=>r=r.add(e))),t.getEntries(e,r).next((e=>{let r=yu();return n.forEach(((n,a)=>{let o=e.get(n);a.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),a.isNoDocument()&&a.version.isEqual(W.min())?(t.removeEntry(n,a.readTime),r=r.insert(n,a)):!o.isValidDocument()||a.version.compareTo(o.version)>0||a.version.compareTo(o.version)===0&&o.hasPendingWrites?(t.addEntry(a),r=r.insert(n,a)):N(Yf,`Ignoring outdated watch update for `,n,`. Current version:`,o.version,` Watch version:`,a.version)})),{ks:r,qs:i}}))}function ip(e,t){let n=I(e);return n.persistence.runTransaction(`Get next mutation batch`,`readonly`,(e=>(t===void 0&&(t=Ec),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}function ap(e,t){let n=I(e);return n.persistence.runTransaction(`Allocate target`,`readwrite`,(e=>{let r;return n.Pi.getTargetData(e,t).next((i=>i?(r=i,G.resolve(r)):n.Pi.allocateTargetId(e).next((i=>(r=new mf(t,i,`TargetPurposeListen`,e.currentSequenceNumber),n.Pi.addTargetData(e,r).next((()=>r)))))))})).then((e=>{let r=n.Ms.get(e.targetId);return(r===null||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e}))}async function op(e,t,n){let r=I(e),i=r.Ms.get(t),a=n?`readwrite`:`readwrite-primary`;try{n||await r.persistence.runTransaction(`Release target`,a,(e=>r.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!wc(e))throw e;N(Yf,`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ms=r.Ms.remove(t),r.xs.delete(i.target)}function sp(e,t,n){let r=I(e),i=W.min(),a=X();return r.persistence.runTransaction(`Execute query`,`readwrite`,(e=>function(e,t,n){let r=I(e),i=r.xs.get(n);return i===void 0?r.Pi.getTargetData(t,n):G.resolve(r.Ms.get(i))}(r,e,ou(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next((e=>{a=e}))})).next((()=>r.Fs.getDocumentsMatchingQuery(e,t,n?i:W.min(),n?a:X()))).next((e=>(cp(r,mu(t),e),{documents:e,Qs:a})))))}function cp(e,t,n){let r=e.Os.get(t)||W.min();n.forEach(((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)})),e.Os.set(t,r)}var lp=class{constructor(){this.activeTargetIds=ku()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}},up=class{constructor(){this.Mo=new lp,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||`not-current`}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new lp,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}},dp=class{Oo(e){}shutdown(){}},fp=`ConnectivityMonitor`,pp=class{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener(`online`,this.No),window.removeEventListener(`offline`,this.Lo)}Qo(){window.addEventListener(`online`,this.No),window.addEventListener(`offline`,this.Lo)}Bo(){N(fp,`Network connectivity changed: AVAILABLE`);for(let e of this.qo)e(0)}ko(){N(fp,`Network connectivity changed: UNAVAILABLE`);for(let e of this.qo)e(1)}static v(){return typeof window<`u`&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}},mp=null;function hp(){return mp===null?mp=function(){return 268435456+Math.round(2147483648*Math.random())}():mp++,`0x`+mp.toString(16)}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gp=`RestConnection`,_p={BatchGetDocuments:`batchGet`,Commit:`commit`,RunQuery:`runQuery`,RunAggregationQuery:`runAggregationQuery`},vp=class{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?`https`:`http`,n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+`://`+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===el?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,i){let a=hp(),o=this.zo(e,t.toUriEncodedString());N(gp,`Sending RPC '${e}' ${a}:`,o,n);let s={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(s,r,i);let{host:c}=new URL(o),l=te(c);return this.Jo(e,o,s,n,l).then((t=>(N(gp,`Received RPC '${e}' ${a}: `,t),t)),(t=>{throw Ps(gp,`RPC '${e}' ${a} failed with error: `,t,`url: `,o,`request:`,n),t}))}Ho(e,t,n,r,i,a){return this.Go(e,t,n,r,i)}jo(e,t,n){e[`X-Goog-Api-Client`]=function(){return`gl-js/ fire/`+As}(),e[`Content-Type`]=`text/plain`,this.databaseInfo.appId&&(e[`X-Firebase-GMPID`]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}zo(e,t){let n=_p[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}},yp=class{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}},bp=`WebChannelConnection`,xp=class extends vp{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,i){let a=hp();return new Promise(((i,o)=>{let s=new bs;s.setWithCredentials(!0),s.listenOnce(Ss.COMPLETE,(()=>{try{switch(s.getLastErrorCode()){case Cs.NO_ERROR:let t=s.getResponseJson();N(bp,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(t)),i(t);break;case Cs.TIMEOUT:N(bp,`RPC '${e}' ${a} timed out`),o(new R(L.DEADLINE_EXCEEDED,`Request time out`));break;case Cs.HTTP_ERROR:let n=s.getStatus();if(N(bp,`RPC '${e}' ${a} failed with status:`,n,`response text:`,s.getResponseText()),n>0){let e=s.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=e?.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,`-`);return Object.values(L).indexOf(t)>=0?t:L.UNKNOWN}(t.status);o(new R(e,t.message))}else o(new R(L.UNKNOWN,`Server responded with status `+s.getStatus()))}else o(new R(L.UNAVAILABLE,`Connection failed.`));break;default:P(9055,{l_:e,streamId:a,h_:s.getLastErrorCode(),P_:s.getLastError()})}}finally{N(bp,`RPC '${e}' ${a} completed.`)}}));let c=JSON.stringify(r);N(bp,`RPC '${e}' ${a} sending request:`,r),s.send(t,`POST`,c,n,15)}))}T_(e,t,n){let r=hp(),i=[this.Uo,`/`,`google.firestore.v1.Firestore`,`/`,e,`/channel`],a=Ds(),o=Es(),s={httpSessionIdParam:`gsessionid`,initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(s.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(s.useFetchStreams=!0),this.jo(s.initMessageHeaders,t,n),s.encodeInitMessageHeaders=!0;let l=i.join(``);N(bp,`Creating RPC '${e}' stream ${r}: ${l}`,s);let u=a.createWebChannel(l,s);this.I_(u);let d=!1,f=!1,p=new yp({Yo:t=>{f?N(bp,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(d||=(N(bp,`Opening RPC '${e}' stream ${r} transport.`),u.open(),!0),N(bp,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},Zo:()=>u.close()}),m=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return m(u,xs.EventType.OPEN,(()=>{f||(N(bp,`RPC '${e}' stream ${r} transport opened.`),p.o_())})),m(u,xs.EventType.CLOSE,(()=>{f||(f=!0,N(bp,`RPC '${e}' stream ${r} transport closed`),p.a_(),this.E_(u))})),m(u,xs.EventType.ERROR,(t=>{f||(f=!0,Ps(bp,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,`Message:`,t.message),p.a_(new R(L.UNAVAILABLE,`The operation could not be completed`)))})),m(u,xs.EventType.MESSAGE,(t=>{if(!f){let n=t.data[0];F(!!n,16349);let i=n,a=i?.error||i[0]?.error;if(a){N(bp,`RPC '${e}' stream ${r} received error:`,a);let t=a.status,n=function(e){let t=Z[e];if(t!==void 0)return md(t)}(t),i=a.message;n===void 0&&(n=L.INTERNAL,i=`Unknown error status: `+t+` with message `+a.message),f=!0,p.a_(new R(n,i)),u.close()}else N(bp,`RPC '${e}' stream ${r} received:`,n),p.u_(n)}})),m(o,Ts.STAT_EVENT,(t=>{t.stat===ws.PROXY?N(bp,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===ws.NOPROXY&&N(bp,`RPC '${e}' stream ${r} detected no buffering proxy`)})),setTimeout((()=>{p.__()}),0),p}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}};function Sp(){return typeof document<`u`?document:null}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Cp(e){return new Pd(e,!0)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var wp=class{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();let t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&N(`ExponentialBackoff`,`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}},Tp=`PersistentStream`,Ep=class{constructor(e,t,n,r,i,a,o,s){this.Mi=e,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=o,this.listener=s,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new wp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state===4?this.N_():this.auth()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&=(this.C_.cancel(),null)}U_(){this.v_&&=(this.v_.cancel(),null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e===4?t&&t.code===L.RESOURCE_EXHAUSTED?(Ns(t.toString()),Ns(`Using maximum backoff delay to prevent overloading the backend.`),this.M_.g_()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()):this.M_.reset(),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;let e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.D_===t&&this.G_(e,n)}),(t=>{e((()=>{let e=new R(L.UNKNOWN,`Fetching auth token failed: `+t.message);return this.z_(e)}))}))}G_(e,t){let n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((e=>{n((()=>this.z_(e)))})),this.stream.onMessage((e=>{n((()=>++this.F_==1?this.J_(e):this.onNext(e)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(Tp,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(N(Tp,`stream callback skipped by getCloseGuardedDispatcher.`),Promise.resolve())))}}},Dp=class extends Ep{constructor(e,t,n,r,i,a){super(e,`listen_stream_connection_backoff`,`listen_stream_idle`,`health_check_timeout`,t,n,r,a),this.serializer=i}j_(e,t){return this.connection.T_(`Listen`,e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();let t=Xd(this.serializer,e),n=function(e){if(!(`targetChange`in e))return W.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?W.min():t.readTime?zd(t.readTime):W.min()}(e);return this.listener.H_(t,n)}Y_(e){let t={};t.database=qd(this.serializer),t.addTarget=function(e,t){let n,r=t.target;if(n=$l(r)?{documents:$d(e,r)}:{query:ef(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Ld(e,t.resumeToken);let r=Fd(e,t.expectedCount);r!==null&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(W.min())>0){n.readTime=Id(e,t.snapshotVersion.toTimestamp());let r=Fd(e,t.expectedCount);r!==null&&(n.expectedCount=r)}return n}(this.serializer,e);let n=nf(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){let t={};t.database=qd(this.serializer),t.removeTarget=e,this.q_(t)}},Op=class extends Ep{constructor(e,t,n,r,i,a){super(e,`write_stream_connection_backoff`,`write_stream_idle`,`health_check_timeout`,t,n,r,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_(`Write`,e,t)}J_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();let t=Qd(e.writeResults,e.commitTime),n=zd(e.commitTime);return this.listener.na(n,t)}ra(){let e={};e.database=qd(this.serializer),this.q_(e)}ea(e){let t={streamToken:this.lastStreamToken,writes:e.map((e=>Zd(this.serializer,e)))};this.q_(t)}},kp=class{},Ap=class extends kp{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new R(L.FAILED_PRECONDITION,`The client has already been terminated.`)}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(e,Vd(t,n),r,i,a))).catch((e=>{throw e.name===`FirebaseError`?(e.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new R(L.UNKNOWN,e.toString())}))}Ho(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,o])=>this.connection.Ho(e,Vd(t,n),r,a,o,i))).catch((e=>{throw e.name===`FirebaseError`?(e.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new R(L.UNKNOWN,e.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}},jp=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state=`Unknown`,this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca(`Unknown`),this._a=this.asyncQueue.enqueueAfterDelay(`online_state_timeout`,1e4,(()=>(this._a=null,this.la(`Backend didn't respond within 10 seconds.`),this.ca(`Offline`),Promise.resolve()))))}ha(e){this.state===`Online`?this.ca(`Unknown`):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca(`Offline`)))}set(e){this.Pa(),this.oa=0,e===`Online`&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){let t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ns(t),this.aa=!1):N(`OnlineStateTracker`,t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}},Mp=`RemoteStore`,Np=class{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((e=>{n.enqueueAndForget((async()=>{Hp(this)&&(N(Mp,`Restarting streams for network reachability change.`),await async function(e){let t=I(e);t.Ea.add(4),await Fp(t),t.Ra.set(`Unknown`),t.Ea.delete(4),await Pp(t)}(this))}))})),this.Ra=new jp(n,r)}};async function Pp(e){if(Hp(e))for(let t of e.da)await t(!0)}async function Fp(e){for(let t of e.da)await t(!1)}function Ip(e,t){let n=I(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),Vp(n)?Bp(n):sm(n).O_()&&Rp(n,t))}function Lp(e,t){let n=I(e),r=sm(n);n.Ia.delete(t),r.O_()&&zp(n,t),n.Ia.size===0&&(r.O_()?r.L_():Hp(n)&&n.Ra.set(`Unknown`))}function Rp(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(W.min())>0){let n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}sm(e).Y_(t)}function zp(e,t){e.Va.Ue(t),sm(e).Z_(t)}function Bp(e){e.Va=new Od({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),sm(e).start(),e.Ra.ua()}function Vp(e){return Hp(e)&&!sm(e).x_()&&e.Ia.size>0}function Hp(e){return I(e).Ea.size===0}function Up(e){e.Va=void 0}async function Wp(e){e.Ra.set(`Online`)}async function Gp(e){e.Ia.forEach(((t,n)=>{Rp(e,t)}))}async function Kp(e,t){Up(e),Vp(e)?(e.Ra.ha(t),Bp(e)):e.Ra.set(`Unknown`)}async function qp(e,t,n){if(e.Ra.set(`Online`),t instanceof Ed&&t.state===2&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))}(e,t)}catch(n){N(Mp,`Failed to remove targets %s: %s `,t.targetIds.join(`,`),n),await Jp(e,n)}else if(t instanceof wd?e.Va.Ze(t):t instanceof Td?e.Va.st(t):e.Va.tt(t),!n.isEqual(W.min()))try{let t=await tp(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.Va.Tt(t);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.Ia.get(r);i&&e.Ia.set(r,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach(((t,n)=>{let r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(Hc.EMPTY_BYTE_STRING,r.snapshotVersion)),zp(e,t);let i=new mf(r.target,t,n,r.sequenceNumber);Rp(e,i)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){N(Mp,`Failed to raise snapshot:`,t),await Jp(e,t)}}async function Jp(e,t,n){if(!wc(t))throw t;e.Ea.add(1),await Fp(e),e.Ra.set(`Offline`),n||=()=>tp(e.localStore),e.asyncQueue.enqueueRetryable((async()=>{N(Mp,`Retrying IndexedDB access`),await n(),e.Ea.delete(1),await Pp(e)}))}function Yp(e,t){return t().catch((n=>Jp(e,n,t)))}async function Xp(e){let t=I(e),n=cm(t),r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Ec;for(;Zp(t);)try{let e=await ip(t.localStore,r);if(e===null){t.Ta.length===0&&n.L_();break}r=e.batchId,Qp(t,e)}catch(e){await Jp(t,e)}$p(t)&&em(t)}function Zp(e){return Hp(e)&&e.Ta.length<10}function Qp(e,t){e.Ta.push(t);let n=cm(e);n.O_()&&n.X_&&n.ea(t.mutations)}function $p(e){return Hp(e)&&!cm(e).x_()&&e.Ta.length>0}function em(e){cm(e).start()}async function tm(e){cm(e).ra()}async function nm(e){let t=cm(e);for(let n of e.Ta)t.ea(n.mutations)}async function rm(e,t,n){let r=e.Ta.shift(),i=ud.from(r,t,n);await Yp(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await Xp(e)}async function im(e,t){t&&cm(e).X_&&await async function(e,t){if(function(e){return pd(e)&&e!==L.ABORTED}(t.code)){let n=e.Ta.shift();cm(e).B_(),await Yp(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await Xp(e)}}(e,t),$p(e)&&em(e)}async function am(e,t){let n=I(e);n.asyncQueue.verifyOperationInProgress(),N(Mp,`RemoteStore received new credentials`);let r=Hp(n);n.Ea.add(3),await Fp(n),r&&n.Ra.set(`Unknown`),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await Pp(n)}async function om(e,t){let n=I(e);t?(n.Ea.delete(2),await Pp(n)):t||(n.Ea.add(2),await Fp(n),n.Ra.set(`Unknown`))}function sm(e){return e.ma||(e.ma=function(e,t,n){let r=I(e);return r.sa(),new Dp(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:Wp.bind(null,e),t_:Gp.bind(null,e),r_:Kp.bind(null,e),H_:qp.bind(null,e)}),e.da.push((async t=>{t?(e.ma.B_(),Vp(e)?Bp(e):e.Ra.set(`Unknown`)):(await e.ma.stop(),Up(e))}))),e.ma}function cm(e){return e.fa||(e.fa=function(e,t,n){let r=I(e);return r.sa(),new Op(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:tm.bind(null,e),r_:im.bind(null,e),ta:nm.bind(null,e),na:rm.bind(null,e)}),e.da.push((async t=>{t?(e.fa.B_(),await Xp(e)):(await e.fa.stop(),e.Ta.length>0&&(N(Mp,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))}))),e.fa}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var lm=class e{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new Ls,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,n,r,i,a){let o=Date.now()+r,s=new e(t,n,o,i,a);return s.start(r),s}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new R(L.CANCELLED,`Operation cancelled`+(e?`: `+e:``))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle===null?Promise.resolve():(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e))))))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function um(e,t){if(Ns(`AsyncQueue`,`${t}: ${e}`),wc(e))return new R(L.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var dm=class e{static emptySet(t){return new e(t.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||V.comparator(t.key,n.key):(e,t)=>V.comparator(e.key,t.key),this.keyedMap=xu(),this.sortedSet=new K(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(t){if(!(t instanceof e)||this.size!==t.size)return!1;let n=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;n.hasNext();){let e=n.getNext().key,t=r.getNext().key;if(!e.isEqual(t))return!1}return!0}toString(){let e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?`DocumentSet ()`:`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(t,n){let r=new e;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=n,r}},fm=class{constructor(){this.ga=new K(V.comparator)}track(e){let t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):P(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){let e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}},pm=class e{constructor(e,t,n,r,i,a,o,s,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=o,this.excludesMetadataChanges=s,this.hasCachedResults=c}static fromInitialDocuments(t,n,r,i,a){let o=[];return n.forEach((e=>{o.push({type:0,doc:e})})),new e(t,n,dm.emptySet(n),o,r,i,!0,!1,a)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&uu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}},mm=class{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}},hm=class{constructor(){this.queries=gm(),this.onlineState=`Unknown`,this.Ca=new Set}terminate(){(function(e,t){let n=I(e),r=n.queries;n.queries=gm(),r.forEach(((e,n)=>{for(let e of n.Sa)e.onError(t)}))})(this,new R(L.ABORTED,`Firestore shutting down`))}};function gm(){return new _u((e=>du(e)),uu)}async function _m(e,t){let n=I(e),r=3,i=t.query,a=n.queries.get(i);a?!a.ba()&&t.Da()&&(r=2):(a=new mm,r=t.Da()?0:1);try{switch(r){case 0:a.wa=await n.onListen(i,!0);break;case 1:a.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){let n=um(e,`Initialization of query '${fu(t.query)}' failed`);t.onError(n);return}n.queries.set(i,a),a.Sa.push(t),t.va(n.onlineState),a.wa&&t.Fa(a.wa)&&xm(n)}async function vm(e,t){let n=I(e),r=t.query,i=3,a=n.queries.get(r);if(a){let e=a.Sa.indexOf(t);e>=0&&(a.Sa.splice(e,1),a.Sa.length===0?i=t.Da()?0:1:!a.ba()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function ym(e,t){let n=I(e),r=!1;for(let e of t){let t=e.query,i=n.queries.get(t);if(i){for(let t of i.Sa)t.Fa(e)&&(r=!0);i.wa=e}}r&&xm(n)}function bm(e,t,n){let r=I(e),i=r.queries.get(t);if(i)for(let e of i.Sa)e.onError(n);r.queries.delete(t)}function xm(e){e.Ca.forEach((e=>{e.next()}))}var Sm,Cm;(Cm=Sm||={}).Ma=`default`,Cm.Cache=`cache`;var wm=class{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState=`Unknown`,this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)n.type!==3&&t.push(n);e=new pm(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;let n=t!==`Offline`;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t===`Offline`)}Ba(e){if(e.docChanges.length>0)return!0;let t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=pm.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Sm.Cache}},Tm=class{constructor(e){this.key=e}},Em=class{constructor(e){this.key=e}},Dm=class{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=X(),this.mutatedKeys=X(),this.eu=hu(e),this.tu=new dm(this.eu)}get nu(){return this.Ya}ru(e,t){let n=t?t.iu:new fm,r=t?t.tu:this.tu,i=t?t.mutatedKeys:this.mutatedKeys,a=r,o=!1,s=this.query.limitType===`F`&&r.size===this.query.limit?r.last():null,c=this.query.limitType===`L`&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((e,t)=>{let l=r.get(e),u=pu(this.query,t)?t:null,d=!!l&&this.mutatedKeys.has(l.key),f=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations),p=!1;l&&u?l.data.isEqual(u.data)?d!==f&&(n.track({type:3,doc:u}),p=!0):this.su(l,u)||(n.track({type:2,doc:u}),p=!0,(s&&this.eu(u,s)>0||c&&this.eu(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),p=!0):l&&!u&&(n.track({type:1,doc:l}),p=!0,(s||c)&&(o=!0)),p&&(u?(a=a.add(u),i=f?i.add(e):i.delete(e)):(a=a.delete(e),i=i.delete(e)))})),this.query.limit!==null)for(;a.size>this.query.limit;){let e=this.query.limitType===`F`?a.last():a.first();a=a.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:a,iu:n,Cs:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){let i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;let a=e.iu.ya();a.sort(((e,t)=>function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return P(20277,{Rt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc))),this.ou(n),r??=!1;let o=t&&!r?this._u():[],s=this.Xa.size===0&&this.current&&!r?1:0,c=s!==this.Za;return this.Za=s,a.length!==0||c?{snapshot:new pm(this.query,e.tu,i,a,e.mutatedKeys,s===0,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&e===`Offline`?(this.current=!1,this.applyChanges({tu:this.tu,iu:new fm,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=e.current)}_u(){if(!this.current)return[];let e=this.Xa;this.Xa=X(),this.tu.forEach((e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))}));let t=[];return e.forEach((e=>{this.Xa.has(e)||t.push(new Em(e))})),this.Xa.forEach((n=>{e.has(n)||t.push(new Tm(n))})),t}cu(e){this.Ya=e.Qs,this.Xa=X();let t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return pm.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}},Om=`SyncEngine`,km=class{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}},Am=class{constructor(e){this.key=e,this.hu=!1}},jm=class{constructor(e,t,n,r,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new _u((e=>du(e)),uu),this.Iu=new Map,this.Eu=new Set,this.du=new K(V.comparator),this.Au=new Map,this.Ru=new Lf,this.Vu={},this.mu=new Map,this.fu=Cf.cr(),this.onlineState=`Unknown`,this.gu=void 0}get isPrimaryClient(){return!0===this.gu}};async function Mm(e,t,n=!0){let r=eh(e),i,a=r.Tu.get(t);return a?(r.sharedClientState.addLocalQueryTarget(a.targetId),i=a.view.lu()):i=await Pm(r,t,n,!0),i}async function Nm(e,t){let n=eh(e);await Pm(n,t,!0,!1)}async function Pm(e,t,n,r){let i=await ap(e.localStore,ou(t)),a=i.targetId,o=e.sharedClientState.addLocalQueryTarget(a,n),s;return r&&(s=await Fm(e,t,a,o===`current`,i.resumeToken)),e.isPrimaryClient&&n&&Ip(e.remoteStore,i),s}async function Fm(e,t,n,r,i){e.pu=(t,n,r)=>async function(e,t,n,r){let i=t.view.ru(n);i.Cs&&(i=await sp(e.localStore,t.query,!1).then((({documents:e})=>t.view.ru(e,i))));let a=r&&r.targetChanges.get(t.targetId),o=r&&r.targetMismatches.get(t.targetId)!=null,s=t.view.applyChanges(i,e.isPrimaryClient,a,o);return Jm(e,t.targetId,s.au),s.snapshot}(e,t,n,r);let a=await sp(e.localStore,t,!0),o=new Dm(t,a.Qs),s=o.ru(a.documents),c=Cd.createSynthesizedTargetChangeForCurrentChange(n,r&&e.onlineState!==`Offline`,i),l=o.applyChanges(s,e.isPrimaryClient,c);Jm(e,n,l.au);let u=new km(t,n,o);return e.Tu.set(t,u),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),l.snapshot}async function Im(e,t,n){let r=I(e),i=r.Tu.get(t),a=r.Iu.get(i.targetId);if(a.length>1)return r.Iu.set(i.targetId,a.filter((e=>!uu(e,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await op(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Lp(r.remoteStore,i.targetId),Km(r,i.targetId)})).catch(Sc)):(Km(r,i.targetId),await op(r.localStore,i.targetId,!0))}async function Lm(e,t){let n=I(e),r=n.Tu.get(t),i=n.Iu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Lp(n.remoteStore,r.targetId))}async function Rm(e,t,n){let r=th(e);try{let e=await function(e,t){let n=I(e),r=U.now(),i=t.reduce(((e,t)=>e.add(t.key)),X()),a,o;return n.persistence.runTransaction(`Locally write mutations`,`readwrite`,(e=>{let s=yu(),c=X();return n.Ns.getEntries(e,i).next((e=>{s=e,s.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,s))).next((i=>{a=i;let o=[];for(let e of t){let t=ed(e,a.get(e.key).overlayedDocument);t!=null&&o.push(new rd(e.key,t,El(t.value.mapValue),Ju.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)})).next((t=>{o=t;let r=t.applyToLocalDocumentSet(a,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)}))})).then((()=>({batchId:o.batchId,changes:Su(a)})))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||=new K(z),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r}(r,e.batchId,n),await Zm(r,e.changes),await Xp(r.remoteStore)}catch(e){let t=um(e,`Failed to persist write`);n.reject(t)}}async function zm(e,t){let n=I(e);try{let e=await np(n.localStore,t);t.targetChanges.forEach(((e,t)=>{let r=n.Au.get(t);r&&(F(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?F(r.hu,14607):e.removedDocuments.size>0&&(F(r.hu,42227),r.hu=!1))})),await Zm(n,e,t)}catch(e){await Sc(e)}}function Bm(e,t,n){let r=I(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){let e=[];r.Tu.forEach(((n,r)=>{let i=r.view.va(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){let n=I(e);n.onlineState=t;let r=!1;n.queries.forEach(((e,n)=>{for(let e of n.Sa)e.va(t)&&(r=!0)})),r&&xm(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Vm(e,t,n){let r=I(e);r.sharedClientState.updateQueryState(t,`rejected`,n);let i=r.Au.get(t),a=i&&i.key;if(a){let e=new K(V.comparator);e=e.insert(a,Dl.newNoDocument(a,W.min()));let n=X().add(a),i=new Sd(W.min(),new Map,new K(z),e,n);await zm(r,i),r.du=r.du.remove(a),r.Au.delete(t),Xm(r)}else await op(r.localStore,t,!1).then((()=>Km(r,t,n))).catch(Sc)}async function Hm(e,t){let n=I(e),r=t.batch.batchId;try{let e=await ep(n.localStore,t);Gm(n,r,null),Wm(n,r),n.sharedClientState.updateMutationState(r,`acknowledged`),await Zm(n,e)}catch(e){await Sc(e)}}async function Um(e,t,n){let r=I(e);try{let e=await function(e,t){let n=I(e);return n.persistence.runTransaction(`Reject batch`,`readwrite-primary`,(e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(F(t!==null,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r))).next((()=>n.localDocuments.getDocuments(e,r)))}))}(r.localStore,t);Gm(r,t,n),Wm(r,t),r.sharedClientState.updateMutationState(t,`rejected`,n),await Zm(r,e)}catch(e){await Sc(e)}}function Wm(e,t){(e.mu.get(t)||[]).forEach((e=>{e.resolve()})),e.mu.delete(t)}function Gm(e,t,n){let r=I(e),i=r.Vu[r.currentUser.toKey()];if(i){let e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.Vu[r.currentUser.toKey()]=i}}function Km(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(let r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach((t=>{e.Ru.containsKey(t)||qm(e,t)}))}function qm(e,t){e.Eu.delete(t.path.canonicalString());let n=e.du.get(t);n!==null&&(Lp(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),Xm(e))}function Jm(e,t,n){for(let r of n)r instanceof Tm?(e.Ru.addReference(r.key,t),Ym(e,r)):r instanceof Em?(N(Om,`Document no longer in limbo: `+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||qm(e,r.key)):P(19791,{wu:r})}function Ym(e,t){let n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(N(Om,`New document in limbo: `+n),e.Eu.add(r),Xm(e))}function Xm(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){let t=e.Eu.values().next().value;e.Eu.delete(t);let n=new V(B.fromString(t)),r=e.fu.next();e.Au.set(r,new Am(n)),e.du=e.du.insert(n,r),Ip(e.remoteStore,new mf(ou(nu(n.path)),r,`TargetPurposeLimboResolution`,Tc.ce))}}async function Zm(e,t,n){let r=I(e),i=[],a=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((e,s)=>{o.push(r.pu(s,t,n).then((e=>{if((e||n)&&r.isPrimaryClient){let t=e?!e.fromCache:n?.targetChanges.get(s.targetId)?.current;r.sharedClientState.updateQueryState(s.targetId,t?`current`:`not-current`)}if(e){i.push(e);let t=Kf.As(s.targetId,e);a.push(t)}})))})),await Promise.all(o),r.Pu.H_(i),await async function(e,t){let n=I(e);try{await n.persistence.runTransaction(`notifyLocalViewChanges`,`readwrite`,(e=>G.forEach(t,(t=>G.forEach(t.Es,(r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r))).next((()=>G.forEach(t.ds,(r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))))))}catch(e){if(!wc(e))throw e;N(Yf,`Failed to update sequence numbers: `+e)}for(let e of t){let t=e.targetId;if(!e.fromCache){let e=n.Ms.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(t,i)}}}(r.localStore,a))}async function Qm(e,t){let n=I(e);if(!n.currentUser.isEqual(t)){N(Om,`User change. New user:`,t.toKey());let e=await $f(n.localStore,t);n.currentUser=t,function(e,t){e.mu.forEach((e=>{e.forEach((e=>{e.reject(new R(L.CANCELLED,t))}))})),e.mu.clear()}(n,`'waitForPendingWrites' promise is rejected due to a user change.`),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Zm(n,e.Ls)}}function $m(e,t){let n=I(e),r=n.Au.get(t);if(r&&r.hu)return X().add(r.key);{let e=X(),r=n.Iu.get(t);if(!r)return e;for(let t of r){let r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function eh(e){let t=I(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=zm.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=$m.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Vm.bind(null,t),t.Pu.H_=ym.bind(null,t.eventManager),t.Pu.yu=bm.bind(null,t.eventManager),t}function th(e){let t=I(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Hm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Um.bind(null,t),t}var nh=class{constructor(){this.kind=`memory`,this.synchronizeTabs=!1}async initialize(e){this.serializer=Cp(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Qf(this.persistence,new Jf,e.initialUser,this.serializer)}Cu(e){return new Hf(Wf.mi,this.serializer)}Du(e){return new up}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};nh.provider={build:()=>new nh};var rh=class extends nh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof Gf,46915);let n=this.persistence.referenceDelegate.garbageCollector;return new Of(n,e.asyncQueue,t)}Cu(e){let t=this.cacheSizeBytes===void 0?Sf.DEFAULT:Sf.withCacheSize(this.cacheSizeBytes);return new Hf((e=>Gf.mi(e,t)),this.serializer)}},ih=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Bm(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Qm.bind(null,this.syncEngine),await om(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new hm}()}createDatastore(e){let t=Cp(e.databaseInfo.databaseId),n=function(e){return new xp(e)}(e.databaseInfo);return function(e,t,n,r){return new Ap(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,i){return new Np(e,t,n,r,i)}(this.localStore,this.datastore,e.asyncQueue,(e=>Bm(this.syncEngine,e,0)),function(){return pp.v()?new pp:new dp}())}createSyncEngine(e,t){return function(e,t,n,r,i,a,o){let s=new jm(e,t,n,r,i,a);return o&&(s.gu=!0),s}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){let t=I(e);N(Mp,`RemoteStore shutting down.`),t.Ea.add(5),await Fp(t),t.Aa.shutdown(),t.Ra.set(`Unknown`)}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};ih.provider={build:()=>new ih};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ah=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ns(`Uncaught Error in snapshot listener:`,e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}},oh=`FirestoreClient`,sh=class{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=M.UNAUTHENTICATED,this.clientId=qs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async e=>{N(oh,`Received user=`,e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>(N(oh,`Received new app check token=`,e),this.appCheckCredentialListener(e,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ls;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let n=um(t,`Failed to shutdown persistence`);e.reject(n)}})),e.promise}};async function ch(e,t){e.asyncQueue.verifyOperationInProgress(),N(oh,`Initializing OfflineComponentProvider`);let n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async e=>{r.isEqual(e)||(await $f(t.localStore,e),r=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function lh(e,t){e.asyncQueue.verifyOperationInProgress();let n=await uh(e);N(oh,`Initializing OnlineComponentProvider`),await t.initialize(n,e.configuration),e.setCredentialChangeListener((e=>am(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>am(t.remoteStore,n))),e._onlineComponents=t}async function uh(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){N(oh,`Using user provided OfflineComponentProvider`);try{await ch(e,e._uninitializedComponentsProvider._offline)}catch(t){let n=t;if(!function(e){return e.name===`FirebaseError`?e.code===L.FAILED_PRECONDITION||e.code===L.UNIMPLEMENTED:!(typeof DOMException<`u`&&e instanceof DOMException)||e.code===22||e.code===20||e.code===11}(n))throw n;Ps(`Error using user provided cache. Falling back to memory cache: `+n),await ch(e,new nh)}}else N(oh,`Using default OfflineComponentProvider`),await ch(e,new rh(void 0));return e._offlineComponents}async function dh(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(N(oh,`Using user provided OnlineComponentProvider`),await lh(e,e._uninitializedComponentsProvider._online)):(N(oh,`Using default OnlineComponentProvider`),await lh(e,new ih))),e._onlineComponents}function fh(e){return dh(e).then((e=>e.syncEngine))}async function ph(e){let t=await dh(e),n=t.eventManager;return n.onListen=Mm.bind(null,t.syncEngine),n.onUnlisten=Im.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Nm.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=Lm.bind(null,t.syncEngine),n}function mh(e,t,n={}){let r=new Ls;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){let a=new ah({next:n=>{a.Nu(),t.enqueueAndForget((()=>vm(e,o))),n.fromCache&&r.source===`server`?i.reject(new R(L.UNAVAILABLE,`Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)`)):i.resolve(n)},error:e=>i.reject(e)}),o=new wm(n,a,{includeMetadataChanges:!0,qa:!0});return _m(e,o)}(await ph(e),e.asyncQueue,t,n,r))),r.promise}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function hh(e){let t={};return e.timeoutSeconds!==void 0&&(t.timeoutSeconds=e.timeoutSeconds),t}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gh=new Map,_h=`firestore.googleapis.com`,vh=!0,yh=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new R(L.INVALID_ARGUMENT,`Can't provide ssl option if host option is not set`);this.host=_h,this.ssl=vh}else this.host=e.host,this.ssl=e.ssl??vh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=xf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Tf)throw new R(L.INVALID_ARGUMENT,`cacheSizeBytes must be at least 1048576`);this.cacheSizeBytes=e.cacheSizeBytes}ic(`experimentalForceLongPolling`,e.experimentalForceLongPolling,`experimentalAutoDetectLongPolling`,e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hh(e.experimentalLongPollingOptions??{}),function(e){if(e.timeoutSeconds!==void 0){if(isNaN(e.timeoutSeconds))throw new R(L.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new R(L.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new R(L.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},bh=class{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type=`firestore-lite`,this._persistenceKey=`(lite)`,this._settings=new yh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask=`notTerminated`}get app(){if(!this._app)throw new R(L.FAILED_PRECONDITION,`Firestore was not initialized using the Firebase SDK. 'app' is not available`);return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==`notTerminated`}_setSettings(e){if(this._settingsFrozen)throw new R(L.FAILED_PRECONDITION,`Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.`);this._settings=new yh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(e){if(!e)return new zs;switch(e.type){case`firstParty`:return new Us(e.sessionIndex||`0`,e.iamToken||null,e.authTokenFactory||null);case`provider`:return e.client;default:throw new R(L.INVALID_ARGUMENT,`makeAuthCredentialsProvider failed due to invalid credential type`)}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask===`notTerminated`&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask===`notTerminated`?await this._terminate():this._terminateTask=`notTerminated`}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=gh.get(e);t&&(N(`ComponentProvider`,`Removing Datastore`),gh.delete(e),t.terminate())}(this),Promise.resolve()}};function xh(e,t,n,r={}){e=lc(e,bh);let i=te(t),a=e._getSettings(),o={...a,emulatorOptions:e._getEmulatorOptions()},s=`${t}:${n}`;i&&(ne(`https://${s}`),ce(`Firestore`,!0)),a.host!==_h&&a.host!==s&&Ps(`Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.`);let c={...a,host:s,ssl:i,emulatorOptions:r};if(!we(c,o)&&(e._setSettings(c),r.mockUserToken)){let t,n;if(typeof r.mockUserToken==`string`)t=r.mockUserToken,n=M.MOCK_USER;else{t=re(r.mockUserToken,e._app?.options.projectId);let i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new R(L.INVALID_ARGUMENT,`mockUserToken must contain 'sub' or 'user_id' field!`);n=new M(i)}e._authCredentials=new Bs(new Rs(t,n))}}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Sh=class e{constructor(e,t,n){this.converter=t,this._query=n,this.type=`query`,this.firestore=e}withConverter(t){return new e(this.firestore,t,this._query)}},Ch=class e{constructor(e,t,n){this.converter=t,this._key=n,this.type=`document`,this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wh(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new e(this.firestore,t,this._key)}toJSON(){return{type:e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,n,r){if(dc(n,e._jsonSchema))return new e(t,r||null,new V(B.fromString(n.referencePath)))}};Ch._jsonSchemaVersion=`firestore/documentReference/1.0`,Ch._jsonSchema={type:H(`string`,Ch._jsonSchemaVersion),referencePath:H(`string`)};var wh=class e extends Sh{constructor(e,t,n){super(e,t,nu(n)),this._path=n,this.type=`collection`}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Ch(this.firestore,null,new V(e))}withConverter(t){return new e(this.firestore,t,this._path)}};function Th(e,t,...n){if(e=b(e),rc(`collection`,`path`,t),e instanceof bh){let r=B.fromString(t,...n);return oc(r),new wh(e,null,r)}{if(!(e instanceof Ch||e instanceof wh))throw new R(L.INVALID_ARGUMENT,`Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore`);let r=e._path.child(B.fromString(t,...n));return oc(r),new wh(e.firestore,null,r)}}function Eh(e,t,...n){if(e=b(e),arguments.length===1&&(t=qs.newId()),rc(`doc`,`path`,t),e instanceof bh){let r=B.fromString(t,...n);return ac(r),new Ch(e,null,new V(r))}{if(!(e instanceof Ch||e instanceof wh))throw new R(L.INVALID_ARGUMENT,`Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore`);let r=e._path.child(B.fromString(t,...n));return ac(r),new Ch(e.firestore,e instanceof wh?e.converter:null,new V(r))}}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Dh=`AsyncQueue`,Oh=class{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new wp(this,`async_queue_retry`),this._c=()=>{let e=Sp();e&&N(Dh,`Visibility state changed to `+e.visibilityState),this.M_.w_()},this.ac=e;let t=Sp();t&&typeof t.addEventListener==`function`&&t.addEventListener(`visibilitychange`,this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;let t=Sp();t&&typeof t.removeEventListener==`function`&&t.removeEventListener(`visibilitychange`,this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));let t=new Ls;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!wc(e))throw e;N(Dh,`Operation failed with retryable error: `+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){let t=this.ac.then((()=>(this.rc=!0,e().catch((e=>{throw this.nc=e,this.rc=!1,Ns(`INTERNAL UNHANDLED ERROR: `,kh(e)),e})).then((e=>(this.rc=!1,e))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);let r=lm.createAndSchedule(this,e,t,n,(e=>this.hc(e)));return this.tc.push(r),r}uc(){this.nc&&P(47125,{Pc:kh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(let t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(let t of this.tc)if(t.skipDelay(),e!==`all`&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){let t=this.tc.indexOf(e);this.tc.splice(t,1)}};function kh(e){let t=e.message||``;return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+`
`+e.stack),t}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ah(e){return function(e,t){if(typeof e!=`object`||!e)return!1;let n=e;for(let e of t)if(e in n&&typeof n[e]==`function`)return!0;return!1}(e,[`next`,`error`,`complete`])}var jh=class extends bh{constructor(e,t,n,r){super(e,t,n,r),this.type=`firestore`,this._queue=new Oh,this._persistenceKey=r?.name||`[DEFAULT]`}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Oh(e),this._firestoreClient=void 0,await e}}};function Mh(e,t){let n=typeof e==`object`?e:on(),r=typeof e==`string`?e:t||el,i=en(n,`firestore`).getImmediate({identifier:r});if(!i._initialized){let e=m(`firestore`);e&&xh(i,...e)}return i}function Nh(e){if(e._terminated)throw new R(L.FAILED_PRECONDITION,`The client has already been terminated.`);return e._firestoreClient||Ph(e),e._firestoreClient}function Ph(e){let t=e._freezeSettings(),n=function(e,t,n,r){return new $c(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,hh(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator)}(e._databaseId,e._app?.options.appId||``,e._persistenceKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new sh(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){let t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Fh=class e{constructor(e){this._byteString=e}static fromBase64String(t){try{return new e(Hc.fromBase64String(t))}catch(e){throw new R(L.INVALID_ARGUMENT,`Failed to construct data from Base64 string: `+e)}}static fromUint8Array(t){return new e(Hc.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return`Bytes(base64: `+this.toBase64()+`)`}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:e._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(dc(t,e._jsonSchema))return e.fromBase64String(t.bytes)}};Fh._jsonSchemaVersion=`firestore/bytes/1.0`,Fh._jsonSchema={type:H(`string`,Fh._jsonSchemaVersion),bytes:H(`string`)};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ih=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new R(L.INVALID_ARGUMENT,`Invalid field name at argument $(i + 1). Field names must not be empty.`);this._internalPath=new nc(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}},Lh=class{constructor(e){this._methodName=e}},Rh=class e{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new R(L.INVALID_ARGUMENT,`Latitude must be a number between -90 and 90, but was: `+e);if(!isFinite(t)||t<-180||t>180)throw new R(L.INVALID_ARGUMENT,`Longitude must be a number between -180 and 180, but was: `+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:e._jsonSchemaVersion}}static fromJSON(t){if(dc(t,e._jsonSchema))return new e(t.latitude,t.longitude)}};Rh._jsonSchemaVersion=`firestore/geoPoint/1.0`,Rh._jsonSchema={type:H(`string`,Rh._jsonSchemaVersion),latitude:H(`number`),longitude:H(`number`)};
/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var zh=class e{constructor(e){this._values=(e||[]).map((e=>e))}toArray(){return this._values.map((e=>e))}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:e._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(dc(t,e._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e==`number`)))return new e(t.vectorValues);throw new R(L.INVALID_ARGUMENT,`Expected 'vectorValues' field to be a number array`)}}};zh._jsonSchemaVersion=`firestore/vectorValue/1.0`,zh._jsonSchema={type:H(`string`,zh._jsonSchemaVersion),vectorValues:H(`object`)};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bh=/^__.*__$/,Vh=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask===null?new nd(e,this.data,t,this.fieldTransforms):new rd(e,this.data,this.fieldMask,t,this.fieldTransforms)}},Hh=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new rd(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Uh(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw P(40011,{Ac:e})}}var Wh=class e{constructor(e,t,n,r,i,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new e({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){let t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){let t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return og(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc(`Document fields must not be empty`);if(Uh(this.Ac)&&Bh.test(e))throw this.Sc(`Document fields cannot begin and end with "__"`)}},Gh=class{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Cp(e)}Cc(e,t,n,r=!1){return new Wh({Ac:e,methodName:t,Dc:n,path:nc.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Kh(e){let t=e._freezeSettings(),n=Cp(e._databaseId);return new Gh(e._databaseId,!!t.ignoreUndefinedProperties,n)}function qh(e,t,n,r,i,a={}){let o=e.Cc(a.merge||a.mergeFields?2:0,t,n,i);ng(`Data must be an object, but it was:`,o,r);let s=eg(r,o),c,l;if(a.merge)c=new Bc(o.fieldMask),l=o.fieldTransforms;else if(a.mergeFields){let e=[];for(let r of a.mergeFields){let i=rg(t,r,n);if(!o.contains(i))throw new R(L.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);sg(e,i)||e.push(i)}c=new Bc(e),l=o.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,l=o.fieldTransforms;return new Vh(new Tl(s),c,l)}var Jh=class e extends Lh{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(t){return t instanceof e}},Yh=class e extends Lh{_toFieldTransform(e){return new Gu(e.path,new Lu)}isEqual(t){return t instanceof e}};function Xh(e,t,n,r){let i=e.Cc(1,t,n);ng(`Data must be an object, but it was:`,i,r);let a=[],o=Tl.empty();Fc(r,((e,r)=>{let s=ag(t,e,n);r=b(r);let c=i.yc(s);if(r instanceof Jh)a.push(s);else{let e=$h(r,c);e!=null&&(a.push(s),o.set(s,e))}}));let s=new Bc(a);return new Hh(o,s,i.fieldTransforms)}function Zh(e,t,n,r,i,a){let o=e.Cc(1,t,n),s=[rg(t,r,n)],c=[i];if(a.length%2!=0)throw new R(L.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<a.length;e+=2)s.push(rg(t,a[e])),c.push(a[e+1]);let l=[],u=Tl.empty();for(let e=s.length-1;e>=0;--e)if(!sg(l,s[e])){let t=s[e],n=c[e];n=b(n);let r=o.yc(t);if(n instanceof Jh)l.push(t);else{let e=$h(n,r);e!=null&&(l.push(t),u.set(t,e))}}let d=new Bc(l);return new Hh(u,d,o.fieldTransforms)}function Qh(e,t,n,r=!1){return $h(n,e.Cc(r?4:3,t))}function $h(e,t){if(tg(e=b(e)))return ng(`Unsupported field value:`,t,e),eg(e,t);if(e instanceof Lh)return function(e,t){if(!Uh(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc(`Nested arrays are not supported`);return function(e,t){let n=[],r=0;for(let i of e){let e=$h(i,t.wc(r));e??={nullValue:`NULL_VALUE`},n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if((e=b(e))===null)return{nullValue:`NULL_VALUE`};if(typeof e==`number`)return Mu(t.serializer,e);if(typeof e==`boolean`)return{booleanValue:e};if(typeof e==`string`)return{stringValue:e};if(e instanceof Date){let n=U.fromDate(e);return{timestampValue:Id(t.serializer,n)}}if(e instanceof U){let n=new U(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Id(t.serializer,n)}}if(e instanceof Rh)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Fh)return{bytesValue:Ld(t.serializer,e._byteString)};if(e instanceof Ch){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Bd(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof zh)return function(e,t){return{mapValue:{fields:{[nl]:{stringValue:al},[ol]:{arrayValue:{values:e.toArray().map((e=>{if(typeof e!=`number`)throw t.Sc(`VectorValues must only contain numeric values.`);return Au(t.serializer,e)}))}}}}}}(e,t);throw t.Sc(`Unsupported field value: ${cc(e)}`)}(e,t)}function eg(e,t){let n={};return Ic(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Fc(e,((e,r)=>{let i=$h(r,t.mc(e));i!=null&&(n[e]=i)})),{mapValue:{fields:n}}}function tg(e){return!(typeof e!=`object`||!e||e instanceof Array||e instanceof Date||e instanceof U||e instanceof Rh||e instanceof Fh||e instanceof Ch||e instanceof Lh||e instanceof zh)}function ng(e,t,n){if(!tg(n)||!sc(n)){let r=cc(n);throw r===`an object`?t.Sc(e+` a custom object`):t.Sc(e+` `+r)}}function rg(e,t,n){if((t=b(t))instanceof Ih)return t._internalPath;if(typeof t==`string`)return ag(e,t);throw og(`Field path arguments must be of type string or `,e,!1,void 0,n)}var ig=RegExp(`[~\\*/\\[\\]]`);function ag(e,t,n){if(t.search(ig)>=0)throw og(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Ih(...t.split(`.`))._internalPath}catch{throw og(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function og(e,t,n,r,i){let a=r&&!r.isEmpty(),o=i!==void 0,s=`Function ${t}() called with invalid data`;n&&(s+=" (via `toFirestore()`)"),s+=`. `;let c=``;return(a||o)&&(c+=` (found`,a&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=`)`),new R(L.INVALID_ARGUMENT,s+e+c)}function sg(e,t){return e.some((e=>e.isEqual(t)))}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var cg=class{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ch(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new lg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(ug(`DocumentSnapshot.get`,e));if(t!==null)return this._userDataWriter.convertValue(t)}}},lg=class extends cg{data(){return super.data()}};function ug(e,t){return typeof t==`string`?ag(e,t):t instanceof Ih?t._internalPath:t._delegate._internalPath}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function dg(e){if(e.limitType===`L`&&e.explicitOrderBy.length===0)throw new R(L.UNIMPLEMENTED,`limitToLast() queries require specifying at least one orderBy() clause`)}var fg=class{},pg=class extends fg{};function mg(e,t,...n){let r=[];t instanceof fg&&r.push(t),r=r.concat(n),function(e){let t=e.filter((e=>e instanceof gg)).length,n=e.filter((e=>e instanceof hg)).length;if(t>1||t>0&&n>0)throw new R(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let t of r)e=t._apply(e);return e}var hg=class e extends pg{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type=`where`}static _create(t,n,r){return new e(t,n,r)}_apply(e){let t=this._parse(e);return Cg(e._query,t),new Sh(e.firestore,e.converter,cu(e._query,t))}_parse(e){let t=Kh(e.firestore);return function(e,t,n,r,i,a,o){let s;if(i.isKeyField()){if(a===`array-contains`||a===`array-contains-any`)throw new R(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${a}' queries on documentId().`);if(a===`in`||a===`not-in`){Sg(o,a);let t=[];for(let n of o)t.push(xg(r,e,n));s={arrayValue:{values:t}}}else s=xg(r,e,o)}else a!==`in`&&a!==`not-in`&&a!==`array-contains-any`||Sg(o,a),s=Qh(n,t,o,a===`in`||a===`not-in`);return Y.create(i,a,s)}(e._query,`where`,t,e.firestore._databaseId,this._field,this._op,this._value)}},gg=class e extends fg{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(t,n){return new e(t,n)}_parse(e){let t=this._queryConstraints.map((t=>t._parse(e))).filter((e=>e.getFilters().length>0));return t.length===1?t[0]:Pl.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(e,t){let n=e,r=t.getFlattenedFilters();for(let e of r)Cg(n,e),n=cu(n,e)}(e._query,t),new Sh(e.firestore,e.converter,cu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type===`and`?`and`:`or`}},_g=class e extends pg{constructor(e,t){super(),this._field=e,this._direction=t,this.type=`orderBy`}static _create(t,n){return new e(t,n)}_apply(e){let t=function(e,t,n){if(e.startAt!==null)throw new R(L.INVALID_ARGUMENT,`Invalid query. You must not call startAt() or startAfter() before calling orderBy().`);if(e.endAt!==null)throw new R(L.INVALID_ARGUMENT,`Invalid query. You must not call endAt() or endBefore() before calling orderBy().`);return new jl(t,n)}(e._query,this._field,this._direction);return new Sh(e.firestore,e.converter,function(e,t){let n=e.explicitOrderBy.concat([t]);return new eu(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}};function vg(e,t=`asc`){let n=t,r=ug(`orderBy`,e);return _g._create(r,n)}var yg=class e extends pg{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(t,n,r){return new e(t,n,r)}_apply(e){return new Sh(e.firestore,e.converter,lu(e._query,this._limit,this._limitType))}};function bg(e){return uc(`limit`,e),yg._create(`limit`,e,`F`)}function xg(e,t,n){if(typeof(n=b(n))==`string`){if(n===``)throw new R(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.`);if(!iu(t)&&n.indexOf(`/`)!==-1)throw new R(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(B.fromString(n));if(!V.isDocumentKey(r))throw new R(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return gl(e,new V(r))}if(n instanceof Ch)return gl(e,n._key);throw new R(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${cc(n)}.`)}function Sg(e,t){if(!Array.isArray(e)||e.length===0)throw new R(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Cg(e,t){let n=function(e,t){for(let n of e)for(let e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case`!=`:return[`!=`,`not-in`];case`array-contains-any`:case`in`:return[`not-in`];case`not-in`:return[`array-contains-any`,`in`,`not-in`,`!=`];default:return[]}}(t.op));if(n!==null)throw n===t.op?new R(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new R(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}var wg=class{convertValue(e,t=`none`){switch(sl(e)){case 0:return null;case 1:return e.booleanValue;case 2:return J(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gc(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw P(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t=`none`){let n={};return Fc(e,((e,r)=>{n[e]=this.convertValue(r,t)})),n}convertVectorValue(e){let t=e.fields?.[ol].arrayValue?.values?.map((e=>J(e.doubleValue)));return new zh(t)}convertGeoPoint(e){return new Rh(J(e.latitude),J(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case`previous`:let n=Zc(e);return n==null?null:this.convertValue(n,t);case`estimate`:return this.convertTimestamp(Qc(e));default:return null}}convertTimestamp(e){let t=Wc(e);return new U(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=B.fromString(e);F(pf(n),9688,{name:e});let r=new tl(n.get(1),n.get(3)),i=new V(n.popFirst(5));return r.isEqual(t)||Ns(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Tg(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}var Eg=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Dg=class e extends cg{constructor(e,t,n,r,i,a){super(e,t,n,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Og(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(ug(`DocumentSnapshot.get`,e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new R(L.FAILED_PRECONDITION,`DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`);let t=this._document,n={};return n.type=e._jsonSchemaVersion,n.bundle=``,n.bundleSource=`DocumentSnapshot`,n.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,`previous`),n.bundle=(this._firestore,this.ref.path,`NOT SUPPORTED`),n)}};Dg._jsonSchemaVersion=`firestore/documentSnapshot/1.0`,Dg._jsonSchema={type:H(`string`,Dg._jsonSchemaVersion),bundleSource:H(`string`,`DocumentSnapshot`),bundleName:H(`string`),bundle:H(`string`)};var Og=class extends Dg{data(e={}){return super.data(e)}},kg=class e{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Eg(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Og(this._firestore,this._userDataWriter,n.key,n,new Eg(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new R(L.INVALID_ARGUMENT,`To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().`);return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map((n=>{let r=new Og(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Eg(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:`added`,doc:r,oldIndex:-1,newIndex:t++}}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter((e=>t||e.type!==3)).map((t=>{let r=new Og(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Eg(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,a=-1;return t.type!==0&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),t.type!==1&&(n=n.add(t.doc),a=n.indexOf(t.doc.key)),{type:Ag(t.type),doc:r,oldIndex:i,newIndex:a}}))}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new R(L.FAILED_PRECONDITION,`QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`);let t={};t.type=e._jsonSchemaVersion,t.bundleSource=`QuerySnapshot`,t.bundleName=qs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let n=[],r=[],i=[];return this.docs.forEach((e=>{e._document!==null&&(n.push(e._document),r.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,`previous`)),i.push(e.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,`NOT SUPPORTED`),t}};function Ag(e){switch(e){case 0:return`added`;case 2:case 3:return`modified`;case 1:return`removed`;default:return P(61501,{type:e})}}kg._jsonSchemaVersion=`firestore/querySnapshot/1.0`,kg._jsonSchema={type:H(`string`,kg._jsonSchemaVersion),bundleSource:H(`string`,`QuerySnapshot`),bundleName:H(`string`),bundle:H(`string`)};var jg=class extends wg{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fh(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ch(this.firestore,null,t)}};function Mg(e){e=lc(e,Sh);let t=lc(e.firestore,jh),n=Nh(t),r=new jg(t);return dg(e._query),mh(n,e._query).then((n=>new kg(t,r,e,n)))}function Ng(e,t,n,...r){e=lc(e,Ch);let i=lc(e.firestore,jh),a=Kh(i),o;return o=typeof(t=b(t))==`string`||t instanceof Ih?Zh(a,`updateDoc`,e._key,t,n,r):Xh(a,`updateDoc`,e._key,t),Lg(i,[o.toMutation(e._key,Ju.exists(!0))])}function Pg(e){return Lg(lc(e.firestore,jh),[new sd(e._key,Ju.none())])}function Fg(e,t){let n=lc(e.firestore,jh),r=Eh(e),i=Tg(e.converter,t);return Lg(n,[qh(Kh(e.firestore),`addDoc`,r._key,i,e.converter!==null,{}).toMutation(r._key,Ju.exists(!1))]).then((()=>r))}function Ig(e,...t){e=b(e);let n={includeMetadataChanges:!1,source:`default`},r=0;typeof t[r]!=`object`||Ah(t[r])||(n=t[r++]);let i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Ah(t[r])){let e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let a,o,s;if(e instanceof Ch)o=lc(e.firestore,jh),s=nu(e._key.path),a={next:n=>{t[r]&&t[r](Rg(o,e,n))},error:t[r+1],complete:t[r+2]};else{let n=lc(e,Sh);o=lc(n.firestore,jh),s=n._query;let i=new jg(o);a={next:e=>{t[r]&&t[r](new kg(o,i,n,e))},error:t[r+1],complete:t[r+2]},dg(e._query)}return function(e,t,n,r){let i=new ah(r),a=new wm(t,i,n);return e.asyncQueue.enqueueAndForget((async()=>_m(await ph(e),a))),()=>{i.Nu(),e.asyncQueue.enqueueAndForget((async()=>vm(await ph(e),a)))}}(Nh(o),s,i,a)}function Lg(e,t){return function(e,t){let n=new Ls;return e.asyncQueue.enqueueAndForget((async()=>Rm(await fh(e),t,n))),n.promise}(Nh(e),t)}function Rg(e,t,n){let r=n.docs.get(t._key),i=new jg(e);return new Dg(e,i,t._key,r,new Eg(n.hasPendingWrites,n.fromCache),t.converter)}function zg(){return new Yh(`serverTimestamp`)}(function(e,t=!0){(function(e){As=e})(rn),$t(new x(`firestore`,((e,{instanceIdentifier:n,options:r})=>{let i=e.getProvider(`app`).getImmediate(),a=new jh(new Vs(e.getProvider(`auth-internal`)),new Gs(i,e.getProvider(`app-check-internal`)),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,[`projectId`]))throw new R(L.INVALID_ARGUMENT,`"projectId" not provided in firebase.initializeApp.`);return new tl(e.options.projectId,t)}(i,n),i);return r={useFetchStreams:t,...r},a._setSettings(r),a}),`PUBLIC`).setMultipleInstances(!0)),E(Os,ks,e),E(Os,ks,`esm2020`)})();
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bg=`firebasestorage.googleapis.com`,Vg=`storageBucket`,Hg=120*1e3,Ug=600*1e3,Wg=class e extends ye{constructor(t,n,r=0){super(Kg(t),`Firebase Storage: ${n} (${Kg(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,e.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Kg(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}},Gg;(function(e){e.UNKNOWN=`unknown`,e.OBJECT_NOT_FOUND=`object-not-found`,e.BUCKET_NOT_FOUND=`bucket-not-found`,e.PROJECT_NOT_FOUND=`project-not-found`,e.QUOTA_EXCEEDED=`quota-exceeded`,e.UNAUTHENTICATED=`unauthenticated`,e.UNAUTHORIZED=`unauthorized`,e.UNAUTHORIZED_APP=`unauthorized-app`,e.RETRY_LIMIT_EXCEEDED=`retry-limit-exceeded`,e.INVALID_CHECKSUM=`invalid-checksum`,e.CANCELED=`canceled`,e.INVALID_EVENT_NAME=`invalid-event-name`,e.INVALID_URL=`invalid-url`,e.INVALID_DEFAULT_BUCKET=`invalid-default-bucket`,e.NO_DEFAULT_BUCKET=`no-default-bucket`,e.CANNOT_SLICE_BLOB=`cannot-slice-blob`,e.SERVER_FILE_WRONG_SIZE=`server-file-wrong-size`,e.NO_DOWNLOAD_URL=`no-download-url`,e.INVALID_ARGUMENT=`invalid-argument`,e.INVALID_ARGUMENT_COUNT=`invalid-argument-count`,e.APP_DELETED=`app-deleted`,e.INVALID_ROOT_OPERATION=`invalid-root-operation`,e.INVALID_FORMAT=`invalid-format`,e.INTERNAL_ERROR=`internal-error`,e.UNSUPPORTED_ENVIRONMENT=`unsupported-environment`})(Gg||={});function Kg(e){return`storage/`+e}function qg(){return new Wg(Gg.UNKNOWN,`An unknown error occurred, please check the error payload for server response.`)}function Jg(){return new Wg(Gg.RETRY_LIMIT_EXCEEDED,`Max retry time for operation exceeded, please try again.`)}function Yg(){return new Wg(Gg.CANCELED,`User canceled the upload/download.`)}function Xg(e){return new Wg(Gg.INVALID_URL,`Invalid URL '`+e+`'.`)}function Zg(e){return new Wg(Gg.INVALID_DEFAULT_BUCKET,`Invalid default bucket '`+e+`'.`)}function Qg(e){return new Wg(Gg.INVALID_ARGUMENT,e)}function $g(){return new Wg(Gg.APP_DELETED,`The Firebase app was deleted.`)}function e_(e){return new Wg(Gg.INVALID_ROOT_OPERATION,`The operation '`+e+`' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').`)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var t_=class e{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){let e=encodeURIComponent;return`/b/`+e(this.bucket)+`/o/`+e(this.path)}bucketOnlyServerUrl(){return`/b/`+encodeURIComponent(this.bucket)+`/o`}static makeFromBucketSpec(t,n){let r;try{r=e.makeFromUrl(t,n)}catch{return new e(t,``)}if(r.path===``)return r;throw Zg(t)}static makeFromUrl(t,n){let r=null,i=`([A-Za-z0-9.\\-_]+)`;function a(e){e.path.charAt(e.path.length-1)===`/`&&(e.path_=e.path_.slice(0,-1))}let o=RegExp(`^gs://`+i+`(/(.*))?$`,`i`),s={bucket:1,path:3};function c(e){e.path_=decodeURIComponent(e.path)}let l=n.replace(/[.]/g,`\\.`),u=RegExp(`^https?://${l}/v[A-Za-z0-9_]+/b/${i}/o(/([^?#]*).*)?\$`,`i`),d={bucket:1,path:3},f=n===Bg?`(?:storage.googleapis.com|storage.cloud.google.com)`:n,p=RegExp(`^https?://${f}/${i}/([^?#]*)`,`i`),m=[{regex:o,indices:s,postModify:a},{regex:u,indices:d,postModify:c},{regex:p,indices:{bucket:1,path:2},postModify:c}];for(let n=0;n<m.length;n++){let i=m[n],a=i.regex.exec(t);if(a){let t=a[i.indices.bucket],n=a[i.indices.path];n||=``,r=new e(t,n),i.postModify(r);break}}if(r==null)throw Xg(t);return r}},n_=class{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function r_(e,t,n){let r=1,i=null,a=null,o=!1,s=0;function c(){return s===2}let l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function d(t){i=setTimeout(()=>{i=null,e(p,c())},t)}function f(){a&&clearTimeout(a)}function p(e,...t){if(l){f();return}if(e){f(),u.call(null,e,...t);return}if(c()||o){f(),u.call(null,e,...t);return}r<64&&(r*=2);let n;s===1?(s=2,n=0):n=(r+Math.random())*1e3,d(n)}let m=!1;function h(e){m||(m=!0,f(),!l&&(i===null?e||(s=1):(e||(s=2),clearTimeout(i),d(0))))}return d(0),a=setTimeout(()=>{o=!0,h(!0)},n),h}function i_(e){e(!1)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function a_(e){return e!==void 0}function o_(e,t,n,r){if(r<t)throw Qg(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Qg(`Invalid value for '${e}'. Expected ${n} or less.`)}function s_(e){let t=encodeURIComponent,n=`?`;for(let r in e)if(e.hasOwnProperty(r)){let i=t(r)+`=`+t(e[r]);n=n+i+`&`}return n=n.slice(0,-1),n}var c_;(function(e){e[e.NO_ERROR=0]=`NO_ERROR`,e[e.NETWORK_ERROR=1]=`NETWORK_ERROR`,e[e.ABORT=2]=`ABORT`})(c_||={});
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function l_(e,t){let n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,i=t.indexOf(e)!==-1;return n||r||i}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var u_=class{constructor(e,t,n,r,i,a,o,s,c,l,u,d=!0,f=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=o,this.errorCallback_=s,this.timeout_=c,this.progressCallback_=l,this.connectionFactory_=u,this.retry=d,this.isUsingEmulator=f,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{if(t){e(!1,new d_(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;this.progressCallback_!==null&&this.progressCallback_(t,n)};this.progressCallback_!==null&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===c_.NO_ERROR,i=n.getStatus();if(!t||l_(i,this.additionalRetryCodes_)&&this.retry){let t=n.getErrorCode()===c_.ABORT;e(!1,new d_(!1,null,t));return}let a=this.successCodes_.indexOf(i)!==-1;e(!0,new d_(a,n))})},t=(e,t)=>{let n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());a_(e)?n(e):n()}catch(e){r(e)}else if(i!==null){let e=qg();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){let e=this.appDelete_?$g():Yg();r(e)}else{let e=Jg();r(e)}};this.canceled_?t(!1,new d_(!1,null,!0)):this.backoffId_=r_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&i_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}},d_=class{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}};function f_(e,t){t!==null&&t.length>0&&(e.Authorization=`Firebase `+t)}function p_(e,t){e[`X-Firebase-Storage-Version`]=`webjs/`+(t??`AppManager`)}function m_(e,t){t&&(e[`X-Firebase-GMPID`]=t)}function h_(e,t){t!==null&&(e[`X-Firebase-AppCheck`]=t)}function g_(e,t,n,r,i,a,o=!0,s=!1){let c=s_(e.urlParams),l=e.url+c,u=Object.assign({},e.headers);return m_(u,t),f_(u,n),p_(u,a),h_(u,r),new u_(l,e.method,u,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,s)}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function __(e){if(e.length===0)return null;let t=e.lastIndexOf(`/`);return t===-1?``:e.slice(0,t)}function v_(e){let t=e.lastIndexOf(`/`,e.length-2);return t===-1?e:e.slice(t+1)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var y_=class e{constructor(e,t){this._service=e,t instanceof t_?this._location=t:this._location=t_.makeFromUrl(t,e.host)}toString(){return`gs://`+this._location.bucket+`/`+this._location.path}_newRef(t,n){return new e(t,n)}get root(){let e=new t_(this._location.bucket,``);return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return v_(this._location.path)}get storage(){return this._service}get parent(){let t=__(this._location.path);if(t===null)return null;let n=new t_(this._location.bucket,t);return new e(this._service,n)}_throwIfRoot(e){if(this._location.path===``)throw e_(e)}};function b_(e,t){let n=t?.[Vg];return n==null?null:t_.makeFromBucketSpec(n,e)}function x_(e,t,n,r={}){e.host=`${t}:${n}`;let i=te(t);i&&(ne(`https://${e.host}/b`),ce(`Storage`,!0)),e._isUsingEmulator=!0,e._protocol=i?`https`:`http`;let{mockUserToken:a}=r;a&&(e._overrideAuthToken=typeof a==`string`?a:re(a,e.app.options.projectId))}var S_=class{constructor(e,t,n,r,i,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=Bg,this._protocol=`https`,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Hg,this._maxUploadRetryTime=Ug,this._requests=new Set,r==null?this._bucket=b_(this._host,this.app.options):this._bucket=t_.makeFromBucketSpec(r,this._host)}get host(){return this._host}set host(e){this._host=e,this._url==null?this._bucket=b_(e,this.app.options):this._bucket=t_.makeFromBucketSpec(this._url,e)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){o_(`time`,0,1/0,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){o_(`time`,0,1/0,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(T(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new y_(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new n_($g());{let a=g_(e,this._appId,n,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}},C_=`@firebase/storage`,w_=`0.14.0`,T_=`storage`;function E_(e=on(),t){e=b(e);let n=en(e,T_).getImmediate({identifier:t}),r=m(`storage`);return r&&D_(n,...r),n}function D_(e,t,n,r={}){x_(e,t,n,r)}function O_(e,{instanceIdentifier:t}){let n=e.getProvider(`app`).getImmediate(),r=e.getProvider(`auth-internal`),i=e.getProvider(`app-check-internal`);return new S_(n,r,i,t,rn)}function k_(){$t(new x(T_,O_,`PUBLIC`).setMultipleInstances(!0)),E(C_,w_,``),E(C_,w_,`esm2020`)}k_();var A_=`@firebase/installations`,j_=`0.6.19`,M_=1e4,N_=`w:${j_}`,P_=`FIS_v2`,F_=`https://firebaseinstallations.googleapis.com/v1`,I_=3600*1e3,L_=new be(`installations`,`Installations`,{"missing-app-config-values":`Missing App configuration value: "{$valueName}"`,"not-registered":`Firebase Installation is not registered.`,"installation-not-found":`Firebase Installation not found.`,"request-failed":`{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"`,"app-offline":`Could not process request. Application offline.`,"delete-pending-registration":`Can't delete installation while there is a pending registration request.`});function R_(e){return e instanceof ye&&e.code.includes(`request-failed`)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function z_({projectId:e}){return`${F_}/projects/${e}/installations`}function B_(e){return{token:e.token,requestStatus:2,expiresIn:G_(e.expiresIn),creationTime:Date.now()}}async function V_(e,t){let n=(await t.json()).error;return L_.create(`request-failed`,{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function H_({apiKey:e}){return new Headers({"Content-Type":`application/json`,Accept:`application/json`,"x-goog-api-key":e})}function U_(e,{refreshToken:t}){let n=H_(e);return n.append(`Authorization`,K_(t)),n}async function W_(e){let t=await e();return t.status>=500&&t.status<600?e():t}function G_(e){return Number(e.replace(`s`,`000`))}function K_(e){return`${P_} ${e}`}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function q_({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=z_(e),i=H_(e),a=t.getImmediate({optional:!0});if(a){let e=await a.getHeartbeatsHeader();e&&i.append(`x-firebase-client`,e)}let o={fid:n,authVersion:P_,appId:e.appId,sdkVersion:N_},s={method:`POST`,headers:i,body:JSON.stringify(o)},c=await W_(()=>fetch(r,s));if(c.ok){let e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:B_(e.authToken)}}else throw await V_(`Create Installation`,c)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function J_(e){return new Promise(t=>{setTimeout(t,e)})}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Y_(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,`-`).replace(/\//g,`_`)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var X_=/^[cdef][\w-]{21}$/,Z_=``;function Q_(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let t=$_(e);return X_.test(t)?t:Z_}catch{return Z_}}function $_(e){return Y_(e).substr(0,22)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function ev(e){return`${e.appName}!${e.appId}`}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var tv=new Map;function nv(e,t){let n=ev(e);rv(n,t),iv(n,t)}function rv(e,t){let n=tv.get(e);if(n)for(let e of n)e(t)}function iv(e,t){let n=ov();n&&n.postMessage({key:e,fid:t}),sv()}var av=null;function ov(){return!av&&`BroadcastChannel`in self&&(av=new BroadcastChannel(`[Firebase] FID Change`),av.onmessage=e=>{rv(e.data.key,e.data.fid)}),av}function sv(){tv.size===0&&av&&(av.close(),av=null)}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var cv=`firebase-installations-database`,lv=1,uv=`firebase-installations-store`,dv=null;function fv(){return dv||=dt(cv,lv,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(uv)}}}),dv}async function pv(e,t){let n=ev(e),r=(await fv()).transaction(uv,`readwrite`),i=r.objectStore(uv),a=await i.get(n);return await i.put(t,n),await r.done,(!a||a.fid!==t.fid)&&nv(e,t.fid),t}async function mv(e){let t=ev(e),n=(await fv()).transaction(uv,`readwrite`);await n.objectStore(uv).delete(t),await n.done}async function hv(e,t){let n=ev(e),r=(await fv()).transaction(uv,`readwrite`),i=r.objectStore(uv),a=await i.get(n),o=t(a);return o===void 0?await i.delete(n):await i.put(o,n),await r.done,o&&(!a||a.fid!==o.fid)&&nv(e,o.fid),o}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function gv(e){let t,n=await hv(e.appConfig,n=>{let r=_v(n),i=vv(e,r);return t=i.registrationPromise,i.installationEntry});return n.fid===Z_?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function _v(e){let t=e||{fid:Q_(),registrationStatus:0};return Sv(t)}function vv(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let e=Promise.reject(L_.create(`app-offline`));return{installationEntry:t,registrationPromise:e}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=yv(e,n);return{installationEntry:n,registrationPromise:r}}else if(t.registrationStatus===1)return{installationEntry:t,registrationPromise:bv(e)};else return{installationEntry:t}}async function yv(e,t){try{let n=await q_(e,t);return pv(e.appConfig,n)}catch(n){throw R_(n)&&n.customData.serverCode===409?await mv(e.appConfig):await pv(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function bv(e){let t=await xv(e.appConfig);for(;t.registrationStatus===1;)await J_(100),t=await xv(e.appConfig);if(t.registrationStatus===0){let{installationEntry:t,registrationPromise:n}=await gv(e);return n||t}return t}function xv(e){return hv(e,e=>{if(!e)throw L_.create(`installation-not-found`);return Sv(e)})}function Sv(e){return Cv(e)?{fid:e.fid,registrationStatus:0}:e}function Cv(e){return e.registrationStatus===1&&e.registrationTime+M_<Date.now()}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function wv({appConfig:e,heartbeatServiceProvider:t},n){let r=Tv(e,n),i=U_(e,n),a=t.getImmediate({optional:!0});if(a){let e=await a.getHeartbeatsHeader();e&&i.append(`x-firebase-client`,e)}let o={installation:{sdkVersion:N_,appId:e.appId}},s={method:`POST`,headers:i,body:JSON.stringify(o)},c=await W_(()=>fetch(r,s));if(c.ok){let e=await c.json();return B_(e)}else throw await V_(`Generate Auth Token`,c)}function Tv(e,{fid:t}){return`${z_(e)}/${t}/authTokens:generate`}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Ev(e,t=!1){let n,r=await hv(e.appConfig,r=>{if(!Av(r))throw L_.create(`not-registered`);let i=r.authToken;if(!t&&jv(i))return r;if(i.requestStatus===1)return n=Dv(e,t),r;{if(!navigator.onLine)throw L_.create(`app-offline`);let t=Nv(r);return n=kv(e,t),t}});return n?await n:r.authToken}async function Dv(e,t){let n=await Ov(e.appConfig);for(;n.authToken.requestStatus===1;)await J_(100),n=await Ov(e.appConfig);let r=n.authToken;return r.requestStatus===0?Ev(e,t):r}function Ov(e){return hv(e,e=>{if(!Av(e))throw L_.create(`not-registered`);let t=e.authToken;return Pv(t)?{...e,authToken:{requestStatus:0}}:e})}async function kv(e,t){try{let n=await wv(e,t),r={...t,authToken:n};return await pv(e.appConfig,r),n}catch(n){if(R_(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await mv(e.appConfig);else{let n={...t,authToken:{requestStatus:0}};await pv(e.appConfig,n)}throw n}}function Av(e){return e!==void 0&&e.registrationStatus===2}function jv(e){return e.requestStatus===2&&!Mv(e)}function Mv(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+I_}function Nv(e){let t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function Pv(e){return e.requestStatus===1&&e.requestTime+M_<Date.now()}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Fv(e){let t=e,{installationEntry:n,registrationPromise:r}=await gv(t);return r?r.catch(console.error):Ev(t).catch(console.error),n.fid}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function Iv(e,t=!1){let n=e;return await Lv(n),(await Ev(n,t)).token}async function Lv(e){let{registrationPromise:t}=await gv(e);t&&await t}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function Rv(e){if(!e||!e.options)throw zv(`App Configuration`);if(!e.name)throw zv(`App Name`);for(let t of[`projectId`,`apiKey`,`appId`])if(!e.options[t])throw zv(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function zv(e){return L_.create(`missing-app-config-values`,{valueName:e})}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Bv=`installations`,Vv=`installations-internal`,Hv=e=>{let t=e.getProvider(`app`).getImmediate(),n=Rv(t),r=en(t,`heartbeat`);return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Uv=e=>{let t=e.getProvider(`app`).getImmediate(),n=en(t,Bv).getImmediate();return{getId:()=>Fv(n),getToken:e=>Iv(n,e)}};function Wv(){$t(new x(Bv,Hv,`PUBLIC`)),$t(new x(Vv,Uv,`PRIVATE`))}Wv(),E(A_,j_),E(A_,j_,`esm2020`);
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Gv=`analytics`,Kv=`firebase_id`,qv=`origin`,Jv=60*1e3,Yv=`https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig`,Xv=`https://www.googletagmanager.com/gtag/js`,Zv=new qe(`@firebase/analytics`),Qv=new be(`analytics`,`Analytics`,{"already-exists":`A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.`,"already-initialized":`initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.`,"already-initialized-settings":`Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.`,"interop-component-reg-failed":`Firebase Analytics Interop Component failed to instantiate: {$reason}`,"invalid-analytics-context":`Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}`,"indexeddb-unavailable":`IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}`,"fetch-throttle":`The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.`,"config-fetch-failed":`Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}`,"no-api-key":`The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.`,"no-app-id":`The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.`,"no-client-id":`The "client_id" field is empty.`,"invalid-gtag-resource":`Trusted Types detected an invalid gtag resource: {$gtagURL}.`});
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function $v(e){if(!e.startsWith(Xv)){let t=Qv.create(`invalid-gtag-resource`,{gtagURL:e});return Zv.warn(t.message),``}return e}function ey(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function ty(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function ny(e,t){let n=ty(`firebase-js-sdk-policy`,{createScriptURL:$v}),r=document.createElement(`script`),i=`${Xv}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function ry(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function iy(e,t,n,r,i,a){let o=r[i];try{if(o)await t[o];else{let e=(await ey(n)).find(e=>e.measurementId===i);e&&await t[e.appId]}}catch(e){Zv.error(e)}e(`config`,i,a)}async function ay(e,t,n,r,i){try{let a=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);let r=await ey(n);for(let n of e){let e=r.find(e=>e.measurementId===n),i=e&&t[e.appId];if(i)a.push(i);else{a=[];break}}}a.length===0&&(a=Object.values(t)),await Promise.all(a),e(`event`,r,i||{})}catch(e){Zv.error(e)}}function oy(e,t,n,r){async function i(i,...a){try{if(i===`event`){let[r,i]=a;await ay(e,t,n,r,i)}else if(i===`config`){let[i,o]=a;await iy(e,t,n,r,i,o)}else if(i===`consent`){let[t,n]=a;e(`consent`,t,n)}else if(i===`get`){let[t,n,r]=a;e(`get`,t,n,r)}else if(i===`set`){let[t]=a;e(`set`,t)}else e(i,...a)}catch(e){Zv.error(e)}}return i}function sy(e,t,n,r,i){let a=function(...e){window[r].push(arguments)};return window[i]&&typeof window[i]==`function`&&(a=window[i]),window[i]=oy(a,e,t,n),{gtagCore:a,wrappedGtag:window[i]}}function cy(e){let t=window.document.getElementsByTagName(`script`);for(let n of Object.values(t))if(n.src&&n.src.includes(Xv)&&n.src.includes(e))return n;return null}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ly=30,uy=1e3,dy=new class{constructor(e={},t=uy){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function fy(e){return new Headers({Accept:`application/json`,"x-goog-api-key":e})}async function py(e){let{appId:t,apiKey:n}=e,r={method:`GET`,headers:fy(n)},i=Yv.replace(`{app-id}`,t),a=await fetch(i,r);if(a.status!==200&&a.status!==304){let e=``;try{let t=await a.json();t.error?.message&&(e=t.error.message)}catch{}throw Qv.create(`config-fetch-failed`,{httpStatus:a.status,responseMessage:e})}return a.json()}async function my(e,t=dy,n){let{appId:r,apiKey:i,measurementId:a}=e.options;if(!r)throw Qv.create(`no-app-id`);if(!i){if(a)return{measurementId:a,appId:r};throw Qv.create(`no-api-key`)}let o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new vy;return setTimeout(async()=>{s.abort()},n===void 0?Jv:n),hy({appId:r,apiKey:i,measurementId:a},o,s,t)}async function hy(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=dy){let{appId:a,measurementId:o}=e;try{await gy(r,t)}catch(e){if(o)return Zv.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${e?.message}]`),{appId:a,measurementId:o};throw e}try{let t=await py(e);return i.deleteThrottleMetadata(a),t}catch(t){let s=t;if(!_y(s)){if(i.deleteThrottleMetadata(a),o)return Zv.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${s?.message}]`),{appId:a,measurementId:o};throw t}let c=Number(s?.customData?.httpStatus)===503?y(n,i.intervalMillis,ly):y(n,i.intervalMillis),l={throttleEndTimeMillis:Date.now()+c,backoffCount:n+1};return i.setThrottleMetadata(a,l),Zv.debug(`Calling attemptFetch again in ${c} millis`),hy(e,l,r,i)}}function gy(e,t){return new Promise((n,r)=>{let i=Math.max(t-Date.now(),0),a=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(a),r(Qv.create(`fetch-throttle`,{throttleEndTimeMillis:t}))})})}function _y(e){if(!(e instanceof ye)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}var vy=class{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}},yy;async function by(e,t,n,r,i){if(i&&i.global){e(`event`,n,r);return}else{let i=await t,a={...r,send_to:i};e(`event`,n,a)}}var xy;function Sy(e){xy=e}function Cy(e){yy=e}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function wy(){if(he())try{await ge()}catch(e){return Zv.warn(Qv.create(`indexeddb-unavailable`,{errorInfo:e?.toString()}).message),!1}else return Zv.warn(Qv.create(`indexeddb-unavailable`,{errorInfo:`IndexedDB is not available in this environment.`}).message),!1;return!0}async function Ty(e,t,n,r,i,a,o){let s=my(e);s.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Zv.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Zv.error(e)),t.push(s);let c=wy().then(e=>{if(e)return r.getId()}),[l,u]=await Promise.all([s,c]);cy(a)||ny(a,l.measurementId),xy&&(i(`consent`,`default`,xy),Sy(void 0)),i(`js`,new Date);let d=o?.config??{};return d[qv]=`firebase`,d.update=!0,u!=null&&(d[Kv]=u),i(`config`,l.measurementId,d),yy&&(i(`set`,yy),Cy(void 0)),l.measurementId}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Ey=class{constructor(e){this.app=e}_delete(){return delete Dy[this.app.options.appId],Promise.resolve()}},Dy={},Oy=[],ky={},Ay=`dataLayer`,jy=`gtag`,My,Ny,Py=!1;function Fy(){let e=[];if(de()&&e.push(`This is a browser extension environment.`),_e()||e.push(`Cookies are not available.`),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(` `),n=Qv.create(`invalid-analytics-context`,{errorInfo:t});Zv.warn(n.message)}}function Iy(e,t,n){Fy();let r=e.options.appId;if(!r)throw Qv.create(`no-app-id`);if(!e.options.apiKey)if(e.options.measurementId)Zv.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Qv.create(`no-api-key`);if(Dy[r]!=null)throw Qv.create(`already-exists`,{id:r});if(!Py){ry(Ay);let{wrappedGtag:e,gtagCore:t}=sy(Dy,Oy,ky,Ay,jy);Ny=e,My=t,Py=!0}return Dy[r]=Ty(e,Oy,ky,t,My,Ay,n),new Ey(e)}function Ly(e=on()){e=b(e);let t=en(e,Gv);return t.isInitialized()?t.getImmediate():Ry(e)}function Ry(e,t={}){let n=en(e,Gv);if(n.isInitialized()){let e=n.getImmediate();if(we(t,n.getOptions()))return e;throw Qv.create(`already-initialized`)}return n.initialize({options:t})}function zy(e,t,n,r){e=b(e),by(Ny,Dy[e.app.options.appId],t,n,r).catch(e=>Zv.error(e))}var By=`@firebase/analytics`,Vy=`0.10.18`;function Hy(){$t(new x(Gv,(e,{options:t})=>{let n=e.getProvider(`app`).getImmediate(),r=e.getProvider(`installations-internal`).getImmediate();return Iy(n,r,t)},`PUBLIC`)),$t(new x(`analytics-internal`,e,`PRIVATE`)),E(By,Vy),E(By,Vy,`esm2020`);function e(e){try{let t=e.getProvider(Gv).getImmediate();return{logEvent:(e,n,r)=>zy(t,e,n,r)}}catch(e){throw Qv.create(`interop-component-reg-failed`,{reason:e})}}}Hy();export{fs as _,Th as a,ea as b,Mg as c,Ig as d,vg as f,Yi as g,Ng as h,Fg as i,Mh as l,zg as m,E_ as n,Pg as o,mg as p,U as r,Eh as s,Ly as t,bg as u,$i as v,an as x,Xi as y};