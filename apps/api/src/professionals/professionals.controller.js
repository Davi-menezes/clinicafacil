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
exports.ProfessionalsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var path_1 = require("path");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../common/guards/roles.guard");
var roles_decorator_1 = require("../common/decorators/roles.decorator");
var ProfessionalsController = exports.ProfessionalsController = function () {
    var _classDecorators = [(0, common_1.Controller)('profissionais')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getBySlug_decorators;
    var _updateProfile_decorators;
    var _addEspecialidade_decorators;
    var _removeEspecialidade_decorators;
    var _addPlanoSaude_decorators;
    var _removePlanoSaude_decorators;
    var _uploadPerfil_decorators;
    var _uploadFotosConsultorio_decorators;
    var _getDisponibilidade_decorators;
    var _getDashboard_decorators;
    var ProfessionalsController = _classThis = /** @class */ (function () {
        function ProfessionalsController_1(professionalsService, prisma) {
            this.professionalsService = (__runInitializers(this, _instanceExtraInitializers), professionalsService);
            this.prisma = prisma;
        }
        ProfessionalsController_1.prototype.getBySlug = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.professionalsService.findBySlug(slug)];
                });
            });
        };
        ProfessionalsController_1.prototype.updateProfile = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException('Perfil não encontrado');
                            return [2 /*return*/, this.professionalsService.updateProfile(prof.id, user.sub, dto)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.addEspecialidade = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.addEspecialidade(prof.id, dto.especialidade, user.sub)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.removeEspecialidade = function (user, especialidade) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.removeEspecialidade(prof.id, especialidade, user.sub)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.addPlanoSaude = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.addPlanoSaude(prof.id, dto.planoSaude, user.sub)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.removePlanoSaude = function (user, plano) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.removePlanoSaude(prof.id, plano, user.sub)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.uploadPerfil = function (user, file) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.uploadFotoPerfil(prof.id, user.sub, file.filename)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.uploadFotosConsultorio = function (user, files) {
            return __awaiter(this, void 0, void 0, function () {
                var prof, filenames;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            filenames = files.map(function (f) { return f.filename; });
                            return [2 /*return*/, this.professionalsService.uploadFotosConsultorio(prof.id, user.sub, filenames)];
                    }
                });
            });
        };
        ProfessionalsController_1.prototype.getDisponibilidade = function (id, mes) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.professionalsService.getDisponibilidade(id, mes)];
                });
            });
        };
        ProfessionalsController_1.prototype.getDashboard = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var prof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profissional.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            prof = _a.sent();
                            if (!prof)
                                throw new common_1.NotFoundException();
                            return [2 /*return*/, this.professionalsService.getDashboardMetrics(prof.id)];
                    }
                });
            });
        };
        return ProfessionalsController_1;
    }());
    __setFunctionName(_classThis, "ProfessionalsController");
    (function () {
        _getBySlug_decorators = [(0, common_1.Get)(':slug')];
        _updateProfile_decorators = [(0, common_1.Put)('profile'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL')];
        _addEspecialidade_decorators = [(0, common_1.Post)('especialidades'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _removeEspecialidade_decorators = [(0, common_1.Delete)('especialidades/:especialidade'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL')];
        _addPlanoSaude_decorators = [(0, common_1.Post)('planos-saude'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _removePlanoSaude_decorators = [(0, common_1.Delete)('planos-saude/:plano'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL')];
        _uploadPerfil_decorators = [(0, common_1.Post)('upload/perfil'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/perfil',
                    filename: function (_req, file, cb) {
                        var unique = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 1e9)).concat((0, path_1.extname)(file.originalname));
                        cb(null, unique);
                    },
                }),
                limits: { fileSize: 5 * 1024 * 1024 },
                fileFilter: function (_req, file, cb) {
                    if (!/\.(jpe?g|png|webp)$/i.test(file.originalname)) {
                        return cb(new Error('Apenas JPEG, PNG ou WebP'), false);
                    }
                    cb(null, true);
                },
            }))];
        _uploadFotosConsultorio_decorators = [(0, common_1.Post)('upload/consultorio'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/consultorio',
                    filename: function (_req, file, cb) {
                        var unique = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 1e9)).concat((0, path_1.extname)(file.originalname));
                        cb(null, unique);
                    },
                }),
                limits: { fileSize: 5 * 1024 * 1024, fileSize: 30 * 1024 * 1024 },
                fileFilter: function (_req, file, cb) {
                    if (!/\.(jpe?g|png|webp)$/i.test(file.originalname)) {
                        return cb(new Error('Apenas JPEG, PNG ou WebP'), false);
                    }
                    cb(null, true);
                },
            }))];
        _getDisponibilidade_decorators = [(0, common_1.Get)(':id/disponibilidade')];
        _getDashboard_decorators = [(0, common_1.Get)('dashboard/metrics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PROFISSIONAL')];
        __esDecorate(_classThis, null, _getBySlug_decorators, { kind: "method", name: "getBySlug", static: false, private: false, access: { has: function (obj) { return "getBySlug" in obj; }, get: function (obj) { return obj.getBySlug; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addEspecialidade_decorators, { kind: "method", name: "addEspecialidade", static: false, private: false, access: { has: function (obj) { return "addEspecialidade" in obj; }, get: function (obj) { return obj.addEspecialidade; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeEspecialidade_decorators, { kind: "method", name: "removeEspecialidade", static: false, private: false, access: { has: function (obj) { return "removeEspecialidade" in obj; }, get: function (obj) { return obj.removeEspecialidade; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addPlanoSaude_decorators, { kind: "method", name: "addPlanoSaude", static: false, private: false, access: { has: function (obj) { return "addPlanoSaude" in obj; }, get: function (obj) { return obj.addPlanoSaude; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removePlanoSaude_decorators, { kind: "method", name: "removePlanoSaude", static: false, private: false, access: { has: function (obj) { return "removePlanoSaude" in obj; }, get: function (obj) { return obj.removePlanoSaude; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadPerfil_decorators, { kind: "method", name: "uploadPerfil", static: false, private: false, access: { has: function (obj) { return "uploadPerfil" in obj; }, get: function (obj) { return obj.uploadPerfil; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadFotosConsultorio_decorators, { kind: "method", name: "uploadFotosConsultorio", static: false, private: false, access: { has: function (obj) { return "uploadFotosConsultorio" in obj; }, get: function (obj) { return obj.uploadFotosConsultorio; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDisponibilidade_decorators, { kind: "method", name: "getDisponibilidade", static: false, private: false, access: { has: function (obj) { return "getDisponibilidade" in obj; }, get: function (obj) { return obj.getDisponibilidade; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: function (obj) { return "getDashboard" in obj; }, get: function (obj) { return obj.getDashboard; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ProfessionalsController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfessionalsController = _classThis;
}();
