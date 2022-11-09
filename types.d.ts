import { PEAUnionSettings } from 'trans-render/lib/types';
import { ActionOnEventConfigs, DynamicTransform} from 'trans-render/froop/types';

export interface XtalFigParallelogramProps{
    /**
     * @prop {number} [width=800] - Number of pixels wide the figure should be.
     * @attr {number} [width=800] - Number of pixels wide the figure should be.
    */ 
    width: number, 
    /**
     * @prop {number} [height=300] - Number of pixels high the figure should be.
     * @attr {number} [heigh=300] - Number of pixels high the figure should be.
     */    
    height:number, 
    /**
     * @prop {number} [strokeWidth=5] - Width of border of figure.
     * @attr {number} [stroke-width=5] - Width of border of figure.
     */
    strokeWidth:number,
    /**
     * @prop {number} [slant=30] - Number of degrees parallelogram should slant.
     * @attr {number} [slant=30] - Number of degrees parallelogram should slant.
     */
    slant:number,
    /**
     * @prop {number} [innerX=300] - Number of pixels left edge of inner content should be set to.
     * @attr {number} [inner-x=300] - Number of pixels left edge of inner content should be set to.
     */
    innerX:number,
    /**
     * @prop {number} [innerY=100] - Number of pixels top edge of inner content should be set to.
     * @attr {number} [inner-y=300] - Number of pixels top edge of inner content should be set to.
     */
    innerY:number,
    /**
     * @prop {number} [innerWidth=200] - Number of pixels wide the inner content should be provided.
     * @attr {number} [inner-width=200] - Number of pixels wide the inner content should be provided.
     */
    innerWidth:number,
    /**
     * @prop {number} [innerHeight=100] - Number of pixels high the inner content should be provided.
     * @attr {number} [inner-height=100] - Number of pixels high the inner content should be provided.
     */
    innerHeight:number,
    /**
     * @private
     */
    hOffset:number,

    // pathElements: NodeListOf<SVGPathElement>;

    // paraBorderParts: NodeListOf<SVGPathElement>;

    // svgElement: WeakRef<SVGElement>[];

    // innerParts: NodeListOf<SVGForeignObjectElement>;
}

export interface XtalFigCommonActions{
    // setOwnDimensions: (self: this) => {style: Partial<CSSStyleDeclaration>};
    // setSVGDimensions: (self: this) => any;
}

export interface XtalFigParallelogramActions extends XtalFigCommonActions{


    setDimensions(self: this) : [Partial<XtalFigDiamondProps> | undefined, ActionOnEventConfigs<XtalFigDiamondProps, XtalFigDiamondActions> | undefined, DynamicTransform]
}

export interface XtalFigDiamondProps{
    /**
     * @prop {number} [width=800] - Number of pixels wide the figure should be.
     * @attr {number} [width=800] - Number of pixels wide the figure should be.
     */
    width: number,
    /**
     * @prop {number} [height=300] - Number of pixels high the figure should be.
     * @attr {number} [heigh=300] - Number of pixels high the figure should be.
     */
    height: number,
    /**
     * @prop {number} [strokeWidth=5] - Width of border of figure.
     * @attr {number} [stroke-width=5] - Width of border of figure.
     */
    strokeWidth:number,
    /**
     * @prop {number} [innerWidth=200] - Number of pixels wide the inner content should be provided.
     * @attr {number} [inner-width=200] - Number of pixels wide the inner content should be provided.
     */
    innerWidth:number,
    /**
     * @prop {number} [innerHeight=100] - Number of pixels high the inner content should be provided.
     * @attr {number} [inner-height=100] - Number of pixels high the inner content should be provided.
     */
    innerHeight:number,
    /**
     * @prop {number} [innerX=300] - Number of pixels left edge of inner content should be set to.
     * @attr {number} [inner-x=300] - Number of pixels left edge of inner content should be set to.
     */
    innerX: number,
    /**
     * @prop {number} [innerY=100] - Number of pixels top edge of inner content should be set to.
     * @attr {number} [inner-y=300] - Number of pixels top edge of inner content should be set to.
     */
    innerY: number,
}

export interface XtalFigDiamondActions{
    
    setDimensions(self: this) : [Partial<this> | undefined, ActionOnEventConfigs<XtalFigDiamondProps, XtalFigDiamondActions> | undefined, DynamicTransform]
}


export interface XtalFigDBCylinderProps{}

export interface XtalFigDBCylinderActions {}

export interface XtalFigDocumentProps  extends HTMLElement{
    /**
     * @prop {number} [width=800] - Number of pixels wide the figure should be.
     * @attr {number} [width=800] - Number of pixels wide the figure should be.
     */
    width: number,
    /**
     * @prop {number} [height=300] - Number of pixels high the figure should be.
     * @attr {number} [heigh=300] - Number of pixels high the figure should be.
     */
    height: number,

    svgElement: WeakRef<SVGElement>[];
}

export interface XtalFigDocumentActions extends XtalFigCommonActions{}