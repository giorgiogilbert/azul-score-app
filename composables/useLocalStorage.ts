export const useLocalStorage = () => {
    const get = (key: string): any => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn(`Error reading key "${key}" from localStorage`, e);
            return null;
        }
    };

    const set = (key: string, value: any): void => {
        try {
            const item = JSON.stringify(value);
            localStorage.setItem(key, item);
        } catch (e) {
            console.warn(`Error saving key "${key}" to localStorage`, e);
        }
    };

    return {
        get,
        set
    };
};
