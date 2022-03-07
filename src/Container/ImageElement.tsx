import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Image1, ListImage } from '../utils/interface';
import useOutsideAlerter from './useOutsideAlerter';
function ImageElement(props:Image1){
    var {image,index,func1,func2}=props;
    console.log(func1);
    const a=image.name.indexOf('.');
    if(a!==-1) 
    {   
        image.name=image.name.slice(0,a);
    }   
    const [valueInput,setValueInput]=useState(image.name);
    const [show,setShow]=useState(false);
    const wrapperRef=useRef(null);
  
    useOutsideAlerter(wrapperRef,setShow);
    useEffect(()=>{
        if(show===false)
        {
            func2(index,valueInput);
        }
    },[show]);
    console.log('rerender component');
    
    function editName(e: MouseEvent<HTMLButtonElement>)
    {
        if(show===false)
            setShow(true);
        else
            setShow(false);
    }
    function editName1(e: MouseEvent<HTMLImageElement>)
    {
        if(show===false)
            setShow(true);
        else
            setShow(false);
    }
    function changeName(e:ChangeEvent<HTMLInputElement>):void{
        setValueInput(e.currentTarget.value);
    }
  
    function keyPress(e:KeyboardEvent<HTMLInputElement>){
        if(e.key==="Enter")
        {
            setShow(false);
        }

    }
  
   
    
    return(
        <div  className="col l-4 m-4 c-6">
        <div className="home-product-item">
            <div className="home-product-item__img">
                <img className="list-image" src={image.src} alt="" />
                <div className="home-product-item__icon">
                    <img src="/edit.png" alt="" className="icon-edit" onClick={(e)=>editName1(e)} />
                    <img src="/delete.png" alt="" className="icon-delete" onClick={(e)=>func1(index)}/> 
                    <a href={image.src} className="download" download={`${image.name}.jpg`}>
                        <img src="/download.png" alt="" className="icon-download" />
                    </a>
                </div>
            </div>
            {!show &&<h4>{valueInput}</h4>}
            {show&&<input ref={wrapperRef} type="text" value={valueInput} onKeyPress={(e)=>keyPress(e)} onChange={(e)=>changeName(e)}/>}
            {/* <div className="tool">
              <button className="edit" onClick={(e)=>editName(e)}>Edit</button>
              <button className="delete" onClick={(e)=>func1(index)}>Delete</button>
              <a href={image.src} className="download" download={`${image.name}.jpg`}>Download</a>
          
            </div> */}
        </div>
    </div>
    )
}
export default React.memo(ImageElement);