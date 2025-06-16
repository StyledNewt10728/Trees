/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    let sum = this.root.val;

    function sumCreation(node) {
      for (let child of node.children) {
        sum += child.val;
        if (child.children.length > 0) {
          sumCreation(child);
        }
      }
    }

    sumCreation(this.root);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let check = this.root.val % 2 ? 1 : 0;

    function evenCheck(node) {
      for (let child of node.children) {
        if (child.val % 2 === 0) check++;

        if (child.children.length > 0) {
          evenCheck(child);
        }
      }
    }
    evenCheck(this.root);
    return check;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let check = this.root.val > lowerBound ? 1 : 0;

    function nodeCheck(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) check++;

        if (child.children.length > 0) {
          nodeCheck(child);
        }
      }
    }

    nodeCheck(this.root);
    return check;
  }
}

module.exports = { Tree, TreeNode };
