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
      devices: operationArray,
      minPercentActivityRangePoint: i,
      maxPercentActivityRangePoint: ceilThreshold,
    });
  }

  const returnData = new DensityData(
    mergeEmptyDensityGraphElements(dataArrays, percentFragmentation),
    numbersArray.length,
    numDivisions,
    percentFragmentation
  );
  return returnData;
};

function mergeEmptyDensityGraphElements(
  elements: DensityGraphElement[],
  fragmentationRate: number
): DensityGraphElement[] {
  if (elements.length === 0) return elements;

  const mergedElements: DensityGraphElement[] = [];
  let i = 0;

  while (i < elements.length) {
    let currentElement = { ...elements[i] };

    if (currentElement.devices.length === 0) {
      let j = i + 1;

      while (j < elements.length && elements[j].devices.length === 0) {
        currentElement.maxPercentActivityRangePoint += fragmentationRate;
        j++;
      }

      mergedElements.push(currentElement);

      i = j;
    } else {
      mergedElements.push(currentElement);
      i++;
    }
  }

  return mergedElements;
}

export type DensityGraphElement = {
  devices: number[];
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
