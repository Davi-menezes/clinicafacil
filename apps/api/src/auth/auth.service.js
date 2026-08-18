"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var speakeasy = require("speakeasy");
var crypto = require("crypto");
var AuthService = exports.AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService, configService, encryptionService, redisService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.configService = configService;
            this.encryptionService = encryptionService;
            this.redisService = redisService;
            this.BCRYPT_COST = 12;
            this.MAX_LOGIN_ATTEMPTS = 5;
            this.LOGIN_WINDOW_SECONDS = 15 * 60;
            this.EMAIL_VERIFY_TTL = 15 * 60;
        }
        AuthService_1.prototype.hashPassword = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, bcrypt.hash(password, this.BCRYPT_COST)];
                });
            });
        };
        AuthService_1.prototype.comparePassword = function (password, hash) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, bcrypt.compare(password, hash)];
                });
            });
        };
        AuthService_1.prototype.encryptEmail = function (email) {
            var encrypted = this.encryptionService.encrypt(email.toLowerCase().trim());
            var hash = this.encryptionService.hash(email);
            return { encrypted: encrypted, hash: hash };
        };
        AuthService_1.prototype.validateLogin = function (ip) {
            return __awaiter(this, void 0, void 0, function () {
                var redis, key, attempts, ttl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redis = this.redisService.getClient();
                            key = "login:attempts:".concat(ip);
                            return [4 /*yield*/, redis.get(key)];
                        case 1:
                            attempts = _a.sent();
                            if (!(attempts && parseInt(attempts, 10) >= this.MAX_LOGIN_ATTEMPTS)) return [3 /*break*/, 3];
                            return [4 /*yield*/, redis.ttl(key)];
                        case 2:
                            ttl = _a.sent();
                            throw new common_1.UnauthorizedException("Muitas tentativas de login. Tente novamente em ".concat(ttl, " segundos."));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.recordLoginAttempt = function (ip, success) {
            return __awaiter(this, void 0, void 0, function () {
                var redis, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (success)
                                return [2 /*return*/];
                            redis = this.redisService.getClient();
                            key = "login:attempts:".concat(ip);
                            return [4 /*yield*/, redis.multi().incr(key).expire(key, this.LOGIN_WINDOW_SECONDS).exec()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.generateTokens = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, _a, accessToken, refreshToken, familia, tokenHash;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payload = { sub: user.id, tipo: user.tipo, emailHash: user.emailHash };
                            return [4 /*yield*/, Promise.all([
                                    this.jwtService.signAsync(payload, {
                                        secret: this.configService.get('JWT_ACCESS_SECRET'),
                                        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES') || '15m',
                                    }),
                                    this.jwtService.signAsync(payload, {
                                        secret: this.configService.get('JWT_REFRESH_SECRET'),
                                        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') || '7d',
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), accessToken = _a[0], refreshToken = _a[1];
                            familia = crypto.randomUUID();
                            tokenHash = this.encryptionService.hash(refreshToken);
                            return [4 /*yield*/, this.prisma.refreshToken.create({
                                    data: {
                                        userId: user.id,
                                        tokenHash: tokenHash,
                                        familia: familia,
                                        expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                    },
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshTokens = function (oldRefreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenHash, storedToken, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tokenHash = this.encryptionService.hash(oldRefreshToken);
                            return [4 /*yield*/, this.prisma.refreshToken.findUnique({
                                    where: { tokenHash: tokenHash },
                                    include: { user: true },
                                })];
                        case 1:
                            storedToken = _a.sent();
                            if (!(!storedToken || storedToken.usado || new Date() > storedToken.expiraEm)) return [3 /*break*/, 4];
                            if (!storedToken) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.refreshToken.deleteMany({
                                    where: { familia: storedToken.familia },
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: throw new common_1.UnauthorizedException('Token inválido ou expirado');
                        case 4: return [4 /*yield*/, this.prisma.refreshToken.update({
                                where: { id: storedToken.id },
                                data: { usado: true },
                            })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens({
                                    id: storedToken.user.id,
                                    tipo: storedToken.user.tipo,
                                    emailHash: storedToken.user.emailHash,
                                })];
                        case 6:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens];
                    }
                });
            });
        };
        AuthService_1.prototype.sendEmailVerification = function (userId, email) {
            return __awaiter(this, void 0, void 0, function () {
                var token, redis;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = crypto.randomUUID();
                            redis = this.redisService.getClient();
                            return [4 /*yield*/, redis.set("email:verify:".concat(token), JSON.stringify({ userId: userId, email: email }), 'EX', this.EMAIL_VERIFY_TTL)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, token];
                    }
                });
            });
        };
        AuthService_1.prototype.verifyEmail = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var redis, data, userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redis = this.redisService.getClient();
                            return [4 /*yield*/, redis.get("email:verify:".concat(token))];
                        case 1:
                            data = _a.sent();
                            if (!data)
                                throw new common_1.BadRequestException('Token inválido ou expirado');
                            userId = JSON.parse(data).userId;
                            return [4 /*yield*/, this.prisma.user.update({ where: { id: userId }, data: { verificado: true } })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redis.del("email:verify:".concat(token))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { userId: userId }];
                    }
                });
            });
        };
        AuthService_1.prototype.generateTotpSecret = function () {
            var secret = speakeasy.generateSecret({
                name: "ClinicaFacil (".concat(process.env.APP_NAME || 'app', ")"),
            });
            return {
                secret: secret.base32,
                otpauthUrl: secret.otpauth_url || '',
            };
        };
        AuthService_1.prototype.verifyTotpToken = function (secret, token) {
            return speakeasy.totp.verify({
                secret: secret,
                encoding: 'base32',
                token: token,
                window: 1,
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
