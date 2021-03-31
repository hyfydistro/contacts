import Model from "../src/scripts/model.js"
import getUniqueId from "../src/scripts/libs/idGenerator"

const sample = {
  id: getUniqueId(),
  name: "john",
  email: "john@example.com",
  phone: "",
  favorite: false
}

// TODO
// write test cases for following "todo"

const model = new Model();
model.addContact("john", "john@example.com", "555-555-1234");
const modelLength = model.contactlist.length;


describe("when data is added", () => {
  test("if array is not empty", () => {
    expect(modelLength).toBeGreaterThan(0);
  })
  test("if value exist", () => {
    expect(model.contactlist[0].name).toBe("john")
  })


  describe("should have key and value", () => {
    test("if \"name\" has correct key and value", () => {
      expect(model.contactlist[0]).toEqual(expect.objectContaining({name: "john"}));
      })
    test("if \"email\" has correct key and value", () => {
      expect(model.contactlist).toEqual(
        expect.arrayContaining(
            [
              expect.objectContaining({email: "john@example.com"})
            ]
          )
        );
      })
      // ! WIP
      test.todo("if \"phone\" has correct key and value")
      test.todo("if \"favorite\" has correct key and value")
  })


  describe("should not have any values that are undefined", () => {
    test("if \"id\" is not undefined", () => {
      const result = model.contactlist[modelLength-1].id;

      expect(result).not.toBeUndefined();
    })
    test("if \"name\" is not undefined", () =>{
      const result = model.contactlist[modelLength-1].name;

      expect(result).not.toBeUndefined();
    })
    test("if \"email\" is not undefined", () => {
      const result = model.contactlist[modelLength-1].email;

      expect(result).not.toBeUndefined();
    })
    test("if \"phone\" is undefined", () => {
      const result = model.contactlist[modelLength-1].phone;

      expect(result).not.toBeUndefined();
    })
  })

  test("if \"favorite\" is boolean false", () => {
    const result = model.contactlist[modelLength-1].favorite;

    expect(result).toBeFalsy();
  })


  // ! WIP (current)
  describe("should have valid values", () => {
    test("if \"email\" has valid value", () => {
      const regex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const result = model.contactlist[0].email;

      expect(result).toMatch(regex);
    })

    // ! WIP
    test.todo("if email have correct format");
    test.todo("if phone number have correct format");
  })

})


// ! WIP
// use `describe`
test.todo("if methods are called")