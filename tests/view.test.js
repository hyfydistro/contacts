import View from "../src/scripts/view.js"
import getUniqueId from "../src/scripts/libs/idGenerator"
import formatPhoneNo from "../src/scripts/libs/formatePhoneNo"

// TODO
// Check if certain classes is available when a button is clicked
//  - .contact-view does not have class .hidden or at least have a firstElementChild when a contact is selected
//  - .module does not have class .hidden when "Add" button is clicked
// Suggestions
// Turn it into mock class

// Check if the following class instance (of "View") methods work:
// displayContactList
// renderContactList
// displayFavoriteList
// renderFavoriteList
// onChangeToFavoriteTabs
// onChangeToAllContactsTabs

const sampleData = {
  id: getUniqueId(),
  name: "john",
  email: "john@example.com",
  phone: formatPhoneNo("5555551234"),
  favorite: false
}

test.todo("if has been called")

describe.skip("if 'View' class instance methods are called", () => {
  test.todo("if \"displayContactList\" method is called")
  test.todo("if \"renderContactList\" method is called")
  test.todo("if \"displayFavoriteList\" method is called")
  test.todo("if \"renderFavoriteList\" method is called")
  test.todo("if \"onChangeToFavoriteTabs\" method is called")
  test.todo("if \"onChangeToAllContactsTabs\" method is called")
})

describe("mdule working as intended", () => {

})

describe("if module is opened and set up when (small) \"Add\" button is clicked", () => {
  document.body.innerHTML = `
  <!-- Add button -->
  <button class="btn__text btn__text--add-form color-slide" type="button">
    <i class="fas fa-plus"></i>
    <h3>Add</h3>
  </button>
  <!-- Module -->
  <div class="module__wrapper off-screen">
    <div class="module module--shadow">
      <div class="module-header">
        <button class="btn__text btn__text--cancel-form">
          <h3>Cancel</h3>
        </button>
        <span class="module__title">
          <h2>Add Contact</h2>
        </span>
        <button class="btn__text btn__text--save-form" type="submit" form="module-form"><i class="fas fa-check"></i>
          <h3>Save</h3>
        </button>
        <button class="btn__text btn__text--update-form hidden"><i class="fas fa-check"></i>
          <h3>Update</h3>
        </button>
      </div>

      <form class="module-form" id="module-form" action="javascript:myFunction(); return false;">
        <div class="module-form__fields">
          <div class="module-form__name-container">
            <div class="module-form__name-label">
              <span class="module-form__name-label--icon"><i class="fas fa-user"></i></span>
              <span class="module-form__name-label--label">
                <p class="text--semi-bold">Name*</p>
              </span>
            </div>
            <div class="module-form__name-input">
              <label for="name">
                <input class="module-form__name-input--text field" type="text" maxlength="100" minlength="0" required />
                <div class="slide-line">
                  <span class="line-one"></span>
                  <span class="line-two"></span>
                </div>
              </label>
            </div>
            <!-- Alert Message: Error -->
            <div class="module-form__name-error hidden">
              <p class="module-form__name-error--text"></p>
            </div>
          </div>

          <div class="module-form__email-container">
            <div class="module-form__email-label">
              <span class="module-form__email-label--icon"><i class="far fa-envelope"></i></span>
              <span class="module-form__email-label--label">
                <p class="text--semi-bold">Email*</p>
              </span>
            </div>
            <div class="module-form__email-input">
              <label for="email">
                <input class="module-form__email-input--text field" type="email" maxlength="100" minlength="0"
                  required />
                <div class="slide-line">
                  <span class="line-one"></span>
                  <span class="line-two"></span>
                </div>
              </label>
            </div>
            <!-- Alert Message: Error -->
            <div class="module-form__email-error hidden">
              <p class="module-form__email-error--text"></p>
            </div>
          </div>

          <div class="module-form__phone-container">
            <div class="module-form__phone-label">
              <span class="module-form__phone-label--icon"><i class="fas fa-phone-alt"></i></span>
              <span class="module-form__phone-label--label">
                <p class="text--semi-bold">Phone</p>
              </span>
            </div>
            <div class="module-form__phone-input">
              <label for="phone">
                <input class="module-form__phone-input--text field" type="tel" />
                <div class="slide-line">
                  <span class="line-one"></span>
                  <span class="line-two"></span>
                </div>
              </label>
            </div>
            <!-- Alert Message: Error -->
            <div class="module-form__phone-error hidden">
              <p class="module-form__phone-error--text"></p>
            </div>
          </div>
        </div>


        <div class="module-form__button-container hidden">
          <button class="btn__block btn__block--error btn__block--delete-form" type="button">
            <h3>Delete Contact</h3>
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="module__overlay hidden"></div>
`
  test("if module is visble when (small) \"Add\" button is clicked", () => {
    const view = new View()
    const smlAddBtn = document.querySelector(".btn__text--add-form")
    const moduleHeaderText = document.querySelector(".module__title").firstElementChild
    const moduleWrapper = document.querySelector(".module__wrapper")

    view.onOpenAddContactForm()

    smlAddBtn.click()

    expect(moduleWrapper.classList.contains("on-screen")).toBeTruthy()
    expect(moduleWrapper.classList.contains("off-screen")).toBeFalsy()
    expect(moduleWrapper.classList.contains("off-screen")).not.toBeUndefined()
    expect(moduleHeaderText.textContent).toBe("Add Contact")
  })
  test("if module is hidden when \"Cancel\" button is clicked after module is opened", () => {
    const view = new View()
    const smlAddBtn = document.querySelector(".btn__text--add-form")
    const cancelBtn = document.querySelector(".btn__text--cancel-form")
    const moduleWrapper = document.querySelector(".module__wrapper")

    view.onOpenAddContactForm()
    view.onCloseAddContactForm()

    smlAddBtn.click()
    cancelBtn.click()

    expect(moduleWrapper.classList.contains("off-screen")).toBeTruthy()
    expect(moduleWrapper.classList.contains("on-screen")).toBeFalsy()
    expect(moduleWrapper.classList.contains("on-screen")).not.toBeUndefined()
  })

  test.skip("if overlay is visible at large device width ONLY", () => {
    const view = new View()
    const smlAddBtn = document.querySelector(".btn__text--add-form")
    const moduleWrapper = document.querySelector(".module__wrapper")
    const moduleOverlay= document.querySelector(".module__overlay")

    // TODO
    // Create mock repo

    // beforeAll(() => {
    //   Object.defineProperty(window, 'matchMedia', {
    //     writable: true,
    //     value: (query) => ({
    //       matches: false,
    //       media: query,
    //     }),
    //   });
    // })

    const resizeWindow = (x, y) => {
      window.innerWidth= x
      window.innerHeight= y
      window.dispatchEvent(new Event('resize'))
    }

    resizeWindow(768, 1024)

    view.onOpenAddContactForm()

    smlAddBtn.click()

    // TODO
    // moduleOverlay z-index should be lower
    // moduleWrapper z-index should be higher

    expect(moduleOverlay.classList.contains("hidden")).toBeFalsy()
    expect(moduleOverlay.classList.contains("hidden")).not.toBeUndefined()
    // expect(moduleWrapper.zIndex).toBe()
  })
  test.todo("if inputs are empty")
})

test.todo("if new contact was created when added")

describe.skip("should have valid values", () => {
  test.todo("if \"email\" has valid value")
  test.todo("if email have correct format");
  test.todo("if phone number have correct format");
})