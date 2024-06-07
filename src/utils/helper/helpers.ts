// export function buildHierarchy (items) {
//     const itemMap = new Map();
//
//     // Создаем карту элементов по id
//     items.forEach(item => {
//         itemMap.set(item.id, { ...item });
//     });
//
//     // Создаем иерархию
//     const hierarchy = [];
//     items.forEach(item => {
//         if (item.parent !== undefined) {
//             // Находим родительский элемент и добавляем текущий элемент как child
//             const parent = itemMap.get(item.id);
//             const child = itemMap.get(item.parent);
//             if (parent && child) {
//                 parent.parent = child;
//             }
//         }
//     });
//
//     // Фильтруем элементы, которые не являются child других элементов
//     items.forEach(item => {
//         if (!itemMap.has(item.parent)) {
//             hierarchy.push(itemMap.get(item.id));
//         }
//     });
//
//     return hierarchy;
// }

export function buildDeepHierarchy (items) {
    const itemMap = new Map();

    // Создаем карту элементов по id
    items.forEach((item) => {
        itemMap.set(item.id, { ...item, child: undefined });
    });

    // Обновляем поле child, чтобы оно содержало объект, а не id
    items.map((item) => {
        if (item.child !== undefined) {
            const parent = itemMap.get(item.id);
            const child = itemMap.get(item.child);
            if (parent && child) {
                parent.child = {
                    ...child,
                    parent: item.id,
                };
                itemMap.delete(item.child);
            }
        }
    });

    return Array.from(itemMap.values());
}

export const rawData = [
    { id: 1, name: "Root element", parent: 0 },
    { id: 2, name: "Child of the first element", parent: 1 },
    { id: 555, name: "Child of the second element", parent: 2 },
];

export function pack (data) {
    const childs = (id) =>
        data
            .filter((item) => item.parent === id)
            .map(({ id, name }) => ({ id, name, children: childs(id) }))
            .map(({ id, name, children }) =>
                children.length ? { id, name, children } : { id, name },
            );
    return childs(0);
}

export function formatDateString (jsonDate: string): string {
    const date = new Date(jsonDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isTomorrow = date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    let dateString = '';

    if (isToday) {
        dateString = 'сегодня';
    } else if (isTomorrow) {
        dateString = 'завтра';
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        dateString = `${day}-${month}-${year}`;
    }

    return `${dateString} ${hours}:${minutes}`;
}
