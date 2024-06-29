import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phim } from './entities/phim.entity';
import { Repository } from 'typeorm';
import { PhimDetail, PhimItem } from './models/phim.model';
import { PhimAddArgs, PhimDeleteArgs, PhimEditArgs } from './dto/phimAdd.args';
import { TmdbService } from '../tmdb/tmdb.service';
import { TypeTMDB } from '../tmdb/dto/tmdb.args';
import { generateFilePath, generateFileUrl, isNullUndefined } from 'src/utils';
import { ERROR } from 'src/configs/constans';
import { FileService } from '../file/file.service';

@Injectable()
export class PhimService {
  constructor(
    @InjectRepository(Phim)
    private phim_db: Repository<Phim>,
    @Inject(forwardRef(() => TmdbService))
    private tmdbService: TmdbService,
    @Inject(forwardRef(() => FileService))
    private fileService: FileService,
  ) {}
  phim_list_admin(): Promise<PhimItem[]> {
    return this.phim_db.find();
  }
  phim_list(): Promise<PhimItem[]> {
    return this.phim_db.find({
      where: { isActive: true },
      order: { created_at: 'DESC' },
    });
  }
  async phim_by_id(id: number, host: string): Promise<PhimDetail> {
    let data = await this.phim_db.findOne({ where: { id } });
    host = 'http://' + host + ':' + process.env.PORT;
    return {
      ...data,
      link_stream: generateFileUrl({
        path: data.link_stream_filePath,
        filename: data.link_stream_fileName,
        ext: data.link_stream_fileExt,
        host,
      }),
      link_sub: generateFileUrl(
        {
          path: data.link_sub_filePath,
          filename: data.link_sub_fileName,
          ext: data.link_sub_fileExt,
          host,
        },
        'sub',
      ),
    };
  }
  validateItemPhim(item: Phim, tmdb_id?: number) {
    let errors: string[] = [];
    if (!tmdb_id) {
      if (!item.ten) {
        errors.push('Vui lòng nhập 1 trong 2: Tên hoặc TMDB_ID');
      }
      if (!item.poster_path) {
        errors.push('Vui lòng nhập 1 trong 2: Tên hoặc Avatar');
      }
    }
    if (
      (item.link_stream_fileName && !item.link_stream_fileExt) ||
      (!item.link_stream_fileName && item.link_stream_fileExt)
    ) {
      errors.push('Nhập đầy đủ stream fileName và stream fileExt');
    }
    if (
      (item.link_sub_fileName && !item.link_sub_fileExt) ||
      (!item.link_sub_fileName && item.link_sub_fileExt)
    ) {
      errors.push('Nhập đầy đủ sub fileName và sub fileExt');
    }

    return { success: errors.length ? false : true, errors };
  }

  validateDataTMDB(tmdb_id: number, tmdb_type: TypeTMDB) {
    let errors: string[] = [];
    if (tmdb_id) {
      if (!tmdb_type) {
        errors.push('Vui lòng nhập Type: TV hoặc Moive');
      } else if (!Object.values(TypeTMDB).includes(tmdb_type)) {
        errors.push("Type không hợp lệ (chỉ bao gồm 'TV' hoặc 'MOVIE')");
      }
    }
    return { success: errors.length ? false : true, errors };
  }
  async validateDuplicateTMDBId(tmdb_id: number, id?: number) {
    if (!tmdb_id) return false;
    let kq = await this.phim_db.findOne({ where: { tmdb_id } });
    return kq && kq?.id !== id && kq.tmdb_type !== TypeTMDB.TV ? true : false;
  }

  async phim_add(params: PhimAddArgs): Promise<PhimItem> {
    let { tmdb_id, tmdb_type } = params;
    let validateDataTMDB = this.validateDataTMDB(tmdb_id, tmdb_type);
    if (!validateDataTMDB.success) {
      throw new BadRequestException(validateDataTMDB.errors);
    }
    if (await this.validateDuplicateTMDBId(tmdb_id)) {
      throw new BadRequestException('Tồn tại TMDB ID');
    }
    let item = new Phim();
    item = { ...params, ...item };
    let validateItemPhim = this.validateItemPhim(item);
    if (!validateItemPhim.success) {
      throw new BadRequestException(validateItemPhim.errors);
    }
    let data = await this.phim_db.save(item);

    return data;
  }

  async phim_edit(params: PhimEditArgs): Promise<PhimItem> {
    let item = await this.phim_db.findOne({ where: { id: params.id } });
    if (!item) {
      throw new BadRequestException(
        ERROR.PHIM.NOT_EXIST.msg,
        ERROR.PHIM.NOT_EXIST.code,
      );
    }
    let { tmdb_id, tmdb_type } = params;
    let validateDataTMDB = this.validateDataTMDB(tmdb_id, tmdb_type);
    if (!validateDataTMDB.success) {
      throw new BadRequestException(validateDataTMDB.errors);
    }
    if (await this.validateDuplicateTMDBId(tmdb_id, params.id)) {
      throw new BadRequestException('Tồn tại TMDB ID');
    }
    item = { ...item, ...params };
    let validateItemPhim = this.validateItemPhim(item);
    if (!validateItemPhim.success) {
      throw new BadRequestException(validateItemPhim.errors);
    }
    let data = await this.phim_db.save(item);

    return data;
  }

  async phim_delete({ id, del_file }: PhimDeleteArgs): Promise<boolean> {
    const check_phim = await this.phim_db.findOne({ where: { id } });
    if (!check_phim) {
      throw new BadRequestException(
        ERROR.PHIM.NOT_EXIST.msg,
        ERROR.PHIM.NOT_EXIST.code,
      );
    }
    try {
      let kq = await this.phim_db.delete({ id });
      if (del_file) {
        this.fileService.delFile(
          generateFilePath({
            path: check_phim.link_stream_filePath,
            filename: check_phim.link_stream_fileName,
            ext: check_phim.link_stream_fileExt,
          }),
        );
        this.fileService.delFile(
          generateFilePath({
            path: check_phim.link_sub_filePath,
            filename: check_phim.link_sub_fileName,
            ext: check_phim.link_sub_fileExt,
          }),
        );
      }
      return kq.affected > 0 ? true : false;
    } catch (error) {
      throw new BadRequestException('Lỗi CSDL');
    }
  }
}
