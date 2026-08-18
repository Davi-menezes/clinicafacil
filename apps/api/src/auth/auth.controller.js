"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var throttler_1 = require("@nestjs/throttler");
var slugify_1 = require("slugify");
var AuthController = exports.AuthController = function () {
    var _classDecorators = [(0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _login_decorators;
    var _loginTwoFactor_decorators;
    var _registroProfissional_decorators;
    var _registroPaciente_decorators;
    var _refreshTokens_decorators;
    var _verifyEmail_decorators;
    var _me_decorators;
    var _setup2fa_decorators;
    var _enable2fa_decorators;
    var _disable2fa_decorators;
    var _changePassword_decorators;
    var _forgotPassword_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, prisma, encryptionService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.prisma = prisma;
            this.encryptionService = encryptionService;
        }
        AuthController_1.prototype.login = function (dto, ip) {
            return __awaiter(this, void 0, void 0, function () {
                var emailHash, user, validPassword, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.validateLogin(ip)];
                        case 1:
                            _a.sent();
                            emailHash = this.authService.encryptEmail(dto.email).hash;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { emailHash: emailHash },
                                })];
                        case 2:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.authService.recordLoginAttempt(ip, false)];
                        case 3:
                            _a.sent();
                            throw new common_1.UnauthorizedException('Credenciais inválidas');
                        case 4: return [4 /*yield*/, this.authService.comparePassword(dto.senha, user.senhaHash)];
                        case 5:
                            validPassword = _a.sent();
                            if (!!validPassword) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.authService.recordLoginAttempt(ip, false)];
                        case 6:
                            _a.sent();
                            throw new common_1.UnauthorizedException('Credenciais inválidas');
                        case 7:
                            if (!user.verificado) {
                                throw new common_1.UnauthorizedException('Email não verificado. Verifique sua caixa de entrada.');
                            }
                            if (user.totpAtivo) {
                                return [2 /*return*/, { requiresTwoFactor: true, userId: user.id }];
                            }
                            return [4 /*yield*/, this.authService.generateTokens({
                                    id: user.id,
                                    tipo: user.tipo,
                                    emailHash: user.emailHash,
                                })];
                        case 8:
                            tokens = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: { ultimoAcessoEm: new Date() },
                                })];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, tokens];
                    }
                });
            });
        };
        AuthController_1.prototype.loginTwoFactor = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, valid, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: dto.userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user || !user.totpSecret)
                                throw new common_1.UnauthorizedException();
                            valid = this.authService.verifyTotpToken(user.totpSecret, dto.token);
                            if (!valid)
                                throw new common_1.UnauthorizedException('Código 2FA inválido');
                            return [4 /*yield*/, this.authService.generateTokens({
                                    id: user.id,
                                    tipo: user.tipo,
                                    emailHash: user.emailHash,
                                })];
                        case 2:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens];
                    }
                });
            });
        };
        AuthController_1.prototype.registroProfissional = function (dto) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var _c, encrypted, hash, existing, passwordHash, slug, user;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!dto.lgpdConsent) {
                                throw new common_1.BadRequestException('Consentimento LGPD é obrigatório');
                            }
                            _c = this.authService.encryptEmail(dto.email), encrypted = _c.encrypted, hash = _c.hash;
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { emailHash: hash } })];
                        case 1:
                            existing = _d.sent();
                            if (existing)
                                throw new common_1.BadRequestException('Email já cadastrado');
                            return [4 /*yield*/, this.authService.hashPassword(dto.senha)];
                        case 2:
                            passwordHash = _d.sent();
                            slug = (0, slugify_1.slugify)("".concat(dto.nomeCompleto, "-").concat(dto.especialidadePrincipal, "-").concat(dto.estado, "-").concat(dto.conselhoSigla, "-").concat(dto.conselhoNumero), { lower: true, strict: true });
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        emailEncrypted: encrypted,
                                        emailHash: hash,
                                        senhaHash: passwordHash,
                                        tipo: 'PROFISSIONAL',
                                        nomeCompleto: dto.nomeCompleto,
                                        lgpdConsent: true,
                                        profissional: {
                                            create: {
                                                slug: slug,
                                                especialidadePrincipal: dto.especialidadePrincipal,
                                                conselhoNumero: dto.conselhoNumero,
                                                conselhoSigla: dto.conselhoSigla,
                                                conselhoUf: dto.conselhoUf,
                                                estado: dto.estado,
                                                cidade: dto.cidade,
                                                bairro: dto.bairro,
                                                atendeOnline: (_a = dto.atendeOnline) !== null && _a !== void 0 ? _a : false,
                                                atendeDomicilio: (_b = dto.atendeDomicilio) !== null && _b !== void 0 ? _b : false,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _d.sent();
                            return [4 /*yield*/, this.authService.sendEmailVerification(user.id, dto.email)];
                        case 4:
                            _d.sent();
                            return [2 /*return*/, {
                                    message: 'Cadastro realizado. Verifique seu email para ativar a conta.',
                                    userId: user.id,
                                }];
                    }
                });
            });
        };
        AuthController_1.prototype.registroPaciente = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, encrypted, hash, existing, passwordHash, user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!dto.lgpdConsent) {
                                throw new common_1.BadRequestException('Consentimento LGPD é obrigatório');
                            }
                            _a = this.authService.encryptEmail(dto.email), encrypted = _a.encrypted, hash = _a.hash;
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { emailHash: hash } })];
                        case 1:
                            existing = _b.sent();
                            if (existing)
                                throw new common_1.BadRequestException('Email já cadastrado');
                            return [4 /*yield*/, this.authService.hashPassword(dto.senha)];
                        case 2:
                            passwordHash = _b.sent();
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        emailEncrypted: encrypted,
                                        emailHash: hash,
                                        senhaHash: passwordHash,
                                        tipo: 'PACIENTE',
                                        nomeCompleto: dto.nomeCompleto,
                                        lgpdConsent: true,
                                        paciente: {
                                            create: {
                                                telefone: dto.telefone,
                                                dataNasc: dto.dataNascimento ? new Date(dto.dataNascimento) : null,
                                                estado: dto.estado,
                                                cidade: dto.cidade,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _b.sent();
                            return [4 /*yield*/, this.authService.sendEmailVerification(user.id, dto.email)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, {
                                    message: 'Cadastro realizado. Verifique seu email para ativar a conta.',
                                    userId: user.id,
                                }];
                    }
                });
            });
        };
        AuthController_1.prototype.refreshTokens = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.refreshTokens(dto.refreshToken)];
                });
            });
        };
        AuthController_1.prototype.verifyEmail = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.verifyEmail(dto.token)];
                });
            });
        };
        AuthController_1.prototype.me = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var dbUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!user)
                                throw new common_1.UnauthorizedException();
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: user.sub },
                                    select: {
                                        id: true,
                                        tipo: true,
                                        nomeCompleto: true,
                                        verificado: true,
                                        totpAtivo: true,
                                        criadoEm: true,
                                        profissional: true,
                                        paciente: true,
                                    },
                                })];
                        case 1:
                            dbUser = _a.sent();
                            return [2 /*return*/, dbUser];
                    }
                });
            });
        };
        AuthController_1.prototype.setup2fa = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, secret, otpauthUrl;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.authService.generateTotpSecret(), secret = _a.secret, otpauthUrl = _a.otpauthUrl;
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.sub },
                                    data: { totpSecret: secret },
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, { otpauthUrl: otpauthUrl, message: 'Escaneie o QR code com seu app de autenticação' }];
                    }
                });
            });
        };
        AuthController_1.prototype.enable2fa = function (dto, user) {
            return __awaiter(this, void 0, void 0, function () {
                var dbUser, valid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: user.sub } })];
                        case 1:
                            dbUser = _a.sent();
                            if (!(dbUser === null || dbUser === void 0 ? void 0 : dbUser.totpSecret))
                                throw new common_1.BadRequestException('Configure 2FA primeiro');
                            valid = this.authService.verifyTotpToken(dbUser.totpSecret, dto.token);
                            if (!valid)
                                throw new common_1.BadRequestException('Código inválido');
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.sub },
                                    data: { totpAtivo: true },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: '2FA ativado com sucesso' }];
                    }
                });
            });
        };
        AuthController_1.prototype.disable2fa = function (dto, user) {
            return __awaiter(this, void 0, void 0, function () {
                var dbUser, valid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: user.sub } })];
                        case 1:
                            dbUser = _a.sent();
                            if (!(dbUser === null || dbUser === void 0 ? void 0 : dbUser.totpSecret))
                                throw new common_1.BadRequestException();
                            valid = this.authService.verifyTotpToken(dbUser.totpSecret, dto.token);
                            if (!valid)
                                throw new common_1.BadRequestException('Código inválido');
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.sub },
                                    data: { totpAtivo: false, totpSecret: null },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: '2FA desativado' }];
                    }
                });
            });
        };
        AuthController_1.prototype.changePassword = function (dto, user) {
            return __awaiter(this, void 0, void 0, function () {
                var dbUser, valid, newHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: user.sub } })];
                        case 1:
                            dbUser = _a.sent();
                            if (!dbUser)
                                throw new common_1.UnauthorizedException();
                            return [4 /*yield*/, this.authService.comparePassword(dto.senhaAtual, dbUser.senhaHash)];
                        case 2:
                            valid = _a.sent();
                            if (!valid)
                                throw new common_1.BadRequestException('Senha atual incorreta');
                            return [4 /*yield*/, this.authService.hashPassword(dto.senhaNova)];
                        case 3:
                            newHash = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.sub },
                                    data: { senhaHash: newHash },
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.refreshToken.deleteMany({ where: { userId: user.sub } })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { message: 'Senha alterada. Faça login novamente.' }];
                    }
                });
            });
        };
        AuthController_1.prototype.forgotPassword = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var hash, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hash = this.authService.encryptEmail(dto.email).hash;
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { emailHash: hash } })];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, { message: 'Se o email existir, você receberá um link de recuperação.' }];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        _login_decorators = [(0, common_1.Post)('login'), (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 900000 } }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _loginTwoFactor_decorators = [(0, common_1.Post)('login/2fa'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _registroProfissional_decorators = [(0, common_1.Post)('registro-profissional')];
        _registroPaciente_decorators = [(0, common_1.Post)('registro-paciente')];
        _refreshTokens_decorators = [(0, common_1.Post)('refresh'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _verifyEmail_decorators = [(0, common_1.Post)('verify-email'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _me_decorators = [(0, common_1.Get)('me')];
        _setup2fa_decorators = [(0, common_1.Post)('2fa/setup')];
        _enable2fa_decorators = [(0, common_1.Post)('2fa/enable')];
        _disable2fa_decorators = [(0, common_1.Post)('2fa/disable'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _changePassword_decorators = [(0, common_1.Post)('change-password')];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password'), (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 900000 } }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _loginTwoFactor_decorators, { kind: "method", name: "loginTwoFactor", static: false, private: false, access: { has: function (obj) { return "loginTwoFactor" in obj; }, get: function (obj) { return obj.loginTwoFactor; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registroProfissional_decorators, { kind: "method", name: "registroProfissional", static: false, private: false, access: { has: function (obj) { return "registroProfissional" in obj; }, get: function (obj) { return obj.registroProfissional; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _registroPaciente_decorators, { kind: "method", name: "registroPaciente", static: false, private: false, access: { has: function (obj) { return "registroPaciente" in obj; }, get: function (obj) { return obj.registroPaciente; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshTokens_decorators, { kind: "method", name: "refreshTokens", static: false, private: false, access: { has: function (obj) { return "refreshTokens" in obj; }, get: function (obj) { return obj.refreshTokens; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _me_decorators, { kind: "method", name: "me", static: false, private: false, access: { has: function (obj) { return "me" in obj; }, get: function (obj) { return obj.me; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setup2fa_decorators, { kind: "method", name: "setup2fa", static: false, private: false, access: { has: function (obj) { return "setup2fa" in obj; }, get: function (obj) { return obj.setup2fa; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _enable2fa_decorators, { kind: "method", name: "enable2fa", static: false, private: false, access: { has: function (obj) { return "enable2fa" in obj; }, get: function (obj) { return obj.enable2fa; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disable2fa_decorators, { kind: "method", name: "disable2fa", static: false, private: false, access: { has: function (obj) { return "disable2fa" in obj; }, get: function (obj) { return obj.disable2fa; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changePassword_decorators, { kind: "method", name: "changePassword", static: false, private: false, access: { has: function (obj) { return "changePassword" in obj; }, get: function (obj) { return obj.changePassword; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
