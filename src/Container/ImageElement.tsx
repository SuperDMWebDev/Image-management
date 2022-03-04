import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Image1, ListImage } from '../utils/interface';
import useOutsideAlerter from './useOutsideAlerter';
function ImageElement(props:Image1){
    var {image,index,func1,func2}=props;
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
    
    function editName(e: MouseEvent<HTMLButtonElement>)
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
        <div  className="col l-2 m-2 c-2">
        <div className="home-product-item">
            <div className="home-product-item__img">
                <img className="list-image" src={image.src} alt="" />
            </div>
            {!show &&<h4>{valueInput}</h4>}
            {show&&<input ref={wrapperRef} type="text" value={valueInput} onKeyPress={(e)=>keyPress(e)} onChange={(e)=>changeName(e)}/>}
            <div className="tool">
              <button className="edit" onClick={(e)=>editName(e)}>Edit</button>
              <button className="delete" onClick={(e)=>func1(index)}>Delete</button>
            </div>
        </div>
    </div>
    )
}
export default React.memo(ImageElement);