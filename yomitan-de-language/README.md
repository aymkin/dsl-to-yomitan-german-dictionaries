# German Language Support for Yomitan

This folder contains files to enable German word deinflection in Yomitan.

## Files

- `german-transforms.js` — German word deinflection rules for Yomitan
- `german-transforms.test.js` — unit tests for the deinflection rules (Node.js built-in test runner)

## What is this?

By default, Yomitan searches for exact dictionary matches. For German, this means if you have a dictionary entry for "laufen" but you look up "lief" or "gelaufen", Yomitan won't find it.

This file adds German deinflection rules that convert inflected German words back to their dictionary forms:
- **Verbs**: "lief" → "laufen", "gelaufen" → "laufen", "zu lesen" → "lesen"
- **Nouns**: "Männer" → "Mann", "Tische" → "Tisch"  
- **Adjectives**: "schnellste" → "schnell", "kältesten" → "kalt"
- **Umlauts**: "häufig" → "haeufig", "Bäume" → "Baume"

## Installation

### Recommended Method

1. Download the latest Yomitan release as a ZIP file from:
   https://github.com/yomidevs/yomitan/releases

2. Extract the ZIP file to a folder

3. Copy our `german-transforms.js` to the extracted folder:
   `js/language/de/german-transforms.js`

4. Load the modified extension in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the extracted folder

5. Pin Yomitan in your browser and enjoy German deinflection!

### Benefits of this method

- No need to find the installed extension folder
- Easier to update and modify
- Full control over the extension

## Current Limitations

This is a community-made solution and may not cover all German word forms. Known limitations:

- Not all irregular verb forms are covered
- Some edge cases may not work
- Umlaut handling is basic (ä→a, ö→o, ü→u)

Feel free to improve this file and contribute back!

## Running tests (for contributors)

If you want to modify or extend the German rules, you can run the unit tests locally using Node.js's built-in test runner ([docs](https://nodejs.org/api/test.html)).

- **Requirements**: Node.js 20+ (no extra libraries needed)

Steps:

1. Open a terminal in this folder:

   ```bash
   cd yomitan-de-language
   ```

2. Run the test suite directly with Node:

   ```bash
   node --test german-transforms.test.js
   ```

   or, using the convenience script:

   ```bash
   npm test
   ```

The tests in `german-transforms.test.js` cover core declension, conjugation, complex verb, and miscellaneous rules to help prevent regressions when you change `german-transforms.js`.

## Credits

Original file created with assistance from AI. Improvements welcome!
