import {EndUserProps as BeDefEUP} from 'be-definitive/types';
import {beCloned, beMounted, TemplMgmtProps, TemplMgmtActions, TemplMgmt} from 'trans-render/lib/mixins/TemplMgmt.js';
import {DiamondProps, DiamondActions} from '../types';
import {DiamondVM} from './DiamondVM.js'

export const make = {
    ":host": {
        be: 'definitive',
        having: {
            config:{
                propDefaults: {
                    width:800, height:300, innerWidth:200, strokeWidth:5, innerHeight:100, innerX:300, innerY:100,
                    mntCnt:1 //need this because we are using 1 froop dynamic transform
                },
                actions:{
                    ...beCloned,
                    setDimensions:{
                        ifAllOf: ['width', 'height'],
                    },
                    ...beMounted

                }
            },
            mixins: [TemplMgmt],
            superclass: DiamondVM
        } as BeDefEUP<DiamondProps & TemplMgmtProps, DiamondActions & TemplMgmtActions>
    }
}


