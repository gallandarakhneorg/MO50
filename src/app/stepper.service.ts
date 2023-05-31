import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  // Regular expressions for validation
  dateRegex = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
  ISBNRegex = /^\d{1}-\d{3}-\d{5}-\d{1}$/;
  ISSNRegex = /^\d{4}-\d{4}$/;
  authorsRegex = /^[A-Za-z\s]+$/;
  doiRegex = /^10\.\d{4}\/\w{4}\/\w{5}$/;
  numberRegex = /^-?\d+$/;
  pageRegex = /^(?:[1-9]|[1-9][0-9])$/;



  // Step names and form field configurations
  step1Names = {
    stepName: "Publication Type",
    selectArray: [{
      "selectName": "Publication type",
      "values": ["Chapters in national scientific books [COS]", "HDR theses [TH]"],
      "errorMessage": "Please choose a publication type",
      "required": true
    }],
    textInputArray: [],
    fileInputArray: []
  }
  step2Names = {
    stepName: "General information",
    selectArray: [],
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
        "pattern": "",
        "errorMessage": "Invalid list of authors",
        "required": true
      },
      {
        "name": "Publication date",
        "pattern": "",
        "placeHolder": "jj/mm/aa",
        "errorMessage": "Please follow this template : jj/mm/aa",
        "required": true
      }
    ],
    fileInputArray: []
  }
  chaptersInternationalBookStepNames = {
    stepName: "Specific information",
    selectArray: [],
    textInputArray: [
      {
        "name": "Title of the book",
        "placeHolder": "Title of the book in which this publication is included",
        "errorMessage": "",
        "required": true
      },
      {
        "name": "Chapter number",
        "placeHolder": "Number or name of the chapter in the book",
        "errorMessage": "",
        "required": true
      },
      {
        "name": "Edition",
        "placeHolder": "Name or number of the chapter in the book",
        "errorMessage": "",
        "required": false
      },

      {
        "name": "Series or collection",
        "placeHolder": "Name of the series or collection",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Volume",
        "placeHolder": "Volume associated to the publication",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Number",
        "placeHolder": "Number associated to the publication",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Pages",
        "placeHolder": "1-99",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Editors",
        "placeHolder": "List of the editors",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Publisher",
        "placeHolder": "Name of the publisher",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Adress",
        "placeHolder": "Postal address, city or country",
        "errorMessage": "Invalid adress",
        "required": false
      },
      {
        "name": "ISBN Number",
        "placeHolder": "0-000-00000-0",
        "errorMessage": "Invalid number",
        "required": false
      },
      {
        "name": "ISSN Number",
        "placeHolder": "0000-0000",
        "errorMessage": "Invalid number",
        "required": false
      }
    ],
    fileInputArray: []
  }
  HDRThesesStepNames = {
    stepName: "Specific information",
    selectArray: [],
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
  step4Names = {
    stepName: "Details",
    selectArray: [],
    textInputArray: [
      {
        "name": "Digital object identifier (DOI)",
        "placeHolder": "10.9999/xxxx/xxxxx",
        "errorMessage": "Invalid DOI format",
        "required": false
      },
      {
        "name": "HAL number",
        "placeHolder": "9999999",
        "errorMessage": "Invalid HAL number",
        "required": false
      },
      {
        "name": "Abstract Text",
        "placeHolder": "Summary of the publication",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Keywords",
        "placeHolder": "Science , AI",
        "errorMessage": "Invalid keywords list",
        "required": false
      },
      {
        "name": "Scientific axis that are associated to this publication ",
        "placeHolder": "Scientif axis example",
        "errorMessage": "",
        "required": false
      },
      {
        "name": "Website related to the publication",
        "placeHolder": "https://example.org",
        "errorMessage": "Invalid URL ",
        "required": false
      },
      {
        "name": "Internet address of the DBLP page",
        "placeHolder": "https://example.org",
        "errorMessage": "Invalid URL",
        "required": false
      },
      {
        "name": "Address of a video on internet",
        "placeHolder": "https://example.org",
        "errorMessage": "Invalid URL",
        "required": false
      },
    ],
    fileInputArray: []
  }
  step5Names = {
    stepName: "Upload",
    selectArray: [],
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

  // Array of step names and form field configurations
  stepperNames = [
    this.step1Names,
    this.step2Names,
    this.chaptersInternationalBookStepNames,
    this.step4Names,
    this.step5Names
  ]

  // FormGroups for each step
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
        formControl: new FormControl('',[Validators.required])
      }),
      new FormGroup({
        formControl: new FormControl('',[Validators.required])
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('',Validators.pattern(this.numberRegex))
      }),
      new FormGroup({
        formControl: new FormControl('',Validators.pattern(this.pageRegex))
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('', [Validators.pattern(this.ISBNRegex)])
      }),
      new FormGroup({
        formControl: new FormControl('', [Validators.pattern(this.ISSNRegex)])
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
        formControl: new FormControl('',Validators.pattern(this.doiRegex))
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
      new FormGroup({
        formControl: new FormControl('')
      }),
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

  // Overall FormGroup for the stepper
  stepperFormGroup = new FormGroup({
    steps: new FormArray([
      this.step1FormGroup,
      this.step2FormGroup,
      this.chaptersInternationalBookFormGroup,
      this.step4FormGroup,
      this.step5FormGroup
    ])
  });

  constructor() {
  }
}
