import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// เป็น logic ที่แทรกแซงเข้ามา ใช้ได้ทั้งขาเข้าและขาออก, ถูกเรียกหลัง middleware
// การติดตั้งเหมือน mi
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('logger inter');
    // return next.handle(); //ตัวแปร call back ให้ไปต่อได้

    console.log('Before...');

    const now = Date.now();
    // return next
    //   .handle() //จัดการ req ที่ยิงเข้ามา
    //   .pipe( // ลำดับงานย่อย >> เสร็จ 1 ก่อน ค่อยเข้า 2
    //     // tap เป็น operators อย่างนึง คอยดักว่า handle ก่อนหน้า ทำงานเสร็จหรือยัง
    //     // ถูกเรียกตอนที่จะ response ข้อมูลกลับ
    //     // เอาเวลาก่อนหน้ามาลบเวลาปจบ. เพื่อหาเวลาทีใช้ในการประมวลผล
    //     tap(() => console.log(`After... ${Date.now() - now}ms`)));

    // return next.handle().pipe(
    //   map((data) => {
    //     return { data }; // ข้อมูลทั้งหมดที่ถูกยิงเข้ามาจะถูกหุ้มด้วย data
    //   }),
    // );

    return next.handle();
  }
}
