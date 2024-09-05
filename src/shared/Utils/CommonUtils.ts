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



export const formatSkillText = (
    face_direction?: string | null,
    club?: string | null,
    hand?: string | null,
    ball_flight?: string | null,
    contact?: string | null
): string => {
    const faceDirectionText = face_direction === 'up' ? 'FO' : face_direction ? 'DTL' : '';
    const clubText = club ? `/${club}` : '';
    const handText = hand ? `/${hand.charAt(0).toUpperCase() + hand.slice(1)} handed` : '';
    const ballFlightText = ball_flight ? `/${ball_flight}` : '';
    const contactText = contact ? `/${contact}` : '';

    const result = [
        faceDirectionText,
        clubText,
        handText,
        ballFlightText,
        contactText
    ].filter(Boolean).join('');

    return result ? `${result}` : '';
};
