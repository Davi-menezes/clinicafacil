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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.ChangePasswordDto = exports.SetupTotpDto = exports.VerifyEmailDto = exports.RefreshTokenDto = exports.CadastroPacienteDto = exports.CadastroProfissionalDto = exports.LoginDto = void 0;
var class_validator_1 = require("class-validator");
var LoginDto = exports.LoginDto = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _senha_decorators;
    var _senha_initializers = [];
    return _a = /** @class */ (function () {
            function LoginDto() {
                this.email = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.senha = __runInitializers(this, _senha_initializers, void 0);
            }
            return LoginDto;
        }()),
        (function () {
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            _senha_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _senha_decorators, { kind: "field", name: "senha", static: false, private: false, access: { has: function (obj) { return "senha" in obj; }, get: function (obj) { return obj.senha; }, set: function (obj, value) { obj.senha = value; } } }, _senha_initializers, _instanceExtraInitializers);
        })(),
        _a;
}();
var CadastroProfissionalDto = exports.CadastroProfissionalDto = function () {
    var _a;
    var _instanceExtraInitializers_1 = [];
    var _nomeCompleto_decorators;
    var _nomeCompleto_initializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _senha_decorators;
    var _senha_initializers = [];
    var _tipoPessoa_decorators;
    var _tipoPessoa_initializers = [];
    var _especialidadePrincipal_decorators;
    var _especialidadePrincipal_initializers = [];
    var _conselhoNumero_decorators;
    var _conselhoNumero_initializers = [];
    var _conselhoSigla_decorators;
    var _conselhoSigla_initializers = [];
    var _conselhoUf_decorators;
    var _conselhoUf_initializers = [];
    var _estado_decorators;
    var _estado_initializers = [];
    var _cidade_decorators;
    var _cidade_initializers = [];
    var _bairro_decorators;
    var _bairro_initializers = [];
    var _atendeOnline_decorators;
    var _atendeOnline_initializers = [];
    var _atendeDomicilio_decorators;
    var _atendeDomicilio_initializers = [];
    var _lgpdConsent_decorators;
    var _lgpdConsent_initializers = [];
    return _a = /** @class */ (function () {
            function CadastroProfissionalDto() {
                this.nomeCompleto = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _nomeCompleto_initializers, void 0));
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.senha = __runInitializers(this, _senha_initializers, void 0);
                this.tipoPessoa = __runInitializers(this, _tipoPessoa_initializers, void 0);
                this.especialidadePrincipal = __runInitializers(this, _especialidadePrincipal_initializers, void 0);
                this.conselhoNumero = __runInitializers(this, _conselhoNumero_initializers, void 0);
                this.conselhoSigla = __runInitializers(this, _conselhoSigla_initializers, void 0);
                this.conselhoUf = __runInitializers(this, _conselhoUf_initializers, void 0);
                this.estado = __runInitializers(this, _estado_initializers, void 0);
                this.cidade = __runInitializers(this, _cidade_initializers, void 0);
                this.bairro = __runInitializers(this, _bairro_initializers, void 0);
                this.atendeOnline = __runInitializers(this, _atendeOnline_initializers, void 0);
                this.atendeDomicilio = __runInitializers(this, _atendeDomicilio_initializers, void 0);
                this.lgpdConsent = __runInitializers(this, _lgpdConsent_initializers, void 0);
            }
            return CadastroProfissionalDto;
        }()),
        (function () {
            _nomeCompleto_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            _senha_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            _tipoPessoa_decorators = [(0, class_validator_1.IsString)()];
            _especialidadePrincipal_decorators = [(0, class_validator_1.IsString)()];
            _conselhoNumero_decorators = [(0, class_validator_1.IsString)()];
            _conselhoSigla_decorators = [(0, class_validator_1.IsString)()];
            _conselhoUf_decorators = [(0, class_validator_1.IsString)()];
            _estado_decorators = [(0, class_validator_1.IsString)()];
            _cidade_decorators = [(0, class_validator_1.IsString)()];
            _bairro_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _atendeOnline_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _atendeDomicilio_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _lgpdConsent_decorators = [(0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _nomeCompleto_decorators, { kind: "field", name: "nomeCompleto", static: false, private: false, access: { has: function (obj) { return "nomeCompleto" in obj; }, get: function (obj) { return obj.nomeCompleto; }, set: function (obj, value) { obj.nomeCompleto = value; } } }, _nomeCompleto_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _senha_decorators, { kind: "field", name: "senha", static: false, private: false, access: { has: function (obj) { return "senha" in obj; }, get: function (obj) { return obj.senha; }, set: function (obj, value) { obj.senha = value; } } }, _senha_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _tipoPessoa_decorators, { kind: "field", name: "tipoPessoa", static: false, private: false, access: { has: function (obj) { return "tipoPessoa" in obj; }, get: function (obj) { return obj.tipoPessoa; }, set: function (obj, value) { obj.tipoPessoa = value; } } }, _tipoPessoa_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _especialidadePrincipal_decorators, { kind: "field", name: "especialidadePrincipal", static: false, private: false, access: { has: function (obj) { return "especialidadePrincipal" in obj; }, get: function (obj) { return obj.especialidadePrincipal; }, set: function (obj, value) { obj.especialidadePrincipal = value; } } }, _especialidadePrincipal_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _conselhoNumero_decorators, { kind: "field", name: "conselhoNumero", static: false, private: false, access: { has: function (obj) { return "conselhoNumero" in obj; }, get: function (obj) { return obj.conselhoNumero; }, set: function (obj, value) { obj.conselhoNumero = value; } } }, _conselhoNumero_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _conselhoSigla_decorators, { kind: "field", name: "conselhoSigla", static: false, private: false, access: { has: function (obj) { return "conselhoSigla" in obj; }, get: function (obj) { return obj.conselhoSigla; }, set: function (obj, value) { obj.conselhoSigla = value; } } }, _conselhoSigla_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _conselhoUf_decorators, { kind: "field", name: "conselhoUf", static: false, private: false, access: { has: function (obj) { return "conselhoUf" in obj; }, get: function (obj) { return obj.conselhoUf; }, set: function (obj, value) { obj.conselhoUf = value; } } }, _conselhoUf_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _estado_decorators, { kind: "field", name: "estado", static: false, private: false, access: { has: function (obj) { return "estado" in obj; }, get: function (obj) { return obj.estado; }, set: function (obj, value) { obj.estado = value; } } }, _estado_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _cidade_decorators, { kind: "field", name: "cidade", static: false, private: false, access: { has: function (obj) { return "cidade" in obj; }, get: function (obj) { return obj.cidade; }, set: function (obj, value) { obj.cidade = value; } } }, _cidade_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _bairro_decorators, { kind: "field", name: "bairro", static: false, private: false, access: { has: function (obj) { return "bairro" in obj; }, get: function (obj) { return obj.bairro; }, set: function (obj, value) { obj.bairro = value; } } }, _bairro_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _atendeOnline_decorators, { kind: "field", name: "atendeOnline", static: false, private: false, access: { has: function (obj) { return "atendeOnline" in obj; }, get: function (obj) { return obj.atendeOnline; }, set: function (obj, value) { obj.atendeOnline = value; } } }, _atendeOnline_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _atendeDomicilio_decorators, { kind: "field", name: "atendeDomicilio", static: false, private: false, access: { has: function (obj) { return "atendeDomicilio" in obj; }, get: function (obj) { return obj.atendeDomicilio; }, set: function (obj, value) { obj.atendeDomicilio = value; } } }, _atendeDomicilio_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _lgpdConsent_decorators, { kind: "field", name: "lgpdConsent", static: false, private: false, access: { has: function (obj) { return "lgpdConsent" in obj; }, get: function (obj) { return obj.lgpdConsent; }, set: function (obj, value) { obj.lgpdConsent = value; } } }, _lgpdConsent_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
}();
var CadastroPacienteDto = exports.CadastroPacienteDto = function () {
    var _a;
    var _instanceExtraInitializers_2 = [];
    var _nomeCompleto_decorators;
    var _nomeCompleto_initializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _senha_decorators;
    var _senha_initializers = [];
    var _dataNascimento_decorators;
    var _dataNascimento_initializers = [];
    var _telefone_decorators;
    var _telefone_initializers = [];
    var _estado_decorators;
    var _estado_initializers = [];
    var _cidade_decorators;
    var _cidade_initializers = [];
    var _lgpdConsent_decorators;
    var _lgpdConsent_initializers = [];
    return _a = /** @class */ (function () {
            function CadastroPacienteDto() {
                this.nomeCompleto = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _nomeCompleto_initializers, void 0));
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.senha = __runInitializers(this, _senha_initializers, void 0);
                this.dataNascimento = __runInitializers(this, _dataNascimento_initializers, void 0);
                this.telefone = __runInitializers(this, _telefone_initializers, void 0);
                this.estado = __runInitializers(this, _estado_initializers, void 0);
                this.cidade = __runInitializers(this, _cidade_initializers, void 0);
                this.lgpdConsent = __runInitializers(this, _lgpdConsent_initializers, void 0);
            }
            return CadastroPacienteDto;
        }()),
        (function () {
            _nomeCompleto_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            _senha_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            _dataNascimento_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _telefone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _estado_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _cidade_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _lgpdConsent_decorators = [(0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _nomeCompleto_decorators, { kind: "field", name: "nomeCompleto", static: false, private: false, access: { has: function (obj) { return "nomeCompleto" in obj; }, get: function (obj) { return obj.nomeCompleto; }, set: function (obj, value) { obj.nomeCompleto = value; } } }, _nomeCompleto_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _senha_decorators, { kind: "field", name: "senha", static: false, private: false, access: { has: function (obj) { return "senha" in obj; }, get: function (obj) { return obj.senha; }, set: function (obj, value) { obj.senha = value; } } }, _senha_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _dataNascimento_decorators, { kind: "field", name: "dataNascimento", static: false, private: false, access: { has: function (obj) { return "dataNascimento" in obj; }, get: function (obj) { return obj.dataNascimento; }, set: function (obj, value) { obj.dataNascimento = value; } } }, _dataNascimento_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _telefone_decorators, { kind: "field", name: "telefone", static: false, private: false, access: { has: function (obj) { return "telefone" in obj; }, get: function (obj) { return obj.telefone; }, set: function (obj, value) { obj.telefone = value; } } }, _telefone_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _estado_decorators, { kind: "field", name: "estado", static: false, private: false, access: { has: function (obj) { return "estado" in obj; }, get: function (obj) { return obj.estado; }, set: function (obj, value) { obj.estado = value; } } }, _estado_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _cidade_decorators, { kind: "field", name: "cidade", static: false, private: false, access: { has: function (obj) { return "cidade" in obj; }, get: function (obj) { return obj.cidade; }, set: function (obj, value) { obj.cidade = value; } } }, _cidade_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _lgpdConsent_decorators, { kind: "field", name: "lgpdConsent", static: false, private: false, access: { has: function (obj) { return "lgpdConsent" in obj; }, get: function (obj) { return obj.lgpdConsent; }, set: function (obj, value) { obj.lgpdConsent = value; } } }, _lgpdConsent_initializers, _instanceExtraInitializers_2);
        })(),
        _a;
}();
var RefreshTokenDto = exports.RefreshTokenDto = function () {
    var _a;
    var _instanceExtraInitializers_3 = [];
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    return _a = /** @class */ (function () {
            function RefreshTokenDto() {
                this.refreshToken = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _refreshToken_initializers, void 0));
            }
            return RefreshTokenDto;
        }()),
        (function () {
            _refreshToken_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } } }, _refreshToken_initializers, _instanceExtraInitializers_3);
        })(),
        _a;
}();
var VerifyEmailDto = exports.VerifyEmailDto = function () {
    var _a;
    var _instanceExtraInitializers_4 = [];
    var _token_decorators;
    var _token_initializers = [];
    return _a = /** @class */ (function () {
            function VerifyEmailDto() {
                this.token = (__runInitializers(this, _instanceExtraInitializers_4), __runInitializers(this, _token_initializers, void 0));
            }
            return VerifyEmailDto;
        }()),
        (function () {
            _token_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } } }, _token_initializers, _instanceExtraInitializers_4);
        })(),
        _a;
}();
var SetupTotpDto = exports.SetupTotpDto = function () {
    var _a;
    var _instanceExtraInitializers_5 = [];
    var _token_decorators;
    var _token_initializers = [];
    return _a = /** @class */ (function () {
            function SetupTotpDto() {
                this.token = (__runInitializers(this, _instanceExtraInitializers_5), __runInitializers(this, _token_initializers, void 0));
            }
            return SetupTotpDto;
        }()),
        (function () {
            _token_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } } }, _token_initializers, _instanceExtraInitializers_5);
        })(),
        _a;
}();
var ChangePasswordDto = exports.ChangePasswordDto = function () {
    var _a;
    var _instanceExtraInitializers_6 = [];
    var _senhaAtual_decorators;
    var _senhaAtual_initializers = [];
    var _senhaNova_decorators;
    var _senhaNova_initializers = [];
    return _a = /** @class */ (function () {
            function ChangePasswordDto() {
                this.senhaAtual = (__runInitializers(this, _instanceExtraInitializers_6), __runInitializers(this, _senhaAtual_initializers, void 0));
                this.senhaNova = __runInitializers(this, _senhaNova_initializers, void 0);
            }
            return ChangePasswordDto;
        }()),
        (function () {
            _senhaAtual_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            _senhaNova_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            __esDecorate(null, null, _senhaAtual_decorators, { kind: "field", name: "senhaAtual", static: false, private: false, access: { has: function (obj) { return "senhaAtual" in obj; }, get: function (obj) { return obj.senhaAtual; }, set: function (obj, value) { obj.senhaAtual = value; } } }, _senhaAtual_initializers, _instanceExtraInitializers_6);
            __esDecorate(null, null, _senhaNova_decorators, { kind: "field", name: "senhaNova", static: false, private: false, access: { has: function (obj) { return "senhaNova" in obj; }, get: function (obj) { return obj.senhaNova; }, set: function (obj, value) { obj.senhaNova = value; } } }, _senhaNova_initializers, _instanceExtraInitializers_6);
        })(),
        _a;
}();
var ForgotPasswordDto = exports.ForgotPasswordDto = function () {
    var _a;
    var _instanceExtraInitializers_7 = [];
    var _email_decorators;
    var _email_initializers = [];
    return _a = /** @class */ (function () {
            function ForgotPasswordDto() {
                this.email = (__runInitializers(this, _instanceExtraInitializers_7), __runInitializers(this, _email_initializers, void 0));
            }
            return ForgotPasswordDto;
        }()),
        (function () {
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers_7);
        })(),
        _a;
}();
var ResetPasswordDto = exports.ResetPasswordDto = function () {
    var _a;
    var _instanceExtraInitializers_8 = [];
    var _token_decorators;
    var _token_initializers = [];
    var _novaSenha_decorators;
    var _novaSenha_initializers = [];
    return _a = /** @class */ (function () {
            function ResetPasswordDto() {
                this.token = (__runInitializers(this, _instanceExtraInitializers_8), __runInitializers(this, _token_initializers, void 0));
                this.novaSenha = __runInitializers(this, _novaSenha_initializers, void 0);
            }
            return ResetPasswordDto;
        }()),
        (function () {
            _token_decorators = [(0, class_validator_1.IsString)()];
            _novaSenha_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } } }, _token_initializers, _instanceExtraInitializers_8);
            __esDecorate(null, null, _novaSenha_decorators, { kind: "field", name: "novaSenha", static: false, private: false, access: { has: function (obj) { return "novaSenha" in obj; }, get: function (obj) { return obj.novaSenha; }, set: function (obj, value) { obj.novaSenha = value; } } }, _novaSenha_initializers, _instanceExtraInitializers_8);
        })(),
        _a;
}();
