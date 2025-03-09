import { TOASTER_EVENT_ENUM } from './enum';

export interface ToasterMessage {
  eventType: TOASTER_EVENT_ENUM;
  text: string;
}
