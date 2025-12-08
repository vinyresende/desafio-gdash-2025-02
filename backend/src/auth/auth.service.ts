import bcrypt from 'bcrypt'

import { Model } from 'mongoose'
import { User } from 'src/schemas/User.schema'

import { InjectModel } from '@nestjs/mongoose'
import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { DEFAULT_USER } from 'src/constants'
import { UserSignInDTO, UserSignUpDTO } from './dto/user.dto'

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async onModuleInit() {
        await this.createDefaultUserIfNotExists()
    }

    private async createDefaultUserIfNotExists() {
        const user = await this.userModel.findOne({ email: DEFAULT_USER.email }).exec()

        if (!user) {
            const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 12)

            const defaultAdmin = new this.userModel({ ...DEFAULT_USER, password: hashedPassword })

            await defaultAdmin.save()
        }
    }

    async signup(data: UserSignUpDTO) {
        const userExists: User | null = await this.userModel.findOne({ email: data.email }).lean()

        if (userExists) {
            throw new ConflictException("A user with this email already exists!")
        }

        const hashedPass = await bcrypt.hash(data.password, 12)

        const user = new this.userModel({ ...data, password: hashedPass })
        await user.save()

        return { ...user.toObject(), password: undefined }
    }

    async signin(data: UserSignInDTO) {
        const user: User | null = await this.userModel.findOne({ email: data.email }).lean()

        const validPassword: boolean = user ? bcrypt.compareSync(data.password, user.password) : false

        if (!user || !validPassword) {
            throw new UnauthorizedException("Invalid Credentials!")
        }

        const accessToken: string = this.jwtService.sign({ ...user, password: undefined })

        return { ...user, password: undefined, accessToken }
    }
}
