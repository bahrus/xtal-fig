import { beCloned, beMounted } from 'trans-render/lib/mixins/TemplMgmt.js';
export const make = {
    ":host": {
        be: 'definitive',
        having: {
            config: {
                propDefaults: {
                    width: 800, height: 300, innerWidth: 200, strokeWidth: 5, innerHeight: 100, innerX: 300, innerY: 100
                },
                actions: {
                    ...beCloned,
                    setDimensions: {
                        ifAllOf: ['width', 'height'],
                    },
                    ...beMounted
                }
            },
            scriptRef: 'shared-xtal-fig-diamond',
            superclass: 'XtalFigDiamondCore'
        }
    }
};
