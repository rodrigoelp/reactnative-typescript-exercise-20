import * as React from "react";
import { AppRegistry, View, Text, Animated, StyleSheet } from "react-native";

enum Colors {
    Foreground = "white",
    FirstBox = "#5c97ea",
    FirstBoxSeparator = "#548ad5",
    SecondBox = "#fdac2b",
    SecondBoxSeparator = "#e69d27",
    ThirdBox = "#5cb0ad",
    ThirdBoxSeparator = "#4c918e",
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, alignContent: "center", justifyContent: "center" },
    title: { fontWeight: "bold", fontSize: 24, color: Colors.Foreground },
    box: { minHeight: 100 },
    sectionBox: { flexGrow: 1, minHeight: 100 },
    topSectionBox: { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    bottomSectionBox: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
    firstBox: { backgroundColor: Colors.FirstBoxSeparator },
    secondBox: { backgroundColor: Colors.SecondBoxSeparator },
    thirdBox: { backgroundColor: Colors.ThirdBoxSeparator },
    firstInnerBox: { backgroundColor: Colors.FirstBox, marginBottom: 10, padding: 10 },
    secondInnerBox: { backgroundColor: Colors.SecondBox, marginBottom: 10, padding: 10 },
    thirdInnerBox: { backgroundColor: Colors.ThirdBox, marginBottom: 10, padding: 10 },
});

class App extends React.PureComponent {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.topSectionBox, styles.firstBox]}>
                    <View style={[styles.sectionBox, styles.topSectionBox, styles.firstInnerBox]}>
                        <Text style={styles.title}>Section 1</Text>
                    </View>
                </View>
                <View style={[styles.box, styles.secondBox]}>
                    <View style={[styles.sectionBox, styles.secondInnerBox]}>
                        <Text style={styles.title}>Section 2</Text>
                    </View>
                </View>
                <View style={[styles.box, styles.bottomSectionBox, styles.thirdBox]}>
                    <View style={[styles.sectionBox, styles.bottomSectionBox, styles.thirdInnerBox]}>
                        <Text style={styles.title}>Section 3</Text>
                    </View>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('animateflex', () => App);