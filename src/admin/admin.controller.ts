import { Controller, Get, Post, Patch, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ToggleUserStatusDto } from './dto/toggle-user-status.dto';
import { UpdateExpressionStatusDto } from './dto/update-expression-status.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ========== GESTION UTILISATEURS ==========

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id/status')
  async toggleUserStatus(@Param('id') id: string, @Body() dto: ToggleUserStatusDto) {
    return this.adminService.toggleUserStatus(Number(id), dto.actif);
  }

  @Patch('users/:id/role')
  async updateUserRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.adminService.updateUserRole(Number(id), dto.role);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(Number(id));
  }

  // ========== GESTION EXPRESSIONS ==========

  @Get('expressions')
  getAllExpressions() {
    return this.adminService.getAllExpressions();
  }

  @Get('expressions/:id')
  getExpressionDetails(@Param('id') id: string) {
    return this.adminService.getExpressionDetails(+id);
  }

  @Patch('expressions/:id/status')
  updateExpressionStatus(@Param('id') id: string, @Body() dto: UpdateExpressionStatusDto) {
    return this.adminService.updateExpressionStatus(+id, dto);
  }
}
