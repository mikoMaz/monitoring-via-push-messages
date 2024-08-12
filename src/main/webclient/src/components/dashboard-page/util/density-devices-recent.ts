export const getDensityRecentChart = (
  numbersArray: number[],
  percentFragmentation: number
): DensityData => {
  var data = numbersArray.sort(function (a, b) {
    return a - b;
  });

  let numDivisions = Math.ceil(100 / percentFragmentation);
  let dataArrays: DensityGraphElement[] = [];
  let operationArray: number[] = [];
  for (let i = 0; i < 100; i += percentFragmentation) {
    let ceilThreshold = i + percentFragmentation;
    operationArray = data.filter((num) => num >= i && num < ceilThreshold);
    dataArrays.push({
      numElements: operationArray,
      minPercentActivityRangePoint: i,
      maxPercentActivityRangePoint: ceilThreshold,
    });
  }

  const returnData = new DensityData(
    dataArrays,
    numbersArray.length,
    numDivisions,
    percentFragmentation
  );
  return returnData;
};

export type DensityGraphElement = {
  numElements: number[];
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
