import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { User } from '../../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: any) {
    const { id, emails, name, photos } = profile;
    const email = emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { googleId: id },
      include: {
        divisionDirigee: {
          select: {
            id: true,
            nom: true,
            code: true,
          },
        },
      },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          divisionDirigee: {
            select: {
              id: true,
              nom: true,
              code: true,
            },
          },
        },
      });

      if (user) {
        user = await this.prisma.user.update({
          where: { email },
          data: { googleId: id },
          include: {
            divisionDirigee: {
              select: {
                id: true,
                nom: true,
                code: true,
              },
            },
          },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            email,
            googleId: id,
            nom: name?.familyName || '',
            prenom: name?.givenName || '',
            photo: photos?.[0]?.value || null,
            actif: false,
          },
          include: {
            divisionDirigee: {
              select: {
                id: true,
                nom: true,
                code: true,
              },
            },
          },
        });
      }
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        photo: user.photo,
        role: user.role,
        divisionId: user.divisionId,
        actif: user.actif,
        divisionDirigee: user.divisionDirigee || null,
      },
    };
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        divisionDirigee: {
          select: {
            id: true,
            nom: true,
            code: true,
          },
        },
      },
    });
  }

  async updateUserProfile(
    id: number,
    data: { nom?: string; prenom?: string; photo?: string },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        photo: true,
        role: true,
        actif: true,
        divisionId: true,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        photo: true,
        role: true,
        actif: true,
        divisionId: true,
        createdAt: true,
      },
    });
  }

  async updateUserRole(id: number, role: string) {
    return this.prisma.user.update({
      where: { id },
      data: { role: role as any },
    });
  }
}
