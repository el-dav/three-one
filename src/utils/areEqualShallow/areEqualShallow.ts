type Obj = {
  [key: string]: any;
} | null;

const areEqualShallow = (a: Obj, b: Obj) => {
  if (a === null && b === null) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

export default areEqualShallow;
