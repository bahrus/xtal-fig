export interface XtalFigParallelogramProps extends HTMLElement{
    topLeft: number, 
    topRight: number, 
    bottomRight: number, 
    width: number, 
    strokeWidth:number, 
    height:number, 
    slant:number,
    heightMinusStroke:number,
    innerX:number,
    innerY:number,
    innerWidth:number,
    innerHeight:number,
    fillPath:string,
    borderPath:string,
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