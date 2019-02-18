import {changeStatusImmutable} from '../modules/modules';

test('проверка внесения иммутабельных изменений свойства status на true либо false', () => {
    let exampleArr = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId1 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: true, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId2 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: false, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];



    expect(changeStatusImmutable(exampleArr, 1, true)).not.toBe(exampleArr); // проверка равны ли ссылки после изменений
    expect(changeStatusImmutable(exampleArr, 2, true)).not.toBe(exampleArr);
    expect(changeStatusImmutable(exampleArr, 3, true)).not.toBe(exampleArr);

    expect(changeStatusImmutable(exampleArr, 1, true)[0].status).toBeTruthy();// проверка поменяется на true или false
    expect(changeStatusImmutable(exampleArr, 2, false)[1].status).toBeFalsy();
    expect(changeStatusImmutable(exampleArr, 3, true)[2].status).toBeTruthy();


    expect(changeStatusImmutable(exampleArr, 1, true)[0].status).toBeDefined();// проверка status после изменений не undefind
    expect(changeStatusImmutable(exampleArr, 2, false)[1].status).toBeDefined();
    expect(changeStatusImmutable(exampleArr, 3, true)[2].status).toBeDefined();

    expect(changeStatusImmutable(exampleArr, 1, true)).toEqual(arrId1); // проверка на глубокое сравнение
    expect(changeStatusImmutable(exampleArr, 2, false)).toEqual(arrId2);

});