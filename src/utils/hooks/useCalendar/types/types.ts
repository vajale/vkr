export interface DateCellItem {
    date: number,
    month: number,
    year: number,

    view?: {
        type: 'past' | 'current' | 'next'
    }
}
