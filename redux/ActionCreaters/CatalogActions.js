import isoFetch from "isomorphic-fetch";
import 'url-search-params-polyfill';
import axios from "axios/index";

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FILTER_LAPTOR = 'FILTER_LAPTOR';
export const FILTER_PHONE = 'FILTER_PHONE';
export const FILTER_TABLET = 'FILTER_TABLET';
export const SHOW_ALL_PRICE = 'SHOW_ALL_PRICE';
export const FILTER_SEARCH = 'FILTER_SEARCH';
export const ACTIVE_OR_BLOCK = 'ACTIVE_OR_BLOCK';
export const CNT_CHANGE = 'CNT_CHANGE';
export const CNT_STARTVALUE_NULL = 'CNT_STARTVALUE_NULL';

export const cntStartValue = (id, cntValue) => {
    return {
        type: CNT_STARTVALUE_NULL,
        id: id,
        cntValue: cntValue,
    }
};

export const cntChange = (id, cntValue) => {
    return {
        type: CNT_CHANGE,
        id: id,
        cntValue: cntValue,
    }
};

export const activeStatusSwitch = (id, status) => {
    return {
        type: ACTIVE_OR_BLOCK,
        id: id,
        status: status,
    }
};

export const search = (value) => {
    return {
        type: FILTER_SEARCH,
        value: value,
    }
};

export const filterLaptor = (name) => {
    return {
        type: FILTER_LAPTOR,
        name: name,
    }
};

export const filterPhone = (name) => {
    return {
        type: FILTER_PHONE,
        name: name,
    }
};

export const filterTablet = (name) => {
    return {
        type: FILTER_TABLET,
        name: name,
    }
};

export const filterAll = () => {
    return {
        type: SHOW_ALL_PRICE,
    }
};


export const loadData = () => async (dispatch) => {
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'CHUPILIN_PRIC_LIST');
    axios({
        method: 'post',
        url: 'https://fe.it-academy.by/AjaxStringStorage2.php',
        headers: {
            "Accept": "application/json",
        },
        data: sp,
    })
        .then(response => {
            dispatch(fetchSuccess(JSON.parse(response.data.result)));
        })
        .catch((error) => {
            dispatch(fetchError(error.userMessage || error.message));
        });
};
export const fetchError = (errorMessage) => {
    return {type: "FETCH_DATA_FAILURE"};
};
export const fetchSuccess = (loadedData) => {
    return {
        type: "FETCH_DATA_SUCCESS",
        priceList: loadedData.priceList
    };
};

export const setPriceListFromLocalStorage = (data) => {
    return {
        type: "FETCH_DATA_SUCCESS",
        priceList: data,
    };
};

export const pushNewItemData = (name, phone, order, funcSuccessOrder, funcErrorOrder) => {
    let sp = new URLSearchParams();
    let updatePassword = Math.random();
    sp.append('f', 'LOCKGET');
    sp.append('n', 'CHUPILIN_ORDER_ITEM');
    sp.append('p', updatePassword);
    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: sp,
    })
        .then((response) => {
            return response.json();
        })
        .then(data => {
            let message = {
                name: name,
                phone: phone,
                order: order
            };
            sp.append('f', 'UPDATE');
            sp.append('n', 'CHUPILIN_ORDER_ITEM');
            sp.append('v', JSON.stringify(message));
            sp.append('p', updatePassword);
            isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: sp,
            })
                .then( () => {
                        funcSuccessOrder();
                        return Promise.resolve("Dummy response to keep the console quiet");
                });
            return Promise.resolve("Dummy response to keep the console quiet");
        })
        .catch((error) => {
            errorPushNewItemData(error.userMessage || error.message, funcErrorOrder);
        });
};
export const errorPushNewItemData = (errorMessage, funcErrorOrder) => {
    console.log(errorMessage);
    funcErrorOrder();
};

export const pushNewItemDataFromLocalStorage = (data) => {
    return {
        type: "FETCH_DATA_SUCCESS",
        priceList: data,
    };
};



