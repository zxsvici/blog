import {format, parseISO} from "date-fns";

const STANDARD = 'yyyy-MM-dd hh:mm:ss';

const ISO_TO_STR = (time: string) => {
    return format(parseISO(time), STANDARD);
}

export {
    STANDARD,
    ISO_TO_STR,
}