import fs from 'fs';
export const removeFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
