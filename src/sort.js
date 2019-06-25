import { degToRad } from "./utilities";

export default (graph, root) => {
  const points = [];
  const angleSpace = degToRad(360);
  const nodeRadiusStart = 40;
  const childrenRadiusStart = 200;

  points.push({ id: root.acid, name: root.name, parent: null, x: 0, y: 0, r: nodeRadiusStart * 2 });

  (function sort({ id, center: { x: cx, y: cy }, radius, nodeRadius, parentAngle }) {
    const children = graph.getChildren(id);
    const onePart = angleSpace / children.length;
    const delta = onePart / 2;

    children.forEach((child, idx) => {
      const { acid, name } = graph.getNode(child);
      const angle = onePart * idx + delta + parentAngle + degToRad(180);
      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);

      points.push({ id: acid, name, parent: id, x, y, r: nodeRadius });

      sort({
        id: acid,
        center: { x, y },
        radius: radius * 0.6,
        nodeRadius: nodeRadius * 0.6,
        parentAngle: angle
      });
    });
  })({
    id: root.acid,
    name: root.name,
    parent: null,
    center: { x: 0, y: 0 },
    radius: childrenRadiusStart,
    nodeRadius: nodeRadiusStart,
    parentAngle: degToRad(-180)
  });

  return points;
};
