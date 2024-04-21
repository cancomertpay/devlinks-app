export const pathSplitter = (pathname, direction) => {
  const pathList = pathname.split("/");
  if (pathList.length < 3) return pathname;
  if (direction === "front") pathList.shift();
  if (direction === "back") pathList.pop();
  const path = pathList.join("/");
  return path;
};
