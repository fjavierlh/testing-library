export function describe(name: string, callback: () => void) {
  console.log(name);
  callback();
}

export function expect<T>(expected: T) {
  return {
    toBe(result: T) {
      if (result !== expected) {
        throw new Error(`❌ ${result} is not equal to ${expected}`);
      }
    },
  };
}

export async function test(
  description: string,
  callback: () => void | Promise<void>
) {
  try {
    await callback();
    console.log("✅", description);
  } catch (error) {
    console.log("❌", description);
    console.error(error);
  }
}

export const it = test;
