export const changeCountToNullImmutable = (arr, id, newCnt) => {
    return arr.map((item) => {
        if (item.id === id){
            return {...item, cnt: newCnt};
        }
        return item;
    })
};

export const changeCountCntImmutable = (arr, id, newCnt) => {
    return arr.map((item) => {
        if (item.id === id){
            return {...item, cnt: item.cnt + newCnt};
        }
        return item;
    })
};


export const changeStatusImmutable = (arr, id, newStatus) => {
    return arr.map((item) => {
        if (item.id === id){
            return {...item, status: newStatus};
        }
        return item;
    })
};

export const filterSearchFunc = (arr, value) => {
    return arr.filter((item) => {
        return (item.type.toLowerCase().indexOf(value.toLowerCase()) > -1)
            ||(item.model.toLowerCase().indexOf(value.toLowerCase()) > -1)
            ||(item.price.toLowerCase().indexOf(value.toLowerCase()) > -1)
    })
};

export const filterItemsByTypeFunc = (arr, name) => {
    return arr.filter((item) => {
        return item.type === name;
    })
};

export const returnSwitchLastArr = (arr, number) => {
    return arr.slice(number).reverse();
};