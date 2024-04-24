export const convertToBase64 = (arrayBuffer) => {
    return new Promise((resolve, reject) => {
        const blob = new Blob([arrayBuffer]);
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
