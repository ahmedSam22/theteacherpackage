import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators ,FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-behavior-setting',
  templateUrl: './behavior-setting.component.html',
  styleUrls: ['./behavior-setting.component.scss']
})
export class BehaviorSettingComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  imgpath:any;
  base64Image:any ;
  file:File[]=[];
  showImg=true ;
  images : string[] = [];
  imagePath :string[]= [];
  @ViewChild("image") image: any;
  @ViewChild("student") s : any;
  student!:ElementRef;
  classname='active' ;
  selected:any;
  showStudentInfo:boolean=true ;
  showGardianInfo:boolean=false ;
  class_id:any;

  allBehaviors:any=[];
  positives:any=[];
  negatives:any=[];
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef ) {
  }
  get getPositives():FormArray {
    return this.form.get("positive") as FormArray
  }
  addPositiveBehavior(){
    this.getPositives.push(this.formbuilder.control(""))
    "tamam"
  }
  
  get getNegatives():FormArray {
    return this.form.get("negative") as FormArray
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      positive : this.formbuilder.array([
        // this.formbuilder.control("")
      ]),
      negative : this.formbuilder.array([
        // this.formbuilder.control("")
      ]),
    });
 
    this.select('positive');
    this.class_id = localStorage.getItem('class_id');


    // for(let i = 0; i < this.data.courses.length;i++){
    //   this.getPositives.push( this.formbuilder.control(this.data.courses[i].name)  )
    // }

    let obj= {id:0 , name:'name'} 
    this.teacherservice.getAllBehaviors().subscribe((res:any)=>{
      this.allBehaviors=res['data'];
      console.log("setttttttttttting", this.allBehaviors)
      for(let i=0; i<=this.allBehaviors.length ; i++){
        if( this.allBehaviors[i].type==1){
          obj.id=this.allBehaviors[i].id;
          obj.name= this.allBehaviors[i].name;
            this.positives.push({id:obj.id,name:obj.name})
            this.getPositives.push( this.formbuilder.control(obj.name))
             console.log("pppppppppppp",this.positives)
        }
        else {
          obj.id=this.allBehaviors[i].id;
          obj.name= this.allBehaviors[i].name;
          
          this.negatives.push({id:obj.id,name:obj.name})
          this.getNegatives.push( this.formbuilder.control(obj.name))
          console.log("nnnnnnnnnn", this.negatives)
        }
      }
    })
  }

  
 
// addNegativeBehavior(){
//   this.getNegatives.push(this.formbuilder.control(""))
// }

  back(){
    this.router.navigate(['../home/class-student/class-behavior']);
  }
 
   filter(number:any) {
    if (number==0){
      this.showStudentInfo=true ;  
      this.showGardianInfo=false ; 
    }
    else {
      this.showStudentInfo=false ;  
      this.showGardianInfo=true ;
    }
  }
  select(item:any) {
    this.selected = item;
    console.log("selllllected",this.selected)
     };
  isActive(item:any) {
    return this.selected === item;
    }
    get f() { 
    
    return this.form.controls
    }
    deleteBahvior(id:any) {
      console.log("delete id : " , id)
    }
  onSubmit() {
  //   let form = {
  //     ...this.form.value ,
  //     class_id:this.class_id,
  //   }
   
  // this.submitted=true;
  // if(this.form.invalid){return}
  //     console.log("Form",form)
  //     this.teacherservice.addStudentToClass(form).subscribe((res:any)=>{

  //       if(res.status==true){
  //         console.log("success add student", res) ;
  //         Swal.fire({
  //           title: 'Success',
  //           text: res.message,
  //           icon: 'success',
  //           confirmButtonColor: '#4AB673',
  //         }) 
  //       }
  //    else {
  //     console.log("fail add student", res) ;
  //     Swal.fire({
  //       title: 'Fail',
  //       text: res.errors[0],
  //       icon: 'error',
  //       confirmButtonColor: '#4AB673',
  //     }) 
  //    }
  //     }) 
     
  
  }
}
