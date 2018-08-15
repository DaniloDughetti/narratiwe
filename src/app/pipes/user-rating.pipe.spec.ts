import { UserRatingPipe } from './user-rating.pipe';

describe('UserRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new UserRatingPipe();
    expect(pipe).toBeTruthy();
  });
});
