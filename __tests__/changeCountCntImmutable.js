import {changeCountCntImmutable} from '../modules/modules';

test('\'проверка внесения иммутабельных изменений свойства cnt на любую другую цифру', () => {
    let exampleArr = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: false, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId1 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 7},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: false, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId2 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: false, cnt:1},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 2},
    ];

    let arrId3 = [
        {id: 1, type: "Laptop",  model: "HP 250 G6 4QW22ES", price: "325$", status: false, cnt: 5},
        {id: 2, type: "Phone",  model: "Honor 10 COL-L29A", price: "156$",  status: false, cnt:3},
        {id: 3, type: "Phone", model: "Honor 8X JSN-L21", price: "115$",status: false, cnt: 1},
    ];

    expect(changeCountCntImmutable(exampleArr, 1, 1)).not.toBe(exampleArr); // проверка равны ли ссылки после изменений
    expect(changeCountCntImmutable(exampleArr, 2, -4)).not.toBe(exampleArr);
    expect(changeCountCntImmutable(exampleArr, 3, 3)).not.toBe(exampleArr);

    expect(changeCountCntImmutable(exampleArr, 1, 1)[0].cnt).toBeLessThan(7);// проверка cnt после изменений меньше ли 2
    expect(changeCountCntImmutable(exampleArr, 2, 1)[1].cnt).toBeLessThan(5);
    expect(changeCountCntImmutable(exampleArr, 3, -3)[2].cnt).toBeLessThan(0);

    expect(changeCountCntImmutable(exampleArr, 1, 1)[0].cnt).toBeGreaterThan(0);// проверка cnt после изменений больше ли 0
    expect(changeCountCntImmutable(exampleArr, 2, 1)[1].cnt).toBeGreaterThan(0);
    expect(changeCountCntImmutable(exampleArr, 3, 1)[2].cnt).toBeGreaterThan(0);

    expect(changeCountCntImmutable(exampleArr, 1, 10)[0].cnt).toBeDefined();// проверка cnt после изменений не undefind
    expect(changeCountCntImmutable(exampleArr, 2, -100)[1].cnt).toBeDefined();
    expect(changeCountCntImmutable(exampleArr, 3, 13)[2].cnt).toBeDefined();

    expect(changeCountCntImmutable(exampleArr, 1, 2)).toEqual(arrId1); // проверка на глубокое сравнение
    expect(changeCountCntImmutable(exampleArr, 2, -2)).toEqual(arrId2);
    expect(changeCountCntImmutable(exampleArr, 3, -1)).toEqual(arrId3);

});