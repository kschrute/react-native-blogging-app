// @ts-nocheck
import * as store from '../src/store';

export const mockStore = jest.spyOn(store, 'useStore');
mockStore.mockReturnValue({
  auth: {},
  blog: {},
});
