import { View } from "react-native";

import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';

import cssGradientParser from "@utils/cssGradientParser";
import cssParser from "@utils/cssParser";

import styles from "./style.scss";

const getCssFunctions = (str = "")=>{
    let result = cssParser(str);

    result.nodes = result.nodes.filter(node => node.type === 'function');

    result.walk((node)=>{
        if (node.type !== 'function') return;
        node.innerValue = cssParser.stringify(node.nodes);
        node.nodes = [];
    });

    return result.nodes.map(node => ({
        type: node.value,
        value: node.innerValue
    }));
}

const isNumeric = (str)=>{
    return typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str))
}

const linearGradientParse = (str = "")=>{
    let result = {
        colors: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
        locations: [0, 1],
        start: {x: 0, y: 0},
        end: {x: 0, y: 1},
        useAngle: false,
        angle: 0,
        angleCenter: {x: 0.5, y: 0.5}
    }

    let props = cssGradientParser(`linear-gradient(${str})`);

    if(Array.isArray(props) && props.length > 0){
        props = props.find(({type}) => type === "linear-gradient");
        if(props){
            console.log(JSON.stringify(props, true, 4));

            result.colors = props.colorStops.map(({type, value}) => Array.isArray(value) ? `${type}(${value.join(", ")})` : value);
            result.locations = props.colorStops.map(({length}, i) => length && length.type === "%" ? parseFloat(length.value)/100 : i * ((result.colors.length-1) / 1));

            if(props.orientation){
                switch(props.orientation.type){
                    case "directional":
                        let value = props.orientation.value.toLowerCase().split(/\s+/);
                        if(value.includes("top") && value.includes("left")){
                            result.start = {x: 1, y: 1};
                            result.end = {x: 0, y: 0};
                        }else if(value.includes("top") && value.includes("right")){
                            result.start = {x: 0, y: 1};
                            result.end = {x: 1, y: 0};
                        }else if(value.includes("bottom") && value.includes("left")){
                            result.start = {x: 1, y: 0};
                            result.end = {x: 0, y: 1};
                        }else if(value.includes("bottom") && value.includes("right")){
                            result.start = {x: 0, y: 0};
                            result.end = {x: 1, y: 1};
                        }else if(value.includes("top")){
                            result.start = {x: 0, y: 1};
                            result.end = {x: 0, y: 0};
                        }else if(value.includes("left")){
                            result.start = {x: 1, y: 0};
                            result.end = {x: 0, y: 0};
                        }else if(value.includes("left")){
                            result.start = {x: 0, y: 0};
                            result.end = {x: 1, y: 0};
                        }else if(value.includes("bottom")){
                            result.start = {x: 0, y: 0};
                            result.end = {x: 0, y: 1};
                        }
                        break;
                    case "angular":
                        result.useAngle = true;
                        result.angle = parseFloat(props.orientation.value);
                        break;
                }
            }
        }
    }

    return result;
}

const functionsToObject = (str = "")=>{
    str = getCssFunctions(str);
    if(!str || str.length <= 0){return {}}

    return str.map(({type, value}) => {
        let func = type.replace(/\-(\w)/gi, (a, b)=> b.toUpperCase());

        switch(func){
            case "linearGradient":
                value = linearGradientParse(value);
                break;
            default:
                value = isNumeric(value) ? parseFloat(value) : value;
        }

        return [func, value];
    }).reduce((accum, [k, v]) => { accum[k] = v; return accum; }, {});
}

const Blur = ({blur, children})=>{
    if(blur <= 0){
        return <View style={styles["BlurView"]}>{children}</View>
    }

    return <BlurView
        style={styles["BlurView"]}
        blurType="light"
        blurAmount={blur}
    >{children}</BlurView>
}

const BackgroundGradient = ({linearGradient, children})=>{
    if(!linearGradient){
        return children;
    }

    return <LinearGradient
        colors={linearGradient.colors}
        locations={linearGradient.locations}
        start={linearGradient.start}
        end={linearGradient.end}
        useAngle={linearGradient.useAngle}
        angle={linearGradient.angle}
        angleCenter={linearGradient.angleCenter}
        style={styles["Gradient"]}
    >{children}</LinearGradient>
}

export default ({style = {}, children})=>{
    const {backdropFilter, backgroundImage, ...newStyle} = style;

    const {blur} = functionsToObject(backdropFilter);

    const {linearGradient} = functionsToObject(backgroundImage);

    return <View style={[newStyle, styles["Container"]]}>
        <Blur blur={blur}>
            <BackgroundGradient linearGradient={linearGradient}/>
            <View style={[{backgroundColor: "transparent"}, newStyle, styles["InnerContainer"]]}>
                {children}
            </View>
        </Blur>
    </View>
}