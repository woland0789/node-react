import { UserModel } from "../models/User.js";
import bcrypt from 'bcryptjs';
import { tokenService } from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiError.js";

class UserService{
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email ${email} уже существует.`);
        }

        const hachPassword = await bcrypt.hash(password, 3); 
        const user = await UserModel.create({ email, password: hachPassword });

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFormDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFormDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = UserModel.find();
        return users;
    }
}

export const userService = new UserService();