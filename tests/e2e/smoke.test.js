import {chromium, webkit, firefox, Browser, Page} from "playwright"

let browser = Browser
let page = Page
const PAGE_URL = "http://localhost:3000/"

describe("visit page", () => {
  beforeAll(async () => {
    browser = await chromium.launch()
  })
  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
  })
  afterEach(async () => {
    await page.close()
  })

  it("Home page should have correct title", async () => {
      await page.goto(PAGE_URL)

      await page.screenshot({ path: `./screenshots/index-${browserName}.png` })

      expect(await page.title()).toBe("Contacts Web App")
  })
})

test.todo("if inputs are empty when module is closed")

describe("should have manin functionalities", () => {
  let browser = Browser
  let page = Page

  beforeAll( async () => {
    // browser = await chromium.launch({ headless: false, slowMo: 250 })
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto(PAGE_URL)
  })

  afterAll(async () => {
    await browser.close()
  })

  test("if new contact exist when created", async () => {
      await page.click(".btn__block-contained--add-form")
      await page.fill(".module-form__name-input--text", "john doe")
      await page.fill(".module-form__email-input--text", "john@example.com")
      await page.fill(".module-form__phone-input--text", "555-555-1234")
      await page.click(".btn__text--save-form")

      const contact = await page.waitForSelector(".contact-list")

      expect(contact).toBeTruthy()
  })

  test("if edited contact change persist", async () => {
    await page.click(".btn__wrapper--view-contact")
    await page.click(".contact-view__container > .btn__text--edit-form")
    await page.fill(".module-form__name-input--text", "Mary Jane")
    await page.click(".btn__text--update-form")

    const updatedContactName = await page.textContent(".contact-list__name > p");

    expect(updatedContactName).toBe("Mary Jane")
  })

  test("if \"favorite\" boolean changes when toggled", async () => {
    await page.click(".contact-list__icon--favorite")

    const favoriteBoolean = await page.isChecked("#checkboxID")

    expect(favoriteBoolean).toBeTruthy()
  })
})

describe("if module is working as intended", () => {
  describe("if module is opened and set up when (small) \"Add\" button is clicked", () => {
    let browser = Browser
    let page = Page

    beforeAll( async () => {
      // browser = await chromium.launch({ headless: false, slowMo: 450 })
      browser = await chromium.launch({ headless: true })
      const context = await browser.newContext()
      page = await context.newPage()
      await page.setViewportSize({
        width: 375,
        height: 500
      })

      await page.goto(PAGE_URL)
    })

    afterAll(async () => {
      await browser.close()
    })

    test("if module is visble when (small) \"Add\" button is clicked", async () => {

      await page.click(".btn__text--add-form")
      const currentModuleTitle = await page.textContent(".module__title h2")
      const moduleWrapper = await page.$(".off-screen")

      expect(moduleWrapper).toBeFalsy()
      expect(moduleWrapper).not.toBeUndefined()
      expect(currentModuleTitle).toBe("Add Contact")
    })

    test("if module is hidden when \"Cancel\" button is clicked after module is opened", async () => {
      await page.click(".btn__text--add-form")
      await page.click(".btn__text--cancel-form")

      const moduleWrapper = await page.$(".off-screen")

      expect(moduleWrapper).toBeTruthy()
    })
  })

  // TODO
  // Test for large screens
})

