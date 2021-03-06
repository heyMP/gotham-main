/**
 * Copyright 2019 Gotham University
 * @license Apache-2.0, see License.md for full text.
 */

import "@gotham/gotham-logo/gotham-logo.js";

/**
 * `gotham-footer`
 * ``
 *
 * @microcopy - language worth noting:
 *  -
 *
 * @customElement
 * @demo demo/index.html
 */
class GothamFooter extends HTMLElement {
  // render function
  get html() {
    return `
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
  color: burlywood;
  padding: 1em;
  flex-direction: column;
  align-items: center;
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
</div>`;
  }

  // properties available to the custom element for data binding
  static get properties() {
    return {
      subtitle: {
        name: "subtitle",
        type: "String",
        value: "",
        reflectToAttribute: false,
        observer: false
      }
    };
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "gotham-footer";
  }
  /**
   * life cycle
   */
  constructor(delayRender = false) {
    super();

    // set tag for later use
    this.tag = GothamFooter.tag;
    // map our imported properties json to real props on the element
    // @notice static getter of properties is built via tooling
    // to edit modify src/GothamFooter-properties.json
    let obj = GothamFooter.properties;
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (this.hasAttribute(p)) {
          this[p] = this.getAttribute(p);
        } else {
          this.setAttribute(p, obj[p].value);
          this[p] = obj[p].value;
        }
      }
    }
    // optional queue for future use
    this._queue = [];
    this.template = document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (!delayRender) {
      this.render();
    }
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleElement(this);
    }

    if (this._queue.length) {
      this._processQueue();
    }
  }

  _copyAttribute(name, to) {
    const recipients = this.shadowRoot.querySelectorAll(to);
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  _queueAction(action) {
    this._queue.push(action);
  }

  _processQueue() {
    this._queue.forEach(action => {
      this[`_${action.type}`](action.data);
    });

    this._queue = [];
  }

  _setProperty({ name, value }) {
    this[name] = value;
  }

  render() {
    this.shadowRoot.innerHTML = null;
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  //static get observedAttributes() {
  //  return [];
  //}
  // disconnectedCallback() {}
  // attributeChangedCallback(attr, oldValue, newValue) {}
}
window.customElements.define(GothamFooter.tag, GothamFooter);
export { GothamFooter };
