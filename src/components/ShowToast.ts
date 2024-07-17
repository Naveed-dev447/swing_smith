import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const ShowToast = (type: ToastType, message: string) => {

    Toast.show({
        type: 'customToast',
        text1: message,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        props: { type },
    });
};
