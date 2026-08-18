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
exports.PatientsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../common/guards/roles.guard");
var roles_decorator_1 = require("../common/decorators/roles.decorator");
var PatientsController = exports.PatientsController = function () {
    var _classDecorators = [(0, common_1.Controller)('paciente'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('PACIENTE')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _adicionarFavorito_decorators;
    var _removerFavorito_decorators;
    var _downloadDados_decorators;
    var _deletarConta_decorators;
    var PatientsController = _classThis = /** @class */ (function () {
        function PatientsController_1(patientsService, prisma) {
            this.patientsService = (__runInitializers(this, _instanceExtraInitializers), patientsService);
            this.prisma = prisma;
        }
        PatientsController_1.prototype.getProfile = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error('Perfil não encontrado');
                            return [2 /*return*/, this.patientsService.getProfile(paciente.id, user.sub)];
                    }
                });
            });
        };
        PatientsController_1.prototype.updateProfile = function (user, data) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error();
                            return [2 /*return*/, this.patientsService.updateProfile(paciente.id, user.sub, data)];
                    }
                });
            });
        };
        PatientsController_1.prototype.adicionarFavorito = function (user, profissionalId) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error();
                            return [2 /*return*/, this.patientsService.adicionarFavorito(paciente.id, profissionalId, user.sub)];
                    }
                });
            });
        };
        PatientsController_1.prototype.removerFavorito = function (user, profissionalId) {
            return __awaiter(this, void 0, void 0, function () {
                var paciente;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.paciente.findUnique({ where: { userId: user.sub } })];
                        case 1:
                            paciente = _a.sent();
                            if (!paciente)
                                throw new Error();
                            return [2 /*return*/, this.patientsService.removerFavorito(paciente.id, profissionalId, user.sub)];
                    }
                });
            });
        };
        PatientsController_1.prototype.downloadDados = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.patientsService.downloadDados(user.sub)];
                });
            });
        };
        PatientsController_1.prototype.deletarConta = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.patientsService.deletarConta(user.sub)];
                });
            });
        };
        return PatientsController_1;
    }());
    __setFunctionName(_classThis, "PatientsController");
    (function () {
        _getProfile_decorators = [(0, common_1.Get)()];
        _updateProfile_decorators = [(0, common_1.Put)()];
        _adicionarFavorito_decorators = [(0, common_1.Post)('favoritos/:profissionalId')];
        _removerFavorito_decorators = [(0, common_1.Delete)('favoritos/:profissionalId')];
        _downloadDados_decorators = [(0, common_1.Get)('download-dados')];
        _deletarConta_decorators = [(0, common_1.Delete)('conta')];
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _adicionarFavorito_decorators, { kind: "method", name: "adicionarFavorito", static: false, private: false, access: { has: function (obj) { return "adicionarFavorito" in obj; }, get: function (obj) { return obj.adicionarFavorito; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removerFavorito_decorators, { kind: "method", name: "removerFavorito", static: false, private: false, access: { has: function (obj) { return "removerFavorito" in obj; }, get: function (obj) { return obj.removerFavorito; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _downloadDados_decorators, { kind: "method", name: "downloadDados", static: false, private: false, access: { has: function (obj) { return "downloadDados" in obj; }, get: function (obj) { return obj.downloadDados; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletarConta_decorators, { kind: "method", name: "deletarConta", static: false, private: false, access: { has: function (obj) { return "deletarConta" in obj; }, get: function (obj) { return obj.deletarConta; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        PatientsController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PatientsController = _classThis;
}();
