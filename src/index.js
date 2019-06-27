import anime from "animejs/lib/anime.es.js";
import data from "./data";
import Graph from "./parser";
import sort from "./sort";
import draw from "./draw";

let current = 1;

const graph = new Graph();
const tree = graph.parseData(data);
const root = graph.getNode(current);
const sorted = sort(tree, root);
let lastSorted = JSON.parse(JSON.stringify(sorted));
const edges = sorted.reduce((acc, { x, y, name, parent }) => {
  const parentPoint = sorted.find(({ id }) => id === parent);
  if (parent !== null) {
    acc.push({
      p1: { x, y, name },
      p2: { x: parentPoint.x, y: parentPoint.y, name: parentPoint.name }
    });
  }
  return acc;
}, []);

let svg = draw(sorted, edges);
document.body.append(svg);

document.querySelectorAll("g.node").forEach(node => {
  node.onclick = function() {
    const newTree = graph.erase().parseData(data);

    let parentName = null;
    const thisName = this.getAttribute("data-name");
    const item = newTree.nodes.find(({ name: n }) => n === thisName);

    if (item.acid !== current) {
      current = item.acid;
      if (item.parent !== null) {
        item.children.push(item.parent);
        const parent = newTree.nodes.find(({ acid }) => acid === item.parent);
        parent.children.length = 0;
        parentName = parent.name;
      }

      const animDuration = 500;
      const newSort = sort(newTree, item);

      tree.nodes
        .reduce((acc, { name }) => {
          let x, y, r;
          const a = lastSorted.find(({ name: n }) => n === name);
          if (a) {
            [x, y, r] = [a.x, a.y, a.r];
          } else {
            const b = lastSorted.find(({ name }) => name === thisName);
            [x, y, r] = [b.x, b.y, b.r];
          }
          const node = document.querySelector(`g[data-name="${name}"]`);
          const exist = newSort.find(({ name: n }) => n === name);
          if (exist) {
            acc.push(
              {
                targets: node,
                opacity: 1,
                easing: "linear",
                duration: animDuration,
                begin: () => {
                  node.style.display = "block";
                }
              },
              {
                targets: node.querySelector("circle"),
                r: [r, exist.r],
                cx: [x, exist.x],
                cy: [y, exist.y],
                easing: "linear",
                duration: animDuration,
                fill: name === parentName ? "rgb(100, 149, 237)" : "rgb(226, 183, 47)",
                stroke: name === parentName ? "rgb(30, 144, 255)" : "rgb(226, 115, 78)"
              },
              {
                targets: node.querySelector("text"),
                x: [x, exist.x],
                y: [y, exist.y],
                easing: "linear",
                duration: animDuration,
                fill: name === parentName ? "rgb(173, 216, 230)" : "rgb(210, 105, 30)"
              }
            );
            return acc;
          }

          const parent = newSort.find(({ name }) => name === parentName);
          acc.push(
            {
              targets: node,
              opacity: 0,
              easing: "linear",
              duration: animDuration,
              complete: () => {
                node.style.display = "none";
              }
            },
            {
              targets: node.querySelector("circle"),
              r: [r, parent.r],
              cx: [x, parent.x],
              cy: [y, parent.y],
              easing: "linear",
              duration: animDuration
            },
            {
              targets: node.querySelector("text"),
              x: [x, parent.x],
              y: [y, parent.y],
              easing: "linear",
              duration: animDuration
            }
          );
          return acc;
        }, [])
        .forEach(anim => {
          anime(anim);
        });

      edges
        .reduce((acc, { p1: { name: name1 }, p2: { name: name2 } }) => {
          let x1, y1, x2, y2;
          const a1 = lastSorted.find(({ name }) => name === name1);
          const a2 = lastSorted.find(({ name }) => name === name2);
          if (a1 && a2) {
            [x1, y1, x2, y2] = [a1.x, a1.y, a2.x, a2.y];
          } else {
            const b = lastSorted.find(({ name }) => name === thisName);
            [x1, y1, x2, y2] = [b.x, b.y, b.x, b.y];
          }
          const edge = document.querySelector(`line[data-name="${name1}-${name2}"]`);
          const point1 = newSort.find(({ name }) => name === name1);
          const point2 = newSort.find(({ name }) => name === name2);
          if (point1 && point2) {
            acc.push({
              targets: edge,
              opacity: 1,
              x1: [x1, point1.x],
              y1: [y1, point1.y],
              x2: [x2, point2.x],
              y2: [y2, point2.y],
              easing: "linear",
              duration: animDuration,
              begin: () => {
                edge.style.display = "block";
              }
            });
            return acc;
          }

          const parent = newSort.find(({ name }) => name === parentName);
          acc.push({
            targets: edge,
            opacity: 0,
            x1: [x1, parent.x],
            y1: [y1, parent.y],
            x2: [x2, parent.x],
            y2: [y2, parent.y],
            easing: "linear",
            duration: animDuration,
            complete: () => {
              edge.style.display = "none";
            }
          });
          return acc;
        }, [])
        .forEach(anim => {
          anime(anim);
        });

      lastSorted = newSort;
    }
  };
});
