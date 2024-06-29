import { Injectable } from '@nestjs/common';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  unlinkSync,
} from 'fs';
import * as srt2vtt from 'srt-to-vtt';

@Injectable()
export class FileService {
  generatePathRootFile(path: string) {
    return process.env.FILE_ROOT_PATH + path;
  }

  checkExistingFile(path: string) {
    let path_root = this.generatePathRootFile(path);
    return existsSync(path_root);
  }

  validateVideoFormat(path: string) {
    let arr_ext = [
      'mp4',
      'mkv',
      'wmv',
      'm4v',
      'mov',
      'avi',
      'flv',
      'webm',
      'flac',
      'mka',
      'm4a',
      'aac',
      'ogg',
    ];
    let arr = path.split('.');
    let ext = arr[arr.length - 1];
    return arr_ext.includes(ext);
  }

  delFile(path) {
    if (this.checkExistingFile(path)) {
      let file_path_root = this.generatePathRootFile(path);
      return unlinkSync(file_path_root);
    }
    return false;
  }
  async createTheFile(path_file, vtt) {
    return new Promise((resolve) => {
      let b = createReadStream(path_file)
        .pipe(srt2vtt())
        .pipe(createWriteStream(vtt));
      b.on('finish', resolve);
    });
  }
  async srtTovtt(file_name) {
    if (!file_name) return null;
    const arr_file = file_name.split('.');
    const ex_file = arr_file.pop();
    const name = arr_file.join('.');
    let path_file = this.generatePathRootFile(file_name);
    if (ex_file === 'srt') {
      let vtt = this.generatePathRootFile(name + '.vtt');
      await this.createTheFile(path_file, vtt);
      path_file = vtt;
    }
    if (path_file) {
      if (!existsSync(path_file)) {
        return null;
      }
    }
    return path_file;
  }

  async validateSubFormat(file_name: string) {
    const arr_file = file_name.split('.');
    const ex_file = arr_file.pop();
    return ex_file === 'srt' || 'vtt';
  }
}
