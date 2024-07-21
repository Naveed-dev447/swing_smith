import { format } from 'date-fns';


export const formatDate = (dateString: string) => {
    if (dateString) {
        return format(new Date(dateString), 'd MMMM');
    } else {
        return '';
    }
};
