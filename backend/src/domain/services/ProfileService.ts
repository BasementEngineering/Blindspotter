import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "os";

const useProfileService = () => {
    const fileSavePath = "input";

    const createInputProfileDataFile = (userId: string, formattedFileContentData: string) => {
        const filePath = createFilePathByUserId(userId);
        fs.writeFileSync(filePath, formattedFileContentData);
    };

    const createFilePathByUserId = (userId: string): string => {
        const cwd = process.cwd();
        const folderPath = path.join(cwd, fileSavePath);
        return path.join(folderPath, `${userId}.json`);
    };

    return {
        createInputProfileDataFile
    };
}

export {
    useProfileService
};
