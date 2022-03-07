import React, { MouseEventHandler, useEffect, useRef } from 'react';
import {useState} from 'react';
import './App.css';
import Container from './Container/Container';
import { ListImage } from './utils/interface';

function App() {
  const [src,setSrc]=useState('#');
  const [name,setName]=useState('');
  const [linkImage,setLinkImage]=useState('');
  const inputImage=useRef<HTMLInputElement>(null);
  const image=useRef<HTMLImageElement>(null);
  const childFunc=useRef(()=>{});
  const [listImage, setListImage] = useState<ListImage[]>([]) 
  
  
  
  
  useEffect(()=>{
      const a:string|null=localStorage.getItem("fileBase64");
     

      if(a!=null)
      {   
        image.current!.src=a;
        image.current!.style.display="block";
      } 
      const listData=localStorage.getItem("list-Image");
     
      if(listData!=null)
      {
         var listStringData:ListImage[]=JSON.parse(listData);
         setListImage(listStringData);
      }
      
      return()=>{
        localStorage.clear();
      }
   
    },[]);
    useEffect(()=>{
        localStorage.setItem('list-Image',JSON.stringify(listImage));

    },[listImage])
 
  const getBase64 = (file:File) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }
  const Change = async (e:React.ChangeEvent<HTMLInputElement>)=>{

    const files=e.currentTarget.files;
    
 
    if(files!=null)
    {
        
        if(files.length===0)
          return;
        const mimeType = files[0].type;
        
      
        if (mimeType.match(/image\/*/) == null) {
            
            return;
        }
        await new Promise((resolve, reject) => {
          
          var reader= new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload= function(){
            if(typeof(reader.result)==='string')
            {
                 setSrc(reader.result);
                 const temp: ListImage = {
                   name: files[0].name,
                    src: reader.result
                 }
                 setListImage((prev)=> {
                   const temp2 = [...prev];
                   temp2.push(temp);
                   console.log(temp2);
                   return temp2;
                 });
                //  console.log(reader.result);
                //  setLinkImage(reader.result);
                //  setName(files[0].name);
                 resolve("");
            }
           
             
          }
        })
      
    
        image.current!.style.display="block";
        
        getBase64(files[0]).then(base64 => {
          localStorage["fileBase64"] = base64;
        });
        // if(childFunc!==null)      
        // {
        //   console.log(name, linkImage)
        //       childFunc!.current();
        // }
        // e.currentTarget.value="";
        if(inputImage.current?.value) 
        {
          inputImage.current.value= "";
          console.log(inputImage.current?.value);
        }
       
        
    }
  };
  const changeState = ()=>{
    
    if(image.current!=null)
    {
     
      if(image.current!.style.transform==='scale(2)')
      {
        image.current!.style.transform='scale(1)';
        image.current!.style.transition='transform 0.25s ease';
     
      }
      else
      {
        
        image.current!.style.transform='scale(2)';
        image.current!.style.transition='transform 0.25s ease';
     
      } 
  }
}
const handleDelete=()=>{
        setSrc("#");
        image.current!.style.display="none";
}
let props={
  name :name,
  link:linkImage,
  childFunc:childFunc,
  listImage: listImage,
  setListImage: setListImage,
}
  return (
    <div className="App">
        <div className="input-file-row-1">
            <div className="upload-file-container">
                <img ref={image} id="preview_image" onClick={(e) => changeState()} src={src} alt=""/>

                <div className="upload-file-container-text">
                    <div className = 'one_opacity_0'>
                        <input ref={inputImage} type="file" id="patient_pic"  onChange={Change}  multiple accept="image/*"/>
                    </div>
                    <span>
                            Add photo
                    </span>

                    <div className = 'one_opacity_1'>
                        <button onClick={()=>handleDelete()}>Delete image</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <Container {...props}/>
       
    </div>
  );
}

export default App;
