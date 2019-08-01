class DNAHelper {
  static prepareDNA(dna) {
    return dna.split('0x')[1].split('');
  }
  static getAppearanceFeatures(dna) {
    return DNAHelper.getFeatures(dna, BASE_APPEARANCE, CEIL_APPEARANCE);
  }

  static getAthleticsFeatures(dna) {
    return DNAHelper.getFeatures(dna, BASE_ATHLETICS, CEIL_ATHLETICS);
  }

  static getTechnicalFeatures(dna) {
    return DNAHelper.getFeatures(dna, BASE_TECHNICAL, CEIL_TECHNICAL);
  }

  static getMentalFeatures(dna) {
    return DNAHelper.getFeatures(dna, BASE_MENTAL, CEIL_MENTAL);
  }

  static getFeatures(dna, base, ceil) {
    const dnaPrepared = DNAHelper.prepareDNA(dna);
    return dnaPrepared.slice(base, ceil).map((f, i) => ({
      name: DNA_ARRAY[i + base],
      level: DNA_FEATURE_TO_PERCENT[f]
    }));
  }
}

export default DNAHelper;

const BASE_APPEARANCE = 0;
const CEIL_APPEARANCE = 5;
const BASE_ATHLETICS = 5;
const CEIL_ATHLETICS = 11;
const BASE_TECHNICAL = 11;
const CEIL_TECHNICAL = 18;
const BASE_MENTAL = 18;
const CEIL_MENTAL = 20;

const DNA_FEATURE_TO_PERCENT = {
  '0': 10,
  '1': 20,
  '2': 30,
  '3': 30,
  '4': 40,
  '5': 40,
  '6': 50,
  '7': 50,
  '8': 50,
  '9': 60,
  a: 60,
  b: 70,
  c: 70,
  d: 80,
  e: 90,
  f: 100
};

const DNA_ARRAY = [
  'skinColor',
  'hairColor',
  'hairLength',
  'eyes',
  'mouth ',
  'shape',
  'speed',
  'endurance',
  'concentration',
  'strength',
  'height',
  'shoot',
  'defense',
  'goalkeep',
  'technical',
  'creativity',
  'decision',
  'aim',
  'roguish',
  'stability'
];
