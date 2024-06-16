export const filterArray = (arr, callback) => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i])
        if (callback(arr[i])) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
