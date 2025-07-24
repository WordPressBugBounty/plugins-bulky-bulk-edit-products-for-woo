/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add-image-to-multi-gallery.js":
/*!*******************************************!*\
  !*** ./src/add-image-to-multi-gallery.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddImageToMultiGallery)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");


class AddImageToMultiGallery {
    constructor(obj, cells, x, y, e) {
        this.cells = cells;
        this.obj = obj;
        this.x = parseInt(x);
        this.y = parseInt(y);

        this.run();
    }

    run() {
        let $this = this;
        const mediaMultiple = wp.media({multiple: true});
        mediaMultiple.open().off('select close')
            .on('select', function (e) {
                var selection = mediaMultiple.state().get('selection');
                selection.each(function (attachment) {
                    attachment = attachment.toJSON();
                    if (attachment.type === 'image') {
                        // galleryPopup.find('.vi-wbe-gallery-images').append(tmpl.galleryImage(attachment.url, attachment.id));
                        let imgId = attachment.id;
                        _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.imgStorage[imgId] = attachment.url;
                        $this.addImage(imgId);
                    }
                });
            });
    }

    addImage(imgId) {

        let excelObj = this.obj;
        let breakControl = false, records = [];
        let h = this.cells;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x];
                if (!value) value = [];

                let newValue = [...new Set(value)];
                newValue.push(imgId);

                records.push(excelObj.updateCell(x, y, newValue));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }
}

/***/ }),

/***/ "./src/attributes.js":
/*!***************************!*\
  !*** ./src/attributes.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Attributes: () => (/* binding */ Attributes),
/* harmony export */   I18n: () => (/* binding */ I18n)
/* harmony export */ });
/* harmony import */ var _custom_column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-column */ "./src/custom-column.js");


const Attributes = {
    ...wbeParams,
    productTypes: {},
    filterKey: Date.now(),
    selectPage: 1,
    ajaxData: {action: 'vi_wbe_ajax', vi_wbe_nonce: wbeParams.nonce},
    tinyMceOptions: {
        tinymce: {
            theme: "modern",
            skin: "lightgray",
            language: "en",
            formats: {
                alignleft: [
                    {selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles: {textAlign: "left"}},
                    {selector: "img,table,dl.wp-caption", classes: "alignleft"}
                ],
                aligncenter: [
                    {selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles: {textAlign: "center"}},
                    {selector: "img,table,dl.wp-caption", classes: "aligncenter"}
                ],
                alignright: [
                    {selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles: {textAlign: "right"}},
                    {selector: "img,table,dl.wp-caption", classes: "alignright"}
                ],
                strikethrough: {inline: "del"}
            },
            relative_urls: false,
            remove_script_host: false,
            convert_urls: false,
            browser_spellcheck: true,
            fix_list_elements: true,
            entities: "38,amp,60,lt,62,gt",
            entity_encoding: "raw",
            keep_styles: false,
            cache_suffix: "wp-mce-49110-20201110",
            resize: "vertical",
            menubar: false,
            branding: false,
            preview_styles: "font-family font-size font-weight font-style text-decoration text-transform",
            end_container_on_empty_block: true,
            wpeditimage_html5_captions: true,
            wp_lang_attr: "en-US",
            wp_keep_scroll_position: false,
            wp_shortcut_labels: {
                "Heading 1": "access1",
                "Heading 2": "access2",
                "Heading 3": "access3",
                "Heading 4": "access4",
                "Heading 5": "access5",
                "Heading 6": "access6",
                "Paragraph": "access7",
                "Blockquote": "accessQ",
                "Underline": "metaU",
                "Strikethrough": "accessD",
                "Bold": "metaB",
                "Italic": "metaI",
                "Code": "accessX",
                "Align center": "accessC",
                "Align right": "accessR",
                "Align left": "accessL",
                "Justify": "accessJ",
                "Cut": "metaX",
                "Copy": "metaC",
                "Paste": "metaV",
                "Select all": "metaA",
                "Undo": "metaZ",
                "Redo": "metaY",
                "Bullet list": "accessU",
                "Numbered list": "accessO",
                "Insert\/edit image": "accessM",
                "Insert\/edit link": "metaK",
                "Remove link": "accessS",
                "Toolbar Toggle": "accessZ",
                "Insert Read More tag": "accessT",
                "Insert Page Break tag": "accessP",
                "Distraction-free writing mode": "accessW",
                "Add Media": "accessM",
                "Keyboard Shortcuts": "accessH"
            },
            // content_css: "http://localhost:8000/wp-includes/css/dashicons.min.css?ver=5.6.2,http://localhost:8000/wp-includes/js/tinymce/skins/wordpress/wp-content.css?ver=5.6.2,https://fonts.googleapis.com/css?family=Source+Sans+Pro:400%2C300%2C300italic%2C400italic%2C600%2C700%2C900&subset=latin%2Clatin-ext,http://localhost:8000/wp-content/themes/storefront/assets/css/base/gutenberg-editor.css",
            plugins: "charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview",
            selector: "#vi-wbe-text-editor",
            wpautop: true,
            indent: false,
            toolbar1: "formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,wp_more,spellchecker,fullscreen,wp_adv",
            toolbar2: "strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
            tabfocus_elements: ":prev,:next",
            body_class: "excerpt post-type-product post-status-publish page-template-default locale-en-us",
        },
        mediaButtons: true,
        quicktags: true
    },
    setColumns(raw) {
        try {
            let columns = JSON.parse(raw);
            Attributes.columns = columns.map((col) => {
                if (col && col.editor && _custom_column__WEBPACK_IMPORTED_MODULE_0__.customColumn[col.editor]) col.editor = _custom_column__WEBPACK_IMPORTED_MODULE_0__.customColumn[col.editor];
                if (col && col.filter && _custom_column__WEBPACK_IMPORTED_MODULE_0__.columnFilter[col.filter]) col.filter = _custom_column__WEBPACK_IMPORTED_MODULE_0__.columnFilter[col.filter];
                return col;
            });

        } catch (e) {
            console.log(e);
        }
    }
};


window.Attributes = Attributes;
const I18n = wbeI18n.i18n;


/***/ }),

/***/ "./src/calculator.js":
/*!***************************!*\
  !*** ./src/calculator.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calculator: () => (/* binding */ Calculator),
/* harmony export */   CalculatorBaseOnRegularPrice: () => (/* binding */ CalculatorBaseOnRegularPrice),
/* harmony export */   FillNumber: () => (/* binding */ FillNumber)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");



const $ = jQuery;

class Calculator {
    constructor(obj, x, y, e) {
        this._data = {};
        this._data.jexcel = obj;
        this._data.x = parseInt(x);
        this._data.y = parseInt(y);
        this.run();
    }

    get(id) {
        return this._data[id] || ''
    }

    run() {
        let formulaHtml = this.content();
        let cell = $(`td[data-x=${this.get('x') || 0}][data-y=${this.get('y') || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);
        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
        formulaHtml.on('change', '.vi-wbe-rounded', this.toggleDecimalValue);
    }

    content() {
        return $(`<div class="vi-wbe-formula-container" style="display: flex;">
                    <select class="vi-wbe-operator">
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </select>
                    <input type="number" min="0" class="vi-wbe-value">
                    <select class="vi-wbe-unit">
                        <option value="fixed">n</option>
                        <option value="percentage">%</option>
                    </select>
                    <select class="vi-wbe-rounded">
                        <option value="no_round">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('No round')}</option>
                        <option value="round">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round with decimal')}</option>
                        <option value="round_up">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round up')}</option>
                        <option value="round_down">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round down')}</option>
                    </select>
                    <input type="number" min="0" max="10" class="vi-wbe-decimal" value="0">
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('OK')}</button>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            operator = form.find('.vi-wbe-operator').val(),
            fValue = parseFloat(form.find('.vi-wbe-value').val()),
            unit = form.find('.vi-wbe-unit').val(),
            rounded = form.find('.vi-wbe-rounded').val(),
            decimal = parseInt(form.find('.vi-wbe-decimal').val()),
            excelObj = this.get('jexcel');

        if (!fValue) return;

        let breakControl = false, records = [];
        let h = excelObj.selectedContainer;
        let start = h[1], end = h[3], x = h[0];

        function formula(oldValue) {
            oldValue = parseFloat(oldValue.toString().replace(',', '.'));

            let extraValue = unit === 'percentage' ? oldValue * fValue / 100 : fValue;
            let newValue = operator === '-' ? oldValue - extraValue : oldValue + extraValue;

            switch (rounded) {
                case 'round':
                    newValue = newValue.toFixed(decimal);
                    break;

                case 'round_up':
                    newValue = Math.ceil(newValue);
                    break;

                case 'round_down':
                    newValue = Math.floor(newValue);
                    break;
            }

            return newValue;
        }

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x] || 0;
                console.log(value)
                records.push(excelObj.updateCell(x, y, formula(value)));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

    toggleDecimalValue() {
        let form = $(this).closest('.vi-wbe-formula-container');
        form.find('.vi-wbe-decimal').hide();
        if ($(this).val() === 'round') form.find('.vi-wbe-decimal').show();
    }
}

class CalculatorBaseOnRegularPrice {
    constructor(obj, x, y, e) {
        this._data = {};
        this._data.jexcel = obj;
        this._data.x = parseInt(x);
        this._data.y = parseInt(y);
        this.run();
    }

    get(id) {
        return this._data[id] || ''
    }

    run() {
        let formulaHtml = this.content();
        let cell = $(`td[data-x=${this.get('x') || 0}][data-y=${this.get('y') || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);
        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
        formulaHtml.on('change', '.vi-wbe-rounded', this.toggleDecimalValue);
    }

    content() {
        return $(`<div class="vi-wbe-formula-container" style="display: flex;">
                    <span class="vi-wbe-operator vi-ui button basic small icon"><i class="icon minus"> </i></span>
                    <input type="number" min="0" class="vi-wbe-value">
                    <select class="vi-wbe-unit">
                        <option value="percentage">%</option>
                        <option value="fixed">n</option>
                    </select>
                    <select class="vi-wbe-rounded">
                        <option value="no_round">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('No round')}</option>
                        <option value="round">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round with decimal')}</option>
                        <option value="round_up">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round up')}</option>
                        <option value="round_down">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Round down')}</option>
                    </select>
                    <input type="number" min="0" max="10" class="vi-wbe-decimal" value="0">
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('OK')}</button>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            fValue = parseFloat(form.find('.vi-wbe-value').val()),
            unit = form.find('.vi-wbe-unit').val(),
            rounded = form.find('.vi-wbe-rounded').val(),
            decimal = parseInt(form.find('.vi-wbe-decimal').val()),
            excelObj = this.get('jexcel');

        if (!fValue) return;

        let breakControl = false, records = [];
        let h = excelObj.selectedContainer;
        let start = h[1], end = h[3], x = h[0];

        function formula(regularPrice) {
            regularPrice = parseFloat(regularPrice.replace(',', '.'));
            let extraValue = unit === 'percentage' ? regularPrice * fValue / 100 : fValue;
            let newValue = regularPrice - extraValue;
            newValue = newValue > 0 ? newValue : 0;

            switch (rounded) {
                case 'round':
                    newValue = newValue.toFixed(decimal);
                    break;
                case 'round_up':
                    newValue = Math.ceil(newValue);
                    break;
                case 'round_down':
                    newValue = Math.floor(newValue);
                    break;
            }

            return newValue;
        }

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x - 1] || 0;
                records.push(excelObj.updateCell(x, y, formula(value)));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

    toggleDecimalValue() {
        let form = $(this).closest('.vi-wbe-formula-container');
        form.find('.vi-wbe-decimal').hide();
        if ($(this).val() === 'round') form.find('.vi-wbe-decimal').show();
    }
}

class FillNumber {

    constructor(obj, x, y, e) {
        this._data = {};
        this._data.jexcel = obj;
        this._data.x = parseInt(x);
        this._data.y = parseInt(y);
        this.run();
    }

    get(id) {
        return this._data[id] || ''
    }

    run() {
        let formulaHtml = this.content();
        let cell = $(`td[data-x=${this.get('x') || 0}][data-y=${this.get('y') || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);
        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
    }

    content() {
        return $(`<div class="vi-wbe-formula-container" style="display: flex; align-items: center; gap: 10px;">
                    <label for="">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('From')}</label>
                    <input type="number" min="0" max="10" class="vi-wbe-fill-from" value="0">
                    <label for="">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Step')}</label>
                    <input type="number" min="0" max="10" class="vi-wbe-fill-step" value="1">
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Fill')}</button>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            from = parseFloat(form.find('.vi-wbe-fill-from').val()),
            step = parseFloat(form.find('.vi-wbe-fill-step').val()),
            i = 0,
            excelObj = this.get('jexcel');

        // if (!fValue) return;

        let breakControl = false, records = [];
        let h = excelObj.selectedContainer;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = from + step * i;

                records.push(excelObj.updateCell(x, y, value.toString()));
                excelObj.updateFormulaChain(x, y, records);
                i++;
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }
}

// export default Calculator;

/***/ }),

/***/ "./src/custom-column.js":
/*!******************************!*\
  !*** ./src/custom-column.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   columnFilter: () => (/* binding */ columnFilter),
/* harmony export */   customColumn: () => (/* binding */ customColumn)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ "./src/templates.js");




const customColumn = {};
const columnFilter = {};

jQuery(document).ready(function ($) {
    window.viIsEditing = false;
    const mediaMultiple = wp.media({multiple: true});
    const mediaSingle = wp.media({multiple: false});

    const tmpl = {
        galleryImage(src, id) {
            let tmp = $(document).triggerHandler('bulky_gallery_attachment_render',[src, id]);
            if (!tmp){
                tmp = `<li class="vi-wbe-gallery-image" data-id="${id}"><i class="vi-wbe-remove-image dashicons dashicons-no-alt"> </i><img src="${src}"></li>`;
            }
            return tmp;
        },

        fileDownload($_file = {}) {
            let {id, name, file} = $_file;
            let row = $(`<tr>
                        <td><i class="bars icon"></i><input type="text" class="vi-wbe-file-name" value="${name || ''}"></td>
                        <td>
                            <input type="text" class="vi-wbe-file-url" value="${file || ''}">
                            <input type="hidden" class="vi-wbe-file-hash" value="${id || ''}">
                            <span class="vi-ui button mini vi-wbe-choose-file">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Choose file')}</span>
                            <i class="vi-wbe-remove-file dashicons dashicons-no-alt"> </i>
                        </td>
                    </tr>`);

            row.on('click', '.vi-wbe-remove-file', function () {
                row.remove();
            });

            return row;
        }
    };

    customColumn.textEditor = {
        type: 'textEditor',

        createCell(cell, i, value, obj) {
            cell.innerHTML = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].stripHtml(value).slice(0, $('#vi-wbe-spreadsheet').hasClass('vibulky-spreadsheet-wrap-mode')? 500 :50);
            return cell;
        },

        closeEditor(cell, save) {
            window.viIsEditing = false;

            let content = '';
            if (save === true) {
                content = wp.editor.getContent('vi-wbe-text-editor');
                if (!this.isEditing) {
                    // wp.editor.remove('vi-wbe-text-editor');
                    // $('.vi-ui.modal').modal('hide');
                    setTimeout(function (){
                        $('.vi-ui.modal').find('.close.icon').trigger('click');
                    },100);
                }
                this.isEditing = false;
            }else {
                wp.editor.remove('vi-wbe-text-editor');
            }

            $( "#vi-wbe-text-editor" ).val("");

            return content;
        },

        openEditor(cell, el, obj) {
            window.viIsEditing = true;
            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x'),
                content = obj.options.data[y][x],
                $this = this,
                modalClose = $('.vi-ui.modal .close.icon');
            $('.vi-ui.modal').modal('show');
            this.tinymceInit(content);

            modalClose.off('click');

            $('.vi-wbe-text-editor-save').off('click').on('click', function () {
                $(this).addClass('loading').removeClass('vi-wbe-text-editor-save-clicking');
                if ($('#vi-wbe-text-editor').is(':visible')){
                    $(this).addClass('vi-wbe-text-editor-save-clicking');
                    $('#vi-wbe-text-editor-tmce').trigger('click');
                    return;
                }
                $(this).removeClass('primary loading');
                $this.isEditing = !$(this).hasClass('vi-wbe-close');
                obj.closeEditor(cell, true);
            });

            modalClose.on('click', function () {
                obj.closeEditor(cell, false);
            });

            let modal = $('.vi-ui.modal').parent();
            modal.on('click', function (e) {
                if (e.target === e.delegateTarget) {
                    obj.closeEditor(cell, false);
                }
            })
        },

        updateCell(cell, value, force) {
            let editorValue = wp.editor.getContent('vi-wbe-text-editor');
            if ( editorValue.trim().length > 0 ) {
                value = editorValue;
            }
            cell.innerHTML = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].stripHtml(value).slice(0, 50);
            return value;
        },

        tinymceInit(content = '') {
            content = wp.editor.autop(content);
            if (tinymce.get('vi-wbe-text-editor') === null) {
                $('#vi-wbe-text-editor').val(content);

                _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.tinyMceOptions.tinymce.setup = function (editor) {
                    editor.on('keyup', function (e) {
                        $('.vi-wbe-text-editor-save:not(.vi-wbe-close)').addClass('primary');
                    });
                    editor.on('change', function (e) {
                        setTimeout(function (){
                            if ($('.vi-wbe-text-editor-save-clicking').length){
                                $('.vi-wbe-text-editor-save-clicking').trigger('click');
                            }
                        },100);
                    });
                };

                wp.editor.initialize('vi-wbe-text-editor', _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.tinyMceOptions);

            }

            tinymce.get('vi-wbe-text-editor').setContent(content)
        },
    };

    customColumn.image = {
        createCell(cell, i, value, obj) {
            if (value) {
                let url = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage[value];
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].isUrl(url) ? $(cell).html(`<img width="40" src="${url}" data-id="${value}">`) : $(cell).html('');
            }
            return cell;
        },

        closeEditor(cell, save) {
            return $(cell).find('img').attr('data-id') || '';
        },

        openEditor(cell, el, obj) {
            function openMedia() {
                mediaSingle.open().off('select').on('select', function (e) {
                    let uploadedImages = mediaSingle.state().get('selection').first();
                    let selectedImages = uploadedImages.toJSON();
                    if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].isUrl(selectedImages.url)) {
                        $(cell).html(`<img width="40" src="${selectedImages.url}" data-id="${selectedImages.id}">`);
                        _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage[selectedImages.id] = selectedImages.url;
                        obj.closeEditor(cell, true);
                    }
                });
            }

            $(cell).on('dblclick', openMedia);

            openMedia();
        },

        updateCell(cell, value, force) {
            value = parseInt(value) || '';
            let url = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage[value];
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].isUrl(url) ? $(cell).html(`<img width="40" src="${url}" data-id="${value}">`) : $(cell).html('');
            return value;
        },
    };

    customColumn.gallery = {
        type: 'gallery',

        saveData(cell) {
            let newIds = [];
            $(cell).find('.vi-wbe-gallery-image').each(function () {
                newIds.push($(this).data('id'));
            });
            $(cell).find('.vi-wbe-ids-list').val(newIds.join(','));
        },

        createCell(cell, i, value) {
            let hasItem = value.length ? 'vi-wbe-gallery-has-item' : '';
            $(cell).addClass('vi-wbe-gallery');
            $(cell).html(`<div class="vi-wbe-gallery ${hasItem}"><i class="images outline icon"> </i></div>`);
            return cell;
        },

        closeEditor(cell, save) {
            window.viIsEditing = false;

            let selected = [];
            if (save) {
                let child = $(cell).children();
                child.find('.vi-wbe-gallery-image').each(function () {
                    selected.push($(this).data('id'));
                });
            }
            $(cell).find('.vi-wbe-cell-popup').remove();
            return selected;
        },

        openEditor(cell, el, obj) {
            window.viIsEditing = true;

            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let ids = obj.options.data[y][x],
                images = '', cacheEdition;

            if (ids.length) {
                for (let id of ids) {
                    let src = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage[id];
                    images += tmpl.galleryImage(src, id);
                }
            }

            let galleryPopup = $(`<div class="vi-wbe-cell-popup-inner">
                                    <ul class="vi-wbe-gallery-images">${images}</ul>
                                    <span class="vi-ui button tiny vi-wbe-add-image">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add image')}</span>
                                    <span class="vi-ui button tiny vi-wbe-remove-gallery">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Remove all')}</span>
                                </div>`);

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', galleryPopup);

            galleryPopup.find('.vi-wbe-gallery-images').sortable({
                items: 'li.vi-wbe-gallery-image',
                cursor: 'move',
                scrollSensitivity: 40,
                forcePlaceholderSize: true,
                forceHelperSize: false,
                helper: 'clone',
                placeholder: 'vi-wbe-sortable-placeholder',
                tolerance: "pointer",
            });

            galleryPopup.on('click', '.vi-wbe-remove-image', function () {
                $(this).parent().remove();
            });

            galleryPopup.on('click', '.vi-wbe-add-image', function () {
                mediaMultiple.open().off('select close')
                    .on('select', function (e) {
                        var selection = mediaMultiple.state().get('selection');
                        selection.each(function (attachment) {
                            attachment = attachment.toJSON();
                            let allow_attachment = $(document).triggerHandler('bulky_gallery_approve_attachment',[cell,obj, attachment]);
                            if (allow_attachment || attachment.type === 'image') {
                                _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage[attachment.id] = attachment.url;
                                galleryPopup.find('.vi-wbe-gallery-images').append(tmpl.galleryImage(attachment.url, attachment.id));
                            }
                        });
                    });
            });

            galleryPopup.on('click', '.vi-wbe-remove-gallery', function () {
                galleryPopup.find('.vi-wbe-gallery-images').empty();
            });

            if (ids.length === 0) {
                galleryPopup.find('.vi-wbe-add-image').trigger('click');
            }
        },

        updateCell(cell, value, force) {
            let icon = $(cell).find('.vi-wbe-gallery');
            value.length ? icon.addClass('vi-wbe-gallery-has-item') : icon.removeClass('vi-wbe-gallery-has-item');
            return value;
        },
    };

    customColumn.download = {
        createCell(cell, i, value) {
            $(cell).html(`<div><i class="download icon"> </i></div>`);
            return cell;
        },

        closeEditor(cell, save) {
            let data = [];
            if (save) {
                let child = $(cell).children();
                child.find('table.vi-wbe-files-download tbody tr').each(function () {
                    let row = $(this);
                    data.push({
                        id: row.find('.vi-wbe-file-hash').val(),
                        file: row.find('.vi-wbe-file-url').val(),
                        name: row.find('.vi-wbe-file-name').val()
                    });
                });

                child.remove();
            }
            return data;
        },

        openEditor(cell, el, obj) {

            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let files = obj.options.data[y][x],
                cacheEdition, tbody = $('<tbody></tbody>');

            if (Array.isArray(files)) {
                for (let file of files) {
                    tbody.append(tmpl.fileDownload(file));
                }
            }

            let fileDownloadPopup = $(`<div class="">
                                        <table class="vi-wbe-files-download vi-ui celled table">
                                            <thead>
                                            <tr>
                                                <th>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Name')}</th>
                                                <th>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('File URL')}</th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <span class="vi-ui button tiny vi-wbe-add-file">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add file')}</span>
                                    </div>`);

            fileDownloadPopup.find('.vi-wbe-files-download').append(tbody);

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', fileDownloadPopup);

            tbody.sortable();

            fileDownloadPopup.on('click', '.vi-wbe-add-file', () => fileDownloadPopup.find('.vi-wbe-files-download tbody').append(tmpl.fileDownload()));

            fileDownloadPopup.on('click', '.vi-wbe-choose-file', function () {
                cacheEdition = obj.edition;
                obj.edition = null;
                let row = $(this).closest('tr');

                mediaSingle.open().off('select close')
                    .on('select', function (e) {
                        let selected = mediaSingle.state().get('selection').first().toJSON();
                        if (selected.url) row.find('.vi-wbe-file-url').val(selected.url).trigger('change');
                    })
                    .on('close', () => obj.edition = cacheEdition);
            });

            if (!files.length) {
                fileDownloadPopup.find('.vi-wbe-add-file').trigger('click');
            }
        },

        updateCell(cell, value, force) {
            $(cell).html(`<div><i class="download icon"> </i></div>`);
            return value;
        },
    };

    customColumn.tags = {
        type: 'tags',
        createCell(cell, i, value, obj) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, value);
            return cell;
        },

        openEditor(cell, el, obj) {
            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let value = obj.options.data[y][x],
                select = $('<select class="bulky-select-tag" />'),
                addBtn = $('<span class="vi-ui button mini basic">Add</span>'),
                editor = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', '<div style="display: flex; gap: 10px;"><div class="bulky-select-tag-wrapper" style="width: 100%;"></div><div class="bulky-add-select-tag"></div></div>');

            let searchKey;

            $(editor).find('.bulky-select-tag-wrapper').append(select);
            $(editor).find('.bulky-add-select-tag').append(addBtn);

            select.select2({
                data: value,
                multiple: true,
                minimumInputLength: 3,
                placeholder: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Search tags...'),
                ajax: {
                    url: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxUrl,
                    type: 'post',
                    data: function (params) {
                        return {
                            ..._attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxData,
                            sub_action: 'search_tags',
                            search: params.term,
                            type: 'public'
                        };
                    },
                    processResults: function (data) {
                        return {results: data};
                    }
                }
            }).on('select2:select', function (e) {
                searchKey = '';
            });

            select.find('option').attr('selected', true).parent().trigger('change');

            // $(editor).find('.select2-search__field').trigger('click');

            $('body').on('change', '.select2-search__field', function () {
                searchKey = $(this).val();
            });

            addBtn.on('click', function () {
                if (searchKey) {
                    let newOption = new Option(searchKey, searchKey, true, true);
                    $(editor).find('.bulky-select-tag').append(newOption).trigger('change');
                    searchKey = '';
                }
            })
        },

        closeEditor(cell, save) {
            let child = $(cell).children(),
                data = child.find('select').select2('data'),
                selected = [];

            if (data.length) {
                for (let item of data) {
                    selected.push({id: item.id, text: item.text})
                }
            }
            child.remove();
            $('.select2-container').remove();
            return selected;
        },

        updateCell(cell, value, force, obj, x) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, value);
            return value;
        }
    };

    customColumn.link_products = {
        createCell(cell, i, value, obj) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, value);
            return cell;
        },

        closeEditor(cell, save) {
            let child = $(cell).children(), selected = [];

            if (save) {
                let data = child.find('select').select2('data');

                if (data.length) {
                    for (let item of data) {
                        selected.push({id: item.id, text: item.text})
                    }
                }
            }

            child.remove();
            $('.select2-container').remove();
            return selected;
        },

        openEditor(cell, el, obj) {
            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let value = obj.options.data[y][x],
                select = $('<select/>');

            let editor = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', select);

            select.select2({
                data: value,
                multiple: true,
                minimumInputLength: 3,
                placeholder: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Search products...'),
                ajax: {
                    url: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxUrl,
                    type: 'post',
                    delay: 250,
                    dataType: 'json',
                    data: function (params) {
                        return {
                            ..._attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxData,
                            sub_action: 'search_products',
                            search: params.term,
                            type: 'public'
                        };
                    },
                    processResults: function (data) {
                        var terms = [];
                        if (data) {
                            $.each(data, function (id, text) {
                                terms.push({id: id, text: text});
                            });
                        }
                        return {
                            results: terms
                        };
                    }
                }
            });

            select.find('option').attr('selected', true).parent().trigger('change');
            $(editor).find('.select2-search__field').trigger('click');
        },

        updateCell(cell, value, force, obj, x) {
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, value);
            return value;
        }
    };

    customColumn.product_attributes = {
        type: 'product_attributes',

        createCell(cell, i, value, obj) {
            let hasItem = Object.keys(value).length ? 'vi-wbe-has-attrs' : '';
            $(cell).html(`<div class="vi-wbe-product-attrs ${hasItem}"><i class="icon edit"/></div>`);
            return cell;
        },

        updateCell(cell, value, force, obj, x) {
            let icon = $(cell).find('.vi-wbe-product-attrs');
            Object.keys(value).length ? icon.addClass('vi-wbe-has-attrs') : icon.removeClass('vi-wbe-has-attrs');

            return value;
        },

        openEditor(cell, el, obj) {
            let data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getDataFromCell(obj, cell),
                productType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductTypeFromCell(cell),
                $this = this, html = '';

            this.productType = productType;

            let modal = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createModal({
                header: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit attributes'),
                content: '',
                actions: [{class: 'save-attributes', text: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Save')}],
                silent: true,
            });

            $(cell).append(modal);

            if (productType !== 'variation') {
                let {attributes} = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes;
                let addAttribute = `<option value="">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Custom product attribute')}</option>`;

                for (let attr in attributes) {
                    addAttribute += `<option value="${attr}">${attributes[attr].data.attribute_label}</option>`;
                }

                addAttribute = `<div class="vi-wbe-taxonomy-header">
                                    <select class="vi-wbe-select-taxonomy">${addAttribute}</select>
                                    <span class="vi-ui button tiny vi-wbe-add-taxonomy">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add')}</span>
                                </div>`;

                if (Array.isArray(data) && data.length) {
                    for (let item of data) {
                        html += $this.createRowTable(item);
                    }
                }

                html = `${addAttribute}
                        <table class="vi-ui celled table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Attributes</th>
                                <th width="1">Actions</th>
                            </tr>
                            </thead>
                            <tbody>${html}</tbody>
                        </table>`;

                modal.find('.content').append(html);
                modal.find('table select').select2({multiple: true});
                modal.find('tbody').sortable({
                    items: 'tr',
                    cursor: 'move',
                    axis: 'y',
                    scrollSensitivity: 40,
                    forcePlaceholderSize: true,
                    helper: 'clone',
                    handle: '.icon.move',
                });

                const setOptionDisable = () => {
                    modal.find('select.vi-wbe-select-taxonomy option').removeAttr('disabled');
                    modal.find('input[type=hidden]').each(function (i, el) {
                        let tax = $(el).val();
                        modal.find(`select.vi-wbe-select-taxonomy option[value='${tax}']`).attr('disabled', 'disabled');
                    });
                };

                setOptionDisable();

                modal.on('click', function (e) {
                    let $thisTarget = $(e.target);
                    if ($thisTarget.hasClass('trash')) {
                        $thisTarget.closest('tr').remove();
                        setOptionDisable();
                    }

                    if ($thisTarget.hasClass('vi-wbe-add-taxonomy')) {
                        let taxSelect = $('.vi-wbe-select-taxonomy'), tax = taxSelect.val(),
                            item = {name: tax, options: []};
                        if (tax) item.is_taxonomy = 1;

                        let row = $($this.createRowTable(item));
                        modal.find('table tbody').append(row);
                        row.find('select').select2({multiple: true});
                        setOptionDisable();
                        taxSelect.val('').trigger('change');
                    }

                    if ($thisTarget.hasClass('vi-wbe-select-all-attributes')) {
                        let td = $thisTarget.closest('td');
                        let select = td.find('select');
                        select.find('option').attr('selected', true);
                        select.trigger('change');
                    }

                    if ($thisTarget.hasClass('vi-wbe-select-no-attributes')) {
                        let td = $thisTarget.closest('td');
                        let select = td.find('select');
                        select.find('option').attr('selected', false);
                        select.trigger('change');
                    }

                    if ($thisTarget.hasClass('vi-wbe-add-new-attribute')) {
                        let newAttr = prompt(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Enter a name for the new attribute term:'));

                        if (!newAttr) return;

                        let tr = $thisTarget.closest('tr.vi-wbe-attribute-row'),
                            taxAttr = tr.attr('data-attr');

                        if (taxAttr) {
                            taxAttr = JSON.parse(taxAttr);
                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                data: {
                                    sub_action: 'add_new_attribute',
                                    taxonomy: taxAttr.name,
                                    term: newAttr
                                },
                                beforeSend() {
                                    $thisTarget.addClass('loading')
                                },
                                success(res) {
                                    if (res.success) {
                                        let select = tr.find('select');
                                        select.append(`<option value="${res.data.term_id}" selected>${res.data.name}</option>`);
                                        select.trigger('change');
                                        _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.attributes[taxAttr.name].terms[res.data.term_id] = {slug: res.data.slug, text: res.data.name}
                                    } else {
                                        alert(res.data.message)
                                    }
                                },
                                error(res) {
                                    console.log(res);
                                    alert(res.statusText + res.responseText);
                                },
                                complete() {
                                    $thisTarget.removeClass('loading');
                                }
                            });
                        }
                    }
                });

            } else {
                //Variation attributes
                let y = cell.getAttribute('data-y');
                let parentId = obj.options.data[y][1],
                    allProducts = obj.getData(), parentAttributes;

                for (let _y in allProducts) {
                    let productId = allProducts[_y][0];
                    if (parentId == productId) {
                        let x = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip.attributes;
                        parentAttributes = obj.options.data[_y][x];
                        break;
                    }
                }

                if (parentAttributes) {
                    for (let attr of parentAttributes) {
                        let options = `<option value="">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Any...')}</option>`, name = attr.name, label;
                        if (attr.is_taxonomy) {
                            let attrData = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.attributes[name];
                            for (let id of attr.options) {
                                let term = attrData.terms[id];
                                let selected = term.slug === data[name] ? 'selected' : '';
                                options += `<option value="${term.slug}" ${selected}>${term.text}</option>`;
                            }
                            label = attrData.data.attribute_label
                        } else {
                            for (let value of attr.options) {
                                let selected = value === data[name] ? 'selected' : '';
                                options += `<option value="${value}" ${selected}>${value}</option>`;
                            }
                            label = name;
                        }
                        html += `<tr><td>${label}</td><td><select name="${name}">${options}</select></td></tr>`;
                    }
                }

                html = `<table class="vi-ui celled table">
                            <thead>
                            <tr>
                                <th>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Attribute')}</th>
                                <th>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Option')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            ${html}
                            </tbody>
                        </table>`;

                modal.find('.content').append(html);
            }

            modal.on('click', function (e) {
                let thisTarget = $(e.target);
                if (thisTarget.hasClass('close') || thisTarget.hasClass('vi-wbe-modal-container')) obj.closeEditor(cell, false);
                if (thisTarget.hasClass('save-attributes')) obj.closeEditor(cell, true);
            });
        },

        closeEditor(cell, save) {
            let data = [];
            if (save === true) {
                if (this.productType !== 'variation') {
                    $(cell).find('.vi-wbe-attribute-row').each(function (i, row) {
                        let pAttr = $(row).data('attr');
                        if (pAttr.is_taxonomy) {
                            pAttr.options = $(row).find('select').val().map(Number);
                        } else {
                            pAttr.name = $(row).find('input.custom-attr-name').val();
                            let value = $(row).find('textarea.custom-attr-val').val();
                            pAttr.value = value.trim().replace(/[^\S\n]+/g, ' ');
                            pAttr.options = value.split('|').map(item => item.trim().replace(/[^\S\n]+/g, ' '));
                        }
                        pAttr.visible = !!$(row).find('.attr-visibility:checked').length;
                        pAttr.variation = !!$(row).find('.attr-variation:checked').length;
                        pAttr.position = i;
                        data.push(pAttr)
                    })
                } else {
                    data = {};
                    $(cell).find('select').each(function (i, row) {
                        data[$(row).attr('name')] = $(row).val();
                    });
                }
            }
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeModal(cell);
            return data;
        },

        createRowTable(item) {
            let attrName = '', value = '';

            if (item.is_taxonomy) {
                let attribute = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.attributes[item.name],
                    terms = attribute.terms || [], options = '';

                attrName = `${attribute.data.attribute_label}<input type="hidden" value="${item.name}"/>`;

                if (Object.keys(terms).length) {
                    for (let id in terms) {
                        let selected = item.options.includes(parseInt(id)) ? 'selected' : '';
                        options += `<option value="${id}" ${selected}>${terms[id].text}</option>`;
                    }
                }
                value = `<select multiple>${options}</select>
                        <div class="vi-wbe-attributes-button-group">
                            <span class="vi-ui button mini vi-wbe-select-all-attributes">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Select all')}</span>
                            <span class="vi-ui button mini vi-wbe-select-no-attributes">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Select none')}</span>
                            <span class="vi-ui button mini vi-wbe-add-new-attribute">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add new')}</span>
                        </div>`;
            } else {
                attrName = `<input type="text" class="custom-attr-name" value="${item.name}" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Custom attribute name')}"/>`;
                value = `<textarea class="custom-attr-val" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Enter some text, or some attributes by "|" separating values.')}">${item.value || ''}</textarea>`;
            }

            attrName = `<div class="vi-wbe-attribute-name-label">${attrName}</div>`;

            attrName += `<div>
                            <input type="checkbox" class="attr-visibility" ${item.visible ? 'checked' : ''} value="1">
                            <label>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Visible on the product page')}</label>
                        </div>`;

            if (this.productType === 'variable') {
                attrName += `<div>
                                <input type="checkbox" class="attr-variation" ${item.variation ? 'checked' : ''} value="1">
                                <label>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Used for variations')}</label>
                            </div>`;
            }

            return `<tr class="vi-wbe-attribute-row" data-attr='${JSON.stringify(item)}'>
                        <td class="vi-wbe-left">${attrName}</td>
                        <td>${value}</td>
                        <td class="vi-wbe-right"><i class="icon trash"> </i> <i class="icon move"> </i></td>
                    </tr>`;
        }

    };

    customColumn.default_attributes = {
        createCell(cell, i, value, obj) {
            if (value) $(cell).text(Object.values(value).filter(Boolean).join('; '));
            return cell;
        },

        updateCell(cell, value, force, obj, x) {
            if (value) {
                $(cell).text(Object.values(value).filter(Boolean).join('; '));
            } else {
                $(cell).text('');
            }

            return value;
        },

        openEditor(cell, el, obj) {
            let data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getDataFromCell(obj, cell),
                productType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductTypeFromCell(cell),
                html = '';

            this.productType = productType;
            if (productType === 'variable') {
                let modal = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createModal({header: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Set default attributes'), content: '', actions: [{class: 'save-attributes', text: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Save')}]});
                $(cell).append(modal);

                let y = cell.getAttribute('data-y'),
                    x = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip.attributes,
                    pAttributes = obj.options.data[y][x];

                if (Array.isArray(pAttributes) && pAttributes.length) {
                    for (let attr of pAttributes) {
                        if (attr.options.length === 0) continue;

                        let attrName = '', selectHtml = '';

                        if (attr.is_taxonomy) {
                            let attrData = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.attributes[attr.name];

                            attrName = attrData.data.attribute_label;
                            for (let termId of attr.options) {
                                let term = attrData.terms[termId],
                                    selected = term.slug === data[attr.name] ? 'selected' : '';
                                let termValue = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].htmlEncode(term.slug);

                                selectHtml += `<option value="${termValue}" ${selected}>${term.text}</option>`;
                            }

                        } else {
                            attrName = attr.attribute_label;
                            for (let term of attr.options) {
                                let selected = term === data[attr.name] ? 'selected' : '';
                                let termValue = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].htmlEncode(term);
                                selectHtml += `<option value="${termValue}" ${selected}>${term}</option>`;
                            }
                        }
                        selectHtml = `<option value="">No default ${attrName}</option> ${selectHtml}`;

                        html += `<tr><td>${attrName}</td><td><select name="${attr.name}" class="vi-wbe-default-attribute">${selectHtml}</select></td></tr>`;
                    }
                }

                modal.find('.content').append(_templates__WEBPACK_IMPORTED_MODULE_2__["default"].defaultAttributes({html}));

                modal.on('click', function (e) {
                    let thisTarget = $(e.target);
                    if (thisTarget.hasClass('close') || thisTarget.hasClass('vi-wbe-modal-container')) obj.closeEditor(cell, false);
                    if (thisTarget.hasClass('save-attributes')) obj.closeEditor(cell, true);
                });
            }
        },

        closeEditor(cell, save) {
            let data = {};
            if (save === true) $(cell).find('.vi-wbe-default-attribute').each((i, el) => data[$(el).attr('name')] = $(el).val());
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeModal(cell);
            return data;
        },

    };

    customColumn.array = {
        createCell(cell, i, value, obj) {
            $(cell).html(value ? JSON.stringify(value) : value);
            // $(cell).html('<i class="icon edit"/>');
            return cell;
        },

        closeEditor(cell, save) {
            let metadata = [];
            if (save === true) {
                metadata = this.editor.get();
            }

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeModal(cell);

            return metadata;
        },

        openEditor(cell, el, obj) {
            let data = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getDataFromCell(obj, cell);
            let modal = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createModal({
                header: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit metadata'),
                content: '',
                actions: [{class: 'save-metadata', text: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Save')}],
            });

            $(cell).append(modal);
            modal.find('.content').html('<div id="vi-wbe-jsoneditor"></div>');
            let container = modal.find('#vi-wbe-jsoneditor').get(0);
            this.editor = new JSONEditor(container, {enableSort: false, search: false, enableTransform: false});
            this.editor.set(data);

            modal.on('click', function (e) {
                let thisTarget = $(e.target);
                if (thisTarget.hasClass('close') || thisTarget.hasClass('vi-wbe-modal-container')) obj.closeEditor(cell, false);
                if (thisTarget.hasClass('save-metadata')) obj.closeEditor(cell, true);
            });
        },

        updateCell(cell, value, force) {

            $(cell).html(value ? JSON.stringify(value) : value);
            return value;
        },
    };

    customColumn.order_notes = {

        createCell(cell, i, value, obj) {
            let hasItem = value.length ? 'vi-wbe-gallery-has-item' : '';

            $(cell).html(`<div class="${hasItem}"><i class="icon eye"/></div>`);
            this.obj = obj;

            return cell;
        },

        closeEditor(cell, save) {
            $(cell).find('.vi-wbe-cell-popup').remove();
            return this.notes;
        },

        openEditor(cell, el, obj) {
            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let notes = obj.options.data[y][x],
                _note = '';

            this.notes = notes;

            if (notes.length) {
                for (let note of notes) {
                    let content = note.content.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                        classColor = note.customer_note ? 'customer' : (note.added_by === 'system' ? 'system' : 'private');

                    _note += `<div class="vi-wbe-note-row">
                                <div class="vi-wbe-note-row-content ${classColor}">${content}</div>
                                <span class="vi-wbe-note-row-meta">
                                    ${note.date}
                                    <a href="#" data-comment_id="${note.id}" class="vi-wbe-note-row-delete">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Delete')}</a>
                                </span>
                            </div>`;
                }
            }

            let galleryPopup = $(`<div class="vi-wbe-cell-popup-inner">${_note}</div>`);

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', galleryPopup);

            galleryPopup.on('click', '.vi-wbe-note-row-delete', function () {
                let $thisBtn = $(this),
                    id = $thisBtn.data('comment_id');

                if (!id) return;

                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                    data: {sub_action: 'delete_order_note', id},
                    beforeSend() {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading()
                    },
                    success(res) {
                        if (res.success) {
                            let index = notes.findIndex(note => note.id === id);
                            notes.splice(index, 1);
                            $thisBtn.closest('.vi-wbe-note-row').remove();
                        }
                    },
                    error(res) {
                        console.log(res);
                        alert(res.statusText + res.responseText);
                    },
                    complete() {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                    }
                })
            })
        },

        updateCell(cell, value, force) {
            return value;
        },
    };

    customColumn.select2 = {
        type: 'select2',

        createCell(cell, i, value, obj) {
            let {source} = obj.options.columns[i], newValue = [];
            if (!Array.isArray(value)) value = Object.values(value);
            if (Array.isArray(source) && source.length) newValue = source.filter(item => value.includes(item.id));

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, newValue);
            return cell;
        },

        openEditor(cell, el, obj) {
            let y = cell.getAttribute('data-y'),
                x = cell.getAttribute('data-x');

            let value = obj.options.data[y][x],
                select = $('<select/>'),
                {source, multiple, placeholder} = obj.options.columns[x],
                editor = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'div', select);

            select.select2({
                data: source || [],
                multiple: multiple,
                placeholder: placeholder,
            });

            select.val(value).trigger('change');
            $(editor).find('.select2-search__field').trigger('click');
        },

        closeEditor(cell, save) {
            let child = $(cell).children(),
                data = child.find('select').val();

            data = data.map(item => !isNaN(item) ? +item : item);

            child.remove();
            $('.select2-container').remove();

            return data;
        },

        updateCell(cell, value, force, obj, x) {
            let {source} = obj.options.columns[x], newValue = [];

            if (Array.isArray(source) && source.length) newValue = source.filter(item => value.includes(item.id));

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].formatText(cell, newValue);

            return value;
        }
    };

//--------------------------------------------------------------------//
    columnFilter.sourceForVariation = (el, cell, x, y, obj) => {
        let source = obj.options.columns[x].source;
        let productType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductTypeFromCell(cell);
        if (productType === 'variation') {
            source = obj.options.columns[x].subSource;
        }
        return source;
    };

});



/***/ }),

/***/ "./src/find-and-replace-options.js":
/*!*****************************************!*\
  !*** ./src/find-and-replace-options.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FindAndReplaceOptions)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");



const $ = jQuery;
class FindAndReplaceOptions {
    constructor(obj, cells, x, y, e) {
        this.cells = cells;
        this.obj = obj;
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.searchData = [];
        this.source = obj.options.columns[x].source || [];

        this.run();
    }

    run() {
        let $this = this;
        let formulaHtml = this.content();

        let cell = $(`td[data-x=${this.x || 0}][data-y=${this.y || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);

        formulaHtml.find('.vi-wbe-find-string').select2({
            data: [{id: '', text: ''}, ...$this.source]
        });

        formulaHtml.find('.vi-wbe-replace-string').select2({
            data: [{id: '', text: ''}, ...$this.source]
        });

        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
    }

    content() {
        return $(`<div class="vi-wbe-formula-container">
                    <div class="field">
                        <div>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find')}</div>
                        <select placeholder="" class="vi-wbe-find-string"> </select>
                    </div>
                    <div class="field">
                        <div>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}</div>
                        <select placeholder="" class="vi-wbe-replace-string"> </select>
                    </div>
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}</button>
                    <p>If 'Find' value is empty, add to selected cells with 'Replace' value.</p>
                    <p>If 'Replace' value is empty, remove from selected cells with 'Find' value.</p>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            findValue = form.find('.vi-wbe-find-string').val(),
            replaceValue = form.find('.vi-wbe-replace-string').val(),
            excelObj = this.obj;

        if (!findValue && !replaceValue) return;

        findValue = !isNaN(findValue) ? +findValue : findValue;
        replaceValue = !isNaN(replaceValue) ? +replaceValue : replaceValue;

        let breakControl = false, records = [];
        let h = this.cells;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x];

                if (!value) value = [];

                let newValue = value.filter((item) => item !== findValue);

                if (value.length !== newValue.length || !findValue) {
                    newValue.push(replaceValue);
                }

                newValue = [...new Set(newValue)];

                records.push(excelObj.updateCell(x, y, newValue));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

}

/***/ }),

/***/ "./src/find-and-replace-tags.js":
/*!**************************************!*\
  !*** ./src/find-and-replace-tags.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FindAndReplaceTags)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");




const $ = jQuery;
class FindAndReplaceTags {
    constructor(obj, cells, x, y, e) {
        this.cells = cells;
        this.obj = obj;
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.searchData = [];

        this.run();
    }

    run() {
        let $this = this;
        let formulaHtml = this.content();
        let y1 = this.cells[1], y2 = this.cells[3];
        let selectData = [{id: '', text: ''}];
        for (let i = y1; i <= y2; i++) {
            let value = this.obj.options.data[i][this.x];
            selectData.push(...value);
        }

        selectData = selectData.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.id === item.id && t.text === item.text
            ))
        );

        let cell = $(`td[data-x=${this.x || 0}][data-y=${this.y || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);

        formulaHtml.find('.vi-wbe-find-string').select2({
            data: selectData
        });

        formulaHtml.find('.vi-wbe-replace-string').select2({
            multiple: false,
            minimumInputLength: 3,
            ajax: {
                url: _attributes__WEBPACK_IMPORTED_MODULE_2__.Attributes.ajaxUrl,
                type: 'post',
                data: function (params) {
                    return {
                        ..._attributes__WEBPACK_IMPORTED_MODULE_2__.Attributes.ajaxData,
                        sub_action: 'search_tags',
                        search: params.term,
                        type: 'public'
                    };
                },
                processResults: function (data) {
                    $this.searchData = data;
                    return {results: data};
                }
            }
        });

        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
    }

    content() {
        return $(`<div class="vi-wbe-formula-container">
                    <div class="field">
                        <div>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find')}</div>
                        <select placeholder="" class="vi-wbe-find-string"> </select>
                    </div>
                    <div class="field">
                        <div>${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}</div>
                        <select placeholder="" class="vi-wbe-replace-string"> </select>
                    </div>
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}</button>
                    <p>If 'Find' value is empty, add to selected cells with 'Replace' value.</p>
                    <p>If 'Replace' value is empty, remove from selected cells with 'Find' value.</p>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            findString = form.find('.vi-wbe-find-string').val(),
            replaceString = form.find('.vi-wbe-replace-string').val(),
            excelObj = this.obj;

        if (!findString && !replaceString) return;

        let replace = this.searchData.filter((item) => item.id === +replaceString);

        let breakControl = false, records = [];
        let h = this.cells;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x];
                if (!value) value = [];
                let newValue = value.filter((item) => item.id !== +findString);

                if (value.length !== newValue.length || !findString) {
                    newValue.push(...replace);
                }

                newValue = newValue.filter((item, index, self) =>
                    index === self.findIndex((t) => (t.id === item.id && t.text === item.text))
                );

                records.push(excelObj.updateCell(x, y, newValue));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

}

/***/ }),

/***/ "./src/find-and-replace.js":
/*!*********************************!*\
  !*** ./src/find-and-replace.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FindAndReplace)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");



const $ = jQuery;
class FindAndReplace {
    constructor(obj, x, y, e) {
        this._data = {};
        this._data.jexcel = obj;
        this._data.x = parseInt(x);
        this._data.y = parseInt(y);
        this.run();
    }

    get(id) {
        return this._data[id] || '';
    }

    run() {
        let formulaHtml = this.content();
        let cell = $(`td[data-x=${this.get('x') || 0}][data-y=${this.get('y') || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);
        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
    }

    content() {
        return $(`<div class="vi-wbe-formula-container">
                    <div class="field">
                        <input type="text" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find')}" class="vi-wbe-find-string">
                    </div>
                    <div class="field">
                        <input type="text" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}" class="vi-wbe-replace-string">
                    </div>
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Replace')}</button>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            findString = form.find('.vi-wbe-find-string').val(),
            replaceString = form.find('.vi-wbe-replace-string').val(),
            excelObj = this.get('jexcel');

        if (!findString) return;

        let breakControl = false, records = [];
        let h = excelObj.selectedContainer;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x];
                let newValue = value.replaceAll(findString, replaceString);
                records.push(excelObj.updateCell(x, y, newValue));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

}

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ "./src/templates.js");



const $ = jQuery;
const _f = {
    setJexcel(obj) {
        this.jexcel = obj;
    },

    text(key) {
        return _attributes__WEBPACK_IMPORTED_MODULE_0__.I18n[key] || key;
    },

    isUrl: (url) => {
        return /^(http(s?):)\/\/.*\.(?:jpg|jpeg|gif|png|webp|avif)$/i.test(url);
    },

    formatText(cell, value) {
        let text = '';
        if (value.length) {
            for (let k = 0; k < value.length; k++) {
                if (value[k]) text += value[k].text + '; ';
            }
        }
        cell.innerText = text;
    },

    createEditor(cell, type, content = '', display = true) {
        let editor = document.createElement(type);

        if (type === 'div') {
            $(editor).append(content);
        }

        editor.style.minWidth = '300px';

        let popupHeight = $(editor).innerHeight(),
            stage = $(cell).offset(),
            x = stage.left,
            y = stage.top,
            cellWidth = $(cell).innerWidth(),
            info = cell.getBoundingClientRect();

        if (display) {
            editor.style.minHeight = (info.height - 2) + 'px';
            editor.style.maxHeight = (window.innerHeight - y - 50) + 'px';
        } else {
            editor.style.opacity = 0;
            editor.style.fontSize = 0;
        }

        editor.classList.add('vi-ui', 'segment', 'vi-wbe-cell-popup', 'vi-wbe-editing');
        cell.classList.add('editor');
        cell.appendChild(editor);

        let popupWidth = $(editor).innerWidth();

        if ($(this.jexcel.el).innerWidth() < x + popupWidth + cellWidth) {
            let left = x - popupWidth > 0 ? x - popupWidth : 10;
            $(editor).css('left', left + 'px');
        } else {
            $(editor).css('left', (x + cellWidth) + 'px');
        }

        if (window.innerHeight < y + popupHeight) {
            let h = y - popupHeight < 0 ? 0 : y - popupHeight;
            $(editor).css('top', h + 'px');
        } else {
            $(editor).css('top', y + 'px');
        }

        return editor;
    },

    createModal(data = {}) {
        let {actions} = data;
        let actionsHtml = '';

        if (Array.isArray(actions)) {
            for (let item of actions) {
                actionsHtml += `<span class="${item.class} vi-ui button tiny">${item.text}</span>`;
            }
        }

        return $(_templates__WEBPACK_IMPORTED_MODULE_1__["default"].modal({...data, actionsHtml}));
    },

    removeModal(cell) {
        $(cell).find('.vi-wbe-modal-container').remove();
        $('.select2-container--open').remove();
    },

    getColFromColumnType(colType) {
        return _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.idMappingFlip[colType] || '';
    },

    getProductTypeFromCell(cell) {
        let y = cell.getAttribute('data-y');
        let x = this.getColFromColumnType('product_type');
        return this.jexcel.options.data[y] ? this.jexcel.options.data[y][x] : null;
    },

    getProductTypeFromY(y) {
        let x = this.getColFromColumnType('product_type');
        return this.jexcel.options.data[y] ? this.jexcel.options.data[y][x] : null;
    },

    getReviewTypeFrom(y) {
        let x = this.getColFromColumnType('comment_type');
        return this.jexcel.options.data[y] ? this.jexcel.options.data[y][x] : null;
    },

    getColumnType(x) {
        return _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.idMapping[x]
    },

    stripHtml(content) {
        return $(`<div>${content}</div>`).text();
    },

    getDataFromCell(obj, cell) {
        let y = cell.getAttribute('data-y'),
            x = cell.getAttribute('data-x');
        return obj.options.data[y][x];
    },

    getProductIdOfCell(obj, target) {
        if (typeof target === 'object') {
            let y = target.getAttribute('data-y');
            return obj.options.data[y][0];
        } else {
            return obj.options.data[target][0];
        }
    },

    ajax(args = {}) {
        let options = Object.assign({
            url: wbeParams.ajaxUrl,
            type: 'post',
            dataType: 'json',
        }, args);

        options.data.action = 'vi_wbe_ajax';
        options.data.vi_wbe_nonce = wbeParams.nonce;
        options.data.type = wbeParams.editType;
        $.ajax(options);
    },

    pagination(maxPage, currentPage) {
        currentPage = parseInt(currentPage);
        maxPage = parseInt(maxPage);
        let pagination = '',
            previousArrow = `<a class="item ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}"><i class="icon angle left"> </i></a>`,
            nextArrow = `<a class="item ${currentPage === maxPage ? 'disabled' : ''}" data-page="${currentPage + 1}"><i class="icon angle right"> </i></a>`,
            goToPage = `<input type="number" class="vi-wbe-go-to-page" value="${currentPage}" min="1" max="${maxPage}"/>`;

        for (let i = 1; i <= maxPage; i++) {
            if ([1, currentPage - 1, currentPage, currentPage + 1, maxPage].includes(i)) {
                pagination += `<a class="item ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
            if (i === currentPage - 2 && currentPage - 2 > 1) pagination += `<a class="item disabled">...</a>`;
            if (i === currentPage + 2 && currentPage + 2 < maxPage) pagination += `<a class="item disabled">...</a>`;
        }

        return `<div class="vi-ui pagination menu">${previousArrow} ${pagination} ${nextArrow} </div> ${goToPage}`;
    },

    spinner() {
        return $('<span class="vi-wbe-spinner"><span class="vi-wbe-spinner-inner"> </span></span>')
    },

    is_loading() {
        return !!this._spinner;
    },

    loading() {
        this._spinner = this.spinner();
        $('.vi-wbe-menu-bar-center').html(this._spinner);
    },

    removeLoading() {
        this._spinner = null;
        $('.vi-wbe-menu-bar-center').html('');
    },

    notice(text, color = 'black') {
        let content = $(`<div class="vi-wbe-notice" style="color:${color}">${text}</div>`);
        $('.vi-wbe-menu-bar-center').html(content);
        setTimeout(function () {
            content.remove();
        }, 5000);
    },

    generateCouponCode() {
        let $result = '';
        for (var i = 0; i < _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.couponGenerate.char_length; i++) {
            $result += _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.couponGenerate.characters.charAt(
                Math.floor(Math.random() * _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.couponGenerate.characters.length)
            );
        }
        $result = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.couponGenerate.prefix + $result + _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.couponGenerate.suffix;
        return $result;
    },

    htmlEncode(str) {
        return str.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g,"&apos;");
    },

    showMessage({title = '', message = '', type = 'positive', duration = 3000}) {
    const main = $( "#vi-wbe-container" ).find( "#vi-hui-toast" );
    if ( main.get(0) ) {
        const toast = $( "<div></div>" );
        const autoRemoveToast = setTimeout( function () {
            main.find( ".vi-ui.message" ).remove();
        }, duration + 1000 );

        toast.on( "click", ".icon.close", function (e) {
            main.find( ".vi-ui.message" ).remove();
            clearTimeout( autoRemoveToast );
        } );

        if ( main.children().length > 0 ) {
            main.find( ".vi-hui-toast" ).first().remove();
            clearTimeout( autoRemoveToast );
        }
        const delay = (duration / 1000).toFixed(2);

        if ($('html').attr('dir') === 'rtl') {
            toast.css( { "animation": `slideInRight ease .3s, fadeOut linear 1s ${delay}s forwards` } );
        } else {
            toast.css( { "animation": `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards` } );
        }

        toast.addClass( `vi-ui ${type} message` );
        toast.html(
            `<i class="close icon"></i>
                          <div class="header">
                            ${title}
                          </div>
                          <p>${message}</p>`
        );

        if ( main.children().length > 0 ) {
            let firstEleType = main.find( ".vi-ui.message" ).first().attr( "class" ).split(/\s+/)[1];
            if ( type !== firstEleType ) {
                main.append( toast );
            }
        }else {
            main.append( toast );
        }
    }
}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_f);

/***/ }),

/***/ "./src/modal-popup.js":
/*!****************************!*\
  !*** ./src/modal-popup.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   Popup: () => (/* binding */ Popup)
/* harmony export */ });
const $ = jQuery;

class Modal {
    constructor() {

    }
}

let popupInstance = null;

class Popup {
    constructor(content, cell) {
        if (!popupInstance) {
            $('body').on('mousedown keydown', this.mousedown);
        }

        popupInstance = this;

        this.popup = $('.vi-wbe-context-popup');

        this.render(content, $(cell));
    }

    mousedown(e) {
        let thisTarget = $(e.target),
            popup = $('.vi-wbe-context-popup');

        if (e.which === 27
            || !thisTarget.hasClass('vi-wbe-context-popup')
            && thisTarget.closest('.vi-wbe-context-popup').length === 0
            && popup.hasClass('vi-wbe-popup-active')
            && !thisTarget.hasClass('select2-search__field')
        ) {
            popup.empty().removeClass('vi-wbe-popup-active');
            $('.select2-container.select2-container--default.select2-container--open').remove();
        }
    }

    render(content, cell) {
        let {popup} = this,
            stage = cell.offset(),
            x = stage.left,
            y = stage.top,
            cellWidth = cell.innerWidth();

        popup.empty();
        popup.addClass('vi-wbe-popup-active').html(content);

        let popupWidth = popup.innerWidth(),
            popupHeight = popup.innerHeight();

        if (window.innerWidth < x + popupWidth + cellWidth) {
            let left = x - popupWidth > 0 ? x - popupWidth : 10;
            popup.css('left', left + 'px');
        } else {
            popup.css('left', (x + cellWidth) + 'px');
        }

        let windowInnerHeight = $('#vi-wbe-editor').innerHeight();
        if (windowInnerHeight < y + popupHeight) {
            let h = y - popupHeight < 0 ? 0 : y - popupHeight;
            popup.css('top', h + 'px');
        } else {
            popup.css('top', y + 'px');
        }
    }

    hide() {
        this.popup.removeClass('vi-wbe-popup-active');
    }
}



/***/ }),

/***/ "./src/multiple-product-attributes.js":
/*!********************************************!*\
  !*** ./src/multiple-product-attributes.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MultipleProductAttributes)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");



const $ = jQuery;

class MultipleProductAttributes {
    constructor(obj, cells, x, y, e) {
        this.cells = cells;
        this.obj = obj;
        this.x = parseInt(x);
        this.y = parseInt(y);

        this.run();
    }

    run() {
        let cell = $(`td[data-x=${this.x || 0}][data-y=${this.y || 0}]`);

        let $this = this, html = '';

        let modal = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].createModal({
            header: _functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Attributes'),
            content: '',
            actions: [{class: 'save-attributes', text: _functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Apply')}],
        });

        this.content(modal);
        $(cell).append(modal);

        modal.on('click', function (e) {
            let thisTarget = $(e.target);
            if (thisTarget.hasClass('close') || thisTarget.hasClass('vi-wbe-modal-container')) modal.remove();
            if (thisTarget.hasClass('save-attributes')) {
                $this.addAttributes(modal);
            }
        });
    }

    addImage(imgId) {

        let excelObj = this.obj;
        let breakControl = false, records = [];
        let h = this.cells;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                let value = excelObj.options.data[y][x];
                if (!value) value = [];

                let newValue = [...new Set(value)];
                newValue.push(imgId);

                records.push(excelObj.updateCell(x, y, newValue));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

    addAttributes(modal) {
        let newAttributes = [],
            addAttrOpt = modal.find('.vi-wbe-add-attributes-option').val();

        modal.find('.vi-wbe-attribute-row').each(function (i, row) {
            let pAttr = $(row).data('attr');
            if (pAttr.is_taxonomy) {
                pAttr.options = $(row).find('select').val().map(Number);
            } else {
                pAttr.name = $(row).find('input.custom-attr-name').val();
                let value = $(row).find('textarea.custom-attr-val').val();
                pAttr.value = value.trim().replace(/\s+/g, ' ');
                pAttr.options = value.split('|').map(item => item.trim().replace(/\s+/g, ' '));
            }
            pAttr.visible = !!$(row).find('.attr-visibility:checked').length;
            pAttr.variation = !!$(row).find('.attr-variation:checked').length;
            pAttr.position = i;
            newAttributes.push(pAttr)
        });

        if (newAttributes.length) {
            let excelObj = this.obj;
            let breakControl = false, records = [];
            let h = this.cells;
            let start = h[1], end = h[3], x = h[0];

            const findExist = (productAttrs = [], attrName) => {
                if (productAttrs.length) {
                    for (let index in productAttrs) {
                        let attr = productAttrs[index];
                        if (attr.name === attrName) {
                            return index;
                        }
                    }
                }
                return false;
            };

            for (let y = start; y <= end; y++) {
                if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false && excelObj.options.data[y][1] === 0) {
                    let value = excelObj.options.data[y][x];
                    if (!value) value = [];
                    let newValue = [...new Set(value)];
                    let positionIndex = 0;

                    for (let attr of newAttributes) {
                        let attrName = attr.name;
                        let key = findExist(newValue, attrName);

                        if (key === false) {
                            attr.position = newValue.length + positionIndex++;
                            // positionIndex++;
                            newValue.push(attr);
                        } else {
                            switch (addAttrOpt) {
                                case 'replace':
                                    attr.position = newValue[key].position;
                                    newValue[key] = attr;
                                    break;

                                case 'merge_terms':
                                    let currentTerms = newValue[key].options || [];
                                    let newTerms = attr.options || [];
                                    let terms = [...currentTerms, ...newTerms];
                                    newValue[key].options = [...new Set(terms)];
                                    excelObj.dispatch('onchange', excelObj.ele, (excelObj.records[y] && excelObj.records[y][x] ? excelObj.records[y][x] : null), x, y, 1, 0);
                                    break;
                            }
                        }
                    }

                    records.push(excelObj.updateCell(x, y, newValue));
                    excelObj.updateFormulaChain(x, y, records);
                }
            }

            // Update history
            excelObj.setHistory({
                action: 'setValue',
                records: records,
                selection: excelObj.selectedCell,
            });

            // Update table with custom configuration if applicable
            excelObj.updateTable();
        }
        modal.remove();
    }

    content(modal) {
        let $this = this, html = '';

        let {attributes} = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes;
        let addAttribute = `<option value="">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Custom product attribute')}</option>`;

        for (let attr in attributes) {
            addAttribute += `<option value="${attr}">${attributes[attr].data.attribute_label}</option>`;
        }

        addAttribute = `<div class="vi-wbe-taxonomy-header">
                            <select class="vi-wbe-select-taxonomy">${addAttribute}</select>
                            <span class="vi-ui button tiny vi-wbe-add-taxonomy">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Add')}</span>
                        </div>`;

        html = `${addAttribute}
                <table class="vi-ui celled table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attributes</th>
                        <th width="1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>${html}</tbody>
                </table>`;

        let addAttributeOptions = `<div>
                                        <div class="vi-wbe-add-attributes-option-label">
                                            Select action if exist attribute in product
                                        </div>
                                        <select class="vi-wbe-add-attributes-option">
                                            <option value="none">Don't add</option>
                                            <option value="replace">Replace existed attribute</option>
                                            <option value="merge_terms">Merge terms</option>
                                        </select>
                                    </div>`;

        modal.find('.content').append(html);
        modal.find('.actions').append(addAttributeOptions);
        modal.find('table select').select2({multiple: true});
        modal.find('tbody').sortable({
            items: 'tr',
            cursor: 'move',
            axis: 'y',
            scrollSensitivity: 40,
            forcePlaceholderSize: true,
            helper: 'clone',
            handle: '.icon.move',
        });

        const setOptionDisable = () => {
            modal.find('select.vi-wbe-select-taxonomy option').removeAttr('disabled');
            modal.find('input[type=hidden]').each(function (i, el) {
                let tax = $(el).val();
                modal.find(`select.vi-wbe-select-taxonomy option[value='${tax}']`).attr('disabled', 'disabled');
            });
        };

        setOptionDisable();

        modal.on('click', function (e) {
            let $thisTarget = $(e.target);
            if ($thisTarget.hasClass('trash')) {
                $thisTarget.closest('tr').remove();
                setOptionDisable();
            }

            if ($thisTarget.hasClass('vi-wbe-add-taxonomy')) {
                let taxSelect = $('.vi-wbe-select-taxonomy'), tax = taxSelect.val(),
                    item = {name: tax, options: []};
                if (tax) item.is_taxonomy = 1;

                let row = $($this.createRowTable(item));
                modal.find('table tbody').append(row);
                row.find('select').select2({multiple: true});
                setOptionDisable();
                taxSelect.val('').trigger('change');
            }

            if ($thisTarget.hasClass('vi-wbe-select-all-attributes')) {
                let td = $thisTarget.closest('td');
                let select = td.find('select');
                select.find('option').attr('selected', true);
                select.trigger('change');
            }

            if ($thisTarget.hasClass('vi-wbe-select-no-attributes')) {
                let td = $thisTarget.closest('td');
                let select = td.find('select');
                select.find('option').attr('selected', false);
                select.trigger('change');
            }

            if ($thisTarget.hasClass('vi-wbe-add-new-attribute')) {
                let newAttr = prompt(_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Enter a name for the new attribute term:'));

                if (!newAttr) return;

                let tr = $thisTarget.closest('tr.vi-wbe-attribute-row'),
                    taxAttr = tr.attr('data-attr');

                if (taxAttr) {
                    taxAttr = JSON.parse(taxAttr);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
                        data: {
                            sub_action: 'add_new_attribute',
                            taxonomy: taxAttr.name,
                            term: newAttr
                        },
                        beforeSend() {
                            $thisTarget.addClass('loading')
                        },
                        success(res) {
                            if (res.success) {
                                let select = tr.find('select');
                                select.append(`<option value="${res.data.term_id}" selected>${res.data.name}</option>`);
                                select.trigger('change');
                                _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.attributes[taxAttr.name].terms[res.data.term_id] = {slug: res.data.slug, text: res.data.name}
                            } else {
                                alert(res.data.message)
                            }
                        },
                        complete() {
                            $thisTarget.removeClass('loading');
                        }
                    });
                }
            }
        });
    }

    createRowTable(item) {
        let attrName = '', value = '';

        if (item.is_taxonomy) {
            let attribute = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.attributes[item.name],
                terms = attribute.terms || [], options = '';

            attrName = `${attribute.data.attribute_label}<input type="hidden" value="${item.name}"/>`;

            if (Object.keys(terms).length) {
                for (let id in terms) {
                    let selected = item.options.includes(parseInt(id)) ? 'selected' : '';
                    options += `<option value="${id}" ${selected}>${terms[id].text}</option>`;
                }
            }

            value = `<select multiple>${options}</select>
                    <div class="vi-wbe-attributes-button-group">
                        <span class="vi-ui button mini vi-wbe-select-all-attributes">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Select all')}</span>
                        <span class="vi-ui button mini vi-wbe-select-no-attributes">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Select none')}</span>
                        <span class="vi-ui button mini vi-wbe-add-new-attribute">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Add new')}</span>
                    </div>`;
        } else {
            attrName = `<input type="text" class="custom-attr-name" value="${item.name}" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Custom attribute name')}"/>`;
            value = `<textarea class="custom-attr-val" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Enter some text, or some attributes by "|" separating values.')}">${item.value || ''}</textarea>`;
        }

        attrName = `<div class="vi-wbe-attribute-name-label">${attrName}</div>`;

        attrName += `<div>
                        <input type="checkbox" class="attr-visibility" ${item.visible ? 'checked' : ''} value="1">
                        <label>${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Visible on the product page')}</label>
                    </div>`;

        attrName += `<div>
                        <input type="checkbox" class="attr-variation" ${item.variation ? 'checked' : ''} value="1">
                        <label>${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Used for variations (apply for variable)')}</label>
                    </div>`;

        return `<tr class="vi-wbe-attribute-row" data-attr='${JSON.stringify(item)}'>
                    <td class="vi-wbe-left">${attrName}</td>
                    <td>${value}</td>
                    <td class="vi-wbe-right"><i class="icon trash"> </i> <i class="icon move"> </i></td>
                </tr>`;
    }

}

/***/ }),

/***/ "./src/purify.js":
/*!***********************!*\
  !*** ./src/purify.js ***!
  \***********************/
/***/ (function(module) {

/*! @license DOMPurify 3.0.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.2/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object; // eslint-disable-line import/no-mutable-exports

  let {
    apply,
    construct
  } = typeof Reflect !== 'undefined' && Reflect;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return new Func(...args);
    };
  }

  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /* Add properties to a lookup table */

  function addToSet(set, array, transformCaseFunc) {
    transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;

    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    let l = array.length;

    while (l--) {
      let element = array[l];

      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /* Shallow clone an object */

  function clone(object) {
    const newObject = create(null);

    for (const [property, value] of entries(object)) {
      newObject[property] = value;
    }

    return newObject;
  }
  /* This method automatically checks if the prop is function
   * or getter and behaves accordingly. */

  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);

      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.

  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']); // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.

  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  const DOCTYPE_NAME = seal(/^html$/i);

  var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    ERB_EXPR: ERB_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR,
    DATA_ATTR: DATA_ATTR,
    ARIA_ATTR: ARIA_ATTR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    DOCTYPE_NAME: DOCTYPE_NAME
  });

  const getGlobal = () => typeof window === 'undefined' ? null : window;
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */


  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';

    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },

        createScriptURL(scriptUrl) {
          return scriptUrl;
        }

      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    const DOMPurify = root => createDOMPurify(root);
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '3.0.2';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    const originalDocument = window.document;
    let {
      document
    } = window;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    const trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

    const emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document;
    const {
      importNode
    } = originalDocument;
    let hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined';
    const {
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    /* Allowed attribute names */

    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */

    let CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    let FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    let FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    let ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    let ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    let ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */

    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    let SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    let WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    let SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    let FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    let RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    let RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */

    let RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */

    let SANITIZE_DOM = true;
    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */

    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
    /* Keep element content when removing element? */

    let KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    let IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    let USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */

    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    /* Allowed XHTML+XML namespaces */

    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    /* Parsing of strict XHTML documents */

    let PARSER_MEDIA_TYPE;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc;
    /* Keep a reference to config to pass to hooks */

    let CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    const formElement = document.createElement('form');

    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity


    const _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */


      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
      /* Set configuration parameters */

      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = 'ALLOWED_NAMESPACES' in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [...text]);
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }

      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }

        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.

    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */

    const ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    const ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
    /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */

    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.

      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }

      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);

      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        } // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.


        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        } // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.


        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        } // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points


        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        } // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.


        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        } // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace


        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      } // For XHTML and XML documents that support custom namespaces


      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      } // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.


      return false;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        node.remove();
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    const _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc;
      let leadingWhitespace;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }

      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */

      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);

        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {// Syntax error if dirtyPayload is invalid xml
        }
      }

      const body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }

      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */


    const _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    const _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };
    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    const _isNode = function _isNode(object) {
      return typeof Node === 'object' ? object instanceof Node : object && typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    const _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */


    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      const tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */


      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
        }
        /* Keep content except for bad-listed elements */


        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            const childCount = childNodes.length;

            for (let i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Check whether element has a valid namespace */


      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Make sure that older browsers don't get noscript mXSS */


      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR, ' ');
        content = stringReplace(content, ERB_EXPR, ' ');
        content = stringReplace(content, TMPLIT_EXPR, ' ');

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */

      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };
    /**
     * _basicCustomElementCheck
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     * @param {string} tagName name of the tag of the node to sanitize
     */


    const _basicCustomElementTest = function _basicCustomElementTest(tagName) {
      return tagName.indexOf('-') > 0;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */


    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      let attr;
      let value;
      let lcName;
      let l;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeAttributes', currentNode, null);

      const {
        attributes
      } = currentNode;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        attr = attributes[l];
        const {
          name,
          namespaceURI
        } = attr;
        value = name === 'value' ? attr.value : stringTrim(attr.value);
        lcName = transformCaseFunc(name);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */


        _removeAttribute(name, currentNode);
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR, ' ');
          value = stringReplace(value, ERB_EXPR, ' ');
          value = stringReplace(value, TMPLIT_EXPR, ' ');
        }
        /* Is `value` valid for this attribute? */


        const lcTag = transformCaseFunc(currentNode.nodeName);

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */


        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode); // Prefix the value and later re-create the attribute with the sanitized value


          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        /* Handle attributes that require Trusted Types */


        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                value = trustedTypesPolicy.createHTML(value);
                break;

              case 'TrustedScriptURL':
                value = trustedTypesPolicy.createScriptURL(value);
                break;
            }
          }
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      let shadowNode;

      const shadowIterator = _createIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body;
      let importedNode;
      let currentNode;
      let returnNode;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      IS_EMPTY_INPUT = !dirty;

      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }
      /* Return dirty HTML if DOMPurify cannot run */


      if (!DOMPurify.isSupported) {
        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);

          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */


      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      const nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);
      }
      /* If we sanitized `dirty` in-place, return it. */


      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */

      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */


      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR, ' ');
        serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./src/remove-product-attributes.js":
/*!******************************************!*\
  !*** ./src/remove-product-attributes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RemoveProductAttributes)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");



const $ = jQuery;

class RemoveProductAttributes {
    constructor(obj, cells, x, y, e) {
        this.cells = cells;
        this.obj = obj;
        this.x = parseInt(x);
        this.y = parseInt(y);

        this.run();
    }

    run() {
        let cell = $(`td[data-x=${this.x || 0}][data-y=${this.y || 0}]`);

        let $this = this;

        let modal = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].createModal({
            header: _functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Remove attributes'),
            content: '',
            actions: [{class: 'save-attributes', text: _functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Apply')}],
        });

        this.content(modal);
        $(cell).append(modal);

        modal.on('click', function (e) {
            let thisTarget = $(e.target);
            if (thisTarget.hasClass('close') || thisTarget.hasClass('vi-wbe-modal-container')) modal.remove();
            if (thisTarget.hasClass('save-attributes')) {
                // $this.addAttributes(modal);
                $this.removeAttributes(modal);
            }
        });
    }

    removeAttributes(modal) {
        let removeAttributes = modal.find('.vi-wbe-select-taxonomy').dropdown('get values');

        if (removeAttributes.length) {
            let excelObj = this.obj;
            let breakControl = false, records = [];
            let h = this.cells;
            let start = h[1], end = h[3], x = h[0];

            for (let y = start; y <= end; y++) {
                if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                    let value = excelObj.options.data[y][x];

                    if (!value || !Array.isArray(value)) continue;

                    let newValue = value.filter(attr => {
                        return !removeAttributes.includes(attr.name);
                    });

                    records.push(excelObj.updateCell(x, y, newValue));
                    excelObj.updateFormulaChain(x, y, records);
                }
            }

            // Update history
            excelObj.setHistory({
                action: 'setValue',
                records: records,
                selection: excelObj.selectedCell,
            });

            // Update table with custom configuration if applicable
            excelObj.updateTable();
        }
        modal.remove();
    }

    content(modal) {
        let {attributes} = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes;
        let addAttribute = `<option value="">${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Select attributes to remove')}</option>`;

        for (let attr in attributes) {
            addAttribute += `<option value="${attr}">${attributes[attr].data.attribute_label}</option>`;
        }

        let html = `<div class="vi-wbe-taxonomy-header">
                        <select class="vi-wbe-select-taxonomy fluid vi-ui selection" multiple>${addAttribute}</select>
                    </div>`;

        modal.find('.content').append(html);
        modal.find('table select').select2({multiple: true});
        modal.find('tbody').sortable({
            items: 'tr',
            cursor: 'move',
            axis: 'y',
            scrollSensitivity: 40,
            forcePlaceholderSize: true,
            helper: 'clone',
            handle: '.icon.move',
        });

        modal.find('.vi-wbe-select-taxonomy').dropdown();
    }

}

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sidebar: () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");



const $ = jQuery;

const Sidebar = {
    init() {
        $('.vi-ui.menu .item').vi_tab();
        $('.bulky-sort-fields-accordion').vi_accordion();
        $('#bulky-sort-fields').sortable({axis: "y", containment: "parent"});

        this.revision = {};
        this.sidebar = $('#vi-wbe-sidebar');
        this.historyBodyTable = $('#vi-wbe-history-points-list tbody');

        this.sidebar.on('click', '.vi-wbe-apply-filter', this.applyFilter.bind(this));
        this.sidebar.on('click', '.vi-wbe-filter-label', this.filterInputLabelFocus);
        this.sidebar.on('focus', '.vi-wbe-filter-input', this.filterInputFocus);
        this.sidebar.on('blur', '.vi-wbe-filter-input', this.filterInputBlur);
        this.sidebar.on('click', '.vi-wbe-get-meta-fields', this.getMetaFields.bind(this));
        this.sidebar.on('click', '.vi-wbe-save-meta-fields:not(.loading)', this.saveMetaFields.bind(this));
        this.sidebar.on('click', '.vi-wbe-add-new-meta-field', this.addNewMetaField.bind(this));
        this.sidebar.find('table.vi-wbe-meta-fields-container tbody').sortable({axis: 'y',});
        this.sidebar.find('table.vi-wbe-meta-fields-container').on('click', '.vi-wbe-remove-meta-row', this.removeMetaRow);

        this.sidebar.on('click', '.vi-wbe-save-taxonomy-fields:not(.loading)', this.saveTaxonomyFields);

        this.sidebar.on('click', '.vi-wbe-save-settings', this.saveSettings.bind(this));

        this.sidebar.on('click', '.vi-wbe-view-history-point', this.viewHistoryPoint.bind(this));
        this.sidebar.on('click', '.vi-wbe-recover', this.recover.bind(this));
        this.sidebar.on('click', '.vi-wbe-revert-this-point', this.revertAllProducts.bind(this));
        this.sidebar.on('click', '.vi-wbe-revert-this-key', this.revertProductAttribute.bind(this));
        this.sidebar.on('click', '.vi-wbe-pagination a.item', this.changePage.bind(this));
        this.sidebar.on('change', '.vi-wbe-go-to-page', this.changePageByInput.bind(this));
        this.sidebar.on('click', '.vi-wbe-multi-select-clear', this.clearMultiSelect);

        this.sidebar.on('change', '.vi-wbe-meta-column-type', this.metaFieldChangeType);
        this.sidebar.on('keyup', '.vi-wbe-search-metakey', this.searchMetaKey);
        this.filter();
        this.settings();
        this.metafields();
        this.history();

        return this.sidebar;
    },

    filter() {
        let filterForm = $('#vi-wbe-products-filter'),
            filterInput = $('.vi-wbe-filter-input'),
            cssTop = {top: -2},
            cssMiddle = {top: '50%'};
        filterInput.each((i, el) => {
            if ($(el).val()) $(el).parent().prev().css(cssTop);
        });

        filterInput.on('focus', function () {
            let label = $(this).prev();
            label.css(cssTop);
            $(this).on('blur', function () {
                if (!$(this).val()) label.css(cssMiddle);
            })
        });

        this.sidebar.on('click', '.vi-wbe-filter-label', function () {
            $(this).next().trigger('focus');
        });

        let compactFilter = filterForm.find('.vi-ui.compact.dropdown').dropdown();
        filterForm.find('.vi-wbe.vi-ui.dropdown:not(.vi-wbe-filter-select2)').dropdown({clearable: true, fullTextSearch: true});
        filterForm.find('.vi-wbe.vi-ui.dropdown.vi-wbe-filter-select2').each(function (k,v){
            let tmp_placeholder = $(v).data('placeholder'),taxonomy_type = $(v).attr('id').replace('vi-wbe-','');
            $(v).select2({
                placeholder: tmp_placeholder,
                closeOnSelect: false,
                multiple: true,
                minimumInputLength: 2,
                ajax: {
                    url: wbeParams.ajaxUrl,
                    dataType: 'json',
                    type: "POST",
                    quietMillis: 50,
                    delay: 250,
                    data: function (params) {
                        return {
                            action: 'vi_wbe_ajax',
                            vi_wbe_nonce: wbeParams.nonce,
                            sub_action: 'search_taxonomy',
                            taxonomy_type: taxonomy_type,
                            search: params.term
                        };
                    },
                    processResults: function (data) {
                        return {results: data};
                    },
                },
            });
        });

        this.sidebar.on('click', '.vi-wbe-clear-filter', function () {
            $('.vi-wbe-filter-label').css(cssMiddle);
            filterInput.val('');
            filterForm.find('div.vi-wbe.vi-ui.dropdown').dropdown('clear');
            filterForm.find('select.vi-wbe.vi-ui.dropdown').val(null).trigger('change');
            compactFilter.find('.menu .item:first').trigger('click');
        });

        this.sidebar.on('change', '#vi-wbe-has_expire_date', function () {
            let expireDateGroup = $('.vi-wbe-expire-date-group');
            $(this).val() === 'yes' ? expireDateGroup.show() : expireDateGroup.hide();
        });

        this.sidebar.find('#vi-wbe-has_expire_date').trigger('change')
    },

    settings() {
        let settingsForm = $('.vi-wbe-settings-tab');
        settingsForm.find('select.dropdown').dropdown();
    },

    metafields() {
        this.renderMetaFieldsTable(_attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.metaFields);
    },

    history() {
        this.pagination(1);
        // this.saveRevision();
    },

    pagination(currentPage, maxPage = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.historyPages) {
        this.sidebar.find('.vi-wbe-pagination').html(_functions__WEBPACK_IMPORTED_MODULE_1__["default"].pagination(maxPage, currentPage));
    },

    applyFilter(e) {
        let $this = this, thisBtn = $(e.target);

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {
                sub_action: 'add_filter_data',
                filter_data: $('#vi-wbe-products-filter').serialize(),
                filter_key: _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.filterKey
            },
            beforeSend() {
                thisBtn.addClass('loading');
            },
            success(res) {
                $this.sidebar.trigger('afterAddFilter', [res.data]);
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showMessage( {title:"Success", message: 'Filtered successfully', type: "positive", duration: 3000} );
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    limitProductPerPage() {
        let value = $(this).val();
        if (value > 50) $(this).val(50);
        if (value < 0) $(this).val(0);
    },

    saveSettings(e) {
        let $this = this, thisBtn = $(e.target);

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {
                sub_action: 'save_settings',
                fields: $('form.vi-wbe-settings-tab').serialize()
            },
            beforeSend() {
                thisBtn.addClass('loading')
            },
            success(res) {
                if (res.success) {
                    _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.settings = res.data.settings;
                    // clearInterval($this.autoSaveRevision);
                    // $this.saveRevision();
                    $this.sidebar.trigger('afterSaveSettings', [res.data]);
                }
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading')
            }
        });
    },

    filterInputLabelFocus() {
        $(this).next().find('input').trigger('focus');
    },

    filterInputFocus() {
        $(this).parent().prev().css({top: -2});
    },

    filterInputBlur() {
        if (!$(this).val()) $(this).parent().prev().css({top: '50%'});
    },

    getMetaFields(e) {
        let $this = this, thisBtn = $(e.target);

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'get_meta_fields', current_meta_fields: $this.getCurrentMetaFields()},
            beforeSend() {
                thisBtn.addClass('loading');
            },
            success(res) {
                $this.renderMetaFieldsTable(res.data);
                _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.metaFields = res.data;
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    renderMetaFieldsTable(data) {
        let html = '';

        for (let metaKey in data) {
            html += this.renderRow(metaKey, data);
        }

        $('.vi-wbe-meta-fields-container tbody').html(html);
    },

    renderRow(metaKey, data) {
        let meta = data[metaKey] || {},
            optionHtml = '',
            inputType = meta.input_type || '',
            options = {
                textinput: 'Text input',
                texteditor: 'Text editor',
                numberinput: 'Number input',
                array: 'Array',
                json: 'JSON',
                checkbox: 'Checkbox',
                calendar: 'Calendar',
                image: 'Image',
                select: 'Select',
                multiselect: 'Multiselect',
                gallery: 'Gallery',
            },
            metaValue = meta.meta_value || '',
            shortValue = metaValue.slice(0, 15),
            fullValueHtml = metaValue.length > 16 ? `<div class="vi-wbe-full-meta-value">${metaValue}</div>` : '',
            selectSource = '';

        for (let optionValue in options) {
            optionHtml += `<option value="${optionValue}" ${optionValue === inputType ? 'selected' : ''}>${options[optionValue]}</option>`;
        }

        shortValue += shortValue.length < metaValue.length ? '...' : '';

        if (inputType === 'select' || inputType === 'multiselect') {
            selectSource += `<textarea class="vi-wbe-select-options">${meta.select_options}</textarea>`
        }

        return `<tr>
                    <td class="vi-wbe-meta-key">${metaKey}</td>
                    <td><input type="text" class="vi-wbe-meta-column-name" value="${meta.column_name || ''}"></td>
                    <td>
                        <div class="vi-wbe-display-meta-value">
                            <div class="vi-wbe-short-meta-value">${shortValue}</div>
                            ${fullValueHtml}
                        </div>
                    </td>
                    <td>
                        <select class="vi-wbe-meta-column-type">${optionHtml}</select>
                        ${selectSource}
                    </td>
                    <td class="vi-wbe-meta-field-active-column">
                        <div class="vi-ui toggle checkbox">
                          <input type="checkbox" class="vi-wbe-meta-column-active" ${parseInt(meta.active) ? 'checked' : ''}>
                          <label> </label>
                        </div>  
                    </td>
                    <td>
                        <div class="vi-wbe-meta-field-actions">
                            <span class="vi-ui button basic mini vi-wbe-remove-meta-row"><i class="icon trash"> </i></span>
                            <span class="vi-ui button basic mini"><i class="icon move"> </i></span>
                        </div>
                    </td>
                </tr>`;
    },

    metaFieldChangeType() {
        let selectTypeOptions = $('<textarea class="vi-wbe-select-options"></textarea>');
        let val = $(this).val();
        let siblings = $(this).siblings();
        if (val === 'select' || val === 'multiselect') {
            if (!siblings.length) $(this).after(selectTypeOptions);
        } else {
            siblings.remove();
        }
    },

    searchMetaKey() {
        let filter = $(this).val().toLowerCase();
        $('.vi-wbe-meta-fields-container tbody tr').each(function (i, tr) {
            let metaKey = $(tr).find('.vi-wbe-meta-key').text().trim().toLowerCase();
            if (metaKey.indexOf(filter) > -1) {
                $(tr).show();
            } else {
                $(tr).hide();
            }
        });
    },

    saveMetaFields(e) {
        let thisBtn = $(e.target);

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'save_meta_fields', meta_fields: this.getCurrentMetaFields()},
            beforeSend() {
                thisBtn.addClass('loading');
            },
            success(res) {
                if ( false === res.success ) {
                    alert( res.data.message );
                }else {
                    location.reload();
                }
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    getCurrentMetaFields() {
        let meta_fields = {};
        let metaArr = _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.metaFields;
        $('table.vi-wbe-meta-fields-container tbody tr').each(function (i, row) {
            let metaKey = $(row).find('.vi-wbe-meta-key').text();
            meta_fields[metaKey] = {
                column_name: $(row).find('.vi-wbe-meta-column-name').val(),
                input_type: $(row).find('.vi-wbe-meta-column-type').val(),
                active: $(row).find('.vi-wbe-meta-column-active:checked').length,
                meta_value: metaArr[metaKey] ? metaArr[metaKey].meta_value : '',
                select_options: $(row).find('.vi-wbe-select-options').val(),
            };
        });

        return meta_fields;
    },

    addNewMetaField(e) {
        let input = $(e.currentTarget).prev(),
            metaKey = input.val(),
            validate = metaKey.match(/^[\w\d_-]*$/g);

        if (!metaKey || !validate || _attributes__WEBPACK_IMPORTED_MODULE_0__.Attributes.metaFields[metaKey]) return;

        let newRow = this.renderRow(metaKey, {});
        if (newRow) {
            input.val('');
            $('table.vi-wbe-meta-fields-container tbody').append(newRow);
        }
    },

    removeMetaRow() {
        $(this).closest('tr').remove();
    },

    saveTaxonomyFields(e) {
        let thisBtn = $(e.target);
        let taxonomyFields = [];

        $('table.vi-wbe-taxonomy-fields .vi-wbe-taxonomy-active:checked').each(function (i, row) {
            let taxKey = $(this).closest('tr').find('.vi-wbe-taxonomy-key').text();
            taxonomyFields.push(taxKey);
        });

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'save_taxonomy_fields', taxonomy_fields: taxonomyFields},
            beforeSend() {
                thisBtn.addClass('loading');
            },
            success(res) {
                thisBtn.removeClass('loading');
                location.reload();
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });

    },

    viewHistoryPoint(e) {
        let thisBtn = $(e.currentTarget),
            historyiD = thisBtn.data('id'),
            $this = this;

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'view_history_point', id: historyiD},
            beforeSend() {
                thisBtn.addClass('loading');
            },
            success(res) {
                if (res.success && res.data) {
                    let products = res.data.compare;
                    let html = '';
                    for (let id in products) {
                        let item = products[id];
                        html += `<div class="vi-wbe-history-product" data-product_id="${id}">
                                        <div class="title">
                                            <i class="dropdown icon"></i>
                                            ${item.name}
                                            <span class="vi-ui button mini basic vi-wbe-revert-this-product">
                                                <i class="icon undo"> </i>
                                            </span>
                                            
                                        </div>`;

                        let table = '';
                        for (let key in item.fields) {
                            let currentVal = typeof item.current[key] === 'string' ? item.current[key] : JSON.stringify(item.current[key]);
                            let historyVal = typeof item.history[key] === 'string' ? item.history[key] : JSON.stringify(item.history[key]);
                            table += `<tr>
                                            <td>${item.fields[key]}</td>
                                            <td>${currentVal}</td>
                                            <td>${historyVal}</td>
                                            <td class="">
                                                <span class="vi-ui button basic mini vi-wbe-revert-this-key" data-product_id="${id}" data-product_key="${key}">
                                                    <i class="icon undo"> </i>
                                                </span>
                                            </td>
                                        </tr>`;
                        }

                        table = `<table id="vi-wbe-history-point-detail" class="vi-ui celled table">
                                    <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Current</th>
                                        <th>History</th>
                                        <th class="">Revert</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    ${table}
                                    </tbody>
                                </table>`;

                        html += `<div class="content">${table}</div></div>`
                    }

                    html = $(`<div class="vi-ui styled fluid accordion">${html}</div>`);

                    $('.vi-wbe-history-review')
                        .html(html).attr('data-history_id', historyiD)
                        .prepend(`<h4>History point: ${res.data.date}</h4>`)
                        .append(`<div class="vi-ui button tiny vi-wbe-revert-this-point">
                                    ${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('Revert all product in this point')}
                                </div>
                                <p> ${_functions__WEBPACK_IMPORTED_MODULE_1__["default"].text('The current value is the value of the records in database')}</p>`);

                    html.find('.title').on('click', (e) => $this.revertSingleProduct(e));

                    html.vi_accordion();
                    html.find('.title:first').trigger('click');
                }
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        })
    },

    recover(e) {
        let thisBtn = $(e.currentTarget),
            historyID = thisBtn.data('id');

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'revert_history_all_products', history_id: historyID},
            beforeSend() {
                thisBtn.addClass('loading')
            },
            success(res) {
                console.log(res);
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showMessage( {title:"Success", message: 'Reverted successfully', type: "positive", duration: 3000} );
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    revertSingleProduct(e) {
        let thisBtn;
        if ($(e.target).hasClass('vi-wbe-revert-this-product')) thisBtn = $(e.target);
        if ($(e.target).parent().hasClass('vi-wbe-revert-this-product')) thisBtn = $(e.target).parent();

        if (thisBtn) {
            e.stopImmediatePropagation();

            let pid = thisBtn.closest('.vi-wbe-history-product').data('product_id'),
                historyID = thisBtn.closest('.vi-wbe-history-review').data('history_id');

            if (thisBtn.hasClass('loading')) return;

            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
                data: {sub_action: 'revert_history_single_product', history_id: historyID, pid: pid},
                beforeSend() {
                    thisBtn.addClass('loading')
                },
                success(res) {
                    console.log(res);
                    _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showMessage( {title:"Success", message: 'Reverted successfully', type: "positive", duration: 3000} );
                },
                error(res) {
                    console.log(res);
                    alert(res.statusText + res.responseText);
                },
                complete() {
                    thisBtn.removeClass('loading');
                }
            });
        }
    },

    revertAllProducts(e) {
        let thisBtn = $(e.target);
        let historyID = thisBtn.closest('.vi-wbe-history-review').data('history_id');

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'revert_history_all_products', history_id: historyID},
            beforeSend() {
                thisBtn.addClass('loading')
            },
            success(res) {
                console.log(res);
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showMessage( {title:"Success", message: 'Reverted successfully', type: "positive", duration: 3000} );
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    revertProductAttribute(e) {
        let thisBtn = $(e.currentTarget),
            attribute = thisBtn.data('product_key'),
            pid = thisBtn.closest('.vi-wbe-history-product').data('product_id'),
            historyID = thisBtn.closest('.vi-wbe-history-review').data('history_id');

        if (thisBtn.hasClass('loading')) return;

        _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
            data: {sub_action: 'revert_history_product_attribute', attribute: attribute, history_id: historyID, pid: pid},
            beforeSend() {
                thisBtn.addClass('loading')
            },
            success(res) {
                console.log(res);
                _functions__WEBPACK_IMPORTED_MODULE_1__["default"].showMessage( {title:"Success", message: 'Reverted Attribute successfully', type: "positive", duration: 3000} );
            },
            error(res) {
                console.log(res);
                alert(res.statusText + res.responseText);
            },
            complete() {
                thisBtn.removeClass('loading');
            }
        });
    },

    changePage(e) {
        let page = parseInt($(e.currentTarget).attr('data-page'));
        if ($(e.currentTarget).hasClass('active') || $(e.currentTarget).hasClass('disabled') || !page) return;
        this.loadHistoryPage(page);
    },

    changePageByInput(e) {
        let page = parseInt($(e.target).val());
        let max = parseInt($(e.target).attr('max'));

        if (page <= max && page > 0) this.loadHistoryPage(page);
    },

    clearMultiSelect() {
        $(this).parent().find('.vi-ui.dropdown').dropdown('clear');
    },

    loadHistoryPage(page) {
        let loading = _functions__WEBPACK_IMPORTED_MODULE_1__["default"].spinner(),
            $this = this;

        if (page) {
            _functions__WEBPACK_IMPORTED_MODULE_1__["default"].ajax({
                dataType: 'text',
                data: {sub_action: 'load_history_page', page: page},
                beforeSend() {
                    $this.sidebar.find('.vi-wbe-pagination').prepend(loading);
                },
                success(res) {
                    $this.pagination(page);
                    $('#vi-wbe-history-points-list tbody').html(res);
                },
                error(res) {
                    console.log(res);
                    alert(res.statusText + res.responseText);
                },
                complete() {
                    loading.remove();
                }
            });
        }
    },

    // saveRevision() {
    //     let autoSaveTime = parseInt(Attributes.settings.auto_save_revision);
    //     if (autoSaveTime === 0) return;
    //     let $this = this;
    //
    //     this.autoSaveRevision = setInterval(function () {
    //         if (Object.keys($this.revision).length) {
    //             let currentPage = $this.sidebar.find('.vi-wbe-pagination a.item.active').data('page') || 1;
    //             _f.ajax({
    //                 data: {sub_action: 'auto_save_revision', data: $this.revision, page: currentPage || 1},
    //                 success(res) {
    //                     if (res.success) {
    //                         if (res.data.pages) Attributes.historyPages = res.data.pages;
    //                         if (res.data.updatePage) $this.historyBodyTable.html(res.data.updatePage);
    //                         $this.revision = {};
    //                         $this.pagination(currentPage);
    //                     }
    //                 }
    //             });
    //         }
    //
    //     }, autoSaveTime * 1000)
    // }
};


/***/ }),

/***/ "./src/templates.js":
/*!**************************!*\
  !*** ./src/templates.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Templates = {
    modal(data = {}) {
        let {header = '', content = '', actionsHtml = ''} = data;
        return `<div class="vi-wbe-modal-container">
                    <div class="vi-wbe-modal-main vi-ui form small">
                        <i class="close icon"></i>
                        <div class="vi-wbe-modal-wrapper">
                            <h3 class="header">${header}</h3>
                            <div class="content">${content}</div>
                            <div class="actions">${actionsHtml}</div>
                        </div>
                    </div>
                </div>`;
    },

    defaultAttributes(data = {}) {
        let {html} = data;
        return `<table class="vi-ui celled table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attribute</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${html}
                    </tbody>
                </table>`;
    },

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Templates);

/***/ }),

/***/ "./src/text-multi-cells-edit.js":
/*!**************************************!*\
  !*** ./src/text-multi-cells-edit.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextMultiCellsEdit)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");



const $ = jQuery;

class TextMultiCellsEdit {
    constructor(obj, x, y, e, wordWrap) {
        this._data = {};
        this._data.jexcel = obj;
        this._data.x = parseInt(x);
        this._data.y = parseInt(y);
        this._wordWrap = wordWrap;
        this.run();
    }

    get(id) {
        return this._data[id] || '';
    }

    run() {
        let formulaHtml = this.content();
        let cell = $(`td[data-x=${this.get('x') || 0}][data-y=${this.get('y') || 0}]`);
        new _modal_popup__WEBPACK_IMPORTED_MODULE_1__.Popup(formulaHtml, cell);
        formulaHtml.on('click', '.vi-wbe-apply-formula', this.applyFormula.bind(this));
        // formulaHtml.on('change', '.vi-wbe-text-input', this.applyFormula.bind(this));
    }

    content() {
        let input = this._wordWrap ? `<textarea class="vi-wbe-text-input" rows="3"></textarea>` : `<input type="text" placeholder="${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Content')}" class="vi-wbe-text-input">`;
        return $(`<div class="vi-wbe-formula-container">
                    <div class="field">
                        ${input}
                    </div>
                    <button type="button" class="vi-ui button mini vi-wbe-apply-formula">${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Save')}</button>
                </div>`);
    }

    applyFormula(e) {
        let form = $(e.target).closest('.vi-wbe-formula-container'),
            value = form.find('.vi-wbe-text-input').val(),
            excelObj = this.get('jexcel');

        let breakControl = false, records = [];
        let h = excelObj.selectedContainer;
        let start = h[1], end = h[3], x = h[0];

        for (let y = start; y <= end; y++) {
            if (excelObj.records[y][x] && !excelObj.records[y][x].classList.contains('readonly') && excelObj.records[y][x].style.display !== 'none' && breakControl === false) {
                records.push(excelObj.updateCell(x, y, value));
                excelObj.updateFormulaChain(x, y, records);
            }
        }

        // Update history
        excelObj.setHistory({
            action: 'setValue',
            records: records,
            selection: excelObj.selectedCell,
        });

        // Update table with custom configuration if applicable
        excelObj.updateTable();
    }

}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes */ "./src/attributes.js");
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculator */ "./src/calculator.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar */ "./src/sidebar.js");
/* harmony import */ var _find_and_replace__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./find-and-replace */ "./src/find-and-replace.js");
/* harmony import */ var _text_multi_cells_edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text-multi-cells-edit */ "./src/text-multi-cells-edit.js");
/* harmony import */ var _modal_popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal-popup */ "./src/modal-popup.js");
/* harmony import */ var _find_and_replace_tags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./find-and-replace-tags */ "./src/find-and-replace-tags.js");
/* harmony import */ var _find_and_replace_options__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./find-and-replace-options */ "./src/find-and-replace-options.js");
/* harmony import */ var _add_image_to_multi_gallery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-image-to-multi-gallery */ "./src/add-image-to-multi-gallery.js");
/* harmony import */ var _multiple_product_attributes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./multiple-product-attributes */ "./src/multiple-product-attributes.js");
/* harmony import */ var _remove_product_attributes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./remove-product-attributes */ "./src/remove-product-attributes.js");
/* harmony import */ var _purify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./purify */ "./src/purify.js");
/* harmony import */ var _purify__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_purify__WEBPACK_IMPORTED_MODULE_12__);














jQuery(document).ready(function ($) {

    class BulkEdit {
        constructor() {
            this.sidebar = _sidebar__WEBPACK_IMPORTED_MODULE_3__.Sidebar.init();
            this.compare = [];
            this.trash = [];
            this.unTrash = [];
            this.revision = {};
            this.isAdding = false;

            this.editor = $('#vi-wbe-container');
            this.menubar = $('#vi-wbe-menu-bar');

            this.menubar.on('click', '.vi-wbe-open-sidebar', this.openMenu.bind(this));
            this.menubar.on('click', 'a.item:not(.vi-wbe-open-sidebar)', this.closeMenu.bind(this));

            this.menubar.on('click', '.vi-wbe-new-products', this.addNewProduct.bind(this));
            this.menubar.on('click', '.vi-wbe-new-coupons', this.addNewCoupon.bind(this));
            this.menubar.on('click', '.vi-wbe-new-orders', this.addNewOrder.bind(this));

            this.menubar.on('click', '.vi-wbe-full-screen-btn', this.toggleFullScreen.bind(this));
            this.menubar.on('click', '.vi-wbe-save-button', this.save.bind(this));
            this.menubar.on('click', '.vi-wbe-pagination a.item', this.changePage.bind(this));
            this.menubar.on('click', '.vi-wbe-get-product', this.reloadCurrentPage.bind(this));
            this.menubar.on('change', '.vi-wbe-go-to-page', this.changePageByInput.bind(this));

            this.editor.on('cellonchange', 'tr', this.cellOnChange.bind(this));
            this.editor.on('click', '.jexcel_content', this.removeExistingEditor.bind(this));
            this.editor.on('dblclick', this.removeContextPopup);

            this.sidebar.on('afterAddFilter', this.afterAddFilter.bind(this));
            this.sidebar.on('afterSaveSettings', this.afterSaveSettings.bind(this));
            this.sidebar.on('click', '.vi-wbe-close-sidebar', this.closeMenu.bind(this));
            this.sidebar.on('change', '#vi-wbe-edit_fields, #vi-wbe-exclude_edit_fields', this.toggleSortFields.bind(this));

            this.init();

            $(document).on('keydown', this.keyDownControl.bind(this));
            $(document).on('keyup', this.keyUpControl.bind(this));
        }

        removeExistingEditor(e) {
            if (e.target === e.currentTarget) {
                if (this.WorkBook && this.WorkBook.edition) {
                    this.WorkBook.closeEditor(this.WorkBook.edition[0], true);
                }
            }
        }

        keyDownControl(e) {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
                if (e.which === 83) {
                    e.preventDefault();
                    this.save();
                }
            }

            switch (e.which) {
                case 27:
                    this.sidebar.removeClass('vi-wbe-open');
                    break;
            }
        }

        keyUpControl(e) {
            if (e.target && !e.target.getAttribute('readonly')) {
                let decimal = e.target.getAttribute('data-currency');
                if (decimal) {
                    let currentValue = e.target.value;
                    if (currentValue) {
                        let decimalExist = currentValue.indexOf(decimal);

                        if (decimalExist < 1) {
                            let value = currentValue.match(/\d/g);
                            e.target.value = value ? value.join('') : '';
                        } else {
                            let split = currentValue.split(decimal);
                            let integer, fraction = '';
                            integer = split[0].match(/[\d]/g).join('');

                            if (split[1]) {
                                fraction = split[1].match(/[\d]/g);
                                fraction = fraction ? fraction.join('') : '';
                            }

                            e.target.value = fraction ? `${integer}${decimal}${fraction}` : `${integer}${decimal}`;
                        }
                    }
                }
            }
        }

        removeContextPopup() {
            $('.vi-wbe-context-popup').removeClass('vi-wbe-popup-active')
        }

        init() {
            if (wbeParams.columns) _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.setColumns(wbeParams.columns);
            this.pagination(1, 1);
            this.workBookInit();
            this.loadProducts();
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].setJexcel(this.WorkBook);
        }

        cellOnChange(e, data) {
            let {col = ''} = data;

            if (!col) return;

            let type = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMapping[col];
            let thisRow = $(e.target);

            switch (type) {
                case 'product_type':
                    thisRow.find('td').each(function (i, el) {
                        let x = $(el).data('x');
                        if (x && x !== 0 && x !== 1) {
                            $(el).removeClass('readonly');
                        }
                    });

                    let dependArr = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.cellDependType[data.value];
                    if (Array.isArray(dependArr)) {
                        dependArr.forEach(function (el) {
                            let pos = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip[el];
                            thisRow.find(`td[data-x='${pos}']`).addClass('readonly');
                        });
                    }

                    break;

                case 'post_date':
                    let x = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getColFromColumnType('status');
                    if (!thisRow.find(`td[data-x='${x}']`).length){
                        break;
                    }
                    let value = data.value,
                        cell = thisRow.find(`td[data-x='${x}']`).get(0),
                        time = (new Date(value)).getTime(),
                        now = Date.now(),
                        status = time > now ? 'future' : 'publish';
                    this.WorkBook.setValue(cell, status);

                    break;
            }
        }

        workBookInit() {
            let $this = this,
                countCol = 0,
                deleteSelectedRows = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Delete rows with selected cells'),
                oncreaterow = null,
                contextMenuItems,
                onselection = null,
                onresizecolumn = function (instance, cell, width) {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                        async: true,
                        data: {
                            sub_action: 'resize_column',
                            column_id: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.columns[cell].id,
                            column_width: width <= 55 ? 55 : width,
                        },
                        beforeSend() {},
                        success(res) {
                            if (res.success) {
                                console.log(res.data);
                            }
                        },
                        error(res) {
                            console.log(res.data);
                            alert(res.data);
                        },
                        complete() {}
                    });

                };

            function setValueToCell(obj, value) {
                let breakControl = false, records = [], h = obj.selectedContainer, start = h[1], end = h[3], x = h[0];

                for (let y = start; y <= end; y++) {
                    if (obj.records[y][x] && !obj.records[y][x].classList.contains('readonly') && obj.records[y][x].style.display !== 'none' && breakControl === false) {
                        records.push(obj.updateCell(x, y, value));
                        obj.updateFormulaChain(x, y, records);
                    }
                }

                obj.setHistory({action: 'setValue', records: records, selection: obj.selectedCell});
                obj.updateTable();
            }

            switch (_attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.editType) {
                case 'products':
                    deleteSelectedRows = `${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Delete rows with selected cells')} 
                                            <span class="vi-wbe-context-menu-note">
                                                (${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Variations cannot revert after save')})
                                            </span>`;

                    oncreaterow = function (row, j) {
                        let productType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductTypeFromY(j);
                        let dependArr = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.cellDependType[productType];

                        if (Array.isArray(dependArr)) {
                            dependArr.forEach(function (el) {
                                let pos = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip[el];
                                $(row).find(`td[data-x='${pos}']`).addClass('readonly');
                            });
                        }
                    };

                    onselection = function (el, x1, y1, x2, y2, origin) {
                        if (x1 === x2 && y1 === y2) {
                            let cell = this.getCellFromCoords(x1, y1),
                                child = $(cell).children();

                            // if (child.length && child.hasClass('vi-wbe-gallery-has-item')) {
                            //     let ids = this.options.data[y1][x1],
                            //         images = '';
                            //
                            //     if (ids.length) {
                            //         for (let id of ids) {
                            //             let src = Attributes.imgStorage[id];
                            //             images += `<li class="vi-wbe-gallery-image"><img src="${src}"></li>`;
                            //         }
                            //     }
                            //
                            //     new Popup(`<ul class="vi-wbe-gallery-images">${images}</ul>`, $(cell));
                            // }
                        }
                    };

                    contextMenuItems = function (items, obj, x, y, e) {
                        $this.removeContextPopup();

                        let cells = obj.selectedContainer;
                        x = parseInt(x);
                        y = parseInt(y);

                        if (cells[0] === cells[2] && x !== null) {
                            switch (obj.options.columns[x].type) {
                                case 'checkbox':
                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Check'),
                                        onclick(e) {
                                            setValueToCell(obj, true);
                                        }
                                    });

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Uncheck'),
                                        onclick(e) {
                                            setValueToCell(obj, false);
                                        }
                                    });
                                    break;

                                case 'number':
                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Calculator'),
                                        onclick(e) {
                                            new _calculator__WEBPACK_IMPORTED_MODULE_2__.Calculator(obj, x, y, e);
                                        }
                                    });

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Fill'),
                                        onclick(e) {
                                            new _calculator__WEBPACK_IMPORTED_MODULE_2__.FillNumber(obj, x, y, e);
                                        }
                                    });

                                    if (x > 1 && obj.options.columns[x].id === 'sale_price' && obj.options.columns[x - 1].id === 'regular_price') {
                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Calculator base on Regular price'),
                                            onclick(e) {
                                                new _calculator__WEBPACK_IMPORTED_MODULE_2__.CalculatorBaseOnRegularPrice(obj, x, y, e);
                                            }
                                        });
                                    }

                                    break;

                                case 'text':
                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit multiple cells'),
                                        onclick(e) {
                                            new _text_multi_cells_edit__WEBPACK_IMPORTED_MODULE_5__["default"](obj, x, y, e, obj.options.columns[x].wordWrap);
                                        }
                                    });

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and Replace'),
                                        onclick(e) {
                                            new _find_and_replace__WEBPACK_IMPORTED_MODULE_4__["default"](obj, x, y, e);
                                        }
                                    });
                                    break;

                                case 'calendar':
                                    let cell = $(`td[data-x=${x}][data-y=${y}]`).get(0);
                                    if (!$(cell).hasClass('readonly')) {
                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Open date picker'),
                                            onclick() {
                                                let value = obj.options.data[y][x];

                                                var editor = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'input', '', false);
                                                editor.value = value;
                                                editor.style.left = 'unset';

                                                let h = obj.selectedContainer;
                                                let start = h[1], end = h[3];

                                                if (obj.options.tableOverflow == true || obj.options.fullscreen == true) {
                                                    obj.options.columns[x].options.position = true;
                                                }
                                                obj.options.columns[x].options.value = obj.options.data[y][x];
                                                obj.options.columns[x].options.opened = true;
                                                obj.options.columns[x].options.onclose = function (el, value) {
                                                    let records = [];
                                                    value = el.value;

                                                    for (let y = start; y <= end; y++) {
                                                        if (obj.records[y][x] && !obj.records[y][x].classList.contains('readonly') && obj.records[y][x].style.display !== 'none') {
                                                            records.push(obj.updateCell(x, y, value));
                                                            obj.updateFormulaChain(x, y, records);
                                                        }
                                                    }
                                                    // obj.closeEditor(cell, true);

                                                    // Update history
                                                    obj.setHistory({
                                                        action: 'setValue',
                                                        records: records,
                                                        selection: obj.selectedCell,
                                                    });

                                                    // Update table with custom configuration if applicable
                                                    obj.updateTable();
                                                };
                                                // Current value
                                                jSuites.calendar(editor, obj.options.columns[x].options);
                                                // Focus on editor
                                                editor.focus();
                                            }
                                        });
                                    }

                                    break;

                                case 'custom':

                                    switch (obj.options.columns[x].editor.type) {
                                        case 'textEditor':
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit multiple cells'),
                                                onclick() {
                                                    $('.vi-ui.modal').modal('show');
                                                    $('.vi-ui.modal .close.icon').off('click');

                                                    if (tinymce.get('vi-wbe-text-editor') === null) {
                                                        $('#vi-wbe-text-editor').val('');
                                                        wp.editor.initialize('vi-wbe-text-editor', _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.tinyMceOptions);
                                                    } else {
                                                        tinymce.get('vi-wbe-text-editor').setContent('')
                                                    }

                                                    $('.vi-wbe-text-editor-save').off('click').on('click', function () {
                                                        let content = wp.editor.getContent('vi-wbe-text-editor');
                                                        setValueToCell(obj, content);
                                                        if ($(this).hasClass('vi-wbe-close')) $('.vi-ui.modal').modal('hide');
                                                    });
                                                }
                                            });
                                            break;

                                        case 'tags':
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and replace tags'),
                                                onclick(e) {
                                                    new _find_and_replace_tags__WEBPACK_IMPORTED_MODULE_7__["default"](obj, cells, x, y, e);
                                                }
                                            });
                                            break;

                                        case 'select2':
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and replace options'),
                                                onclick(e) {
                                                    new _find_and_replace_options__WEBPACK_IMPORTED_MODULE_8__["default"](obj, cells, x, y, e);
                                                }
                                            });
                                            break;

                                        case 'gallery':
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add image to selected cells'),
                                                onclick(e) {
                                                    new _add_image_to_multi_gallery__WEBPACK_IMPORTED_MODULE_9__["default"](obj, cells, x, y, e);
                                                }
                                            });

                                            break;

                                        case 'product_attributes':
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add attributes to products'),
                                                onclick(e) {
                                                    new _multiple_product_attributes__WEBPACK_IMPORTED_MODULE_10__["default"](obj, cells, x, y, e);
                                                }
                                            });
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Remove multiple product attribute'),
                                                onclick(e) {
                                                    new _remove_product_attributes__WEBPACK_IMPORTED_MODULE_11__["default"](obj, cells, x, y, e);
                                                }
                                            });
                                            break;
                                    }

                                    break;

                            }
                        }

                        if (items.length) items.push({type: 'line'});

                        if (cells[1] === cells[3] && y !== null && ! isNaN(y)) {
                            let productType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductTypeFromY(y);
                            if (productType === 'variable') {
                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add variation'),
                                    onclick() {
                                        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;

                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                                data: {
                                                    sub_action: 'add_variation',
                                                    pid: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductIdOfCell(obj, y)
                                                },
                                                beforeSend() {
                                                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                                                },
                                                success(res) {
                                                    if (res.success) {
                                                        obj.insertRow(0, y, false, true);
                                                        obj.setRowData(y + 1, res.data, true);
                                                    }
                                                },
                                                error(res) {
                                                    console.log(res);
                                                    alert(res.statusText + res.responseText);
                                                },
                                                complete() {
                                                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                                }
                                            }
                                        );
                                    }
                                });

                                items.push({
                                    title: `${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Create variations from all attributes')} <span class="vi-wbe-context-menu-note">(${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Save new attributes before')})</span>`,
                                    onclick() {
                                        if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;

                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                            data: {
                                                sub_action: 'link_all_variations',
                                                pid: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductIdOfCell(obj, y)
                                            },
                                            beforeSend() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                                            },
                                            success(res) {
                                                if (!res.success) return;
                                                if (res.data.length) {
                                                    res.data.forEach(function (item, i) {
                                                        obj.insertRow(0, y + i, false, true);
                                                        obj.setRowData(y + i + 1, item, true);
                                                    })
                                                }

                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].notice(`${res.data.length} ${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('variations are added')}`)
                                            },
                                            error(res) {
                                                console.log(res);
                                                alert(res.statusText + res.responseText);
                                            },
                                            complete() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                            }
                                        });
                                    }
                                });

                                items.push({type: 'line'});
                            }

                            if (productType !== 'variation') {
                                let pid = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductIdOfCell(obj, y);

                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Duplicate'),
                                    onclick() {
                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                            data: {sub_action: 'duplicate_product', product_id: pid},
                                            beforeSend() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                                            },
                                            success(res) {
                                                if (res.data.length) {
                                                    res.data.forEach(function (item, i) {
                                                        obj.insertRow(0, y + i, true, true);
                                                        obj.setRowData(y + i, item, true);
                                                    })
                                                }
                                            },
                                            error(res) {
                                                console.log(res);
                                                alert(res.statusText + res.responseText);
                                            },
                                            complete() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                            }
                                        });
                                    }
                                });

                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Go to edit product page'),
                                    onclick() {
                                        window.open(`${_attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.adminUrl}post.php?post=${pid}&action=edit`, '_blank');
                                    }
                                });

                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('View on Single product page'),
                                    onclick() {
                                        window.open(`${_attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.frontendUrl}?p=${pid}&post_type=product&preview=true`, '_blank');
                                    }
                                });

                            }

                        }

                        return items;
                    };

                    break;

                case 'orders':
                    contextMenuItems = function (items, obj, x, y, e) {
                        let cells = obj.selectedContainer;
                        x = parseInt(x);
                        y = parseInt(y);

                        if (x !== null && y !== null) {

                            for (let action in _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.orderActions) {
                                items.push({
                                    title: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.orderActions[action],
                                    onclick() {
                                        let order_ids = [];

                                        for (let i = cells[1]; i <= cells[3]; i++) {
                                            order_ids.push(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductIdOfCell(obj, i))
                                        }

                                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                            data: {sub_action: action, order_ids},
                                            beforeSend() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                                            },
                                            success(res) {
                                            },
                                            error(res) {
                                                console.log(res);
                                                alert(res.statusText + res.responseText);
                                            },
                                            complete() {
                                                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                            }
                                        });
                                    }
                                });
                            }

                            if (items.length) items.push({type: 'line'});

                            const addNote = function (is_customer_note = 0) {
                                let cell = obj.getCellFromCoords(cells[0], cells[1]),
                                    control = $(`<div>
                                                    <div class="field"> 
                                                        <textarea rows="3"></textarea>
                                                    </div>
                                                    <div class="field"> 
                                                        <span class="vi-wbe-add-note vi-ui button tiny">
                                                            ${_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add')}
                                                        </span>
                                                    </div>
                                                </div>`);

                                let popup = new _modal_popup__WEBPACK_IMPORTED_MODULE_6__.Popup(control, $(cell));

                                control.on('click', '.vi-wbe-add-note', function () {
                                    let note = control.find('textarea').val();

                                    if (!note) return;

                                    let h = obj.selectedContainer;
                                    let start = h[1], end = h[3], x = h[0];
                                    let ids = [];

                                    for (let y = start; y <= end; y++) {
                                        ids.push(obj.options.data[y][0])
                                    }

                                    popup.hide();

                                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                                        data: {sub_action: 'add_order_note', ids, note, is_customer_note},
                                        beforeSend() {
                                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                                        },
                                        success(res) {
                                        },
                                        error(res) {
                                            console.log(res);
                                            alert(res.statusText + res.responseText);
                                        },
                                        complete() {
                                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                                        }
                                    })
                                });
                            };

                            items.push({
                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add private note'),
                                onclick() {
                                    addNote(0);
                                }
                            });

                            items.push({
                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Add note to customer'),
                                onclick() {
                                    addNote(1);
                                }
                            });

                            if (items.length) items.push({type: 'line'});

                            if (cells[1] === cells[3]) {
                                let order_id = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getProductIdOfCell(obj, y);

                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Go to edit order page'),
                                    onclick() {
                                        window.open(`${_attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.adminUrl}post.php?post=${order_id}&action=edit`, '_blank');
                                    }
                                });
                                if (items.length) items.push({type: 'line'});
                            }

                        }
                        return items;
                    };
                    break;

                case 'coupons':
                    contextMenuItems = function (items, obj, x, y, e) {
                        let cells = obj.selectedContainer;
                        x = parseInt(x);
                        y = parseInt(y);

                        if (x !== null && y !== null) {

                            if (cells[0] === cells[2]) {
                                let colType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getColumnType(x);
                                if (colType === 'code') {
                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Generate coupon code'),
                                        onclick() {
                                            let breakControl = false, records = [],
                                                h = obj.selectedContainer, start = h[1], end = h[3], x = h[0];

                                            for (let y = start; y <= end; y++) {
                                                if (obj.records[y][x] && !obj.records[y][x].classList.contains('readonly') && obj.records[y][x].style.display !== 'none' && breakControl === false) {
                                                    let value = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].generateCouponCode();
                                                    records.push(obj.updateCell(x, y, value));
                                                    obj.updateFormulaChain(x, y, records);
                                                }
                                            }
                                            obj.setHistory({action: 'setValue', records: records, selection: obj.selectedCell});
                                            obj.updateTable();
                                        }
                                    });
                                }

                                if (obj.options.columns[x].type === 'text') {
                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit multiple cells'),
                                        onclick(e) {
                                            new _text_multi_cells_edit__WEBPACK_IMPORTED_MODULE_5__["default"](obj, x, y, e, obj.options.columns[x].wordWrap);
                                        }
                                    });

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and Replace'),
                                        onclick(e) {
                                            new _find_and_replace__WEBPACK_IMPORTED_MODULE_4__["default"](obj, x, y, e);
                                        }
                                    });
                                }

                                if (obj.options.columns[x].type === 'checkbox') {

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Check'),
                                        onclick(e) {
                                            setValueToCell(obj, true);
                                        }
                                    });

                                    items.push({
                                        title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Uncheck'),
                                        onclick(e) {
                                            setValueToCell(obj, false);
                                        }
                                    });
                                }

                                if (items.length) items.push({type: 'line'});
                            }
                        }
                        return items;
                    };

                    break;

                case 'reviews':
                    oncreaterow = function (row, j) {
                        let reviewType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getReviewTypeFrom(j);
                        let dependArr = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.cellDependType[reviewType];

                        if (Array.isArray(dependArr)) {
                            dependArr.forEach(function (el) {
                                let pos = _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip[el];
                                $(row).find(`td[data-x='${pos}']`).addClass('readonly');
                            });
                        }
                    };

                    contextMenuItems = function (items, obj, x, y, e) {
                        let cells = obj.selectedContainer;
                        x = parseInt(x);
                        y = parseInt(y);
                        if (x !== null && y !== null) {

                            if (cells[0] === cells[2]) {
                                switch (obj.options.columns[x].type) {
                                    case 'text':
                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit multiple cells'),
                                            onclick(e) {
                                                new _text_multi_cells_edit__WEBPACK_IMPORTED_MODULE_5__["default"](obj, x, y, e, obj.options.columns[x].wordWrap);
                                            }
                                        });

                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and Replace'),
                                            onclick(e) {
                                                new _find_and_replace__WEBPACK_IMPORTED_MODULE_4__["default"](obj, x, y, e);
                                            }
                                        });
                                        break;
                                    case 'number':
                                        items.push({
                                           title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Find and Replace'),
                                            onclick(e) {
                                                new _find_and_replace__WEBPACK_IMPORTED_MODULE_4__["default"](obj, x, y, e);
                                            }
                                        });
                                        break;
                                    case 'checkbox':
                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Check'),
                                            onclick(e) {
                                                setValueToCell(obj, true);
                                            }
                                        });

                                        items.push({
                                            title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Uncheck'),
                                            onclick(e) {
                                                setValueToCell(obj, false);
                                            }
                                        });
                                        break;

                                    case 'calendar':
                                        let cell = $(`td[data-x=${x}][data-y=${y}]`).get(0);
                                        if (!$(cell).hasClass('readonly')) {
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Open date picker'),
                                                onclick() {
                                                    let value = obj.options.data[y][x];

                                                    var editor = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].createEditor(cell, 'input', '', false);
                                                    editor.value = value;
                                                    editor.style.left = 'unset';

                                                    let h = obj.selectedContainer;
                                                    let start = h[1], end = h[3];

                                                    if (obj.options.tableOverflow == true || obj.options.fullscreen == true) {
                                                        obj.options.columns[x].options.position = true;
                                                    }
                                                    obj.options.columns[x].options.value = obj.options.data[y][x];
                                                    obj.options.columns[x].options.opened = true;
                                                    obj.options.columns[x].options.onclose = function (el, value) {
                                                        let records = [];
                                                        value = el.value;

                                                        for (let y = start; y <= end; y++) {
                                                            if (obj.records[y][x] && !obj.records[y][x].classList.contains('readonly') && obj.records[y][x].style.display !== 'none') {
                                                                records.push(obj.updateCell(x, y, value));
                                                                obj.updateFormulaChain(x, y, records);
                                                            }
                                                        }
                                                        // obj.closeEditor(cell, true);

                                                        // Update history
                                                        obj.setHistory({
                                                            action: 'setValue',
                                                            records: records,
                                                            selection: obj.selectedCell,
                                                        });

                                                        // Update table with custom configuration if applicable
                                                        obj.updateTable();
                                                    };
                                                    // Current value
                                                    jSuites.calendar(editor, obj.options.columns[x].options);
                                                    // Focus on editor
                                                    editor.focus();
                                                }
                                            });
                                        }

                                        break;
                                    case 'custom':
                                        if (obj.options.columns[x].editor.type === 'textEditor') {
                                            items.push({
                                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Edit multiple cells'),
                                                onclick() {
                                                    $('.vi-ui.modal').modal('show');
                                                    $('.vi-ui.modal .close.icon').off('click');

                                                    if (tinymce.get('vi-wbe-text-editor') === null) {
                                                        $('#vi-wbe-text-editor').val('');
                                                        wp.editor.initialize('vi-wbe-text-editor', _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.tinyMceOptions);
                                                    } else {
                                                        tinymce.get('vi-wbe-text-editor').setContent('')
                                                    }

                                                    $('.vi-wbe-text-editor-save').off('click').on('click', function () {
                                                        let content = wp.editor.getContent('vi-wbe-text-editor');
                                                        setValueToCell(obj, content);
                                                        if ($(this).hasClass('vi-wbe-close')) $('.vi-ui.modal').modal('hide');
                                                    });
                                                }
                                            });
                                        }
                                        break;
                                }
                            }

                            let pid = null;

                            if (typeof y === 'object') {
                                let y = y.getAttribute('data-y');
                                pid = obj.options.data[y][1];
                            } else {
                                pid =  obj.options.data[y][1];
                            }
                            items.push({type: 'line'});

                            items.push({
                                title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Reply' ),
                                onclick() {
                                    $('.vi-ui.modal').modal('show');
                                    $('.vi-ui.modal .close.icon').off('click');

                                    if (tinymce.get('vi-wbe-text-editor') === null) {
                                        $('#vi-wbe-text-editor').val('');
                                        wp.editor.initialize('vi-wbe-text-editor', _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.tinyMceOptions);
                                    } else {
                                        tinymce.get('vi-wbe-text-editor').setContent('')
                                    }

                                    $('.vi-wbe-text-editor-save').off('click').on('click', function () {

                                        let h = obj.selectedContainer, start = h[1], end = h[3], x = h[0];
                                        let content = wp.editor.getContent('vi-wbe-text-editor');
                                        let new_comments = [];

                                        for (let y = start; y <= end; y++) {
                                            new_comments.push( {
                                                comment_id : _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getDataFromCell(obj, obj.records[y][0]),
                                                product_id : _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getDataFromCell(obj, obj.records[y][1]),
                                            } );
                                        }

                                        $this.addNewReply( content, new_comments );

                                        if ($(this).hasClass('vi-wbe-close')) $('.vi-ui.modal').modal('hide');
                                    });
                                }
                            });

                            if (cells[1] === cells[3]) {
                                items.push({
                                    title: _functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('View on Single product page'),
                                    onclick() {
                                        window.open(`${_attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.frontendUrl}?p=${pid}&post_type=product&preview=true`, '_blank');
                                    }
                                });
                            }
                        }
                        return items;
                    };
                    break;
            }

            this.WorkBook = $('#vi-wbe-spreadsheet').jexcel({
                allowInsertRow: false,
                allowInsertColumn: false,
                about: false,
                freezeColumns: 3,
                tableOverflow: true,
                tableWidth: '100%',
                tableHeight: '100%',
                columns: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.columns,
                stripHTML: false,
                allowExport: false,
                allowDeleteColumn: false,
                allowRenameColumn: false,
                autoIncrement: false,
                allowXCopy: false,
                lazyLoading: true,
                loadingSpin: true,
                fullscreen: true,
                text: {deleteSelectedRows},
                oncreaterow,
                contextMenuItems,
                onselection,
                onresizecolumn,
                rowDrag: wbeParams?.settings?.load_variations !== 'yes',

                onchange(instance, cell, col, row, value, oldValue) {
                    if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
                        // if (c == 0) {
                        //     var columnName = jexcel.getColumnNameFromId([c + 1, r]);
                        //     instance.jexcel.setValue(columnName, '');
                        // }
                        $(cell).parent().trigger('cellonchange', {cell, col, row, value});

                        let pid = this.options.data[row][0];
                        $this.compare.push(pid);
                        $this.compare = [...new Set($this.compare)];
                        // console.log($this.compare)
                        $this.menubar.find('.vi-wbe-save-button').addClass('vi-wbe-saveable');

                        if (!$this.isAdding) {
                            if (!$this.revision[pid]) $this.revision[pid] = {};
                            let columnType = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getColumnType(col);
                            $this.revision[pid][columnType] = oldValue;
                        }
                    }
                },

                onbeforechange(instance, cell, col, row, value) {
                    if (typeof value !== 'object') {
                        value = _purify__WEBPACK_IMPORTED_MODULE_12__.sanitize(value);
                    }
                    return value;
                },

                ondeleterow(el, rowNumber, numOfRows, rowRecords) {
                    for (let row of rowRecords) {
                        $this.trash.push(row[0].innerText);
                    }

                    if ($this.trash.length) $this.menubar.find('.vi-wbe-save-button').addClass('vi-wbe-saveable');
                },

                onundo(el, historyRecord) {
                    if (historyRecord && historyRecord.action === 'deleteRow') {
                        for (let row of historyRecord.rowData) {
                            $this.unTrash.push(row[0]);
                        }
                    }
                },

                onbeforecopy() {
                    countCol = 0;
                    $this.firstCellCopy = null;
                },

                oncopying(value, x, y) {
                    if (!$this.firstCellCopy) $this.firstCellCopy = [x, y];
                    if ($this.firstCellCopy[0] !== x) countCol++;
                },

                onbeforepaste(data, selectedCell) {
                    if (typeof data !== 'string') return data;
                    data = data.trim();

                    let x = selectedCell[0];
                    let cellType = this.columns[x].type;

                    if (typeof $this.firstCellCopy === 'undefined') {
                        if (['text', 'number', 'custom'].includes(cellType)) {
                            if (cellType === 'custom') {
                                let editorType = this.columns[x].editor.type;
                                return editorType === 'textEditor' ? data : '';
                            } else {
                                return data;
                            }
                        }
                        return '';
                    }

                    let sX = +$this.firstCellCopy[0],
                        tX = +selectedCell[0],
                        sXType = this.columns[sX].type,
                        tXType = this.columns[tX].type;

                    if (+$this.firstCellCopy[0] !== +selectedCell[0]) {

                        if (countCol > 0) {
                            alert('Copy single column each time.');
                            return '';
                        }

                        if (sXType !== tXType) {
                            alert('Can not paste data with different column type.');
                            return '';
                        }
                    }

                    return data;
                },

                onscroll(el) {
                    let selectOpening = $(el).find('select.select2-hidden-accessible');
                    if (selectOpening.length) selectOpening.select2('close')
                },

                oncreateeditor(el, cell, x, y, editor) {
                    if (this.options.columns[x].currency) {
                        editor.setAttribute('data-currency', this.options.columns[x].currency);
                    }
                },

            });
        }

        closeMenu(e) {
            this.sidebar.removeClass('vi-wbe-open')
        }

        openMenu(e) {
            let tab = $(e.currentTarget).data('menu_tab');
            let currentTab = this.sidebar.find(`a.item[data-tab='${tab}']`);
            if (currentTab.hasClass('active') && this.sidebar.hasClass('vi-wbe-open')) {
                this.sidebar.removeClass('vi-wbe-open');
            } else {
                this.sidebar.addClass('vi-wbe-open');
                currentTab.trigger('click');
            }
        }
        toggleSortFields(e) {
            let $sort_fields = this.sidebar.find('#bulky-sort-fields'),
                exclude = this.sidebar.find('#vi-wbe-exclude_edit_fields').val(),
                include = this.sidebar.find('#vi-wbe-edit_fields').val();
            if (include.length){
                $sort_fields.find('.bulky-sort-field').addClass('vi-wbe-hidden');
                $.each(include, function (k,v) {
                    $sort_fields.find('.bulky-sort-field-'+v).removeClass('vi-wbe-hidden');
                });
            }else {
                $sort_fields.find('.bulky-sort-field').removeClass('vi-wbe-hidden');
            }
            if (exclude.length){
                $.each(exclude, function (k,v) {
                    $sort_fields.find('.bulky-sort-field-'+v).addClass('vi-wbe-hidden');
                });
            }
        }

        addNewProduct() {
            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;
            let productName = prompt(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Please enter new product name'));

            if (productName) {
                let $this = this;
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                    data: {sub_action: 'add_new_product', product_name: productName},
                    beforeSend() {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                    },
                    success(res) {
                        $this.isAdding = true;
                        $this.WorkBook.insertRow(0, 0, true, true);
                        $this.WorkBook.setRowData(0, res.data, true);
                    },
                    error(res) {
                        console.log(res);
                        alert(res.statusText + res.responseText);
                    },
                    complete() {
                        $this.isAdding = false;
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                    }
                })
            }
        }

        addNewCoupon() {
            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;

            let $this = this;

            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                data: {sub_action: 'add_new_coupon'},
                beforeSend() {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                },
                success(res) {
                    $this.isAdding = true;
                    $this.WorkBook.insertRow(0, 0, true, true);
                    $this.WorkBook.setRowData(0, res.data, true);
                },
                error(res) {
                    console.log(res);
                    alert(res.statusText + res.responseText);
                },
                complete() {
                    $this.isAdding = false;
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                }
            })
        }

        addNewOrder() {
            window.open('post-new.php?post_type=shop_order');
        }

        addNewReply( content, new_comments ) {
            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;

            let $this = this;
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                data: {sub_action: 'add_new_reply', content, new_comments },
                beforeSend() {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                },
                success(res) {
                    console.log(res.data);
                    $this.isAdding = false;
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                    $this.reloadCurrentPage();
                },
                error(res) {
                    console.log(res);
                    alert(res.statusText + res.responseText);
                },
                complete() {
                    $this.isAdding = false;
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                }
            })
        }

        toggleFullScreen(e) {
            let body = $('.wp-admin'), screenBtn = $(e.currentTarget);
            body.toggleClass('vi-wbe-full-screen');

            if (body.hasClass('vi-wbe-full-screen')) {
                screenBtn.find('i.icon').removeClass('external alternate').addClass('window close outline');
                screenBtn.attr('title', 'Exit full screen');
            } else {
                screenBtn.find('i.icon').removeClass('window close outline').addClass('external alternate');
                screenBtn.attr('title', 'Full screen');
            }

            $.ajax({
                url: _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxUrl,
                type: 'post',
                dataType: 'json',
                data: {
                    ..._attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.ajaxData,
                    sub_action: 'set_full_screen_option',
                    status: body.hasClass('vi-wbe-full-screen')
                }
            });
        }

        getAllRows() {
            return this.WorkBook.getData(false, true);
        }

        save() {
            $('td.error').removeClass('error');

            let $this = this,
                products = this.getAllRows(),
                productsForSave = [], skuErrors = [];

            for (let pid of this.compare) {
                for (let product of products) {
                    if (parseInt(product[0]) === parseInt(pid)) {
                        productsForSave.push(product);
                    }
                }
            }

            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;

            function saveStep(step = 0) {
                let range = 20,
                    start = step * range,
                    end = start + range,
                    products = productsForSave.slice(start, end),
                    lastStep = step * range >= productsForSave.length;

                if ( products.length === 0 && $this.trash.length === 0 && $this.unTrash.length === 0 && step === 0 ) {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].notice(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Nothing change to save'));
                    return;
                }

                if (lastStep && step > 0) {
                    if (skuErrors.length) {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].notice(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('Invalid or duplicated SKU'));

                        let x = _functions__WEBPACK_IMPORTED_MODULE_0__["default"].getColFromColumnType('sku');
                        let allRows = $this.WorkBook.getData();
                        if (allRows.length) {
                            for (let y in allRows) {
                                let row = allRows[y];
                                if (skuErrors.includes(row[0])) {
                                    let cell = $this.WorkBook.getCellFromCoords(x, y);
                                    $(cell).addClass('error');
                                }
                            }
                        }
                    }

                    let histories = $this.WorkBook.history;
                    if (histories.length) {
                        for (let history of histories) {
                            if (history.action !== 'deleteRow') continue;
                            let iForDel = [];
                            for (let i in history.rowData) {
                                if (history.rowData[i][1] > 0) {
                                    iForDel.push(parseInt(i));
                                }
                            }

                            if (iForDel.length) {
                                history.rowData = history.rowData.filter((item, i) => !iForDel.includes(i));
                                history.rowNode = history.rowNode.filter((item, i) => !iForDel.includes(i));
                                history.rowRecords = history.rowRecords.filter((item, i) => !iForDel.includes(i));
                                history.numOfRows = history.numOfRows - iForDel.length;
                            }
                        }
                    }

                    $this.saveRevision();
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].showMessage( {title:"Success", message: 'Saved successfully', type: "positive", duration: 3000} );
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();

                    return;
                }

                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                    data: {
                        sub_action: 'save_products',
                        products: JSON.stringify(products),
                        trash: $this.trash,
                        untrash: $this.unTrash,
                    },
                    beforeSend() {
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                    },
                    success(res) {
                        $this.trash = [];
                        $this.unTrash = [];
                        $this.compare = [];
                        $this.menubar.find('.vi-wbe-save-button').removeClass('vi-wbe-saveable');

                        if (res.data.skuErrors) {
                            skuErrors = [...new Set([...skuErrors, ...res.data.skuErrors])];
                        }

                        saveStep(step + 1);
                    },
                    error(res) {
                        console.log(res);
                        _functions__WEBPACK_IMPORTED_MODULE_0__["default"].showMessage( {title:"Error", message: res.statusText + res.responseText, type: "positive", duration: 3000} );
                        alert(res.statusText + res.responseText);
                    },
                    complete() {
                    }
                });
            }

            saveStep();
        }
        textWrapMode(enable) {
            if (enable){
                $('#vi-wbe-spreadsheet').addClass('vibulky-spreadsheet-wrap-mode');
            }else {
                $('#vi-wbe-spreadsheet').removeClass('vibulky-spreadsheet-wrap-mode');
            }
        }

        loadProducts(page = 1, reCreate = false) {
            let $this = this;

            if (_functions__WEBPACK_IMPORTED_MODULE_0__["default"].is_loading()) return;
            $this.textWrapMode($this.sidebar.find('input[name="wrap_mode"]').prop('checked'));
            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                data: {
                    sub_action: 'load_products',
                    page: page,
                    re_create: reCreate
                },
                beforeSend() {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].loading();
                },
                success(res) {
                    if (res.success) {
                        _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage = res.data.img_storage;

                        if (reCreate) {
                            $this.WorkBook.destroy();

                            if (res.data.columns) _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.setColumns(res.data.columns);
                            if (res.data.idMapping) _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMapping = res.data.idMapping;
                            if (res.data.idMappingFlip) _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.idMappingFlip = res.data.idMappingFlip;

                            $this.workBookInit();
                        }

                        $this.WorkBook.options.data = res.data.products;
                        $this.WorkBook.setData();
                        $this.pagination(res.data.max_num_pages, page);
                        $this.WorkBook.orderAfterLoad();

                        if (!res.data.products.length) {
                            _functions__WEBPACK_IMPORTED_MODULE_0__["default"].notice(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('No item was found'));
                        }
                    }
                },
                error(res) {
                    console.log(res);
                    alert(res.statusText + res.responseText);
                },
                complete() {
                    _functions__WEBPACK_IMPORTED_MODULE_0__["default"].removeLoading();
                }
            });
        }

        pagination(maxPage, currentPage) {
            this.menubar.find('.vi-wbe-pagination').html(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].pagination(maxPage, currentPage));
        }

        changePage(e) {
            let page = parseInt($(e.currentTarget).attr('data-page'));
            if ($(e.currentTarget).hasClass('active') || $(e.currentTarget).hasClass('disabled') || !page) return;
            this.loadProducts(page);
        }

        changePageByInput(e) {
            let page = parseInt($(e.target).val());
            let max = parseInt($(e.target).attr('max'));

            if (page <= max && page > 0) this.loadProducts(page);
        }

        reloadCurrentPage() {
            this.loadProducts(this.getCurrentPage())
        }

        getCurrentPage() {
            return this.menubar.find('.vi-wbe-pagination .item.active').data('page') || 1;
        }

        afterAddFilter(ev, data) {
            _attributes__WEBPACK_IMPORTED_MODULE_1__.Attributes.imgStorage = data.img_storage;
            this.WorkBook.options.data = data.products;
            this.WorkBook.setData();
            this.pagination(data.max_num_pages, 1);
            this.WorkBook.orderAfterLoad();
            this.sidebar.find('.vi-wbe-close-sidebar').trigger('click');
            if (!data.products.length) _functions__WEBPACK_IMPORTED_MODULE_0__["default"].notice(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].text('No item was found'))
        }

        afterSaveSettings(ev, data) {
            if (data.fieldsChange) {
                this.loadProducts(this.getCurrentPage(), true);
            }
            if (data?.fieldsRefresh){
                this.menubar.find('.vi-wbe-get-product').trigger('click');
            }else {
                this.sidebar.find('.vi-wbe-close-sidebar').trigger('click');
            }
        }

        saveRevision() {
            let $this = this;
            if (Object.keys($this.revision).length) {
                let currentPage = $this.sidebar.find('.vi-wbe-pagination a.item.active').data('page') || 1;
                _functions__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
                    data: {sub_action: 'auto_save_revision', data: $this.revision, page: currentPage || 1},
                    success(res) {
                        if (res.success) {
                            if (res.data.updatePage) $('#vi-wbe-history-points-list tbody').html(res.data.updatePage);
                            $this.revision = {};
                            $this.sidebar.find('.vi-wbe-pagination').html(_functions__WEBPACK_IMPORTED_MODULE_0__["default"].pagination(res.data.pages, currentPage));
                        }
                    },
                    error(res) {
                        console.log(res);
                    }
                });
            }
        }

    }

    new BulkEdit();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUIsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCLGdCQUFnQixNQUFNO0FBQ3RCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QixpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQSxzRkFBc0YsNkRBQTZEO0FBQ25KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1VEFBdVQ7QUFDdlQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdDQUF3QyxvRkFBb0Ysb0tBQW9LLGlIQUFpSCxtQkFBbUI7QUFDNWE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7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QjtBQUNBLG9CQUFvQixrREFBRTtBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHdCQUF3QixtREFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxtREFBVTtBQUM1RCxvREFBb0QsbURBQVU7QUFDOUQsd0RBQXdELG1EQUFVO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtEQUFFLFFBQVEsa0RBQUU7QUFDeEM7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxvQkFBb0Isa0RBQUU7QUFDdEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlELGtEQUFFO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxrREFBRSxRQUFRLGtEQUFFO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrREFBRTtBQUNsQiwyQkFBMkIsK0VBQStFO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLGtEQUFFO0FBQzVFO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXNzZXRzLy4vc3JjL2FkZC1pbWFnZS10by1tdWx0aS1nYWxsZXJ5LmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9jYWxjdWxhdG9yLmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9jdXN0b20tY29sdW1uLmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9maW5kLWFuZC1yZXBsYWNlLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYXNzZXRzLy4vc3JjL2ZpbmQtYW5kLXJlcGxhY2UtdGFncy5qcyIsIndlYnBhY2s6Ly9hc3NldHMvLi9zcmMvZmluZC1hbmQtcmVwbGFjZS5qcyIsIndlYnBhY2s6Ly9hc3NldHMvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9tb2RhbC1wb3B1cC5qcyIsIndlYnBhY2s6Ly9hc3NldHMvLi9zcmMvbXVsdGlwbGUtcHJvZHVjdC1hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Fzc2V0cy8uL3NyYy9wdXJpZnkuanMiLCJ3ZWJwYWNrOi8vYXNzZXRzLy4vc3JjL3JlbW92ZS1wcm9kdWN0LWF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYXNzZXRzLy4vc3JjL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vYXNzZXRzLy4vc3JjL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9hc3NldHMvLi9zcmMvdGV4dC1tdWx0aS1jZWxscy1lZGl0LmpzIiwid2VicGFjazovL2Fzc2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hc3NldHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYXNzZXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hc3NldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hc3NldHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hc3NldHMvLi9zcmMvZWRpdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXR0cmlidXRlc30gZnJvbSBcIi4vYXR0cmlidXRlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkSW1hZ2VUb011bHRpR2FsbGVyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIGNlbGxzLCB4LCB5LCBlKSB7XHJcbiAgICAgICAgdGhpcy5jZWxscyA9IGNlbGxzO1xyXG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xyXG4gICAgICAgIHRoaXMueCA9IHBhcnNlSW50KHgpO1xyXG4gICAgICAgIHRoaXMueSA9IHBhcnNlSW50KHkpO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBsZXQgJHRoaXMgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG1lZGlhTXVsdGlwbGUgPSB3cC5tZWRpYSh7bXVsdGlwbGU6IHRydWV9KTtcclxuICAgICAgICBtZWRpYU11bHRpcGxlLm9wZW4oKS5vZmYoJ3NlbGVjdCBjbG9zZScpXHJcbiAgICAgICAgICAgIC5vbignc2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBtZWRpYU11bHRpcGxlLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudCA9IGF0dGFjaG1lbnQudG9KU09OKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaG1lbnQudHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnYWxsZXJ5UG9wdXAuZmluZCgnLnZpLXdiZS1nYWxsZXJ5LWltYWdlcycpLmFwcGVuZCh0bXBsLmdhbGxlcnlJbWFnZShhdHRhY2htZW50LnVybCwgYXR0YWNobWVudC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nSWQgPSBhdHRhY2htZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzLmltZ1N0b3JhZ2VbaW1nSWRdID0gYXR0YWNobWVudC51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZEltYWdlKGltZ0lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkSW1hZ2UoaW1nSWQpIHtcclxuXHJcbiAgICAgICAgbGV0IGV4Y2VsT2JqID0gdGhpcy5vYmo7XHJcbiAgICAgICAgbGV0IGJyZWFrQ29udHJvbCA9IGZhbHNlLCByZWNvcmRzID0gW107XHJcbiAgICAgICAgbGV0IGggPSB0aGlzLmNlbGxzO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHZhbHVlID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gWy4uLm5ldyBTZXQodmFsdWUpXTtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnB1c2goaW1nSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChleGNlbE9iai51cGRhdGVDZWxsKHgsIHksIG5ld1ZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBleGNlbE9iai51cGRhdGVGb3JtdWxhQ2hhaW4oeCwgeSwgcmVjb3Jkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBoaXN0b3J5XHJcbiAgICAgICAgZXhjZWxPYmouc2V0SGlzdG9yeSh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ3NldFZhbHVlJyxcclxuICAgICAgICAgICAgcmVjb3JkczogcmVjb3JkcyxcclxuICAgICAgICAgICAgc2VsZWN0aW9uOiBleGNlbE9iai5zZWxlY3RlZENlbGwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0YWJsZSB3aXRoIGN1c3RvbSBjb25maWd1cmF0aW9uIGlmIGFwcGxpY2FibGVcclxuICAgICAgICBleGNlbE9iai51cGRhdGVUYWJsZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtjb2x1bW5GaWx0ZXIsIGN1c3RvbUNvbHVtbn0gZnJvbSBcIi4vY3VzdG9tLWNvbHVtblwiO1xyXG5cclxuY29uc3QgQXR0cmlidXRlcyA9IHtcclxuICAgIC4uLndiZVBhcmFtcyxcclxuICAgIHByb2R1Y3RUeXBlczoge30sXHJcbiAgICBmaWx0ZXJLZXk6IERhdGUubm93KCksXHJcbiAgICBzZWxlY3RQYWdlOiAxLFxyXG4gICAgYWpheERhdGE6IHthY3Rpb246ICd2aV93YmVfYWpheCcsIHZpX3diZV9ub25jZTogd2JlUGFyYW1zLm5vbmNlfSxcclxuICAgIHRpbnlNY2VPcHRpb25zOiB7XHJcbiAgICAgICAgdGlueW1jZToge1xyXG4gICAgICAgICAgICB0aGVtZTogXCJtb2Rlcm5cIixcclxuICAgICAgICAgICAgc2tpbjogXCJsaWdodGdyYXlcIixcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IFwiZW5cIixcclxuICAgICAgICAgICAgZm9ybWF0czoge1xyXG4gICAgICAgICAgICAgICAgYWxpZ25sZWZ0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAge3NlbGVjdG9yOiBcInAsaDEsaDIsaDMsaDQsaDUsaDYsdGQsdGgsZGl2LHVsLG9sLGxpXCIsIHN0eWxlczoge3RleHRBbGlnbjogXCJsZWZ0XCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0b3I6IFwiaW1nLHRhYmxlLGRsLndwLWNhcHRpb25cIiwgY2xhc3NlczogXCJhbGlnbmxlZnRcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBhbGlnbmNlbnRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RvcjogXCJwLGgxLGgyLGgzLGg0LGg1LGg2LHRkLHRoLGRpdix1bCxvbCxsaVwiLCBzdHlsZXM6IHt0ZXh0QWxpZ246IFwiY2VudGVyXCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0b3I6IFwiaW1nLHRhYmxlLGRsLndwLWNhcHRpb25cIiwgY2xhc3NlczogXCJhbGlnbmNlbnRlclwifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGFsaWducmlnaHQ6IFtcclxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0b3I6IFwicCxoMSxoMixoMyxoNCxoNSxoNix0ZCx0aCxkaXYsdWwsb2wsbGlcIiwgc3R5bGVzOiB7dGV4dEFsaWduOiBcInJpZ2h0XCJ9fSxcclxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0b3I6IFwiaW1nLHRhYmxlLGRsLndwLWNhcHRpb25cIiwgY2xhc3NlczogXCJhbGlnbnJpZ2h0XCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgc3RyaWtldGhyb3VnaDoge2lubGluZTogXCJkZWxcIn1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVsYXRpdmVfdXJsczogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlbW92ZV9zY3JpcHRfaG9zdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnZlcnRfdXJsczogZmFsc2UsXHJcbiAgICAgICAgICAgIGJyb3dzZXJfc3BlbGxjaGVjazogdHJ1ZSxcclxuICAgICAgICAgICAgZml4X2xpc3RfZWxlbWVudHM6IHRydWUsXHJcbiAgICAgICAgICAgIGVudGl0aWVzOiBcIjM4LGFtcCw2MCxsdCw2MixndFwiLFxyXG4gICAgICAgICAgICBlbnRpdHlfZW5jb2Rpbmc6IFwicmF3XCIsXHJcbiAgICAgICAgICAgIGtlZXBfc3R5bGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FjaGVfc3VmZml4OiBcIndwLW1jZS00OTExMC0yMDIwMTExMFwiLFxyXG4gICAgICAgICAgICByZXNpemU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgbWVudWJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGJyYW5kaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJldmlld19zdHlsZXM6IFwiZm9udC1mYW1pbHkgZm9udC1zaXplIGZvbnQtd2VpZ2h0IGZvbnQtc3R5bGUgdGV4dC1kZWNvcmF0aW9uIHRleHQtdHJhbnNmb3JtXCIsXHJcbiAgICAgICAgICAgIGVuZF9jb250YWluZXJfb25fZW1wdHlfYmxvY2s6IHRydWUsXHJcbiAgICAgICAgICAgIHdwZWRpdGltYWdlX2h0bWw1X2NhcHRpb25zOiB0cnVlLFxyXG4gICAgICAgICAgICB3cF9sYW5nX2F0dHI6IFwiZW4tVVNcIixcclxuICAgICAgICAgICAgd3Bfa2VlcF9zY3JvbGxfcG9zaXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICB3cF9zaG9ydGN1dF9sYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgIFwiSGVhZGluZyAxXCI6IFwiYWNjZXNzMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZWFkaW5nIDJcIjogXCJhY2Nlc3MyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRpbmcgM1wiOiBcImFjY2VzczNcIixcclxuICAgICAgICAgICAgICAgIFwiSGVhZGluZyA0XCI6IFwiYWNjZXNzNFwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZWFkaW5nIDVcIjogXCJhY2Nlc3M1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRpbmcgNlwiOiBcImFjY2VzczZcIixcclxuICAgICAgICAgICAgICAgIFwiUGFyYWdyYXBoXCI6IFwiYWNjZXNzN1wiLFxyXG4gICAgICAgICAgICAgICAgXCJCbG9ja3F1b3RlXCI6IFwiYWNjZXNzUVwiLFxyXG4gICAgICAgICAgICAgICAgXCJVbmRlcmxpbmVcIjogXCJtZXRhVVwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdHJpa2V0aHJvdWdoXCI6IFwiYWNjZXNzRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJCb2xkXCI6IFwibWV0YUJcIixcclxuICAgICAgICAgICAgICAgIFwiSXRhbGljXCI6IFwibWV0YUlcIixcclxuICAgICAgICAgICAgICAgIFwiQ29kZVwiOiBcImFjY2Vzc1hcIixcclxuICAgICAgICAgICAgICAgIFwiQWxpZ24gY2VudGVyXCI6IFwiYWNjZXNzQ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJBbGlnbiByaWdodFwiOiBcImFjY2Vzc1JcIixcclxuICAgICAgICAgICAgICAgIFwiQWxpZ24gbGVmdFwiOiBcImFjY2Vzc0xcIixcclxuICAgICAgICAgICAgICAgIFwiSnVzdGlmeVwiOiBcImFjY2Vzc0pcIixcclxuICAgICAgICAgICAgICAgIFwiQ3V0XCI6IFwibWV0YVhcIixcclxuICAgICAgICAgICAgICAgIFwiQ29weVwiOiBcIm1ldGFDXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBhc3RlXCI6IFwibWV0YVZcIixcclxuICAgICAgICAgICAgICAgIFwiU2VsZWN0IGFsbFwiOiBcIm1ldGFBXCIsXHJcbiAgICAgICAgICAgICAgICBcIlVuZG9cIjogXCJtZXRhWlwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZWRvXCI6IFwibWV0YVlcIixcclxuICAgICAgICAgICAgICAgIFwiQnVsbGV0IGxpc3RcIjogXCJhY2Nlc3NVXCIsXHJcbiAgICAgICAgICAgICAgICBcIk51bWJlcmVkIGxpc3RcIjogXCJhY2Nlc3NPXCIsXHJcbiAgICAgICAgICAgICAgICBcIkluc2VydFxcL2VkaXQgaW1hZ2VcIjogXCJhY2Nlc3NNXCIsXHJcbiAgICAgICAgICAgICAgICBcIkluc2VydFxcL2VkaXQgbGlua1wiOiBcIm1ldGFLXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJlbW92ZSBsaW5rXCI6IFwiYWNjZXNzU1wiLFxyXG4gICAgICAgICAgICAgICAgXCJUb29sYmFyIFRvZ2dsZVwiOiBcImFjY2Vzc1pcIixcclxuICAgICAgICAgICAgICAgIFwiSW5zZXJ0IFJlYWQgTW9yZSB0YWdcIjogXCJhY2Nlc3NUXCIsXHJcbiAgICAgICAgICAgICAgICBcIkluc2VydCBQYWdlIEJyZWFrIHRhZ1wiOiBcImFjY2Vzc1BcIixcclxuICAgICAgICAgICAgICAgIFwiRGlzdHJhY3Rpb24tZnJlZSB3cml0aW5nIG1vZGVcIjogXCJhY2Nlc3NXXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFkZCBNZWRpYVwiOiBcImFjY2Vzc01cIixcclxuICAgICAgICAgICAgICAgIFwiS2V5Ym9hcmQgU2hvcnRjdXRzXCI6IFwiYWNjZXNzSFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGNvbnRlbnRfY3NzOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC93cC1pbmNsdWRlcy9jc3MvZGFzaGljb25zLm1pbi5jc3M/dmVyPTUuNi4yLGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC93cC1pbmNsdWRlcy9qcy90aW55bWNlL3NraW5zL3dvcmRwcmVzcy93cC1jb250ZW50LmNzcz92ZXI9NS42LjIsaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVNvdXJjZStTYW5zK1Bybzo0MDAlMkMzMDAlMkMzMDBpdGFsaWMlMkM0MDBpdGFsaWMlMkM2MDAlMkM3MDAlMkM5MDAmc3Vic2V0PWxhdGluJTJDbGF0aW4tZXh0LGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC93cC1jb250ZW50L3RoZW1lcy9zdG9yZWZyb250L2Fzc2V0cy9jc3MvYmFzZS9ndXRlbmJlcmctZWRpdG9yLmNzc1wiLFxyXG4gICAgICAgICAgICBwbHVnaW5zOiBcImNoYXJtYXAsY29sb3JwaWNrZXIsaHIsbGlzdHMsbWVkaWEscGFzdGUsdGFiZm9jdXMsdGV4dGNvbG9yLGZ1bGxzY3JlZW4sd29yZHByZXNzLHdwYXV0b3Jlc2l6ZSx3cGVkaXRpbWFnZSx3cGVtb2ppLHdwZ2FsbGVyeSx3cGxpbmssd3BkaWFsb2dzLHdwdGV4dHBhdHRlcm4sd3B2aWV3XCIsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiBcIiN2aS13YmUtdGV4dC1lZGl0b3JcIixcclxuICAgICAgICAgICAgd3BhdXRvcDogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbGJhcjE6IFwiZm9ybWF0c2VsZWN0LGJvbGQsaXRhbGljLGJ1bGxpc3QsbnVtbGlzdCxibG9ja3F1b3RlLGFsaWdubGVmdCxhbGlnbmNlbnRlcixhbGlnbnJpZ2h0LGxpbmssd3BfbW9yZSxzcGVsbGNoZWNrZXIsZnVsbHNjcmVlbix3cF9hZHZcIixcclxuICAgICAgICAgICAgdG9vbGJhcjI6IFwic3RyaWtldGhyb3VnaCxocixmb3JlY29sb3IscGFzdGV0ZXh0LHJlbW92ZWZvcm1hdCxjaGFybWFwLG91dGRlbnQsaW5kZW50LHVuZG8scmVkbyx3cF9oZWxwXCIsXHJcbiAgICAgICAgICAgIHRhYmZvY3VzX2VsZW1lbnRzOiBcIjpwcmV2LDpuZXh0XCIsXHJcbiAgICAgICAgICAgIGJvZHlfY2xhc3M6IFwiZXhjZXJwdCBwb3N0LXR5cGUtcHJvZHVjdCBwb3N0LXN0YXR1cy1wdWJsaXNoIHBhZ2UtdGVtcGxhdGUtZGVmYXVsdCBsb2NhbGUtZW4tdXNcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lZGlhQnV0dG9uczogdHJ1ZSxcclxuICAgICAgICBxdWlja3RhZ3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBzZXRDb2x1bW5zKHJhdykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gSlNPTi5wYXJzZShyYXcpO1xyXG4gICAgICAgICAgICBBdHRyaWJ1dGVzLmNvbHVtbnMgPSBjb2x1bW5zLm1hcCgoY29sKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sICYmIGNvbC5lZGl0b3IgJiYgY3VzdG9tQ29sdW1uW2NvbC5lZGl0b3JdKSBjb2wuZWRpdG9yID0gY3VzdG9tQ29sdW1uW2NvbC5lZGl0b3JdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbCAmJiBjb2wuZmlsdGVyICYmIGNvbHVtbkZpbHRlcltjb2wuZmlsdGVyXSkgY29sLmZpbHRlciA9IGNvbHVtbkZpbHRlcltjb2wuZmlsdGVyXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2w7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG53aW5kb3cuQXR0cmlidXRlcyA9IEF0dHJpYnV0ZXM7XHJcbmNvbnN0IEkxOG4gPSB3YmVJMThuLmkxOG47XHJcbmV4cG9ydCB7QXR0cmlidXRlcywgSTE4bn0gOyIsImltcG9ydCBfZiBmcm9tICcuL2Z1bmN0aW9ucyc7XHJcbmltcG9ydCB7UG9wdXB9IGZyb20gXCIuL21vZGFsLXBvcHVwXCI7XHJcblxyXG5jb25zdCAkID0galF1ZXJ5O1xyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCB4LCB5LCBlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2RhdGEuamV4Y2VsID0gb2JqO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueCA9IHBhcnNlSW50KHgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueSA9IHBhcnNlSW50KHkpO1xyXG4gICAgICAgIHRoaXMucnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbaWRdIHx8ICcnXHJcbiAgICB9XHJcblxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGxldCBmb3JtdWxhSHRtbCA9IHRoaXMuY29udGVudCgpO1xyXG4gICAgICAgIGxldCBjZWxsID0gJChgdGRbZGF0YS14PSR7dGhpcy5nZXQoJ3gnKSB8fCAwfV1bZGF0YS15PSR7dGhpcy5nZXQoJ3knKSB8fCAwfV1gKTtcclxuICAgICAgICBuZXcgUG9wdXAoZm9ybXVsYUh0bWwsIGNlbGwpO1xyXG4gICAgICAgIGZvcm11bGFIdG1sLm9uKCdjbGljaycsICcudmktd2JlLWFwcGx5LWZvcm11bGEnLCB0aGlzLmFwcGx5Rm9ybXVsYS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBmb3JtdWxhSHRtbC5vbignY2hhbmdlJywgJy52aS13YmUtcm91bmRlZCcsIHRoaXMudG9nZ2xlRGVjaW1hbFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLWZvcm11bGEtY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJ2aS13YmUtb3BlcmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIitcIj4rPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCItXCI+LTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIGNsYXNzPVwidmktd2JlLXZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS11bml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmaXhlZFwiPm48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInBlcmNlbnRhZ2VcIj4lPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS1yb3VuZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJub19yb3VuZFwiPiR7X2YudGV4dCgnTm8gcm91bmQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJvdW5kXCI+JHtfZi50ZXh0KCdSb3VuZCB3aXRoIGRlY2ltYWwnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJvdW5kX3VwXCI+JHtfZi50ZXh0KCdSb3VuZCB1cCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicm91bmRfZG93blwiPiR7X2YudGV4dCgnUm91bmQgZG93bicpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwXCIgY2xhc3M9XCJ2aS13YmUtZGVjaW1hbFwiIHZhbHVlPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLWFwcGx5LWZvcm11bGFcIj4ke19mLnRleHQoJ09LJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBvcGVyYXRvciA9IGZvcm0uZmluZCgnLnZpLXdiZS1vcGVyYXRvcicpLnZhbCgpLFxyXG4gICAgICAgICAgICBmVmFsdWUgPSBwYXJzZUZsb2F0KGZvcm0uZmluZCgnLnZpLXdiZS12YWx1ZScpLnZhbCgpKSxcclxuICAgICAgICAgICAgdW5pdCA9IGZvcm0uZmluZCgnLnZpLXdiZS11bml0JykudmFsKCksXHJcbiAgICAgICAgICAgIHJvdW5kZWQgPSBmb3JtLmZpbmQoJy52aS13YmUtcm91bmRlZCcpLnZhbCgpLFxyXG4gICAgICAgICAgICBkZWNpbWFsID0gcGFyc2VJbnQoZm9ybS5maW5kKCcudmktd2JlLWRlY2ltYWwnKS52YWwoKSksXHJcbiAgICAgICAgICAgIGV4Y2VsT2JqID0gdGhpcy5nZXQoJ2pleGNlbCcpO1xyXG5cclxuICAgICAgICBpZiAoIWZWYWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgaCA9IGV4Y2VsT2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBmb3JtdWxhKG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIG9sZFZhbHVlID0gcGFyc2VGbG9hdChvbGRWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLicpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBleHRyYVZhbHVlID0gdW5pdCA9PT0gJ3BlcmNlbnRhZ2UnID8gb2xkVmFsdWUgKiBmVmFsdWUgLyAxMDAgOiBmVmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IG9wZXJhdG9yID09PSAnLScgPyBvbGRWYWx1ZSAtIGV4dHJhVmFsdWUgOiBvbGRWYWx1ZSArIGV4dHJhVmFsdWU7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHJvdW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnRvRml4ZWQoZGVjaW1hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAncm91bmRfdXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5jZWlsKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdyb3VuZF9kb3duJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGguZmxvb3IobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4XSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpXHJcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goZXhjZWxPYmoudXBkYXRlQ2VsbCh4LCB5LCBmb3JtdWxhKHZhbHVlKSkpO1xyXG4gICAgICAgICAgICAgICAgZXhjZWxPYmoudXBkYXRlRm9ybXVsYUNoYWluKHgsIHksIHJlY29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaGlzdG9yeVxyXG4gICAgICAgIGV4Y2VsT2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogZXhjZWxPYmouc2VsZWN0ZWRDZWxsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGFibGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbiBpZiBhcHBsaWNhYmxlXHJcbiAgICAgICAgZXhjZWxPYmoudXBkYXRlVGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVEZWNpbWFsVmFsdWUoKSB7XHJcbiAgICAgICAgbGV0IGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJy52aS13YmUtZm9ybXVsYS1jb250YWluZXInKTtcclxuICAgICAgICBmb3JtLmZpbmQoJy52aS13YmUtZGVjaW1hbCcpLmhpZGUoKTtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJ3JvdW5kJykgZm9ybS5maW5kKCcudmktd2JlLWRlY2ltYWwnKS5zaG93KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdG9yQmFzZU9uUmVndWxhclByaWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKG9iaiwgeCwgeSwgZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhLmpleGNlbCA9IG9iajtcclxuICAgICAgICB0aGlzLl9kYXRhLnggPSBwYXJzZUludCh4KTtcclxuICAgICAgICB0aGlzLl9kYXRhLnkgPSBwYXJzZUludCh5KTtcclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW2lkXSB8fCAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBsZXQgZm9ybXVsYUh0bWwgPSB0aGlzLmNvbnRlbnQoKTtcclxuICAgICAgICBsZXQgY2VsbCA9ICQoYHRkW2RhdGEteD0ke3RoaXMuZ2V0KCd4JykgfHwgMH1dW2RhdGEteT0ke3RoaXMuZ2V0KCd5JykgfHwgMH1dYCk7XHJcbiAgICAgICAgbmV3IFBvcHVwKGZvcm11bGFIdG1sLCBjZWxsKTtcclxuICAgICAgICBmb3JtdWxhSHRtbC5vbignY2xpY2snLCAnLnZpLXdiZS1hcHBseS1mb3JtdWxhJywgdGhpcy5hcHBseUZvcm11bGEuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgZm9ybXVsYUh0bWwub24oJ2NoYW5nZScsICcudmktd2JlLXJvdW5kZWQnLCB0aGlzLnRvZ2dsZURlY2ltYWxWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gJChgPGRpdiBjbGFzcz1cInZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXdiZS1vcGVyYXRvciB2aS11aSBidXR0b24gYmFzaWMgc21hbGwgaWNvblwiPjxpIGNsYXNzPVwiaWNvbiBtaW51c1wiPiA8L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIGNsYXNzPVwidmktd2JlLXZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS11bml0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwZXJjZW50YWdlXCI+JTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZml4ZWRcIj5uPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS1yb3VuZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJub19yb3VuZFwiPiR7X2YudGV4dCgnTm8gcm91bmQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJvdW5kXCI+JHtfZi50ZXh0KCdSb3VuZCB3aXRoIGRlY2ltYWwnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJvdW5kX3VwXCI+JHtfZi50ZXh0KCdSb3VuZCB1cCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicm91bmRfZG93blwiPiR7X2YudGV4dCgnUm91bmQgZG93bicpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwXCIgY2xhc3M9XCJ2aS13YmUtZGVjaW1hbFwiIHZhbHVlPVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLWFwcGx5LWZvcm11bGFcIj4ke19mLnRleHQoJ09LJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBmVmFsdWUgPSBwYXJzZUZsb2F0KGZvcm0uZmluZCgnLnZpLXdiZS12YWx1ZScpLnZhbCgpKSxcclxuICAgICAgICAgICAgdW5pdCA9IGZvcm0uZmluZCgnLnZpLXdiZS11bml0JykudmFsKCksXHJcbiAgICAgICAgICAgIHJvdW5kZWQgPSBmb3JtLmZpbmQoJy52aS13YmUtcm91bmRlZCcpLnZhbCgpLFxyXG4gICAgICAgICAgICBkZWNpbWFsID0gcGFyc2VJbnQoZm9ybS5maW5kKCcudmktd2JlLWRlY2ltYWwnKS52YWwoKSksXHJcbiAgICAgICAgICAgIGV4Y2VsT2JqID0gdGhpcy5nZXQoJ2pleGNlbCcpO1xyXG5cclxuICAgICAgICBpZiAoIWZWYWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgaCA9IGV4Y2VsT2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBmb3JtdWxhKHJlZ3VsYXJQcmljZSkge1xyXG4gICAgICAgICAgICByZWd1bGFyUHJpY2UgPSBwYXJzZUZsb2F0KHJlZ3VsYXJQcmljZS5yZXBsYWNlKCcsJywgJy4nKSk7XHJcbiAgICAgICAgICAgIGxldCBleHRyYVZhbHVlID0gdW5pdCA9PT0gJ3BlcmNlbnRhZ2UnID8gcmVndWxhclByaWNlICogZlZhbHVlIC8gMTAwIDogZlZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSByZWd1bGFyUHJpY2UgLSBleHRyYVZhbHVlO1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlID4gMCA/IG5ld1ZhbHVlIDogMDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAocm91bmRlZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncm91bmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUudG9GaXhlZChkZWNpbWFsKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JvdW5kX3VwJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGguY2VpbChuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyb3VuZF9kb3duJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IE1hdGguZmxvb3IobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4IC0gMV0gfHwgMDtcclxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChleGNlbE9iai51cGRhdGVDZWxsKHgsIHksIGZvcm11bGEodmFsdWUpKSk7XHJcbiAgICAgICAgICAgICAgICBleGNlbE9iai51cGRhdGVGb3JtdWxhQ2hhaW4oeCwgeSwgcmVjb3Jkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBoaXN0b3J5XHJcbiAgICAgICAgZXhjZWxPYmouc2V0SGlzdG9yeSh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ3NldFZhbHVlJyxcclxuICAgICAgICAgICAgcmVjb3JkczogcmVjb3JkcyxcclxuICAgICAgICAgICAgc2VsZWN0aW9uOiBleGNlbE9iai5zZWxlY3RlZENlbGwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0YWJsZSB3aXRoIGN1c3RvbSBjb25maWd1cmF0aW9uIGlmIGFwcGxpY2FibGVcclxuICAgICAgICBleGNlbE9iai51cGRhdGVUYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZURlY2ltYWxWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgZm9ybSA9ICQodGhpcykuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGZvcm0uZmluZCgnLnZpLXdiZS1kZWNpbWFsJykuaGlkZSgpO1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAncm91bmQnKSBmb3JtLmZpbmQoJy52aS13YmUtZGVjaW1hbCcpLnNob3coKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGxOdW1iZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9iaiwgeCwgeSwgZSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhLmpleGNlbCA9IG9iajtcclxuICAgICAgICB0aGlzLl9kYXRhLnggPSBwYXJzZUludCh4KTtcclxuICAgICAgICB0aGlzLl9kYXRhLnkgPSBwYXJzZUludCh5KTtcclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhW2lkXSB8fCAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBsZXQgZm9ybXVsYUh0bWwgPSB0aGlzLmNvbnRlbnQoKTtcclxuICAgICAgICBsZXQgY2VsbCA9ICQoYHRkW2RhdGEteD0ke3RoaXMuZ2V0KCd4JykgfHwgMH1dW2RhdGEteT0ke3RoaXMuZ2V0KCd5JykgfHwgMH1dYCk7XHJcbiAgICAgICAgbmV3IFBvcHVwKGZvcm11bGFIdG1sLCBjZWxsKTtcclxuICAgICAgICBmb3JtdWxhSHRtbC5vbignY2xpY2snLCAnLnZpLXdiZS1hcHBseS1mb3JtdWxhJywgdGhpcy5hcHBseUZvcm11bGEuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gJChgPGRpdiBjbGFzcz1cInZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj4ke19mLnRleHQoJ0Zyb20nKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwXCIgY2xhc3M9XCJ2aS13YmUtZmlsbC1mcm9tXCIgdmFsdWU9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPiR7X2YudGV4dCgnU3RlcCcpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMTBcIiBjbGFzcz1cInZpLXdiZS1maWxsLXN0ZXBcIiB2YWx1ZT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBtaW5pIHZpLXdiZS1hcHBseS1mb3JtdWxhXCI+JHtfZi50ZXh0KCdGaWxsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBmcm9tID0gcGFyc2VGbG9hdChmb3JtLmZpbmQoJy52aS13YmUtZmlsbC1mcm9tJykudmFsKCkpLFxyXG4gICAgICAgICAgICBzdGVwID0gcGFyc2VGbG9hdChmb3JtLmZpbmQoJy52aS13YmUtZmlsbC1zdGVwJykudmFsKCkpLFxyXG4gICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgZXhjZWxPYmogPSB0aGlzLmdldCgnamV4Y2VsJyk7XHJcblxyXG4gICAgICAgIC8vIGlmICghZlZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBicmVha0NvbnRyb2wgPSBmYWxzZSwgcmVjb3JkcyA9IFtdO1xyXG4gICAgICAgIGxldCBoID0gZXhjZWxPYmouc2VsZWN0ZWRDb250YWluZXI7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gaFsxXSwgZW5kID0gaFszXSwgeCA9IGhbMF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICBpZiAoZXhjZWxPYmoucmVjb3Jkc1t5XVt4XSAmJiAhZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRvbmx5JykgJiYgZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgYnJlYWtDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZnJvbSArIHN0ZXAgKiBpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChleGNlbE9iai51cGRhdGVDZWxsKHgsIHksIHZhbHVlLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgIGV4Y2VsT2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGhpc3RvcnlcclxuICAgICAgICBleGNlbE9iai5zZXRIaXN0b3J5KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnc2V0VmFsdWUnLFxyXG4gICAgICAgICAgICByZWNvcmRzOiByZWNvcmRzLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb246IGV4Y2VsT2JqLnNlbGVjdGVkQ2VsbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRhYmxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb24gaWYgYXBwbGljYWJsZVxyXG4gICAgICAgIGV4Y2VsT2JqLnVwZGF0ZVRhYmxlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IENhbGN1bGF0b3I7IiwiaW1wb3J0IF9mIGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZXN9IGZyb20gXCIuL2F0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuXHJcbmNvbnN0IGN1c3RvbUNvbHVtbiA9IHt9O1xyXG5jb25zdCBjb2x1bW5GaWx0ZXIgPSB7fTtcclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuICAgIHdpbmRvdy52aUlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgY29uc3QgbWVkaWFNdWx0aXBsZSA9IHdwLm1lZGlhKHttdWx0aXBsZTogdHJ1ZX0pO1xyXG4gICAgY29uc3QgbWVkaWFTaW5nbGUgPSB3cC5tZWRpYSh7bXVsdGlwbGU6IGZhbHNlfSk7XHJcblxyXG4gICAgY29uc3QgdG1wbCA9IHtcclxuICAgICAgICBnYWxsZXJ5SW1hZ2Uoc3JjLCBpZCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gJChkb2N1bWVudCkudHJpZ2dlckhhbmRsZXIoJ2J1bGt5X2dhbGxlcnlfYXR0YWNobWVudF9yZW5kZXInLFtzcmMsIGlkXSk7XHJcbiAgICAgICAgICAgIGlmICghdG1wKXtcclxuICAgICAgICAgICAgICAgIHRtcCA9IGA8bGkgY2xhc3M9XCJ2aS13YmUtZ2FsbGVyeS1pbWFnZVwiIGRhdGEtaWQ9XCIke2lkfVwiPjxpIGNsYXNzPVwidmktd2JlLXJlbW92ZS1pbWFnZSBkYXNoaWNvbnMgZGFzaGljb25zLW5vLWFsdFwiPiA8L2k+PGltZyBzcmM9XCIke3NyY31cIj48L2xpPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRtcDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxlRG93bmxvYWQoJF9maWxlID0ge30pIHtcclxuICAgICAgICAgICAgbGV0IHtpZCwgbmFtZSwgZmlsZX0gPSAkX2ZpbGU7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSAkKGA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48aSBjbGFzcz1cImJhcnMgaWNvblwiPjwvaT48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInZpLXdiZS1maWxlLW5hbWVcIiB2YWx1ZT1cIiR7bmFtZSB8fCAnJ31cIj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInZpLXdiZS1maWxlLXVybFwiIHZhbHVlPVwiJHtmaWxlIHx8ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBjbGFzcz1cInZpLXdiZS1maWxlLWhhc2hcIiB2YWx1ZT1cIiR7aWQgfHwgJyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBtaW5pIHZpLXdiZS1jaG9vc2UtZmlsZVwiPiR7X2YudGV4dCgnQ2hvb3NlIGZpbGUnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInZpLXdiZS1yZW1vdmUtZmlsZSBkYXNoaWNvbnMgZGFzaGljb25zLW5vLWFsdFwiPiA8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5gKTtcclxuXHJcbiAgICAgICAgICAgIHJvdy5vbignY2xpY2snLCAnLnZpLXdiZS1yZW1vdmUtZmlsZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJvdy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY3VzdG9tQ29sdW1uLnRleHRFZGl0b3IgPSB7XHJcbiAgICAgICAgdHlwZTogJ3RleHRFZGl0b3InLFxyXG5cclxuICAgICAgICBjcmVhdGVDZWxsKGNlbGwsIGksIHZhbHVlLCBvYmopIHtcclxuICAgICAgICAgICAgY2VsbC5pbm5lckhUTUwgPSBfZi5zdHJpcEh0bWwodmFsdWUpLnNsaWNlKDAsICQoJyN2aS13YmUtc3ByZWFkc2hlZXQnKS5oYXNDbGFzcygndmlidWxreS1zcHJlYWRzaGVldC13cmFwLW1vZGUnKT8gNTAwIDo1MCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlRWRpdG9yKGNlbGwsIHNhdmUpIHtcclxuICAgICAgICAgICAgd2luZG93LnZpSXNFZGl0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoc2F2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHdwLmVkaXRvci5nZXRDb250ZW50KCd2aS13YmUtdGV4dC1lZGl0b3InKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3cC5lZGl0b3IucmVtb3ZlKCd2aS13YmUtdGV4dC1lZGl0b3InKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcudmktdWkubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy52aS11aS5tb2RhbCcpLmZpbmQoJy5jbG9zZS5pY29uJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9LDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3cC5lZGl0b3IucmVtb3ZlKCd2aS13YmUtdGV4dC1lZGl0b3InKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCggXCIjdmktd2JlLXRleHQtZWRpdG9yXCIgKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvcGVuRWRpdG9yKGNlbGwsIGVsLCBvYmopIHtcclxuICAgICAgICAgICAgd2luZG93LnZpSXNFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS15JyksXHJcbiAgICAgICAgICAgICAgICB4ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpLFxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IG9iai5vcHRpb25zLmRhdGFbeV1beF0sXHJcbiAgICAgICAgICAgICAgICAkdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBtb2RhbENsb3NlID0gJCgnLnZpLXVpLm1vZGFsIC5jbG9zZS5pY29uJyk7XHJcbiAgICAgICAgICAgICQoJy52aS11aS5tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIHRoaXMudGlueW1jZUluaXQoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbENsb3NlLm9mZignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICQoJy52aS13YmUtdGV4dC1lZGl0b3Itc2F2ZScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdsb2FkaW5nJykucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS10ZXh0LWVkaXRvci1zYXZlLWNsaWNraW5nJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI3ZpLXdiZS10ZXh0LWVkaXRvcicpLmlzKCc6dmlzaWJsZScpKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCd2aS13YmUtdGV4dC1lZGl0b3Itc2F2ZS1jbGlja2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyN2aS13YmUtdGV4dC1lZGl0b3ItdG1jZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygncHJpbWFyeSBsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5pc0VkaXRpbmcgPSAhJCh0aGlzKS5oYXNDbGFzcygndmktd2JlLWNsb3NlJyk7XHJcbiAgICAgICAgICAgICAgICBvYmouY2xvc2VFZGl0b3IoY2VsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxDbG9zZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouY2xvc2VFZGl0b3IoY2VsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtb2RhbCA9ICQoJy52aS11aS5tb2RhbCcpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmNsb3NlRWRpdG9yKGNlbGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVDZWxsKGNlbGwsIHZhbHVlLCBmb3JjZSkge1xyXG4gICAgICAgICAgICBsZXQgZWRpdG9yVmFsdWUgPSB3cC5lZGl0b3IuZ2V0Q29udGVudCgndmktd2JlLXRleHQtZWRpdG9yJyk7XHJcbiAgICAgICAgICAgIGlmICggZWRpdG9yVmFsdWUudHJpbSgpLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVkaXRvclZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNlbGwuaW5uZXJIVE1MID0gX2Yuc3RyaXBIdG1sKHZhbHVlKS5zbGljZSgwLCA1MCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0aW55bWNlSW5pdChjb250ZW50ID0gJycpIHtcclxuICAgICAgICAgICAgY29udGVudCA9IHdwLmVkaXRvci5hdXRvcChjb250ZW50KTtcclxuICAgICAgICAgICAgaWYgKHRpbnltY2UuZ2V0KCd2aS13YmUtdGV4dC1lZGl0b3InKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgJCgnI3ZpLXdiZS10ZXh0LWVkaXRvcicpLnZhbChjb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzLnRpbnlNY2VPcHRpb25zLnRpbnltY2Uuc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy52aS13YmUtdGV4dC1lZGl0b3Itc2F2ZTpub3QoLnZpLXdiZS1jbG9zZSknKS5hZGRDbGFzcygncHJpbWFyeScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCcudmktd2JlLXRleHQtZWRpdG9yLXNhdmUtY2xpY2tpbmcnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy52aS13YmUtdGV4dC1lZGl0b3Itc2F2ZS1jbGlja2luZycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd3AuZWRpdG9yLmluaXRpYWxpemUoJ3ZpLXdiZS10ZXh0LWVkaXRvcicsIEF0dHJpYnV0ZXMudGlueU1jZU9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGlueW1jZS5nZXQoJ3ZpLXdiZS10ZXh0LWVkaXRvcicpLnNldENvbnRlbnQoY29udGVudClcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4uaW1hZ2UgPSB7XHJcbiAgICAgICAgY3JlYXRlQ2VsbChjZWxsLCBpLCB2YWx1ZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IEF0dHJpYnV0ZXMuaW1nU3RvcmFnZVt2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICBfZi5pc1VybCh1cmwpID8gJChjZWxsKS5odG1sKGA8aW1nIHdpZHRoPVwiNDBcIiBzcmM9XCIke3VybH1cIiBkYXRhLWlkPVwiJHt2YWx1ZX1cIj5gKSA6ICQoY2VsbCkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VFZGl0b3IoY2VsbCwgc2F2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJChjZWxsKS5maW5kKCdpbWcnKS5hdHRyKCdkYXRhLWlkJykgfHwgJyc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9wZW5NZWRpYSgpIHtcclxuICAgICAgICAgICAgICAgIG1lZGlhU2luZ2xlLm9wZW4oKS5vZmYoJ3NlbGVjdCcpLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGxvYWRlZEltYWdlcyA9IG1lZGlhU2luZ2xlLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEltYWdlcyA9IHVwbG9hZGVkSW1hZ2VzLnRvSlNPTigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfZi5pc1VybChzZWxlY3RlZEltYWdlcy51cmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY2VsbCkuaHRtbChgPGltZyB3aWR0aD1cIjQwXCIgc3JjPVwiJHtzZWxlY3RlZEltYWdlcy51cmx9XCIgZGF0YS1pZD1cIiR7c2VsZWN0ZWRJbWFnZXMuaWR9XCI+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXMuaW1nU3RvcmFnZVtzZWxlY3RlZEltYWdlcy5pZF0gPSBzZWxlY3RlZEltYWdlcy51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jbG9zZUVkaXRvcihjZWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChjZWxsKS5vbignZGJsY2xpY2snLCBvcGVuTWVkaWEpO1xyXG5cclxuICAgICAgICAgICAgb3Blbk1lZGlhKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQ2VsbChjZWxsLCB2YWx1ZSwgZm9yY2UpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSkgfHwgJyc7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBBdHRyaWJ1dGVzLmltZ1N0b3JhZ2VbdmFsdWVdO1xyXG4gICAgICAgICAgICBfZi5pc1VybCh1cmwpID8gJChjZWxsKS5odG1sKGA8aW1nIHdpZHRoPVwiNDBcIiBzcmM9XCIke3VybH1cIiBkYXRhLWlkPVwiJHt2YWx1ZX1cIj5gKSA6ICQoY2VsbCkuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4uZ2FsbGVyeSA9IHtcclxuICAgICAgICB0eXBlOiAnZ2FsbGVyeScsXHJcblxyXG4gICAgICAgIHNhdmVEYXRhKGNlbGwpIHtcclxuICAgICAgICAgICAgbGV0IG5ld0lkcyA9IFtdO1xyXG4gICAgICAgICAgICAkKGNlbGwpLmZpbmQoJy52aS13YmUtZ2FsbGVyeS1pbWFnZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SWRzLnB1c2goJCh0aGlzKS5kYXRhKCdpZCcpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoY2VsbCkuZmluZCgnLnZpLXdiZS1pZHMtbGlzdCcpLnZhbChuZXdJZHMuam9pbignLCcpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVDZWxsKGNlbGwsIGksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCBoYXNJdGVtID0gdmFsdWUubGVuZ3RoID8gJ3ZpLXdiZS1nYWxsZXJ5LWhhcy1pdGVtJyA6ICcnO1xyXG4gICAgICAgICAgICAkKGNlbGwpLmFkZENsYXNzKCd2aS13YmUtZ2FsbGVyeScpO1xyXG4gICAgICAgICAgICAkKGNlbGwpLmh0bWwoYDxkaXYgY2xhc3M9XCJ2aS13YmUtZ2FsbGVyeSAke2hhc0l0ZW19XCI+PGkgY2xhc3M9XCJpbWFnZXMgb3V0bGluZSBpY29uXCI+IDwvaT48L2Rpdj5gKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VFZGl0b3IoY2VsbCwgc2F2ZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlJc0VkaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoc2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gJChjZWxsKS5jaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZmluZCgnLnZpLXdiZS1nYWxsZXJ5LWltYWdlJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaCgkKHRoaXMpLmRhdGEoJ2lkJykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChjZWxsKS5maW5kKCcudmktd2JlLWNlbGwtcG9wdXAnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9wZW5FZGl0b3IoY2VsbCwgZWwsIG9iaikge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlJc0VkaXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS15JyksXHJcbiAgICAgICAgICAgICAgICB4ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlkcyA9IG9iai5vcHRpb25zLmRhdGFbeV1beF0sXHJcbiAgICAgICAgICAgICAgICBpbWFnZXMgPSAnJywgY2FjaGVFZGl0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGlkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBBdHRyaWJ1dGVzLmltZ1N0b3JhZ2VbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcyArPSB0bXBsLmdhbGxlcnlJbWFnZShzcmMsIGlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGdhbGxlcnlQb3B1cCA9ICQoYDxkaXYgY2xhc3M9XCJ2aS13YmUtY2VsbC1wb3B1cC1pbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJ2aS13YmUtZ2FsbGVyeS1pbWFnZXNcIj4ke2ltYWdlc308L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXVpIGJ1dHRvbiB0aW55IHZpLXdiZS1hZGQtaW1hZ2VcIj4ke19mLnRleHQoJ0FkZCBpbWFnZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aS11aSBidXR0b24gdGlueSB2aS13YmUtcmVtb3ZlLWdhbGxlcnlcIj4ke19mLnRleHQoJ1JlbW92ZSBhbGwnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcblxyXG4gICAgICAgICAgICBfZi5jcmVhdGVFZGl0b3IoY2VsbCwgJ2RpdicsIGdhbGxlcnlQb3B1cCk7XHJcblxyXG4gICAgICAgICAgICBnYWxsZXJ5UG9wdXAuZmluZCgnLnZpLXdiZS1nYWxsZXJ5LWltYWdlcycpLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiAnbGkudmktd2JlLWdhbGxlcnktaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxTZW5zaXRpdml0eTogNDAsXHJcbiAgICAgICAgICAgICAgICBmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZvcmNlSGVscGVyU2l6ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXI6ICdjbG9uZScsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3ZpLXdiZS1zb3J0YWJsZS1wbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgICAgICB0b2xlcmFuY2U6IFwicG9pbnRlclwiLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdhbGxlcnlQb3B1cC5vbignY2xpY2snLCAnLnZpLXdiZS1yZW1vdmUtaW1hZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdhbGxlcnlQb3B1cC5vbignY2xpY2snLCAnLnZpLXdiZS1hZGQtaW1hZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtZWRpYU11bHRpcGxlLm9wZW4oKS5vZmYoJ3NlbGVjdCBjbG9zZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gbWVkaWFNdWx0aXBsZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50ID0gYXR0YWNobWVudC50b0pTT04oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbGxvd19hdHRhY2htZW50ID0gJChkb2N1bWVudCkudHJpZ2dlckhhbmRsZXIoJ2J1bGt5X2dhbGxlcnlfYXBwcm92ZV9hdHRhY2htZW50JyxbY2VsbCxvYmosIGF0dGFjaG1lbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd19hdHRhY2htZW50IHx8IGF0dGFjaG1lbnQudHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXMuaW1nU3RvcmFnZVthdHRhY2htZW50LmlkXSA9IGF0dGFjaG1lbnQudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbGxlcnlQb3B1cC5maW5kKCcudmktd2JlLWdhbGxlcnktaW1hZ2VzJykuYXBwZW5kKHRtcGwuZ2FsbGVyeUltYWdlKGF0dGFjaG1lbnQudXJsLCBhdHRhY2htZW50LmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdhbGxlcnlQb3B1cC5vbignY2xpY2snLCAnLnZpLXdiZS1yZW1vdmUtZ2FsbGVyeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdhbGxlcnlQb3B1cC5maW5kKCcudmktd2JlLWdhbGxlcnktaW1hZ2VzJykuZW1wdHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ2FsbGVyeVBvcHVwLmZpbmQoJy52aS13YmUtYWRkLWltYWdlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUNlbGwoY2VsbCwgdmFsdWUsIGZvcmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBpY29uID0gJChjZWxsKS5maW5kKCcudmktd2JlLWdhbGxlcnknKTtcclxuICAgICAgICAgICAgdmFsdWUubGVuZ3RoID8gaWNvbi5hZGRDbGFzcygndmktd2JlLWdhbGxlcnktaGFzLWl0ZW0nKSA6IGljb24ucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS1nYWxsZXJ5LWhhcy1pdGVtJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4uZG93bmxvYWQgPSB7XHJcbiAgICAgICAgY3JlYXRlQ2VsbChjZWxsLCBpLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAkKGNlbGwpLmh0bWwoYDxkaXY+PGkgY2xhc3M9XCJkb3dubG9hZCBpY29uXCI+IDwvaT48L2Rpdj5gKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VFZGl0b3IoY2VsbCwgc2F2ZSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoc2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gJChjZWxsKS5jaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZmluZCgndGFibGUudmktd2JlLWZpbGVzLWRvd25sb2FkIHRib2R5IHRyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJvdy5maW5kKCcudmktd2JlLWZpbGUtaGFzaCcpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiByb3cuZmluZCgnLnZpLXdiZS1maWxlLXVybCcpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb3cuZmluZCgnLnZpLXdiZS1maWxlLW5hbWUnKS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgeSA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSxcclxuICAgICAgICAgICAgICAgIHggPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsZXMgPSBvYmoub3B0aW9ucy5kYXRhW3ldW3hdLFxyXG4gICAgICAgICAgICAgICAgY2FjaGVFZGl0aW9uLCB0Ym9keSA9ICQoJzx0Ym9keT48L3Rib2R5PicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kKHRtcGwuZmlsZURvd25sb2FkKGZpbGUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZpbGVEb3dubG9hZFBvcHVwID0gJChgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidmktd2JlLWZpbGVzLWRvd25sb2FkIHZpLXVpIGNlbGxlZCB0YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD4ke19mLnRleHQoJ05hbWUnKX08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+JHtfZi50ZXh0KCdGaWxlIFVSTCcpfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIHRpbnkgdmktd2JlLWFkZC1maWxlXCI+JHtfZi50ZXh0KCdBZGQgZmlsZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcblxyXG4gICAgICAgICAgICBmaWxlRG93bmxvYWRQb3B1cC5maW5kKCcudmktd2JlLWZpbGVzLWRvd25sb2FkJykuYXBwZW5kKHRib2R5KTtcclxuXHJcbiAgICAgICAgICAgIF9mLmNyZWF0ZUVkaXRvcihjZWxsLCAnZGl2JywgZmlsZURvd25sb2FkUG9wdXApO1xyXG5cclxuICAgICAgICAgICAgdGJvZHkuc29ydGFibGUoKTtcclxuXHJcbiAgICAgICAgICAgIGZpbGVEb3dubG9hZFBvcHVwLm9uKCdjbGljaycsICcudmktd2JlLWFkZC1maWxlJywgKCkgPT4gZmlsZURvd25sb2FkUG9wdXAuZmluZCgnLnZpLXdiZS1maWxlcy1kb3dubG9hZCB0Ym9keScpLmFwcGVuZCh0bXBsLmZpbGVEb3dubG9hZCgpKSk7XHJcblxyXG4gICAgICAgICAgICBmaWxlRG93bmxvYWRQb3B1cC5vbignY2xpY2snLCAnLnZpLXdiZS1jaG9vc2UtZmlsZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlRWRpdGlvbiA9IG9iai5lZGl0aW9uO1xyXG4gICAgICAgICAgICAgICAgb2JqLmVkaXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9ICQodGhpcykuY2xvc2VzdCgndHInKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYVNpbmdsZS5vcGVuKCkub2ZmKCdzZWxlY3QgY2xvc2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gbWVkaWFTaW5nbGUuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLmZpcnN0KCkudG9KU09OKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC51cmwpIHJvdy5maW5kKCcudmktd2JlLWZpbGUtdXJsJykudmFsKHNlbGVjdGVkLnVybCkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2Nsb3NlJywgKCkgPT4gb2JqLmVkaXRpb24gPSBjYWNoZUVkaXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlRG93bmxvYWRQb3B1cC5maW5kKCcudmktd2JlLWFkZC1maWxlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUNlbGwoY2VsbCwgdmFsdWUsIGZvcmNlKSB7XHJcbiAgICAgICAgICAgICQoY2VsbCkuaHRtbChgPGRpdj48aSBjbGFzcz1cImRvd25sb2FkIGljb25cIj4gPC9pPjwvZGl2PmApO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY3VzdG9tQ29sdW1uLnRhZ3MgPSB7XHJcbiAgICAgICAgdHlwZTogJ3RhZ3MnLFxyXG4gICAgICAgIGNyZWF0ZUNlbGwoY2VsbCwgaSwgdmFsdWUsIG9iaikge1xyXG4gICAgICAgICAgICBfZi5mb3JtYXRUZXh0KGNlbGwsIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpLFxyXG4gICAgICAgICAgICAgICAgeCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG9iai5vcHRpb25zLmRhdGFbeV1beF0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QgPSAkKCc8c2VsZWN0IGNsYXNzPVwiYnVsa3ktc2VsZWN0LXRhZ1wiIC8+JyksXHJcbiAgICAgICAgICAgICAgICBhZGRCdG4gPSAkKCc8c3BhbiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBtaW5pIGJhc2ljXCI+QWRkPC9zcGFuPicpLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yID0gX2YuY3JlYXRlRWRpdG9yKGNlbGwsICdkaXYnLCAnPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDtcIj48ZGl2IGNsYXNzPVwiYnVsa3ktc2VsZWN0LXRhZy13cmFwcGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYnVsa3ktYWRkLXNlbGVjdC10YWdcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hLZXk7XHJcblxyXG4gICAgICAgICAgICAkKGVkaXRvcikuZmluZCgnLmJ1bGt5LXNlbGVjdC10YWctd3JhcHBlcicpLmFwcGVuZChzZWxlY3QpO1xyXG4gICAgICAgICAgICAkKGVkaXRvcikuZmluZCgnLmJ1bGt5LWFkZC1zZWxlY3QtdGFnJykuYXBwZW5kKGFkZEJ0bik7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Quc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAzLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IF9mLnRleHQoJ1NlYXJjaCB0YWdzLi4uJyksXHJcbiAgICAgICAgICAgICAgICBhamF4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBBdHRyaWJ1dGVzLmFqYXhVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLkF0dHJpYnV0ZXMuYWpheERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJfYWN0aW9uOiAnc2VhcmNoX3RhZ3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwdWJsaWMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtyZXN1bHRzOiBkYXRhfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hLZXkgPSAnJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3QuZmluZCgnb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCB0cnVlKS5wYXJlbnQoKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHJcbiAgICAgICAgICAgIC8vICQoZWRpdG9yKS5maW5kKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignY2hhbmdlJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hLZXkgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFkZEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oc2VhcmNoS2V5LCBzZWFyY2hLZXksIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZWRpdG9yKS5maW5kKCcuYnVsa3ktc2VsZWN0LXRhZycpLmFwcGVuZChuZXdPcHRpb24pLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEtleSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3NlRWRpdG9yKGNlbGwsIHNhdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gJChjZWxsKS5jaGlsZHJlbigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGNoaWxkLmZpbmQoJ3NlbGVjdCcpLnNlbGVjdDIoJ2RhdGEnKSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goe2lkOiBpdGVtLmlkLCB0ZXh0OiBpdGVtLnRleHR9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCcuc2VsZWN0Mi1jb250YWluZXInKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUNlbGwoY2VsbCwgdmFsdWUsIGZvcmNlLCBvYmosIHgpIHtcclxuICAgICAgICAgICAgX2YuZm9ybWF0VGV4dChjZWxsLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGN1c3RvbUNvbHVtbi5saW5rX3Byb2R1Y3RzID0ge1xyXG4gICAgICAgIGNyZWF0ZUNlbGwoY2VsbCwgaSwgdmFsdWUsIG9iaikge1xyXG4gICAgICAgICAgICBfZi5mb3JtYXRUZXh0KGNlbGwsIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VFZGl0b3IoY2VsbCwgc2F2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSAkKGNlbGwpLmNoaWxkcmVuKCksIHNlbGVjdGVkID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoc2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBjaGlsZC5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKCdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goe2lkOiBpdGVtLmlkLCB0ZXh0OiBpdGVtLnRleHR9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoJy5zZWxlY3QyLWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpLFxyXG4gICAgICAgICAgICAgICAgeCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG9iai5vcHRpb25zLmRhdGFbeV1beF0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QgPSAkKCc8c2VsZWN0Lz4nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBlZGl0b3IgPSBfZi5jcmVhdGVFZGl0b3IoY2VsbCwgJ2RpdicsIHNlbGVjdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Quc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAzLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IF9mLnRleHQoJ1NlYXJjaCBwcm9kdWN0cy4uLicpLFxyXG4gICAgICAgICAgICAgICAgYWpheDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogQXR0cmlidXRlcy5hamF4VXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogMjUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uQXR0cmlidXRlcy5hamF4RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yl9hY3Rpb246ICdzZWFyY2hfcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwdWJsaWMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlcm1zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKGlkLCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybXMucHVzaCh7aWQ6IGlkLCB0ZXh0OiB0ZXh0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogdGVybXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0LmZpbmQoJ29wdGlvbicpLmF0dHIoJ3NlbGVjdGVkJywgdHJ1ZSkucGFyZW50KCkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICQoZWRpdG9yKS5maW5kKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVDZWxsKGNlbGwsIHZhbHVlLCBmb3JjZSwgb2JqLCB4KSB7XHJcbiAgICAgICAgICAgIF9mLmZvcm1hdFRleHQoY2VsbCwgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4ucHJvZHVjdF9hdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIHR5cGU6ICdwcm9kdWN0X2F0dHJpYnV0ZXMnLFxyXG5cclxuICAgICAgICBjcmVhdGVDZWxsKGNlbGwsIGksIHZhbHVlLCBvYmopIHtcclxuICAgICAgICAgICAgbGV0IGhhc0l0ZW0gPSBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID8gJ3ZpLXdiZS1oYXMtYXR0cnMnIDogJyc7XHJcbiAgICAgICAgICAgICQoY2VsbCkuaHRtbChgPGRpdiBjbGFzcz1cInZpLXdiZS1wcm9kdWN0LWF0dHJzICR7aGFzSXRlbX1cIj48aSBjbGFzcz1cImljb24gZWRpdFwiLz48L2Rpdj5gKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQ2VsbChjZWxsLCB2YWx1ZSwgZm9yY2UsIG9iaiwgeCkge1xyXG4gICAgICAgICAgICBsZXQgaWNvbiA9ICQoY2VsbCkuZmluZCgnLnZpLXdiZS1wcm9kdWN0LWF0dHJzJyk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPyBpY29uLmFkZENsYXNzKCd2aS13YmUtaGFzLWF0dHJzJykgOiBpY29uLnJlbW92ZUNsYXNzKCd2aS13YmUtaGFzLWF0dHJzJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gX2YuZ2V0RGF0YUZyb21DZWxsKG9iaiwgY2VsbCksXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VHlwZSA9IF9mLmdldFByb2R1Y3RUeXBlRnJvbUNlbGwoY2VsbCksXHJcbiAgICAgICAgICAgICAgICAkdGhpcyA9IHRoaXMsIGh0bWwgPSAnJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFR5cGUgPSBwcm9kdWN0VHlwZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtb2RhbCA9IF9mLmNyZWF0ZU1vZGFsKHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogX2YudGV4dCgnRWRpdCBhdHRyaWJ1dGVzJyksXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFt7Y2xhc3M6ICdzYXZlLWF0dHJpYnV0ZXMnLCB0ZXh0OiBfZi50ZXh0KCdTYXZlJyl9XSxcclxuICAgICAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKGNlbGwpLmFwcGVuZChtb2RhbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFR5cGUgIT09ICd2YXJpYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQge2F0dHJpYnV0ZXN9ID0gQXR0cmlidXRlcztcclxuICAgICAgICAgICAgICAgIGxldCBhZGRBdHRyaWJ1dGUgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7X2YudGV4dCgnQ3VzdG9tIHByb2R1Y3QgYXR0cmlidXRlJyl9PC9vcHRpb24+YDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRBdHRyaWJ1dGUgKz0gYDxvcHRpb24gdmFsdWU9XCIke2F0dHJ9XCI+JHthdHRyaWJ1dGVzW2F0dHJdLmRhdGEuYXR0cmlidXRlX2xhYmVsfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkQXR0cmlidXRlID0gYDxkaXYgY2xhc3M9XCJ2aS13YmUtdGF4b25vbXktaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJ2aS13YmUtc2VsZWN0LXRheG9ub215XCI+JHthZGRBdHRyaWJ1dGV9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIHRpbnkgdmktd2JlLWFkZC10YXhvbm9teVwiPiR7X2YudGV4dCgnQWRkJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAkdGhpcy5jcmVhdGVSb3dUYWJsZShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGAke2FkZEF0dHJpYnV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidmktdWkgY2VsbGVkIHRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BdHRyaWJ1dGVzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggd2lkdGg9XCIxXCI+QWN0aW9uczwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT4ke2h0bWx9PC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5gO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5jb250ZW50JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuZmluZCgndGFibGUgc2VsZWN0Jykuc2VsZWN0Mih7bXVsdGlwbGU6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJ3Rib2R5Jykuc29ydGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAndHInLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGF4aXM6ICd5JyxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxTZW5zaXRpdml0eTogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyOiAnY2xvbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZTogJy5pY29uLm1vdmUnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0T3B0aW9uRGlzYWJsZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbC5maW5kKCdzZWxlY3Qudmktd2JlLXNlbGVjdC10YXhvbm9teSBvcHRpb24nKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJ2lucHV0W3R5cGU9aGlkZGVuXScpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXggPSAkKGVsKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWwuZmluZChgc2VsZWN0LnZpLXdiZS1zZWxlY3QtdGF4b25vbXkgb3B0aW9uW3ZhbHVlPScke3RheH0nXWApLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHNldE9wdGlvbkRpc2FibGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkdGhpc1RhcmdldCA9ICQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkdGhpc1RhcmdldC5oYXNDbGFzcygndHJhc2gnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpc1RhcmdldC5jbG9zZXN0KCd0cicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcHRpb25EaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3ZpLXdiZS1hZGQtdGF4b25vbXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGF4U2VsZWN0ID0gJCgnLnZpLXdiZS1zZWxlY3QtdGF4b25vbXknKSwgdGF4ID0gdGF4U2VsZWN0LnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHtuYW1lOiB0YXgsIG9wdGlvbnM6IFtdfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRheCkgaXRlbS5pc190YXhvbm9teSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gJCgkdGhpcy5jcmVhdGVSb3dUYWJsZShpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJ3RhYmxlIHRib2R5JykuYXBwZW5kKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHttdWx0aXBsZTogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRPcHRpb25EaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRheFNlbGVjdC52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzVGFyZ2V0Lmhhc0NsYXNzKCd2aS13YmUtc2VsZWN0LWFsbC1hdHRyaWJ1dGVzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRkID0gJHRoaXNUYXJnZXQuY2xvc2VzdCgndGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9IHRkLmZpbmQoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QuZmluZCgnb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzVGFyZ2V0Lmhhc0NsYXNzKCd2aS13YmUtc2VsZWN0LW5vLWF0dHJpYnV0ZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGQgPSAkdGhpc1RhcmdldC5jbG9zZXN0KCd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ID0gdGQuZmluZCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC5maW5kKCdvcHRpb24nKS5hdHRyKCdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzVGFyZ2V0Lmhhc0NsYXNzKCd2aS13YmUtYWRkLW5ldy1hdHRyaWJ1dGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QXR0ciA9IHByb21wdChfZi50ZXh0KCdFbnRlciBhIG5hbWUgZm9yIHRoZSBuZXcgYXR0cmlidXRlIHRlcm06JykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdBdHRyKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHIgPSAkdGhpc1RhcmdldC5jbG9zZXN0KCd0ci52aS13YmUtYXR0cmlidXRlLXJvdycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGF4QXR0ciA9IHRyLmF0dHIoJ2RhdGEtYXR0cicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRheEF0dHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRheEF0dHIgPSBKU09OLnBhcnNlKHRheEF0dHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJfYWN0aW9uOiAnYWRkX25ld19hdHRyaWJ1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXhvbm9teTogdGF4QXR0ci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtOiBuZXdBdHRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc1RhcmdldC5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSB0ci5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke3Jlcy5kYXRhLnRlcm1faWR9XCIgc2VsZWN0ZWQ+JHtyZXMuZGF0YS5uYW1lfTwvb3B0aW9uPmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXR0cmlidXRlcy5hdHRyaWJ1dGVzW3RheEF0dHIubmFtZV0udGVybXNbcmVzLmRhdGEudGVybV9pZF0gPSB7c2x1ZzogcmVzLmRhdGEuc2x1ZywgdGV4dDogcmVzLmRhdGEubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzVGFyZ2V0LnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhcmlhdGlvbiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRJZCA9IG9iai5vcHRpb25zLmRhdGFbeV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsUHJvZHVjdHMgPSBvYmouZ2V0RGF0YSgpLCBwYXJlbnRBdHRyaWJ1dGVzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IF95IGluIGFsbFByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RJZCA9IGFsbFByb2R1Y3RzW195XVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50SWQgPT0gcHJvZHVjdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4ID0gQXR0cmlidXRlcy5pZE1hcHBpbmdGbGlwLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEF0dHJpYnV0ZXMgPSBvYmoub3B0aW9ucy5kYXRhW195XVt4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXR0ciBvZiBwYXJlbnRBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0gYDxvcHRpb24gdmFsdWU9XCJcIj4ke19mLnRleHQoJ0FueS4uLicpfTwvb3B0aW9uPmAsIG5hbWUgPSBhdHRyLm5hbWUsIGxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5pc190YXhvbm9teSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJEYXRhID0gQXR0cmlidXRlcy5hdHRyaWJ1dGVzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgYXR0ci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlcm0gPSBhdHRyRGF0YS50ZXJtc1tpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGVybS5zbHVnID09PSBkYXRhW25hbWVdID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke3Rlcm0uc2x1Z31cIiAke3NlbGVjdGVkfT4ke3Rlcm0udGV4dH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBhdHRyRGF0YS5kYXRhLmF0dHJpYnV0ZV9sYWJlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgYXR0ci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdmFsdWUgPT09IGRhdGFbbmFtZV0gPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgJHtzZWxlY3RlZH0+JHt2YWx1ZX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYDx0cj48dGQ+JHtsYWJlbH08L3RkPjx0ZD48c2VsZWN0IG5hbWU9XCIke25hbWV9XCI+JHtvcHRpb25zfTwvc2VsZWN0PjwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBodG1sID0gYDx0YWJsZSBjbGFzcz1cInZpLXVpIGNlbGxlZCB0YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD4ke19mLnRleHQoJ0F0dHJpYnV0ZScpfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPiR7X2YudGV4dCgnT3B0aW9uJyl9PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtodG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5gO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5jb250ZW50JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNUYXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdjbG9zZScpIHx8IHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3ZpLXdiZS1tb2RhbC1jb250YWluZXInKSkgb2JqLmNsb3NlRWRpdG9yKGNlbGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdzYXZlLWF0dHJpYnV0ZXMnKSkgb2JqLmNsb3NlRWRpdG9yKGNlbGwsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZUVkaXRvcihjZWxsLCBzYXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gW107XHJcbiAgICAgICAgICAgIGlmIChzYXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0VHlwZSAhPT0gJ3ZhcmlhdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGNlbGwpLmZpbmQoJy52aS13YmUtYXR0cmlidXRlLXJvdycpLmVhY2goZnVuY3Rpb24gKGksIHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcEF0dHIgPSAkKHJvdykuZGF0YSgnYXR0cicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocEF0dHIuaXNfdGF4b25vbXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBBdHRyLm9wdGlvbnMgPSAkKHJvdykuZmluZCgnc2VsZWN0JykudmFsKCkubWFwKE51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwQXR0ci5uYW1lID0gJChyb3cpLmZpbmQoJ2lucHV0LmN1c3RvbS1hdHRyLW5hbWUnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQocm93KS5maW5kKCd0ZXh0YXJlYS5jdXN0b20tYXR0ci12YWwnKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBBdHRyLnZhbHVlID0gdmFsdWUudHJpbSgpLnJlcGxhY2UoL1teXFxTXFxuXSsvZywgJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBBdHRyLm9wdGlvbnMgPSB2YWx1ZS5zcGxpdCgnfCcpLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpLnJlcGxhY2UoL1teXFxTXFxuXSsvZywgJyAnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcEF0dHIudmlzaWJsZSA9ICEhJChyb3cpLmZpbmQoJy5hdHRyLXZpc2liaWxpdHk6Y2hlY2tlZCcpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcEF0dHIudmFyaWF0aW9uID0gISEkKHJvdykuZmluZCgnLmF0dHItdmFyaWF0aW9uOmNoZWNrZWQnKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBBdHRyLnBvc2l0aW9uID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHBBdHRyKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNlbGwpLmZpbmQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24gKGksIHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhWyQocm93KS5hdHRyKCduYW1lJyldID0gJChyb3cpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9mLnJlbW92ZU1vZGFsKGNlbGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVSb3dUYWJsZShpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBhdHRyTmFtZSA9ICcnLCB2YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXNfdGF4b25vbXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBBdHRyaWJ1dGVzLmF0dHJpYnV0ZXNbaXRlbS5uYW1lXSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXJtcyA9IGF0dHJpYnV0ZS50ZXJtcyB8fCBbXSwgb3B0aW9ucyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYCR7YXR0cmlidXRlLmRhdGEuYXR0cmlidXRlX2xhYmVsfTxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIke2l0ZW0ubmFtZX1cIi8+YDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGVybXMpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRlcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGl0ZW0ub3B0aW9ucy5pbmNsdWRlcyhwYXJzZUludChpZCkpID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtpZH1cIiAke3NlbGVjdGVkfT4ke3Rlcm1zW2lkXS50ZXh0fTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBgPHNlbGVjdCBtdWx0aXBsZT4ke29wdGlvbnN9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aS13YmUtYXR0cmlidXRlcy1idXR0b24tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLXNlbGVjdC1hbGwtYXR0cmlidXRlc1wiPiR7X2YudGV4dCgnU2VsZWN0IGFsbCcpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLXNlbGVjdC1uby1hdHRyaWJ1dGVzXCI+JHtfZi50ZXh0KCdTZWxlY3Qgbm9uZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLWFkZC1uZXctYXR0cmlidXRlXCI+JHtfZi50ZXh0KCdBZGQgbmV3Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJjdXN0b20tYXR0ci1uYW1lXCIgdmFsdWU9XCIke2l0ZW0ubmFtZX1cIiBwbGFjZWhvbGRlcj1cIiR7X2YudGV4dCgnQ3VzdG9tIGF0dHJpYnV0ZSBuYW1lJyl9XCIvPmA7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGA8dGV4dGFyZWEgY2xhc3M9XCJjdXN0b20tYXR0ci12YWxcIiBwbGFjZWhvbGRlcj1cIiR7X2YudGV4dCgnRW50ZXIgc29tZSB0ZXh0LCBvciBzb21lIGF0dHJpYnV0ZXMgYnkgXCJ8XCIgc2VwYXJhdGluZyB2YWx1ZXMuJyl9XCI+JHtpdGVtLnZhbHVlIHx8ICcnfTwvdGV4dGFyZWE+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXR0ck5hbWUgPSBgPGRpdiBjbGFzcz1cInZpLXdiZS1hdHRyaWJ1dGUtbmFtZS1sYWJlbFwiPiR7YXR0ck5hbWV9PC9kaXY+YDtcclxuXHJcbiAgICAgICAgICAgIGF0dHJOYW1lICs9IGA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiYXR0ci12aXNpYmlsaXR5XCIgJHtpdGVtLnZpc2libGUgPyAnY2hlY2tlZCcgOiAnJ30gdmFsdWU9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtfZi50ZXh0KCdWaXNpYmxlIG9uIHRoZSBwcm9kdWN0IHBhZ2UnKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZHVjdFR5cGUgPT09ICd2YXJpYWJsZScpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJOYW1lICs9IGA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImF0dHItdmFyaWF0aW9uXCIgJHtpdGVtLnZhcmlhdGlvbiA/ICdjaGVja2VkJyA6ICcnfSB2YWx1ZT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtfZi50ZXh0KCdVc2VkIGZvciB2YXJpYXRpb25zJyl9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgPHRyIGNsYXNzPVwidmktd2JlLWF0dHJpYnV0ZS1yb3dcIiBkYXRhLWF0dHI9JyR7SlNPTi5zdHJpbmdpZnkoaXRlbSl9Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidmktd2JlLWxlZnRcIj4ke2F0dHJOYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3ZhbHVlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInZpLXdiZS1yaWdodFwiPjxpIGNsYXNzPVwiaWNvbiB0cmFzaFwiPiA8L2k+IDxpIGNsYXNzPVwiaWNvbiBtb3ZlXCI+IDwvaT48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4uZGVmYXVsdF9hdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIGNyZWF0ZUNlbGwoY2VsbCwgaSwgdmFsdWUsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpICQoY2VsbCkudGV4dChPYmplY3QudmFsdWVzKHZhbHVlKS5maWx0ZXIoQm9vbGVhbikuam9pbignOyAnKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUNlbGwoY2VsbCwgdmFsdWUsIGZvcmNlLCBvYmosIHgpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNlbGwpLnRleHQoT2JqZWN0LnZhbHVlcyh2YWx1ZSkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJzsgJykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChjZWxsKS50ZXh0KCcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9wZW5FZGl0b3IoY2VsbCwgZWwsIG9iaikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IF9mLmdldERhdGFGcm9tQ2VsbChvYmosIGNlbGwpLFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdFR5cGUgPSBfZi5nZXRQcm9kdWN0VHlwZUZyb21DZWxsKGNlbGwpLFxyXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0VHlwZSA9IHByb2R1Y3RUeXBlO1xyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFR5cGUgPT09ICd2YXJpYWJsZScpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb2RhbCA9IF9mLmNyZWF0ZU1vZGFsKHtoZWFkZXI6IF9mLnRleHQoJ1NldCBkZWZhdWx0IGF0dHJpYnV0ZXMnKSwgY29udGVudDogJycsIGFjdGlvbnM6IFt7Y2xhc3M6ICdzYXZlLWF0dHJpYnV0ZXMnLCB0ZXh0OiBfZi50ZXh0KCdTYXZlJyl9XX0pO1xyXG4gICAgICAgICAgICAgICAgJChjZWxsKS5hcHBlbmQobW9kYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB5ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpLFxyXG4gICAgICAgICAgICAgICAgICAgIHggPSBBdHRyaWJ1dGVzLmlkTWFwcGluZ0ZsaXAuYXR0cmlidXRlcyxcclxuICAgICAgICAgICAgICAgICAgICBwQXR0cmlidXRlcyA9IG9iai5vcHRpb25zLmRhdGFbeV1beF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocEF0dHJpYnV0ZXMpICYmIHBBdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGF0dHIgb2YgcEF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIub3B0aW9ucy5sZW5ndGggPT09IDApIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJOYW1lID0gJycsIHNlbGVjdEh0bWwgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLmlzX3RheG9ub215KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ckRhdGEgPSBBdHRyaWJ1dGVzLmF0dHJpYnV0ZXNbYXR0ci5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHJEYXRhLmRhdGEuYXR0cmlidXRlX2xhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdGVybUlkIG9mIGF0dHIub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXJtID0gYXR0ckRhdGEudGVybXNbdGVybUlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0ZXJtLnNsdWcgPT09IGRhdGFbYXR0ci5uYW1lXSA/ICdzZWxlY3RlZCcgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVybVZhbHVlID0gX2YuaHRtbEVuY29kZSh0ZXJtLnNsdWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RIdG1sICs9IGA8b3B0aW9uIHZhbHVlPVwiJHt0ZXJtVmFsdWV9XCIgJHtzZWxlY3RlZH0+JHt0ZXJtLnRleHR9PC9vcHRpb24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIuYXR0cmlidXRlX2xhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdGVybSBvZiBhdHRyLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0ZXJtID09PSBkYXRhW2F0dHIubmFtZV0gPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlcm1WYWx1ZSA9IF9mLmh0bWxFbmNvZGUodGVybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0SHRtbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7dGVybVZhbHVlfVwiICR7c2VsZWN0ZWR9PiR7dGVybX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEh0bWwgPSBgPG9wdGlvbiB2YWx1ZT1cIlwiPk5vIGRlZmF1bHQgJHthdHRyTmFtZX08L29wdGlvbj4gJHtzZWxlY3RIdG1sfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sICs9IGA8dHI+PHRkPiR7YXR0ck5hbWV9PC90ZD48dGQ+PHNlbGVjdCBuYW1lPVwiJHthdHRyLm5hbWV9XCIgY2xhc3M9XCJ2aS13YmUtZGVmYXVsdC1hdHRyaWJ1dGVcIj4ke3NlbGVjdEh0bWx9PC9zZWxlY3Q+PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5jb250ZW50JykuYXBwZW5kKFRlbXBsYXRlcy5kZWZhdWx0QXR0cmlidXRlcyh7aHRtbH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aGlzVGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ2Nsb3NlJykgfHwgdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLW1vZGFsLWNvbnRhaW5lcicpKSBvYmouY2xvc2VFZGl0b3IoY2VsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdzYXZlLWF0dHJpYnV0ZXMnKSkgb2JqLmNsb3NlRWRpdG9yKGNlbGwsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZUVkaXRvcihjZWxsLCBzYXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgICAgIGlmIChzYXZlID09PSB0cnVlKSAkKGNlbGwpLmZpbmQoJy52aS13YmUtZGVmYXVsdC1hdHRyaWJ1dGUnKS5lYWNoKChpLCBlbCkgPT4gZGF0YVskKGVsKS5hdHRyKCduYW1lJyldID0gJChlbCkudmFsKCkpO1xyXG4gICAgICAgICAgICBfZi5yZW1vdmVNb2RhbChjZWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGN1c3RvbUNvbHVtbi5hcnJheSA9IHtcclxuICAgICAgICBjcmVhdGVDZWxsKGNlbGwsIGksIHZhbHVlLCBvYmopIHtcclxuICAgICAgICAgICAgJChjZWxsKS5odG1sKHZhbHVlID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAvLyAkKGNlbGwpLmh0bWwoJzxpIGNsYXNzPVwiaWNvbiBlZGl0XCIvPicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZUVkaXRvcihjZWxsLCBzYXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoc2F2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEgPSB0aGlzLmVkaXRvci5nZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2YucmVtb3ZlTW9kYWwoY2VsbCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb3BlbkVkaXRvcihjZWxsLCBlbCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gX2YuZ2V0RGF0YUZyb21DZWxsKG9iaiwgY2VsbCk7XHJcbiAgICAgICAgICAgIGxldCBtb2RhbCA9IF9mLmNyZWF0ZU1vZGFsKHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogX2YudGV4dCgnRWRpdCBtZXRhZGF0YScpLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBbe2NsYXNzOiAnc2F2ZS1tZXRhZGF0YScsIHRleHQ6IF9mLnRleHQoJ1NhdmUnKX1dLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoY2VsbCkuYXBwZW5kKG1vZGFsKTtcclxuICAgICAgICAgICAgbW9kYWwuZmluZCgnLmNvbnRlbnQnKS5odG1sKCc8ZGl2IGlkPVwidmktd2JlLWpzb25lZGl0b3JcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IG1vZGFsLmZpbmQoJyN2aS13YmUtanNvbmVkaXRvcicpLmdldCgwKTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgSlNPTkVkaXRvcihjb250YWluZXIsIHtlbmFibGVTb3J0OiBmYWxzZSwgc2VhcmNoOiBmYWxzZSwgZW5hYmxlVHJhbnNmb3JtOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNUYXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdjbG9zZScpIHx8IHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3ZpLXdiZS1tb2RhbC1jb250YWluZXInKSkgb2JqLmNsb3NlRWRpdG9yKGNlbGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdzYXZlLW1ldGFkYXRhJykpIG9iai5jbG9zZUVkaXRvcihjZWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlQ2VsbChjZWxsLCB2YWx1ZSwgZm9yY2UpIHtcclxuXHJcbiAgICAgICAgICAgICQoY2VsbCkuaHRtbCh2YWx1ZSA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGN1c3RvbUNvbHVtbi5vcmRlcl9ub3RlcyA9IHtcclxuXHJcbiAgICAgICAgY3JlYXRlQ2VsbChjZWxsLCBpLCB2YWx1ZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBoYXNJdGVtID0gdmFsdWUubGVuZ3RoID8gJ3ZpLXdiZS1nYWxsZXJ5LWhhcy1pdGVtJyA6ICcnO1xyXG5cclxuICAgICAgICAgICAgJChjZWxsKS5odG1sKGA8ZGl2IGNsYXNzPVwiJHtoYXNJdGVtfVwiPjxpIGNsYXNzPVwiaWNvbiBleWVcIi8+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VFZGl0b3IoY2VsbCwgc2F2ZSkge1xyXG4gICAgICAgICAgICAkKGNlbGwpLmZpbmQoJy52aS13YmUtY2VsbC1wb3B1cCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub3RlcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvcGVuRWRpdG9yKGNlbGwsIGVsLCBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS15JyksXHJcbiAgICAgICAgICAgICAgICB4ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vdGVzID0gb2JqLm9wdGlvbnMuZGF0YVt5XVt4XSxcclxuICAgICAgICAgICAgICAgIF9ub3RlID0gJyc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobm90ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBub3RlLmNvbnRlbnQucmVwbGFjZSgvKD86XFxyXFxufFxccnxcXG4pL2csICc8YnI+JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzQ29sb3IgPSBub3RlLmN1c3RvbWVyX25vdGUgPyAnY3VzdG9tZXInIDogKG5vdGUuYWRkZWRfYnkgPT09ICdzeXN0ZW0nID8gJ3N5c3RlbScgOiAncHJpdmF0ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbm90ZSArPSBgPGRpdiBjbGFzcz1cInZpLXdiZS1ub3RlLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aS13YmUtbm90ZS1yb3ctY29udGVudCAke2NsYXNzQ29sb3J9XCI+JHtjb250ZW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktd2JlLW5vdGUtcm93LW1ldGFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtub3RlLmRhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1jb21tZW50X2lkPVwiJHtub3RlLmlkfVwiIGNsYXNzPVwidmktd2JlLW5vdGUtcm93LWRlbGV0ZVwiPiR7X2YudGV4dCgnRGVsZXRlJyl9PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBnYWxsZXJ5UG9wdXAgPSAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLWNlbGwtcG9wdXAtaW5uZXJcIj4ke19ub3RlfTwvZGl2PmApO1xyXG5cclxuICAgICAgICAgICAgX2YuY3JlYXRlRWRpdG9yKGNlbGwsICdkaXYnLCBnYWxsZXJ5UG9wdXApO1xyXG5cclxuICAgICAgICAgICAgZ2FsbGVyeVBvcHVwLm9uKCdjbGljaycsICcudmktd2JlLW5vdGUtcm93LWRlbGV0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkdGhpc0J0biA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSAkdGhpc0J0bi5kYXRhKCdjb21tZW50X2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtzdWJfYWN0aW9uOiAnZGVsZXRlX29yZGVyX25vdGUnLCBpZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2YubG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5vdGVzLmZpbmRJbmRleChub3RlID0+IG5vdGUuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc0J0bi5jbG9zZXN0KCcudmktd2JlLW5vdGUtcm93JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUNlbGwoY2VsbCwgdmFsdWUsIGZvcmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjdXN0b21Db2x1bW4uc2VsZWN0MiA9IHtcclxuICAgICAgICB0eXBlOiAnc2VsZWN0MicsXHJcblxyXG4gICAgICAgIGNyZWF0ZUNlbGwoY2VsbCwgaSwgdmFsdWUsIG9iaikge1xyXG4gICAgICAgICAgICBsZXQge3NvdXJjZX0gPSBvYmoub3B0aW9ucy5jb2x1bW5zW2ldLCBuZXdWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IE9iamVjdC52YWx1ZXModmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpICYmIHNvdXJjZS5sZW5ndGgpIG5ld1ZhbHVlID0gc291cmNlLmZpbHRlcihpdGVtID0+IHZhbHVlLmluY2x1ZGVzKGl0ZW0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgIF9mLmZvcm1hdFRleHQoY2VsbCwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvcGVuRWRpdG9yKGNlbGwsIGVsLCBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS15JyksXHJcbiAgICAgICAgICAgICAgICB4ID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gb2JqLm9wdGlvbnMuZGF0YVt5XVt4XSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdCA9ICQoJzxzZWxlY3QvPicpLFxyXG4gICAgICAgICAgICAgICAge3NvdXJjZSwgbXVsdGlwbGUsIHBsYWNlaG9sZGVyfSA9IG9iai5vcHRpb25zLmNvbHVtbnNbeF0sXHJcbiAgICAgICAgICAgICAgICBlZGl0b3IgPSBfZi5jcmVhdGVFZGl0b3IoY2VsbCwgJ2RpdicsIHNlbGVjdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Quc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzb3VyY2UgfHwgW10sXHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZTogbXVsdGlwbGUsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0LnZhbCh2YWx1ZSkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICQoZWRpdG9yKS5maW5kKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9zZUVkaXRvcihjZWxsLCBzYXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9ICQoY2VsbCkuY2hpbGRyZW4oKSxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjaGlsZC5maW5kKCdzZWxlY3QnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLm1hcChpdGVtID0+ICFpc05hTihpdGVtKSA/ICtpdGVtIDogaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJCgnLnNlbGVjdDItY29udGFpbmVyJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVDZWxsKGNlbGwsIHZhbHVlLCBmb3JjZSwgb2JqLCB4KSB7XHJcbiAgICAgICAgICAgIGxldCB7c291cmNlfSA9IG9iai5vcHRpb25zLmNvbHVtbnNbeF0sIG5ld1ZhbHVlID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpICYmIHNvdXJjZS5sZW5ndGgpIG5ld1ZhbHVlID0gc291cmNlLmZpbHRlcihpdGVtID0+IHZhbHVlLmluY2x1ZGVzKGl0ZW0uaWQpKTtcclxuXHJcbiAgICAgICAgICAgIF9mLmZvcm1hdFRleHQoY2VsbCwgbmV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuICAgIGNvbHVtbkZpbHRlci5zb3VyY2VGb3JWYXJpYXRpb24gPSAoZWwsIGNlbGwsIHgsIHksIG9iaikgPT4ge1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLnNvdXJjZTtcclxuICAgICAgICBsZXQgcHJvZHVjdFR5cGUgPSBfZi5nZXRQcm9kdWN0VHlwZUZyb21DZWxsKGNlbGwpO1xyXG4gICAgICAgIGlmIChwcm9kdWN0VHlwZSA9PT0gJ3ZhcmlhdGlvbicpIHtcclxuICAgICAgICAgICAgc291cmNlID0gb2JqLm9wdGlvbnMuY29sdW1uc1t4XS5zdWJTb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxyXG5leHBvcnQge2N1c3RvbUNvbHVtbiwgY29sdW1uRmlsdGVyfTsiLCJpbXBvcnQgX2YgZnJvbSAnLi9mdW5jdGlvbnMnO1xyXG5pbXBvcnQge1BvcHVwfSBmcm9tIFwiLi9tb2RhbC1wb3B1cFwiO1xyXG5cclxuY29uc3QgJCA9IGpRdWVyeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZEFuZFJlcGxhY2VPcHRpb25zIHtcclxuICAgIGNvbnN0cnVjdG9yKG9iaiwgY2VsbHMsIHgsIHksIGUpIHtcclxuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XHJcbiAgICAgICAgdGhpcy5vYmogPSBvYmo7XHJcbiAgICAgICAgdGhpcy54ID0gcGFyc2VJbnQoeCk7XHJcbiAgICAgICAgdGhpcy55ID0gcGFyc2VJbnQoeSk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hEYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLnNvdXJjZSB8fCBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgbGV0ICR0aGlzID0gdGhpcztcclxuICAgICAgICBsZXQgZm9ybXVsYUh0bWwgPSB0aGlzLmNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IGNlbGwgPSAkKGB0ZFtkYXRhLXg9JHt0aGlzLnggfHwgMH1dW2RhdGEteT0ke3RoaXMueSB8fCAwfV1gKTtcclxuICAgICAgICBuZXcgUG9wdXAoZm9ybXVsYUh0bWwsIGNlbGwpO1xyXG5cclxuICAgICAgICBmb3JtdWxhSHRtbC5maW5kKCcudmktd2JlLWZpbmQtc3RyaW5nJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIGRhdGE6IFt7aWQ6ICcnLCB0ZXh0OiAnJ30sIC4uLiR0aGlzLnNvdXJjZV1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9ybXVsYUh0bWwuZmluZCgnLnZpLXdiZS1yZXBsYWNlLXN0cmluZycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBkYXRhOiBbe2lkOiAnJywgdGV4dDogJyd9LCAuLi4kdGhpcy5zb3VyY2VdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvcm11bGFIdG1sLm9uKCdjbGljaycsICcudmktd2JlLWFwcGx5LWZvcm11bGEnLCB0aGlzLmFwcGx5Rm9ybXVsYS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLWZvcm11bGEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+JHtfZi50ZXh0KCdGaW5kJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcGxhY2Vob2xkZXI9XCJcIiBjbGFzcz1cInZpLXdiZS1maW5kLXN0cmluZ1wiPiA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4ke19mLnRleHQoJ1JlcGxhY2UnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBwbGFjZWhvbGRlcj1cIlwiIGNsYXNzPVwidmktd2JlLXJlcGxhY2Utc3RyaW5nXCI+IDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLWFwcGx5LWZvcm11bGFcIj4ke19mLnRleHQoJ1JlcGxhY2UnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5JZiAnRmluZCcgdmFsdWUgaXMgZW1wdHksIGFkZCB0byBzZWxlY3RlZCBjZWxscyB3aXRoICdSZXBsYWNlJyB2YWx1ZS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+SWYgJ1JlcGxhY2UnIHZhbHVlIGlzIGVtcHR5LCByZW1vdmUgZnJvbSBzZWxlY3RlZCBjZWxscyB3aXRoICdGaW5kJyB2YWx1ZS48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBmaW5kVmFsdWUgPSBmb3JtLmZpbmQoJy52aS13YmUtZmluZC1zdHJpbmcnKS52YWwoKSxcclxuICAgICAgICAgICAgcmVwbGFjZVZhbHVlID0gZm9ybS5maW5kKCcudmktd2JlLXJlcGxhY2Utc3RyaW5nJykudmFsKCksXHJcbiAgICAgICAgICAgIGV4Y2VsT2JqID0gdGhpcy5vYmo7XHJcblxyXG4gICAgICAgIGlmICghZmluZFZhbHVlICYmICFyZXBsYWNlVmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmluZFZhbHVlID0gIWlzTmFOKGZpbmRWYWx1ZSkgPyArZmluZFZhbHVlIDogZmluZFZhbHVlO1xyXG4gICAgICAgIHJlcGxhY2VWYWx1ZSA9ICFpc05hTihyZXBsYWNlVmFsdWUpID8gK3JlcGxhY2VWYWx1ZSA6IHJlcGxhY2VWYWx1ZTtcclxuXHJcbiAgICAgICAgbGV0IGJyZWFrQ29udHJvbCA9IGZhbHNlLCByZWNvcmRzID0gW107XHJcbiAgICAgICAgbGV0IGggPSB0aGlzLmNlbGxzO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB2YWx1ZSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZmluZFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoICE9PSBuZXdWYWx1ZS5sZW5ndGggfHwgIWZpbmRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnB1c2gocmVwbGFjZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IFsuLi5uZXcgU2V0KG5ld1ZhbHVlKV07XHJcblxyXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKGV4Y2VsT2JqLnVwZGF0ZUNlbGwoeCwgeSwgbmV3VmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGV4Y2VsT2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGhpc3RvcnlcclxuICAgICAgICBleGNlbE9iai5zZXRIaXN0b3J5KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnc2V0VmFsdWUnLFxyXG4gICAgICAgICAgICByZWNvcmRzOiByZWNvcmRzLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb246IGV4Y2VsT2JqLnNlbGVjdGVkQ2VsbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRhYmxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb24gaWYgYXBwbGljYWJsZVxyXG4gICAgICAgIGV4Y2VsT2JqLnVwZGF0ZVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IF9mIGZyb20gJy4vZnVuY3Rpb25zJztcclxuaW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4vbW9kYWwtcG9wdXBcIjtcclxuaW1wb3J0IHtBdHRyaWJ1dGVzfSBmcm9tIFwiLi9hdHRyaWJ1dGVzXCI7XHJcblxyXG5jb25zdCAkID0galF1ZXJ5O1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kQW5kUmVwbGFjZVRhZ3Mge1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCBjZWxscywgeCwgeSwgZSkge1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSBjZWxscztcclxuICAgICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgICAgICB0aGlzLnggPSBwYXJzZUludCh4KTtcclxuICAgICAgICB0aGlzLnkgPSBwYXJzZUludCh5KTtcclxuICAgICAgICB0aGlzLnNlYXJjaERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgbGV0ICR0aGlzID0gdGhpcztcclxuICAgICAgICBsZXQgZm9ybXVsYUh0bWwgPSB0aGlzLmNvbnRlbnQoKTtcclxuICAgICAgICBsZXQgeTEgPSB0aGlzLmNlbGxzWzFdLCB5MiA9IHRoaXMuY2VsbHNbM107XHJcbiAgICAgICAgbGV0IHNlbGVjdERhdGEgPSBbe2lkOiAnJywgdGV4dDogJyd9XTtcclxuICAgICAgICBmb3IgKGxldCBpID0geTE7IGkgPD0geTI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLm9iai5vcHRpb25zLmRhdGFbaV1bdGhpcy54XTtcclxuICAgICAgICAgICAgc2VsZWN0RGF0YS5wdXNoKC4uLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdERhdGEgPSBzZWxlY3REYXRhLmZpbHRlcigoaXRlbSwgaW5kZXgsIHNlbGYpID0+XHJcbiAgICAgICAgICAgIGluZGV4ID09PSBzZWxmLmZpbmRJbmRleCgodCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgdC5pZCA9PT0gaXRlbS5pZCAmJiB0LnRleHQgPT09IGl0ZW0udGV4dFxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGxldCBjZWxsID0gJChgdGRbZGF0YS14PSR7dGhpcy54IHx8IDB9XVtkYXRhLXk9JHt0aGlzLnkgfHwgMH1dYCk7XHJcbiAgICAgICAgbmV3IFBvcHVwKGZvcm11bGFIdG1sLCBjZWxsKTtcclxuXHJcbiAgICAgICAgZm9ybXVsYUh0bWwuZmluZCgnLnZpLXdiZS1maW5kLXN0cmluZycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBkYXRhOiBzZWxlY3REYXRhXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvcm11bGFIdG1sLmZpbmQoJy52aS13YmUtcmVwbGFjZS1zdHJpbmcnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBtaW5pbXVtSW5wdXRMZW5ndGg6IDMsXHJcbiAgICAgICAgICAgIGFqYXg6IHtcclxuICAgICAgICAgICAgICAgIHVybDogQXR0cmlidXRlcy5hamF4VXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLkF0dHJpYnV0ZXMuYWpheERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yl9hY3Rpb246ICdzZWFyY2hfdGFncycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogcGFyYW1zLnRlcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwdWJsaWMnXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5zZWFyY2hEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3Jlc3VsdHM6IGRhdGF9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvcm11bGFIdG1sLm9uKCdjbGljaycsICcudmktd2JlLWFwcGx5LWZvcm11bGEnLCB0aGlzLmFwcGx5Rm9ybXVsYS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLWZvcm11bGEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+JHtfZi50ZXh0KCdGaW5kJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcGxhY2Vob2xkZXI9XCJcIiBjbGFzcz1cInZpLXdiZS1maW5kLXN0cmluZ1wiPiA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4ke19mLnRleHQoJ1JlcGxhY2UnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBwbGFjZWhvbGRlcj1cIlwiIGNsYXNzPVwidmktd2JlLXJlcGxhY2Utc3RyaW5nXCI+IDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLWFwcGx5LWZvcm11bGFcIj4ke19mLnRleHQoJ1JlcGxhY2UnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5JZiAnRmluZCcgdmFsdWUgaXMgZW1wdHksIGFkZCB0byBzZWxlY3RlZCBjZWxscyB3aXRoICdSZXBsYWNlJyB2YWx1ZS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+SWYgJ1JlcGxhY2UnIHZhbHVlIGlzIGVtcHR5LCByZW1vdmUgZnJvbSBzZWxlY3RlZCBjZWxscyB3aXRoICdGaW5kJyB2YWx1ZS48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBmaW5kU3RyaW5nID0gZm9ybS5maW5kKCcudmktd2JlLWZpbmQtc3RyaW5nJykudmFsKCksXHJcbiAgICAgICAgICAgIHJlcGxhY2VTdHJpbmcgPSBmb3JtLmZpbmQoJy52aS13YmUtcmVwbGFjZS1zdHJpbmcnKS52YWwoKSxcclxuICAgICAgICAgICAgZXhjZWxPYmogPSB0aGlzLm9iajtcclxuXHJcbiAgICAgICAgaWYgKCFmaW5kU3RyaW5nICYmICFyZXBsYWNlU3RyaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCByZXBsYWNlID0gdGhpcy5zZWFyY2hEYXRhLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCA9PT0gK3JlcGxhY2VTdHJpbmcpO1xyXG5cclxuICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgaCA9IHRoaXMuY2VsbHM7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gaFsxXSwgZW5kID0gaFszXSwgeCA9IGhbMF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICBpZiAoZXhjZWxPYmoucmVjb3Jkc1t5XVt4XSAmJiAhZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRvbmx5JykgJiYgZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgYnJlYWtDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZXhjZWxPYmoub3B0aW9ucy5kYXRhW3ldW3hdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gK2ZpbmRTdHJpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IG5ld1ZhbHVlLmxlbmd0aCB8fCAhZmluZFN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnB1c2goLi4ucmVwbGFjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBzZWxmKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID09PSBzZWxmLmZpbmRJbmRleCgodCkgPT4gKHQuaWQgPT09IGl0ZW0uaWQgJiYgdC50ZXh0ID09PSBpdGVtLnRleHQpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goZXhjZWxPYmoudXBkYXRlQ2VsbCh4LCB5LCBuZXdWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgZXhjZWxPYmoudXBkYXRlRm9ybXVsYUNoYWluKHgsIHksIHJlY29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaGlzdG9yeVxyXG4gICAgICAgIGV4Y2VsT2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogZXhjZWxPYmouc2VsZWN0ZWRDZWxsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGFibGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbiBpZiBhcHBsaWNhYmxlXHJcbiAgICAgICAgZXhjZWxPYmoudXBkYXRlVGFibGUoKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgX2YgZnJvbSAnLi9mdW5jdGlvbnMnO1xyXG5pbXBvcnQge1BvcHVwfSBmcm9tIFwiLi9tb2RhbC1wb3B1cFwiO1xyXG5cclxuY29uc3QgJCA9IGpRdWVyeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZEFuZFJlcGxhY2Uge1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCB4LCB5LCBlKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2RhdGEuamV4Y2VsID0gb2JqO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueCA9IHBhcnNlSW50KHgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueSA9IHBhcnNlSW50KHkpO1xyXG4gICAgICAgIHRoaXMucnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbaWRdIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBsZXQgZm9ybXVsYUh0bWwgPSB0aGlzLmNvbnRlbnQoKTtcclxuICAgICAgICBsZXQgY2VsbCA9ICQoYHRkW2RhdGEteD0ke3RoaXMuZ2V0KCd4JykgfHwgMH1dW2RhdGEteT0ke3RoaXMuZ2V0KCd5JykgfHwgMH1dYCk7XHJcbiAgICAgICAgbmV3IFBvcHVwKGZvcm11bGFIdG1sLCBjZWxsKTtcclxuICAgICAgICBmb3JtdWxhSHRtbC5vbignY2xpY2snLCAnLnZpLXdiZS1hcHBseS1mb3JtdWxhJywgdGhpcy5hcHBseUZvcm11bGEuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gJChgPGRpdiBjbGFzcz1cInZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7X2YudGV4dCgnRmluZCcpfVwiIGNsYXNzPVwidmktd2JlLWZpbmQtc3RyaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiJHtfZi50ZXh0KCdSZXBsYWNlJyl9XCIgY2xhc3M9XCJ2aS13YmUtcmVwbGFjZS1zdHJpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBtaW5pIHZpLXdiZS1hcHBseS1mb3JtdWxhXCI+JHtfZi50ZXh0KCdSZXBsYWNlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcm11bGEoZSkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnZpLXdiZS1mb3JtdWxhLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICBmaW5kU3RyaW5nID0gZm9ybS5maW5kKCcudmktd2JlLWZpbmQtc3RyaW5nJykudmFsKCksXHJcbiAgICAgICAgICAgIHJlcGxhY2VTdHJpbmcgPSBmb3JtLmZpbmQoJy52aS13YmUtcmVwbGFjZS1zdHJpbmcnKS52YWwoKSxcclxuICAgICAgICAgICAgZXhjZWxPYmogPSB0aGlzLmdldCgnamV4Y2VsJyk7XHJcblxyXG4gICAgICAgIGlmICghZmluZFN0cmluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgaCA9IGV4Y2VsT2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHZhbHVlLnJlcGxhY2VBbGwoZmluZFN0cmluZywgcmVwbGFjZVN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goZXhjZWxPYmoudXBkYXRlQ2VsbCh4LCB5LCBuZXdWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgZXhjZWxPYmoudXBkYXRlRm9ybXVsYUNoYWluKHgsIHksIHJlY29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaGlzdG9yeVxyXG4gICAgICAgIGV4Y2VsT2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogZXhjZWxPYmouc2VsZWN0ZWRDZWxsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGFibGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbiBpZiBhcHBsaWNhYmxlXHJcbiAgICAgICAgZXhjZWxPYmoudXBkYXRlVGFibGUoKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge0F0dHJpYnV0ZXMsIEkxOG59IGZyb20gXCIuL2F0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuXHJcbmNvbnN0ICQgPSBqUXVlcnk7XHJcbmNvbnN0IF9mID0ge1xyXG4gICAgc2V0SmV4Y2VsKG9iaikge1xyXG4gICAgICAgIHRoaXMuamV4Y2VsID0gb2JqO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZXh0KGtleSkge1xyXG4gICAgICAgIHJldHVybiBJMThuW2tleV0gfHwga2V5O1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1VybDogKHVybCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAvXihodHRwKHM/KTopXFwvXFwvLipcXC4oPzpqcGd8anBlZ3xnaWZ8cG5nfHdlYnB8YXZpZikkL2kudGVzdCh1cmwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3JtYXRUZXh0KGNlbGwsIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSAnJztcclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdmFsdWUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtrXSkgdGV4dCArPSB2YWx1ZVtrXS50ZXh0ICsgJzsgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjZWxsLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUVkaXRvcihjZWxsLCB0eXBlLCBjb250ZW50ID0gJycsIGRpc3BsYXkgPSB0cnVlKSB7XHJcbiAgICAgICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnZGl2Jykge1xyXG4gICAgICAgICAgICAkKGVkaXRvcikuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWRpdG9yLnN0eWxlLm1pbldpZHRoID0gJzMwMHB4JztcclxuXHJcbiAgICAgICAgbGV0IHBvcHVwSGVpZ2h0ID0gJChlZGl0b3IpLmlubmVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgIHN0YWdlID0gJChjZWxsKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgeCA9IHN0YWdlLmxlZnQsXHJcbiAgICAgICAgICAgIHkgPSBzdGFnZS50b3AsXHJcbiAgICAgICAgICAgIGNlbGxXaWR0aCA9ICQoY2VsbCkuaW5uZXJXaWR0aCgpLFxyXG4gICAgICAgICAgICBpbmZvID0gY2VsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgaWYgKGRpc3BsYXkpIHtcclxuICAgICAgICAgICAgZWRpdG9yLnN0eWxlLm1pbkhlaWdodCA9IChpbmZvLmhlaWdodCAtIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgZWRpdG9yLnN0eWxlLm1heEhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB5IC0gNTApICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlZGl0b3Iuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5mb250U2l6ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlZGl0b3IuY2xhc3NMaXN0LmFkZCgndmktdWknLCAnc2VnbWVudCcsICd2aS13YmUtY2VsbC1wb3B1cCcsICd2aS13YmUtZWRpdGluZycpO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZWRpdG9yJyk7XHJcbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChlZGl0b3IpO1xyXG5cclxuICAgICAgICBsZXQgcG9wdXBXaWR0aCA9ICQoZWRpdG9yKS5pbm5lcldpZHRoKCk7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMuamV4Y2VsLmVsKS5pbm5lcldpZHRoKCkgPCB4ICsgcG9wdXBXaWR0aCArIGNlbGxXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHggLSBwb3B1cFdpZHRoID4gMCA/IHggLSBwb3B1cFdpZHRoIDogMTA7XHJcbiAgICAgICAgICAgICQoZWRpdG9yKS5jc3MoJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChlZGl0b3IpLmNzcygnbGVmdCcsICh4ICsgY2VsbFdpZHRoKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCA8IHkgKyBwb3B1cEhlaWdodCkge1xyXG4gICAgICAgICAgICBsZXQgaCA9IHkgLSBwb3B1cEhlaWdodCA8IDAgPyAwIDogeSAtIHBvcHVwSGVpZ2h0O1xyXG4gICAgICAgICAgICAkKGVkaXRvcikuY3NzKCd0b3AnLCBoICsgJ3B4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChlZGl0b3IpLmNzcygndG9wJywgeSArICdweCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVkaXRvcjtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTW9kYWwoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHthY3Rpb25zfSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGFjdGlvbnNIdG1sID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uc0h0bWwgKz0gYDxzcGFuIGNsYXNzPVwiJHtpdGVtLmNsYXNzfSB2aS11aSBidXR0b24gdGlueVwiPiR7aXRlbS50ZXh0fTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJChUZW1wbGF0ZXMubW9kYWwoey4uLmRhdGEsIGFjdGlvbnNIdG1sfSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVNb2RhbChjZWxsKSB7XHJcbiAgICAgICAgJChjZWxsKS5maW5kKCcudmktd2JlLW1vZGFsLWNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJy5zZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb2xGcm9tQ29sdW1uVHlwZShjb2xUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIEF0dHJpYnV0ZXMuaWRNYXBwaW5nRmxpcFtjb2xUeXBlXSB8fCAnJztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UHJvZHVjdFR5cGVGcm9tQ2VsbChjZWxsKSB7XHJcbiAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmdldENvbEZyb21Db2x1bW5UeXBlKCdwcm9kdWN0X3R5cGUnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5qZXhjZWwub3B0aW9ucy5kYXRhW3ldID8gdGhpcy5qZXhjZWwub3B0aW9ucy5kYXRhW3ldW3hdIDogbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UHJvZHVjdFR5cGVGcm9tWSh5KSB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLmdldENvbEZyb21Db2x1bW5UeXBlKCdwcm9kdWN0X3R5cGUnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5qZXhjZWwub3B0aW9ucy5kYXRhW3ldID8gdGhpcy5qZXhjZWwub3B0aW9ucy5kYXRhW3ldW3hdIDogbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmV2aWV3VHlwZUZyb20oeSkge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy5nZXRDb2xGcm9tQ29sdW1uVHlwZSgnY29tbWVudF90eXBlJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuamV4Y2VsLm9wdGlvbnMuZGF0YVt5XSA/IHRoaXMuamV4Y2VsLm9wdGlvbnMuZGF0YVt5XVt4XSA6IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvbHVtblR5cGUoeCkge1xyXG4gICAgICAgIHJldHVybiBBdHRyaWJ1dGVzLmlkTWFwcGluZ1t4XVxyXG4gICAgfSxcclxuXHJcbiAgICBzdHJpcEh0bWwoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAkKGA8ZGl2PiR7Y29udGVudH08L2Rpdj5gKS50ZXh0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGFGcm9tQ2VsbChvYmosIGNlbGwpIHtcclxuICAgICAgICBsZXQgeSA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSxcclxuICAgICAgICAgICAgeCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcclxuICAgICAgICByZXR1cm4gb2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UHJvZHVjdElkT2ZDZWxsKG9iaiwgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoub3B0aW9ucy5kYXRhW3ldWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoub3B0aW9ucy5kYXRhW3RhcmdldF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhamF4KGFyZ3MgPSB7fSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgIHVybDogd2JlUGFyYW1zLmFqYXhVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB9LCBhcmdzKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5kYXRhLmFjdGlvbiA9ICd2aV93YmVfYWpheCc7XHJcbiAgICAgICAgb3B0aW9ucy5kYXRhLnZpX3diZV9ub25jZSA9IHdiZVBhcmFtcy5ub25jZTtcclxuICAgICAgICBvcHRpb25zLmRhdGEudHlwZSA9IHdiZVBhcmFtcy5lZGl0VHlwZTtcclxuICAgICAgICAkLmFqYXgob3B0aW9ucyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhZ2luYXRpb24obWF4UGFnZSwgY3VycmVudFBhZ2UpIHtcclxuICAgICAgICBjdXJyZW50UGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKTtcclxuICAgICAgICBtYXhQYWdlID0gcGFyc2VJbnQobWF4UGFnZSk7XHJcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSAnJyxcclxuICAgICAgICAgICAgcHJldmlvdXNBcnJvdyA9IGA8YSBjbGFzcz1cIml0ZW0gJHtjdXJyZW50UGFnZSA9PT0gMSA/ICdkaXNhYmxlZCcgOiAnJ31cIiBkYXRhLXBhZ2U9XCIke2N1cnJlbnRQYWdlIC0gMX1cIj48aSBjbGFzcz1cImljb24gYW5nbGUgbGVmdFwiPiA8L2k+PC9hPmAsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdyA9IGA8YSBjbGFzcz1cIml0ZW0gJHtjdXJyZW50UGFnZSA9PT0gbWF4UGFnZSA/ICdkaXNhYmxlZCcgOiAnJ31cIiBkYXRhLXBhZ2U9XCIke2N1cnJlbnRQYWdlICsgMX1cIj48aSBjbGFzcz1cImljb24gYW5nbGUgcmlnaHRcIj4gPC9pPjwvYT5gLFxyXG4gICAgICAgICAgICBnb1RvUGFnZSA9IGA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwidmktd2JlLWdvLXRvLXBhZ2VcIiB2YWx1ZT1cIiR7Y3VycmVudFBhZ2V9XCIgbWluPVwiMVwiIG1heD1cIiR7bWF4UGFnZX1cIi8+YDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbWF4UGFnZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChbMSwgY3VycmVudFBhZ2UgLSAxLCBjdXJyZW50UGFnZSwgY3VycmVudFBhZ2UgKyAxLCBtYXhQYWdlXS5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbiArPSBgPGEgY2xhc3M9XCJpdGVtICR7Y3VycmVudFBhZ2UgPT09IGkgPyAnYWN0aXZlJyA6ICcnfVwiIGRhdGEtcGFnZT1cIiR7aX1cIj4ke2l9PC9hPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT09IGN1cnJlbnRQYWdlIC0gMiAmJiBjdXJyZW50UGFnZSAtIDIgPiAxKSBwYWdpbmF0aW9uICs9IGA8YSBjbGFzcz1cIml0ZW0gZGlzYWJsZWRcIj4uLi48L2E+YDtcclxuICAgICAgICAgICAgaWYgKGkgPT09IGN1cnJlbnRQYWdlICsgMiAmJiBjdXJyZW50UGFnZSArIDIgPCBtYXhQYWdlKSBwYWdpbmF0aW9uICs9IGA8YSBjbGFzcz1cIml0ZW0gZGlzYWJsZWRcIj4uLi48L2E+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInZpLXVpIHBhZ2luYXRpb24gbWVudVwiPiR7cHJldmlvdXNBcnJvd30gJHtwYWdpbmF0aW9ufSAke25leHRBcnJvd30gPC9kaXY+ICR7Z29Ub1BhZ2V9YDtcclxuICAgIH0sXHJcblxyXG4gICAgc3Bpbm5lcigpIHtcclxuICAgICAgICByZXR1cm4gJCgnPHNwYW4gY2xhc3M9XCJ2aS13YmUtc3Bpbm5lclwiPjxzcGFuIGNsYXNzPVwidmktd2JlLXNwaW5uZXItaW5uZXJcIj4gPC9zcGFuPjwvc3Bhbj4nKVxyXG4gICAgfSxcclxuXHJcbiAgICBpc19sb2FkaW5nKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX3NwaW5uZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5fc3Bpbm5lciA9IHRoaXMuc3Bpbm5lcigpO1xyXG4gICAgICAgICQoJy52aS13YmUtbWVudS1iYXItY2VudGVyJykuaHRtbCh0aGlzLl9zcGlubmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTG9hZGluZygpIHtcclxuICAgICAgICB0aGlzLl9zcGlubmVyID0gbnVsbDtcclxuICAgICAgICAkKCcudmktd2JlLW1lbnUtYmFyLWNlbnRlcicpLmh0bWwoJycpO1xyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2UodGV4dCwgY29sb3IgPSAnYmxhY2snKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLW5vdGljZVwiIHN0eWxlPVwiY29sb3I6JHtjb2xvcn1cIj4ke3RleHR9PC9kaXY+YCk7XHJcbiAgICAgICAgJCgnLnZpLXdiZS1tZW51LWJhci1jZW50ZXInKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250ZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZUNvdXBvbkNvZGUoKSB7XHJcbiAgICAgICAgbGV0ICRyZXN1bHQgPSAnJztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEF0dHJpYnV0ZXMuY291cG9uR2VuZXJhdGUuY2hhcl9sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkcmVzdWx0ICs9IEF0dHJpYnV0ZXMuY291cG9uR2VuZXJhdGUuY2hhcmFjdGVycy5jaGFyQXQoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBBdHRyaWJ1dGVzLmNvdXBvbkdlbmVyYXRlLmNoYXJhY3RlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkcmVzdWx0ID0gQXR0cmlidXRlcy5jb3Vwb25HZW5lcmF0ZS5wcmVmaXggKyAkcmVzdWx0ICsgQXR0cmlidXRlcy5jb3Vwb25HZW5lcmF0ZS5zdWZmaXg7XHJcbiAgICAgICAgcmV0dXJuICRyZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGh0bWxFbmNvZGUoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZyxcIiZhcG9zO1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd01lc3NhZ2Uoe3RpdGxlID0gJycsIG1lc3NhZ2UgPSAnJywgdHlwZSA9ICdwb3NpdGl2ZScsIGR1cmF0aW9uID0gMzAwMH0pIHtcclxuICAgIGNvbnN0IG1haW4gPSAkKCBcIiN2aS13YmUtY29udGFpbmVyXCIgKS5maW5kKCBcIiN2aS1odWktdG9hc3RcIiApO1xyXG4gICAgaWYgKCBtYWluLmdldCgwKSApIHtcclxuICAgICAgICBjb25zdCB0b2FzdCA9ICQoIFwiPGRpdj48L2Rpdj5cIiApO1xyXG4gICAgICAgIGNvbnN0IGF1dG9SZW1vdmVUb2FzdCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWFpbi5maW5kKCBcIi52aS11aS5tZXNzYWdlXCIgKS5yZW1vdmUoKTtcclxuICAgICAgICB9LCBkdXJhdGlvbiArIDEwMDAgKTtcclxuXHJcbiAgICAgICAgdG9hc3Qub24oIFwiY2xpY2tcIiwgXCIuaWNvbi5jbG9zZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBtYWluLmZpbmQoIFwiLnZpLXVpLm1lc3NhZ2VcIiApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoIGF1dG9SZW1vdmVUb2FzdCApO1xyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgaWYgKCBtYWluLmNoaWxkcmVuKCkubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgbWFpbi5maW5kKCBcIi52aS1odWktdG9hc3RcIiApLmZpcnN0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCggYXV0b1JlbW92ZVRvYXN0ICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gKGR1cmF0aW9uIC8gMTAwMCkudG9GaXhlZCgyKTtcclxuXHJcbiAgICAgICAgaWYgKCQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCcpIHtcclxuICAgICAgICAgICAgdG9hc3QuY3NzKCB7IFwiYW5pbWF0aW9uXCI6IGBzbGlkZUluUmlnaHQgZWFzZSAuM3MsIGZhZGVPdXQgbGluZWFyIDFzICR7ZGVsYXl9cyBmb3J3YXJkc2AgfSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvYXN0LmNzcyggeyBcImFuaW1hdGlvblwiOiBgc2xpZGVJbkxlZnQgZWFzZSAuM3MsIGZhZGVPdXQgbGluZWFyIDFzICR7ZGVsYXl9cyBmb3J3YXJkc2AgfSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9hc3QuYWRkQ2xhc3MoIGB2aS11aSAke3R5cGV9IG1lc3NhZ2VgICk7XHJcbiAgICAgICAgdG9hc3QuaHRtbChcclxuICAgICAgICAgICAgYDxpIGNsYXNzPVwiY2xvc2UgaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7bWVzc2FnZX08L3A+YFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICggbWFpbi5jaGlsZHJlbigpLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdEVsZVR5cGUgPSBtYWluLmZpbmQoIFwiLnZpLXVpLm1lc3NhZ2VcIiApLmZpcnN0KCkuYXR0ciggXCJjbGFzc1wiICkuc3BsaXQoL1xccysvKVsxXTtcclxuICAgICAgICAgICAgaWYgKCB0eXBlICE9PSBmaXJzdEVsZVR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCggdG9hc3QgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgbWFpbi5hcHBlbmQoIHRvYXN0ICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfZjsiLCJjb25zdCAkID0galF1ZXJ5O1xyXG5cclxuY2xhc3MgTW9kYWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgcG9wdXBJbnN0YW5jZSA9IG51bGw7XHJcblxyXG5jbGFzcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50LCBjZWxsKSB7XHJcbiAgICAgICAgaWYgKCFwb3B1cEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignbW91c2Vkb3duIGtleWRvd24nLCB0aGlzLm1vdXNlZG93bik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3B1cEluc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cCA9ICQoJy52aS13YmUtY29udGV4dC1wb3B1cCcpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcihjb250ZW50LCAkKGNlbGwpKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZWRvd24oZSkge1xyXG4gICAgICAgIGxldCB0aGlzVGFyZ2V0ID0gJChlLnRhcmdldCksXHJcbiAgICAgICAgICAgIHBvcHVwID0gJCgnLnZpLXdiZS1jb250ZXh0LXBvcHVwJyk7XHJcblxyXG4gICAgICAgIGlmIChlLndoaWNoID09PSAyN1xyXG4gICAgICAgICAgICB8fCAhdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLWNvbnRleHQtcG9wdXAnKVxyXG4gICAgICAgICAgICAmJiB0aGlzVGFyZ2V0LmNsb3Nlc3QoJy52aS13YmUtY29udGV4dC1wb3B1cCcpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAmJiBwb3B1cC5oYXNDbGFzcygndmktd2JlLXBvcHVwLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICYmICF0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdzZWxlY3QyLXNlYXJjaF9fZmllbGQnKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBwb3B1cC5lbXB0eSgpLnJlbW92ZUNsYXNzKCd2aS13YmUtcG9wdXAtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5zZWxlY3QyLWNvbnRhaW5lci5zZWxlY3QyLWNvbnRhaW5lci0tZGVmYXVsdC5zZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoY29udGVudCwgY2VsbCkge1xyXG4gICAgICAgIGxldCB7cG9wdXB9ID0gdGhpcyxcclxuICAgICAgICAgICAgc3RhZ2UgPSBjZWxsLm9mZnNldCgpLFxyXG4gICAgICAgICAgICB4ID0gc3RhZ2UubGVmdCxcclxuICAgICAgICAgICAgeSA9IHN0YWdlLnRvcCxcclxuICAgICAgICAgICAgY2VsbFdpZHRoID0gY2VsbC5pbm5lcldpZHRoKCk7XHJcblxyXG4gICAgICAgIHBvcHVwLmVtcHR5KCk7XHJcbiAgICAgICAgcG9wdXAuYWRkQ2xhc3MoJ3ZpLXdiZS1wb3B1cC1hY3RpdmUnKS5odG1sKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICBsZXQgcG9wdXBXaWR0aCA9IHBvcHVwLmlubmVyV2lkdGgoKSxcclxuICAgICAgICAgICAgcG9wdXBIZWlnaHQgPSBwb3B1cC5pbm5lckhlaWdodCgpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCB4ICsgcG9wdXBXaWR0aCArIGNlbGxXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHggLSBwb3B1cFdpZHRoID4gMCA/IHggLSBwb3B1cFdpZHRoIDogMTA7XHJcbiAgICAgICAgICAgIHBvcHVwLmNzcygnbGVmdCcsIGxlZnQgKyAncHgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwb3B1cC5jc3MoJ2xlZnQnLCAoeCArIGNlbGxXaWR0aCkgKyAncHgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB3aW5kb3dJbm5lckhlaWdodCA9ICQoJyN2aS13YmUtZWRpdG9yJykuaW5uZXJIZWlnaHQoKTtcclxuICAgICAgICBpZiAod2luZG93SW5uZXJIZWlnaHQgPCB5ICsgcG9wdXBIZWlnaHQpIHtcclxuICAgICAgICAgICAgbGV0IGggPSB5IC0gcG9wdXBIZWlnaHQgPCAwID8gMCA6IHkgLSBwb3B1cEhlaWdodDtcclxuICAgICAgICAgICAgcG9wdXAuY3NzKCd0b3AnLCBoICsgJ3B4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcG9wdXAuY3NzKCd0b3AnLCB5ICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5wb3B1cC5yZW1vdmVDbGFzcygndmktd2JlLXBvcHVwLWFjdGl2ZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge01vZGFsLCBQb3B1cH0iLCJpbXBvcnQge0F0dHJpYnV0ZXN9IGZyb20gXCIuL2F0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IF9mIGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xyXG5cclxuY29uc3QgJCA9IGpRdWVyeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlUHJvZHVjdEF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCBjZWxscywgeCwgeSwgZSkge1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSBjZWxscztcclxuICAgICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgICAgICB0aGlzLnggPSBwYXJzZUludCh4KTtcclxuICAgICAgICB0aGlzLnkgPSBwYXJzZUludCh5KTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSAkKGB0ZFtkYXRhLXg9JHt0aGlzLnggfHwgMH1dW2RhdGEteT0ke3RoaXMueSB8fCAwfV1gKTtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gdGhpcywgaHRtbCA9ICcnO1xyXG5cclxuICAgICAgICBsZXQgbW9kYWwgPSBfZi5jcmVhdGVNb2RhbCh7XHJcbiAgICAgICAgICAgIGhlYWRlcjogX2YudGV4dCgnQXR0cmlidXRlcycpLFxyXG4gICAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgICAgYWN0aW9uczogW3tjbGFzczogJ3NhdmUtYXR0cmlidXRlcycsIHRleHQ6IF9mLnRleHQoJ0FwcGx5Jyl9XSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50KG1vZGFsKTtcclxuICAgICAgICAkKGNlbGwpLmFwcGVuZChtb2RhbCk7XHJcblxyXG4gICAgICAgIG1vZGFsLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGlzVGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdjbG9zZScpIHx8IHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3ZpLXdiZS1tb2RhbC1jb250YWluZXInKSkgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzVGFyZ2V0Lmhhc0NsYXNzKCdzYXZlLWF0dHJpYnV0ZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuYWRkQXR0cmlidXRlcyhtb2RhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJbWFnZShpbWdJZCkge1xyXG5cclxuICAgICAgICBsZXQgZXhjZWxPYmogPSB0aGlzLm9iajtcclxuICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgaCA9IHRoaXMuY2VsbHM7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gaFsxXSwgZW5kID0gaFszXSwgeCA9IGhbMF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICBpZiAoZXhjZWxPYmoucmVjb3Jkc1t5XVt4XSAmJiAhZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRvbmx5JykgJiYgZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgYnJlYWtDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZXhjZWxPYmoub3B0aW9ucy5kYXRhW3ldW3hdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgdmFsdWUgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBbLi4ubmV3IFNldCh2YWx1ZSldO1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUucHVzaChpbWdJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKGV4Y2VsT2JqLnVwZGF0ZUNlbGwoeCwgeSwgbmV3VmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGV4Y2VsT2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGhpc3RvcnlcclxuICAgICAgICBleGNlbE9iai5zZXRIaXN0b3J5KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnc2V0VmFsdWUnLFxyXG4gICAgICAgICAgICByZWNvcmRzOiByZWNvcmRzLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb246IGV4Y2VsT2JqLnNlbGVjdGVkQ2VsbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRhYmxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb24gaWYgYXBwbGljYWJsZVxyXG4gICAgICAgIGV4Y2VsT2JqLnVwZGF0ZVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXR0cmlidXRlcyhtb2RhbCkge1xyXG4gICAgICAgIGxldCBuZXdBdHRyaWJ1dGVzID0gW10sXHJcbiAgICAgICAgICAgIGFkZEF0dHJPcHQgPSBtb2RhbC5maW5kKCcudmktd2JlLWFkZC1hdHRyaWJ1dGVzLW9wdGlvbicpLnZhbCgpO1xyXG5cclxuICAgICAgICBtb2RhbC5maW5kKCcudmktd2JlLWF0dHJpYnV0ZS1yb3cnKS5lYWNoKGZ1bmN0aW9uIChpLCByb3cpIHtcclxuICAgICAgICAgICAgbGV0IHBBdHRyID0gJChyb3cpLmRhdGEoJ2F0dHInKTtcclxuICAgICAgICAgICAgaWYgKHBBdHRyLmlzX3RheG9ub215KSB7XHJcbiAgICAgICAgICAgICAgICBwQXR0ci5vcHRpb25zID0gJChyb3cpLmZpbmQoJ3NlbGVjdCcpLnZhbCgpLm1hcChOdW1iZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcEF0dHIubmFtZSA9ICQocm93KS5maW5kKCdpbnB1dC5jdXN0b20tYXR0ci1uYW1lJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAkKHJvdykuZmluZCgndGV4dGFyZWEuY3VzdG9tLWF0dHItdmFsJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBwQXR0ci52YWx1ZSA9IHZhbHVlLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XHJcbiAgICAgICAgICAgICAgICBwQXR0ci5vcHRpb25zID0gdmFsdWUuc3BsaXQoJ3wnKS5tYXAoaXRlbSA9PiBpdGVtLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBBdHRyLnZpc2libGUgPSAhISQocm93KS5maW5kKCcuYXR0ci12aXNpYmlsaXR5OmNoZWNrZWQnKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHBBdHRyLnZhcmlhdGlvbiA9ICEhJChyb3cpLmZpbmQoJy5hdHRyLXZhcmlhdGlvbjpjaGVja2VkJykubGVuZ3RoO1xyXG4gICAgICAgICAgICBwQXR0ci5wb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgICAgIG5ld0F0dHJpYnV0ZXMucHVzaChwQXR0cilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG5ld0F0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBleGNlbE9iaiA9IHRoaXMub2JqO1xyXG4gICAgICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGggPSB0aGlzLmNlbGxzO1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdLCB4ID0gaFswXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbmRFeGlzdCA9IChwcm9kdWN0QXR0cnMgPSBbXSwgYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0QXR0cnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gcHJvZHVjdEF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyID0gcHJvZHVjdEF0dHJzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIubmFtZSA9PT0gYXR0ck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gJiYgIWV4Y2VsT2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnICYmIGJyZWFrQ29udHJvbCA9PT0gZmFsc2UgJiYgZXhjZWxPYmoub3B0aW9ucy5kYXRhW3ldWzFdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZXhjZWxPYmoub3B0aW9ucy5kYXRhW3ldW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gWy4uLm5ldyBTZXQodmFsdWUpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb25JbmRleCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGF0dHIgb2YgbmV3QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBmaW5kRXhpc3QobmV3VmFsdWUsIGF0dHJOYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyLnBvc2l0aW9uID0gbmV3VmFsdWUubGVuZ3RoICsgcG9zaXRpb25JbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9zaXRpb25JbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUucHVzaChhdHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWRkQXR0ck9wdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyLnBvc2l0aW9uID0gbmV3VmFsdWVba2V5XS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVba2V5XSA9IGF0dHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtZXJnZV90ZXJtcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VGVybXMgPSBuZXdWYWx1ZVtrZXldLm9wdGlvbnMgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdUZXJtcyA9IGF0dHIub3B0aW9ucyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlcm1zID0gWy4uLmN1cnJlbnRUZXJtcywgLi4ubmV3VGVybXNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVtrZXldLm9wdGlvbnMgPSBbLi4ubmV3IFNldCh0ZXJtcyldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGNlbE9iai5kaXNwYXRjaCgnb25jaGFuZ2UnLCBleGNlbE9iai5lbGUsIChleGNlbE9iai5yZWNvcmRzW3ldICYmIGV4Y2VsT2JqLnJlY29yZHNbeV1beF0gPyBleGNlbE9iai5yZWNvcmRzW3ldW3hdIDogbnVsbCksIHgsIHksIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKGV4Y2VsT2JqLnVwZGF0ZUNlbGwoeCwgeSwgbmV3VmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBleGNlbE9iai51cGRhdGVGb3JtdWxhQ2hhaW4oeCwgeSwgcmVjb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBoaXN0b3J5XHJcbiAgICAgICAgICAgIGV4Y2VsT2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc2V0VmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgcmVjb3JkczogcmVjb3JkcyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZXhjZWxPYmouc2VsZWN0ZWRDZWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0YWJsZSB3aXRoIGN1c3RvbSBjb25maWd1cmF0aW9uIGlmIGFwcGxpY2FibGVcclxuICAgICAgICAgICAgZXhjZWxPYmoudXBkYXRlVGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGVudChtb2RhbCkge1xyXG4gICAgICAgIGxldCAkdGhpcyA9IHRoaXMsIGh0bWwgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzfSA9IEF0dHJpYnV0ZXM7XHJcbiAgICAgICAgbGV0IGFkZEF0dHJpYnV0ZSA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtfZi50ZXh0KCdDdXN0b20gcHJvZHVjdCBhdHRyaWJ1dGUnKX08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgYWRkQXR0cmlidXRlICs9IGA8b3B0aW9uIHZhbHVlPVwiJHthdHRyfVwiPiR7YXR0cmlidXRlc1thdHRyXS5kYXRhLmF0dHJpYnV0ZV9sYWJlbH08L29wdGlvbj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkQXR0cmlidXRlID0gYDxkaXYgY2xhc3M9XCJ2aS13YmUtdGF4b25vbXktaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwidmktd2JlLXNlbGVjdC10YXhvbm9teVwiPiR7YWRkQXR0cmlidXRlfTwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aS11aSBidXR0b24gdGlueSB2aS13YmUtYWRkLXRheG9ub215XCI+JHtfZi50ZXh0KCdBZGQnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgIGh0bWwgPSBgJHthZGRBdHRyaWJ1dGV9XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ2aS11aSBjZWxsZWQgdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BdHRyaWJ1dGVzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHdpZHRoPVwiMVwiPkFjdGlvbnM8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+JHtodG1sfTwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPmA7XHJcblxyXG4gICAgICAgIGxldCBhZGRBdHRyaWJ1dGVPcHRpb25zID0gYDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmktd2JlLWFkZC1hdHRyaWJ1dGVzLW9wdGlvbi1sYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdCBhY3Rpb24gaWYgZXhpc3QgYXR0cmlidXRlIGluIHByb2R1Y3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS1hZGQtYXR0cmlidXRlcy1vcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm9uZVwiPkRvbid0IGFkZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZXBsYWNlXCI+UmVwbGFjZSBleGlzdGVkIGF0dHJpYnV0ZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZXJnZV90ZXJtc1wiPk1lcmdlIHRlcm1zPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgbW9kYWwuZmluZCgnLmNvbnRlbnQnKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgbW9kYWwuZmluZCgnLmFjdGlvbnMnKS5hcHBlbmQoYWRkQXR0cmlidXRlT3B0aW9ucyk7XHJcbiAgICAgICAgbW9kYWwuZmluZCgndGFibGUgc2VsZWN0Jykuc2VsZWN0Mih7bXVsdGlwbGU6IHRydWV9KTtcclxuICAgICAgICBtb2RhbC5maW5kKCd0Ym9keScpLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgaXRlbXM6ICd0cicsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICBheGlzOiAneScsXHJcbiAgICAgICAgICAgIHNjcm9sbFNlbnNpdGl2aXR5OiA0MCxcclxuICAgICAgICAgICAgZm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJyxcclxuICAgICAgICAgICAgaGFuZGxlOiAnLmljb24ubW92ZScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldE9wdGlvbkRpc2FibGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJ3NlbGVjdC52aS13YmUtc2VsZWN0LXRheG9ub215IG9wdGlvbicpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJ2lucHV0W3R5cGU9aGlkZGVuXScpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGF4ID0gJChlbCkudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5maW5kKGBzZWxlY3Qudmktd2JlLXNlbGVjdC10YXhvbm9teSBvcHRpb25bdmFsdWU9JyR7dGF4fSddYCkuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0T3B0aW9uRGlzYWJsZSgpO1xyXG5cclxuICAgICAgICBtb2RhbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgJHRoaXNUYXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKCR0aGlzVGFyZ2V0Lmhhc0NsYXNzKCd0cmFzaCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkdGhpc1RhcmdldC5jbG9zZXN0KCd0cicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0T3B0aW9uRGlzYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3ZpLXdiZS1hZGQtdGF4b25vbXknKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRheFNlbGVjdCA9ICQoJy52aS13YmUtc2VsZWN0LXRheG9ub215JyksIHRheCA9IHRheFNlbGVjdC52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0ge25hbWU6IHRheCwgb3B0aW9uczogW119O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRheCkgaXRlbS5pc190YXhvbm9teSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9ICQoJHRoaXMuY3JlYXRlUm93VGFibGUoaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuZmluZCgndGFibGUgdGJvZHknKS5hcHBlbmQocm93KTtcclxuICAgICAgICAgICAgICAgIHJvdy5maW5kKCdzZWxlY3QnKS5zZWxlY3QyKHttdWx0aXBsZTogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgc2V0T3B0aW9uRGlzYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGF4U2VsZWN0LnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLXNlbGVjdC1hbGwtYXR0cmlidXRlcycpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGQgPSAkdGhpc1RhcmdldC5jbG9zZXN0KCd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9IHRkLmZpbmQoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0LmZpbmQoJ29wdGlvbicpLmF0dHIoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLXNlbGVjdC1uby1hdHRyaWJ1dGVzJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZCA9ICR0aGlzVGFyZ2V0LmNsb3Nlc3QoJ3RkJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ID0gdGQuZmluZCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3QuZmluZCgnb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLWFkZC1uZXctYXR0cmlidXRlJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBdHRyID0gcHJvbXB0KF9mLnRleHQoJ0VudGVyIGEgbmFtZSBmb3IgdGhlIG5ldyBhdHRyaWJ1dGUgdGVybTonKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdBdHRyKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRyID0gJHRoaXNUYXJnZXQuY2xvc2VzdCgndHIudmktd2JlLWF0dHJpYnV0ZS1yb3cnKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXhBdHRyID0gdHIuYXR0cignZGF0YS1hdHRyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRheEF0dHIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXhBdHRyID0gSlNPTi5wYXJzZSh0YXhBdHRyKTtcclxuICAgICAgICAgICAgICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViX2FjdGlvbjogJ2FkZF9uZXdfYXR0cmlidXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRheG9ub215OiB0YXhBdHRyLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtOiBuZXdBdHRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpc1RhcmdldC5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ID0gdHIuZmluZCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7cmVzLmRhdGEudGVybV9pZH1cIiBzZWxlY3RlZD4ke3Jlcy5kYXRhLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXMuYXR0cmlidXRlc1t0YXhBdHRyLm5hbWVdLnRlcm1zW3Jlcy5kYXRhLnRlcm1faWRdID0ge3NsdWc6IHJlcy5kYXRhLnNsdWcsIHRleHQ6IHJlcy5kYXRhLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXNUYXJnZXQucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUm93VGFibGUoaXRlbSkge1xyXG4gICAgICAgIGxldCBhdHRyTmFtZSA9ICcnLCB2YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoaXRlbS5pc190YXhvbm9teSkge1xyXG4gICAgICAgICAgICBsZXQgYXR0cmlidXRlID0gQXR0cmlidXRlcy5hdHRyaWJ1dGVzW2l0ZW0ubmFtZV0sXHJcbiAgICAgICAgICAgICAgICB0ZXJtcyA9IGF0dHJpYnV0ZS50ZXJtcyB8fCBbXSwgb3B0aW9ucyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgYXR0ck5hbWUgPSBgJHthdHRyaWJ1dGUuZGF0YS5hdHRyaWJ1dGVfbGFiZWx9PGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIiR7aXRlbS5uYW1lfVwiLz5gO1xyXG5cclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRlcm1zKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRlcm1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gaXRlbS5vcHRpb25zLmluY2x1ZGVzKHBhcnNlSW50KGlkKSkgPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7aWR9XCIgJHtzZWxlY3RlZH0+JHt0ZXJtc1tpZF0udGV4dH08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWx1ZSA9IGA8c2VsZWN0IG11bHRpcGxlPiR7b3B0aW9uc308L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmktd2JlLWF0dHJpYnV0ZXMtYnV0dG9uLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgdmktd2JlLXNlbGVjdC1hbGwtYXR0cmlidXRlc1wiPiR7X2YudGV4dCgnU2VsZWN0IGFsbCcpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aS11aSBidXR0b24gbWluaSB2aS13YmUtc2VsZWN0LW5vLWF0dHJpYnV0ZXNcIj4ke19mLnRleHQoJ1NlbGVjdCBub25lJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBtaW5pIHZpLXdiZS1hZGQtbmV3LWF0dHJpYnV0ZVwiPiR7X2YudGV4dCgnQWRkIG5ldycpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiY3VzdG9tLWF0dHItbmFtZVwiIHZhbHVlPVwiJHtpdGVtLm5hbWV9XCIgcGxhY2Vob2xkZXI9XCIke19mLnRleHQoJ0N1c3RvbSBhdHRyaWJ1dGUgbmFtZScpfVwiLz5gO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGA8dGV4dGFyZWEgY2xhc3M9XCJjdXN0b20tYXR0ci12YWxcIiBwbGFjZWhvbGRlcj1cIiR7X2YudGV4dCgnRW50ZXIgc29tZSB0ZXh0LCBvciBzb21lIGF0dHJpYnV0ZXMgYnkgXCJ8XCIgc2VwYXJhdGluZyB2YWx1ZXMuJyl9XCI+JHtpdGVtLnZhbHVlIHx8ICcnfTwvdGV4dGFyZWE+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF0dHJOYW1lID0gYDxkaXYgY2xhc3M9XCJ2aS13YmUtYXR0cmlidXRlLW5hbWUtbGFiZWxcIj4ke2F0dHJOYW1lfTwvZGl2PmA7XHJcblxyXG4gICAgICAgIGF0dHJOYW1lICs9IGA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJhdHRyLXZpc2liaWxpdHlcIiAke2l0ZW0udmlzaWJsZSA/ICdjaGVja2VkJyA6ICcnfSB2YWx1ZT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiR7X2YudGV4dCgnVmlzaWJsZSBvbiB0aGUgcHJvZHVjdCBwYWdlJyl9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICAgICAgICBhdHRyTmFtZSArPSBgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiYXR0ci12YXJpYXRpb25cIiAke2l0ZW0udmFyaWF0aW9uID8gJ2NoZWNrZWQnIDogJyd9IHZhbHVlPVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+JHtfZi50ZXh0KCdVc2VkIGZvciB2YXJpYXRpb25zIChhcHBseSBmb3IgdmFyaWFibGUpJyl9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICAgICAgICByZXR1cm4gYDx0ciBjbGFzcz1cInZpLXdiZS1hdHRyaWJ1dGUtcm93XCIgZGF0YS1hdHRyPScke0pTT04uc3RyaW5naWZ5KGl0ZW0pfSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidmktd2JlLWxlZnRcIj4ke2F0dHJOYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPiR7dmFsdWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ2aS13YmUtcmlnaHRcIj48aSBjbGFzcz1cImljb24gdHJhc2hcIj4gPC9pPiA8aSBjbGFzcz1cImljb24gbW92ZVwiPiA8L2k+PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgIH1cclxuXHJcbn0iLCIvKiEgQGxpY2Vuc2UgRE9NUHVyaWZ5IDMuMC4yIHwgKGMpIEN1cmU1MyBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwgUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBsaWNlbnNlIDIuMCBhbmQgTW96aWxsYSBQdWJsaWMgTGljZW5zZSAyLjAgfCBnaXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvYmxvYi8zLjAuMi9MSUNFTlNFICovXHJcblxyXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xyXG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcclxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxyXG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xyXG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIGVudHJpZXMsXHJcbiAgICBzZXRQcm90b3R5cGVPZixcclxuICAgIGlzRnJvemVuLFxyXG4gICAgZ2V0UHJvdG90eXBlT2YsXHJcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcclxuICB9ID0gT2JqZWN0O1xyXG4gIGxldCB7XHJcbiAgICBmcmVlemUsXHJcbiAgICBzZWFsLFxyXG4gICAgY3JlYXRlXHJcbiAgfSA9IE9iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXHJcblxyXG4gIGxldCB7XHJcbiAgICBhcHBseSxcclxuICAgIGNvbnN0cnVjdFxyXG4gIH0gPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdDtcclxuXHJcbiAgaWYgKCFhcHBseSkge1xyXG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xyXG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKCFmcmVlemUpIHtcclxuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICghc2VhbCkge1xyXG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbnN0cnVjdCkge1xyXG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcclxuICAgICAgcmV0dXJuIG5ldyBGdW5jKC4uLmFyZ3MpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xyXG4gIGNvbnN0IGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcclxuICBjb25zdCBhcnJheVB1c2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wdXNoKTtcclxuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XHJcbiAgY29uc3Qgc3RyaW5nVG9TdHJpbmcgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcpO1xyXG4gIGNvbnN0IHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcclxuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xyXG4gIGNvbnN0IHN0cmluZ0luZGV4T2YgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZik7XHJcbiAgY29uc3Qgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcclxuICBjb25zdCByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xyXG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XHJcbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXNBcmcpIHtcclxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncyk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcclxuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XHJcbiAgICB9O1xyXG4gIH1cclxuICAvKiBBZGQgcHJvcGVydGllcyB0byBhIGxvb2t1cCB0YWJsZSAqL1xyXG5cclxuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5LCB0cmFuc2Zvcm1DYXNlRnVuYykge1xyXG4gICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSB0cmFuc2Zvcm1DYXNlRnVuYyA/IHRyYW5zZm9ybUNhc2VGdW5jIDogc3RyaW5nVG9Mb3dlckNhc2U7XHJcblxyXG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XHJcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxyXG4gICAgICAvLyBpbmRlcGVuZGVudCBvZiBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIE9iamVjdC5wcm90b3R5cGUuXHJcbiAgICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cclxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbCA9IGFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAobC0tKSB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbbF07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgIC8vIENvbmZpZyBwcmVzZXRzIChlLmcuIHRhZ3MuanMsIGF0dHJzLmpzKSBhcmUgaW1tdXRhYmxlLlxyXG4gICAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcclxuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNldDtcclxuICB9XHJcbiAgLyogU2hhbGxvdyBjbG9uZSBhbiBvYmplY3QgKi9cclxuXHJcbiAgZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XHJcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcclxuICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgfVxyXG4gIC8qIFRoaXMgbWV0aG9kIGF1dG9tYXRpY2FsbHkgY2hlY2tzIGlmIHRoZSBwcm9wIGlzIGZ1bmN0aW9uXHJcbiAgICogb3IgZ2V0dGVyIGFuZCBiZWhhdmVzIGFjY29yZGluZ2x5LiAqL1xyXG5cclxuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XHJcbiAgICB3aGlsZSAob2JqZWN0ICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcclxuXHJcbiAgICAgIGlmIChkZXNjKSB7XHJcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKGVsZW1lbnQpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdmYWxsYmFjayB2YWx1ZSBmb3InLCBlbGVtZW50KTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBodG1sJDEgPSBmcmVlemUoWydhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2JkaScsICdiZG8nLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlY29yYXRvcicsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7IC8vIFNWR1xyXG5cclxuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XHJcbiAgY29uc3Qgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJ10pOyAvLyBMaXN0IG9mIFNWRyBlbGVtZW50cyB0aGF0IGFyZSBkaXNhbGxvd2VkIGJ5IGRlZmF1bHQuXHJcbiAgLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXHJcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXHJcbiAgLy8gYWxsb3ctbGlzdC5cclxuXHJcbiAgY29uc3Qgc3ZnRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ2FuaW1hdGUnLCAnY29sb3ItcHJvZmlsZScsICdjdXJzb3InLCAnZGlzY2FyZCcsICdmZWRyb3BzaGFkb3cnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xyXG4gIGNvbnN0IG1hdGhNbCQxID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJywgJ21wcmVzY3JpcHRzJ10pOyAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcclxuICAvLyBldmVuIHRob3NlIHRoYXQgd2UgZGlzYWxsb3cgYnkgZGVmYXVsdC5cclxuXHJcbiAgY29uc3QgbWF0aE1sRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ21hY3Rpb24nLCAnbWFsaWduZ3JvdXAnLCAnbWFsaWdubWFyaycsICdtbG9uZ2RpdicsICdtc2NhcnJpZXMnLCAnbXNjYXJyeScsICdtc2dyb3VwJywgJ21zdGFjaycsICdtc2xpbmUnLCAnbXNyb3cnLCAnc2VtYW50aWNzJywgJ2Fubm90YXRpb24nLCAnYW5ub3RhdGlvbi14bWwnLCAnbXByZXNjcmlwdHMnLCAnbm9uZSddKTtcclxuICBjb25zdCB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XHJcblxyXG4gIGNvbnN0IGh0bWwgPSBmcmVlemUoWydhY2NlcHQnLCAnYWN0aW9uJywgJ2FsaWduJywgJ2FsdCcsICdhdXRvY2FwaXRhbGl6ZScsICdhdXRvY29tcGxldGUnLCAnYXV0b3BpY3R1cmVpbnBpY3R1cmUnLCAnYXV0b3BsYXknLCAnYmFja2dyb3VuZCcsICdiZ2NvbG9yJywgJ2JvcmRlcicsICdjYXB0dXJlJywgJ2NlbGxwYWRkaW5nJywgJ2NlbGxzcGFjaW5nJywgJ2NoZWNrZWQnLCAnY2l0ZScsICdjbGFzcycsICdjbGVhcicsICdjb2xvcicsICdjb2xzJywgJ2NvbHNwYW4nLCAnY29udHJvbHMnLCAnY29udHJvbHNsaXN0JywgJ2Nvb3JkcycsICdjcm9zc29yaWdpbicsICdkYXRldGltZScsICdkZWNvZGluZycsICdkZWZhdWx0JywgJ2RpcicsICdkaXNhYmxlZCcsICdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsICdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnZG93bmxvYWQnLCAnZHJhZ2dhYmxlJywgJ2VuY3R5cGUnLCAnZW50ZXJrZXloaW50JywgJ2ZhY2UnLCAnZm9yJywgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZmxhbmcnLCAnaWQnLCAnaW5wdXRtb2RlJywgJ2ludGVncml0eScsICdpc21hcCcsICdraW5kJywgJ2xhYmVsJywgJ2xhbmcnLCAnbGlzdCcsICdsb2FkaW5nJywgJ2xvb3AnLCAnbG93JywgJ21heCcsICdtYXhsZW5ndGgnLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21pbicsICdtaW5sZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLCAnbmFtZScsICdub25jZScsICdub3NoYWRlJywgJ25vdmFsaWRhdGUnLCAnbm93cmFwJywgJ29wZW4nLCAnb3B0aW11bScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3BsYXlzaW5saW5lJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3B1YmRhdGUnLCAncmFkaW9ncm91cCcsICdyZWFkb25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2JywgJ3JldmVyc2VkJywgJ3JvbGUnLCAncm93cycsICdyb3dzcGFuJywgJ3NwZWxsY2hlY2snLCAnc2NvcGUnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NyY2xhbmcnLCAnc3RhcnQnLCAnc3JjJywgJ3NyY3NldCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLCAndGFiaW5kZXgnLCAndGl0bGUnLCAndHJhbnNsYXRlJywgJ3R5cGUnLCAndXNlbWFwJywgJ3ZhbGlnbicsICd2YWx1ZScsICd3aWR0aCcsICd4bWxucycsICdzbG90J10pO1xyXG4gIGNvbnN0IHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcclxuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xyXG4gIGNvbnN0IHhtbCA9IGZyZWV6ZShbJ3hsaW5rOmhyZWYnLCAneG1sOmlkJywgJ3hsaW5rOnRpdGxlJywgJ3htbDpzcGFjZScsICd4bWxuczp4bGluayddKTtcclxuXHJcbiAgY29uc3QgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHdcXFddKnxbXFx3XFxXXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcclxuXHJcbiAgY29uc3QgRVJCX0VYUFIgPSBzZWFsKC88JVtcXHdcXFddKnxbXFx3XFxXXSolPi9nbSk7XHJcbiAgY29uc3QgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCR7W1xcd1xcV10qfS9nbSk7XHJcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcclxuXHJcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXHJcblxyXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxyXG4gICk7XHJcbiAgY29uc3QgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XHJcbiAgY29uc3QgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxyXG4gICk7XHJcbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xyXG5cclxuICB2YXIgRVhQUkVTU0lPTlMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBfX3Byb3RvX186IG51bGwsXHJcbiAgICBNVVNUQUNIRV9FWFBSOiBNVVNUQUNIRV9FWFBSLFxyXG4gICAgRVJCX0VYUFI6IEVSQl9FWFBSLFxyXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxyXG4gICAgREFUQV9BVFRSOiBEQVRBX0FUVFIsXHJcbiAgICBBUklBX0FUVFI6IEFSSUFfQVRUUixcclxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcclxuICAgIElTX1NDUklQVF9PUl9EQVRBOiBJU19TQ1JJUFRfT1JfREFUQSxcclxuICAgIEFUVFJfV0hJVEVTUEFDRTogQVRUUl9XSElURVNQQUNFLFxyXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZ2V0R2xvYmFsID0gKCkgPT4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxyXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXHJcbiAgICogQHBhcmFtIHs/VHJ1c3RlZFR5cGVQb2xpY3lGYWN0b3J5fSB0cnVzdGVkVHlwZXMgVGhlIHBvbGljeSBmYWN0b3J5LlxyXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY3VtZW50IFRoZSBkb2N1bWVudCBvYmplY3QgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpXHJcbiAgICogQHJldHVybiB7P1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcclxuICAgKiBhcmUgbm90IHN1cHBvcnRlZCkuXHJcbiAgICovXHJcblxyXG5cclxuICBjb25zdCBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5ID0gZnVuY3Rpb24gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIGRvY3VtZW50KSB7XHJcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9IC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxyXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXHJcbiAgICAvLyBQb2xpY3kgY3JlYXRpb24gd2l0aCBkdXBsaWNhdGUgbmFtZXMgdGhyb3dzIGluIFRydXN0ZWQgVHlwZXMuXHJcblxyXG5cclxuICAgIGxldCBzdWZmaXggPSBudWxsO1xyXG4gICAgY29uc3QgQVRUUl9OQU1FID0gJ2RhdGEtdHQtcG9saWN5LXN1ZmZpeCc7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC5oYXNBdHRyaWJ1dGUoQVRUUl9OQU1FKSkge1xyXG4gICAgICBzdWZmaXggPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvbGljeU5hbWUgPSAnZG9tcHVyaWZ5JyArIChzdWZmaXggPyAnIycgKyBzdWZmaXggOiAnJyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kocG9saWN5TmFtZSwge1xyXG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlU2NyaXB0VVJMKHNjcmlwdFVybCkge1xyXG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xyXG4gICAgICAvLyBhbHJlYWR5IHJ1bikuIFNraXAgY3JlYXRpbmcgdGhlIHBvbGljeSwgYXMgdGhpcyB3aWxsIG9ubHkgY2F1c2UgZXJyb3JzXHJcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cclxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xyXG4gICAgbGV0IHdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZ2V0R2xvYmFsKCk7XHJcblxyXG4gICAgY29uc3QgRE9NUHVyaWZ5ID0gcm9vdCA9PiBjcmVhdGVET01QdXJpZnkocm9vdCk7XHJcbiAgICAvKipcclxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcclxuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxyXG4gICAgICovXHJcblxyXG5cclxuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC4yJztcclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cclxuICAgICAqIEVtcHR5IGlmIG5vdGhpbmcgd2FzIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuXHJcbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xyXG5cclxuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XHJcbiAgICAgIC8vIE5vdCBydW5uaW5nIGluIGEgYnJvd3NlciwgcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb25cclxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XHJcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICByZXR1cm4gRE9NUHVyaWZ5O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsRG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XHJcbiAgICBsZXQge1xyXG4gICAgICBkb2N1bWVudFxyXG4gICAgfSA9IHdpbmRvdztcclxuICAgIGNvbnN0IHtcclxuICAgICAgRG9jdW1lbnRGcmFnbWVudCxcclxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcclxuICAgICAgTm9kZSxcclxuICAgICAgRWxlbWVudCxcclxuICAgICAgTm9kZUZpbHRlcixcclxuICAgICAgTmFtZWROb2RlTWFwID0gd2luZG93Lk5hbWVkTm9kZU1hcCB8fCB3aW5kb3cuTW96TmFtZWRBdHRyTWFwLFxyXG4gICAgICBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgICAgIERPTVBhcnNlcixcclxuICAgICAgdHJ1c3RlZFR5cGVzXHJcbiAgICB9ID0gd2luZG93O1xyXG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xyXG4gICAgY29uc3QgY2xvbmVOb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjbG9uZU5vZGUnKTtcclxuICAgIGNvbnN0IGdldE5leHRTaWJsaW5nID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICduZXh0U2libGluZycpO1xyXG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xyXG4gICAgY29uc3QgZ2V0UGFyZW50Tm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncGFyZW50Tm9kZScpOyAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcclxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xyXG4gICAgLy8gKGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9jdXN0b20vI2NyZWF0aW5nLWFuZC1wYXNzaW5nLXJlZ2lzdHJpZXMpXHJcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcclxuICAgIC8vIGlzIGluaGVyaXRlZC5cclxuXHJcbiAgICBpZiAodHlwZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG5cclxuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XHJcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgb3JpZ2luYWxEb2N1bWVudCk7XHJcblxyXG4gICAgY29uc3QgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpIDogJyc7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGltcGxlbWVudGF0aW9uLFxyXG4gICAgICBjcmVhdGVOb2RlSXRlcmF0b3IsXHJcbiAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXHJcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXHJcbiAgICB9ID0gZG9jdW1lbnQ7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGltcG9ydE5vZGVcclxuICAgIH0gPSBvcmlnaW5hbERvY3VtZW50O1xyXG4gICAgbGV0IGhvb2tzID0ge307XHJcbiAgICAvKipcclxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cclxuICAgICAqL1xyXG5cclxuICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IHR5cGVvZiBlbnRyaWVzID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBnZXRQYXJlbnROb2RlID09PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGF0aW9uICYmIHR5cGVvZiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBNVVNUQUNIRV9FWFBSLFxyXG4gICAgICBFUkJfRVhQUixcclxuICAgICAgVE1QTElUX0VYUFIsXHJcbiAgICAgIERBVEFfQVRUUixcclxuICAgICAgQVJJQV9BVFRSLFxyXG4gICAgICBJU19TQ1JJUFRfT1JfREFUQSxcclxuICAgICAgQVRUUl9XSElURVNQQUNFXHJcbiAgICB9ID0gRVhQUkVTU0lPTlM7XHJcbiAgICBsZXQge1xyXG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxyXG4gICAgfSA9IEVYUFJFU1NJT05TO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxyXG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxyXG4gICAgICovXHJcblxyXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXHJcblxyXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XHJcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCQxLCAuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4ubWF0aE1sJDEsIC4uLnRleHRdKTtcclxuICAgIC8qIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzICovXHJcblxyXG4gICAgbGV0IEFMTE9XRURfQVRUUiA9IG51bGw7XHJcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCwgLi4uc3ZnLCAuLi5tYXRoTWwsIC4uLnhtbF0pO1xyXG4gICAgLypcclxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cclxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IHRhZ05hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzKVxyXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gYXR0cmlidXRlTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBhdHRyaWJ1dGVzIG5vdCBvbiB0aGUgYWxsb3cgbGlzdClcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXHJcbiAgICAgKi9cclxuXHJcbiAgICBsZXQgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuICAgICAgdGFnTmFtZUNoZWNrOiB7XHJcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGF0dHJpYnV0ZU5hbWVDaGVjazoge1xyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM6IHtcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIHRhZ3MgKG92ZXJyaWRlcyBBTExPV0VEX1RBR1MvQUREX1RBR1MpICovXHJcblxyXG4gICAgbGV0IEZPUkJJRF9UQUdTID0gbnVsbDtcclxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIGF0dHJpYnV0ZXMgKG92ZXJyaWRlcyBBTExPV0VEX0FUVFIvQUREX0FUVFIpICovXHJcblxyXG4gICAgbGV0IEZPUkJJRF9BVFRSID0gbnVsbDtcclxuICAgIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cclxuXHJcbiAgICBsZXQgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcclxuICAgIC8qIERlY2lkZSBpZiBjdXN0b20gZGF0YSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXHJcblxyXG4gICAgbGV0IEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XHJcbiAgICAvKiBEZWNpZGUgaWYgdW5rbm93biBwcm90b2NvbHMgYXJlIG9rYXkgKi9cclxuXHJcbiAgICBsZXQgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBmYWxzZTtcclxuICAgIC8qIERlY2lkZSBpZiBzZWxmLWNsb3NpbmcgdGFncyBpbiBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLlxyXG4gICAgICogVXN1YWxseSByZW1vdmVkIGR1ZSB0byBhIG1YU1MgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xyXG5cclxuICAgIGxldCBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSB0cnVlO1xyXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBzYWZlIGZvciBjb21tb24gdGVtcGxhdGUgZW5naW5lcy5cclxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcclxuICAgICAqL1xyXG5cclxuICAgIGxldCBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcclxuICAgIC8qIERlY2lkZSBpZiBkb2N1bWVudCB3aXRoIDxodG1sPi4uLiBzaG91bGQgYmUgcmV0dXJuZWQgKi9cclxuXHJcbiAgICBsZXQgV0hPTEVfRE9DVU1FTlQgPSBmYWxzZTtcclxuICAgIC8qIFRyYWNrIHdoZXRoZXIgY29uZmlnIGlzIGFscmVhZHkgc2V0IG9uIHRoaXMgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5LiAqL1xyXG5cclxuICAgIGxldCBTRVRfQ09ORklHID0gZmFsc2U7XHJcbiAgICAvKiBEZWNpZGUgaWYgYWxsIGVsZW1lbnRzIChlLmcuIHN0eWxlLCBzY3JpcHQpIG11c3QgYmUgY2hpbGRyZW4gb2ZcclxuICAgICAqIGRvY3VtZW50LmJvZHkuIEJ5IGRlZmF1bHQsIGJyb3dzZXJzIG1pZ2h0IG1vdmUgdGhlbSB0byBkb2N1bWVudC5oZWFkICovXHJcblxyXG4gICAgbGV0IEZPUkNFX0JPRFkgPSBmYWxzZTtcclxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgSFRNTEJvZHlFbGVtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXHJcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXHJcbiAgICAgKiBJZiBgV0hPTEVfRE9DVU1FTlRgIGlzIGVuYWJsZWQgYSBgSFRNTEh0bWxFbGVtZW50YCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWRcclxuICAgICAqL1xyXG5cclxuICAgIGxldCBSRVRVUk5fRE9NID0gZmFsc2U7XHJcbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYERvY3VtZW50RnJhZ21lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcclxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cclxuXHJcbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xyXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXHJcbiAgICAgKiBjYXNlIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgICovXHJcblxyXG4gICAgbGV0IFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcclxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgZnJlZSBmcm9tIERPTSBjbG9iYmVyaW5nIGF0dGFja3M/XHJcbiAgICAgKiBUaGlzIHNhbml0aXplcyBtYXJrdXBzIG5hbWVkIHdpdGggY29sbGlkaW5nLCBjbG9iYmVyYWJsZSBidWlsdC1pbiBET00gQVBJcy5cclxuICAgICAqL1xyXG5cclxuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xyXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcclxuICAgICAqIHByb3BlcnRpZXMgYW5kIEpTIHZhcmlhYmxlcywgbWl0aWdhdGluZyBhdHRhY2tzIHRoYXQgYWJ1c2UgdGhlIEhUTUwvRE9NIHNwZWMgcnVsZXMuXHJcbiAgICAgKlxyXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcclxuICAgICAqICAgLSBOYW1lZCBBY2Nlc3Mgb24gV2luZG93ICjCpzcuMy4zKVxyXG4gICAgICogICAtIERPTSBUcmVlIEFjY2Vzc29ycyAowqczLjEuNSlcclxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXHJcbiAgICAgKiAgIC0gSWZyYW1lIHNyY2RvYyAvIE5lc3RlZCBXaW5kb3dQcm94aWVzICjCpzQuOC41KVxyXG4gICAgICogICAtIEhUTUxDb2xsZWN0aW9uICjCpzQuMi4xMC4yKVxyXG4gICAgICpcclxuICAgICAqIE5hbWVzcGFjZSBpc29sYXRpb24gaXMgaW1wbGVtZW50ZWQgYnkgcHJlZml4aW5nIGBpZGAgYW5kIGBuYW1lYCBhdHRyaWJ1dGVzXHJcbiAgICAgKiB3aXRoIGEgY29uc3RhbnQgc3RyaW5nLCBpLmUuLCBgdXNlci1jb250ZW50LWBcclxuICAgICAqL1xyXG5cclxuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xyXG4gICAgY29uc3QgU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYID0gJ3VzZXItY29udGVudC0nO1xyXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xyXG5cclxuICAgIGxldCBLRUVQX0NPTlRFTlQgPSB0cnVlO1xyXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcclxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xyXG5cclxuICAgIGxldCBJTl9QTEFDRSA9IGZhbHNlO1xyXG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xyXG5cclxuICAgIGxldCBVU0VfUFJPRklMRVMgPSB7fTtcclxuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xyXG5cclxuICAgIGxldCBGT1JCSURfQ09OVEVOVFMgPSBudWxsO1xyXG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcclxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xyXG5cclxuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcclxuICAgIGNvbnN0IERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XHJcbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xyXG5cclxuICAgIGxldCBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcclxuICAgIGNvbnN0IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyA9IGFkZFRvU2V0KHt9LCBbJ2FsdCcsICdjbGFzcycsICdmb3InLCAnaWQnLCAnbGFiZWwnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JvbGUnLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcclxuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XHJcbiAgICBjb25zdCBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcclxuICAgIGNvbnN0IEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xyXG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXHJcblxyXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xyXG4gICAgbGV0IElTX0VNUFRZX0lOUFVUID0gZmFsc2U7XHJcbiAgICAvKiBBbGxvd2VkIFhIVE1MK1hNTCBuYW1lc3BhY2VzICovXHJcblxyXG4gICAgbGV0IEFMTE9XRURfTkFNRVNQQUNFUyA9IG51bGw7XHJcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUyA9IGFkZFRvU2V0KHt9LCBbTUFUSE1MX05BTUVTUEFDRSwgU1ZHX05BTUVTUEFDRSwgSFRNTF9OQU1FU1BBQ0VdLCBzdHJpbmdUb1N0cmluZyk7XHJcbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cclxuXHJcbiAgICBsZXQgUEFSU0VSX01FRElBX1RZUEU7XHJcbiAgICBjb25zdCBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTID0gWydhcHBsaWNhdGlvbi94aHRtbCt4bWwnLCAndGV4dC9odG1sJ107XHJcbiAgICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XHJcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmM7XHJcbiAgICAvKiBLZWVwIGEgcmVmZXJlbmNlIHRvIGNvbmZpZyB0byBwYXNzIHRvIGhvb2tzICovXHJcblxyXG4gICAgbGV0IENPTkZJRyA9IG51bGw7XHJcbiAgICAvKiBJZGVhbGx5LCBkbyBub3QgdG91Y2ggYW55dGhpbmcgYmVsb3cgdGhpcyBsaW5lICovXHJcblxyXG4gICAgLyogX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXyAqL1xyXG5cclxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cclxuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdGVzdFZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb247XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfcGFyc2VDb25maWdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxyXG5cclxuXHJcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoY2ZnKSB7XHJcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXHJcblxyXG5cclxuICAgICAgaWYgKCFjZmcgfHwgdHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjZmcgPSB7fTtcclxuICAgICAgfVxyXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXHJcblxyXG5cclxuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcclxuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcclxuICAgICAgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUy5pbmRleE9mKGNmZy5QQVJTRVJfTUVESUFfVFlQRSkgPT09IC0xID8gUEFSU0VSX01FRElBX1RZUEUgPSBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogUEFSU0VSX01FRElBX1RZUEUgPSBjZmcuUEFSU0VSX01FRElBX1RZUEU7IC8vIEhUTUwgdGFncyBhbmQgYXR0cmlidXRlcyBhcmUgbm90IGNhc2Utc2Vuc2l0aXZlLCBjb252ZXJ0aW5nIHRvIGxvd2VyY2FzZS4gS2VlcGluZyBYSFRNTCBhcyBpcy5cclxuXHJcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jID0gUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnID8gc3RyaW5nVG9TdHJpbmcgOiBzdHJpbmdUb0xvd2VyQ2FzZTtcclxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xyXG5cclxuICAgICAgQUxMT1dFRF9UQUdTID0gJ0FMTE9XRURfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xyXG4gICAgICBBTExPV0VEX0FUVFIgPSAnQUxMT1dFRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XHJcbiAgICAgIEFMTE9XRURfTkFNRVNQQUNFUyA9ICdBTExPV0VEX05BTUVTUEFDRVMnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcclxuICAgICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9ICdBRERfVVJJX1NBRkVfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcclxuICAgICAgY2ZnLkFERF9VUklfU0FGRV9BVFRSLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxyXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxyXG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XHJcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xyXG4gICAgICBEQVRBX1VSSV9UQUdTID0gJ0FERF9EQVRBX1VSSV9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxyXG4gICAgICBjZmcuQUREX0RBVEFfVVJJX1RBR1MsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XHJcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XHJcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcclxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XHJcbiAgICAgIEZPUkJJRF9DT05URU5UUyA9ICdGT1JCSURfQ09OVEVOVFMnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcclxuICAgICAgRk9SQklEX1RBR1MgPSAnRk9SQklEX1RBR1MnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xyXG4gICAgICBGT1JCSURfQVRUUiA9ICdGT1JCSURfQVRUUicgaW4gY2ZnID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XHJcbiAgICAgIFVTRV9QUk9GSUxFUyA9ICdVU0VfUFJPRklMRVMnIGluIGNmZyA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcclxuICAgICAgQUxMT1dfQVJJQV9BVFRSID0gY2ZnLkFMTE9XX0FSSUFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxyXG5cclxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxyXG5cclxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcclxuXHJcbiAgICAgIEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IGNmZy5BTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcclxuXHJcbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcclxuXHJcbiAgICAgIFdIT0xFX0RPQ1VNRU5UID0gY2ZnLldIT0xFX0RPQ1VNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXHJcblxyXG4gICAgICBSRVRVUk5fRE9NID0gY2ZnLlJFVFVSTl9ET00gfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcclxuXHJcbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxyXG5cclxuICAgICAgUkVUVVJOX1RSVVNURURfVFlQRSA9IGNmZy5SRVRVUk5fVFJVU1RFRF9UWVBFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXHJcblxyXG4gICAgICBGT1JDRV9CT0RZID0gY2ZnLkZPUkNFX0JPRFkgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcclxuXHJcbiAgICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcclxuXHJcbiAgICAgIFNBTklUSVpFX05BTUVEX1BST1BTID0gY2ZnLlNBTklUSVpFX05BTUVEX1BST1BTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXHJcblxyXG4gICAgICBLRUVQX0NPTlRFTlQgPSBjZmcuS0VFUF9DT05URU5UICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXHJcblxyXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxyXG5cclxuICAgICAgSVNfQUxMT1dFRF9VUkkkMSA9IGNmZy5BTExPV0VEX1VSSV9SRUdFWFAgfHwgSVNfQUxMT1dFRF9VUkk7XHJcbiAgICAgIE5BTUVTUEFDRSA9IGNmZy5OQU1FU1BBQ0UgfHwgSFRNTF9OQU1FU1BBQ0U7XHJcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xyXG5cclxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xyXG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaykpIHtcclxuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIHR5cGVvZiBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XHJcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XHJcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgLyogUGFyc2UgcHJvZmlsZSBpbmZvICovXHJcblxyXG5cclxuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xyXG4gICAgICAgIEFMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4udGV4dF0pO1xyXG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcclxuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgaHRtbCQxKTtcclxuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmckMSk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcclxuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIG1hdGhNbCk7XHJcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcclxuICAgICAgICBpZiAoQUxMT1dFRF9UQUdTID09PSBERUZBVUxUX0FMTE9XRURfVEFHUykge1xyXG4gICAgICAgICAgQUxMT1dFRF9UQUdTID0gY2xvbmUoQUxMT1dFRF9UQUdTKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjZmcuQUREX0FUVFIpIHtcclxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xyXG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjZmcuQUREX1VSSV9TQUZFX0FUVFIpIHtcclxuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNmZy5GT1JCSURfQ09OVEVOVFMpIHtcclxuICAgICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xyXG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZFRvU2V0KEZPUkJJRF9DT05URU5UUywgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcclxuICAgICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cclxuXHJcblxyXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcclxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XHJcbiAgICAgIH1cclxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcclxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XHJcbiAgICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xyXG4gICAgICB9IC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cclxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXHJcblxyXG5cclxuICAgICAgaWYgKGZyZWV6ZSkge1xyXG4gICAgICAgIGZyZWV6ZShjZmcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBDT05GSUcgPSBjZmc7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xyXG4gICAgY29uc3QgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydmb3JlaWdub2JqZWN0JywgJ2Rlc2MnLCAndGl0bGUnLCAnYW5ub3RhdGlvbi14bWwnXSk7IC8vIENlcnRhaW4gZWxlbWVudHMgYXJlIGFsbG93ZWQgaW4gYm90aCBTVkcgYW5kIEhUTUxcclxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxyXG4gICAgLy8gc28gdGhhdCB0aGV5IGRvbid0IGdldCBlcnJvbmVvdXNseSBkZWxldGVkIGZyb21cclxuICAgIC8vIEhUTUwgbmFtZXNwYWNlLlxyXG5cclxuICAgIGNvbnN0IENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFMgPSBhZGRUb1NldCh7fSwgWyd0aXRsZScsICdzdHlsZScsICdmb250JywgJ2EnLCAnc2NyaXB0J10pO1xyXG4gICAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xyXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xyXG4gICAgICogY29ycmVjdGx5LiAqL1xyXG5cclxuICAgIGNvbnN0IEFMTF9TVkdfVEFHUyA9IGFkZFRvU2V0KHt9LCBzdmckMSk7XHJcbiAgICBhZGRUb1NldChBTExfU1ZHX1RBR1MsIHN2Z0ZpbHRlcnMpO1xyXG4gICAgYWRkVG9TZXQoQUxMX1NWR19UQUdTLCBzdmdEaXNhbGxvd2VkKTtcclxuICAgIGNvbnN0IEFMTF9NQVRITUxfVEFHUyA9IGFkZFRvU2V0KHt9LCBtYXRoTWwkMSk7XHJcbiAgICBhZGRUb1NldChBTExfTUFUSE1MX1RBR1MsIG1hdGhNbERpc2FsbG93ZWQpO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgYSBET00gZWxlbWVudCB3aG9zZSBuYW1lc3BhY2UgaXMgYmVpbmcgY2hlY2tlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxyXG4gICAgICogIG5hbWVzcGFjZSB0aGF0IGEgc3BlYy1jb21wbGlhbnQgcGFyc2VyIHdvdWxkIG5ldmVyXHJcbiAgICAgKiAgcmV0dXJuLiBSZXR1cm4gdHJ1ZSBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuXHJcbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcclxuICAgICAgbGV0IHBhcmVudCA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7IC8vIEluIEpTRE9NLCBpZiB3ZSdyZSBpbnNpZGUgc2hhZG93IERPTSwgdGhlbiBwYXJlbnROb2RlXHJcbiAgICAgIC8vIGNhbiBiZSBudWxsLiBXZSBqdXN0IHNpbXVsYXRlIHBhcmVudCBpbiB0aGlzIGNhc2UuXHJcblxyXG4gICAgICBpZiAoIXBhcmVudCB8fCAhcGFyZW50LnRhZ05hbWUpIHtcclxuICAgICAgICBwYXJlbnQgPSB7XHJcbiAgICAgICAgICBuYW1lc3BhY2VVUkk6IE5BTUVTUEFDRSxcclxuICAgICAgICAgIHRhZ05hbWU6ICd0ZW1wbGF0ZSdcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudC50YWdOYW1lKTtcclxuICAgICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcclxuXHJcbiAgICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFKSB7XHJcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xyXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxyXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXHJcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XHJcbiAgICAgICAgfSAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXHJcbiAgICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcclxuICAgICAgICAvLyB0ZXh0IGludGVncmF0aW9uIHBvaW50cy5cclxuXHJcblxyXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2ZycgJiYgKHBhcmVudFRhZ05hbWUgPT09ICdhbm5vdGF0aW9uLXhtbCcgfHwgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKTtcclxuICAgICAgICB9IC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcclxuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcclxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gTWF0aE1MXHJcbiAgICAgICAgLy8gaXMgdmlhIDxtYXRoPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxyXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXHJcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnO1xyXG4gICAgICAgIH0gLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBNYXRoTUwgaXMgdmlhXHJcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcclxuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XHJcbiAgICAgICAgfSAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXHJcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBNYXRoTUwgbmFtZXNwYWNlLlxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xyXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gSFRNTCBpcyB2aWFcclxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcclxuICAgICAgICAvLyBpcyB2aWEgTWF0aE1MIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzXHJcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UgJiYgIUhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSAmJiAhTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcclxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAhQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdICYmIChDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTW3RhZ05hbWVdIHx8ICFBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xyXG4gICAgICB9IC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcclxuXHJcblxyXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIEFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSAvLyBUaGUgY29kZSBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpcyBwbGFjZSAodGhpcyBtZWFuc1xyXG4gICAgICAvLyB0aGF0IHRoZSBlbGVtZW50IHNvbWVob3cgZ290IG5hbWVzcGFjZSB0aGF0IGlzIG5vdFxyXG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxyXG4gICAgICAvLyBSZXR1cm4gZmFsc2UganVzdCBpbiBjYXNlLlxyXG5cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIF9mb3JjZVJlbW92ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIGNvbnN0IF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XHJcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xyXG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1yZW1vdmVcclxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcbiAgICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfcmVtb3ZlQXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIGFuIEF0dHJpYnV0ZSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBjb25zdCBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XHJcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcclxuICAgICAgICAgIGZyb206IG5vZGVcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoXykge1xyXG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xyXG4gICAgICAgICAgYXR0cmlidXRlOiBudWxsLFxyXG4gICAgICAgICAgZnJvbTogbm9kZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgLy8gV2Ugdm9pZCBhdHRyaWJ1dGUgdmFsdWVzIGZvciB1bnJlbW92YWJsZSBcImlzXCJcIiBhdHRyaWJ1dGVzXHJcblxyXG4gICAgICBpZiAobmFtZSA9PT0gJ2lzJyAmJiAhQUxMT1dFRF9BVFRSW25hbWVdKSB7XHJcbiAgICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgX2ZvcmNlUmVtb3ZlKG5vZGUpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoXykge31cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoXykge31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIF9pbml0RG9jdW1lbnRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxyXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgY29uc3QgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIF9pbml0RG9jdW1lbnQoZGlydHkpIHtcclxuICAgICAgLyogQ3JlYXRlIGEgSFRNTCBkb2N1bWVudCAqL1xyXG4gICAgICBsZXQgZG9jO1xyXG4gICAgICBsZXQgbGVhZGluZ1doaXRlc3BhY2U7XHJcblxyXG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xyXG4gICAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XHJcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xyXG4gICAgICAgIC8vIFJvb3Qgb2YgWEhUTUwgZG9jIG11c3QgY29udGFpbiB4bWxucyBkZWNsYXJhdGlvbiAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvbm9ybWF0aXZlLmh0bWwjc3RyaWN0KVxyXG4gICAgICAgIGRpcnR5ID0gJzxodG1sIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPjxoZWFkPjwvaGVhZD48Ym9keT4nICsgZGlydHkgKyAnPC9ib2R5PjwvaHRtbD4nO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcclxuICAgICAgLypcclxuICAgICAgICogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlXHJcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cclxuICAgICAgICovXHJcblxyXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XHJcbiAgICAgIH1cclxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXHJcblxyXG5cclxuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgICBkb2MgPSBpbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChOQU1FU1BBQ0UsICd0ZW1wbGF0ZScsIG51bGwpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcclxuICAgICAgICB9IGNhdGNoIChfKSB7Ly8gU3ludGF4IGVycm9yIGlmIGRpcnR5UGF5bG9hZCBpcyBpbnZhbGlkIHhtbFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcclxuICAgICAgICBib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGJvZHkuY2hpbGROb2Rlc1swXSB8fCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cclxuXHJcblxyXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xyXG4gICAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5VGFnTmFtZS5jYWxsKGRvYywgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keScpWzBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIF9jcmVhdGVJdGVyYXRvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50fSByb290IGRvY3VtZW50L2ZyYWdtZW50IHRvIGNyZWF0ZSBpdGVyYXRvciBmb3JcclxuICAgICAqIEByZXR1cm4ge0l0ZXJhdG9yfSBpdGVyYXRvciBpbnN0YW5jZVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIGNvbnN0IF9jcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uIF9jcmVhdGVJdGVyYXRvcihyb290KSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCwgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcclxuICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsLCBmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfaXNDbG9iYmVyZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcclxuICAgICAgcmV0dXJuIGVsbSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAmJiAodHlwZW9mIGVsbS5ub2RlTmFtZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5yZW1vdmVDaGlsZCAhPT0gJ2Z1bmN0aW9uJyB8fCAhKGVsbS5hdHRyaWJ1dGVzIGluc3RhbmNlb2YgTmFtZWROb2RlTWFwKSB8fCB0eXBlb2YgZWxtLnJlbW92ZUF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLnNldEF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLm5hbWVzcGFjZVVSSSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5pbnNlcnRCZWZvcmUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5oYXNDaGlsZE5vZGVzICE9PSAnZnVuY3Rpb24nKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIF9pc05vZGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmogb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgTm9kZSA9PT0gJ29iamVjdCcgPyBvYmplY3QgaW5zdGFuY2VvZiBOb2RlIDogb2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvYmplY3Qubm9kZU5hbWUgPT09ICdzdHJpbmcnO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogX2V4ZWN1dGVIb29rXHJcbiAgICAgKiBFeGVjdXRlIHVzZXIgY29uZmlndXJhYmxlIGhvb2tzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcclxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIG5vZGUgdG8gd29yayBvbiB3aXRoIHRoZSBob29rXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBjb25zdCBfZXhlY3V0ZUhvb2sgPSBmdW5jdGlvbiBfZXhlY3V0ZUhvb2soZW50cnlQb2ludCwgY3VycmVudE5vZGUsIGRhdGEpIHtcclxuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rID0+IHtcclxuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xyXG4gICAgICpcclxuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXHJcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxyXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQ2hpbGRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcclxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufSB0cnVlIGlmIG5vZGUgd2FzIGtpbGxlZCwgZmFsc2UgaWYgbGVmdCBhbGl2ZVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIGNvbnN0IF9zYW5pdGl6ZUVsZW1lbnRzID0gZnVuY3Rpb24gX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpIHtcclxuICAgICAgbGV0IGNvbnRlbnQ7XHJcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cclxuXHJcbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcclxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cclxuXHJcblxyXG4gICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xyXG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cclxuXHJcblxyXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xyXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXHJcblxyXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xyXG4gICAgICAgIHRhZ05hbWUsXHJcbiAgICAgICAgYWxsb3dlZFRhZ3M6IEFMTE9XRURfVEFHU1xyXG4gICAgICB9KTtcclxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXHJcblxyXG5cclxuICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0NoaWxkTm9kZXMoKSAmJiAhX2lzTm9kZShjdXJyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkgJiYgKCFfaXNOb2RlKGN1cnJlbnROb2RlLmNvbnRlbnQpIHx8ICFfaXNOb2RlKGN1cnJlbnROb2RlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQpKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xyXG5cclxuXHJcbiAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XHJcbiAgICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhIGN1c3RvbSBlbGVtZW50IHRvIGhhbmRsZSAqL1xyXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2Jhc2ljQ3VzdG9tRWxlbWVudFRlc3QodGFnTmFtZSkpIHtcclxuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBpZiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHRhZ05hbWUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cclxuXHJcblxyXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSkge1xyXG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZ2V0Q2hpbGROb2RlcyhjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgICBpZiAoY2hpbGROb2RlcyAmJiBwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ291bnQgPSBjaGlsZE5vZGVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGlsZENvdW50IC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIENoZWNrIHdoZXRoZXIgZWxlbWVudCBoYXMgYSB2YWxpZCBuYW1lc3BhY2UgKi9cclxuXHJcblxyXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcclxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICAvKiBNYWtlIHN1cmUgdGhhdCBvbGRlciBicm93c2VycyBkb24ndCBnZXQgbm9zY3JpcHQgbVhTUyAqL1xyXG5cclxuXHJcbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWQpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcclxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICAvKiBTYW5pdGl6ZSBlbGVtZW50IGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcclxuICAgICAgICAvKiBHZXQgdGhlIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgKi9cclxuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgTVVTVEFDSEVfRVhQUiwgJyAnKTtcclxuICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBFUkJfRVhQUiwgJyAnKTtcclxuICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBUTVBMSVRfRVhQUiwgJyAnKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XHJcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKClcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXHJcblxyXG5cclxuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfaXNWYWxpZEF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNOYW1lIExvd2VyY2FzZSBhdHRyaWJ1dGUgbmFtZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcclxuXHJcblxyXG4gICAgY29uc3QgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXHJcbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAvKiBBbGxvdyB2YWxpZCBkYXRhLSogYXR0cmlidXRlczogQXQgbGVhc3Qgb25lIGNoYXJhY3RlciBhZnRlciBcIi1cIlxyXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcclxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcclxuICAgICAgICAgIFdlIGRvbid0IG5lZWQgdG8gY2hlY2sgdGhlIHZhbHVlOyBpdCdzIGFsd2F5cyBVUkkgc2FmZS4gKi9cclxuXHJcblxyXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmICFGT1JCSURfQVRUUltsY05hbWVdICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xyXG4gICAgICAgIGlmICggLy8gRmlyc3QgY29uZGl0aW9uIGRvZXMgYSB2ZXJ5IGJhc2ljIGNoZWNrIGlmIGEpIGl0J3MgYmFzaWNhbGx5IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgdGFnbmFtZSBBTkRcclxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xyXG4gICAgICAgIC8vIGFuZCBjKSBpZiB0aGUgYXR0cmlidXRlIG5hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2tcclxuICAgICAgICBfYmFzaWNDdXN0b21FbGVtZW50VGVzdChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8IC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcclxuICAgICAgICAvLyB0aGUgdmFsdWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcclxuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXHJcblxyXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAoIXZhbHVlKSA7IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfYmFzaWNDdXN0b21FbGVtZW50Q2hlY2tcclxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcclxuICAgICAqIGZvciBtb3JlIHNvcGhpc3RpY2F0ZWQgY2hlY2tpbmcgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvdmFsaWRhdGUtZWxlbWVudC1uYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBjb25zdCBfYmFzaWNDdXN0b21FbGVtZW50VGVzdCA9IGZ1bmN0aW9uIF9iYXNpY0N1c3RvbUVsZW1lbnRUZXN0KHRhZ05hbWUpIHtcclxuICAgICAgcmV0dXJuIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcclxuICAgICAqXHJcbiAgICAgKiBAcHJvdGVjdCBhdHRyaWJ1dGVzXHJcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxyXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXHJcbiAgICAgKiBAcHJvdGVjdCBzZXRBdHRyaWJ1dGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XHJcbiAgICAgIGxldCBhdHRyO1xyXG4gICAgICBsZXQgdmFsdWU7XHJcbiAgICAgIGxldCBsY05hbWU7XHJcbiAgICAgIGxldCBsO1xyXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXHJcblxyXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcclxuXHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICBhdHRyaWJ1dGVzXHJcbiAgICAgIH0gPSBjdXJyZW50Tm9kZTtcclxuICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhdHRyaWJ1dGVzOyBpZiBub3Qgd2UgbWlnaHQgaGF2ZSBhIHRleHQgbm9kZSAqL1xyXG5cclxuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBob29rRXZlbnQgPSB7XHJcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxyXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXHJcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXHJcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxyXG4gICAgICB9O1xyXG4gICAgICBsID0gYXR0cmlidXRlcy5sZW5ndGg7XHJcbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXHJcblxyXG4gICAgICB3aGlsZSAobC0tKSB7XHJcbiAgICAgICAgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgbmFtZSxcclxuICAgICAgICAgIG5hbWVzcGFjZVVSSVxyXG4gICAgICAgIH0gPSBhdHRyO1xyXG4gICAgICAgIHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHIudmFsdWUgOiBzdHJpbmdUcmltKGF0dHIudmFsdWUpO1xyXG4gICAgICAgIGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKG5hbWUpO1xyXG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cclxuXHJcbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xyXG4gICAgICAgIGhvb2tFdmVudC5hdHRyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xyXG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxyXG5cclxuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUF0dHJpYnV0ZScsIGN1cnJlbnROb2RlLCBob29rRXZlbnQpO1xyXG5cclxuICAgICAgICB2YWx1ZSA9IGhvb2tFdmVudC5hdHRyVmFsdWU7XHJcbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXHJcblxyXG4gICAgICAgIGlmIChob29rRXZlbnQuZm9yY2VLZWVwQXR0cikge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIFJlbW92ZSBhdHRyaWJ1dGUgKi9cclxuXHJcblxyXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xyXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCFob29rRXZlbnQua2VlcEF0dHIpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBXb3JrIGFyb3VuZCBhIHNlY3VyaXR5IGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cclxuXHJcblxyXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XHJcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcclxuXHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xyXG5cclxuXHJcbiAgICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xyXG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBNVVNUQUNIRV9FWFBSLCAnICcpO1xyXG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBFUkJfRVhQUiwgJyAnKTtcclxuICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgVE1QTElUX0VYUFIsICcgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxyXG4gICAgICAgICAqIFByZWZpeCBpZCBhbmQgbmFtZSBhdHRyaWJ1dGVzIHdpdGggYHVzZXItY29udGVudC1gXHJcbiAgICAgICAgICovXHJcblxyXG5cclxuICAgICAgICBpZiAoU0FOSVRJWkVfTkFNRURfUFJPUFMgJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykpIHtcclxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxyXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7IC8vIFByZWZpeCB0aGUgdmFsdWUgYW5kIGxhdGVyIHJlLWNyZWF0ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhlIHNhbml0aXplZCB2YWx1ZVxyXG5cclxuXHJcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBIYW5kbGUgYXR0cmlidXRlcyB0aGF0IHJlcXVpcmUgVHJ1c3RlZCBUeXBlcyAqL1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIDsgZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUobGNUYWcsIGxjTmFtZSkpIHtcclxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkU2NyaXB0VVJMJzpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBIYW5kbGUgaW52YWxpZCBkYXRhLSogYXR0cmlidXRlIHNldCBieSB0cnktY2F0Y2hpbmcgaXQgKi9cclxuXHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLyogRmFsbGJhY2sgdG8gc2V0QXR0cmlidXRlKCkgZm9yIGJyb3dzZXItdW5yZWNvZ25pemVkIG5hbWVzcGFjZXMgZS5nLiBcIngtc2NoZW1hXCIuICovXHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XHJcbiAgICAgIH1cclxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xyXG5cclxuXHJcbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCB0byBpdGVyYXRlIG92ZXIgcmVjdXJzaXZlbHlcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBjb25zdCBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcclxuICAgICAgbGV0IHNoYWRvd05vZGU7XHJcblxyXG4gICAgICBjb25zdCBzaGFkb3dJdGVyYXRvciA9IF9jcmVhdGVJdGVyYXRvcihmcmFnbWVudCk7XHJcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cclxuXHJcblxyXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xyXG5cclxuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XHJcbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xyXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xyXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXHJcblxyXG5cclxuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cclxuXHJcblxyXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XHJcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXHJcblxyXG5cclxuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cclxuXHJcblxyXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTYW5pdGl6ZVxyXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWd1cmF0aW9uIG9iamVjdFxyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxyXG5cclxuXHJcbiAgICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHkpIHtcclxuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XHJcbiAgICAgIGxldCBib2R5O1xyXG4gICAgICBsZXQgaW1wb3J0ZWROb2RlO1xyXG4gICAgICBsZXQgY3VycmVudE5vZGU7XHJcbiAgICAgIGxldCByZXR1cm5Ob2RlO1xyXG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cclxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXHJcbiAgICAgICAgdGhlIHVzZXIgaGFzIHJlcXVlc3RlZCBhIERPTSBvYmplY3QgcmF0aGVyIHRoYW4gYSBzdHJpbmcgKi9cclxuXHJcbiAgICAgIElTX0VNUFRZX0lOUFVUID0gIWRpcnR5O1xyXG5cclxuICAgICAgaWYgKElTX0VNUFRZX0lOUFVUKSB7XHJcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xyXG4gICAgICB9XHJcbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cclxuXHJcblxyXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJyAmJiAhX2lzTm9kZShkaXJ0eSkpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cclxuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3RvU3RyaW5nIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLyogUmV0dXJuIGRpcnR5IEhUTUwgaWYgRE9NUHVyaWZ5IGNhbm5vdCBydW4gKi9cclxuXHJcblxyXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xyXG4gICAgICAgIHJldHVybiBkaXJ0eTtcclxuICAgICAgfVxyXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cclxuXHJcblxyXG4gICAgICBpZiAoIVNFVF9DT05GSUcpIHtcclxuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcclxuICAgICAgfVxyXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXHJcblxyXG5cclxuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcclxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoSU5fUExBQ0UpIHtcclxuICAgICAgICAvKiBEbyBzb21lIGVhcmx5IHByZS1zYW5pdGl6YXRpb24gdG8gYXZvaWQgdW5zYWZlIHJvb3Qgbm9kZXMgKi9cclxuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcclxuICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhkaXJ0eS5ub2RlTmFtZSk7XHJcblxyXG4gICAgICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcclxuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdyb290IG5vZGUgaXMgZm9yYmlkZGVuIGFuZCBjYW5ub3QgYmUgc2FuaXRpemVkIGluLXBsYWNlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxyXG4gICAgICAgICAgIGVsZW1lbnRzIGJlaW5nIHN0cmlwcGVkIGJ5IHRoZSBwYXJzZXIgKi9cclxuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xyXG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xyXG4gICAgICAgICAgLyogTm9kZSBpcyBhbHJlYWR5IGEgYm9keSwgdXNlIGFzIGlzICovXHJcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcclxuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcclxuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1wb3J0ZWROb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLyogRXhpdCBkaXJlY3RseSBpZiB3ZSBoYXZlIG5vdGhpbmcgdG8gZG8gKi9cclxuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiYgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXHJcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIEluaXRpYWxpemUgdGhlIGRvY3VtZW50IHRvIHdvcmsgb24gKi9cclxuXHJcblxyXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcclxuICAgICAgICAvKiBDaGVjayB3ZSBoYXZlIGEgRE9NIG5vZGUgZnJvbSB0aGUgZGF0YSAqL1xyXG5cclxuICAgICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICAgIHJldHVybiBSRVRVUk5fRE9NID8gbnVsbCA6IFJFVFVSTl9UUlVTVEVEX1RZUEUgPyBlbXB0eUhUTUwgOiAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLyogUmVtb3ZlIGZpcnN0IGVsZW1lbnQgbm9kZSAob3VycykgaWYgRk9SQ0VfQk9EWSBpcyBzZXQgKi9cclxuXHJcblxyXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XHJcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGJvZHkuZmlyc3RDaGlsZCk7XHJcbiAgICAgIH1cclxuICAgICAgLyogR2V0IG5vZGUgaXRlcmF0b3IgKi9cclxuXHJcblxyXG4gICAgICBjb25zdCBub2RlSXRlcmF0b3IgPSBfY3JlYXRlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xyXG4gICAgICAvKiBOb3cgc3RhcnQgaXRlcmF0aW5nIG92ZXIgdGhlIGNyZWF0ZWQgZG9jdW1lbnQgKi9cclxuXHJcblxyXG4gICAgICB3aGlsZSAoY3VycmVudE5vZGUgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkge1xyXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXHJcbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXHJcblxyXG5cclxuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcclxuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXHJcblxyXG5cclxuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcclxuICAgICAgfVxyXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChJTl9QTEFDRSkge1xyXG4gICAgICAgIHJldHVybiBkaXJ0eTtcclxuICAgICAgfVxyXG4gICAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cclxuXHJcblxyXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xyXG4gICAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XHJcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XHJcblxyXG4gICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXHJcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3QgfHwgQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3Rtb2QpIHtcclxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIEFkb3B0Tm9kZSgpIGlzIG5vdCB1c2VkIGJlY2F1c2UgaW50ZXJuYWwgc3RhdGUgaXMgbm90IHJlc2V0XHJcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxyXG4gICAgICAgICAgICBpbiB0aGVvcnkgYnV0IHdlIHdvdWxkIHJhdGhlciBub3QgcmlzayBhbm90aGVyIGF0dGFjayB2ZWN0b3IuXHJcbiAgICAgICAgICAgIFRoZSBzdGF0ZSB0aGF0IGlzIGNsb25lZCBieSBpbXBvcnROb2RlKCkgaXMgZXhwbGljaXRseSBkZWZpbmVkXHJcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cclxuICAgICAgICAgICovXHJcbiAgICAgICAgICByZXR1cm5Ob2RlID0gaW1wb3J0Tm9kZS5jYWxsKG9yaWdpbmFsRG9jdW1lbnQsIHJldHVybk5vZGUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBzZXJpYWxpemVkSFRNTCA9IFdIT0xFX0RPQ1VNRU5UID8gYm9keS5vdXRlckhUTUwgOiBib2R5LmlubmVySFRNTDtcclxuICAgICAgLyogU2VyaWFsaXplIGRvY3R5cGUgaWYgYWxsb3dlZCAqL1xyXG5cclxuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UICYmIEFMTE9XRURfVEFHU1snIWRvY3R5cGUnXSAmJiBib2R5Lm93bmVyRG9jdW1lbnQgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSAmJiByZWdFeHBUZXN0KERPQ1RZUEVfTkFNRSwgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSkpIHtcclxuICAgICAgICBzZXJpYWxpemVkSFRNTCA9ICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcclxuICAgICAgfVxyXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xyXG5cclxuXHJcbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcclxuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIE1VU1RBQ0hFX0VYUFIsICcgJyk7XHJcbiAgICAgICAgc2VyaWFsaXplZEhUTUwgPSBzdHJpbmdSZXBsYWNlKHNlcmlhbGl6ZWRIVE1MLCBFUkJfRVhQUiwgJyAnKTtcclxuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIFRNUExJVF9FWFBSLCAnICcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gc2V0IHRoZSBjb25maWd1cmF0aW9uIG9uY2VcclxuICAgICAqIHNldENvbmZpZ1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgY29uZmlndXJhdGlvbiBvYmplY3RcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNmZykge1xyXG4gICAgICBfcGFyc2VDb25maWcoY2ZnKTtcclxuXHJcbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgdGhlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIGNsZWFyQ29uZmlnXHJcbiAgICAgKlxyXG4gICAgICovXHJcblxyXG5cclxuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgQ09ORklHID0gbnVsbDtcclxuICAgICAgU0VUX0NPTkZJRyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUHVibGljIG1ldGhvZCB0byBjaGVjayBpZiBhbiBhdHRyaWJ1dGUgdmFsdWUgaXMgdmFsaWQuXHJcbiAgICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxyXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQuIE90aGVyd2lzZSwgcmV0dXJucyBmYWxzZS5cclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBET01QdXJpZnkuaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHIsIHZhbHVlKSB7XHJcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cclxuICAgICAgaWYgKCFDT05GSUcpIHtcclxuICAgICAgICBfcGFyc2VDb25maWcoe30pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XHJcbiAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGF0dHIpO1xyXG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkSG9va1xyXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcclxuICAgICAqL1xyXG5cclxuXHJcbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gaG9va3NbZW50cnlQb2ludF0gfHwgW107XHJcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZUhvb2tcclxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XHJcbiAgICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBtb3JlIGFyZSBwcmVzZW50KVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByZW1vdmVkKHBvcHBlZCkgaG9va1xyXG4gICAgICovXHJcblxyXG5cclxuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcclxuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlSG9va3NcclxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcclxuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XHJcbiAgICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlQWxsSG9va3NcclxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcclxuICAgICAqXHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBob29rcyA9IHt9O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gRE9NUHVyaWZ5O1xyXG4gIH1cclxuXHJcbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xyXG5cclxuICByZXR1cm4gcHVyaWZ5O1xyXG5cclxufSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXHJcbiIsImltcG9ydCB7QXR0cmlidXRlc30gZnJvbSBcIi4vYXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgX2YgZnJvbSBcIi4vZnVuY3Rpb25zXCI7XHJcblxyXG5jb25zdCAkID0galF1ZXJ5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVtb3ZlUHJvZHVjdEF0dHJpYnV0ZXMge1xyXG4gICAgY29uc3RydWN0b3Iob2JqLCBjZWxscywgeCwgeSwgZSkge1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSBjZWxscztcclxuICAgICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgICAgICB0aGlzLnggPSBwYXJzZUludCh4KTtcclxuICAgICAgICB0aGlzLnkgPSBwYXJzZUludCh5KTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSAkKGB0ZFtkYXRhLXg9JHt0aGlzLnggfHwgMH1dW2RhdGEteT0ke3RoaXMueSB8fCAwfV1gKTtcclxuXHJcbiAgICAgICAgbGV0ICR0aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IG1vZGFsID0gX2YuY3JlYXRlTW9kYWwoe1xyXG4gICAgICAgICAgICBoZWFkZXI6IF9mLnRleHQoJ1JlbW92ZSBhdHRyaWJ1dGVzJyksXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBbe2NsYXNzOiAnc2F2ZS1hdHRyaWJ1dGVzJywgdGV4dDogX2YudGV4dCgnQXBwbHknKX1dLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnQobW9kYWwpO1xyXG4gICAgICAgICQoY2VsbCkuYXBwZW5kKG1vZGFsKTtcclxuXHJcbiAgICAgICAgbW9kYWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbGV0IHRoaXNUYXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ2Nsb3NlJykgfHwgdGhpc1RhcmdldC5oYXNDbGFzcygndmktd2JlLW1vZGFsLWNvbnRhaW5lcicpKSBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXNUYXJnZXQuaGFzQ2xhc3MoJ3NhdmUtYXR0cmlidXRlcycpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAkdGhpcy5hZGRBdHRyaWJ1dGVzKG1vZGFsKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUF0dHJpYnV0ZXMobW9kYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQXR0cmlidXRlcyhtb2RhbCkge1xyXG4gICAgICAgIGxldCByZW1vdmVBdHRyaWJ1dGVzID0gbW9kYWwuZmluZCgnLnZpLXdiZS1zZWxlY3QtdGF4b25vbXknKS5kcm9wZG93bignZ2V0IHZhbHVlcycpO1xyXG5cclxuICAgICAgICBpZiAocmVtb3ZlQXR0cmlidXRlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IGV4Y2VsT2JqID0gdGhpcy5vYmo7XHJcbiAgICAgICAgICAgIGxldCBicmVha0NvbnRyb2wgPSBmYWxzZSwgcmVjb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgaCA9IHRoaXMuY2VsbHM7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IGhbMV0sIGVuZCA9IGhbM10sIHggPSBoWzBdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHN0YXJ0OyB5IDw9IGVuZDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhjZWxPYmoucmVjb3Jkc1t5XVt4XSAmJiAhZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRvbmx5JykgJiYgZXhjZWxPYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgYnJlYWtDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV4Y2VsT2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZS5maWx0ZXIoYXR0ciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhcmVtb3ZlQXR0cmlidXRlcy5pbmNsdWRlcyhhdHRyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goZXhjZWxPYmoudXBkYXRlQ2VsbCh4LCB5LCBuZXdWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4Y2VsT2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGhpc3RvcnlcclxuICAgICAgICAgICAgZXhjZWxPYmouc2V0SGlzdG9yeSh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgICAgICByZWNvcmRzOiByZWNvcmRzLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBleGNlbE9iai5zZWxlY3RlZENlbGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRhYmxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb24gaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICBleGNlbE9iai51cGRhdGVUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50KG1vZGFsKSB7XHJcbiAgICAgICAgbGV0IHthdHRyaWJ1dGVzfSA9IEF0dHJpYnV0ZXM7XHJcbiAgICAgICAgbGV0IGFkZEF0dHJpYnV0ZSA9IGA8b3B0aW9uIHZhbHVlPVwiXCI+JHtfZi50ZXh0KCdTZWxlY3QgYXR0cmlidXRlcyB0byByZW1vdmUnKX08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgYWRkQXR0cmlidXRlICs9IGA8b3B0aW9uIHZhbHVlPVwiJHthdHRyfVwiPiR7YXR0cmlidXRlc1thdHRyXS5kYXRhLmF0dHJpYnV0ZV9sYWJlbH08L29wdGlvbj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cInZpLXdiZS10YXhvbm9teS1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS1zZWxlY3QtdGF4b25vbXkgZmx1aWQgdmktdWkgc2VsZWN0aW9uXCIgbXVsdGlwbGU+JHthZGRBdHRyaWJ1dGV9PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgbW9kYWwuZmluZCgnLmNvbnRlbnQnKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgbW9kYWwuZmluZCgndGFibGUgc2VsZWN0Jykuc2VsZWN0Mih7bXVsdGlwbGU6IHRydWV9KTtcclxuICAgICAgICBtb2RhbC5maW5kKCd0Ym9keScpLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgaXRlbXM6ICd0cicsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICBheGlzOiAneScsXHJcbiAgICAgICAgICAgIHNjcm9sbFNlbnNpdGl2aXR5OiA0MCxcclxuICAgICAgICAgICAgZm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXHJcbiAgICAgICAgICAgIGhlbHBlcjogJ2Nsb25lJyxcclxuICAgICAgICAgICAgaGFuZGxlOiAnLmljb24ubW92ZScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1vZGFsLmZpbmQoJy52aS13YmUtc2VsZWN0LXRheG9ub215JykuZHJvcGRvd24oKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge0F0dHJpYnV0ZXN9IGZyb20gXCIuL2F0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IF9mIGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xyXG5cclxuY29uc3QgJCA9IGpRdWVyeTtcclxuXHJcbmV4cG9ydCBjb25zdCBTaWRlYmFyID0ge1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAkKCcudmktdWkubWVudSAuaXRlbScpLnZpX3RhYigpO1xyXG4gICAgICAgICQoJy5idWxreS1zb3J0LWZpZWxkcy1hY2NvcmRpb24nKS52aV9hY2NvcmRpb24oKTtcclxuICAgICAgICAkKCcjYnVsa3ktc29ydC1maWVsZHMnKS5zb3J0YWJsZSh7YXhpczogXCJ5XCIsIGNvbnRhaW5tZW50OiBcInBhcmVudFwifSk7XHJcblxyXG4gICAgICAgIHRoaXMucmV2aXNpb24gPSB7fTtcclxuICAgICAgICB0aGlzLnNpZGViYXIgPSAkKCcjdmktd2JlLXNpZGViYXInKTtcclxuICAgICAgICB0aGlzLmhpc3RvcnlCb2R5VGFibGUgPSAkKCcjdmktd2JlLWhpc3RvcnktcG9pbnRzLWxpc3QgdGJvZHknKTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLWFwcGx5LWZpbHRlcicsIHRoaXMuYXBwbHlGaWx0ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLWZpbHRlci1sYWJlbCcsIHRoaXMuZmlsdGVySW5wdXRMYWJlbEZvY3VzKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2ZvY3VzJywgJy52aS13YmUtZmlsdGVyLWlucHV0JywgdGhpcy5maWx0ZXJJbnB1dEZvY3VzKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2JsdXInLCAnLnZpLXdiZS1maWx0ZXItaW5wdXQnLCB0aGlzLmZpbHRlcklucHV0Qmx1cik7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLWdldC1tZXRhLWZpZWxkcycsIHRoaXMuZ2V0TWV0YUZpZWxkcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NsaWNrJywgJy52aS13YmUtc2F2ZS1tZXRhLWZpZWxkczpub3QoLmxvYWRpbmcpJywgdGhpcy5zYXZlTWV0YUZpZWxkcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NsaWNrJywgJy52aS13YmUtYWRkLW5ldy1tZXRhLWZpZWxkJywgdGhpcy5hZGROZXdNZXRhRmllbGQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLmZpbmQoJ3RhYmxlLnZpLXdiZS1tZXRhLWZpZWxkcy1jb250YWluZXIgdGJvZHknKS5zb3J0YWJsZSh7YXhpczogJ3knLH0pO1xyXG4gICAgICAgIHRoaXMuc2lkZWJhci5maW5kKCd0YWJsZS52aS13YmUtbWV0YS1maWVsZHMtY29udGFpbmVyJykub24oJ2NsaWNrJywgJy52aS13YmUtcmVtb3ZlLW1ldGEtcm93JywgdGhpcy5yZW1vdmVNZXRhUm93KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLXNhdmUtdGF4b25vbXktZmllbGRzOm5vdCgubG9hZGluZyknLCB0aGlzLnNhdmVUYXhvbm9teUZpZWxkcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1zYXZlLXNldHRpbmdzJywgdGhpcy5zYXZlU2V0dGluZ3MuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbignY2xpY2snLCAnLnZpLXdiZS12aWV3LWhpc3RvcnktcG9pbnQnLCB0aGlzLnZpZXdIaXN0b3J5UG9pbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLXJlY292ZXInLCB0aGlzLnJlY292ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLXJldmVydC10aGlzLXBvaW50JywgdGhpcy5yZXZlcnRBbGxQcm9kdWN0cy5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NsaWNrJywgJy52aS13YmUtcmV2ZXJ0LXRoaXMta2V5JywgdGhpcy5yZXZlcnRQcm9kdWN0QXR0cmlidXRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1wYWdpbmF0aW9uIGEuaXRlbScsIHRoaXMuY2hhbmdlUGFnZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NoYW5nZScsICcudmktd2JlLWdvLXRvLXBhZ2UnLCB0aGlzLmNoYW5nZVBhZ2VCeUlucHV0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1tdWx0aS1zZWxlY3QtY2xlYXInLCB0aGlzLmNsZWFyTXVsdGlTZWxlY3QpO1xyXG5cclxuICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NoYW5nZScsICcudmktd2JlLW1ldGEtY29sdW1uLXR5cGUnLCB0aGlzLm1ldGFGaWVsZENoYW5nZVR5cGUpO1xyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbigna2V5dXAnLCAnLnZpLXdiZS1zZWFyY2gtbWV0YWtleScsIHRoaXMuc2VhcmNoTWV0YUtleSk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIoKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5tZXRhZmllbGRzKCk7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZGViYXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbHRlcigpIHtcclxuICAgICAgICBsZXQgZmlsdGVyRm9ybSA9ICQoJyN2aS13YmUtcHJvZHVjdHMtZmlsdGVyJyksXHJcbiAgICAgICAgICAgIGZpbHRlcklucHV0ID0gJCgnLnZpLXdiZS1maWx0ZXItaW5wdXQnKSxcclxuICAgICAgICAgICAgY3NzVG9wID0ge3RvcDogLTJ9LFxyXG4gICAgICAgICAgICBjc3NNaWRkbGUgPSB7dG9wOiAnNTAlJ307XHJcbiAgICAgICAgZmlsdGVySW5wdXQuZWFjaCgoaSwgZWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoZWwpLnZhbCgpKSAkKGVsKS5wYXJlbnQoKS5wcmV2KCkuY3NzKGNzc1RvcCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZpbHRlcklucHV0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gJCh0aGlzKS5wcmV2KCk7XHJcbiAgICAgICAgICAgIGxhYmVsLmNzcyhjc3NUb3ApO1xyXG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnZhbCgpKSBsYWJlbC5jc3MoY3NzTWlkZGxlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLWZpbHRlci1sYWJlbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5uZXh0KCkudHJpZ2dlcignZm9jdXMnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBhY3RGaWx0ZXIgPSBmaWx0ZXJGb3JtLmZpbmQoJy52aS11aS5jb21wYWN0LmRyb3Bkb3duJykuZHJvcGRvd24oKTtcclxuICAgICAgICBmaWx0ZXJGb3JtLmZpbmQoJy52aS13YmUudmktdWkuZHJvcGRvd246bm90KC52aS13YmUtZmlsdGVyLXNlbGVjdDIpJykuZHJvcGRvd24oe2NsZWFyYWJsZTogdHJ1ZSwgZnVsbFRleHRTZWFyY2g6IHRydWV9KTtcclxuICAgICAgICBmaWx0ZXJGb3JtLmZpbmQoJy52aS13YmUudmktdWkuZHJvcGRvd24udmktd2JlLWZpbHRlci1zZWxlY3QyJykuZWFjaChmdW5jdGlvbiAoayx2KXtcclxuICAgICAgICAgICAgbGV0IHRtcF9wbGFjZWhvbGRlciA9ICQodikuZGF0YSgncGxhY2Vob2xkZXInKSx0YXhvbm9teV90eXBlID0gJCh2KS5hdHRyKCdpZCcpLnJlcGxhY2UoJ3ZpLXdiZS0nLCcnKTtcclxuICAgICAgICAgICAgJCh2KS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0bXBfcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgYWpheDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogd2JlUGFyYW1zLmFqYXhVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBxdWlldE1pbGxpczogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDI1MCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICd2aV93YmVfYWpheCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aV93YmVfbm9uY2U6IHdiZVBhcmFtcy5ub25jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yl9hY3Rpb246ICdzZWFyY2hfdGF4b25vbXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGF4b25vbXlfdHlwZTogdGF4b25vbXlfdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogcGFyYW1zLnRlcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3Jlc3VsdHM6IGRhdGF9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdjbGljaycsICcudmktd2JlLWNsZWFyLWZpbHRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLnZpLXdiZS1maWx0ZXItbGFiZWwnKS5jc3MoY3NzTWlkZGxlKTtcclxuICAgICAgICAgICAgZmlsdGVySW5wdXQudmFsKCcnKTtcclxuICAgICAgICAgICAgZmlsdGVyRm9ybS5maW5kKCdkaXYudmktd2JlLnZpLXVpLmRyb3Bkb3duJykuZHJvcGRvd24oJ2NsZWFyJyk7XHJcbiAgICAgICAgICAgIGZpbHRlckZvcm0uZmluZCgnc2VsZWN0LnZpLXdiZS52aS11aS5kcm9wZG93bicpLnZhbChudWxsKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgY29tcGFjdEZpbHRlci5maW5kKCcubWVudSAuaXRlbTpmaXJzdCcpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2lkZWJhci5vbignY2hhbmdlJywgJyN2aS13YmUtaGFzX2V4cGlyZV9kYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZXhwaXJlRGF0ZUdyb3VwID0gJCgnLnZpLXdiZS1leHBpcmUtZGF0ZS1ncm91cCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09PSAneWVzJyA/IGV4cGlyZURhdGVHcm91cC5zaG93KCkgOiBleHBpcmVEYXRlR3JvdXAuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNpZGViYXIuZmluZCgnI3ZpLXdiZS1oYXNfZXhwaXJlX2RhdGUnKS50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXR0aW5ncygpIHtcclxuICAgICAgICBsZXQgc2V0dGluZ3NGb3JtID0gJCgnLnZpLXdiZS1zZXR0aW5ncy10YWInKTtcclxuICAgICAgICBzZXR0aW5nc0Zvcm0uZmluZCgnc2VsZWN0LmRyb3Bkb3duJykuZHJvcGRvd24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgbWV0YWZpZWxkcygpIHtcclxuICAgICAgICB0aGlzLnJlbmRlck1ldGFGaWVsZHNUYWJsZShBdHRyaWJ1dGVzLm1ldGFGaWVsZHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoaXN0b3J5KCkge1xyXG4gICAgICAgIHRoaXMucGFnaW5hdGlvbigxKTtcclxuICAgICAgICAvLyB0aGlzLnNhdmVSZXZpc2lvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwYWdpbmF0aW9uKGN1cnJlbnRQYWdlLCBtYXhQYWdlID0gQXR0cmlidXRlcy5oaXN0b3J5UGFnZXMpIHtcclxuICAgICAgICB0aGlzLnNpZGViYXIuZmluZCgnLnZpLXdiZS1wYWdpbmF0aW9uJykuaHRtbChfZi5wYWdpbmF0aW9uKG1heFBhZ2UsIGN1cnJlbnRQYWdlKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFwcGx5RmlsdGVyKGUpIHtcclxuICAgICAgICBsZXQgJHRoaXMgPSB0aGlzLCB0aGlzQnRuID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzQnRuLmhhc0NsYXNzKCdsb2FkaW5nJykpIHJldHVybjtcclxuXHJcbiAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHN1Yl9hY3Rpb246ICdhZGRfZmlsdGVyX2RhdGEnLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyX2RhdGE6ICQoJyN2aS13YmUtcHJvZHVjdHMtZmlsdGVyJykuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJfa2V5OiBBdHRyaWJ1dGVzLmZpbHRlcktleVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuc2lkZWJhci50cmlnZ2VyKCdhZnRlckFkZEZpbHRlcicsIFtyZXMuZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgX2Yuc2hvd01lc3NhZ2UoIHt0aXRsZTpcIlN1Y2Nlc3NcIiwgbWVzc2FnZTogJ0ZpbHRlcmVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6IFwicG9zaXRpdmVcIiwgZHVyYXRpb246IDMwMDB9ICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpbWl0UHJvZHVjdFBlclBhZ2UoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBpZiAodmFsdWUgPiA1MCkgJCh0aGlzKS52YWwoNTApO1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDApICQodGhpcykudmFsKDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlU2V0dGluZ3MoZSkge1xyXG4gICAgICAgIGxldCAkdGhpcyA9IHRoaXMsIHRoaXNCdG4gPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgc3ViX2FjdGlvbjogJ3NhdmVfc2V0dGluZ3MnLFxyXG4gICAgICAgICAgICAgICAgZmllbGRzOiAkKCdmb3JtLnZpLXdiZS1zZXR0aW5ncy10YWInKS5zZXJpYWxpemUoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzLnNldHRpbmdzID0gcmVzLmRhdGEuc2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJJbnRlcnZhbCgkdGhpcy5hdXRvU2F2ZVJldmlzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkdGhpcy5zYXZlUmV2aXNpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5zaWRlYmFyLnRyaWdnZXIoJ2FmdGVyU2F2ZVNldHRpbmdzJywgW3Jlcy5kYXRhXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5yZW1vdmVDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVySW5wdXRMYWJlbEZvY3VzKCkge1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLmZpbmQoJ2lucHV0JykudHJpZ2dlcignZm9jdXMnKTtcclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVySW5wdXRGb2N1cygpIHtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnByZXYoKS5jc3Moe3RvcDogLTJ9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVySW5wdXRCbHVyKCkge1xyXG4gICAgICAgIGlmICghJCh0aGlzKS52YWwoKSkgJCh0aGlzKS5wYXJlbnQoKS5wcmV2KCkuY3NzKHt0b3A6ICc1MCUnfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldE1ldGFGaWVsZHMoZSkge1xyXG4gICAgICAgIGxldCAkdGhpcyA9IHRoaXMsIHRoaXNCdG4gPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdnZXRfbWV0YV9maWVsZHMnLCBjdXJyZW50X21ldGFfZmllbGRzOiAkdGhpcy5nZXRDdXJyZW50TWV0YUZpZWxkcygpfSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNCdG4uYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICR0aGlzLnJlbmRlck1ldGFGaWVsZHNUYWJsZShyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzLm1ldGFGaWVsZHMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyTWV0YUZpZWxkc1RhYmxlKGRhdGEpIHtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBtZXRhS2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgaHRtbCArPSB0aGlzLnJlbmRlclJvdyhtZXRhS2V5LCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy52aS13YmUtbWV0YS1maWVsZHMtY29udGFpbmVyIHRib2R5JykuaHRtbChodG1sKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyUm93KG1ldGFLZXksIGRhdGEpIHtcclxuICAgICAgICBsZXQgbWV0YSA9IGRhdGFbbWV0YUtleV0gfHwge30sXHJcbiAgICAgICAgICAgIG9wdGlvbkh0bWwgPSAnJyxcclxuICAgICAgICAgICAgaW5wdXRUeXBlID0gbWV0YS5pbnB1dF90eXBlIHx8ICcnLFxyXG4gICAgICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGV4dGlucHV0OiAnVGV4dCBpbnB1dCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0ZWRpdG9yOiAnVGV4dCBlZGl0b3InLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyaW5wdXQ6ICdOdW1iZXIgaW5wdXQnLFxyXG4gICAgICAgICAgICAgICAgYXJyYXk6ICdBcnJheScsXHJcbiAgICAgICAgICAgICAgICBqc29uOiAnSlNPTicsXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveDogJ0NoZWNrYm94JyxcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAnQ2FsZW5kYXInLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICdJbWFnZScsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6ICdTZWxlY3QnLFxyXG4gICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6ICdNdWx0aXNlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICBnYWxsZXJ5OiAnR2FsbGVyeScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1ldGFWYWx1ZSA9IG1ldGEubWV0YV92YWx1ZSB8fCAnJyxcclxuICAgICAgICAgICAgc2hvcnRWYWx1ZSA9IG1ldGFWYWx1ZS5zbGljZSgwLCAxNSksXHJcbiAgICAgICAgICAgIGZ1bGxWYWx1ZUh0bWwgPSBtZXRhVmFsdWUubGVuZ3RoID4gMTYgPyBgPGRpdiBjbGFzcz1cInZpLXdiZS1mdWxsLW1ldGEtdmFsdWVcIj4ke21ldGFWYWx1ZX08L2Rpdj5gIDogJycsXHJcbiAgICAgICAgICAgIHNlbGVjdFNvdXJjZSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBvcHRpb25WYWx1ZSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbkh0bWwgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblZhbHVlfVwiICR7b3B0aW9uVmFsdWUgPT09IGlucHV0VHlwZSA/ICdzZWxlY3RlZCcgOiAnJ30+JHtvcHRpb25zW29wdGlvblZhbHVlXX08L29wdGlvbj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvcnRWYWx1ZSArPSBzaG9ydFZhbHVlLmxlbmd0aCA8IG1ldGFWYWx1ZS5sZW5ndGggPyAnLi4uJyA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRUeXBlID09PSAnc2VsZWN0JyB8fCBpbnB1dFR5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcclxuICAgICAgICAgICAgc2VsZWN0U291cmNlICs9IGA8dGV4dGFyZWEgY2xhc3M9XCJ2aS13YmUtc2VsZWN0LW9wdGlvbnNcIj4ke21ldGEuc2VsZWN0X29wdGlvbnN9PC90ZXh0YXJlYT5gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ2aS13YmUtbWV0YS1rZXlcIj4ke21ldGFLZXl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2aS13YmUtbWV0YS1jb2x1bW4tbmFtZVwiIHZhbHVlPVwiJHttZXRhLmNvbHVtbl9uYW1lIHx8ICcnfVwiPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmktd2JlLWRpc3BsYXktbWV0YS12YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpLXdiZS1zaG9ydC1tZXRhLXZhbHVlXCI+JHtzaG9ydFZhbHVlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmdWxsVmFsdWVIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInZpLXdiZS1tZXRhLWNvbHVtbi10eXBlXCI+JHtvcHRpb25IdG1sfTwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3NlbGVjdFNvdXJjZX1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInZpLXdiZS1tZXRhLWZpZWxkLWFjdGl2ZS1jb2x1bW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpLXVpIHRvZ2dsZSBjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cInZpLXdiZS1tZXRhLWNvbHVtbi1hY3RpdmVcIiAke3BhcnNlSW50KG1ldGEuYWN0aXZlKSA/ICdjaGVja2VkJyA6ICcnfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+IDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aS13YmUtbWV0YS1maWVsZC1hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXVpIGJ1dHRvbiBiYXNpYyBtaW5pIHZpLXdiZS1yZW1vdmUtbWV0YS1yb3dcIj48aSBjbGFzcz1cImljb24gdHJhc2hcIj4gPC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIGJhc2ljIG1pbmlcIj48aSBjbGFzcz1cImljb24gbW92ZVwiPiA8L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5gO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXRhRmllbGRDaGFuZ2VUeXBlKCkge1xyXG4gICAgICAgIGxldCBzZWxlY3RUeXBlT3B0aW9ucyA9ICQoJzx0ZXh0YXJlYSBjbGFzcz1cInZpLXdiZS1zZWxlY3Qtb3B0aW9uc1wiPjwvdGV4dGFyZWE+Jyk7XHJcbiAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgbGV0IHNpYmxpbmdzID0gJCh0aGlzKS5zaWJsaW5ncygpO1xyXG4gICAgICAgIGlmICh2YWwgPT09ICdzZWxlY3QnIHx8IHZhbCA9PT0gJ211bHRpc2VsZWN0Jykge1xyXG4gICAgICAgICAgICBpZiAoIXNpYmxpbmdzLmxlbmd0aCkgJCh0aGlzKS5hZnRlcihzZWxlY3RUeXBlT3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2libGluZ3MucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWFyY2hNZXRhS2V5KCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgJCgnLnZpLXdiZS1tZXRhLWZpZWxkcy1jb250YWluZXIgdGJvZHkgdHInKS5lYWNoKGZ1bmN0aW9uIChpLCB0cikge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9ICQodHIpLmZpbmQoJy52aS13YmUtbWV0YS1rZXknKS50ZXh0KCkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChtZXRhS2V5LmluZGV4T2YoZmlsdGVyKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRyKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZU1ldGFGaWVsZHMoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzQnRuLmhhc0NsYXNzKCdsb2FkaW5nJykpIHJldHVybjtcclxuXHJcbiAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtzdWJfYWN0aW9uOiAnc2F2ZV9tZXRhX2ZpZWxkcycsIG1ldGFfZmllbGRzOiB0aGlzLmdldEN1cnJlbnRNZXRhRmllbGRzKCl9LFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBmYWxzZSA9PT0gcmVzLnN1Y2Nlc3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoIHJlcy5kYXRhLm1lc3NhZ2UgKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q3VycmVudE1ldGFGaWVsZHMoKSB7XHJcbiAgICAgICAgbGV0IG1ldGFfZmllbGRzID0ge307XHJcbiAgICAgICAgbGV0IG1ldGFBcnIgPSBBdHRyaWJ1dGVzLm1ldGFGaWVsZHM7XHJcbiAgICAgICAgJCgndGFibGUudmktd2JlLW1ldGEtZmllbGRzLWNvbnRhaW5lciB0Ym9keSB0cicpLmVhY2goZnVuY3Rpb24gKGksIHJvdykge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9ICQocm93KS5maW5kKCcudmktd2JlLW1ldGEta2V5JykudGV4dCgpO1xyXG4gICAgICAgICAgICBtZXRhX2ZpZWxkc1ttZXRhS2V5XSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbl9uYW1lOiAkKHJvdykuZmluZCgnLnZpLXdiZS1tZXRhLWNvbHVtbi1uYW1lJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICBpbnB1dF90eXBlOiAkKHJvdykuZmluZCgnLnZpLXdiZS1tZXRhLWNvbHVtbi10eXBlJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6ICQocm93KS5maW5kKCcudmktd2JlLW1ldGEtY29sdW1uLWFjdGl2ZTpjaGVja2VkJykubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbWV0YV92YWx1ZTogbWV0YUFyclttZXRhS2V5XSA/IG1ldGFBcnJbbWV0YUtleV0ubWV0YV92YWx1ZSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0X29wdGlvbnM6ICQocm93KS5maW5kKCcudmktd2JlLXNlbGVjdC1vcHRpb25zJykudmFsKCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhX2ZpZWxkcztcclxuICAgIH0sXHJcblxyXG4gICAgYWRkTmV3TWV0YUZpZWxkKGUpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSAkKGUuY3VycmVudFRhcmdldCkucHJldigpLFxyXG4gICAgICAgICAgICBtZXRhS2V5ID0gaW5wdXQudmFsKCksXHJcbiAgICAgICAgICAgIHZhbGlkYXRlID0gbWV0YUtleS5tYXRjaCgvXltcXHdcXGRfLV0qJC9nKTtcclxuXHJcbiAgICAgICAgaWYgKCFtZXRhS2V5IHx8ICF2YWxpZGF0ZSB8fCBBdHRyaWJ1dGVzLm1ldGFGaWVsZHNbbWV0YUtleV0pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG5ld1JvdyA9IHRoaXMucmVuZGVyUm93KG1ldGFLZXksIHt9KTtcclxuICAgICAgICBpZiAobmV3Um93KSB7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgICAgICQoJ3RhYmxlLnZpLXdiZS1tZXRhLWZpZWxkcy1jb250YWluZXIgdGJvZHknKS5hcHBlbmQobmV3Um93KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZU1ldGFSb3coKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd0cicpLnJlbW92ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlVGF4b25vbXlGaWVsZHMoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgbGV0IHRheG9ub215RmllbGRzID0gW107XHJcblxyXG4gICAgICAgICQoJ3RhYmxlLnZpLXdiZS10YXhvbm9teS1maWVsZHMgLnZpLXdiZS10YXhvbm9teS1hY3RpdmU6Y2hlY2tlZCcpLmVhY2goZnVuY3Rpb24gKGksIHJvdykge1xyXG4gICAgICAgICAgICBsZXQgdGF4S2V5ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpLmZpbmQoJy52aS13YmUtdGF4b25vbXkta2V5JykudGV4dCgpO1xyXG4gICAgICAgICAgICB0YXhvbm9teUZpZWxkcy5wdXNoKHRheEtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICBkYXRhOiB7c3ViX2FjdGlvbjogJ3NhdmVfdGF4b25vbXlfZmllbGRzJywgdGF4b25vbXlfZmllbGRzOiB0YXhvbm9teUZpZWxkc30sXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLmFkZENsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHZpZXdIaXN0b3J5UG9pbnQoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICBoaXN0b3J5aUQgPSB0aGlzQnRuLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICAgICR0aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICd2aWV3X2hpc3RvcnlfcG9pbnQnLCBpZDogaGlzdG9yeWlEfSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNCdG4uYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2VzcyAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0cyA9IHJlcy5kYXRhLmNvbXBhcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiBwcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHByb2R1Y3RzW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInZpLXdiZS1oaXN0b3J5LXByb2R1Y3RcIiBkYXRhLXByb2R1Y3RfaWQ9XCIke2lkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJkcm9wZG93biBpY29uXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktdWkgYnV0dG9uIG1pbmkgYmFzaWMgdmktd2JlLXJldmVydC10aGlzLXByb2R1Y3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uIHVuZG9cIj4gPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFibGUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGl0ZW0uZmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFZhbCA9IHR5cGVvZiBpdGVtLmN1cnJlbnRba2V5XSA9PT0gJ3N0cmluZycgPyBpdGVtLmN1cnJlbnRba2V5XSA6IEpTT04uc3RyaW5naWZ5KGl0ZW0uY3VycmVudFtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoaXN0b3J5VmFsID0gdHlwZW9mIGl0ZW0uaGlzdG9yeVtrZXldID09PSAnc3RyaW5nJyA/IGl0ZW0uaGlzdG9yeVtrZXldIDogSlNPTi5zdHJpbmdpZnkoaXRlbS5oaXN0b3J5W2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gYDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmZpZWxkc1trZXldfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7Y3VycmVudFZhbH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke2hpc3RvcnlWYWx9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aS11aSBidXR0b24gYmFzaWMgbWluaSB2aS13YmUtcmV2ZXJ0LXRoaXMta2V5XCIgZGF0YS1wcm9kdWN0X2lkPVwiJHtpZH1cIiBkYXRhLXByb2R1Y3Rfa2V5PVwiJHtrZXl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24gdW5kb1wiPiA8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZSA9IGA8dGFibGUgaWQ9XCJ2aS13YmUtaGlzdG9yeS1wb2ludC1kZXRhaWxcIiBjbGFzcz1cInZpLXVpIGNlbGxlZCB0YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BdHRyaWJ1dGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkN1cnJlbnQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkhpc3Rvcnk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiXCI+UmV2ZXJ0PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RhYmxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJjb250ZW50XCI+JHt0YWJsZX08L2Rpdj48L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gJChgPGRpdiBjbGFzcz1cInZpLXVpIHN0eWxlZCBmbHVpZCBhY2NvcmRpb25cIj4ke2h0bWx9PC9kaXY+YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy52aS13YmUtaGlzdG9yeS1yZXZpZXcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbChodG1sKS5hdHRyKCdkYXRhLWhpc3RvcnlfaWQnLCBoaXN0b3J5aUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmVwZW5kKGA8aDQ+SGlzdG9yeSBwb2ludDogJHtyZXMuZGF0YS5kYXRlfTwvaDQ+YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChgPGRpdiBjbGFzcz1cInZpLXVpIGJ1dHRvbiB0aW55IHZpLXdiZS1yZXZlcnQtdGhpcy1wb2ludFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke19mLnRleHQoJ1JldmVydCBhbGwgcHJvZHVjdCBpbiB0aGlzIHBvaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+ICR7X2YudGV4dCgnVGhlIGN1cnJlbnQgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoZSByZWNvcmRzIGluIGRhdGFiYXNlJyl9PC9wPmApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy50aXRsZScpLm9uKCdjbGljaycsIChlKSA9PiAkdGhpcy5yZXZlcnRTaW5nbGVQcm9kdWN0KGUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbC52aV9hY2NvcmRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBodG1sLmZpbmQoJy50aXRsZTpmaXJzdCcpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVjb3ZlcihlKSB7XHJcbiAgICAgICAgbGV0IHRoaXNCdG4gPSAkKGUuY3VycmVudFRhcmdldCksXHJcbiAgICAgICAgICAgIGhpc3RvcnlJRCA9IHRoaXNCdG4uZGF0YSgnaWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdyZXZlcnRfaGlzdG9yeV9hbGxfcHJvZHVjdHMnLCBoaXN0b3J5X2lkOiBoaXN0b3J5SUR9LFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgX2Yuc2hvd01lc3NhZ2UoIHt0aXRsZTpcIlN1Y2Nlc3NcIiwgbWVzc2FnZTogJ1JldmVydGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6IFwicG9zaXRpdmVcIiwgZHVyYXRpb246IDMwMDB9ICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVydFNpbmdsZVByb2R1Y3QoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuO1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygndmktd2JlLXJldmVydC10aGlzLXByb2R1Y3QnKSkgdGhpc0J0biA9ICQoZS50YXJnZXQpO1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcygndmktd2JlLXJldmVydC10aGlzLXByb2R1Y3QnKSkgdGhpc0J0biA9ICQoZS50YXJnZXQpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpc0J0bikge1xyXG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBpZCA9IHRoaXNCdG4uY2xvc2VzdCgnLnZpLXdiZS1oaXN0b3J5LXByb2R1Y3QnKS5kYXRhKCdwcm9kdWN0X2lkJyksXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5SUQgPSB0aGlzQnRuLmNsb3Nlc3QoJy52aS13YmUtaGlzdG9yeS1yZXZpZXcnKS5kYXRhKCdoaXN0b3J5X2lkJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpc0J0bi5oYXNDbGFzcygnbG9hZGluZycpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtzdWJfYWN0aW9uOiAncmV2ZXJ0X2hpc3Rvcnlfc2luZ2xlX3Byb2R1Y3QnLCBoaXN0b3J5X2lkOiBoaXN0b3J5SUQsIHBpZDogcGlkfSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLnNob3dNZXNzYWdlKCB7dGl0bGU6XCJTdWNjZXNzXCIsIG1lc3NhZ2U6ICdSZXZlcnRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiBcInBvc2l0aXZlXCIsIGR1cmF0aW9uOiAzMDAwfSApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJ0QWxsUHJvZHVjdHMoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgbGV0IGhpc3RvcnlJRCA9IHRoaXNCdG4uY2xvc2VzdCgnLnZpLXdiZS1oaXN0b3J5LXJldmlldycpLmRhdGEoJ2hpc3RvcnlfaWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdyZXZlcnRfaGlzdG9yeV9hbGxfcHJvZHVjdHMnLCBoaXN0b3J5X2lkOiBoaXN0b3J5SUR9LFxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5hZGRDbGFzcygnbG9hZGluZycpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgX2Yuc2hvd01lc3NhZ2UoIHt0aXRsZTpcIlN1Y2Nlc3NcIiwgbWVzc2FnZTogJ1JldmVydGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6IFwicG9zaXRpdmVcIiwgZHVyYXRpb246IDMwMDB9ICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0J0bi5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVydFByb2R1Y3RBdHRyaWJ1dGUoZSkge1xyXG4gICAgICAgIGxldCB0aGlzQnRuID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGUgPSB0aGlzQnRuLmRhdGEoJ3Byb2R1Y3Rfa2V5JyksXHJcbiAgICAgICAgICAgIHBpZCA9IHRoaXNCdG4uY2xvc2VzdCgnLnZpLXdiZS1oaXN0b3J5LXByb2R1Y3QnKS5kYXRhKCdwcm9kdWN0X2lkJyksXHJcbiAgICAgICAgICAgIGhpc3RvcnlJRCA9IHRoaXNCdG4uY2xvc2VzdCgnLnZpLXdiZS1oaXN0b3J5LXJldmlldycpLmRhdGEoJ2hpc3RvcnlfaWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNCdG4uaGFzQ2xhc3MoJ2xvYWRpbmcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdyZXZlcnRfaGlzdG9yeV9wcm9kdWN0X2F0dHJpYnV0ZScsIGF0dHJpYnV0ZTogYXR0cmlidXRlLCBoaXN0b3J5X2lkOiBoaXN0b3J5SUQsIHBpZDogcGlkfSxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNCdG4uYWRkQ2xhc3MoJ2xvYWRpbmcnKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIF9mLnNob3dNZXNzYWdlKCB7dGl0bGU6XCJTdWNjZXNzXCIsIG1lc3NhZ2U6ICdSZXZlcnRlZCBBdHRyaWJ1dGUgc3VjY2Vzc2Z1bGx5JywgdHlwZTogXCJwb3NpdGl2ZVwiLCBkdXJhdGlvbjogMzAwMH0gKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQnRuLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlUGFnZShlKSB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCgkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wYWdlJykpO1xyXG4gICAgICAgIGlmICgkKGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2FjdGl2ZScpIHx8ICQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnZGlzYWJsZWQnKSB8fCAhcGFnZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubG9hZEhpc3RvcnlQYWdlKHBhZ2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VQYWdlQnlJbnB1dChlKSB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCgkKGUudGFyZ2V0KS52YWwoKSk7XHJcbiAgICAgICAgbGV0IG1heCA9IHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ21heCcpKTtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2UgPD0gbWF4ICYmIHBhZ2UgPiAwKSB0aGlzLmxvYWRIaXN0b3J5UGFnZShwYWdlKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXJNdWx0aVNlbGVjdCgpIHtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy52aS11aS5kcm9wZG93bicpLmRyb3Bkb3duKCdjbGVhcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkSGlzdG9yeVBhZ2UocGFnZSkge1xyXG4gICAgICAgIGxldCBsb2FkaW5nID0gX2Yuc3Bpbm5lcigpLFxyXG4gICAgICAgICAgICAkdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChwYWdlKSB7XHJcbiAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtzdWJfYWN0aW9uOiAnbG9hZF9oaXN0b3J5X3BhZ2UnLCBwYWdlOiBwYWdlfSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuc2lkZWJhci5maW5kKCcudmktd2JlLXBhZ2luYXRpb24nKS5wcmVwZW5kKGxvYWRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMucGFnaW5hdGlvbihwYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjdmktd2JlLWhpc3RvcnktcG9pbnRzLWxpc3QgdGJvZHknKS5odG1sKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2F2ZVJldmlzaW9uKCkge1xyXG4gICAgLy8gICAgIGxldCBhdXRvU2F2ZVRpbWUgPSBwYXJzZUludChBdHRyaWJ1dGVzLnNldHRpbmdzLmF1dG9fc2F2ZV9yZXZpc2lvbik7XHJcbiAgICAvLyAgICAgaWYgKGF1dG9TYXZlVGltZSA9PT0gMCkgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCAkdGhpcyA9IHRoaXM7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIHRoaXMuYXV0b1NhdmVSZXZpc2lvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgaWYgKE9iamVjdC5rZXlzKCR0aGlzLnJldmlzaW9uKS5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjdXJyZW50UGFnZSA9ICR0aGlzLnNpZGViYXIuZmluZCgnLnZpLXdiZS1wYWdpbmF0aW9uIGEuaXRlbS5hY3RpdmUnKS5kYXRhKCdwYWdlJykgfHwgMTtcclxuICAgIC8vICAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGRhdGE6IHtzdWJfYWN0aW9uOiAnYXV0b19zYXZlX3JldmlzaW9uJywgZGF0YTogJHRoaXMucmV2aXNpb24sIHBhZ2U6IGN1cnJlbnRQYWdlIHx8IDF9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnBhZ2VzKSBBdHRyaWJ1dGVzLmhpc3RvcnlQYWdlcyA9IHJlcy5kYXRhLnBhZ2VzO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnVwZGF0ZVBhZ2UpICR0aGlzLmhpc3RvcnlCb2R5VGFibGUuaHRtbChyZXMuZGF0YS51cGRhdGVQYWdlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJldmlzaW9uID0ge307XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5wYWdpbmF0aW9uKGN1cnJlbnRQYWdlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIH0sIGF1dG9TYXZlVGltZSAqIDEwMDApXHJcbiAgICAvLyB9XHJcbn07XHJcbiIsImNvbnN0IFRlbXBsYXRlcyA9IHtcclxuICAgIG1vZGFsKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIGxldCB7aGVhZGVyID0gJycsIGNvbnRlbnQgPSAnJywgYWN0aW9uc0h0bWwgPSAnJ30gPSBkYXRhO1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInZpLXdiZS1tb2RhbC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmktd2JlLW1vZGFsLW1haW4gdmktdWkgZm9ybSBzbWFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImNsb3NlIGljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aS13YmUtbW9kYWwtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGVyXCI+JHtoZWFkZXJ9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+JHtjb250ZW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj4ke2FjdGlvbnNIdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlZmF1bHRBdHRyaWJ1dGVzKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIGxldCB7aHRtbH0gPSBkYXRhO1xyXG4gICAgICAgIHJldHVybiBgPHRhYmxlIGNsYXNzPVwidmktdWkgY2VsbGVkIHRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXR0cmlidXRlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICR7aHRtbH1cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5gO1xyXG4gICAgfSxcclxuXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlczsiLCJpbXBvcnQgX2YgZnJvbSAnLi9mdW5jdGlvbnMnO1xyXG5pbXBvcnQge1BvcHVwfSBmcm9tIFwiLi9tb2RhbC1wb3B1cFwiO1xyXG5cclxuY29uc3QgJCA9IGpRdWVyeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRNdWx0aUNlbGxzRWRpdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmosIHgsIHksIGUsIHdvcmRXcmFwKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2RhdGEuamV4Y2VsID0gb2JqO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueCA9IHBhcnNlSW50KHgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGEueSA9IHBhcnNlSW50KHkpO1xyXG4gICAgICAgIHRoaXMuX3dvcmRXcmFwID0gd29yZFdyYXA7XHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtpZF0gfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGxldCBmb3JtdWxhSHRtbCA9IHRoaXMuY29udGVudCgpO1xyXG4gICAgICAgIGxldCBjZWxsID0gJChgdGRbZGF0YS14PSR7dGhpcy5nZXQoJ3gnKSB8fCAwfV1bZGF0YS15PSR7dGhpcy5nZXQoJ3knKSB8fCAwfV1gKTtcclxuICAgICAgICBuZXcgUG9wdXAoZm9ybXVsYUh0bWwsIGNlbGwpO1xyXG4gICAgICAgIGZvcm11bGFIdG1sLm9uKCdjbGljaycsICcudmktd2JlLWFwcGx5LWZvcm11bGEnLCB0aGlzLmFwcGx5Rm9ybXVsYS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvLyBmb3JtdWxhSHRtbC5vbignY2hhbmdlJywgJy52aS13YmUtdGV4dC1pbnB1dCcsIHRoaXMuYXBwbHlGb3JtdWxhLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5fd29yZFdyYXAgPyBgPHRleHRhcmVhIGNsYXNzPVwidmktd2JlLXRleHQtaW5wdXRcIiByb3dzPVwiM1wiPjwvdGV4dGFyZWE+YCA6IGA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7X2YudGV4dCgnQ29udGVudCcpfVwiIGNsYXNzPVwidmktd2JlLXRleHQtaW5wdXRcIj5gO1xyXG4gICAgICAgIHJldHVybiAkKGA8ZGl2IGNsYXNzPVwidmktd2JlLWZvcm11bGEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aW5wdXR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2aS11aSBidXR0b24gbWluaSB2aS13YmUtYXBwbHktZm9ybXVsYVwiPiR7X2YudGV4dCgnU2F2ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlGb3JtdWxhKGUpIHtcclxuICAgICAgICBsZXQgZm9ybSA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy52aS13YmUtZm9ybXVsYS1jb250YWluZXInKSxcclxuICAgICAgICAgICAgdmFsdWUgPSBmb3JtLmZpbmQoJy52aS13YmUtdGV4dC1pbnB1dCcpLnZhbCgpLFxyXG4gICAgICAgICAgICBleGNlbE9iaiA9IHRoaXMuZ2V0KCdqZXhjZWwnKTtcclxuXHJcbiAgICAgICAgbGV0IGJyZWFrQ29udHJvbCA9IGZhbHNlLCByZWNvcmRzID0gW107XHJcbiAgICAgICAgbGV0IGggPSBleGNlbE9iai5zZWxlY3RlZENvbnRhaW5lcjtcclxuICAgICAgICBsZXQgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdLCB4ID0gaFswXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgeSA9IHN0YXJ0OyB5IDw9IGVuZDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChleGNlbE9iai5yZWNvcmRzW3ldW3hdICYmICFleGNlbE9iai5yZWNvcmRzW3ldW3hdLmNsYXNzTGlzdC5jb250YWlucygncmVhZG9ubHknKSAmJiBleGNlbE9iai5yZWNvcmRzW3ldW3hdLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBicmVha0NvbnRyb2wgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goZXhjZWxPYmoudXBkYXRlQ2VsbCh4LCB5LCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgZXhjZWxPYmoudXBkYXRlRm9ybXVsYUNoYWluKHgsIHksIHJlY29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaGlzdG9yeVxyXG4gICAgICAgIGV4Y2VsT2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbjogZXhjZWxPYmouc2VsZWN0ZWRDZWxsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGFibGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbiBpZiBhcHBsaWNhYmxlXHJcbiAgICAgICAgZXhjZWxPYmoudXBkYXRlVGFibGUoKTtcclxuICAgIH1cclxuXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IF9mIGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0F0dHJpYnV0ZXN9IGZyb20gXCIuL2F0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IHtDYWxjdWxhdG9yLCBDYWxjdWxhdG9yQmFzZU9uUmVndWxhclByaWNlLCBGaWxsTnVtYmVyfSBmcm9tIFwiLi9jYWxjdWxhdG9yXCI7XHJcbmltcG9ydCB7U2lkZWJhcn0gZnJvbSBcIi4vc2lkZWJhclwiO1xyXG5pbXBvcnQgRmluZEFuZFJlcGxhY2UgZnJvbSBcIi4vZmluZC1hbmQtcmVwbGFjZVwiO1xyXG5pbXBvcnQgVGV4dE11bHRpQ2VsbHNFZGl0IGZyb20gJy4vdGV4dC1tdWx0aS1jZWxscy1lZGl0JztcclxuaW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4vbW9kYWwtcG9wdXBcIjtcclxuaW1wb3J0IEZpbmRBbmRSZXBsYWNlVGFncyBmcm9tIFwiLi9maW5kLWFuZC1yZXBsYWNlLXRhZ3NcIjtcclxuaW1wb3J0IEZpbmRBbmRSZXBsYWNlT3B0aW9ucyBmcm9tIFwiLi9maW5kLWFuZC1yZXBsYWNlLW9wdGlvbnNcIjtcclxuaW1wb3J0IEFkZEltYWdlVG9NdWx0aUdhbGxlcnkgZnJvbSBcIi4vYWRkLWltYWdlLXRvLW11bHRpLWdhbGxlcnlcIjtcclxuaW1wb3J0IE11bHRpcGxlUHJvZHVjdEF0dHJpYnV0ZXMgZnJvbSBcIi4vbXVsdGlwbGUtcHJvZHVjdC1hdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCBSZW1vdmVQcm9kdWN0QXR0cmlidXRlcyBmcm9tIFwiLi9yZW1vdmUtcHJvZHVjdC1hdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeSBmcm9tICcuL3B1cmlmeSc7XHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICAgY2xhc3MgQnVsa0VkaXQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXIgPSBTaWRlYmFyLmluaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wYXJlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudHJhc2ggPSBbXTtcclxuICAgICAgICAgICAgdGhpcy51blRyYXNoID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucmV2aXNpb24gPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSAkKCcjdmktd2JlLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnViYXIgPSAkKCcjdmktd2JlLW1lbnUtYmFyJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnViYXIub24oJ2NsaWNrJywgJy52aS13YmUtb3Blbi1zaWRlYmFyJywgdGhpcy5vcGVuTWVudS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51YmFyLm9uKCdjbGljaycsICdhLml0ZW06bm90KC52aS13YmUtb3Blbi1zaWRlYmFyKScsIHRoaXMuY2xvc2VNZW51LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51YmFyLm9uKCdjbGljaycsICcudmktd2JlLW5ldy1wcm9kdWN0cycsIHRoaXMuYWRkTmV3UHJvZHVjdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51YmFyLm9uKCdjbGljaycsICcudmktd2JlLW5ldy1jb3Vwb25zJywgdGhpcy5hZGROZXdDb3Vwb24uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1uZXctb3JkZXJzJywgdGhpcy5hZGROZXdPcmRlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1mdWxsLXNjcmVlbi1idG4nLCB0aGlzLnRvZ2dsZUZ1bGxTY3JlZW4uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudWJhci5vbignY2xpY2snLCAnLnZpLXdiZS1zYXZlLWJ1dHRvbicsIHRoaXMuc2F2ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51YmFyLm9uKCdjbGljaycsICcudmktd2JlLXBhZ2luYXRpb24gYS5pdGVtJywgdGhpcy5jaGFuZ2VQYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnViYXIub24oJ2NsaWNrJywgJy52aS13YmUtZ2V0LXByb2R1Y3QnLCB0aGlzLnJlbG9hZEN1cnJlbnRQYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnViYXIub24oJ2NoYW5nZScsICcudmktd2JlLWdvLXRvLXBhZ2UnLCB0aGlzLmNoYW5nZVBhZ2VCeUlucHV0LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2NlbGxvbmNoYW5nZScsICd0cicsIHRoaXMuY2VsbE9uQ2hhbmdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vbignY2xpY2snLCAnLmpleGNlbF9jb250ZW50JywgdGhpcy5yZW1vdmVFeGlzdGluZ0VkaXRvci5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2RibGNsaWNrJywgdGhpcy5yZW1vdmVDb250ZXh0UG9wdXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaWRlYmFyLm9uKCdhZnRlckFkZEZpbHRlcicsIHRoaXMuYWZ0ZXJBZGRGaWx0ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZWJhci5vbignYWZ0ZXJTYXZlU2V0dGluZ3MnLCB0aGlzLmFmdGVyU2F2ZVNldHRpbmdzLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NsaWNrJywgJy52aS13YmUtY2xvc2Utc2lkZWJhcicsIHRoaXMuY2xvc2VNZW51LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXIub24oJ2NoYW5nZScsICcjdmktd2JlLWVkaXRfZmllbGRzLCAjdmktd2JlLWV4Y2x1ZGVfZWRpdF9maWVsZHMnLCB0aGlzLnRvZ2dsZVNvcnRGaWVsZHMuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duQ29udHJvbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgdGhpcy5rZXlVcENvbnRyb2wuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW1vdmVFeGlzdGluZ0VkaXRvcihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Xb3JrQm9vayAmJiB0aGlzLldvcmtCb29rLmVkaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLldvcmtCb29rLmNsb3NlRWRpdG9yKHRoaXMuV29ya0Jvb2suZWRpdGlvblswXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtleURvd25Db250cm9sKGUpIHtcclxuICAgICAgICAgICAgaWYgKChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJiAhZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUud2hpY2ggPT09IDgzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWRlYmFyLnJlbW92ZUNsYXNzKCd2aS13YmUtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrZXlVcENvbnRyb2woZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgJiYgIWUudGFyZ2V0LmdldEF0dHJpYnV0ZSgncmVhZG9ubHknKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlY2ltYWwgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VycmVuY3knKTtcclxuICAgICAgICAgICAgICAgIGlmIChkZWNpbWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2ltYWxFeGlzdCA9IGN1cnJlbnRWYWx1ZS5pbmRleE9mKGRlY2ltYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2ltYWxFeGlzdCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGN1cnJlbnRWYWx1ZS5tYXRjaCgvXFxkL2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSB2YWx1ZSA/IHZhbHVlLmpvaW4oJycpIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BsaXQgPSBjdXJyZW50VmFsdWUuc3BsaXQoZGVjaW1hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW50ZWdlciwgZnJhY3Rpb24gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVnZXIgPSBzcGxpdFswXS5tYXRjaCgvW1xcZF0vZykuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0WzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb24gPSBzcGxpdFsxXS5tYXRjaCgvW1xcZF0vZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb24gPSBmcmFjdGlvbiA/IGZyYWN0aW9uLmpvaW4oJycpIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBmcmFjdGlvbiA/IGAke2ludGVnZXJ9JHtkZWNpbWFsfSR7ZnJhY3Rpb259YCA6IGAke2ludGVnZXJ9JHtkZWNpbWFsfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbW92ZUNvbnRleHRQb3B1cCgpIHtcclxuICAgICAgICAgICAgJCgnLnZpLXdiZS1jb250ZXh0LXBvcHVwJykucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS1wb3B1cC1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgaWYgKHdiZVBhcmFtcy5jb2x1bW5zKSBBdHRyaWJ1dGVzLnNldENvbHVtbnMod2JlUGFyYW1zLmNvbHVtbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24oMSwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMud29ya0Jvb2tJbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByb2R1Y3RzKCk7XHJcbiAgICAgICAgICAgIF9mLnNldEpleGNlbCh0aGlzLldvcmtCb29rKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbGxPbkNoYW5nZShlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCB7Y29sID0gJyd9ID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29sKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IEF0dHJpYnV0ZXMuaWRNYXBwaW5nW2NvbF07XHJcbiAgICAgICAgICAgIGxldCB0aGlzUm93ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2R1Y3RfdHlwZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1Jvdy5maW5kKCd0ZCcpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4ID0gJChlbCkuZGF0YSgneCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAmJiB4ICE9PSAwICYmIHggIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWwpLnJlbW92ZUNsYXNzKCdyZWFkb25seScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZXBlbmRBcnIgPSBBdHRyaWJ1dGVzLmNlbGxEZXBlbmRUeXBlW2RhdGEudmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlcGVuZEFycikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kQXJyLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gQXR0cmlidXRlcy5pZE1hcHBpbmdGbGlwW2VsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNSb3cuZmluZChgdGRbZGF0YS14PScke3Bvc30nXWApLmFkZENsYXNzKCdyZWFkb25seScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Bvc3RfZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBfZi5nZXRDb2xGcm9tQ29sdW1uVHlwZSgnc3RhdHVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzUm93LmZpbmQoYHRkW2RhdGEteD0nJHt4fSddYCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzUm93LmZpbmQoYHRkW2RhdGEteD0nJHt4fSddYCkuZ2V0KDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gKG5ldyBEYXRlKHZhbHVlKSkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB0aW1lID4gbm93ID8gJ2Z1dHVyZScgOiAncHVibGlzaCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Xb3JrQm9vay5zZXRWYWx1ZShjZWxsLCBzdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29ya0Jvb2tJbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY291bnRDb2wgPSAwLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlU2VsZWN0ZWRSb3dzID0gX2YudGV4dCgnRGVsZXRlIHJvd3Mgd2l0aCBzZWxlY3RlZCBjZWxscycpLFxyXG4gICAgICAgICAgICAgICAgb25jcmVhdGVyb3cgPSBudWxsLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dE1lbnVJdGVtcyxcclxuICAgICAgICAgICAgICAgIG9uc2VsZWN0aW9uID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIG9ucmVzaXplY29sdW1uID0gZnVuY3Rpb24gKGluc3RhbmNlLCBjZWxsLCB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViX2FjdGlvbjogJ3Jlc2l6ZV9jb2x1bW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uX2lkOiBBdHRyaWJ1dGVzLmNvbHVtbnNbY2VsbF0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5fd2lkdGg6IHdpZHRoIDw9IDU1ID8gNTUgOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHt9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWx1ZVRvQ2VsbChvYmosIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXSwgaCA9IG9iai5zZWxlY3RlZENvbnRhaW5lciwgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdLCB4ID0gaFswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gc3RhcnQ7IHkgPD0gZW5kOyB5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnJlY29yZHNbeV1beF0gJiYgIW9iai5yZWNvcmRzW3ldW3hdLmNsYXNzTGlzdC5jb250YWlucygncmVhZG9ubHknKSAmJiBvYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgYnJlYWtDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2gob2JqLnVwZGF0ZUNlbGwoeCwgeSwgdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldEhpc3Rvcnkoe2FjdGlvbjogJ3NldFZhbHVlJywgcmVjb3JkczogcmVjb3Jkcywgc2VsZWN0aW9uOiBvYmouc2VsZWN0ZWRDZWxsfSk7XHJcbiAgICAgICAgICAgICAgICBvYmoudXBkYXRlVGFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChBdHRyaWJ1dGVzLmVkaXRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwcm9kdWN0cyc6XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlU2VsZWN0ZWRSb3dzID0gYCR7X2YudGV4dCgnRGVsZXRlIHJvd3Mgd2l0aCBzZWxlY3RlZCBjZWxscycpfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpLXdiZS1jb250ZXh0LW1lbnUtbm90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHtfZi50ZXh0KCdWYXJpYXRpb25zIGNhbm5vdCByZXZlcnQgYWZ0ZXIgc2F2ZScpfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25jcmVhdGVyb3cgPSBmdW5jdGlvbiAocm93LCBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0VHlwZSA9IF9mLmdldFByb2R1Y3RUeXBlRnJvbVkoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXBlbmRBcnIgPSBBdHRyaWJ1dGVzLmNlbGxEZXBlbmRUeXBlW3Byb2R1Y3RUeXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlcGVuZEFycikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZEFyci5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBBdHRyaWJ1dGVzLmlkTWFwcGluZ0ZsaXBbZWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQocm93KS5maW5kKGB0ZFtkYXRhLXg9JyR7cG9zfSddYCkuYWRkQ2xhc3MoJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0aW9uID0gZnVuY3Rpb24gKGVsLCB4MSwgeTEsIHgyLCB5Miwgb3JpZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4MSA9PT0geDIgJiYgeTEgPT09IHkyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZ2V0Q2VsbEZyb21Db29yZHMoeDEsIHkxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9ICQoY2VsbCkuY2hpbGRyZW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoY2hpbGQubGVuZ3RoICYmIGNoaWxkLmhhc0NsYXNzKCd2aS13YmUtZ2FsbGVyeS1oYXMtaXRlbScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGlkcyA9IHRoaXMub3B0aW9ucy5kYXRhW3kxXVt4MV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGltYWdlcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoaWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpZCBvZiBpZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxldCBzcmMgPSBBdHRyaWJ1dGVzLmltZ1N0b3JhZ2VbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaW1hZ2VzICs9IGA8bGkgY2xhc3M9XCJ2aS13YmUtZ2FsbGVyeS1pbWFnZVwiPjxpbWcgc3JjPVwiJHtzcmN9XCI+PC9saT5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXcgUG9wdXAoYDx1bCBjbGFzcz1cInZpLXdiZS1nYWxsZXJ5LWltYWdlc1wiPiR7aW1hZ2VzfTwvdWw+YCwgJChjZWxsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudUl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zLCBvYmosIHgsIHksIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ29udGV4dFBvcHVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBvYmouc2VsZWN0ZWRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwYXJzZUludCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBhcnNlSW50KHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxzWzBdID09PSBjZWxsc1syXSAmJiB4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iai5vcHRpb25zLmNvbHVtbnNbeF0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnQ2hlY2snKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlVG9DZWxsKG9iaiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnVW5jaGVjaycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWVUb0NlbGwob2JqLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnQ2FsY3VsYXRvcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENhbGN1bGF0b3Iob2JqLCB4LCB5LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdGaWxsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmlsbE51bWJlcihvYmosIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ID4gMSAmJiBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLmlkID09PSAnc2FsZV9wcmljZScgJiYgb2JqLm9wdGlvbnMuY29sdW1uc1t4IC0gMV0uaWQgPT09ICdyZWd1bGFyX3ByaWNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0NhbGN1bGF0b3IgYmFzZSBvbiBSZWd1bGFyIHByaWNlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDYWxjdWxhdG9yQmFzZU9uUmVndWxhclByaWNlKG9iaiwgeCwgeSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnRWRpdCBtdWx0aXBsZSBjZWxscycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRleHRNdWx0aUNlbGxzRWRpdChvYmosIHgsIHksIGUsIG9iai5vcHRpb25zLmNvbHVtbnNbeF0ud29yZFdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0ZpbmQgYW5kIFJlcGxhY2UnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaW5kQW5kUmVwbGFjZShvYmosIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NhbGVuZGFyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSAkKGB0ZFtkYXRhLXg9JHt4fV1bZGF0YS15PSR7eX1dYCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQoY2VsbCkuaGFzQ2xhc3MoJ3JlYWRvbmx5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdPcGVuIGRhdGUgcGlja2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gb2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBfZi5jcmVhdGVFZGl0b3IoY2VsbCwgJ2lucHV0JywgJycsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5zdHlsZS5sZWZ0ID0gJ3Vuc2V0JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoID0gb2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5vcHRpb25zLnRhYmxlT3ZlcmZsb3cgPT0gdHJ1ZSB8fCBvYmoub3B0aW9ucy5mdWxsc2NyZWVuID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5vcHRpb25zLmNvbHVtbnNbeF0ub3B0aW9ucy5wb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm9wdGlvbnMuY29sdW1uc1t4XS5vcHRpb25zLnZhbHVlID0gb2JqLm9wdGlvbnMuZGF0YVt5XVt4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm9wdGlvbnMuY29sdW1uc1t4XS5vcHRpb25zLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5vcHRpb25zLmNvbHVtbnNbeF0ub3B0aW9ucy5vbmNsb3NlID0gZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZWwudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IHN0YXJ0OyB5IDw9IGVuZDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5yZWNvcmRzW3ldW3hdICYmICFvYmoucmVjb3Jkc1t5XVt4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3JlYWRvbmx5JykgJiYgb2JqLnJlY29yZHNbeV1beF0uc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChvYmoudXBkYXRlQ2VsbCh4LCB5LCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudXBkYXRlRm9ybXVsYUNoYWluKHgsIHksIHJlY29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iai5jbG9zZUVkaXRvcihjZWxsLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgaGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3NldFZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiByZWNvcmRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogb2JqLnNlbGVjdGVkQ2VsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0YWJsZSB3aXRoIGN1c3RvbSBjb25maWd1cmF0aW9uIGlmIGFwcGxpY2FibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai51cGRhdGVUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpTdWl0ZXMuY2FsZW5kYXIoZWRpdG9yLCBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGb2N1cyBvbiBlZGl0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXN0b20nOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvYmoub3B0aW9ucy5jb2x1bW5zW3hdLmVkaXRvci50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0RWRpdG9yJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0VkaXQgbXVsdGlwbGUgY2VsbHMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy52aS11aS5tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudmktdWkubW9kYWwgLmNsb3NlLmljb24nKS5vZmYoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbnltY2UuZ2V0KCd2aS13YmUtdGV4dC1lZGl0b3InKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyN2aS13YmUtdGV4dC1lZGl0b3InKS52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdwLmVkaXRvci5pbml0aWFsaXplKCd2aS13YmUtdGV4dC1lZGl0b3InLCBBdHRyaWJ1dGVzLnRpbnlNY2VPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlueW1jZS5nZXQoJ3ZpLXdiZS10ZXh0LWVkaXRvcicpLnNldENvbnRlbnQoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpLXdiZS10ZXh0LWVkaXRvci1zYXZlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IHdwLmVkaXRvci5nZXRDb250ZW50KCd2aS13YmUtdGV4dC1lZGl0b3InKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZVRvQ2VsbChvYmosIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd2aS13YmUtY2xvc2UnKSkgJCgnLnZpLXVpLm1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGFncyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdGaW5kIGFuZCByZXBsYWNlIHRhZ3MnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmluZEFuZFJlcGxhY2VUYWdzKG9iaiwgY2VsbHMsIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0Mic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdGaW5kIGFuZCByZXBsYWNlIG9wdGlvbnMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmluZEFuZFJlcGxhY2VPcHRpb25zKG9iaiwgY2VsbHMsIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ2FsbGVyeSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdBZGQgaW1hZ2UgdG8gc2VsZWN0ZWQgY2VsbHMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQWRkSW1hZ2VUb011bHRpR2FsbGVyeShvYmosIGNlbGxzLCB4LCB5LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9kdWN0X2F0dHJpYnV0ZXMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnQWRkIGF0dHJpYnV0ZXMgdG8gcHJvZHVjdHMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTXVsdGlwbGVQcm9kdWN0QXR0cmlidXRlcyhvYmosIGNlbGxzLCB4LCB5LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnUmVtb3ZlIG11bHRpcGxlIHByb2R1Y3QgYXR0cmlidXRlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlbW92ZVByb2R1Y3RBdHRyaWJ1dGVzKG9iaiwgY2VsbHMsIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkgaXRlbXMucHVzaCh7dHlwZTogJ2xpbmUnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHNbMV0gPT09IGNlbGxzWzNdICYmIHkgIT09IG51bGwgJiYgISBpc05hTih5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RUeXBlID0gX2YuZ2V0UHJvZHVjdFR5cGVGcm9tWSh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0VHlwZSA9PT0gJ3ZhcmlhYmxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnQWRkIHZhcmlhdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9mLmlzX2xvYWRpbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJfYWN0aW9uOiAnYWRkX3ZhcmlhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWQ6IF9mLmdldFByb2R1Y3RJZE9mQ2VsbChvYmosIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZi5sb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5zZXJ0Um93KDAsIHksIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0Um93RGF0YSh5ICsgMSwgcmVzLmRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHtfZi50ZXh0KCdDcmVhdGUgdmFyaWF0aW9ucyBmcm9tIGFsbCBhdHRyaWJ1dGVzJyl9IDxzcGFuIGNsYXNzPVwidmktd2JlLWNvbnRleHQtbWVudS1ub3RlXCI+KCR7X2YudGV4dCgnU2F2ZSBuZXcgYXR0cmlidXRlcyBiZWZvcmUnKX0pPC9zcGFuPmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2YuaXNfbG9hZGluZygpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJfYWN0aW9uOiAnbGlua19hbGxfdmFyaWF0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZDogX2YuZ2V0UHJvZHVjdElkT2ZDZWxsKG9iaiwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnNlcnRSb3coMCwgeSArIGksIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0Um93RGF0YSh5ICsgaSArIDEsIGl0ZW0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YucmVtb3ZlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZi5ub3RpY2UoYCR7cmVzLmRhdGEubGVuZ3RofSAke19mLnRleHQoJ3ZhcmlhdGlvbnMgYXJlIGFkZGVkJyl9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHt0eXBlOiAnbGluZSd9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZHVjdFR5cGUgIT09ICd2YXJpYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBpZCA9IF9mLmdldFByb2R1Y3RJZE9mQ2VsbChvYmosIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0R1cGxpY2F0ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdkdXBsaWNhdGVfcHJvZHVjdCcsIHByb2R1Y3RfaWQ6IHBpZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YubG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnNlcnRSb3coMCwgeSArIGksIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRSb3dEYXRhKHkgKyBpLCBpdGVtLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0dvIHRvIGVkaXQgcHJvZHVjdCBwYWdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihgJHtBdHRyaWJ1dGVzLmFkbWluVXJsfXBvc3QucGhwP3Bvc3Q9JHtwaWR9JmFjdGlvbj1lZGl0YCwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnVmlldyBvbiBTaW5nbGUgcHJvZHVjdCBwYWdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihgJHtBdHRyaWJ1dGVzLmZyb250ZW5kVXJsfT9wPSR7cGlkfSZwb3N0X3R5cGU9cHJvZHVjdCZwcmV2aWV3PXRydWVgLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3JkZXJzJzpcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudUl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zLCBvYmosIHgsIHksIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gb2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcGFyc2VJbnQoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwYXJzZUludCh5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9PSBudWxsICYmIHkgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhY3Rpb24gaW4gQXR0cmlidXRlcy5vcmRlckFjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IEF0dHJpYnV0ZXMub3JkZXJBY3Rpb25zW2FjdGlvbl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJfaWRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNlbGxzWzFdOyBpIDw9IGNlbGxzWzNdOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcl9pZHMucHVzaChfZi5nZXRQcm9kdWN0SWRPZkNlbGwob2JqLCBpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZi5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7c3ViX2FjdGlvbjogYWN0aW9uLCBvcmRlcl9pZHN9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZi5yZW1vdmVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoKSBpdGVtcy5wdXNoKHt0eXBlOiAnbGluZSd9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGROb3RlID0gZnVuY3Rpb24gKGlzX2N1c3RvbWVyX25vdGUgPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBvYmouZ2V0Q2VsbEZyb21Db29yZHMoY2VsbHNbMF0sIGNlbGxzWzFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbCA9ICQoYDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmktd2JlLWFkZC1ub3RlIHZpLXVpIGJ1dHRvbiB0aW55XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7X2YudGV4dCgnQWRkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9wdXAgPSBuZXcgUG9wdXAoY29udHJvbCwgJChjZWxsKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wub24oJ2NsaWNrJywgJy52aS13YmUtYWRkLW5vdGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub3RlID0gY29udHJvbC5maW5kKCd0ZXh0YXJlYScpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub3RlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IG9iai5zZWxlY3RlZENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gaFsxXSwgZW5kID0gaFszXSwgeCA9IGhbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2gob2JqLm9wdGlvbnMuZGF0YVt5XVswXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7c3ViX2FjdGlvbjogJ2FkZF9vcmRlcl9ub3RlJywgaWRzLCBub3RlLCBpc19jdXN0b21lcl9ub3RlfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2YubG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0FkZCBwcml2YXRlIG5vdGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGROb3RlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdBZGQgbm90ZSB0byBjdXN0b21lcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5vdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkgaXRlbXMucHVzaCh7dHlwZTogJ2xpbmUnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxzWzFdID09PSBjZWxsc1szXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcl9pZCA9IF9mLmdldFByb2R1Y3RJZE9mQ2VsbChvYmosIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0dvIHRvIGVkaXQgb3JkZXIgcGFnZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oYCR7QXR0cmlidXRlcy5hZG1pblVybH1wb3N0LnBocD9wb3N0PSR7b3JkZXJfaWR9JmFjdGlvbj1lZGl0YCwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkgaXRlbXMucHVzaCh7dHlwZTogJ2xpbmUnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvdXBvbnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51SXRlbXMgPSBmdW5jdGlvbiAoaXRlbXMsIG9iaiwgeCwgeSwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHMgPSBvYmouc2VsZWN0ZWRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwYXJzZUludCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBhcnNlSW50KHkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgeSAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsc1swXSA9PT0gY2VsbHNbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sVHlwZSA9IF9mLmdldENvbHVtblR5cGUoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbFR5cGUgPT09ICdjb2RlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdHZW5lcmF0ZSBjb3Vwb24gY29kZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnJlYWtDb250cm9sID0gZmFsc2UsIHJlY29yZHMgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IG9iai5zZWxlY3RlZENvbnRhaW5lciwgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdLCB4ID0gaFswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IHN0YXJ0OyB5IDw9IGVuZDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoucmVjb3Jkc1t5XVt4XSAmJiAhb2JqLnJlY29yZHNbeV1beF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZWFkb25seScpICYmIG9iai5yZWNvcmRzW3ldW3hdLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBicmVha0NvbnRyb2wgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBfZi5nZW5lcmF0ZUNvdXBvbkNvZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChvYmoudXBkYXRlQ2VsbCh4LCB5LCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0SGlzdG9yeSh7YWN0aW9uOiAnc2V0VmFsdWUnLCByZWNvcmRzOiByZWNvcmRzLCBzZWxlY3Rpb246IG9iai5zZWxlY3RlZENlbGx9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudXBkYXRlVGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLm9wdGlvbnMuY29sdW1uc1t4XS50eXBlID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnRWRpdCBtdWx0aXBsZSBjZWxscycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRleHRNdWx0aUNlbGxzRWRpdChvYmosIHgsIHksIGUsIG9iai5vcHRpb25zLmNvbHVtbnNbeF0ud29yZFdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0ZpbmQgYW5kIFJlcGxhY2UnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaW5kQW5kUmVwbGFjZShvYmosIHgsIHksIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoub3B0aW9ucy5jb2x1bW5zW3hdLnR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ0NoZWNrJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZVRvQ2VsbChvYmosIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ1VuY2hlY2snKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlVG9DZWxsKG9iaiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIGl0ZW1zLnB1c2goe3R5cGU6ICdsaW5lJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZXZpZXdzJzpcclxuICAgICAgICAgICAgICAgICAgICBvbmNyZWF0ZXJvdyA9IGZ1bmN0aW9uIChyb3csIGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldmlld1R5cGUgPSBfZi5nZXRSZXZpZXdUeXBlRnJvbShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlcGVuZEFyciA9IEF0dHJpYnV0ZXMuY2VsbERlcGVuZFR5cGVbcmV2aWV3VHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRBcnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRBcnIuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gQXR0cmlidXRlcy5pZE1hcHBpbmdGbGlwW2VsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHJvdykuZmluZChgdGRbZGF0YS14PScke3Bvc30nXWApLmFkZENsYXNzKCdyZWFkb25seScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudUl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zLCBvYmosIHgsIHksIGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gb2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcGFyc2VJbnQoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwYXJzZUludCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgeSAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsc1swXSA9PT0gY2VsbHNbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iai5vcHRpb25zLmNvbHVtbnNbeF0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdFZGl0IG11bHRpcGxlIGNlbGxzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBUZXh0TXVsdGlDZWxsc0VkaXQob2JqLCB4LCB5LCBlLCBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLndvcmRXcmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnRmluZCBhbmQgUmVwbGFjZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmluZEFuZFJlcGxhY2Uob2JqLCB4LCB5LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnRmluZCBhbmQgUmVwbGFjZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmluZEFuZFJlcGxhY2Uob2JqLCB4LCB5LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnQ2hlY2snKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWVUb0NlbGwob2JqLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnVW5jaGVjaycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZVRvQ2VsbChvYmosIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2FsZW5kYXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSAkKGB0ZFtkYXRhLXg9JHt4fV1bZGF0YS15PSR7eX1dYCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEkKGNlbGwpLmhhc0NsYXNzKCdyZWFkb25seScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZi50ZXh0KCdPcGVuIGRhdGUgcGlja2VyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvYmoub3B0aW9ucy5kYXRhW3ldW3hdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlZGl0b3IgPSBfZi5jcmVhdGVFZGl0b3IoY2VsbCwgJ2lucHV0JywgJycsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnN0eWxlLmxlZnQgPSAndW5zZXQnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoID0gb2JqLnNlbGVjdGVkQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gaFsxXSwgZW5kID0gaFszXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLm9wdGlvbnMudGFibGVPdmVyZmxvdyA9PSB0cnVlIHx8IG9iai5vcHRpb25zLmZ1bGxzY3JlZW4gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5vcHRpb25zLmNvbHVtbnNbeF0ub3B0aW9ucy5wb3NpdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLm9wdGlvbnMudmFsdWUgPSBvYmoub3B0aW9ucy5kYXRhW3ldW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm9wdGlvbnMuY29sdW1uc1t4XS5vcHRpb25zLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLm9wdGlvbnMub25jbG9zZSA9IGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZWwudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnJlY29yZHNbeV1beF0gJiYgIW9iai5yZWNvcmRzW3ldW3hdLmNsYXNzTGlzdC5jb250YWlucygncmVhZG9ubHknKSAmJiBvYmoucmVjb3Jkc1t5XVt4XS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaChvYmoudXBkYXRlQ2VsbCh4LCB5LCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnVwZGF0ZUZvcm11bGFDaGFpbih4LCB5LCByZWNvcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmouY2xvc2VFZGl0b3IoY2VsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBoaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdzZXRWYWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IHJlY29yZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogb2JqLnNlbGVjdGVkQ2VsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRhYmxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb24gaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai51cGRhdGVUYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpTdWl0ZXMuY2FsZW5kYXIoZWRpdG9yLCBvYmoub3B0aW9ucy5jb2x1bW5zW3hdLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9jdXMgb24gZWRpdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5vcHRpb25zLmNvbHVtbnNbeF0uZWRpdG9yLnR5cGUgPT09ICd0ZXh0RWRpdG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnRWRpdCBtdWx0aXBsZSBjZWxscycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpLXVpLm1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy52aS11aS5tb2RhbCAuY2xvc2UuaWNvbicpLm9mZignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGlueW1jZS5nZXQoJ3ZpLXdiZS10ZXh0LWVkaXRvcicpID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3ZpLXdiZS10ZXh0LWVkaXRvcicpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3AuZWRpdG9yLmluaXRpYWxpemUoJ3ZpLXdiZS10ZXh0LWVkaXRvcicsIEF0dHJpYnV0ZXMudGlueU1jZU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW55bWNlLmdldCgndmktd2JlLXRleHQtZWRpdG9yJykuc2V0Q29udGVudCgnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudmktd2JlLXRleHQtZWRpdG9yLXNhdmUnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gd3AuZWRpdG9yLmdldENvbnRlbnQoJ3ZpLXdiZS10ZXh0LWVkaXRvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlVG9DZWxsKG9iaiwgY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3ZpLXdiZS1jbG9zZScpKSAkKCcudmktdWkubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSB5LmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlkID0gb2JqLm9wdGlvbnMuZGF0YVt5XVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlkID0gIG9iai5vcHRpb25zLmRhdGFbeV1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHt0eXBlOiAnbGluZSd9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogX2YudGV4dCgnUmVwbHknICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpLXVpLm1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpLXVpLm1vZGFsIC5jbG9zZS5pY29uJykub2ZmKCdjbGljaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbnltY2UuZ2V0KCd2aS13YmUtdGV4dC1lZGl0b3InKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3ZpLXdiZS10ZXh0LWVkaXRvcicpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cC5lZGl0b3IuaW5pdGlhbGl6ZSgndmktd2JlLXRleHQtZWRpdG9yJywgQXR0cmlidXRlcy50aW55TWNlT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW55bWNlLmdldCgndmktd2JlLXRleHQtZWRpdG9yJykuc2V0Q29udGVudCgnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpLXdiZS10ZXh0LWVkaXRvci1zYXZlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaCA9IG9iai5zZWxlY3RlZENvbnRhaW5lciwgc3RhcnQgPSBoWzFdLCBlbmQgPSBoWzNdLCB4ID0gaFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gd3AuZWRpdG9yLmdldENvbnRlbnQoJ3ZpLXdiZS10ZXh0LWVkaXRvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld19jb21tZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBzdGFydDsgeSA8PSBlbmQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19jb21tZW50cy5wdXNoKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnRfaWQgOiBfZi5nZXREYXRhRnJvbUNlbGwob2JqLCBvYmoucmVjb3Jkc1t5XVswXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQgOiBfZi5nZXREYXRhRnJvbUNlbGwob2JqLCBvYmoucmVjb3Jkc1t5XVsxXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZE5ld1JlcGx5KCBjb250ZW50LCBuZXdfY29tbWVudHMgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygndmktd2JlLWNsb3NlJykpICQoJy52aS11aS5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsc1sxXSA9PT0gY2VsbHNbM10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9mLnRleHQoJ1ZpZXcgb24gU2luZ2xlIHByb2R1Y3QgcGFnZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oYCR7QXR0cmlidXRlcy5mcm9udGVuZFVybH0/cD0ke3BpZH0mcG9zdF90eXBlPXByb2R1Y3QmcHJldmlldz10cnVlYCwgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuV29ya0Jvb2sgPSAkKCcjdmktd2JlLXNwcmVhZHNoZWV0JykuamV4Y2VsKHtcclxuICAgICAgICAgICAgICAgIGFsbG93SW5zZXJ0Um93OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFsbG93SW5zZXJ0Q29sdW1uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFib3V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZyZWV6ZUNvbHVtbnM6IDMsXHJcbiAgICAgICAgICAgICAgICB0YWJsZU92ZXJmbG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGFibGVXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgdGFibGVIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IEF0dHJpYnV0ZXMuY29sdW1ucyxcclxuICAgICAgICAgICAgICAgIHN0cmlwSFRNTDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0V4cG9ydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0RlbGV0ZUNvbHVtbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhbGxvd1JlbmFtZUNvbHVtbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFsbG93WENvcHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGF6eUxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU3BpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB7ZGVsZXRlU2VsZWN0ZWRSb3dzfSxcclxuICAgICAgICAgICAgICAgIG9uY3JlYXRlcm93LFxyXG4gICAgICAgICAgICAgICAgY29udGV4dE1lbnVJdGVtcyxcclxuICAgICAgICAgICAgICAgIG9uc2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgb25yZXNpemVjb2x1bW4sXHJcbiAgICAgICAgICAgICAgICByb3dEcmFnOiB3YmVQYXJhbXM/LnNldHRpbmdzPy5sb2FkX3ZhcmlhdGlvbnMgIT09ICd5ZXMnLFxyXG5cclxuICAgICAgICAgICAgICAgIG9uY2hhbmdlKGluc3RhbmNlLCBjZWxsLCBjb2wsIHJvdywgdmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkob2xkVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChjID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciBjb2x1bW5OYW1lID0gamV4Y2VsLmdldENvbHVtbk5hbWVGcm9tSWQoW2MgKyAxLCByXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpbnN0YW5jZS5qZXhjZWwuc2V0VmFsdWUoY29sdW1uTmFtZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY2VsbCkucGFyZW50KCkudHJpZ2dlcignY2VsbG9uY2hhbmdlJywge2NlbGwsIGNvbCwgcm93LCB2YWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBpZCA9IHRoaXMub3B0aW9ucy5kYXRhW3Jvd11bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmNvbXBhcmUucHVzaChwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5jb21wYXJlID0gWy4uLm5ldyBTZXQoJHRoaXMuY29tcGFyZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkdGhpcy5jb21wYXJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5tZW51YmFyLmZpbmQoJy52aS13YmUtc2F2ZS1idXR0b24nKS5hZGRDbGFzcygndmktd2JlLXNhdmVhYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISR0aGlzLmlzQWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISR0aGlzLnJldmlzaW9uW3BpZF0pICR0aGlzLnJldmlzaW9uW3BpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW5UeXBlID0gX2YuZ2V0Q29sdW1uVHlwZShjb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMucmV2aXNpb25bcGlkXVtjb2x1bW5UeXBlXSA9IG9sZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbmJlZm9yZWNoYW5nZShpbnN0YW5jZSwgY2VsbCwgY29sLCByb3csIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBET01QdXJpZnkuc2FuaXRpemUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uZGVsZXRlcm93KGVsLCByb3dOdW1iZXIsIG51bU9mUm93cywgcm93UmVjb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiByb3dSZWNvcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnRyYXNoLnB1c2gocm93WzBdLmlubmVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHRoaXMudHJhc2gubGVuZ3RoKSAkdGhpcy5tZW51YmFyLmZpbmQoJy52aS13YmUtc2F2ZS1idXR0b24nKS5hZGRDbGFzcygndmktd2JlLXNhdmVhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9udW5kbyhlbCwgaGlzdG9yeVJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaXN0b3J5UmVjb3JkICYmIGhpc3RvcnlSZWNvcmQuYWN0aW9uID09PSAnZGVsZXRlUm93Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgb2YgaGlzdG9yeVJlY29yZC5yb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy51blRyYXNoLnB1c2gocm93WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25iZWZvcmVjb3B5KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Q29sID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5maXJzdENlbGxDb3B5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25jb3B5aW5nKHZhbHVlLCB4LCB5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkdGhpcy5maXJzdENlbGxDb3B5KSAkdGhpcy5maXJzdENlbGxDb3B5ID0gW3gsIHldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkdGhpcy5maXJzdENlbGxDb3B5WzBdICE9PSB4KSBjb3VudENvbCsrO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbmJlZm9yZXBhc3RlKGRhdGEsIHNlbGVjdGVkQ2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycpIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBzZWxlY3RlZENlbGxbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxUeXBlID0gdGhpcy5jb2x1bW5zW3hdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJHRoaXMuZmlyc3RDZWxsQ29weSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFsndGV4dCcsICdudW1iZXInLCAnY3VzdG9tJ10uaW5jbHVkZXMoY2VsbFR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbFR5cGUgPT09ICdjdXN0b20nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVkaXRvclR5cGUgPSB0aGlzLmNvbHVtbnNbeF0uZWRpdG9yLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRvclR5cGUgPT09ICd0ZXh0RWRpdG9yJyA/IGRhdGEgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNYID0gKyR0aGlzLmZpcnN0Q2VsbENvcHlbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRYID0gK3NlbGVjdGVkQ2VsbFswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc1hUeXBlID0gdGhpcy5jb2x1bW5zW3NYXS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0WFR5cGUgPSB0aGlzLmNvbHVtbnNbdFhdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgrJHRoaXMuZmlyc3RDZWxsQ29weVswXSAhPT0gK3NlbGVjdGVkQ2VsbFswXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50Q29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0NvcHkgc2luZ2xlIGNvbHVtbiBlYWNoIHRpbWUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzWFR5cGUgIT09IHRYVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0NhbiBub3QgcGFzdGUgZGF0YSB3aXRoIGRpZmZlcmVudCBjb2x1bW4gdHlwZS4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uc2Nyb2xsKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdE9wZW5pbmcgPSAkKGVsKS5maW5kKCdzZWxlY3Quc2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RPcGVuaW5nLmxlbmd0aCkgc2VsZWN0T3BlbmluZy5zZWxlY3QyKCdjbG9zZScpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uY3JlYXRlZWRpdG9yKGVsLCBjZWxsLCB4LCB5LCBlZGl0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbHVtbnNbeF0uY3VycmVuY3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXJyZW5jeScsIHRoaXMub3B0aW9ucy5jb2x1bW5zW3hdLmN1cnJlbmN5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZU1lbnUoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXIucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS1vcGVuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wZW5NZW51KGUpIHtcclxuICAgICAgICAgICAgbGV0IHRhYiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdtZW51X3RhYicpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRhYiA9IHRoaXMuc2lkZWJhci5maW5kKGBhLml0ZW1bZGF0YS10YWI9JyR7dGFifSddYCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGFiLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiB0aGlzLnNpZGViYXIuaGFzQ2xhc3MoJ3ZpLXdiZS1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5yZW1vdmVDbGFzcygndmktd2JlLW9wZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhci5hZGRDbGFzcygndmktd2JlLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYWIudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0b2dnbGVTb3J0RmllbGRzKGUpIHtcclxuICAgICAgICAgICAgbGV0ICRzb3J0X2ZpZWxkcyA9IHRoaXMuc2lkZWJhci5maW5kKCcjYnVsa3ktc29ydC1maWVsZHMnKSxcclxuICAgICAgICAgICAgICAgIGV4Y2x1ZGUgPSB0aGlzLnNpZGViYXIuZmluZCgnI3ZpLXdiZS1leGNsdWRlX2VkaXRfZmllbGRzJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlID0gdGhpcy5zaWRlYmFyLmZpbmQoJyN2aS13YmUtZWRpdF9maWVsZHMnKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGUubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICRzb3J0X2ZpZWxkcy5maW5kKCcuYnVsa3ktc29ydC1maWVsZCcpLmFkZENsYXNzKCd2aS13YmUtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goaW5jbHVkZSwgZnVuY3Rpb24gKGssdikge1xyXG4gICAgICAgICAgICAgICAgICAgICRzb3J0X2ZpZWxkcy5maW5kKCcuYnVsa3ktc29ydC1maWVsZC0nK3YpLnJlbW92ZUNsYXNzKCd2aS13YmUtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNvcnRfZmllbGRzLmZpbmQoJy5idWxreS1zb3J0LWZpZWxkJykucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXhjbHVkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGV4Y2x1ZGUsIGZ1bmN0aW9uIChrLHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc29ydF9maWVsZHMuZmluZCgnLmJ1bGt5LXNvcnQtZmllbGQtJyt2KS5hZGRDbGFzcygndmktd2JlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZE5ld1Byb2R1Y3QoKSB7XHJcbiAgICAgICAgICAgIGlmIChfZi5pc19sb2FkaW5nKCkpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHByb2R1Y3ROYW1lID0gcHJvbXB0KF9mLnRleHQoJ1BsZWFzZSBlbnRlciBuZXcgcHJvZHVjdCBuYW1lJykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2R1Y3ROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdhZGRfbmV3X3Byb2R1Y3QnLCBwcm9kdWN0X25hbWU6IHByb2R1Y3ROYW1lfSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5sb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5pc0FkZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLldvcmtCb29rLmluc2VydFJvdygwLCAwLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuV29ya0Jvb2suc2V0Um93RGF0YSgwLCByZXMuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5yZW1vdmVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkTmV3Q291cG9uKCkge1xyXG4gICAgICAgICAgICBpZiAoX2YuaXNfbG9hZGluZygpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7c3ViX2FjdGlvbjogJ2FkZF9uZXdfY291cG9uJ30sXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmlzQWRkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5Xb3JrQm9vay5pbnNlcnRSb3coMCwgMCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuV29ya0Jvb2suc2V0Um93RGF0YSgwLCByZXMuZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChyZXMuc3RhdHVzVGV4dCArIHJlcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmlzQWRkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX2YucmVtb3ZlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkTmV3T3JkZXIoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKCdwb3N0LW5ldy5waHA/cG9zdF90eXBlPXNob3Bfb3JkZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZE5ld1JlcGx5KCBjb250ZW50LCBuZXdfY29tbWVudHMgKSB7XHJcbiAgICAgICAgICAgIGlmIChfZi5pc19sb2FkaW5nKCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCAkdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdhZGRfbmV3X3JlcGx5JywgY29udGVudCwgbmV3X2NvbW1lbnRzIH0sXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5yZWxvYWRDdXJyZW50UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5pc0FkZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4oZSkge1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9ICQoJy53cC1hZG1pbicpLCBzY3JlZW5CdG4gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGJvZHkudG9nZ2xlQ2xhc3MoJ3ZpLXdiZS1mdWxsLXNjcmVlbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJvZHkuaGFzQ2xhc3MoJ3ZpLXdiZS1mdWxsLXNjcmVlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW5CdG4uZmluZCgnaS5pY29uJykucmVtb3ZlQ2xhc3MoJ2V4dGVybmFsIGFsdGVybmF0ZScpLmFkZENsYXNzKCd3aW5kb3cgY2xvc2Ugb3V0bGluZScpO1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuQnRuLmF0dHIoJ3RpdGxlJywgJ0V4aXQgZnVsbCBzY3JlZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbkJ0bi5maW5kKCdpLmljb24nKS5yZW1vdmVDbGFzcygnd2luZG93IGNsb3NlIG91dGxpbmUnKS5hZGRDbGFzcygnZXh0ZXJuYWwgYWx0ZXJuYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBzY3JlZW5CdG4uYXR0cigndGl0bGUnLCAnRnVsbCBzY3JlZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogQXR0cmlidXRlcy5hamF4VXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5BdHRyaWJ1dGVzLmFqYXhEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Yl9hY3Rpb246ICdzZXRfZnVsbF9zY3JlZW5fb3B0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGJvZHkuaGFzQ2xhc3MoJ3ZpLXdiZS1mdWxsLXNjcmVlbicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0QWxsUm93cygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuV29ya0Jvb2suZ2V0RGF0YShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgICAkKCd0ZC5lcnJvcicpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICR0aGlzID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gdGhpcy5nZXRBbGxSb3dzKCksXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0c0ZvclNhdmUgPSBbXSwgc2t1RXJyb3JzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBwaWQgb2YgdGhpcy5jb21wYXJlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9kdWN0IG9mIHByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHByb2R1Y3RbMF0pID09PSBwYXJzZUludChwaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzRm9yU2F2ZS5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF9mLmlzX2xvYWRpbmcoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2F2ZVN0ZXAoc3RlcCA9IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gc3RlcCAqIHJhbmdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgcmFuZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMgPSBwcm9kdWN0c0ZvclNhdmUuc2xpY2Uoc3RhcnQsIGVuZCksXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXAgPSBzdGVwICogcmFuZ2UgPj0gcHJvZHVjdHNGb3JTYXZlLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHByb2R1Y3RzLmxlbmd0aCA9PT0gMCAmJiAkdGhpcy50cmFzaC5sZW5ndGggPT09IDAgJiYgJHRoaXMudW5UcmFzaC5sZW5ndGggPT09IDAgJiYgc3RlcCA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBfZi5ub3RpY2UoX2YudGV4dCgnTm90aGluZyBjaGFuZ2UgdG8gc2F2ZScpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTdGVwICYmIHN0ZXAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNrdUVycm9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Yubm90aWNlKF9mLnRleHQoJ0ludmFsaWQgb3IgZHVwbGljYXRlZCBTS1UnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IF9mLmdldENvbEZyb21Db2x1bW5UeXBlKCdza3UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFsbFJvd3MgPSAkdGhpcy5Xb3JrQm9vay5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSBpbiBhbGxSb3dzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IGFsbFJvd3NbeV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNrdUVycm9ycy5pbmNsdWRlcyhyb3dbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsID0gJHRoaXMuV29ya0Jvb2suZ2V0Q2VsbEZyb21Db29yZHMoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoY2VsbCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlzdG9yaWVzID0gJHRoaXMuV29ya0Jvb2suaGlzdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGlzdG9yaWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBoaXN0b3J5IG9mIGhpc3Rvcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhpc3RvcnkuYWN0aW9uICE9PSAnZGVsZXRlUm93JykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaUZvckRlbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBoaXN0b3J5LnJvd0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGlzdG9yeS5yb3dEYXRhW2ldWzFdID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpRm9yRGVsLnB1c2gocGFyc2VJbnQoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaUZvckRlbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnJvd0RhdGEgPSBoaXN0b3J5LnJvd0RhdGEuZmlsdGVyKChpdGVtLCBpKSA9PiAhaUZvckRlbC5pbmNsdWRlcyhpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5yb3dOb2RlID0gaGlzdG9yeS5yb3dOb2RlLmZpbHRlcigoaXRlbSwgaSkgPT4gIWlGb3JEZWwuaW5jbHVkZXMoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnkucm93UmVjb3JkcyA9IGhpc3Rvcnkucm93UmVjb3Jkcy5maWx0ZXIoKGl0ZW0sIGkpID0+ICFpRm9yRGVsLmluY2x1ZGVzKGkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5Lm51bU9mUm93cyA9IGhpc3RvcnkubnVtT2ZSb3dzIC0gaUZvckRlbC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnNhdmVSZXZpc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLnNob3dNZXNzYWdlKCB7dGl0bGU6XCJTdWNjZXNzXCIsIG1lc3NhZ2U6ICdTYXZlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiBcInBvc2l0aXZlXCIsIGR1cmF0aW9uOiAzMDAwfSApO1xyXG4gICAgICAgICAgICAgICAgICAgIF9mLnJlbW92ZUxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9mLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViX2FjdGlvbjogJ3NhdmVfcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czogSlNPTi5zdHJpbmdpZnkocHJvZHVjdHMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFzaDogJHRoaXMudHJhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVudHJhc2g6ICR0aGlzLnVuVHJhc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5sb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy50cmFzaCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy51blRyYXNoID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmNvbXBhcmUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMubWVudWJhci5maW5kKCcudmktd2JlLXNhdmUtYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ3ZpLXdiZS1zYXZlYWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnNrdUVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2t1RXJyb3JzID0gWy4uLm5ldyBTZXQoWy4uLnNrdUVycm9ycywgLi4ucmVzLmRhdGEuc2t1RXJyb3JzXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlU3RlcChzdGVwICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Yuc2hvd01lc3NhZ2UoIHt0aXRsZTpcIkVycm9yXCIsIG1lc3NhZ2U6IHJlcy5zdGF0dXNUZXh0ICsgcmVzLnJlc3BvbnNlVGV4dCwgdHlwZTogXCJwb3NpdGl2ZVwiLCBkdXJhdGlvbjogMzAwMH0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzYXZlU3RlcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0V3JhcE1vZGUoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIGlmIChlbmFibGUpe1xyXG4gICAgICAgICAgICAgICAgJCgnI3ZpLXdiZS1zcHJlYWRzaGVldCcpLmFkZENsYXNzKCd2aWJ1bGt5LXNwcmVhZHNoZWV0LXdyYXAtbW9kZScpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjdmktd2JlLXNwcmVhZHNoZWV0JykucmVtb3ZlQ2xhc3MoJ3ZpYnVsa3ktc3ByZWFkc2hlZXQtd3JhcC1tb2RlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWRQcm9kdWN0cyhwYWdlID0gMSwgcmVDcmVhdGUgPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9mLmlzX2xvYWRpbmcoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkdGhpcy50ZXh0V3JhcE1vZGUoJHRoaXMuc2lkZWJhci5maW5kKCdpbnB1dFtuYW1lPVwid3JhcF9tb2RlXCJdJykucHJvcCgnY2hlY2tlZCcpKTtcclxuICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViX2FjdGlvbjogJ2xvYWRfcHJvZHVjdHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVfY3JlYXRlOiByZUNyZWF0ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2YubG9hZGluZygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXMuaW1nU3RvcmFnZSA9IHJlcy5kYXRhLmltZ19zdG9yYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5Xb3JrQm9vay5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvbHVtbnMpIEF0dHJpYnV0ZXMuc2V0Q29sdW1ucyhyZXMuZGF0YS5jb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5pZE1hcHBpbmcpIEF0dHJpYnV0ZXMuaWRNYXBwaW5nID0gcmVzLmRhdGEuaWRNYXBwaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmlkTWFwcGluZ0ZsaXApIEF0dHJpYnV0ZXMuaWRNYXBwaW5nRmxpcCA9IHJlcy5kYXRhLmlkTWFwcGluZ0ZsaXA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMud29ya0Jvb2tJbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLldvcmtCb29rLm9wdGlvbnMuZGF0YSA9IHJlcy5kYXRhLnByb2R1Y3RzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5Xb3JrQm9vay5zZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnBhZ2luYXRpb24ocmVzLmRhdGEubWF4X251bV9wYWdlcywgcGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLldvcmtCb29rLm9yZGVyQWZ0ZXJMb2FkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5kYXRhLnByb2R1Y3RzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Yubm90aWNlKF9mLnRleHQoJ05vIGl0ZW0gd2FzIGZvdW5kJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzLnN0YXR1c1RleHQgKyByZXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfZi5yZW1vdmVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFnaW5hdGlvbihtYXhQYWdlLCBjdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnViYXIuZmluZCgnLnZpLXdiZS1wYWdpbmF0aW9uJykuaHRtbChfZi5wYWdpbmF0aW9uKG1heFBhZ2UsIGN1cnJlbnRQYWdlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFuZ2VQYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCgkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1wYWdlJykpO1xyXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdhY3RpdmUnKSB8fCAkKGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2Rpc2FibGVkJykgfHwgIXBhZ2UpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJvZHVjdHMocGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFuZ2VQYWdlQnlJbnB1dChlKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gcGFyc2VJbnQoJChlLnRhcmdldCkudmFsKCkpO1xyXG4gICAgICAgICAgICBsZXQgbWF4ID0gcGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignbWF4JykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2UgPD0gbWF4ICYmIHBhZ2UgPiAwKSB0aGlzLmxvYWRQcm9kdWN0cyhwYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbG9hZEN1cnJlbnRQYWdlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcm9kdWN0cyh0aGlzLmdldEN1cnJlbnRQYWdlKCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRDdXJyZW50UGFnZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudWJhci5maW5kKCcudmktd2JlLXBhZ2luYXRpb24gLml0ZW0uYWN0aXZlJykuZGF0YSgncGFnZScpIHx8IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZnRlckFkZEZpbHRlcihldiwgZGF0YSkge1xyXG4gICAgICAgICAgICBBdHRyaWJ1dGVzLmltZ1N0b3JhZ2UgPSBkYXRhLmltZ19zdG9yYWdlO1xyXG4gICAgICAgICAgICB0aGlzLldvcmtCb29rLm9wdGlvbnMuZGF0YSA9IGRhdGEucHJvZHVjdHM7XHJcbiAgICAgICAgICAgIHRoaXMuV29ya0Jvb2suc2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24oZGF0YS5tYXhfbnVtX3BhZ2VzLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5Xb3JrQm9vay5vcmRlckFmdGVyTG9hZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXIuZmluZCgnLnZpLXdiZS1jbG9zZS1zaWRlYmFyJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLnByb2R1Y3RzLmxlbmd0aCkgX2Yubm90aWNlKF9mLnRleHQoJ05vIGl0ZW0gd2FzIGZvdW5kJykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZnRlclNhdmVTZXR0aW5ncyhldiwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5maWVsZHNDaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFByb2R1Y3RzKHRoaXMuZ2V0Q3VycmVudFBhZ2UoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGE/LmZpZWxkc1JlZnJlc2gpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51YmFyLmZpbmQoJy52aS13YmUtZ2V0LXByb2R1Y3QnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGViYXIuZmluZCgnLnZpLXdiZS1jbG9zZS1zaWRlYmFyJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2F2ZVJldmlzaW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoJHRoaXMucmV2aXNpb24pLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQYWdlID0gJHRoaXMuc2lkZWJhci5maW5kKCcudmktd2JlLXBhZ2luYXRpb24gYS5pdGVtLmFjdGl2ZScpLmRhdGEoJ3BhZ2UnKSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgX2YuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge3N1Yl9hY3Rpb246ICdhdXRvX3NhdmVfcmV2aXNpb24nLCBkYXRhOiAkdGhpcy5yZXZpc2lvbiwgcGFnZTogY3VycmVudFBhZ2UgfHwgMX0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEudXBkYXRlUGFnZSkgJCgnI3ZpLXdiZS1oaXN0b3J5LXBvaW50cy1saXN0IHRib2R5JykuaHRtbChyZXMuZGF0YS51cGRhdGVQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJldmlzaW9uID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5zaWRlYmFyLmZpbmQoJy52aS13YmUtcGFnaW5hdGlvbicpLmh0bWwoX2YucGFnaW5hdGlvbihyZXMuZGF0YS5wYWdlcywgY3VycmVudFBhZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5ldyBCdWxrRWRpdCgpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9