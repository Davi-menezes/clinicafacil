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
exports.EmailService = void 0;
var common_1 = require("@nestjs/common");
var nodemailer = require("nodemailer");
var EmailService = exports.EmailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailService = _classThis = /** @class */ (function () {
        function EmailService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(EmailService.name);
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('SMTP_HOST', 'localhost'),
                port: this.configService.get('SMTP_PORT', 1025),
                secure: false,
                auth: this.configService.get('SMTP_USER')
                    ? {
                        user: this.configService.get('SMTP_USER'),
                        pass: this.configService.get('SMTP_PASS'),
                    }
                    : undefined,
            });
        }
        EmailService_1.prototype.sendEmail = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.transporter.sendMail({
                                    from: this.configService.get('SMTP_FROM', 'noreply@clinicafacil.com.br'),
                                    to: options.to,
                                    subject: options.subject,
                                    html: options.html,
                                })];
                        case 1:
                            _a.sent();
                            this.logger.log("Email enviado para ".concat(options.to, ": ").concat(options.subject));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error("Falha ao enviar email para ".concat(options.to, ": ").concat(error_1.message));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.sendVerificationEmail = function (email, token, nome) {
            return __awaiter(this, void 0, void 0, function () {
                var frontendUrl, link;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            frontendUrl = this.configService.get('FRONTEND_URL');
                            link = "".concat(frontendUrl, "/auth/verify?token=").concat(token);
                            return [4 /*yield*/, this.sendEmail({
                                    to: email,
                                    subject: 'Verifique seu email — ClinicaFácil',
                                    html: "\n        <h1>Bem-vindo \u00E0 ClinicaF\u00E1cil, ".concat(nome, "!</h1>\n        <p>Clique no link abaixo para ativar sua conta:</p>\n        <a href=\"").concat(link, "\" style=\"padding:12px 24px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;display:inline-block;\">Verificar Email</a>\n        <p>Este link expira em 15 minutos.</p>\n        <p>Se voc\u00EA n\u00E3o criou esta conta, ignore este email.</p>\n      "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.sendAppointmentConfirmation = function (email, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendEmail({
                                to: email,
                                subject: "Consulta confirmada \u2014 ".concat(data.dataHora),
                                html: "\n        <h1>Consulta Confirmada!</h1>\n        <p>Ol\u00E1, ".concat(data.nomePaciente, "!</p>\n        <p>Sua consulta com <strong>").concat(data.nomeProfissional, "</strong> (").concat(data.especialidade, ") est\u00E1 confirmada.</p>\n        <ul>\n          <li><strong>Data/Hora:</strong> ").concat(data.dataHora, "</li>\n          <li><strong>Tipo:</strong> ").concat(data.tipo === 'ONLINE' ? 'Online' : 'Presencial', "</li>\n          <li><strong>Local:</strong> ").concat(data.endereco, "</li>\n        </ul>\n        <p>Em caso de imprevisto, cancele com pelo menos 2h de anteced\u00EAncia.</p>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        EmailService_1.prototype.sendReminder = function (email, nome, dataHora) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendEmail({
                                to: email,
                                subject: "Lembrete: sua consulta \u00E9 amanh\u00E3 \u00E0s ".concat(dataHora),
                                html: "\n        <h1>Lembrete de Consulta</h1>\n        <p>Ol\u00E1, ".concat(nome, "!</p>\n        <p>Voc\u00EA tem uma consulta agendada para <strong>").concat(dataHora, "</strong>.</p>\n        <p>Se precisar cancelar ou reagendar, acesse seu painel.</p>\n      "),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return EmailService_1;
    }());
    __setFunctionName(_classThis, "EmailService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        EmailService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailService = _classThis;
}();
