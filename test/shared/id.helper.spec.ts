import { id } from '../../src/shared/helpers/id.helper';

describe('ID', () => {
  it('Should return a random id', () => {
    const chart_id = id;
    expect(chart_id).toBeDefined();
    expect(chart_id.length).toBe(13);
  });
});
