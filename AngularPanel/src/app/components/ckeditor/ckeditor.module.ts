import { Component, Input, OnInit, ViewChild, ElementRef, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare const CKEDITOR;
@Component({
    selector: 'app-ckeditor',
    template: `
        <textarea #editor>
            {{value}}
        </textarea>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CkEditorComponent),
        multi: true
    }]
})
export class CkEditorComponent implements OnInit, ControlValueAccessor {
    @ViewChild('editor') editor: ElementRef;
    wait = false;

    instance: any;

    config = {
        uiColor: '#F0F3F4',
        height: '100%',

    };

    private _value = '';

    get value(): any { return this._value; }
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            v !== undefined && this.writeValue(this._value); //ckeditor için servisden gelen veriyi input dan alarak yüklüyoruz.
            this.onChange(v);
        }
    }

    constructor(private zone: NgZone) { }

    ngOnInit() {
        this.instance = CKEDITOR.replace(this.editor.nativeElement, this.config);

        this.instance.setData(this._value);

        // CKEditor change event
        this.instance.on('change', () => {
            let value = this.instance.getData();
            this.updateValue(value);
        });
    }

    /**
    * Value update process
    */
    updateValue(value: any) {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
        });
    }

    /**
    * Implements ControlValueAccessor
    */
    writeValue(value: any) {
        console.log('writeValue');
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }
    onChange(_: any) { }
    onTouched() { }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
}
