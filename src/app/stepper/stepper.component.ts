import { Component } from '@angular/core';
import { FormArray, FormGroup } from "@angular/forms";
import { StepperService } from "../stepper.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {

  publicationTypeSelected: string="";

  // Array containing the stepper names
  stepperNames: any;

  // FormGroup for the stepper
  stepperFormGroup: any;

  constructor(private stepperService: StepperService) {
    // Initialize the stepperFormGroup and stepperNames using the service
    this.stepperFormGroup = stepperService.stepperFormGroup;
    this.stepperNames = stepperService.stepperNames;
  }

  // Getter for accessing the steps FormArray
  get steps(): FormArray {
    return this.stepperFormGroup.get('steps') as FormArray;
  }

  // Utility function to cast a formGroup to FormGroup type
  castToFormGroup(formGroup: any) {
    return formGroup as FormGroup;
  }

  // Utility function to get the selectArray from a formGroup
  getSelectArray(formGroup: any) {
    let array = formGroup.get('selectArray');
    return array as FormArray;
  }

  // Utility function to get the textInputArray from a formGroup
  getTextInputArray(formGroup: any) {
    let array = formGroup.get('textInputArray');
    return array as FormArray;
  }

  // Utility function to get the fileInputArray from a formGroup
  getFileInputArray(formGroup: any) {
    let array = formGroup.get('fileInputArray');
    return array as FormArray;
  }

  // Event handler for file selection
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

  // Utility function to get the input value or "Empty" if it's empty
  getInput(input: string) {
    if (input == "") {
      return "Empty";
    }
    return input;
  }

  // Update the specific information form based on the selected publication type
  updateSpecificInformationForm(publicationTypeSelected: string, selectName: string) {
    if (selectName == "Publication type") {
      switch (publicationTypeSelected) {
        case "Chapters in national scientific books [COS]":
          this.updateThirdStep(this.stepperService.chaptersInternationalBookStepNames);
          break;
        case "HDR theses [TH]":
          this.updateThirdStep(this.stepperService.HDRThesesStepNames);
          break;
      }
    }
  }

  // Update the third step of the stepper with a new formGroup and step names
  updateThirdStep(newStepNames: any) {

    // Remove the existing controls from the third step
    this.stepperFormGroup.controls.steps.controls.pop();
    this.stepperFormGroup.controls.steps.controls.pop();
    this.stepperFormGroup.controls.steps.controls.pop();

    // Add the new formGroup and other formGroups back to the third step
    this.stepperFormGroup.controls.steps.controls.push(newFormGroup);
    this.stepperFormGroup.controls.steps.controls.push(this.stepperService.step4FormGroup);
    this.stepperFormGroup.controls.steps.controls.push(this.stepperService.step5FormGroup);

    // Update the step names for the third step
    this.stepperNames[2] = newStepNames;
  }
}
