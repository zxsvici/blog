import {PageInfo} from "@/model";

const DEFAULT_PAGE_INFO: PageInfo = {pageNo: 1, pageSize: 10, pages: 0, total: 0};
const SUCCESS_CODE: number = 200;
const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const ISO_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export {
    DEFAULT_PAGE_INFO,
    SUCCESS_CODE,
    DEFAULT_TIME_FORMAT,
    ISO_TIME_FORMAT
}