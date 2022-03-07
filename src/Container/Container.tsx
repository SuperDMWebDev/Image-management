import React, { useEffect, useState,MouseEvent } from 'react';
import { ListImage, PropsContainer } from '../utils/interface';
import ImageElement from './ImageElement';
function Container(props:PropsContainer){
    console.log(ImageElement);
    const {listImage, setListImage} = props;
    
    // const [valueInput,setValueInput]=useState(listImage.name);
  
    useEffect(()=>{
        console.log(listImage);
    },[listImage]);
    function deleteImage(index:number){
        setListImage((listImage:ListImage[])=>{
            const newList=[...listImage];
            newList.splice(index,1);
            return newList;
        })
    }
    function changeImage(index:number,name:string){
        
        setListImage((listImage:ListImage[])=>{
            const newList=[...listImage];
            newList[index].name=name;
            console.log(newList);
            return newList;
        })
    }
   
    return(
        <div className="app__container">
            <div className="grid wide">
                <div className="row">

                    {listImage.map((image,index)=>(
                            <ImageElement  key={index} image={image} index={index} func1={deleteImage} func2={changeImage}/>
                    ))}
                        
                    
                   
                </div>

            </div>
        </div>
    )
}
export default Container;