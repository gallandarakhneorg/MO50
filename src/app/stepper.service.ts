import { Injectable } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  dateRegex = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
  ISBNRegex= /^\d{1}-\d{3}-\d{5}-\d{1}$/;
  ISSNRegex= /^\d{4}-\d{4}$/;
  authorsRegex = /^[A-Za-z\s]+$/;

  step1Names = {
    stepName: "Publication Type",
    selectArray: [{
      "selectName": "Publication type",
      "values": ["Chapters in national scientific books [COS]", "HDR theses [TH]"],
      "errorMessage": "Please choose a publication type",
      "required": true
    }
    ],
    textInputArray: [
    ],
    fileInputArray: []
  }
  step2Names = {
    stepName: "General information",
    selectArray: [
    ],
    textInputArray: [
      {
        "name": "Title",
        "placeHolder": "Your awesome publication title",
        "errorMessage": "Please write a publication title",
        "required": true
      },
      {
        "name": "Authors",
        "placeHolder": "John Smith",
        "errorMessage": "Invalid list of authors",
        "required": true
      },
      {
        "name": "Publication date",
        "placeHolder": "jj/mm/aa",
        "errorMessage": "Please follow this template : jj/mm/aa",
        "required": true
      }
    ],
    fileInputArray: []
  }
  chaptersInternationalBookStepNames = {
    stepName: "Specific information",
    selectArray: [
    ],
    textInputArray: [
      {
        "name": "Institution",
        "placeHolder": "Name of the publishing institution",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Address",
        "placeHolder": "Postal address, city or country",
        "errorMessage": "Invalid address",
        "required": false
      },
      {
        "name": "ISBN number",
        "placeHolder": "0-000-00000-0",
        "errorMessage": "Invalid number",
        "required": false
      },
      {
        "name": "ISSN number",
        "placeHolder": "0000-0000",
        "errorMessage": "Invalid number",
        "required": false
      }
    ],
    fileInputArray: []
  }
  HDRThesesStepNames = {
    stepName: "Specific information",
    selectArray: [
    ],
    textInputArray: [
      {
        "name": "TA MERE LA PUTE",
        "placeHolder": "Name of the publishing institution",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Address",
        "placeHolder": "Postal address, city or country",
        "errorMessage": "Invalid address",
        "required": false
      },
      {
        "name": "ISBN number",
        "placeHolder": "0-000-00000-0",
        "errorMessage": "Invalid number",
        "required": false
      },
      {
        "name": "ISSN number",
        "placeHolder": "0000-0000",
        "errorMessage": "Invalid number",
        "required": false
      }
    ],
    fileInputArray: []
  }
  step4Names = {
    stepName: "Details",
    selectArray: [
    ],
    textInputArray: [
      {
        "name": "Institution",
        "placeHolder": "Name of the publishing institution",
        "errorMessage": "",
        "required": false
      }
    ],
    fileInputArray: []
  }
  step5Names = {
    stepName: "Upload",
    selectArray: [
    ],
    textInputArray: [],
    fileInputArray: [
      {
        "name": "PDF Copy of the publication",
        "placeHolder": "Select file",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Award certificate for the publication",
        "placeHolder": "Select file",
        "errorMessage": "",
        "required": false
      }
    ]
  }

  stepperNames = [
    this.step1Names,
    this.step2Names,
    this.chaptersInternationalBookStepNames,
    this.step4Names,
    this.step5Names
  ]

  step1FormGroup = new FormGroup({
    selectArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('', Validators.required)
      }),
    ]),
    textInputArray: new FormArray([]),
  });
  step2FormGroup = new FormGroup({
    selectArray: new FormArray([]),
    textInputArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('', Validators.required)
      }),
      new FormGroup({
        formControl: new FormControl('', [Validators.required, Validators.pattern(this.authorsRegex)])
      }),
      new FormGroup({
        formControl: new FormControl('', [Validators.required, Validators.pattern(this.dateRegex)])
      }),
    ]),
  });
  chaptersInternationalBookFormGroup = new FormGroup({
    selectArray: new FormArray([]),
    textInputArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('', Validators.pattern(this.ISBNRegex))
      }),
      new FormGroup({
        formControl: new FormControl('', Validators.pattern(this.ISSNRegex))
      }),
    ]),
    fileInputArray: new FormArray([])
  });
  HDRThesesFormGroup = new FormGroup({
    selectArray: new FormArray([]),
    textInputArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('', Validators.pattern(this.ISBNRegex))
      }),
      new FormGroup({
        formControl: new FormControl('', Validators.pattern(this.ISSNRegex))
      }),
    ]),
    fileInputArray: new FormArray([])
  });
  step4FormGroup = new FormGroup({
    selectArray: new FormArray([]),
    textInputArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('')
      })
    ]),
  });
  step5FormGroup = new FormGroup({
    selectArray: new FormArray([]),
    textInputArray: new FormArray([]),
    fileInputArray: new FormArray([
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      })
    ]),
  });

  stepperFormGroup = new FormGroup({
    steps: new FormArray([
      this.step1FormGroup,
      this.step2FormGroup,
      this.chaptersInternationalBookFormGroup,
      this.step4FormGroup,
      this.step5FormGroup
    ])
  });
  constructor() { }
}
