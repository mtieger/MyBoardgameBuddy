/**
 * High Frontier 4 All - Icon Utilities
 * 
 * Usage:
 *   <script src="icon-utils.js"></script>
 *   <script>
 *     HFIcons.init('images/icons/').then(() => {
 *       // Get an icon URL
 *       const url = HFIcons.getUrl('aqua', 32);
 *
 *       // Create an <img> element
 *       const img = HFIcons.img('aqua', 32);
 *       document.body.appendChild(img);
 *
 *       // Render inline text with icons: "Spend 3 [aqua icon] to refuel"
 *       const html = HFIcons.renderText('Spend 3 {aqua} to refuel');
 *       element.innerHTML = html;
 *     });
 *   </script>
 */

const HFIcons = (() => {
  let manifest = null;
  let basePath = '';

  /**
   * Initialize by loading the icon manifest JSON.
   * @param {string} manifestUrl - Path to icon-manifest.json
   * @returns {Promise}
   */
  async function init(manifestUrl = 'icon-manifest.json') {
    const response = await fetch(manifestUrl);
    manifest = await response.json();
    basePath = manifest.meta.basePath || '';
    return manifest;
  }

  /**
   * Get the full file path for an icon at a given size.
   * Falls back to nearest available size if exact match not found.
   * @param {string} id - Icon key (e.g. 'aqua', 'thrust')
   * @param {number} size - Desired size in px (32, 64, 128, 256, 512)
   * @returns {string|null} - File path or null if icon not found/has no files
   */
  function getUrl(id, size) {
    if (!manifest) {
      console.warn('HFIcons: manifest not loaded. Call init() first.');
      return null;
    }

    const icon = manifest.icons[id];
    if (!icon) {
      console.warn(`HFIcons: unknown icon "${id}"`);
      return null;
    }

    const files = icon.files;
    if (!files || Object.keys(files).length === 0) {
      console.warn(`HFIcons: no files registered for "${id}"`);
      return null;
    }

    size = size || manifest.meta.defaultSize || 32;

    // Exact match
    if (files[String(size)]) {
      return basePath + files[String(size)];
    }

    // Nearest available size
    const available = Object.keys(files).map(Number).sort((a, b) => a - b);
    let best = available[0];
    for (const s of available) {
      if (Math.abs(s - size) < Math.abs(best - size)) {
        best = s;
      }
    }
    return basePath + files[String(best)];
  }

  /**
   * Create an <img> element for an icon.
   * @param {string} id - Icon key
   * @param {number} size - Display size in px (also selects the file)
   * @param {object} opts - Optional: { className, title, inline }
   * @returns {HTMLImageElement|null}
   */
  function img(id, size, opts = {}) {
    const url = getUrl(id, size);
    if (!url) return null;

    const icon = manifest.icons[id];
    const el = document.createElement('img');
    el.src = url;
    el.alt = icon.label || id;
    el.title = opts.title || icon.label || id;
    el.width = size || manifest.meta.defaultSize;
    el.height = size || manifest.meta.defaultSize;
    el.className = 'hf-icon ' + (opts.className || '');
    el.draggable = false;

    if (opts.inline !== false) {
      el.style.verticalAlign = 'middle';
      el.style.display = 'inline-block';
    }

    return el;
  }

  /**
   * Get an HTML string for an inline icon.
   * @param {string} id - Icon key
   * @param {number} size - Display size in px
   * @returns {string} - HTML img tag string
   */
  function html(id, size) {
    const url = getUrl(id, size);
    if (!url) return `[${id}]`;

    const icon = manifest.icons[id];
    const s = size || manifest.meta.defaultSize;
    return `<img src="${url}" alt="${icon.label}" title="${icon.label}" width="${s}" height="${s}" class="hf-icon" style="vertical-align:middle;display:inline-block;" draggable="false">`;
  }

  /**
   * Render a text string with {icon_id} placeholders replaced by inline icons.
   * Supports counts: "Spend 3{aqua}" renders as "Spend 3[icon]"
   * Also supports sized variants: {aqua:64} for a 64px icon.
   * 
   * @param {string} text - Text with {icon_id} or {icon_id:size} placeholders
   * @param {number} defaultSize - Default icon size for inline text (default: 20)
   * @returns {string} - HTML string with icons
   * 
   * @example
   *   renderText('Spend 3 {aqua} to perform a {burn}')
   *   renderText('Requires {solar_power:24} and {pushable:24}')
   */
  function renderText(text, defaultSize = 20) {
    return text.replace(/\{(\w+)(?::(\d+))?\}/g, (match, id, sizeStr) => {
      const size = sizeStr ? parseInt(sizeStr) : defaultSize;
      return html(id, size);
    });
  }

  /**
   * Get icon metadata (label, description, category).
   * @param {string} id - Icon key
   * @returns {object|null}
   */
  function getInfo(id) {
    if (!manifest) return null;
    return manifest.icons[id] || null;
  }

  /**
   * List all icon IDs, optionally filtered by category.
   * @param {string} category - Optional category filter
   * @returns {string[]}
   */
  function list(category) {
    if (!manifest) return [];
    return Object.entries(manifest.icons)
      .filter(([_, icon]) => !category || icon.category === category)
      .map(([id]) => id);
  }

  /**
   * List all categories.
   * @returns {object}
   */
  function categories() {
    if (!manifest) return {};
    return manifest.meta.categories || manifest.categories || {};
  }

  /**
   * Check which icons have files registered vs. are stubs.
   * @returns {{ ready: string[], missing: string[] }}
   */
  function audit() {
    if (!manifest) return { ready: [], missing: [] };
    const ready = [];
    const missing = [];
    for (const [id, icon] of Object.entries(manifest.icons)) {
      if (icon.files && Object.keys(icon.files).length > 0) {
        ready.push(id);
      } else {
        missing.push(id);
      }
    }
    return { ready, missing };
  }

  // CSS injection for common icon styles
  function injectStyles() {
    if (document.getElementById('hf-icon-styles')) return;
    const style = document.createElement('style');
    style.id = 'hf-icon-styles';
    style.textContent = `
      .hf-icon {
        vertical-align: middle;
        display: inline-block;
        image-rendering: pixelated;
        image-rendering: -webkit-optimize-contrast;
      }
      .hf-icon-sm { width: 16px; height: 16px; }
      .hf-icon-md { width: 24px; height: 24px; }
      .hf-icon-lg { width: 32px; height: 32px; }
      .hf-icon-xl { width: 64px; height: 64px; }
    `;
    document.head.appendChild(style);
  }

  return {
    init,
    getUrl,
    img,
    html,
    renderText,
    getInfo,
    list,
    categories,
    audit,
    injectStyles
  };
})();
