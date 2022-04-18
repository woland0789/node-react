import jwt from 'jsonwebtoken';
import config from 'config';
import { TokenModel } from '../models/Token.js';

class TokenService{
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get('accessSecretKey'), { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, config.get('refreshSecretKey'), { expiresIn: '14d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, config.get('accessSecretKey'));
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.get('refreshSecretKey'));
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

export const tokenService = new TokenService();