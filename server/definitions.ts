export const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Weekday = typeof weekdays[number];

export const courts = ["Potrero Hill","St. Mary's","DuPont","Richmond","Rossi","Sunset","Stern Grove","Presidio Wall","Moscone","Balboa","Fulton","Miraloma","Buena Vista","J.P. Murphy","Hamilton","Joe DiMaggio","Upper Noe","Minnie & Lovie Ward","Lafayette","Mountain Lake","McLaren","Glen Canyon","Parkside Square","Dolores","Jackson","Alice Marble","Crocker Amazon","Helen Wills"];

export const timeRegex = /^(1[0-2]|[1-9]):[03]0 [AP]M$/;