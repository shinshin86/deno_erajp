import { eras } from "./table.ts";

type Era = number;

export function getEraString(era: Era): string {
  const eraStr = toEra(Number(era));
  return eraStr ? eraStr : era.toString();
}

export function toEra(year: number): string {
  for (let i = eras.length - 1; i >= 0; i--) {
    if (eras[i].year <= year) {
      return eras[i].name;
    }
  }

  return "";
}

export function toEraFromTime(date: Date): string {
  for (let i = eras.length - 1; i >= 0; i--) {
    // the month is 0-indexed
    const eraTime = new Date(eras[i].year, eras[i].month - 1, eras[i].day);

    if (date.valueOf() >= eraTime.valueOf()) {
      return eras[i].name;
    }
  }

  return "";
}
