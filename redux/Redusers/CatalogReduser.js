import {FETCH_DATA_SUCCESS,
        FETCH_DATA_FAILURE,
        FILTER_LAPTOR,
        FILTER_PHONE,
        FILTER_TABLET,
        SHOW_ALL_PRICE,
        FILTER_SEARCH,
        ACTIVE_OR_BLOCK,
        CNT_CHANGE,
        CNT_STARTVALUE_NULL} from '../ActionCreaters/CatalogActions'

import {changeCountToNullImmutable,
        changeCountCntImmutable,
        changeStatusImmutable,
        filterSearchFunc,
        filterItemsByTypeFunc} from '../../modules/modules'

const initialState = {
    isLoaded: false,
    startPriceList: [],
    priceList: [],
    checkedRadio: 0,
    foundNull: false,
};

const CatalogReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            if (!state.isLoaded) {
                return {
                    ...state,
                    isLoaded: true,
                    startPriceList: action.priceList,
                    priceList: action.priceList,
                };
            } else {
                return {
                    ...state,
                    foundNull: false};
            }
        case FETCH_DATA_FAILURE:
            console.log('ошибка связи');
            return {
                ...state,
                isLoaded: false,
            };
        case CNT_STARTVALUE_NULL:
            return {
                ...state,
                startPriceList: changeCountToNullImmutable(state.startPriceList, action.id, action.cntValue),
                priceList: changeCountToNullImmutable(state.priceList, action.id, action.cntValue),
            };
        case CNT_CHANGE:
            return {
                ...state,
                startPriceList: changeCountCntImmutable(state.startPriceList, action.id, action.cntValue),
                priceList: changeCountCntImmutable(state.priceList, action.id, action.cntValue),
            };
        case ACTIVE_OR_BLOCK:
            return {
                ...state,
                startPriceList: changeStatusImmutable(state.startPriceList, action.id, action.status),
                priceList: changeStatusImmutable(state.priceList, action.id, action.status),
            };
        case FILTER_SEARCH:
            if (action.value) {
                return {
                    ...state,
                    priceList: filterSearchFunc(state.startPriceList, action.value),
                    foundNull: filterSearchFunc(state.startPriceList, action.value).length === 0,
                    checkedRadio: 4,
                };
            } else {
                return {
                    ...state,
                    priceList: [],
                    foundNull: true,
                    checkedRadio: 4,
                };
            }
        case FILTER_LAPTOR:
            return {
                ...state,
                priceList: filterItemsByTypeFunc(state.startPriceList, action.name),
                foundNull: false,
                checkedRadio: 1,
            };
        case FILTER_PHONE:
            return {
                ...state,
                priceList: filterItemsByTypeFunc(state.startPriceList, action.name),
                foundNull: false,
                checkedRadio: 2,
            };
        case FILTER_TABLET:
            return {
                ...state,
                priceList: filterItemsByTypeFunc(state.startPriceList, action.name),
                foundNull: false,
                checkedRadio: 3,
            };
        case SHOW_ALL_PRICE:
            return {...state,
                checkedRadio: 0,
                foundNull: false,
                priceList: state.startPriceList};
        default:
            return state;
    }
};

export default CatalogReduser;