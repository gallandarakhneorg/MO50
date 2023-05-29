import { Component } from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {StepperService} from "../stepper.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {

  stepperNames : any;

  stepperFormGroup : any;
  constructor(private stepperService: StepperService) {
    this.stepperFormGroup = stepperService.stepperFormGroup;
    this.stepperNames = stepperService.stepperNames;
  }

  get steps(): FormArray {
    return this.stepperFormGroup.get('steps') as FormArray;
  }

  castToFormGroup(formGroup: any){
    return formGroup as FormGroup;
  }

  getSelectArray(formGroup: any) {
    let array = formGroup.get('selectArray')
    return array as FormArray;
  }

  getTextInputArray(formGroup: any) {
    let array = formGroup.get('textInputArray')
    return array as FormArray;
  }

  getFileInputArray(formGroup: any) {
    let array = formGroup.get('fileInputArray')
    return array as FormArray;
  }
  onFileSelected(formControl: any) {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      const file = inputNode.files[0];

      reader.onload = (e: any) => {
        // This is the content of the file, to send to the back end
        let srcResult = e.target.result;
        formControl.setValue(file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  getInput(input: string)
  {
    if(input == ""){
      return "Empty";
    }
    return input;
  }

  updateSpecificInformationForm(publicationTypeSelected: string, selectName: string){
    if(selectName == "Publication type"){
      switch(publicationTypeSelected){
        case "Chapters in national scientific books [COS]":
          this.updateThirdStep(this.stepperService.chaptersInternationalBookFormGroup, this.stepperService.chaptersInternationalBookStepNames);
          break;
        case "HDR theses [TH]":
          this.updateThirdStep(this.stepperService.HDRThesesFormGroup, this.stepperService.HDRThesesStepNames);
          break;
      }
    }
  }

  updateThirdStep(newFormGroup: any, newStepNames: any){
    this.stepperFormGroup.controls.steps.controls.pop();
    this.stepperFormGroup.controls.steps.controls.pop();
    this.stepperFormGroup.controls.steps.controls.pop();
    this.stepperFormGroup.controls.steps.controls.push(newFormGroup);
    this.stepperFormGroup.controls.steps.controls.push(this.stepperService.step4FormGroup);
    this.stepperFormGroup.controls.steps.controls.push(this.stepperService.step5FormGroup);

    this.stepperNames[2] = newStepNames;
  }

}
