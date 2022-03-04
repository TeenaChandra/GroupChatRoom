import { render } from '@testing-library/react';
import { GroupChatRoom } from '../GroupChatRoom';

jest.mock("../GroupChatRoom", () => ({ GroupChatRoom: () => (
    <>
        <h1>Welcome to Group Chat Room</h1>
        <div>
            <div data-testid="message1">
            <img alt='profile image1'></img>
            <span>Teena Chandra</span>
            <span>Last Wednesday at 12:00 pm</span>
            <p>How are you?</p>
            </div>
            <div  data-testid="message2">
            <img alt='profile image2'></img>
            <span>Sadhvi Chandra</span>
            <span>Today at 12:00 pm</span>
            <p>I am fine?</p>
            </div>
        </div>

    </>
)}));

  test('renders', () => {
    const { container } = render(<GroupChatRoom/>);
    expect(container.textContent)
      .toMatch('Welcome to Group Chat RoomTeena ChandraLast Wednesday at 12:00 pmHow are you?Sadhvi ChandraToday at 12:00 pmI am fine?');
  });

  test('message one is present', () => {
    const { getByTestId } = render(<GroupChatRoom/>);
    const element = getByTestId('message1');
    expect(element).toBeInTheDocument();
  });

  test('message two is present', () => {
    const { getByTestId } = render(<GroupChatRoom/>);
    const element = getByTestId('message2');
    expect(element).toBeInTheDocument();
  });