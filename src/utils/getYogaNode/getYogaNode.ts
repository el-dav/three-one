const getYogaNode = (obj: any) => {
  let yogaParent = obj;
  while (yogaParent) {
    if (yogaParent.yogaNode) break;
    yogaParent = yogaParent.parent;
  }
  return yogaParent;
};

export default getYogaNode;
