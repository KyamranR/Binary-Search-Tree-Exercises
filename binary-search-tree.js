class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      } else {
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    const insertHelper = (node, val) => {
      if (val < node.val) {
        if (node.left === null) {
          node.left = newNode;
          return;
        } else {
          insertHelper(node.left, val);
        }
      } else if (val > node.val) {
        if (node.right === null) {
          node.right = newNode;
          return;
        } else {
          insertHelper(node.right, val);
        }
      }
    };
    insertHelper(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    return this.findRecursively(val, node.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, values = []) {
    if (node) {
      values.push(node.val);
      this.dfsPreOrder(node.left, values);
      this.dfsPreOrder(node.right, values);
    }
    return values;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, values = []) {
    if (node) {
      this.dfsInOrder(node.left, values);
      values.push(node.val);
      this.dfsInOrder(node.right, values);
    }
    return values;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, values = []) {
    if (node) {
      this.dfsPostOrder(node.left, values);
      this.dfsPostOrder(node.right, values);
      values.push(node.val);
    }
    return values;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return [];
    const queue = [this.root];
    const values = [];
    while (queue.length) {
      const node = queue.shift();
      values.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return values;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null;

      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.right) {
          return node.left;
        } else {
          let temp = node.right;
          while (temp.left) temp = temp.left;
          node.val = temp.val;
          node.right = removeNode(node.right, temp.val);
          return node;
        }
      }
    };
    this.root = removeNode(this.root, val);
    return this.root;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(node = this.root) {
    if (!node) return true;
    const getHeight = (node) => {
      if (!node) return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    };

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(node = this.root) {
    if (!node || (!node.left && !node.right)) return undefined;

    if (node.right && !node.right.right && !node.right.left) {
      return node.val;
    }

    if (node.right) {
      return this.findSecondHighest(node.right);
    }

    return this.findSecondHighest(node.left);
  }
}

module.exports = BinarySearchTree;
