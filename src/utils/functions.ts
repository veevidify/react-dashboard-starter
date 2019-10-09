declare global {
  type GObject = { [key: string]: any };
}

export const pick = <T extends GObject>(obj: T) => (...args: (keyof T)[]): Partial<T> =>
  Object.keys(obj).reduce(
    (strippedObj, key) => (args.includes(key) ? { ...strippedObj, [key]: obj[key] } : strippedObj),
    {} as Partial<T>,
  );

export const omit = <T extends GObject>(obj: T) => (...args: (keyof T)[]): Partial<T> =>
  Object.keys(obj).reduce(
    (strippedObj, key) => (!args.includes(key) ? { ...strippedObj, [key]: obj[key] } : strippedObj),
    {} as Partial<T>,
  );

export const take = <T = any>(arr: T[], num: number) => arr.slice(0, num);

export const intArr = (len: number) => {
  const res = [];
  for (let i = 0; i < len; i++) res.push(i);
  return res;
};

export const consolePrint = (json: GObject) => console.log(JSON.stringify(json, null, 4));
export const liftPromise = <T>(resolution: T) => new Promise<T>(r => r(resolution));
