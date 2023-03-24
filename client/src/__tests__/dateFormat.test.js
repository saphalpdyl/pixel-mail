import formatDate from '../utils/dateFormatter.js';

const testDate = '2023-03-08 13:36:23';

const options1 = {
  is12hour: true,
  dateCode: 'en-US',
};

// eslint-disable-next-line no-unused-vars
const options2 = {
  is12hour: true,
  dateCode: 'ne-NP',
};

describe('Test date formatter', () => {
  test('Format to English', () => {
    expect(formatDate(testDate, options1)).toBe('3/8/2023, 1:36 PM');
  });

  test('Format to Nepali', () => {
    expect(formatDate(testDate, options2)).toBe('२०२३-०३-०८, १:३६ अपराह्न');
  });
});
