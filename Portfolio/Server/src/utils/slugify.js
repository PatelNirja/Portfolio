/**
 * Converts a string into a URL-safe slug.
 * @param {string} text - Input string.
 * @returns {string} Slugified string.
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^\w\-]+/g, "")    // remove non-word characters
    .replace(/\-\-+/g, "-")      // collapse multiple hyphens
    .replace(/^-+/, "")          // trim leading hyphens
    .replace(/-+$/, "");         // trim trailing hyphens
};

module.exports = slugify;
