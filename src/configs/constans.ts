export const ERROR = {
  DB: {
    ID_UUID: {
      code: 'ID_UUID',
      msg: 'ID là UUID',
    },
    ID_NUMBER: {
      code: 'ID_NUMBER',
      msg: 'ID là number',
    },
    EMPTY_FIELD_UPDATE: {
      code: 'EMPTY_FIELD_UPDATE',
      msg: 'Nhập giá trị cần cập nhật',
    },
  },
  THELOAI: {
    NOT_EXIST: {
      code: 'NOT_EXIST_THELOAI',
      msg: 'Thể loại không tồn tại',
    },
  },
  QUOCGIA: {
    NOT_EXIST: {
      code: 'NOT_EXIST_QUOCGIA',
      msg: 'Quốc gia không tồn tại',
    },
  },
  LOAIPHIM: {
    NOT_EXIST: {
      code: 'NOT_EXIST_LOAIPHIM',
      msg: 'Loại phim không tồn tại',
    },
  },
  PHIM: {
    THE_LOAI_NOT_EXIST: {
      code: 'THE_LOAI_NOT_EXIST',
      msg: 'Có 1 thể loại không tồn tại',
    },
    TMDB_EXIST: {
      code: 'TMDB_EXIST',
      msg: 'TMDB đã tồn tại',
    },
    NOT_EXIST: {
      code: 'NOT_EXIST_PHIM',
      msg: 'Phim không tồn tại',
    },
    ERROR_DELETE: {
      code: 'ERROR_DELETE_PHIM',
      msg: 'Phim xoá không thành công',
    },
  },
  DIENVIEN: {
    ERROR_INSERT: {
      code: 'DIENVIEN_ERROR_INSERT',
      msg: 'Lỗi insert diễn viên',
    },
  },
  PHIM_DIENVIEN: {
    ERROR_INSERT: {
      code: 'PHIM_DIENVIEN_ERROR_INSERT',
      msg: 'Lỗi insert phim - diễn viên',
    },
  },
  PHIM_TUONGTU: {
    ERROR_INSERT: {
      code: 'PHIM_TUONGTU_ERROR_INSERT',
      msg: 'Lỗi insert phim - phim tương tự',
    },
  },
  PHIM_THELOAI: {
    ERROR_INSERT: {
      code: 'PHIM_THELOAI_ERROR_INSERT',
      msg: 'Lỗi insert phim - thể loại',
    },
  },
  BD: {
    ERROR_INSERT: {
      code: 'BD_ERROR_INSERT',
      msg: 'Lỗi insert',
    },
    NOT_EXIST: {
      code: 'NOT_EXIST_BD',
      msg: ' không tồn tại',
    },
  },
  TMDB: {
    ERROR_MOVIE_TV: {
      code: 'TMDB_ERROR_MOVIE_TV',
      msg: 'Lỗi API TMDB: Movie_TC',
    },
    ERROR_MOVIE_TV_NOT_EXIST: {
      code: 'ERROR_MOVIE_TV_NOT_EXIST',
      msg: 'API TMDB không tồn tại',
    },
    ERROR_DIENVIEN_MOVIE_TV: {
      code: 'TMDB_ERROR_DIENVIEN_MOVIE_TV',
      msg: 'Lỗi API TMDB: diễn viên',
    },
    ERROR_TUONGTU_MOVIE_TV: {
      code: 'TMDB_ERROR_DIENVIEN_MOVIE_TV',
      msg: 'Lỗi API TMDB: phim tương tự',
    },
    ERROR_API_TMDB: {
      code: 'ERROR_API_TMDB',
      msg: 'Lỗi API TMDB',
    },
  },
};
export const prefixCachingGhiChu = 'cachingGhiChu';
export const prefixPassChangeGhiChu = 'passToken';
export const nameHeaderAuthAdmin = 'auth_admin';
