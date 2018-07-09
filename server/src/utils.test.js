import {getKey} from "./utils";

test('getkey', () => {
  const object = {
    yingYeZhiZhao: '营业执照',
    shenFenZheng: '身份证'
  };

  expect(getKey(object, object.yingYeZhiZhao)).toBe('yingYeZhiZhao');
  expect(getKey(object, object.notExistProperties)).toBe(undefined);
});
