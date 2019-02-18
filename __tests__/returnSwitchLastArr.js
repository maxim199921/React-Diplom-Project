import {returnSwitchLastArr} from '../modules/modules';

test('проверка корректности вырезания из массива по заданному номеру и переворот значений массива', () => {
    let exampleArr = [
        {name: 'max1', comment: 'hello1'},
        {name: 'max2', comment: 'hello2'},
        {name: 'max3', comment: 'hello3'},
        {name: 'max4', comment: 'hello4'},
        {name: 'max5', comment: 'hello5'},
        {name: 'max6', comment: 'hello6'},
        {name: 'max7', comment: 'hello7'},
    ];

    let arrId1 = [
        {name: 'max7', comment: 'hello7'},
        {name: 'max6', comment: 'hello6'},
        {name: 'max5', comment: 'hello5'},
        {name: 'max4', comment: 'hello4'},
    ];

    let arrId2 = [
        {name: 'max7', comment: 'hello7'},
    ];

    let arrId3 = [
        {name: 'max7', comment: 'hello7'},
        {name: 'max6', comment: 'hello6'},
        {name: 'max5', comment: 'hello5'},
    ];


    expect(returnSwitchLastArr(exampleArr, -5)).not.toBe(exampleArr); // проверка равны ли ссылки после изменений
    expect(returnSwitchLastArr(exampleArr, -2)).not.toBe(exampleArr);
    expect(returnSwitchLastArr(exampleArr, -1)).not.toBe(exampleArr);

    expect(returnSwitchLastArr(exampleArr, -4)).toEqual(arrId1); // проверка на глубокое сравнение
    expect(returnSwitchLastArr(exampleArr, -1)).toEqual(arrId2);
    expect(returnSwitchLastArr(exampleArr, -3)).toEqual(arrId3);

    expect(returnSwitchLastArr(exampleArr, -4).length).toBeGreaterThan(0);// проверка длинна массива после изменений больше ли 0
    expect(returnSwitchLastArr(exampleArr, -1).length).toBeGreaterThan(0);
    expect(returnSwitchLastArr(exampleArr, -5).length).toBeGreaterThan(0);

    expect(returnSwitchLastArr(exampleArr, -4).length).toBeLessThan(5);// проверка длинна массива после изменений меньше определённого значения
    expect(returnSwitchLastArr(exampleArr, -1).length).toBeLessThan(2);
    expect(returnSwitchLastArr(exampleArr, -5).length).toBeLessThan(6);

});