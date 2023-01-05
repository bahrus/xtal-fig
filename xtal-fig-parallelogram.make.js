export const make = {
    ":host": {
        be: "definitive",
        having: {
            config: {
                propDefaults: {
                    //mntCnt: 1,
                    width: 800, strokeWidth: 5, height: 300, slant: 30,
                    innerWidth: 200, innerHeight: 100, innerX: 300, innerY: 100,
                    transform: {
                        ':host': [{
                                ".style.width": ['', 'width', 'px'], ".style.height": ['', 'height', 'px']
                            }],
                        innerP: [, , { width: 'innerWidth', height: 'innerHeight', x: 'innerX', y: 'innerY' }],
                        svgE: [, , { width: 'width', height: 'height' }],
                        paraBorderP: [{ ".style.strokeWidth": ['', '.strokeWidth.toString|'] }]
                    }
                },
                actions: {
                    //...beCloned,
                    setDimensions: {
                        ifAllOf: ['width', 'height'],
                    },
                    //...beMounted,
                }
            },
            scriptRef: 'shared-xtal-fig-parallelogram',
            superclass: 'XtalFigParallelogramCore',
        }
    },
};
