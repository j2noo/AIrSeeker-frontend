export interface Flight {
  flightInfoId: string;
  departureDate: string;
  departureTime: string;
  arriveTime: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any;
  airline: string;
}
