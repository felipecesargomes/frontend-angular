import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {
  @Input() cardHeaderClasses?: string;
  @Input() cardBodyClasses?: string;
  @Input() headerText: string = "";
  @Input() iconClass: string = ""; 

  
}
