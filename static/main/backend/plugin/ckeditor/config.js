/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        '/',
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];
    config.filebrowserImageUploadUrl = '/adjuncts/ckeditor/file_upload';
    config.filebrowserUploadUrl = '/adjuncts/ckeditor/file_upload';
    config.filebrowserFlashUploadUrl = '/adjuncts/ckeditor/file_upload';
    config.cloudServices_tokenUrl =  '';
    // config.cloudServices_uploadUrl = '/adjuncts/ckeditor/file_upload';
    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeButtons = 'image:advanced,link:advanced,Save,NewPage,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Replace,Find,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,Language,Flash,Table,HorizontalRule,Smiley,PageBreak,Iframe,EasyImage,About';

};