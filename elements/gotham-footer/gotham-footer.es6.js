import"./node_modules/@gotham/gotham-logo/gotham-logo.js";class GothamFooter extends HTMLElement{get html(){return`
<style>:host {
  display: block;
}

:host([hidden]) {
  display: none;
}

.container {
  display: flex;
  width: auto;
  background-color: purple;
  color: white;
  padding: 1em;
  flex-direction: column;
}

.logo {
  font-size: 1.8em;
  flex: 1 1 auto;
}</style>
<div class="container">
  <div class="logo">
    <gotham-logo></gotham-logo>
  </div>
  <div class="slot">
    <slot></slot>
  </div>
</div>`}static get properties(){return{subtitle:{name:"subtitle",type:"String",value:"",reflectToAttribute:!1,observer:!1}}}static get tag(){return"gotham-footer"}constructor(delayRender=!1){super();this.tag=GothamFooter.tag;let obj=GothamFooter.properties;for(let p in obj){if(obj.hasOwnProperty(p)){if(this.hasAttribute(p)){this[p]=this.getAttribute(p)}else{this.setAttribute(p,obj[p].value);this[p]=obj[p].value}}}this._queue=[];this.template=document.createElement("template");this.attachShadow({mode:"open"});if(!delayRender){this.render()}}connectedCallback(){if(window.ShadyCSS){window.ShadyCSS.styleElement(this)}if(this._queue.length){this._processQueue()}}_copyAttribute(name,to){const recipients=this.shadowRoot.querySelectorAll(to),value=this.getAttribute(name),fname=null==value?"removeAttribute":"setAttribute";for(const node of recipients){node[fname](name,value)}}_queueAction(action){this._queue.push(action)}_processQueue(){this._queue.forEach(action=>{this[`_${action.type}`](action.data)});this._queue=[]}_setProperty({name,value}){this[name]=value}render(){this.shadowRoot.innerHTML=null;this.template.innerHTML=this.html;if(window.ShadyCSS){window.ShadyCSS.prepareTemplate(this.template,this.tag)}this.shadowRoot.appendChild(this.template.content.cloneNode(!0))}}window.customElements.define(GothamFooter.tag,GothamFooter);export{GothamFooter};