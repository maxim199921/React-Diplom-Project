import {filterSearchFunc} from '../modules/modules';

test('проверка корректности фильтрации по любым свойствам(имутабельная фильтрация)', () => {
    let exampleArr = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES or", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId1 = [
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId2 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES or", price: "325$", status: false, cnt: 5},
    ];

    let arrId3 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES or", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: true, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];


    expect(filterSearchFunc(exampleArr, 'laptop')).not.toBe(exampleArr); // проверка равны ли ссылки после изменений
    expect(filterSearchFunc(exampleArr, 'o')).not.toBe(exampleArr);
    expect(filterSearchFunc(exampleArr, 'phone')).not.toBe(exampleArr);

    expect(filterSearchFunc(exampleArr, 'honor')).toEqual(arrId1); // проверка на глубокое сравнение
    expect(filterSearchFunc(exampleArr, '325')).toEqual(arrId2);
    expect(filterSearchFunc(exampleArr, 'or')).toEqual(arrId3);

    expect(filterSearchFunc(exampleArr, '').length).toBeTruthy(); // вернётся не пустой массив при пустой строке

    expect(filterSearchFunc(exampleArr, 'aaaabbbb').length).toBeFalsy(); // длинна массива равна 0 если значений не нашлось

});