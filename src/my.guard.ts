import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// ป้องกันไม่ให้ Route handler เข้าถึงได้
// return true >> วิ่งเข้าไปได้
// return false >> วิ่งเข้าไปไม่ได้
// ถูกเรียกหลัง middleware ก่อน interceptor
@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    // if (request.query.secret === '1234') {
    //   return true; // อนุญาตให้ไปต่อ
    // }
    // return false;

    return true;
  }
}
