// Function to clear browser cache
export const clearBrowserCache = async () => {
    if ('caches' in window) {
        try {
            // Get all cache keys
            const cacheKeys = await caches.keys();
            // Delete all caches
            await Promise.all(cacheKeys.map(key => caches.delete(key)));
            console.log('Cache cleared successfully');
            return true;
        } catch (error) {
            console.error('Error clearing cache:', error);
            return false;
        }
    }
    return false;
};

// Function to clear local storage
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
        console.log('Local storage cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing local storage:', error);
        return false;
    }
};

// Function to clear session storage
export const clearSessionStorage = () => {
    try {
        sessionStorage.clear();
        console.log('Session storage cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing session storage:', error);
        return false;
    }
};

// Function to clear all browser data
export const clearAllBrowserData = async () => {
    const results = {
        cache: await clearBrowserCache(),
        localStorage: clearLocalStorage(),
        sessionStorage: clearSessionStorage()
    };
    return results;
}; 