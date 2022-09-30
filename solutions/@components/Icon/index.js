import { SvgXml } from 'react-native-svg';

import * as allIcons from '@mdi/js';

const iconsKeys = Object.keys(allIcons);

//https://github.com/ivanoff/react-svg-main

export default ({ name: sourceName, width = 30, height = 30, color = "#000000", stroke, ...rest })=>{
    const defaultSet = iconsKeys.length === 1 ? iconsKeys[0] : 'mdiCircle';
    let icon = allIcons[sourceName];
    if(!icon){icon = allIcons[defaultSet];}

    const testSvg = `<svg width="24" height="24" viewBox="0 0 24 24">
        <path d="${icon}"/>
    </svg>`;
    
    return <SvgXml xml={testSvg} {...rest} width={width} height={height} fill={color} stroke={stroke} />
}