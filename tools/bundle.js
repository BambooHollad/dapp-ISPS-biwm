
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
const ROOT = fileURLToPath(path.join(import.meta.url, '../../'));

const getBuildTmp = (output) => {
    const { dir, name } = path.parse(output);
    const tmp = path.join(dir, name);
    if (fs.existsSync(tmp)) {
        fs.rmSync(tmp, { recursive: true, force: true });
    }
    fs.mkdirSync(tmp);
    return tmp;
}
export const doBundle = async () => {
    const version = process.env.npm_config_demoVersion;
    if (!version) {
        console.error("缺少版本号: --demoVersion=xxx.xxx.xxx");
        return;
    }
    /// 创建打包文件夹
    const output_root = getBuildTmp(path.join(ROOT, "bundle"));

    const dwebTmp = getBuildTmp(output_root);

    ///  将编译文件移动到打包文件夹内的www
    const buildTmp = path.join(dwebTmp, "dist");
    function copyFolderSync(source, target) {
        // 如果目标文件夹不存在，创建它
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }
        // 读取源文件夹的所有文件和子文件夹
        let entries = fs.readdirSync(source);
        entries.forEach((entry) => {
            let sourcePath = path.join(source, entry);
            let targetPath = path.join(target, entry);
            // 检查源路径是文件还是文件夹
            if (fs.lstatSync(sourcePath).isDirectory()) {
                // 递归复制文件夹
                copyFolderSync(sourcePath, targetPath);
            } else {
                // 复制文件
                fs.copyFileSync(sourcePath, targetPath);
            }
        });
    }
    copyFolderSync(path.join(ROOT, "www"), buildTmp);

    /// 将plaoc.json manifest.json也移进来
    const manifestOut = path.join(dwebTmp, 'manifest.json');
    fs.copyFileSync(path.join(ROOT, 'manifest.json'), manifestOut);
    fs.copyFileSync(path.join(ROOT, 'plaoc.json'), path.join(dwebTmp, 'plaoc.json'));
    const dwebTmpOut = path.join(dwebTmp, "dweb");
    execSync(`plaoc bundle ${path.join(dwebTmp, "www")} -c ${dwebTmp} -o ${dwebTmpOut} --version ${version}`);

    console.log('已完成')

    // console.log(manifestJson)
}
doBundle()