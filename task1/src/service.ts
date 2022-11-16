export const downloadFile = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.style.display = 'none';
    anchor.click();
    anchor.remove();
};

export const saveFileApi = async (
    link: string,
    ErrorOpen: () => void
): Promise<void> => {
    await fetch(link, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        mode: 'no-cors',
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(
                    `Unexpected error. HTTP status is ${response.status}.`
                );
            }

            const blob = await response.blob();
            const nameFile = link.split('/');
            downloadFile(blob, nameFile[nameFile.length - 1]);
        })
        .catch(() => ErrorOpen());
};
