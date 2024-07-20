export const getDensityData = (
  uptimeValuesArray: number[],
  numDivisions: number
) => {
  var data = uptimeValuesArray.sort(function (a, b) {
    return a - b;
  });

  let divisionsCount = numDivisions > data.length ? data.length : numDivisions;
  let min = data[0];
  const max = data[data.length - 1];
  const fragmentationRate = (max - min) / divisionsCount;
  const derivationValues: (number | undefined)[] = [];
  let subArrays: number[][] = [];

  while (
    calculateSteepnessIsTooBig(min, data[data.length / 2], max) &&
    data.length > 3
  ) {
    derivationValues.push(data.shift());
    min = data[0];
  }

  let currentThreshold = min;
  let operationArray: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] <= currentThreshold + fragmentationRate) {
      operationArray.push(data[i]);
    } else {
      subArrays.push(operationArray);
      operationArray = [];
      currentThreshold += fragmentationRate;
    }
  }
  if (operationArray.length > 0) {
    subArrays.push(operationArray);
  }
  const marginValues = derivationValues.filter((e) => e !== undefined);
  if (derivationValues.length) {
    subArrays = [marginValues].concat(subArrays);
  }

  const returnData = new DensityData(
    subArrays.map((array) => {
      return {
        numElements: array.length,
        minPercentActivityRangePoint: array[0],
        maxPercentActivityRangePoint: array[array.length - 1],
      };
    }),
    uptimeValuesArray.length,
    divisionsCount,
    fragmentationRate
  );

  returnData.elements = returnData.elements.filter((e) => e.numElements !== 0);
  return returnData;
};

const calculateSteepnessIsTooBig = (
  min: number,
  mid: number,
  max: number
): boolean => {
  const avarageMinMax = (min + max) / 2;
  //if avarage-mean ratio is more than 3 times bigger than mean-max_value ratio than function is too steep
  if (Math.abs(avarageMinMax - mid) > (max - mid) * 3) {
    return true;
  } else {
    return false;
  }
};

export type DensityGraphElement = {
  numElements: number;
  minPercentActivityRangePoint: number;
  maxPercentActivityRangePoint: number;
};

export class DensityData {
  elements: DensityGraphElement[];
  countElements: number;
  numDivisions: number;
  fragmentationRate: number;

  constructor(
    elements: DensityGraphElement[],
    countElements: number,
    numDivisions: number,
    fragmentationRate: number
  ) {
    this.elements = elements;
    this.countElements = countElements;
    this.numDivisions = numDivisions;
    this.fragmentationRate = fragmentationRate;
  }
}
