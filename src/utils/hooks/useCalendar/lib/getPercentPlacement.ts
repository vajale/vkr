function toInteger(number: number) {
    return Math.round(Number(number));
}

export const getPercentPlacement = (height: number, value: number, fullValue: number) => {
    const convertedPercent = value / (fullValue / 100);
    const newPosition = toInteger((height / 100) * convertedPercent);

    return { position: newPosition };
};
