it("custom group", () => {
  const list = [10, 20, 30];

  expectThatList(list).isExactly(10, 20, 30);
});

function expectThatList<T>(list: T[]) {
  return listMatchers<T>(list);
}

function listMatchers<T>(list: T[]) {
  return {
    isExactly: (...items: T[]) => {
      expect(items.length).toBe(list.length);
      items.forEach((_: T, i: number) => {
        expect(items[i]).toBe(list[i]);
      });
    },
  };
}
