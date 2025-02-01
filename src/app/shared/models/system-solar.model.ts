export interface BodyResponse {
  bodies: Body[];
}

export interface Body {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons: Moon[] | null;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  mass: Mass | null;
  vol: Vol | null;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet: AroundPlanet | null;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: BodyType;
  rel: string;
}

export interface AroundPlanet {
  planet: Planet;
  rel: string;
}

export enum Planet {
  Eris = 'eris',
  Eugenia = 'eugenia',
  Haumea = 'haumea',
  Ida = 'ida',
  Jupiter = 'jupiter',
  Kleopatra = 'kleopatra',
  Makemake = 'makemake',
  Mars = 'mars',
  Neptune = 'neptune',
  Orcus = 'orcus',
  Pluton = 'pluton',
  Quaoar = 'quaoar',
  Saturne = 'saturne',
  Sylvia = 'sylvia',
  Terre = 'terre',
  Uranus = 'uranus',
}

export enum BodyType {
  Asteroid = 'Asteroid',
  Comet = 'Comet',
  DwarfPlanet = 'Dwarf Planet',
  Moon = 'Moon',
  Planet = 'Planet',
  Star = 'Star',
}

export interface Mass {
  massValue: number;
  massExponent: number;
}

export interface Moon {
  moon: string;
  rel: string;
}

export interface Vol {
  volValue: number;
  volExponent: number;
}
