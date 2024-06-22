// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import { NovelList } from "./novel-list";
// import { SourceFactory } from '../../factories/source-factory';
// import Novel from '../../models/novel';
// import { translate } from '../../i18n';

// jest.mock('../../factories/source-factory', () => ({
//   SourceFactory: {
//     createSource: jest.fn(),
//   },
// }));
// jest.mock('../../i18n', () => ({
//   translate: jest.fn((key: string) => key),
// }));

// const mockNovels = [
//   Object.assign(new Novel(), { id: '1', title: 'Novel 1', isFavorite: false }),
//   Object.assign(new Novel(), { id: '2', title: 'Novel 2', isFavorite: false }),
// ];

// const mockSource = { id: 1, name: 'Test Source', url: 'http://boxnovel.com'};

// const setup = () => {
//   (SourceFactory.createSource as jest.Mock).mockImplementation(() => ({
//     findNovelsByPage: jest.fn().mockResolvedValue(mockNovels)
//   }));

//   return render(<NovelList source={mockSource} />);
// };

// describe('NovelList', () => {
//   it('should fetch and display novels on initial load', async () => {
//     const { getByText } = setup();

//     await waitFor(() => {
//       expect(getByText('Novel 1')).toBeTruthy();
//       expect(getByText('Novel 2')).toBeTruthy();
//     });
//   });
// });
