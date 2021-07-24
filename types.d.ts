export interface XtalFigParallelogramProps extends HTMLElement{ 
    width: number, 
    strokeWidth:number, 
    height:number, 
    slant:number,
    innerX:number,
    innerY:number,
    innerWidth:number,
    innerHeight:number,
    path:string,
    self: XtalFigParallelogramProps,
}

export interface XtalFigDiamondProps extends HTMLElement{
    width: number,
    height: number,
    path:string,
    strokeWidth:number,
    innerWidth:number,
    innerHeight:number,
    innerX: number,
    innerY: number,
    self: XtalFigDiamondProps,
}