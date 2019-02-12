const { expect } = require('chai');
const { createArticLookup } = require('../utiles/index');

describe('createArticLookup', () => {
  it('it can produce a look up object for a single article object', () => {
    const input = [
      {
        article_id: 1,
        title: 'Running a Node App',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2016 - 08 - 17T23: 00: 00.000Z',
      },
    ];
    const actual = createArticLookup(input);
    const expected = { 'Running a Node App': 1 };
    expect(actual).to.eql(expected);
  });
  it('it produce a look up object for more than one articles', () => {
    const input = [
      {
        article_id: 1,
        title: 'Running a Node App',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2016 - 08 - 17T23: 00: 00.000Z',
      },
      {
        article_id: 2,
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2017 - 07 - 19T23: 00: 00.000Z',
      },
    ];

    const actual = createArticLookup(input);
    const expected = {
      'Running a Node App': 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
    };
    expect(actual).to.eql(expected);
  });
});
