import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Application, Loan } from '../../model/application.model';
import { MasterService } from '../../service/master.service';

// Define ApiResponseModel if it's not defined elsewhere
interface ApiResponseModel {
  result: boolean;
  message: string;
}

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent {

  application: Application = new Application();
  loan: Loan = new Loan();

  masterSrv = inject(MasterService);

  // Add new loan to the Loans array
  addLoan() {
    const newObj = { ...this.loan }; // Clone the loan object
    this.application.Loans.unshift(newObj); // Add new loan to the start of the array
    this.loan = new Loan(); // Reset loan object for new entries
  }

  // Submit loan application
  onSubmit() {
    this.masterSrv.addNewApplication(this.application).subscribe(
      (result: ApiResponseModel) => {
        if (result.result) {
          alert('Loan Application Success');
        } else {
          alert(result.message);
        }
      },
      error => {
        console.error('Error during loan application submission:', error); 
        alert(`Error: ${error.message || 'An unknown error occurred.'}`);
      }
    );
  }
}
