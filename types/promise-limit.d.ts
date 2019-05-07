export = index;
declare function index<T>(count: number): ((fn: () => Promise<T>) => Promise<T>);
