import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavButtons from '../component/NavButtons';

describe('NavButtons Component', () => {
  let setSlideNumMock;
  let actuallySetStoreMock;
  let mockStore;

  beforeEach(() => {
    setSlideNumMock = vi.fn();
    actuallySetStoreMock = vi.fn();
    mockStore = {
      decks: [
        {
          id: 1,
          slides: [
            { slideNum: 1, elements: [], font: 'calibri', background: { type: 'default' }, id: 101 },
            { slideNum: 2, elements: [], font: 'calibri', background: { type: 'default' }, id: 102 },
          ],
        },
      ],
    };
  });

  const renderComponent = (props = {}) => {
    render(
      <MemoryRouter>
        <NavButtons
          type="presentation"
          deckId={1}
          slideNum={props.slideNum || 1}
          setSlideNum={setSlideNumMock}
          deckLength={props.deckLength || 2}
          store={mockStore}
          actuallySetStore={actuallySetStoreMock}
          {...props}
        />
      </MemoryRouter>
    );
  };

  it('should call setSlideNum and navigate to the previous slide', () => {
    renderComponent({ slideNum: 2 });
    fireEvent.click(screen.getByLabelText('Previous Slide'));
    expect(setSlideNumMock).toHaveBeenCalledWith(1);
  });

  it('should call setSlideNum and navigate to the next slide', () => {
    renderComponent({ slideNum: 1 });
    fireEvent.click(screen.getByLabelText('Next Slide'));
    expect(setSlideNumMock).toHaveBeenCalledWith(2);
  });
});
