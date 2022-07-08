const {
  sum,
  nativeNull,
  compact,
  groupBy,
  map,
} = require("./unit-test");

describe("Function Sum:", () => {
  test("should return sum of two values", () => {
    expect(sum(1, 5)).toEqual(6);
  });

  test("should return value correctly comparing to others", () => {
    expect(sum(1, 3)).toBeGreaterThan(2);
    expect(sum(4, 5)).toBeLessThan(10);
    expect(sum(4, 5)).toBeLessThanOrEqual(10);
  });

  test("should sum two float values correctly", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("Function NativeNull:", () => {
  test("should return false value null", () => {
    expect(nativeNull()).toBe(null);
    expect(nativeNull()).toEqual(null);
    expect(nativeNull()).toBeNull();
    expect(nativeNull()).toBeFalsy();
    expect(nativeNull()).toBeDefined();
    expect(nativeNull()).not.toBeTruthy();
    expect(nativeNull()).not.toBeUndefined();
  });
});

describe("Function Compact:", () => {
  let array;

  beforeEach(() => {
    array = [1, 3, false, "", "true", true];
  });

  test("should be defined", () => {
    expect(compact(array)).toBeDefined();
    expect(compact(array)).not.toBeUndefined();
  });

  test("should be editable", () => {
    array.push("one", "two");
    expect(compact(array)).toContain("one");
    expect(compact(array)).toContain("two");
  });

  test("should return truthy values", () => {
    const result = [1, 3, "true", true];
    expect(compact(array)).toEqual(result);
  });

  test("should not contain falsy values", () => {
    expect(compact(array)).toBeTruthy();
    expect(compact(array)).not.toBeFalsy();
    expect(compact(array)).not.toContain("");
    expect(compact(array)).not.toContain(false);
    expect(compact(array)).not.toContain(0);
    expect(compact(array)).not.toContain(null);
    expect(compact(array)).not.toContain(undefined);
  });
});

describe("Function GroupBy:", () => {
  let array;

  beforeEach(() => {
    array = [1, 3, false, "", "true", true];
  });

  test("should group by Math.floor", () => {
    const array = [1.2, 1.4, 2.3, 2.4, 2.1, 3.3];
    const result = { 1: [1.2, 1.4], 2: [2.3, 2.4, 2.1], 3: [3.3] };
    expect(groupBy(array, Math.floor)).toEqual(result);
  });

  test("should not return array", () => {
    expect(groupBy([], Math.trunc)).not.toBeInstanceOf(Array);
  });
});

describe("Function map:", () => {
  let arr;
  let fn;

  beforeEach(() => {
    arr = [1, 2, 3, 5];
    fn = jest.fn((x) => x ** 2);
    map(arr, fn);
  });

  test("should call callback", () => {
    expect(fn).toBeCalled();
  });

  test("should call callback 4 times", () => {
    expect(fn).toBeCalledTimes(4);
    expect(fn.mock.calls.length).toBe(4);
  });

  test("should pow 2 each element", () => {
    expect(fn.mock.results[0].value).toBe(1);
    expect(fn.mock.results[1].value).toBe(4);
    expect(fn.mock.results[2].value).toBe(9);
    expect(fn.mock.results[3].value).toBe(25);
  });

  test("should fn work", () => {
    fn.mockReturnValueOnce(100).mockReturnValueOnce(200).mockReturnValue("66");

    expect(fn()).toBe(100);
    expect(fn()).toEqual(200);
    expect(fn()).toBe("66");
  });
});
