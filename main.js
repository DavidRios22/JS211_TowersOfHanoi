'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


const movePiece = (startStack, endStack) => {
  let piece = stacks[startStack].pop()

  stacks[endStack].push(piece)

}

const isLegal = (startStack, endStack) => {
  if (((startStack === !"a") || (startStack === !"b") || (startStack === !"c")) && ((endStack === !"a") || (endStack === !"b") || (endStack === !"c"))) {
    console.log("not a b or c");
    return false
  } else if (stacks[startStack].length == 0) {
    console.log("start stack is empty");
    return false
  } else if (stacks[endStack].length !== 0) {
      if (stacks[startStack] > stacks[endStack]) {
        console.log("startStack is larger than endStack");
        return false
      } else {
      return true
    }
  } else {
    return true
  }
}

const checkForWin = () => {
  if ((stacks["b"].length == 4) || (stacks["c"].length == 4))  {
    console.log("You win!");
    return true
  } else {
    return false
  }

}

const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  } else {
    console.log("Not a legal move")
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
