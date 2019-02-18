import {filterItemsByTypeFunc} from '../modules/modules';

test('проверка корректности фильтрации по свойству type (имутабельная фильтрация)', () => {
    let exampleArr = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES or", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Tablet", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId1 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES or", price: "325$", status: false, cnt: 5},
    ];

    let arrId2 = [
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
    ];

    let arrId3 = [
        {id: 3, type: "Tablet", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];


    expect(filterItemsByTypeFunc(exampleArr, "Laptop")).not.toBe(exampleArr); // проверка равны ли ссылки после изменений
    expect(filterItemsByTypeFunc(exampleArr, "Phone")).not.toBe(exampleArr);
    expect(filterItemsByTypeFunc(exampleArr, "Tablet")).not.toBe(exampleArr);

    expect(filterItemsByTypeFunc(exampleArr, "Laptop")).toEqual(arrId1); // проверка на глубокое сравнение
    expect(filterItemsByTypeFunc(exampleArr, "Phone")).toEqual(arrId2);
    expect(filterItemsByTypeFunc(exampleArr, "Tablet")).toEqual(arrId3);

    expect(filterItemsByTypeFunc(exampleArr, "Laptop").length).toBeGreaterThan(0);// проверка cnt после изменений больше ли 0
    expect(filterItemsByTypeFunc(exampleArr, "Phone").length).toBeGreaterThan(0);
    expect(filterItemsByTypeFunc(exampleArr, "Tablet").length).toBeGreaterThan(0);

});