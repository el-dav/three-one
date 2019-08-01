type Obj = {
  [key: string]: any;
};

const areEqualShallow = (a: Obj, b: Obj) => {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

export default areEqualShallow;
