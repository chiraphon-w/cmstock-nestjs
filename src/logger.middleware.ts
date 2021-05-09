import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

//ถูกเรียกก่อน custom pipe >> เป็น logic ที่แทรกแซงเข้ามา
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(req);
    next();
    // const { keyword } = req.query;
    // if (keyword) {
    //   req.timestamp = Date.now();
    //   next(); // บอกว่าให้สามารถไปต่อได้ไหม
    // } else {
    //   throw new NotFoundException('Keyword not found!!');
    // }
  }
}
