export interface BodyResponse {
  bodies: Body[];
}

export interface Body {
  id: string;
  name: string;
  englishName: string;
  moons: Moon[] | null;
  mass: Mass | null;
  avgTemp: number;
  meanRadius: number;
  gravity: number;
  sideralOrbit: number;
  sideralRotation: number;
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
