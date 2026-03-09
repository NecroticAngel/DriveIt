# Passing gclid into the DriveIt iframe on Wix

## What’s going on

- The DriveIt landing page runs **inside an iframe** on Wix (`html1`).
- Google’s “Calls from website” conversion script only looks at **the iframe’s URL** (the GitHub page URL), not the Wix page URL.
- So the iframe’s `src` must include the same query string as the Wix page (e.g. `?gclid=...`) when someone arrives from a Google ad.

## What to use in Wix

Use the Velo code in **`wix-iframe-query-params.velo.js`** on the Wix page that contains the DriveIt embed (`html1`).

That code:

1. Reads **all** query params from the Wix page (`wixLocation.query`), not only `gclid`.
2. Appends them to the iframe URL so the first (and only) load of the iframe already has the full query string.
3. Uses `$w('#html1').src = ...` so the embed’s ID matches your HTML Settings (`html1`).

Replace any existing “inject gclid” logic on that page with this so the iframe gets the full URL (including `gclid`, `gclsrc`, `wbraid`, etc.) and the call conversion tag in the GitHub page can work.

## Checklist

- [ ] Wix page code uses the snippet from `wix-iframe-query-params.velo.js` and the page has the `html1` embed.
- [ ] In HTML Settings, “Website address” is `https://necroticangel.github.io/DriveIt/index.html` (no query string in the panel is fine).
- [ ] In Google Ads, the “Calls from website” conversion is set up and the phone number matches the site (e.g. **(512) 270-1945**).
- [ ] In GTM, the conversion tag calls `_googWccStaticApply('phone_number_header')` and the link has `id="phone_number_header"`.
- [ ] Test with `#google-wcc-debug` on the **iframe URL** (e.g. open `https://necroticangel.github.io/DriveIt/index.html?gclid=test#google-wcc-debug` in a new tab, or ensure your Wix code can append `#google-wcc-debug` when testing).
