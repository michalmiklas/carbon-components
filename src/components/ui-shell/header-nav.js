import on from '../../globals/js/misc/on';
import settings from '../../globals/js/settings';
import ContentSwitcher from '../tabs/tabs';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

export default class HeaderNav extends ContentSwitcher {
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'keydown', this._handleKeyDown));
  }
  /**
   * The map associating DOM element and Header instance.
   * @member HeaderNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => {
    const focused = this.element.ownerDocument.activeElement.closest(this.options.selectorSubmenu);
    return focused && focused.nodeType === Node.ELEMENT_NODE ? focused.querySelector(this.options.selectorSubmenuLink) : null;
  };

  /**
   * Moves the focus up/down.
   * @param {number} direction The direction of navigating.
   */
  navigate = direction => {
    const items = toArray(this.element.querySelectorAll(this.options.selectorSubmenuLink));
    const start = this.getCurrentNavigation();
    const getNextItem = old => {
      const handleUnderflow = (index, length) => index + (index >= 0 ? 0 : length);
      const handleOverflow = (index, length) => index - (index < length ? 0 : length);

      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
    };
    getNextItem(start).focus();
  };

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown = event => {
    const keyCodes = {
      37: this.constructor.NAVIGATE.BACKWARD, // left arrow
      39: this.constructor.NAVIGATE.FORWARD, // right arrow
    };
    const keyCodeMatches = keyCodes[event.which];
    if (keyCodeMatches) {
      this.navigate(keyCodeMatches);
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode HeaderNav.create .create()}, or
   * {@linkcode HeaderNav.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode HeaderNav.init .init()} works.
   * @member HeaderNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static get options() {
    const { prefix } = settings;
    return Object.assign(Object.create(ContentSwitcher.options), {
      selectorInit: '[data-header-nav]',
      selectorNavKind: '[data-header-nav-kind]',
      selectorButton: `.${prefix}--header__menu-item`,
      classActive: `${prefix}--header__menu-item--selected`,
      selectorSubmenu: `.${prefix}--header__submenu`,
      selectorSubmenuLink: `.${prefix}--header__menu-title`,
      selectorSubmenuItem: `.${prefix}--header__menu-title > .${prefix}--header__menu-item`,
    });
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Header.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE /* #__PURE_CLASS_PROPERTY__ */ = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}
