import {XtalPattern} from 'xtal-element/types.d.js';
export interface XtalFigParallelogramProps extends XtalPattern{ 
    width: number, 
    strokeWidth:number, 
    height:number, 
    slant:number,
    innerX:number,
    innerY:number,
    innerWidth:number,
    innerHeight:number,
    hOffset:number,
    //path:string,
    //self: XtalFigParallelogramProps,
}

export interface XtalFigDiamondProps extends XtalPattern{
    width: number,
    height: number,
    //path:string,
    strokeWidth:number,
    innerWidth:number,
    innerHeight:number,
    innerX: number,
    innerY: number,
    //self: XtalFigDiamondProps,
}