export default class Graph {
  constructor() {
    this.nodes = [];
  }

  parseData(data, parent) {
    const [, , ...children] = data;
    this.addNode(data, parent);
    children.forEach(child => this.parseData(child, data.acid));

    return this;
  }

  addNode(data, parent) {
    const [name, , ...children] = data;
    const {
      acid
      // entities,
      // prop: { source }
    } = data;

    this.nodes.push({
      name: JSON.stringify(name).replace(/"/g, ""),
      acid,
      parent: parent ? parent : null,
      children: children.map(({ acid }) => acid)
      // entities: entities.length,
      // source: parseJsDoc({ source })
    });

    return this;
  }

  getNode(nodeAcid) {
    const find = this.nodes.find(({ acid }) => acid === nodeAcid);

    return find ? find : null;
  }

  getChildren(nodeAcid) {
    const find = this.nodes.find(({ acid }) => acid === nodeAcid);

    return find ? find.children : null;
  }

  erase() {
    this.nodes.length = 0;

    return this;
  }

  get nodesCount() {
    return this.nodes.length;
  }
}
