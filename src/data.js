const data = [
  "$",
  {},
  [
    "intl",
    {},
    ["cluster", {}, ["scheduler", {}, ["tween", {}], ["comparison", {}], ["dates", {}]]],
    ["operator", {}],
    ["util", {}]
  ],
  [
    "error",
    {},
    ["scale", {}],
    [
      "physics",
      {},
      ["parallel", {}, ["fn", {}], ["not", {}], ["range", {}], ["match", {}]],
      ["interpolate", {}],
      ["axis", {}],
      ["heap", {}, ["xor", {}, ["or", {}, ["and", {}]]]],
      ["render", {}],
      ["label", {}]
    ],
    ["display", {}],
    ["optimization", {}],
    ["legend", {}]
  ],
  ["main", {}, ["converters", {}, ["query", {}], ["sort", {}], ["easing", {}], ["maths", {}]]]
];

let index = 1;
data.acid = index++;

(function indexation([, , ...children]) {
  children.forEach(child => {
    child.acid = index++;
    indexation(child);
  });
})(data);

export default data;
