/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function minDepthCheck(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return minDepthCheck(node.right) + 1;
      if (node.right === null) return minDepthCheck(node.left) + 1;
      return Math.min(minDepthCheck(node.left), minDepthCheck(node.right)) + 1;
    }
    return minDepthCheck(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthCheck(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return maxDepthCheck(node.right) + 1;
      if (node.right === null) return maxDepthCheck(node.left) + 1;
      return Math.max(maxDepthCheck(node.left), maxDepthCheck(node.right)) + 1;
    }
    return maxDepthCheck(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let sum = 0;

    function maxSumCreation(node) {
      if (node === null) return 0;
      const sumLeft = maxSumCreation(node.left);
      const sumRight = maxSumCreation(node.right);
      sum = Math.max(sum, node.val + sumLeft + sumRight);
      return Math.mex(0, node.val + sumLeft, node.val + sumRight);
    }

    maxSumCreation(this.root);
    return sum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return 0;

    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root && node2 === this.root) return false;

    function cousinCheck(
      findNode,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === findNode || currentNode.right === findNode) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        cousinCheck(findNode, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        cousinCheck(findNode, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = cousinCheck(node1, this.root);
    let node2Info = cousinCheck(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    const check = [];

    function changeStorage(node) {
      if (node) {
        check.push(node.val);
        changeStorage(node.left);
        changeStorage(node.right);
      } else {
        check.push("#");
      }
    }

    changeStorage(tree.root);
    return check.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const check = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array
      if (check.length) {
        const currentVal = check.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (currentNode === null) return null;

    if (currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if (left !== null && right !== null) return currentNode;

    if (left !== null || right !== null) return left || right;

    if (left === null && right === null) return null;
  }
}

function getElementByID() {
  if (!this.root) return 0;
}

module.exports = { BinaryTree, BinaryTreeNode };
