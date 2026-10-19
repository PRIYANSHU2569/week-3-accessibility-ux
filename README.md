# The Field Notes Journal: Accessibility Upgrade (Week 3)

A sample blog and information portal, used to demonstrate an accessibility audit and remediation.

## Files

| Path | Purpose |
|---|---|
| `original/index.html` | Baseline page with intentional accessibility problems (for comparison) |
| `index.html` | Improved page using semantic HTML, ARIA where needed, and keyboard support |
| `css/styles.css` | Stylesheet with visible focus states, contrast-compliant colours, and 44px touch targets |
| `js/main.js` | Progressive enhancement: mobile menu, topic filter, search, form validation |

No build step or external dependencies are required.

## Run locally

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

Then visit http://localhost:8000 and http://localhost:8000/original/index.html.

## How to verify

1. **Keyboard only:** unplug the mouse. Press Tab from the top of the page. The skip link appears first. Use Enter on it to jump to content. Operate the filter buttons with Enter or Space. Open the mobile menu at a narrow width and close it with Escape.
2. **Automated audit:** run Lighthouse (Chrome DevTools, Lighthouse tab, Accessibility category) and the WAVE browser extension on both files. Record scores in the report.
3. **Contrast:** check colours with the WebAIM Contrast Checker or the DevTools colour picker.
4. **Screen reader (optional):** test with NVDA (Windows) or VoiceOver (macOS). Confirm that filter state and result counts are announced.

Article links point to `#` as placeholders because this is a template with no article pages.
