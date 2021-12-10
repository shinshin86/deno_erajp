type EraNum = number;

type Era = {
  name: string;
  ruby: string;
  rubyInitial: string;
  year: number;
  month: number;
  day: number;
};

const eras: Array<Era> = JSON.parse(Deno.readTextFileSync("./data.json"));

export function getEraString(era: EraNum): string {
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
