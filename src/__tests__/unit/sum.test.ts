import { sum } from '../../traits/sum';

describe('Math functions', () => {
    it('Should sum 2 numbers', () => {
        const result = sum(2, 5);
        expect(result).toEqual(7);
    });
})