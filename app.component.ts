import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './shared/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  sectionForm!: FormGroup;
allData:any[]=[]
isSubmitted:boolean=false
  constructor(private frombuild:FormBuilder,private http:HttpService){}
    

  ngOnInit(): void {
    this.sectionForm = this.frombuild.group({
      header:[''],
      details:['']
    })
    this.getAllData()
    this.http.refresh.subscribe(()=>{
      this.getAllData()
    })
  }
  submitForm(val:any){
    console.log(this.sectionForm?.value)
    this.isSubmitted = true
    this.http.postProduct(this.sectionForm?.value)
    this.getAllData()
    this.sectionForm.reset()
  }
  getAllData(){
    this.http.getProduct().subscribe((res)=>{
      console.log(res)
      this.allData =res
      console.log(this.allData)
    })
  }
}

