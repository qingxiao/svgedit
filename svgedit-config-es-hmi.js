//  TO BUILD AN IIFE VERSION OF THIS FILE (AS CAN WORK ON OLDER BROWSERS),
//   RUN THE FOLLOWING ON THE COMMAND LINE FROM THE PROJECT ROOT:
//   `npm run build-by-config`. REPEAT AFTER ANY MODIFICATIONS
//   TO svgedit-config-es.js.

/*
The svgedit-config-es.js file is intended for the setting of configuration
  or preferences which must run early on; if this is not needed, it is
  recommended that you create an extension instead (for greater
  reusability and modularity). This file needs to be in the parent
  folder of the editor folder. It is referenced in the code as
  '../svgedit-config-es.js'.
*/

// CONFIG AND EXTENSION SETTING
/*
For default config and extensions (and available options) available to
`setConfig()`, see the file `docs/tutorials/ConfigOptions.md`
*/

import svgEditor from './src/editor/svgedit.js';
import { add } from './src/editor/contextmenu.js';

const language = localStorage.getItem('language') || 'zh-CN';

const getPathWithPublic = url => {
  return window.publicPath + url.replace(/^\//, '');
};

const editPath = getPathWithPublic('/svgedit/editor/');
const addEditPath = url => {
  return editPath + url;
};
window.svgEditor = svgEditor;

// 添加自定义事件
add({
  id: 'animation',
  label: language === 'en' ? 'Animation' : '动画链接',
  action(el) {
    const selectedEls = window.svgEditor.canvas.getSelectedElems();
    svgEditor.canvas.call('showAttributeEdit', selectedEls[0]);
  },
});

// URL OVERRIDE CONFIG
svgEditor.setConfig({
  /**
  To override the ability for URLs to set URL-based SVG content,
      uncomment the following:
  */
  // preventURLContentLoading: true,
  /**
  To override the ability for URLs to set other configuration (including
      extension config), uncomment the following:
  */
  // preventAllURLConfig: true,
  /**
  To override the ability for URLs to set their own extensions,
    uncomment the following (note that if `setConfig()` is used in
    extension code, it will still be additive to extensions,
    however):
  */
  // lockExtensions: true,
});
svgEditor.setConfig(
  {
    /*
  Provide default values here which differ from that of the editor but
    which the URL can override
  */
  },
  { allowInitialUserOverride: true },
);

// EXTENSION CONFIG
svgEditor.setConfig({
  // extensions: [
  //   'ext-overview_window.js', 'ext-markers.js', 'ext-connector.js',
  //    'ext-eyedropper.js', 'ext-shapes.js', 'ext-imagelib.js',
  //    'ext-grid.js', 'ext-polygon.js', 'ext-star.js', 'ext-panning.js',
  //     'ext-storage.js'
  // ],
  extensions: [
    'ext-overview_window.js',
    'ext-markers.js',
    'ext-connector.js',
    'ext-eyedropper.js',
    'ext-shapes.js',
    'ext-imagelib.js',
    'ext-grid.js',
    'ext-polygon.js',
    'ext-star.js',
    'ext-panning.js',
  ],
  // noDefaultExtensions can only be meaningfully used in
  //  `svgedit-config-es.js` or in the URL
  noDefaultExtensions: false,
});

// STYLESHEET CONFIG
svgEditor.setConfig({
  // stylesheets: ['@default']
  stylesheets: [
    'jgraduate/css/jGraduate.css',
    'spinbtn/jQuery.SpinButton.css',
    'jgraduate/css/jPicker.css',
    'svg-editor.css',
  ].map(addEditPath),
});

// OTHER CONFIG
svgEditor.setConfig({
  // canvasName: 'default',
  // canvas_expansion: 3,
  initFill: {
    color: 'fff', // solid red
    opacity: 1,
  },
  initStroke: {
    width: 1,
    color: '000000', // solid black
    opacity: 1,
  },
  // initOpacity: 1,
  // colorPickerCSS: null,
  initTool: 'select',
  // exportWindowType: 'new', // 'same'
  // wireframe: false,
  // showlayers: false,
  // no_save_warning: false,
  // PATH CONFIGURATION
  extIconsPath: getPathWithPublic('/svgedit/editor/extensions/'),
  imgPath: getPathWithPublic('/svgedit/editor/images/'),
  langPath: getPathWithPublic('/svgedit/editor/locale/'),
  extPath: getPathWithPublic('/svgedit/editor/extensions/'),
  jGraduatePath: getPathWithPublic('/svgedit/editor/jgraduate/images/'),
  /*
  Uncomment the following to allow at least same domain (embedded) access,
  including `file:///` access.
  Setting as `['*']` would allow any domain to access but would be unsafe to
  data privacy and integrity.
  */
  // May be 'null' (as a string) when used as a `file:///` URL
  // allowedOrigins: [location.origin || 'null'],
  // DOCUMENT PROPERTIES
  dimensions: [1024, 768],
  // EDITOR OPTIONS
  // gridSnapping: false,
  // gridColor: '#000',
  // baseUnit: 'px',
  // snappingStep: 10,
  // showRulers: true,
  // EXTENSION-RELATED (GRID)
  // showGrid: false, // Set by ext-grid.js
  // EXTENSION-RELATED (STORAGE)
  // Some interaction with `ext-storage.js`; prevent even the loading of
  //  previously saved local storage
  // noStorageOnLoad: false,
  // Some interaction with `ext-storage.js`; strongly discouraged from
  //  modification as it bypasses user privacy by preventing them from
  //  choosing whether to keep local storage or not
  // forceStorage: false,
  // Used by `ext-storage.js`; empty any prior storage if the user
  //  declines to store
  // emptyStorageOnDecline: true,
});

// PREF CHANGES
/**
setConfig() can also be used to set preferences in addition to
  configuration (see defaultPrefs in svg-editor.js for a list of
  possible settings), but at least if you are using ext-storage.js
  to store preferences, it will probably be better to let your
  users control these.
As with configuration, one may use allowInitialUserOverride, but
  in the case of preferences, any previously stored preferences
  will also thereby be enabled to override this setting (and at a
  higher priority than any URL preference setting overrides).
  Failing to use allowInitialUserOverride will ensure preferences
  are hard-coded here regardless of URL or prior user storage setting.
*/
svgEditor.setConfig({
  // Set dynamically within locale.js if not previously set
  lang: language,
  // Will default to 's' if the window height is smaller than the minimum
  //  height and 'm' otherwise
  iconsize: 'm',
  /**
   * When showing the preferences dialog, svg-editor.js currently relies
   * on `curPrefs` instead of `svgEditor.pref`, so allowing an override for
   * `bkgd_color` means that this value won't have priority over block
   * auto-detection as far as determining which color shows initially
   * in the preferences dialog (though it can be changed and saved).
   */
  // bkgd_color: '#FFF',
  // bkgd_url: '',
  // img_save: 'embed',
  // Only shows in UI as far as alert notices
  // save_notice_done: false,
  // export_notice_done: false
});
svgEditor.setConfig(
  {
    // Indicate pref settings here if you wish to allow user storage or URL
    //   settings to be able to override your default preferences (unless
    //   other config options have already explicitly prevented one or the
    //   other)
  },
  { allowInitialUserOverride: true },
);
