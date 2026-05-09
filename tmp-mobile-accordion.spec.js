const { test, expect, devices } = require('playwright/test');

test.use({ ...devices['iPhone 13'] });

test('mobile accordion spacing check', async ({ page }) => {
  await page.goto('https://tulsitales.com/products/dhanwantharam-oil?cb=' + Date.now(), { waitUntil: 'networkidle' });
  const firstAccordion = page.locator('details.ayus-accordion').first();
  await firstAccordion.evaluate(el => el.open = true);
  await page.waitForTimeout(500);
  const content = firstAccordion.locator('.tt-filter-content.rte').first();
  const data = await content.evaluate(el => {
    const cs = getComputedStyle(el);
    const last = el.lastElementChild;
    const lastCs = last ? getComputedStyle(last) : null;
    return {
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      lastTag: last ? last.tagName : null,
      lastMarginBottom: lastCs ? lastCs.marginBottom : null,
    };
  });
  console.log(JSON.stringify(data));
  await page.screenshot({ path: 'mobile-accordion-check.png', fullPage: false });
});
