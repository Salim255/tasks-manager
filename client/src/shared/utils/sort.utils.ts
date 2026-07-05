type HasCreatedAt = {
    createdAd: string | Date
};

export const sortList = <T extends HasCreatedAt>(list: T[]): T[] => {
    return [...list.sort(
        (a, b) => (new Date(b.createdAd).getTime() - new Date(a.createdAd).getTime()))
    ]
}