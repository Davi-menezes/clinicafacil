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
exports.UploadFileDto = exports.AddPlanoSaudeDto = exports.AddEspecialidadeDto = exports.UpdateProfissionalDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateProfissionalDto = exports.UpdateProfissionalDto = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _descricao_decorators;
    var _descricao_initializers = [];
    var _preco_decorators;
    var _preco_initializers = [];
    var _precoMin_decorators;
    var _precoMin_initializers = [];
    var _precoMax_decorators;
    var _precoMax_initializers = [];
    var _tempConsultaMinutos_decorators;
    var _tempConsultaMinutos_initializers = [];
    var _bufferMinutos_decorators;
    var _bufferMinutos_initializers = [];
    var _atendeOnline_decorators;
    var _atendeOnline_initializers = [];
    var _atendeDomicilio_decorators;
    var _atendeDomicilio_initializers = [];
    var _bairro_decorators;
    var _bairro_initializers = [];
    var _enderecoCompleto_decorators;
    var _enderecoCompleto_initializers = [];
    var _telefone_decorators;
    var _telefone_initializers = [];
    var _formacaoAcademica_decorators;
    var _formacaoAcademica_initializers = [];
    var _certificacoes_decorators;
    var _certificacoes_initializers = [];
    var _idiomasAtendimento_decorators;
    var _idiomasAtendimento_initializers = [];
    var _sitePessoal_decorators;
    var _sitePessoal_initializers = [];
    var _linkedin_decorators;
    var _linkedin_initializers = [];
    var _cbo_decorators;
    var _cbo_initializers = [];
    var _maxAgendamentosDia_decorators;
    var _maxAgendamentosDia_initializers = [];
    var _antecedenciaMinHoras_decorators;
    var _antecedenciaMinHoras_initializers = [];
    var _janelaAgendamentoDias_decorators;
    var _janelaAgendamentoDias_initializers = [];
    var _anosExperiencia_decorators;
    var _anosExperiencia_initializers = [];
    return _a = /** @class */ (function () {
            function UpdateProfissionalDto() {
                this.descricao = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _descricao_initializers, void 0));
                this.preco = __runInitializers(this, _preco_initializers, void 0);
                this.precoMin = __runInitializers(this, _precoMin_initializers, void 0);
                this.precoMax = __runInitializers(this, _precoMax_initializers, void 0);
                this.tempConsultaMinutos = __runInitializers(this, _tempConsultaMinutos_initializers, void 0);
                this.bufferMinutos = __runInitializers(this, _bufferMinutos_initializers, void 0);
                this.atendeOnline = __runInitializers(this, _atendeOnline_initializers, void 0);
                this.atendeDomicilio = __runInitializers(this, _atendeDomicilio_initializers, void 0);
                this.bairro = __runInitializers(this, _bairro_initializers, void 0);
                this.enderecoCompleto = __runInitializers(this, _enderecoCompleto_initializers, void 0);
                this.telefone = __runInitializers(this, _telefone_initializers, void 0);
                this.formacaoAcademica = __runInitializers(this, _formacaoAcademica_initializers, void 0);
                this.certificacoes = __runInitializers(this, _certificacoes_initializers, void 0);
                this.idiomasAtendimento = __runInitializers(this, _idiomasAtendimento_initializers, void 0);
                this.sitePessoal = __runInitializers(this, _sitePessoal_initializers, void 0);
                this.linkedin = __runInitializers(this, _linkedin_initializers, void 0);
                this.cbo = __runInitializers(this, _cbo_initializers, void 0);
                this.maxAgendamentosDia = __runInitializers(this, _maxAgendamentosDia_initializers, void 0);
                this.antecedenciaMinHoras = __runInitializers(this, _antecedenciaMinHoras_initializers, void 0);
                this.janelaAgendamentoDias = __runInitializers(this, _janelaAgendamentoDias_initializers, void 0);
                this.anosExperiencia = __runInitializers(this, _anosExperiencia_initializers, void 0);
            }
            return UpdateProfissionalDto;
        }()),
        (function () {
            _descricao_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1500)];
            _preco_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _precoMin_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _precoMax_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _tempConsultaMinutos_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _bufferMinutos_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _atendeOnline_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _atendeDomicilio_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _bairro_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _enderecoCompleto_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _telefone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _formacaoAcademica_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _certificacoes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _idiomasAtendimento_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _sitePessoal_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _linkedin_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _cbo_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _maxAgendamentosDia_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _antecedenciaMinHoras_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _janelaAgendamentoDias_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _anosExperiencia_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _descricao_decorators, { kind: "field", name: "descricao", static: false, private: false, access: { has: function (obj) { return "descricao" in obj; }, get: function (obj) { return obj.descricao; }, set: function (obj, value) { obj.descricao = value; } } }, _descricao_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _preco_decorators, { kind: "field", name: "preco", static: false, private: false, access: { has: function (obj) { return "preco" in obj; }, get: function (obj) { return obj.preco; }, set: function (obj, value) { obj.preco = value; } } }, _preco_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _precoMin_decorators, { kind: "field", name: "precoMin", static: false, private: false, access: { has: function (obj) { return "precoMin" in obj; }, get: function (obj) { return obj.precoMin; }, set: function (obj, value) { obj.precoMin = value; } } }, _precoMin_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _precoMax_decorators, { kind: "field", name: "precoMax", static: false, private: false, access: { has: function (obj) { return "precoMax" in obj; }, get: function (obj) { return obj.precoMax; }, set: function (obj, value) { obj.precoMax = value; } } }, _precoMax_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _tempConsultaMinutos_decorators, { kind: "field", name: "tempConsultaMinutos", static: false, private: false, access: { has: function (obj) { return "tempConsultaMinutos" in obj; }, get: function (obj) { return obj.tempConsultaMinutos; }, set: function (obj, value) { obj.tempConsultaMinutos = value; } } }, _tempConsultaMinutos_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _bufferMinutos_decorators, { kind: "field", name: "bufferMinutos", static: false, private: false, access: { has: function (obj) { return "bufferMinutos" in obj; }, get: function (obj) { return obj.bufferMinutos; }, set: function (obj, value) { obj.bufferMinutos = value; } } }, _bufferMinutos_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _atendeOnline_decorators, { kind: "field", name: "atendeOnline", static: false, private: false, access: { has: function (obj) { return "atendeOnline" in obj; }, get: function (obj) { return obj.atendeOnline; }, set: function (obj, value) { obj.atendeOnline = value; } } }, _atendeOnline_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _atendeDomicilio_decorators, { kind: "field", name: "atendeDomicilio", static: false, private: false, access: { has: function (obj) { return "atendeDomicilio" in obj; }, get: function (obj) { return obj.atendeDomicilio; }, set: function (obj, value) { obj.atendeDomicilio = value; } } }, _atendeDomicilio_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _bairro_decorators, { kind: "field", name: "bairro", static: false, private: false, access: { has: function (obj) { return "bairro" in obj; }, get: function (obj) { return obj.bairro; }, set: function (obj, value) { obj.bairro = value; } } }, _bairro_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _enderecoCompleto_decorators, { kind: "field", name: "enderecoCompleto", static: false, private: false, access: { has: function (obj) { return "enderecoCompleto" in obj; }, get: function (obj) { return obj.enderecoCompleto; }, set: function (obj, value) { obj.enderecoCompleto = value; } } }, _enderecoCompleto_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _telefone_decorators, { kind: "field", name: "telefone", static: false, private: false, access: { has: function (obj) { return "telefone" in obj; }, get: function (obj) { return obj.telefone; }, set: function (obj, value) { obj.telefone = value; } } }, _telefone_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _formacaoAcademica_decorators, { kind: "field", name: "formacaoAcademica", static: false, private: false, access: { has: function (obj) { return "formacaoAcademica" in obj; }, get: function (obj) { return obj.formacaoAcademica; }, set: function (obj, value) { obj.formacaoAcademica = value; } } }, _formacaoAcademica_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _certificacoes_decorators, { kind: "field", name: "certificacoes", static: false, private: false, access: { has: function (obj) { return "certificacoes" in obj; }, get: function (obj) { return obj.certificacoes; }, set: function (obj, value) { obj.certificacoes = value; } } }, _certificacoes_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _idiomasAtendimento_decorators, { kind: "field", name: "idiomasAtendimento", static: false, private: false, access: { has: function (obj) { return "idiomasAtendimento" in obj; }, get: function (obj) { return obj.idiomasAtendimento; }, set: function (obj, value) { obj.idiomasAtendimento = value; } } }, _idiomasAtendimento_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _sitePessoal_decorators, { kind: "field", name: "sitePessoal", static: false, private: false, access: { has: function (obj) { return "sitePessoal" in obj; }, get: function (obj) { return obj.sitePessoal; }, set: function (obj, value) { obj.sitePessoal = value; } } }, _sitePessoal_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _linkedin_decorators, { kind: "field", name: "linkedin", static: false, private: false, access: { has: function (obj) { return "linkedin" in obj; }, get: function (obj) { return obj.linkedin; }, set: function (obj, value) { obj.linkedin = value; } } }, _linkedin_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _cbo_decorators, { kind: "field", name: "cbo", static: false, private: false, access: { has: function (obj) { return "cbo" in obj; }, get: function (obj) { return obj.cbo; }, set: function (obj, value) { obj.cbo = value; } } }, _cbo_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _maxAgendamentosDia_decorators, { kind: "field", name: "maxAgendamentosDia", static: false, private: false, access: { has: function (obj) { return "maxAgendamentosDia" in obj; }, get: function (obj) { return obj.maxAgendamentosDia; }, set: function (obj, value) { obj.maxAgendamentosDia = value; } } }, _maxAgendamentosDia_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _antecedenciaMinHoras_decorators, { kind: "field", name: "antecedenciaMinHoras", static: false, private: false, access: { has: function (obj) { return "antecedenciaMinHoras" in obj; }, get: function (obj) { return obj.antecedenciaMinHoras; }, set: function (obj, value) { obj.antecedenciaMinHoras = value; } } }, _antecedenciaMinHoras_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _janelaAgendamentoDias_decorators, { kind: "field", name: "janelaAgendamentoDias", static: false, private: false, access: { has: function (obj) { return "janelaAgendamentoDias" in obj; }, get: function (obj) { return obj.janelaAgendamentoDias; }, set: function (obj, value) { obj.janelaAgendamentoDias = value; } } }, _janelaAgendamentoDias_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _anosExperiencia_decorators, { kind: "field", name: "anosExperiencia", static: false, private: false, access: { has: function (obj) { return "anosExperiencia" in obj; }, get: function (obj) { return obj.anosExperiencia; }, set: function (obj, value) { obj.anosExperiencia = value; } } }, _anosExperiencia_initializers, _instanceExtraInitializers);
        })(),
        _a;
}();
var AddEspecialidadeDto = exports.AddEspecialidadeDto = function () {
    var _a;
    var _instanceExtraInitializers_1 = [];
    var _especialidade_decorators;
    var _especialidade_initializers = [];
    return _a = /** @class */ (function () {
            function AddEspecialidadeDto() {
                this.especialidade = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _especialidade_initializers, void 0));
            }
            return AddEspecialidadeDto;
        }()),
        (function () {
            _especialidade_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _especialidade_decorators, { kind: "field", name: "especialidade", static: false, private: false, access: { has: function (obj) { return "especialidade" in obj; }, get: function (obj) { return obj.especialidade; }, set: function (obj, value) { obj.especialidade = value; } } }, _especialidade_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
}();
var AddPlanoSaudeDto = exports.AddPlanoSaudeDto = function () {
    var _a;
    var _instanceExtraInitializers_2 = [];
    var _planoSaude_decorators;
    var _planoSaude_initializers = [];
    return _a = /** @class */ (function () {
            function AddPlanoSaudeDto() {
                this.planoSaude = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _planoSaude_initializers, void 0));
            }
            return AddPlanoSaudeDto;
        }()),
        (function () {
            _planoSaude_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _planoSaude_decorators, { kind: "field", name: "planoSaude", static: false, private: false, access: { has: function (obj) { return "planoSaude" in obj; }, get: function (obj) { return obj.planoSaude; }, set: function (obj, value) { obj.planoSaude = value; } } }, _planoSaude_initializers, _instanceExtraInitializers_2);
        })(),
        _a;
}();
var UploadFileDto = exports.UploadFileDto = function () {
    var _a;
    var _instanceExtraInitializers_3 = [];
    var _fieldname_decorators;
    var _fieldname_initializers = [];
    return _a = /** @class */ (function () {
            function UploadFileDto() {
                this.fieldname = (__runInitializers(this, _instanceExtraInitializers_3), __runInitializers(this, _fieldname_initializers, void 0));
            }
            return UploadFileDto;
        }()),
        (function () {
            _fieldname_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _fieldname_decorators, { kind: "field", name: "fieldname", static: false, private: false, access: { has: function (obj) { return "fieldname" in obj; }, get: function (obj) { return obj.fieldname; }, set: function (obj, value) { obj.fieldname = value; } } }, _fieldname_initializers, _instanceExtraInitializers_3);
        })(),
        _a;
}();
