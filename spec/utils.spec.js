const { expect } = require("chai");
const { createArticLookup } = require("../utils/index");

describe("createArticLookup", () => {
  it("it can produce a look up object for a single article object", () => {
    let input = [
      {
        title: "HOW COOKING HAS CHANGED US",
        topic: "cooking",
        author: "weegembump",
        body:
          "In a cave in South Africa, archaeologists have unearthed the remains of a million-year-old campfire, and discovered tiny bits of animal bones and ash from plants. It’s the oldest evidence of our ancient human ancestors—probably Homo erectus, a species that preceded ours—cooking a meal.",
        created_at: 1492778094761
      }
    ];
    let actual = createArticLookup(input);
    let expected = { Maryse: 1 };
    expect(actual).to.eql(expected);

    input = [{ owner_id: 2, forename: "Muhammad", surname: "Stark", age: 69 }];
    actual = createArticLookup(input);
    expected = { Muhammad: 2 };
    expect(actual).to.eql(expected);
  });
  it("it produce a look up object for more than one articles", () => {
    let input = [
      { owner_id: 1, forename: "Maryse", surname: "O'Keefe", age: 42 },
      { owner_id: 2, forename: "Muhammad", surname: "Stark", age: 69 }
    ];

    let actual = createArticLookup(input);
    let expected = { Maryse: 1, Muhammad: 2 };
    expect(actual).to.eql(expected);
  });
});
