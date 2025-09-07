import { AppService } from '@/app.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiDataResponse } from './common/decorators';
import { AppRequest, AppResponse } from './app.dto';
import { ApiExtraModels } from '@nestjs/swagger';
import { ApiResponse } from '@/common/interfaces';
import { formatResponse } from '@/common/helpers';

@Controller()
@ApiExtraModels(AppResponse)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiDataResponse(AppResponse, { isArray: false, withMeta: false })
  async example(): Promise<ApiResponse<AppResponse>> {
    const data = this.appService.getConfig();
    return formatResponse.single(AppResponse, data, 'Lấy dữ liệu thành công')
  }

  @Get('/array')
  @ApiDataResponse(AppResponse, { isArray: true, withMeta: false })
  async exampleArray(): Promise<ApiResponse<AppResponse[]>> {
    const data = this.appService.getConfig();
    return formatResponse.array(AppResponse, [data], 'Lấy dữ liệu mảng thành công');
  }

  @Get('/paginate')
  @ApiDataResponse(AppResponse, { isArray: true, withMeta: true })
  async examplePaginate(@Query() appRequest: AppRequest): Promise<ApiResponse<AppResponse[]>> {
    const data = this.appService.getConfig();
    return formatResponse.paginate(AppResponse, [data], 'Lấy dữ liệu phân trang thành công', appRequest.page, appRequest.size);
  }

  @Get('/null')
  @ApiDataResponse(null)
  async exampleNull(): Promise<ApiResponse<null>> {
    const data = this.appService.getConfig();
    return formatResponse.single(null, null, 'Thao tác thành công')
  }
}
