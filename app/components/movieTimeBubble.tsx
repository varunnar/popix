/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Button used for selecting times on movie inspect page - eventually would lead to ticket buying page
*/
import React, { useState } from "react";
import { Pressable, StyleSheet, Text} from "react-native";
import { View } from "react-native";


export default function MovieTimeBubble({time}) {

    const [selected, set_selected] = useState(false);

    const timeSelected = function() {
        set_selected(!selected);
    }

    return (
        <View>
            <Pressable className="timeObject"
            style={[
                buttonStyle.buttonSty, {backgroundColor: selected ? "#000033" : "#FFFFFF"}
            ]}
            onPress={timeSelected}>
                <Text className="timeObject" style={[buttonStyle.buttonFont, {color: selected ? "#FFFFFF" : "#000000"}]}>{time}</Text>
            </Pressable>
        </View>
    )
}


const buttonStyle = StyleSheet.create({
    buttonSty: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#000000",
        width: "auto",
        height: "auto",
        alignSelf: "flex-start",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        minWidth: 50,
        minHeight: 50
    },
    buttonFont: {
        fontSize: 16,
        margin: "auto"
    }
}) 