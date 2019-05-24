export const addIsLeaf = (list = []) => {
  return list.map(cur => {
    return {
      ...cur,
      isLeaf: false
    }
  })
}