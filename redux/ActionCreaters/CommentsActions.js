import 'url-search-params-polyfill';
import axios from 'axios';

export const FETCH_DATA_COMENTS_SUCCESS = 'FETCH_DATA_COMENTS_SUCCESS';
export const FETCH_DATA_COMENTS_FAILURE = 'FETCH_DATA_COMENTS_FAILURE';

export const loadDataComments = () => async (dispatch) => {
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'CHUPILIN_COMMENTS_LIST');
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
export const fetchSuccess = (loadedData) => {
    return {
        type: FETCH_DATA_COMENTS_SUCCESS,
        commentsList: loadedData.commentsList
    };
};
export const fetchError = (errorMessage) => {
    return {type: FETCH_DATA_COMENTS_FAILURE};
};

export const addComments = (name, password, successCommentStatus, funcErrorMessage) => {
    let sp = new URLSearchParams();
    let updatePassword = Math.random();
    sp.append('f', 'LOCKGET');
    sp.append('n', 'CHUPILIN_COMMENTS_LIST');
    sp.append('p', updatePassword);
    axios({
        method: 'post',
        url: 'https://fe.it-academy.by/AjaxStringStorage2.php',
        headers: {
            "Accept": "application/json",
        },
        data: sp,
    })
        .then(response => {
            let message = JSON.parse(response.data.result);
            let newcomm = {
                name: name,
                comment: password,
            };
            message.commentsList.push(newcomm);
            sp.append('f', 'UPDATE');
            sp.append('n', 'CHUPILIN_COMMENTS_LIST');
            sp.append('v', JSON.stringify(message));
            sp.append('p', updatePassword);
            return axios({
                method: 'post',
                url: 'https://fe.it-academy.by/AjaxStringStorage2.php',
                headers: {
                    "Accept": "application/json",
                },
                data: sp,
            })
        })
        .then(()=>{
            successCommentStatus();
            return Promise.resolve("Dummy response to keep the console quiet");
        })
        .catch((error) => {
            fetchErrorAddComments(error.userMessage || error.message, funcErrorMessage);
        });
};
export const fetchErrorAddComments = (errorMessage, funcErrorMessage) => {
    console.log(`Error: ${errorMessage}`);
    funcErrorMessage();
};