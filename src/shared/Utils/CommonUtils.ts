import { format } from 'date-fns';


export const formatDate = (dateString: string) => {
    if (dateString) {
        return format(new Date(dateString), 'd MMM yyyy, h:mm a');
    } else {
        return '';
    }
};



export const isNotEmptyObject = (obj: any): boolean => {
    return obj && Object.keys(obj).length > 0 && obj.constructor === Object;
};