
export const Search = (data, searchQuery) => {
    const searchData = data.filter(element => {
        return element.username.includes(searchQuery);
    })

    return searchData;
}