(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('moment'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('lru_map'), require('url'), require('@angular/core'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-fhir', ['exports', 'moment', '@angular/common/http', 'rxjs', 'rxjs/operators', 'lru_map', 'url', '@angular/core', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common'], factory) :
    (factory((global['angular-fhir'] = {}),global.moment,global.ng.common.http,global.rxjs,global.rxjs.operators,global.lru_map,global.url,global.ng.core,global.ng.cdk.overlay,global.ng.cdk.portal,global.ng.common));
}(this, (function (exports,moment,http,rxjs,operators,lru_map,url,core,overlay,portal,common) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AgePipe = /** @class */ (function () {
        function AgePipe() {
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        AgePipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                if (!value || !moment(value).isValid()) {
                    return void 0;
                }
                return moment().diff(value, 'years');
            };
        AgePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'ageInYears'
                    },] }
        ];
        return AgePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FhirCodingPipe = /** @class */ (function () {
        function FhirCodingPipe() {
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        FhirCodingPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                if (value && value.code && value.code.coding && value.code.coding.length > 0) {
                    return value.code.coding[0].display;
                }
                return '';
            };
        FhirCodingPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fhirCoding'
                    },] }
        ];
        return FhirCodingPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} item
     * @return {?}
     */
    function toValueString(item) {
        // A hack for pluralising some unit names
        /** @type {?} */
        var formatUnit = ( /**
         * @param {?} unit
         * @param {?} value
         * @return {?}
         */function (unit, value) {
            if (value !== 1) {
                if (unit === 'serving') {
                    return unit + "s";
                }
            }
            return unit;
        });
        return item.valueString ? item.valueString :
            item.valueReference ? item.valueReference :
                item.valueCoding ? item.valueCoding :
                    item.valueUri ? item.valueUri :
                        item.valueBoolean ? item.valueBoolean :
                            item.valueAddress ? item.valueAddress :
                                item.valueAge ? item.valueAge :
                                    item.valueAnnotation ? item.valueAnnotation :
                                        item.valueAttachment ? item.valueAttachment :
                                            item.valueBase64Binary ? item.valueBase64Binary :
                                                item.valueCode ? item.valueCode :
                                                    item.valueCodeableConcept ? item.valueCodeableConcept :
                                                        item.valueContactPoint ? item.valueContactPoint :
                                                            item.valueCount ? item.valueCount :
                                                                item.valueDate ? item.valueDate :
                                                                    item.valueDecimal ? item.valueDecimal :
                                                                        item.valueDuration ? item.valueDuration :
                                                                            item.valueHumanName ? item.valueHumanName :
                                                                                item.valueId ? item.valueId :
                                                                                    item.valueDateTime ? item.valueDateTime :
                                                                                        item.valueDistance ? item.valueDistance :
                                                                                            item.valueInteger ? item.valueInteger :
                                                                                                // todo add additional value[x] types
                                                                                                item.valueQuantity ? item.valueQuantity.value + " " + formatUnit(item.valueQuantity.unit, item.valueQuantity.value) : '';
    }
    // tslint:disable-next-line:max-line-length
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function formatFhirName(value, args) {
        if (args === void 0) {
            args = { noTitle: false, capitaliseLastName: false, firstNameFirst: false };
        }
        if (value && value.length > 0) {
            /** @type {?} */
            var preferredName = value.reduce(( /**
             * @param {?} best
             * @param {?} name
             * @param {?} idx
             * @param {?} names
             * @return {?}
             */function (best, name, idx, names) {
                if (name.use === 'usual') {
                    return name;
                }
                else if (!best) {
                    return name;
                }
                else {
                    if (name.use === 'official') {
                        return name;
                    }
                }
                return best;
            }));
            if (preferredName.text) {
                return preferredName.text;
            }
            /** @type {?} */
            var family = (args.capitaliseLastName ? preferredName.family.toUpperCase() : preferredName.family) || '';
            /** @type {?} */
            var titles = (preferredName.prefix || []).length > 0 ? " (" + (preferredName.prefix || []).join(' ') + ")" : '';
            // tslint:disable-next-line:max-line-length
            return args.firstNameFirst ? (args.noTitle ? '' : titles) + " " + (preferredName.given || [])[0] + " " + family : family + ", " + (preferredName.given || [])[0] + (args.noTitle ? '' : titles);
        }
        else {
            return '<No Name>';
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FhirUsualNamePipe = /** @class */ (function () {
        function FhirUsualNamePipe() {
        }
        /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
        FhirUsualNamePipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} args
         * @return {?}
         */
            function (value, args) {
                return formatFhirName(value, args);
            };
        FhirUsualNamePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fhirUsualName'
                    },] }
        ];
        return FhirUsualNamePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ObservationValuePipe = /** @class */ (function () {
        function ObservationValuePipe() {
        }
        /**
         * @param {?} observation
         * @param {?=} args
         * @return {?}
         */
        ObservationValuePipe.prototype.transform = /**
         * @param {?} observation
         * @param {?=} args
         * @return {?}
         */
            function (observation, args) {
                /** @type {?} */
                var multi = (observation.component || []).length > 1;
                return (observation.component || [])
                    .map(( /**
             * @param {?} component
             * @return {?}
             */function (component) {
                    return "" + (multi ? new FhirCodingPipe().transform(component) + ':' : '') + toValueString(component);
                })).join(', ');
            };
        ObservationValuePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'observationValue'
                    },] }
        ];
        /** @nocollapse */
        ObservationValuePipe.ctorParameters = function () { return []; };
        return ObservationValuePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RegionalConfigService = /** @class */ (function () {
        function RegionalConfigService() {
        }
        /**
         * @param {?} region
         * @return {?}
         */
        RegionalConfigService.prototype.load = /**
         * @param {?} region
         * @return {?}
         */
            function (region) {
                return __awaiter(this, void 0, void 0, function () {
                    var configResponse, config;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // assert that region is one of ['au', 'de', 'us']
                                return [4 /*yield*/, fetch("./assets/environment-" + region + ".json")];
                            case 1:
                                configResponse = _a.sent();
                                return [4 /*yield*/, configResponse.json()];
                            case 2:
                                config = _a.sent();
                                Object.keys(config).forEach(( /**
                                 * @param {?} key
                                 * @return {?}
                                 */function (key) {
                                    Object.defineProperty(_this, key, {
                                        get: ( /**
                                         * @return {?}
                                         */function () { return config[key]; })
                                    });
                                }));
                                return [2 /*return*/, config];
                        }
                    });
                });
            };
        /**
         * @param {?} key
         * @return {?}
         */
        RegionalConfigService.prototype.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this[key];
            };
        RegionalConfigService.decorators = [
            { type: core.Injectable }
        ];
        return RegionalConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FhirService = /** @class */ (function () {
        function FhirService(http$$1, config) {
            this.http = http$$1;
            this.config = config;
            // set by auth guard. Fixme cleaner separation would be nice
            this.base = this.config.get('fhir');
            this.tenancy = 'baseDstu3';
            this.refCache = new lru_map.LRUMap(100);
        }
        /**
         * @param {?} concept
         * @param {?} codes
         * @return {?}
         */
        FhirService.hasCoding = /**
         * @param {?} concept
         * @param {?} codes
         * @return {?}
         */
            function (concept, codes) {
                var e_1, _a;
                if (concept && concept.coding && codes) {
                    var _loop_1 = function (code) {
                        if (code.code && codes.find(( /**
                         * @param {?} ia
                         * @return {?}
                         */function (ia) { return ia.system === code.system && ia.code === code.code; })) != null) {
                            return { value: true };
                        }
                    };
                    try {
                        for (var _b = __values(concept.coding), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var code = _c.value;
                            var state_1 = _loop_1(code);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                return false;
            };
        /**
         * @param {?} reference
         * @return {?}
         */
        FhirService.referenceToId = /**
         * @param {?} reference
         * @return {?}
         */
            function (reference) {
                var _a = __read((reference || { reference: '' }).reference.split('/'), 2), resourceType = _a[0], id = _a[1];
                return {
                    resourceType: resourceType,
                    id: id
                };
            };
        /**
         * @template T
         * @param {?} extension
         * @return {?}
         */
        FhirService.flattenExtension = /**
         * @template T
         * @param {?} extension
         * @return {?}
         */
            function (extension) {
                /** @type {?} */
                var obj = {};
                if (extension.extension) {
                    extension.extension.forEach(( /**
                     * @param {?} ext
                     * @return {?}
                     */function (ext) {
                        obj[ext.url] = FhirService.flattenExtension(ext);
                    }));
                }
                else {
                    return extension.valueString ? extension.valueString :
                        extension.valueReference ? extension.valueReference :
                            extension.valueCoding ? extension.valueCoding :
                                extension.valueUri ? extension.valueUri :
                                    extension.valueBoolean ? extension.valueBoolean :
                                        extension.valueAddress ? extension.valueAddress :
                                            extension.valueAge ? extension.valueAge :
                                                extension.valueAnnotation ? extension.valueAnnotation :
                                                    extension.valueAttachment ? extension.valueAttachment :
                                                        extension.valueBase64Binary ? extension.valueBase64Binary :
                                                            extension.valueCode ? extension.valueCode :
                                                                extension.valueCodeableConcept ? extension.valueCodeableConcept :
                                                                    extension.valueContactPoint ? extension.valueContactPoint :
                                                                        extension.valueCount ? extension.valueCount :
                                                                            extension.valueDate ? extension.valueDate :
                                                                                extension.valueDecimal ? extension.valueDecimal :
                                                                                    extension.valueDuration ? extension.valueDuration :
                                                                                        extension.valueHumanName ? extension.valueHumanName :
                                                                                            extension.valueId ? extension.valueId :
                                                                                                extension.valueDateTime ? extension.valueDateTime :
                                                                                                    extension.valueDistance ? extension.valueDistance :
                                                                                                        extension.valueInteger ? extension.valueInteger :
                                                                                                            // todo add additional value[x] types
                                                                                                            null;
                }
                return obj;
            };
        /**
         * @param {?=} tenancyOverride
         * @return {?}
         */
        FhirService.prototype.getUrl = /**
         * @param {?=} tenancyOverride
         * @return {?}
         */
            function (tenancyOverride) {
                return this.base + "/" + (tenancyOverride ? tenancyOverride : this.tenancy);
            };
        /**
         * @param {?} newUrl
         * @return {?}
         */
        FhirService.prototype.setUrl = /**
         * @param {?} newUrl
         * @return {?}
         */
            function (newUrl) {
                this.base = newUrl;
            };
        /**
         * @return {?}
         */
        FhirService.prototype.options = /**
         * @return {?}
         */
            function () {
                return new http.HttpHeaders({ Accept: 'application/json' });
            };
        /**
         * @template T
         * @param {?} response
         * @return {?}
         */
        FhirService.prototype.nextPage = /**
         * @template T
         * @param {?} response
         * @return {?}
         */
            function (response) {
                if (response) {
                    /** @type {?} */
                    var nextLink = (response.link || []).find(( /**
                     * @param {?} l
                     * @return {?}
                     */function (l) { return l.relation === 'next'; }));
                    if (nextLink) {
                        return this.http.get(nextLink.url);
                    }
                }
                return rxjs.throwError(new Error('No next link to follow'));
            };
        /**
         * @template T
         * @param {?} ref
         * @param {?} context
         * @return {?}
         */
        FhirService.prototype.reference = /**
         * @template T
         * @param {?} ref
         * @param {?} context
         * @return {?}
         */
            function (ref, context) {
                if (ref && ref.reference) {
                    /** @type {?} */
                    var absoluteUri = this.referenceToAbsoluteUrl(ref, context);
                    /** @type {?} */
                    var ref$ = this.refCache.get(absoluteUri);
                    // TODO handle contained resource references
                    if (absoluteUri.startsWith('#')) {
                        return rxjs.throwError(new Error("Don't yet support contained references"));
                    }
                    else {
                        if (!ref$) {
                            ref$ = new rxjs.ReplaySubject(1);
                            this.http.get(absoluteUri)
                                .subscribe(ref$);
                            this.refCache.set(absoluteUri, ref$);
                        }
                        return ref$;
                    }
                }
                else {
                    return rxjs.throwError(new Error('Invalid reference'));
                }
            };
        /**
         * @template T
         * @param {?} resourceType
         * @param {?} id
         * @param {?=} tenancy
         * @return {?}
         */
        FhirService.prototype.get = /**
         * @template T
         * @param {?} resourceType
         * @param {?} id
         * @param {?=} tenancy
         * @return {?}
         */
            function (resourceType, id, tenancy) {
                if (id === 'new') {
                    return rxjs.of(null);
                }
                else {
                    return this.http.get(this.getUrl(tenancy) + "/" + resourceType + "/" + id);
                }
            };
        /**
         * @template T
         * @param {?} resourceType
         * @param {?} params
         * @param {?=} options
         * @return {?}
         */
        FhirService.prototype.search = /**
         * @template T
         * @param {?} resourceType
         * @param {?} params
         * @param {?=} options
         * @return {?}
         */
            function (resourceType, params, options) {
                /** @type {?} */
                var requestOptions = { params: params };
                if (options && options.headers) {
                    requestOptions.headers = options.headers;
                }
                return this.http.get(this.getUrl((options || {}).tenancy) + "/" + resourceType, requestOptions);
            };
        /**
         * @param {?} resourceUrl
         * @param {?} cmd
         * @param {?=} options
         * @return {?}
         */
        FhirService.prototype.patch = /**
         * @param {?} resourceUrl
         * @param {?} cmd
         * @param {?=} options
         * @return {?}
         */
            function (resourceUrl, cmd, options) {
                /** @type {?} */
                var requestOptions = {
                    headers: {
                        'content-type': 'application/json-patch+json'
                    }
                };
                if (options && options.headers) {
                    Object.assign(requestOptions.headers, options.headers);
                }
                return this.http.patch(resourceUrl, cmd, requestOptions);
            };
        /**
         * @param {?} resourceType
         * @param {?} id
         * @param {?=} options
         * @return {?}
         */
        FhirService.prototype.delete = /**
         * @param {?} resourceType
         * @param {?} id
         * @param {?=} options
         * @return {?}
         */
            function (resourceType, id, options) {
                /** @type {?} */
                var requestOptions = {};
                if (options && options.headers) {
                    requestOptions.headers = options.headers;
                }
                return this.http.delete(this.getUrl((options || {}).tenancy) + "/" + resourceType + "/" + id, requestOptions);
            };
        /**
         * @template T
         * @param {?} bundle
         * @param {?=} options
         * @return {?}
         */
        FhirService.prototype.save = /**
         * @template T
         * @param {?} bundle
         * @param {?=} options
         * @return {?}
         */
            function (bundle, options) {
                if (bundle.resourceType === 'Bundle') {
                    return this.http.post("" + this.getUrl((options || {}).tenancy), bundle, {
                        headers: {
                            'content-type': 'application/fhir+json',
                            Prefer: 'return=representation'
                        }
                    }).pipe(operators.tap(( /**
                     * @param {?} bundleResponse
                     * @return {?}
                     */function (bundleResponse) {
                        ((( /** @type {?} */(bundleResponse))).entry || []).forEach(( /**
                         * @param {?} v
                         * @param {?} k
                         * @return {?}
                         */function (v, k) {
                            if ((( /** @type {?} */(bundle))).entry[k]) {
                                (( /** @type {?} */(bundle))).entry[k].resource.id = v.resource.id;
                            }
                        }));
                    })));
                }
                else {
                    return this.saveAll([bundle], options)
                        .pipe(operators.map(( /**
                 * @param {?} bundleResponse
                 * @return {?}
                 */function (bundleResponse) { return ( /** @type {?} */(bundleResponse.entry[0].resource)); })));
                }
            };
        /**
         * @param {?} resources
         * @param {?=} options
         * @return {?}
         */
        FhirService.prototype.saveAll = /**
         * @param {?} resources
         * @param {?=} options
         * @return {?}
         */
            function (resources, options) {
                /** @type {?} */
                var bundleEntries = resources.map(( /**
                 * @param {?} p
                 * @return {?}
                 */function (p) {
                    return {
                        request: {
                            method: p.id ? 'PUT' : 'POST',
                            // tslint:disable-next-line:no-string-literal
                            url: p.id ? p.resourceType + "/" + p.id : (p['identifier'] || [])[0] ? "urn:uuid:" + p['identifier'][0].value : p.resourceType
                        },
                        resource: p
                    };
                }));
                return this.save({
                    resourceType: 'Bundle',
                    type: 'transaction',
                    entry: bundleEntries
                }, options);
            };
        /**
         * @template T
         * @param {?} references
         * @param {?} context
         * @param {?=} count
         * @return {?}
         */
        FhirService.prototype.resolveReferences = /**
         * @template T
         * @param {?} references
         * @param {?} context
         * @param {?=} count
         * @return {?}
         */
            function (references, context, count) {
                var _this = this;
                if (count === void 0) {
                    count = 500;
                }
                if (!references || !Array.isArray(references) || !references.length) {
                    return rxjs.of(( /** @type {?} */({})));
                }
                var resourceType = FhirService.referenceToId(references[0]).resourceType;
                /** @type {?} */
                var ids = references.map(( /**
                 * @param {?} ref
                 * @return {?}
                 */function (ref) { return FhirService.referenceToId(ref).id; }));
                return this.http.post(this.getContextBaseUrl(context) + "/" + resourceType + "/_search", "_id=" + ids.join(',') + "&_count=" + count, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .pipe(operators.expand(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                    /** @type {?} */
                    var foundNext = (res.link.find(( /**
                     * @param {?} l
                     * @return {?}
                     */function (l) { return l.relation === 'next'; })) || ( /** @type {?} */({}))).url;
                    if (foundNext) {
                        return _this.http.get(url.format(url.parse(foundNext, true)));
                    }
                    return rxjs.of();
                })), operators.reduce(( /**
                 * @param {?} acc
                 * @param {?} value
                 * @return {?}
                 */function (acc, value) {
                    if (acc.entry && value.entry) {
                        acc.entry = acc.entry.concat(value.entry);
                    }
                    return acc;
                })));
            };
        /**
         * @param {?} ref
         * @param {?} context
         * @return {?}
         */
        FhirService.prototype.referenceToAbsoluteUrl = /**
         * @param {?} ref
         * @param {?} context
         * @return {?}
         */
            function (ref, context) {
                /** @type {?} */
                var refUrl = url.parse(ref.reference);
                if (refUrl.hash && !refUrl.protocol) { // don't touch contained resource references
                    return ref.reference;
                }
                /** @type {?} */
                var base = this.getContextBaseUrl(context);
                return url.resolve(base + "/", ref.reference);
            };
        /**
         * @param {?=} context
         * @return {?}
         */
        FhirService.prototype.getContextBaseUrl = /**
         * @param {?=} context
         * @return {?}
         */
            function (context) {
                /** @type {?} */
                var base = this.getUrl();
                if (context && context.meta && context.meta.security) {
                    /** @type {?} */
                    var tenancyTag = context.meta.security.find(( /**
                     * @param {?} sec
                     * @return {?}
                     */function (sec) { return sec.system === FhirService.IDENTIFIER_SYSTEMS.TENANCY_SECURITY_SYSTEM; }));
                    if (tenancyTag) {
                        base = this.getUrl(tenancyTag.display);
                    }
                }
                return base;
            };
        FhirService.EXTENSIONS = {
            TASK_ENABLE_WHEN: 'https://fhir-registry.cardihab.com/StructureDefiniton/TaskEnableWhen',
            EDUCATION_TASK: 'https://fhir-registry.cardihab.com/StructureDefiniton/EducationTask',
            ADHERENCE: 'https://fhir-registry.cardihab.com/StructureDefiniton/Adherence',
            RECURRING_TASK: 'https://fhir-registry.cardihab.com/StructureDefiniton/RecurringTask',
            BASED_ON_GOAL: 'https://fhir-registry.cardihab.com/StructureDefiniton/BasedOnGoal',
            PATIENT_SPECIFIC_REMINDER: 'https://fhir-registry.cardihab.com/StructureDefiniton/PatientSpecificReminder',
            ORGANIZATION_ATTRIBUTES: 'https://fhir-registry.cardihab.com/StructureDefiniton/OrganizationAttributes'
        };
        FhirService.IDENTIFIER_SYSTEMS = {
            SITECODE: 'urn:sitecode',
            FHIR_IDENTIFIER_TYPE: 'http://hl7.org/fhir/identifier-type',
            SNOMED: 'http://snomed.info/sct',
            GOAL_CATEGORY: 'http://hl7.org/fhir/goal-category',
            TENANCY_SECURITY_SYSTEM: 'Tenancy'
        };
        FhirService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FhirService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: RegionalConfigService }
            ];
        };
        return FhirService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONTAINER_DATA = new core.InjectionToken('CONTAINER_DATA');
    var LoaderComponent = /** @class */ (function () {
        function LoaderComponent(componentData) {
            this.componentData = componentData;
            this.message = this.componentData && this.componentData.message
                ? this.componentData.message : '';
        }
        LoaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lib-loader',
                        template: "<div>\n  <svg width=\"200px\" height=\"200px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\"\n    class=\"lds-heart\" style=\"background: none;\">\n    <g transform=\"translate(50 50)\">\n      <path d=\"M40.7-34.3c-9.8-9.8-25.6-9.8-35.4,0L0-29l-5.3-5.3c-9.8-9.8-25.6-9.8-35.4,0l0,0c-9.8,9.8-9.8,25.6,0,35.4l5.3,5.3L-23,18.7l23,23l23-23L35.4,6.3L40.7,1C50.4-8.8,50.4-24.6,40.7-34.3z\"\n        fill=\"#df1317\" transform=\"scale(0.721575 0.721575)\">\n        <animateTransform attributeName=\"transform\" type=\"scale\" calcMode=\"spline\" values=\"0.68;0.8;0.6000000000000001;0.7200000000000001;0.68;0.6400000000000001\"\n          keyTimes=\"0;0.05;0.39;0.45;0.6;1\" dur=\"1.5s\" keySplines=\"0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1\"\n          begin=\"0s\" repeatCount=\"indefinite\"></animateTransform>\n      </path>\n    </g>\n  </svg>\n  <h2 class=\"loading-message\" *ngIf=\"message\">{{ message }}</h2>\n</div>\n",
                        styles: [".loading-message{text-align:center;margin-top:20px;background:#dedede;border-radius:20px}"]
                    }] }
        ];
        /** @nocollapse */
        LoaderComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [CONTAINER_DATA,] }] }
            ];
        };
        return LoaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoaderService = /** @class */ (function () {
        function LoaderService(overlay$$1, injector) {
            this.overlay = overlay$$1;
            this.injector = injector;
            this.overlayConfig = new overlay.OverlayConfig();
            this.overlayConfig.positionStrategy = this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            this.overlayConfig.hasBackdrop = true;
        }
        /**
         * @param {?=} message
         * @return {?}
         */
        LoaderService.prototype.start = /**
         * @param {?=} message
         * @return {?}
         */
            function (message) {
                if (message === void 0) {
                    message = '';
                }
                this.overlayRef = this.overlay.create(this.overlayConfig);
                /** @type {?} */
                var containerPortal = new portal.ComponentPortal(LoaderComponent, null, this.createInjector({
                    message: message
                }));
                this.overlayRef.attach(containerPortal);
            };
        /**
         * @return {?}
         */
        LoaderService.prototype.stop = /**
         * @return {?}
         */
            function () {
                this.overlayRef.dispose();
            };
        /**
         * @private
         * @param {?} dataToPass
         * @return {?}
         */
        LoaderService.prototype.createInjector = /**
         * @private
         * @param {?} dataToPass
         * @return {?}
         */
            function (dataToPass) {
                /** @type {?} */
                var injectorTokens = new WeakMap();
                injectorTokens.set(CONTAINER_DATA, dataToPass);
                return new portal.PortalInjector(this.injector, injectorTokens);
            };
        LoaderService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LoaderService.ctorParameters = function () {
            return [
                { type: overlay.Overlay },
                { type: core.Injector }
            ];
        };
        return LoaderService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularFhirModule = /** @class */ (function () {
        function AngularFhirModule() {
        }
        AngularFhirModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            FhirCodingPipe,
                            FhirUsualNamePipe,
                            AgePipe,
                            ObservationValuePipe,
                            LoaderComponent
                        ],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [
                            FhirCodingPipe,
                            FhirUsualNamePipe,
                        ],
                        providers: [
                            FhirService,
                            RegionalConfigService,
                            LoaderService
                        ]
                    },] }
        ];
        return AngularFhirModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.AngularFhirModule = AngularFhirModule;
    exports.AgePipe = AgePipe;
    exports.FhirCodingPipe = FhirCodingPipe;
    exports.FhirUsualNamePipe = FhirUsualNamePipe;
    exports.ObservationValuePipe = ObservationValuePipe;
    exports.FhirService = FhirService;
    exports.RegionalConfigService = RegionalConfigService;
    exports.LoaderService = LoaderService;
    exports.CONTAINER_DATA = CONTAINER_DATA;
    exports.LoaderComponent = LoaderComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angular-fhir.umd.js.map