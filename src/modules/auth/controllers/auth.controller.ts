import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { ApiDataResponse } from '@/common/decorators';
import { formatResponse } from '@/common/helpers';
import { ApiResponse } from '@/common/interfaces';
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RegisterRequestDto,
} from '../dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiExtraModels(LoginResponseDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: RegisterRequestDto,
  })
  @ApiDataResponse(null)
  async register(
    @Body() registerRequest: RegisterRequestDto,
  ): Promise<ApiResponse<null>> {
    await this.authService.register(registerRequest);
    return formatResponse.single(null, null, 'Đăng ký tài khoản thành công!');
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: LoginRequestDto,
  })
  @ApiDataResponse(LoginResponseDto)
  async login(
    @Body() loginRequest: LoginRequestDto,
  ): Promise<ApiResponse<LoginResponseDto>> {
    const data = await this.authService.login(loginRequest);
    return formatResponse.single(
      LoginResponseDto,
      data,
      'Đăng nhập tài khoản thành công!',
    );
  }

  @Post('/log-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng xuất tài khoản' })
  @ApiBody({
    description: 'Dữ liệu yêu cầu',
    type: LogoutRequestDto,
  })
  @ApiDataResponse(null)
  async logOut(
    @Body() logoutRequest: LogoutRequestDto,
  ): Promise<ApiResponse<null>> {
    await this.authService.logOut(logoutRequest);
    return formatResponse.single(null, null, 'Đăng xuất tài khoản thành công!');
  }
}
