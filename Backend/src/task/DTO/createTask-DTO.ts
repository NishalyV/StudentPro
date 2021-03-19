import{IsNotEmpty} from "class-validator";

export class CreateTaskDTO{
    @IsNotEmpty()
    studentName:string;

    @IsNotEmpty()
    studentSubject:string;
    
    @IsNotEmpty()
    studentMark:number;
}