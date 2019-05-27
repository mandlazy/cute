export const addIsLeaf = (list = []) => list.map(cur => ({
  ...cur,
  isLeaf: false,
}));
