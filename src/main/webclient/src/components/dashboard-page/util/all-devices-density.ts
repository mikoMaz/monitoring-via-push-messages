function kernelDensityEstimator(
  kernel: (u: number) => number,
  X: number[],
  bandwidth: number
) {
  return (x: number) => {
    const n = X.length;
    return (
      (1 / (n * bandwidth)) *
      X.map((xi) => kernel((x - xi) / bandwidth)).reduce((a, b) => a + b, 0)
    );
  };
}

function gaussianKernel(u: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
}

function computeDensity(data: number[], bandwidth: number) {
  const kde = kernelDensityEstimator(gaussianKernel, data, bandwidth);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const step = (max - min) / 100;
  const densityData = [];

  for (let x = min; x <= max; x += step) {
    densityData.push({ x, y: kde(x) });
  }

  return densityData;
}

export const getAllDevicesDensity = (devices: number[]) => {
  const bandwidth = 0.5;
  return computeDensity(devices, bandwidth);
};
