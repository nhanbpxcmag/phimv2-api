import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR } from 'src/configs/constans';
import { GetTMDBByIDArgs, TypeTMDB } from './dto/tmdb.args';
import {
  ITmdb_movie,
  ITmdb_tv,
  ImagesTMDB,
  tmdb_item,
} from './interfaces/tmdb.interface';
import { TmdbItem } from './models/tmdb.model';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class TmdbService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private getInfoConnectTMDB() {
    const { TMDB_API, TMDB_API_V3 } = process.env;
    return { url: TMDB_API, api_key: TMDB_API_V3 };
  }
  async getInfoByIdTMDB(params: GetTMDBByIDArgs): Promise<TmdbItem> {
    const { url, api_key } = this.getInfoConnectTMDB();
    const { tmdb_id, tmdb_type } = params;
    if (!Object.values(TypeTMDB).includes(tmdb_type)) {
      throw new BadRequestException(
        "Type không hợp lệ (chỉ bao gồm 'TV' hoặc 'MOVIE')",
      );
    }
    let link = `${url}${tmdb_type}/${tmdb_id}?api_key=${api_key}&language=vi`;
    try {
      console.log('🚀 --- TmdbService --- getInfoByIdTMDB --- link:', link);
      const response = await fetch(link, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      if (json?.success === false) {
        throw ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code;
      }
      let data_tmdb = json as tmdb_item;
      let release_date = new Date(
        data_tmdb?.release_date || data_tmdb?.last_air_date,
      );
      let data: TmdbItem = {
        ten: data_tmdb?.title || data_tmdb?.name,
        nam: release_date.getFullYear() | 0,
        mota: data_tmdb.overview,
        poster_path: data_tmdb.poster_path,
        poster_path_tmdb: this.generatePosterTMDB(data_tmdb.poster_path),
        backdrop_path: data_tmdb.backdrop_path,
        backdrop_path_tmdb: this.generateBackgropTMDB(data_tmdb.backdrop_path),
        release_date: release_date.getTime() | 0,
        tmdb_type,
        tmdb_id,
      };
      return data;
    } catch (error) {
      if (error === ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code) {
        throw new BadRequestException(
          ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.msg,
          ERROR.TMDB.ERROR_MOVIE_TV_NOT_EXIST.code,
        );
      } else {
        throw new BadRequestException(
          ERROR.TMDB.ERROR_MOVIE_TV.msg,
          ERROR.TMDB.ERROR_MOVIE_TV.code,
        );
      }
    }
  }
  generateBackgropTMDB(backdrop_path: string) {
    return process.env.TMDB_API_IMG + 'original' + backdrop_path;
  }
  generatePosterTMDB(poster_path: string) {
    return process.env.TMDB_API_IMG + 'w500' + poster_path;
  }
}
