export function insertElementBefore<T> (array: T[], indexToInsertBefore: number, newElement: T): T[] {
    return array.reduce((acc: T[], item: T, index: number) => {
        if (index === indexToInsertBefore) {
            acc.push(newElement);
        }
        acc.push(item);
        return acc;
    }, []);
}
