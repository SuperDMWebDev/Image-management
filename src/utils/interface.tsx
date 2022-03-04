import { MutableRefObject } from "react";

export interface PropsContainer {
    name: string;
    link: string;
    childFunc: MutableRefObject<() => void>;
    listImage: ListImage[];
    setListImage: Function;
}

export interface ListImage {
    src: string;
    name: string;
}
export interface Image1{
    image: ListImage;
    func1:Function;
    index:number;
    func2:Function;
}
