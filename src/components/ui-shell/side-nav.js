import on from '../../globals/js/misc/on';
import settings from '../../globals/js/settings';
import ContentSwitcher from '../tabs/tabs';

class SideNav extends ContentSwitcher {
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'keydown', this._handleKeyDown));
  }
  /**
   * The map associating DOM element and copy button UI instance.
   * @member SideNav.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode SideNav.create .create()}, or
   * {@linkcode SideNav.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode SideNav.init .init()} works.
   * @member SideNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static get options() {
    const { prefix } = settings;
    return Object.assign(Object.create(ContentSwitcher.options), {
      selectorInit: '[data-side-nav]',
      selectorButton: `.${prefix}--side-nav__link`,
      classActive: `${prefix}--side-nav__link--current`,
    });
  }
}

export default SideNav;
