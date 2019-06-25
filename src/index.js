import data from "./data";
import Graph from "./parser";
import sort from "./sort";
import draw from "./draw";

let current = 1;

const graph = new Graph();
let tree = graph.parseData(data);
const root = graph.getNode(current);

let svg = draw(sort(tree, root));
document.body.append(svg);

(function addEvents() {
  document.querySelectorAll("g.node").forEach(node => {
    node.onclick = function() {
      // const name = this.children.item("title").textContent;
      // const item = tree.nodes.find(({ name: n }) => n === name);
      //
      // if (item.acid !== current) {
      //   current = item.acid;
      //   if (item.parent !== null) {
      //     item.children.push(item.parent);
      //     const c = tree.nodes.find(({ acid }) => acid === item.parent).children;
      //     c.splice(c.indexOf(item.acid), 1);
      //   }
      //
      //   tree = graph.parseData(data);
      //   svg.remove();
      //   svg = draw(sort(tree, item));
      //   document.body.append(svg);
      //   addEvents();
      // }
    };
  });
})();
