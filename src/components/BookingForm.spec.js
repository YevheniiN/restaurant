import renderComponent from "../utils/renderComponent";
import BookingForm from "./BookingForm";
import { fireEvent, screen } from "@testing-library/react";

const handleSubmit = jest.fn()
const handleSetAvailableTimes = jest.fn()
const availableTimes = {
  times: [
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00'
  ]
};

describe('Booking Form tests', () => {
  beforeEach(() => {
    renderComponent(<BookingForm
      availableTimes={availableTimes}
      setAvailableTimes={handleSetAvailableTimes}
      submitForm={handleSubmit}
    />);
  })

  test('should be render with data', () => {
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByText(availableTimes.times[0])).toBeInTheDocument();
    expect(screen.getByText(availableTimes.times[availableTimes.times.length - 1])).toBeInTheDocument();
  })
  test('should be select time', () => {
    const timeSelect = screen.getByTestId('time-select');
    timeSelect.focus();
    const time = '17:30';
    fireEvent.change(timeSelect, { target: { value: time } });
    expect(timeSelect.value).toBe(time);
  })
  test('should be change number of guests', () => {
    const guestInput = screen.getByTestId('guest-input');
    const guests = '5';
    fireEvent.change(guestInput, { target: { value: guests } });
    expect(guestInput.value).toBe(guests)
  })
  test('should be change date', () => {
    const dateInput = screen.getByTestId('date-input');
    const date = '2023-09-15';
    const [ year, month, day] = date.split('-').map(i => Number(i))
    fireEvent.change(dateInput, { target: { value: date } });
    expect(dateInput.value).toBe(date);
    expect(handleSetAvailableTimes).toBeCalledTimes(1);
    expect(handleSetAvailableTimes).toBeCalledWith({ setBookingDate: new Date(year, month - 1, day) });
  })
  test('should be show alert when invalid date', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const dateInput = screen.getByTestId('date-input');
    fireEvent.change(dateInput, { target: { value: '' } });
    expect(window.alert).toBeCalledWith('Sorry! Reservations not available for this date!');
  })
  test('should be submit form with success', async () => {
    fireEvent.click(screen.getByTestId('submit-button'))
    const defaultForm = {
      date: "2023-05-13",
      guests: 2,
      occassion: "none",
      time: "17:00",
    }
    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toBeCalledWith(defaultForm)
  })
  test('should be submit form with error', () => {
    const guestInput = screen.getByTestId('guest-input');
    fireEvent.change(guestInput, { target: { value: '' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(guestInput.validity.valueMissing).toBeTruthy();
  })
})