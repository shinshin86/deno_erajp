import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { getEraString, toEra, toEraFromTime } from "./mod.ts";

type TestCase = {
  year: number;
  era: string;
};

const testCase: Array<TestCase> = [
  { year: 1900, era: "明治" },
  { year: 1911, era: "明治" },
  { year: 1912, era: "大正" },
  { year: 1925, era: "大正" },
  { year: 1926, era: "昭和" },
  { year: 1988, era: "昭和" },
  { year: 1989, era: "平成" },
  { year: 2016, era: "平成" },
  { year: 2019, era: "令和" },
  { year: 2039, era: "令和" },
];

Deno.test("getEraString", async (t) => {
  await t.step("Get era string", () => {
    const year = 2030;
    assertEquals("令和", getEraString(year));
  });
});

Deno.test("toEra", async (t) => {
  for (const test of testCase) {
    await t.step(`Test case: ${test.year} - ${test.era}`, () => {
      const expected = testCase.find(({ year }) => year === test.year);
      assertEquals(expected?.era, toEra(test.year));
    });
  }
});

Deno.test("toEraFromTime", async (t) => {
  await t.step("Test with time now", () => {
    const now = new Date();
    const era = toEraFromTime(now);
    assertEquals(era, toEraFromTime(now));
  });
});
