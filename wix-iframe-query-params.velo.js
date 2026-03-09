// ─── Wix Velo: Pass full URL params into DriveIt iframe (for Google call conversion) ───
// Paste this in your Wix page code (e.g. "Austin Car Hire" or the page that has the html1 embed).
// Uses the correct Velo API ($w) and passes ALL query params to the iframe, not just gclid.

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
  const baseUrl = 'https://necroticangel.github.io/DriveIt/index.html';
  const query = wixLocation.query || {};
  const keys = Object.keys(query);

  if (keys.length === 0) {
    return; // No params – iframe can keep loading with default URL from HTML Settings
  }

  // Build full query string so gclid, gclsrc, wbraid, etc. all get passed
  const search =
    '?' +
    keys
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(query[k]);
      })
      .join('&');

  const iframeUrl = baseUrl + search;

  try {
    $w('#html1').src = iframeUrl;
  } catch (e) {
    wixWindow.console.log('DriveIt iframe src update failed:', e);
  }
});
