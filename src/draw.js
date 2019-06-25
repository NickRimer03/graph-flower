const SVGNS = "http://www.w3.org/2000/svg";

function addGroup(point) {
  const group = document.createElementNS(SVGNS, "g");
  const tooltip = document.createElementNS(SVGNS, "title");
  tooltip.textContent = point.name;

  group.appendChild(tooltip);
  group.appendChild(addCircle(point));
  group.appendChild(addText(point));
  group.classList.add("node");

  return group;
}

function addCircle({ x, y, r }) {
  const circle = document.createElementNS(SVGNS, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "rgb(226, 183, 47)");
  circle.setAttribute("stroke", "rgb(226, 115, 78)");

  return circle;
}

function addText({ id, x, y }) {
  const text = document.createElementNS(SVGNS, "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.textContent = id;

  return text;
}

function addLine({ x1, y1, x2, y2 }) {
  const line = document.createElementNS(SVGNS, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "rgb(110, 64, 170)");

  return line;
}

export default points => {
  const svg = document.createElementNS(SVGNS, "svg");
  const [w, h] = [1024, 768];
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", `${-w / 2} ${-h / 2} ${w} ${h}`);
  // edges
  points.forEach(({ x, y, parent }) => {
    if (parent !== null) {
      const parentPoint = points.find(({ id }) => id === parent);
      svg.append(addLine({ x1: parentPoint.x, y1: parentPoint.y, x2: x, y2: y }));
    }
  });

  // nodes
  points.forEach(point => {
    svg.appendChild(addGroup(point));
  });

  return svg;
};
